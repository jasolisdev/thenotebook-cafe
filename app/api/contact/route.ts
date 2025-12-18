import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { validateOrigin } from "@/app/lib/csrf";
import { checkRateLimit } from "@/app/lib/rateLimit";
import { logger } from "@/app/lib/logger";
import { sanitizeEmail, sanitizeMultilineText, sanitizeText } from "@/app/lib/sanitize";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email recipient (configurable via environment variable)
const CONTACT_EMAIL_RECIPIENT = process.env.CONTACT_EMAIL_RECIPIENT || "jasolisdev@gmail.com";

// Lazy initialize Resend client
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logger.error("RESEND_API_KEY not configured");
    return null;
  }
  return new Resend(apiKey);
}

function normalizeText(input: unknown, maxLen: number): string {
  if (typeof input !== "string") return "";
  const value = input.trim();
  if (!value) return "";
  return value.length > maxLen ? value.slice(0, maxLen) : value;
}

function normalizeEmail(input: unknown): string | null {
  const email = normalizeText(input, 254);
  if (!email) return null;
  if (/[<>"'`\s]/.test(email)) return null;
  if (!EMAIL_RE.test(email)) return null;
  return email;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildContactEmailText(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: Date;
}): string {
  const receivedAt = params.receivedAt.toLocaleString();
  return [
    "New contact form message",
    "",
    `From: ${params.name}`,
    `Email: ${params.email}`,
    `Subject: ${params.subject}`,
    `Received: ${receivedAt}`,
    "",
    "Message:",
    params.message,
  ].join("\n");
}

function buildContactEmailHtml(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: Date;
}): string {
  const safeName = escapeHtml(sanitizeText(params.name));
  const safeEmail = escapeHtml(sanitizeEmail(params.email));
  const safeSubject = escapeHtml(sanitizeText(params.subject));
  const safeMessage = escapeHtml(sanitizeMultilineText(params.message));

  // Format date and time with timezone
  const formattedDateTime = params.receivedAt.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short'
  });

  // Convert message line breaks to proper paragraph tags
  const formattedMessage = safeMessage
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<p style="margin: 0 0 25px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 17px; line-height: 1.8; color: #333333; font-weight: 300;">${line}</p>`)
    .join('');

  // Build mailto link with subject and signature
  const replySubject = encodeURIComponent(`Re: ${sanitizeText(params.subject)}`);
  const signature = `\n\n- The Notebook Café\n3512 9th St, Riverside, CA 92501\n(951) 823-0004`;
  const replyBody = encodeURIComponent(signature);
  const replyHref = `mailto:${sanitizeEmail(params.email)}?subject=${replySubject}&body=${replyBody}`;
  const safeReplyHref = escapeHtml(replyHref);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>A Note Regarding ${safeSubject}</title>
  <style type="text/css">
    body { margin: 0; padding: 0; min-width: 100%; background-color: #F8F7F5; }
    .email-container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; }

    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      body { background-color: #1a1410 !important; }
      .email-container { background-color: #2a2420 !important; border-color: #4a4240 !important; }
      .meta-border { border-bottom-color: #4a4240 !important; }
      .brand-title { color: #f0e8d8 !important; }
      .brand-label { color: #a89580 !important; }
      .label-text { color: #a89580 !important; }
      .heading-text { color: #f0e8d8 !important; }
      .body-text { color: #e8dfd0 !important; }
      .button-border { border-color: #c9a876 !important; color: #c9a876 !important; }
      .footer-bg { background-color: #1a1410 !important; border-top-color: #4a4240 !important; }
      .footer-text { color: #c9a876 !important; }
      .divider-line { background-color: #4a4240 !important; }
    }

    @media only screen and (max-width: 600px) {
      .main-padding { padding: 40px 25px !important; }
      .meta-padding { padding: 20px 25px !important; }
      .brand-spacing { margin-bottom: 40px !important; }
      .brand-title { font-size: 26px !important; }
      .subject-title { font-size: 22px !important; }
      .body-text { font-size: 16px !important; }
      .meta-stack td { display: block !important; width: 100% !important; text-align: left !important; }
      .meta-stack td:first-child { margin-bottom: 20px !important; }
      .footer-address { display: block !important; margin-top: 5px !important; }
      .footer-break { display: block !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 60px 0; background-color: #F8F7F5;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table class="email-container" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E9E3D6; box-shadow: 0 20px 40px rgba(0,0,0,0.05);">

          <!-- Top Meta Row -->
          <tr>
            <td class="meta-padding meta-border" style="padding: 25px 40px; border-bottom: 1px solid #F8F7F5;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="meta-stack">
                <tr>
                  <td align="left">
                    <p class="label-text" style="margin: 0; font-family: Arial, sans-serif; font-size: 9px; color: #8B735B; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">From</p>
                    <p class="heading-text" style="margin: 4px 0 0 0; font-family: 'Georgia', serif; font-size: 15px; color: #1A1A1A; font-weight: normal;">${safeName}</p>
                    <p class="label-text" style="margin: 2px 0 0 0; font-family: Arial, sans-serif; font-size: 11px; color: #8B735B;">${safeEmail}</p>
                  </td>
                  <td align="right" valign="top">
                    <p class="label-text" style="margin: 0; font-family: Arial, sans-serif; font-size: 9px; color: #8B735B; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Sent At</p>
                    <p class="heading-text" style="margin: 4px 0 0 0; font-family: 'Georgia', serif; font-size: 12px; color: #1A1A1A; font-weight: normal;">${formattedDateTime}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary Content -->
          <tr>
            <td class="main-padding" style="padding: 70px 60px;">

              <!-- Brand Identity -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="brand-spacing" style="margin-bottom: 60px;">
                <tr>
                  <td align="center">
                    <h1 class="brand-title" style="margin: 0; font-family: 'Georgia', serif; font-size: 32px; color: #1A1A1A; font-style: italic; font-weight: 100; letter-spacing: -0.5px;">The Notebook Café</h1>
                  </td>
                </tr>
              </table>

              <!-- Subject Section -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 40px;">
                <tr>
                  <td height="1" class="divider-line" bgcolor="#F8F7F5" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding: 30px 0;">
                    <p class="label-text" style="margin: 0 0 10px 0; font-family: Arial, sans-serif; font-size: 10px; color: #8B735B; text-transform: uppercase; letter-spacing: 2.5px; font-weight: bold;">Subject</p>
                    <h2 class="subject-title" style="margin: 0; font-family: 'Georgia', serif; font-size: 26px; font-style: italic; color: #1A1A1A; font-weight: normal; line-height: 1.3;">${safeSubject}</h2>
                  </td>
                </tr>
              </table>

              <!-- Message Body -->
              <div style="margin-bottom: 60px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                ${formattedMessage}
              </div>

              <!-- Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${safeReplyHref}" class="button-border" style="display: inline-block; border: 1px solid #1A1A1A; color: #1A1A1A; padding: 18px 40px; text-decoration: none; font-family: Arial, sans-serif; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 4px;">Reply Direct</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Brand Statement Footer -->
          <tr>
            <td class="footer-bg" style="padding: 40px 30px; background-color: #FAF9F6; border-top: 1px solid #E9E3D6; text-align: center;">
              <p class="footer-text" style="margin: 0; font-family: Arial, sans-serif; font-size: 10px; color: #8B735B; text-transform: uppercase; letter-spacing: 5px; font-weight: bold;">WHERE EVERY CUP<span class="footer-break" style="display: none;"><br /></span> TELLS A STORY</p>
            </td>
          </tr>
        </table>

        <!-- Meta Footer -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin-top: 30px;">
          <tr>
            <td align="center" class="footer-text" style="font-family: Arial, sans-serif; font-size: 9px; color: #8B735B; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">
              The Notebook Café<span class="footer-address"> &bull; 3512 9th St, Riverside, CA 92501</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  // CSRF protection
  const originError = validateOrigin(req);
  if (originError) return originError;

  // Rate limiting: 3 requests per minute
  const rateLimitError = checkRateLimit(req, "/api/contact", 3, 60000);
  if (rateLimitError) return rateLimitError;

  try {
    const { name, email, subject, message } = await req.json().catch(() => ({}));

    const normalizedName = normalizeText(name, 120);
    const normalizedEmail = normalizeEmail(email);
    const normalizedSubject = normalizeText(subject, 120);
    const normalizedMessage = normalizeText(message, 5000);

    if (!normalizedName || !normalizedEmail || !normalizedSubject || !normalizedMessage) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Send email notification
    const resend = getResendClient();
    if (resend) {
      try {
        const receivedAt = new Date();
        const emailResult = await resend.emails.send({
          from: "The Notebook Café <onboarding@resend.dev>",
          to: CONTACT_EMAIL_RECIPIENT,
          replyTo: sanitizeEmail(normalizedEmail),
          subject: `Contact Form: ${sanitizeText(normalizedSubject)}`,
          text: buildContactEmailText({
            name: sanitizeText(normalizedName),
            email: sanitizeEmail(normalizedEmail),
            subject: sanitizeText(normalizedSubject),
            message: sanitizeMultilineText(normalizedMessage),
            receivedAt,
          }),
          html: buildContactEmailHtml({
            name: normalizedName,
            email: normalizedEmail,
            subject: normalizedSubject,
            message: normalizedMessage,
            receivedAt,
          }),
        });
        logger.info("Contact email sent successfully", {
          emailId: emailResult.data?.id,
          recipient: CONTACT_EMAIL_RECIPIENT
        });
      } catch (emailError) {
        // Log email error but don't fail the request
        logger.error("Failed to send contact email", emailError);
      }
    } else {
      logger.warn("Resend client not initialized - email not sent");
    }

    // Create with sanitization
    const doc = await writeClient.create({
      _type: "contactMessage",
      name: sanitizeText(normalizedName),
      email: sanitizeEmail(normalizedEmail),
      subject: sanitizeText(normalizedSubject),
      message: sanitizeMultilineText(normalizedMessage),
      status: "new",
      createdAt: new Date().toISOString(),
      source: "contact-page",
    });

    return NextResponse.json(
      { ok: true, id: doc._id },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    logger.error("Contact form submission error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
