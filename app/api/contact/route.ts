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
  const safeDate = escapeHtml(params.receivedAt.toLocaleString());

  const replySubject = encodeURIComponent(`Re: ${sanitizeText(params.subject)}`);
  const replyHref = `mailto:${sanitizeEmail(params.email)}?subject=${replySubject}`;
  const safeReplyHref = escapeHtml(replyHref);

  const preheader = escapeHtml(`New message from ${sanitizeText(params.name)} — ${sanitizeText(params.subject)}`);

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>New Contact Message — The Notebook Café</title>
    <!--[if mso]>
    <style>
      table { border-collapse: collapse; }
      .serif { font-family: Georgia, serif !important; }
    </style>
    <![endif]-->
    <style>
      /* Base Resets */
      body { margin: 0; padding: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      
      /* Typography */
      body, td { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
      .serif { font-family: Georgia, 'Times New Roman', serif; }

      /* Light Mode Defaults (Inline styles handle most of this, but classes help for specific clients) */
      .email-bg { background-color: #F3EFE9; }
      .card-bg { background-color: #FAF9F6; }
      .header-bg { background-color: #2C2420; }
      .text-dark { color: #4A3B32; }
      .text-light { color: #EDE7D8; }
      .text-muted { color: #8E7965; }
      .border-color { border-color: #EDE7D8; }
      .message-box-bg { background-color: #FDFBF7; }
      
      /* Dark Mode Overrides */
      @media (prefers-color-scheme: dark) {
        body, .email-bg { background-color: #1A120E !important; }
        .card-bg { background-color: #2C2420 !important; }
        .header-bg { background-color: #1F1916 !important; border-bottom: 1px solid #4A3B32 !important; }
        .text-dark { color: #EDE7D8 !important; } /* Invert to light text */
        .text-light { color: #EDE7D8 !important; } /* Keep light text light */
        .text-muted { color: #CBB9A4 !important; }
        .border-color { border-color: #4A3B32 !important; }
        .message-box-bg { background-color: #251E1A !important; border-left-color: #A48D78 !important; }
        .footer-text { color: #8E7965 !important; }
        .label-text { color: #CBB9A4 !important; }
        .link-text { color: #A48D78 !important; }
      }

      /* Mobile Responsiveness */
      @media only screen and (max-width: 600px) {
        .email-container { width: 100% !important; margin: 0 !important; }
        .content-padding { padding: 30px 20px !important; }
        .header-padding { padding: 30px 20px !important; }
        .mobile-title { font-size: 24px !important; }
        .mobile-stack { display: block !important; width: 100% !important; }
      }
    </style>
  </head>
  <body class="email-bg" style="margin:0; padding:0; background-color:#F3EFE9;">
    <!-- Preheader -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      ${preheader}
    </div>

    <!-- Main Wrapper -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="email-bg" style="background-color:#F3EFE9;">
      <tr>
        <td align="center" style="padding: 40px 10px;">
          
          <!-- Card Container -->
          <table role="presentation" class="email-container card-bg" width="600" border="0" cellspacing="0" cellpadding="0" style="width:600px; background-color:#FAF9F6; border-radius:12px; overflow:hidden; box-shadow:0 8px 24px rgba(44,36,32,0.08); mso-padding-alt:0;">
            
            <!-- Header -->
            <tr>
              <td align="center" class="header-bg header-padding" style="background-color:#2C2420; padding:40px 40px 35px;">
                <h1 class="serif mobile-title text-light" style="margin:0; color:#EDE7D8; font-size:28px; font-weight:400; letter-spacing:0.05em; text-transform:uppercase;">
                  The Notebook Café
                </h1>
                <p class="text-muted" style="margin:10px 0 0 0; color:#CBB9A4; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                  New Website Inquiry
                </p>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td class="content-padding" style="padding:40px;">
                
                <!-- Greeting / Context -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <h2 class="serif text-dark" style="margin:0 0 10px 0; color:#4A3B32; font-size:22px; font-weight:400;">
                        Hello Team,
                      </h2>
                      <p class="text-dark" style="margin:0 0 25px 0; color:#4A3B32; font-size:16px; line-height:1.6;">
                        You have received a new message via the contact form.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:30px;">
                  <tr>
                    <td class="message-box-bg" style="background-color:#FDFBF7; padding:25px; border-radius:4px; border-left:4px solid #A48D78;">
                      <p class="text-dark" style="margin:0; color:#2C2420; font-size:15px; line-height:1.7; white-space:pre-wrap;">${safeMessage}</p>
                    </td>
                  </tr>
                </table>

                <!-- Details Grid -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" class="border-color" style="border-top:1px solid #EDE7D8; padding-top:25px;">
                  <tr>
                    <td style="padding-bottom:15px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="80" valign="top" class="label-text" style="color:#8E7965; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.05em; padding-top:3px;">From</td>
                          <td class="text-dark" style="color:#4A3B32; font-size:15px;">${safeName}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:15px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="80" valign="top" class="label-text" style="color:#8E7965; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.05em; padding-top:3px;">Email</td>
                          <td class="text-dark" style="color:#4A3B32; font-size:15px;">
                            <a href="mailto:${safeEmail}" class="link-text" style="color:#4A3B32; text-decoration:none; border-bottom:1px solid rgba(164,141,120,0.3);">${safeEmail}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:15px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="80" valign="top" class="label-text" style="color:#8E7965; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.05em; padding-top:3px;">Subject</td>
                          <td class="text-dark" style="color:#4A3B32; font-size:15px;">${safeSubject}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="80" valign="top" class="label-text" style="color:#8E7965; font-size:12px; font-weight:bold; text-transform:uppercase; letter-spacing:0.05em; padding-top:3px;">Time</td>
                          <td class="text-dark" style="color:#4A3B32; font-size:15px;">${safeDate}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Action Button -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:35px;">
                  <tr>
                    <td align="center">
                      <a href="${safeReplyHref}" style="display:inline-block; background-color:#A48D78; color:#FFFFFF; padding:14px 32px; border-radius:4px; text-decoration:none; font-size:14px; font-weight:bold; letter-spacing:0.05em; text-transform:uppercase;">
                        Reply to Message
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" class="email-bg" style="background-color:#F3EFE9; padding:20px;">
                <p class="footer-text" style="margin:0; color:#8E7965; font-size:11px; font-style:italic;">
                  Moments worth writing down.
                </p>
                <p class="footer-text" style="margin:5px 0 0 0; color:#A48D78; font-size:10px; text-transform:uppercase; letter-spacing:0.05em; opacity:0.8;">
                  &copy; 2025 The Notebook Café
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
