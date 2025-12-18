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

  // Format date and time
  const formattedDate = params.receivedAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = params.receivedAt.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Convert message line breaks to proper paragraph tags
  const formattedMessage = safeMessage
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<p style="margin:0 0 1.5em 0; color:#2A2622; font-size:16px; line-height:1.8;">${line}</p>`)
    .join('');

  const replyHref = `mailto:${sanitizeEmail(params.email)}`;
  const safeReplyHref = escapeHtml(replyHref);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>A Note Regarding ${safeSubject}</title>
  <style>
    /* Base Reset */
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    /* Light Mode (Default) */
    .email-wrapper { background-color: #FDFBF7; }
    .email-card { background-color: #FAF9F6; }
    .email-header-border { border-bottom: 1px solid #EDE7D8; }
    .email-title { color: #2C2420; }
    .email-meta { color: #8E7965; }
    .email-greeting { color: #A48D78; }
    .email-text { color: #2A2622; }
    .email-subject { color: #4A4F41; }
    .email-message-box { background-color: #FFFFFF; border: 1px solid #EDE7D8; }
    .email-divider { background-color: #A48D78; }
    .email-sender-border { border-left: 2px solid #EDE7D8; }
    .email-sender-name { color: #4A3B32; }
    .email-sender-email { color: #A48D78; }
    .email-button { background-color: #A48D78; color: #FAF9F6; }
    .email-footer-bg { background-color: #FDFBF7; }
    .email-footer-text { color: #A48D78; }
    .email-footer-divider { border-top: 1px solid #EDE7D8; }

    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      .email-wrapper { background-color: #1a1410 !important; }
      .email-card { background-color: #2a2420 !important; }
      .email-header-border { border-bottom: 1px solid #4a4240 !important; }
      .email-title { color: #f0e8d8 !important; }
      .email-meta { color: #a89580 !important; }
      .email-greeting { color: #c9a876 !important; }
      .email-text { color: #e8dfd0 !important; }
      .email-subject { color: #b8c098 !important; }
      .email-message-box { background-color: #1f1a16 !important; border: 1px solid #4a4240 !important; }
      .email-divider { background-color: #c9a876 !important; }
      .email-sender-border { border-left: 2px solid #4a4240 !important; }
      .email-sender-name { color: #e8dfd0 !important; }
      .email-sender-email { color: #c9a876 !important; }
      .email-button { background-color: #c9a876 !important; color: #2a2420 !important; }
      .email-footer-bg { background-color: #1a1410 !important; }
      .email-footer-text { color: #c9a876 !important; }
      .email-footer-divider { border-top: 1px solid #4a4240 !important; }
    }

    /* Mobile Responsive */
    @media only screen and (max-width: 600px) {
      .email-outer-padding { padding: 20px 10px !important; }
      .email-header-padding { padding: 40px 20px 30px 20px !important; }
      .email-content-padding { padding: 0 20px 30px 20px !important; }
      .email-footer-padding { padding: 0 20px 40px 20px !important; }
      .email-legal-padding { padding: 20px !important; }
      .email-title { font-size: 22px !important; letter-spacing: 0.08em !important; }
      .email-meta { font-size: 11px !important; }
      .email-meta-wrapper { display: block !important; }
      .email-meta-left { margin-bottom: 8px !important; }
      .email-meta-right { text-align: left !important; }
      .email-greeting { font-size: 12px !important; }
      .email-text { font-size: 14px !important; }
      .email-subject { font-size: 16px !important; }
      .email-message-box { padding: 20px !important; }
      .email-sender-wrapper { display: block !important; }
      .email-sender-info { margin-bottom: 15px !important; padding-left: 15px !important; }
      .email-footer-text { font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Georgia', serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="email-wrapper" style="background-color: #FDFBF7;">
    <tr>
      <td align="center" class="email-outer-padding" style="padding: 60px 20px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="email-card" style="max-width: 600px; background-color: #FAF9F6; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 30px rgba(44,36,32,0.1);">

          <!-- Editorial Header -->
          <tr>
            <td align="center" class="email-header-padding" style="padding: 60px 40px 40px 40px;">
              <div class="email-header-border" style="border-bottom: 1px solid #EDE7D8; padding-bottom: 20px;">
                <h1 class="email-title" style="margin: 0; color: #2C2420; font-size: 28px; letter-spacing: 0.1em; font-weight: 300; text-transform: uppercase; line-height: 1.2;">The Notebook Café</h1>
              </div>
            </td>
          </tr>

          <!-- Meta Info: Name & Date -->
          <tr>
            <td class="email-content-padding" style="padding: 0 50px 20px 50px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="email-meta-wrapper">
                <tr>
                  <td class="email-meta email-meta-left" style="color: #8E7965; font-size: 12px; font-weight: 500;">
                    From: ${safeName}
                  </td>
                  <td align="right" class="email-meta email-meta-right" style="color: #8E7965; font-size: 12px; font-weight: 500;">
                    ${formattedDate} at ${formattedTime}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="email-content-padding" style="padding: 0 50px 40px 50px;">

              <!-- Notification Header -->
              <div style="margin-bottom: 30px;">
                <p class="email-greeting" style="margin: 0; color: #A48D78; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Hello Team,</p>
                <p class="email-text" style="margin: 5px 0 0 0; color: #2A2622; font-size: 15px; line-height: 1.5;">You have received a new message via the <strong>Contact Page</strong> form.</p>
              </div>

              <h2 class="email-subject" style="margin: 0 0 25px 0; color: #4A4F41; font-size: 18px; font-style: italic; font-weight: 400; line-height: 1.4;">Re: ${safeSubject}</h2>

              <!-- Message Box with Background -->
              <div class="email-message-box" style="background-color: #FFFFFF; border: 1px solid #EDE7D8; border-radius: 4px; padding: 30px; margin-bottom: 30px;">
                <div class="email-text" style="color: #2A2622; font-size: 16px; line-height: 1.8;">
                  ${formattedMessage}
                </div>
              </div>

              <!-- Sender Contact Info -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="email-sender-wrapper">
                <tr>
                  <td class="email-sender-info email-sender-border" style="border-left: 2px solid #EDE7D8; padding-left: 20px;">
                    <p class="email-sender-name" style="margin: 0; font-size: 14px; color: #4A3B32; font-weight: bold;">${safeName}</p>
                    <p class="email-sender-email" style="margin: 4px 0 0 0; font-size: 13px; color: #A48D78; word-break: break-all;">${safeEmail}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Reply Button (Centered) -->
          <tr>
            <td align="center" style="padding: 0 50px 40px 50px;">
              <a href="${safeReplyHref}" class="email-button" style="display: inline-block; background-color: #A48D78; color: #FAF9F6; padding: 14px 32px; border-radius: 2px; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">REPLY</a>
            </td>
          </tr>

          <!-- Footer Branding -->
          <tr>
            <td align="center" class="email-footer-padding" style="padding: 0 50px 40px 50px;">
              <div class="email-footer-bg" style="padding: 25px; background-color: #FDFBF7; border-radius: 4px;">
                <p class="email-footer-text" style="margin: 0; color: #A48D78; font-size: 12px; font-style: italic; line-height: 1.5;">&ldquo;Where every Cup Tells a Story&rdquo;</p>
              </div>
            </td>
          </tr>

          <!-- Legal Footer -->
          <tr>
            <td align="center" class="email-legal-padding email-footer-divider" style="background-color: #FAF9F6; padding: 30px; border-top: 1px solid #EDE7D8;">
              <p class="email-footer-text" style="margin: 0; color: #A48D78; font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em; line-height: 1.6;">
                &copy; 2025 The Notebook Café &bull; 3512 9th St, Riverside, CA 92501
              </p>
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
