import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { validateOrigin } from "@/app/lib/csrf";
import { checkRateLimit } from "@/app/lib/rateLimit";
import { logger } from "@/app/lib/logger";
import { sanitizeEmail, sanitizeText } from "@/app/lib/sanitize";
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email recipient (configurable via environment variable)
const CONTACT_EMAIL_RECIPIENT = process.env.CONTACT_EMAIL_RECIPIENT || 'jasolisdev@gmail.com';

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
        const emailResult = await resend.emails.send({
          from: 'The Notebook Café <onboarding@resend.dev>',
          to: CONTACT_EMAIL_RECIPIENT,
          subject: `Contact Form: ${sanitizeText(normalizedSubject)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2C2420; border-bottom: 2px solid #A48D78; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>

              <div style="margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>From:</strong> ${sanitizeText(normalizedName)}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${sanitizeEmail(normalizedEmail)}</p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${sanitizeText(normalizedSubject)}</p>
              </div>

              <div style="margin: 20px 0; padding: 15px; background-color: #F4F1EA; border-left: 4px solid #A48D78;">
                <p style="margin: 0;"><strong>Message:</strong></p>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${sanitizeText(normalizedMessage)}</p>
              </div>

              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #CBB9A4; font-size: 12px; color: #4A3B32;">
                <p>Submitted from: Contact Page</p>
                <p>Time: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `,
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
      message: sanitizeText(normalizedMessage),
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

