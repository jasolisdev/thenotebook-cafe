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

  // Convert message line breaks to proper paragraph tags
  const formattedMessage = safeMessage
    .split('\n')
    .filter(line => line.trim())
    .map(line => `<p style="margin:0 0 1.5em 0; color:#2A2622; font-size:16px; line-height:1.8;">${line}</p>`)
    .join('');

  const replyHref = `mailto:${sanitizeEmail(params.email)}`;
  const safeReplyHref = escapeHtml(replyHref);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A Note Regarding ${safeSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FDFBF7; font-family: 'Georgia', serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FDFBF7; padding: 60px 20px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FAF9F6; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 30px rgba(44,36,32,0.1);">
          <!-- Editorial Header -->
          <tr>
            <td align="center" style="padding: 60px 40px 40px 40px;">
              <div style="border-bottom: 1px solid #EDE7D8; padding-bottom: 20px;">
                <h1 style="margin: 0; color: #2C2420; font-size: 28px; letter-spacing: 0.1em; font-weight: 300; text-transform: uppercase;">The Notebook Café</h1>
              </div>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td style="padding: 0 50px 40px 50px;">
              <!-- Notification Header -->
              <div style="margin-bottom: 30px;">
                <p style="margin: 0; color: #A48D78; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold;">Hello Team,</p>
                <p style="margin: 5px 0 0 0; color: #2A2622; font-size: 15px; line-height: 1.5;">You have received a new message via the <strong>Contact Page</strong> form.</p>
              </div>

              <h2 style="margin: 0 0 25px 0; color: #4A4F41; font-size: 18px; font-style: italic; font-weight: 400;">Re: ${safeSubject}</h2>

              <div style="color: #2A2622; font-size: 16px; line-height: 1.8;">
                ${formattedMessage}
              </div>

              <div style="margin: 40px auto; width: 40px; height: 1px; background-color: #A48D78;"></div>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-left: 2px solid #EDE7D8; padding-left: 20px;">
                    <p style="margin: 0; font-size: 14px; color: #4A3B32; font-weight: bold;">${safeName}</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #A48D78;">${safeEmail}</p>
                  </td>
                  <td align="right">
                    <a href="${safeReplyHref}" style="display: inline-block; background-color: #A48D78; color: #FAF9F6; padding: 12px 24px; border-radius: 2px; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">REPLY</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer Branding -->
          <tr>
            <td align="center" style="padding: 0 50px 60px 50px;">
               <div style="padding: 25px; background-color: #FDFBF7; border-radius: 4px;">
                  <p style="margin: 0; color: #A48D78; font-size: 12px; font-style: italic;">"Where every Cup Tells a Story"</p>
                  <div style="margin-top: 15px;">
                     <span style="font-size: 10px; color: #cccccc; text-transform: uppercase; letter-spacing: 2px; margin: 0 10px;">Ink</span>
                     <span style="font-size: 10px; color: #cccccc; text-transform: uppercase; letter-spacing: 2px; margin: 0 10px;">Roast</span>
                     <span style="font-size: 10px; color: #cccccc; text-transform: uppercase; letter-spacing: 2px; margin: 0 10px;">Story</span>
                  </div>
               </div>
            </td>
          </tr>
          <!-- Legal Footer -->
          <tr>
            <td align="center" style="background-color: #FAF9F6; padding: 30px; border-top: 1px solid #EDE7D8;">
              <p style="margin: 0; color: #A48D78; font-size: 9px; text-transform: uppercase; letter-spacing: 0.3em;">
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
