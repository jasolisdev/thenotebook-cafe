import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  validateOrigin,
  checkRateLimit,
  logger,
  sanitizeEmail,
  sanitizeMultilineText,
  sanitizeText,
} from "@/app/lib";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

const CAREERS_EMAIL_RECIPIENT =
  process.env.CAREERS_EMAIL_RECIPIENT ||
  process.env.CONTACT_EMAIL_RECIPIENT ||
  "jasolisdev@gmail.com";

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

function parseJsonList(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function formatPhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return input;
}

function formatBirthdate(input: string): string {
  const dateMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    return `${dateMatch[2]}-${dateMatch[3]}-${dateMatch[1]}`;
  }
  const slashMatch = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (slashMatch) {
    return `${slashMatch[1]}-${slashMatch[2]}-${slashMatch[3]}`;
  }
  const digits = input.replace(/\D/g, "");
  if (digits.length === 8) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
  }
  return input;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildCareersEmailText(params: {
  name: string;
  email: string;
  role: string;
  availability: string;
  message: string;
  resumeName: string;
  applicationName?: string;
  details: string[];
  receivedAt: Date;
}): string {
  const receivedAt = params.receivedAt.toLocaleString();
  return [
    "New careers application",
    "",
    `From: ${params.name}`,
    `Email: ${params.email}`,
    `Role: ${params.role}`,
    `Availability: ${params.availability}`,
    ...(params.details.length ? ["", ...params.details] : []),
    `Resume: ${params.resumeName}`,
    params.applicationName ? `Application: ${params.applicationName}` : null,
    `Received: ${receivedAt}`,
    "",
    "Message:",
    params.message || "No additional note provided.",
  ].filter(Boolean).join("\n");
}

function buildCareersEmailHtml(params: {
  name: string;
  email: string;
  role: string;
  availability: string;
  message: string;
  resumeName: string;
  applicationName?: string;
  details: string[];
  receivedAt: Date;
}): string {
  const safeName = escapeHtml(sanitizeText(params.name));
  const safeEmail = escapeHtml(sanitizeEmail(params.email));
  const safeRole = escapeHtml(sanitizeText(params.role));
  const safeAvailability = escapeHtml(sanitizeText(params.availability));
  const safeMessage = escapeHtml(sanitizeMultilineText(params.message));
  const safeResume = escapeHtml(sanitizeText(params.resumeName));
  const safeApplication = params.applicationName
    ? escapeHtml(sanitizeText(params.applicationName))
    : "";
  const applicationRow = safeApplication
    ? `<p style="margin: 6px 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #2c2420;">Application: ${safeApplication}</p>`
    : "";
  const safeDetails = params.details.map((item) => escapeHtml(item));

  const formattedDateTime = params.receivedAt.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
    timeZoneName: "short",
  });

  const formattedMessage = safeMessage
    .split("\n")
    .filter((line) => line.trim())
    .map(
      (line) =>
        `<p style="margin: 0 0 14px 0; font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #2c2420;">${line}</p>`
    )
    .join("");

  const detailsHtml = safeDetails.length
    ? `<ul style="margin: 12px 0 0 18px; padding: 0; font-family: Arial, sans-serif; font-size: 13px; color: #5a4a3f;">
        ${safeDetails.map((item) => `<li style="margin-bottom: 6px;">${item}</li>`).join("")}
      </ul>`
    : `<p style="margin: 12px 0 0; font-family: Arial, sans-serif; font-size: 13px; color: #8b735b;">No extra details provided.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Careers Application</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8f7f5;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 620px; background: #ffffff; border: 1px solid #e9e3d6; border-radius: 18px; overflow: hidden;">
            <tr>
              <td style="padding: 28px 32px; background: #2c2420;">
                <p style="margin: 0; font-family: Georgia, serif; font-size: 20px; color: #f4f1ea;">New Careers Application</p>
                <p style="margin: 8px 0 0; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #d2c5b6;">Received ${escapeHtml(formattedDateTime)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 28px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <p style="margin: 0 0 6px; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #8b735b;">Applicant</p>
                      <p style="margin: 0; font-family: Georgia, serif; font-size: 18px; color: #2c2420;">${safeName}</p>
                      <p style="margin: 6px 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #5a4a3f;">${safeEmail}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <p style="margin: 0 0 6px; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #8b735b;">Role & Availability</p>
                      <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #2c2420;"><strong>Role:</strong> ${safeRole}</p>
                      <p style="margin: 6px 0 0; font-family: Arial, sans-serif; font-size: 14px; color: #2c2420;"><strong>Availability:</strong> ${safeAvailability}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <p style="margin: 0 0 6px; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #8b735b;">Resume</p>
                      <p style="margin: 0; font-family: Arial, sans-serif; font-size: 14px; color: #2c2420;">${safeResume}</p>
                      ${applicationRow}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 18px;">
                      <p style="margin: 0 0 6px; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #8b735b;">Additional Details</p>
                      ${detailsHtml}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #8b735b;">Why Us?</p>
                      ${formattedMessage || '<p style="margin:0; font-family: Arial, sans-serif; font-size: 14px; color: #5a4a3f;">No message provided.</p>'}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 32px; background: #faf9f6; border-top: 1px solid #e9e3d6;">
                <p style="margin: 0; font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #8b735b;">The Notebook Cafe</p>
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
  const originError = validateOrigin(req);
  if (originError) return originError;

  const rateLimitError = checkRateLimit(req, "/api/careers/apply", 3, 60000);
  if (rateLimitError) return rateLimitError;

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const role = formData.get("role");
    const availability = formData.get("availability");
    const message = formData.get("message");
    const phone = formData.get("phone");
    const birthdate = formData.get("birthdate");
    const positionsRaw = formData.get("positions");
    const daysAvailableRaw = formData.get("daysAvailable");
    const resume = formData.get("resume");
    const application = formData.get("application");

    const normalizedName = normalizeText(name, 120);
    const normalizedFirstName = normalizeText(firstName, 60);
    const normalizedLastName = normalizeText(lastName, 60);
    const resolvedName =
      normalizedName || [normalizedFirstName, normalizedLastName].filter(Boolean).join(" ");
    const normalizedEmail = normalizeEmail(email);
    const normalizedRole = normalizeText(role, 120);
    const normalizedAvailability = normalizeText(availability, 120);
    const normalizedMessage = normalizeText(message, 2000);
    const normalizedPhone = normalizeText(phone, 40);
    const normalizedBirthdate = normalizeText(birthdate, 40);

    const parsedPositions = parseJsonList(positionsRaw);
    const parsedDaysAvailable = parseJsonList(daysAvailableRaw);

    const positionsText =
      Array.isArray(parsedPositions) && parsedPositions.length
        ? parsedPositions.join(", ")
        : "";
    const daysAvailableText =
      Array.isArray(parsedDaysAvailable) && parsedDaysAvailable.length
        ? parsedDaysAvailable.join(", ")
        : "";

    const resolvedRole = normalizedRole || positionsText;
    const resolvedAvailability = normalizedAvailability || daysAvailableText || "Not provided";

    if (!resolvedName || !normalizedEmail || !resolvedRole) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (!(resume instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "Resume is required" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "Resume must be under 5MB" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const extension = resume.name.split(".").pop()?.toLowerCase() || "";
    const typeAllowed = resume.type ? ALLOWED_TYPES.has(resume.type) : false;
    if (!typeAllowed && !ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        { ok: false, error: "Resume must be a PDF or Word document" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const resend = getResendClient();
    if (resend) {
      const arrayBuffer = await resume.arrayBuffer();
        const attachment = {
          filename: resume.name || "resume",
          content: Buffer.from(arrayBuffer),
          contentType: resume.type || undefined,
        };
        const applicationAttachments = [];
        if (application instanceof File && application.size > 0) {
          const extension = application.name.split(".").pop()?.toLowerCase() || "";
          const typeAllowed = application.type ? ALLOWED_TYPES.has(application.type) : false;
          if (application.size > MAX_FILE_SIZE) {
            return NextResponse.json(
              { ok: false, error: "Application must be under 5MB" },
              { status: 400, headers: { "Cache-Control": "no-store" } }
            );
          }
          if (!typeAllowed && !ALLOWED_EXTENSIONS.has(extension)) {
            return NextResponse.json(
              { ok: false, error: "Application must be a PDF or Word document" },
              { status: 400, headers: { "Cache-Control": "no-store" } }
            );
          }
          const applicationBuffer = await application.arrayBuffer();
          applicationAttachments.push({
            filename: application.name || "application",
            content: Buffer.from(applicationBuffer),
            contentType: application.type || undefined,
          });
        }
      try {
        const receivedAt = new Date();
        const details: string[] = [];
        if (normalizedPhone) details.push(`Phone: ${sanitizeText(formatPhoneNumber(normalizedPhone))}`);
        if (normalizedBirthdate) details.push(`Birthdate: ${sanitizeText(formatBirthdate(normalizedBirthdate))}`);
        if (daysAvailableText) details.push(`Days Available: ${sanitizeText(daysAvailableText)}`);
        const applicationName =
          application instanceof File && application.size > 0
            ? application.name || "application"
            : undefined;

        await resend.emails.send({
          from: "The Notebook Café <onboarding@resend.dev>",
          to: CAREERS_EMAIL_RECIPIENT,
          replyTo: sanitizeEmail(normalizedEmail),
          subject: `Careers Application: ${sanitizeText(resolvedRole)}`,
          text: buildCareersEmailText({
            name: sanitizeText(resolvedName),
            email: sanitizeEmail(normalizedEmail),
            role: sanitizeText(resolvedRole),
            availability: sanitizeText(resolvedAvailability),
            message: sanitizeMultilineText(normalizedMessage),
            resumeName: sanitizeText(resume.name || "resume"),
            applicationName,
            details,
            receivedAt,
          }),
          html: buildCareersEmailHtml({
            name: resolvedName,
            email: normalizedEmail,
            role: resolvedRole,
            availability: resolvedAvailability,
            message: normalizedMessage,
            resumeName: resume.name || "resume",
            applicationName,
            details,
            receivedAt,
          }),
          attachments: [attachment, ...applicationAttachments],
        });
      } catch (emailError) {
        logger.error("Failed to send careers email", emailError);
      }
    } else {
      logger.warn("Resend client not initialized - careers email not sent");
    }

    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    logger.error("Careers application submission error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
