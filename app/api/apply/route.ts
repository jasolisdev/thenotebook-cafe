import { NextResponse } from "next/server";
import {
  validateOrigin,
  checkRateLimit,
  validateUploadedFile,
  logger,
  sanitizeEmail,
  sanitizeText,
  sanitizePhone,
} from "@/app/lib";
import { normalizeEmail } from "@/app/lib/server/validation";
import { Resend } from "resend";

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

export async function POST(req: Request) {
  // CSRF protection
  const originError = validateOrigin(req);
  if (originError) return originError;

  // Rate limiting: 2 requests per hour (applications are infrequent)
  const rateLimitError = await checkRateLimit(req, "/api/apply", 2, 3600000);
  if (rateLimitError) return rateLimitError;

  try {
    const formData = await req.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const emailRaw = formData.get("email");
    const emailString = typeof emailRaw === "string" ? emailRaw : "";
    const phone = formData.get("phone") as string;
    const birthdate = formData.get("birthdate") as string;
    const positionsRaw = formData.get("positions") as string;
    const employmentType = formData.get("employmentType") as string;
    const daysAvailableRaw = formData.get("daysAvailable") as string;
    const startDate = formData.get("startDate") as string;
    const hoursPerWeek = formData.get("hoursPerWeek") as string;
    const commitmentLength = formData.get("commitmentLength") as string;
    const message = formData.get("message") as string;
    const resumeValue = formData.get("resume");
    const supplementalValue = formData.get("supplementalApplication");
    const resumeFile = resumeValue instanceof File ? resumeValue : null;
    const supplementalFile = supplementalValue instanceof File ? supplementalValue : null;

    const email = normalizeEmail(emailString);

    // Validate required fields
    if (!firstName || !lastName || !emailString || !phone || !birthdate || !positionsRaw || !employmentType || !daysAvailableRaw || !startDate || !hoursPerWeek || !commitmentLength) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Validate email
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Parse positions array
    let positions: string[] = [];
    try {
      positions = JSON.parse(positionsRaw);
      if (!Array.isArray(positions) || positions.length === 0) {
        throw new Error("Invalid positions");
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid positions data" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Parse days available array
    let daysAvailable: string[] = [];
    try {
      daysAvailable = JSON.parse(daysAvailableRaw);
      if (!Array.isArray(daysAvailable) || daysAvailable.length === 0) {
        throw new Error("Invalid days available");
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid days available data" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Validate resume file if provided
    let resumeBuffer: Buffer | null = null;
    let resumeFilename: string | null = null;
    if (resumeFile) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      const validation = await validateUploadedFile(
        resumeFile,
        allowedTypes,
        maxSize
      );

      if (!validation.valid) {
        return NextResponse.json(
          { ok: false, error: validation.error || "Invalid resume file" },
          { status: 400, headers: { "Cache-Control": "no-store" } }
        );
      }

      const arrayBuffer = await resumeFile.arrayBuffer();
      resumeBuffer = Buffer.from(arrayBuffer);
      resumeFilename = resumeFile.name;
    }

    // Validate supplemental application if provided
    let supplementalBuffer: Buffer | null = null;
    let supplementalFilename: string | null = null;
    if (supplementalFile) {
      const suppValidation = await validateUploadedFile(
        supplementalFile,
        ["application/pdf"],
        5 * 1024 * 1024
      );

      if (!suppValidation.valid) {
        return NextResponse.json(
          {
            ok: false,
            error:
              suppValidation.error || "Invalid supplemental application file",
          },
          { status: 400, headers: { "Cache-Control": "no-store" } }
        );
      }

      const suppArrayBuffer = await supplementalFile.arrayBuffer();
      supplementalBuffer = Buffer.from(suppArrayBuffer);
      supplementalFilename = supplementalFile.name;
    }

    // Send email via Resend
    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    try {
      const receivedAt = new Date();
      const emailAttachments: Array<{ filename: string; content: Buffer }> = [];

      // Add resume attachment
      if (resumeBuffer && resumeFilename) {
        emailAttachments.push({
          filename: resumeFilename,
          content: resumeBuffer,
        });
      }

      // Add supplemental attachment
      if (supplementalBuffer && supplementalFilename) {
        emailAttachments.push({
          filename: supplementalFilename,
          content: supplementalBuffer,
        });
      }

      await resend.emails.send({
        from: "The Notebook Café <onboarding@resend.dev>",
        to: CONTACT_EMAIL_RECIPIENT,
        replyTo: sanitizeEmail(email),
        subject: `Job Application: ${sanitizeText(firstName)} ${sanitizeText(lastName)} - ${positions.map(p => sanitizeText(p)).join(", ")}`,
        attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
        html: buildApplicationEmailHtml({
          firstName: sanitizeText(firstName),
          lastName: sanitizeText(lastName),
          email: sanitizeEmail(email),
          phone: sanitizePhone(phone),
          birthdate: sanitizeText(birthdate),
          positions: positions.map(p => sanitizeText(p)),
          employmentType: sanitizeText(employmentType),
          daysAvailable: daysAvailable.map(d => sanitizeText(d)),
          startDate: sanitizeText(startDate),
          hoursPerWeek: sanitizeText(hoursPerWeek),
          commitmentLength: sanitizeText(commitmentLength),
          message: message ? sanitizeText(message) : undefined,
          receivedAt,
          hasResume: !!resumeBuffer,
          hasSupplemental: !!supplementalBuffer,
        }),
      });

      logger.info("Job application sent via email", {
        email: sanitizeEmail(email),
        positions: positions.map(p => sanitizeText(p))
      });

      return NextResponse.json(
        { ok: true },
        { headers: { "Cache-Control": "no-store" } }
      );
    } catch (emailError) {
      logger.error("Failed to send job application email", emailError);
      return NextResponse.json(
        { ok: false, error: "Failed to send application. Please try again." },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }
  } catch (err) {
    logger.error("Application submission error", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

// Build HTML email for job application
function buildApplicationEmailHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  positions: string[];
  employmentType: string;
  daysAvailable: string[];
  startDate: string;
  hoursPerWeek: string;
  commitmentLength: string;
  message?: string;
  receivedAt: Date;
  hasResume: boolean;
  hasSupplemental: boolean;
}): string {
  const timestamp = data.receivedAt.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "long",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Job Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2c2420 0%, #4a3b32 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Job Application</h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">The Notebook Café</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Applicant Info -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <h2 style="margin: 0 0 16px 0; color: #2c2420; font-size: 20px; font-weight: 600;">Applicant Information</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Name</div>
                    <div style="color: #2c2420; font-size: 16px; font-weight: 500;">${data.firstName} ${data.lastName}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</div>
                    <div style="color: #2c2420; font-size: 16px;"><a href="mailto:${data.email}" style="color: #a48d78; text-decoration: none;">${data.email}</a></div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Phone</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.phone}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Date of Birth</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.birthdate}</div>
                  </td>
                </tr>
              </table>

              <!-- Position Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <h2 style="margin: 0 0 16px 0; color: #2c2420; font-size: 20px; font-weight: 600;">Position Details</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Positions Interested In</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.positions.join(", ")}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Employment Type</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.employmentType}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Days Available</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.daysAvailable.join(", ")}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Start Date</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.startDate}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Hours Per Week</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.hoursPerWeek}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Commitment Length</div>
                    <div style="color: #2c2420; font-size: 16px;">${data.commitmentLength}</div>
                  </td>
                </tr>
              </table>

              ${data.message ? `
              <!-- Additional Message -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <h2 style="margin: 0 0 16px 0; color: #2c2420; font-size: 20px; font-weight: 600;">Additional Message</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #f9f9f9; border-radius: 4px; border-left: 3px solid #a48d78;">
                    <p style="margin: 0; color: #4a3b32; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Attachments Info -->
              ${data.hasResume || data.hasSupplemental ? `
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #f0f7ff; border-radius: 4px; border-left: 3px solid #4a90e2;">
                    <p style="margin: 0; color: #2c5282; font-size: 14px;">
                      📎 <strong>Attachments:</strong> ${data.hasResume ? 'Resume' : ''}${data.hasResume && data.hasSupplemental ? ' and ' : ''}${data.hasSupplemental ? 'Supplemental Application' : ''} attached to this email
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Reply Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: Job Application - ${data.positions[0]}" style="display: inline-block; padding: 14px 32px; background-color: #a48d78; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 15px;">Reply to Applicant</a>
                  </td>
                </tr>
              </table>

              <!-- Timestamp -->
              <p style="margin: 32px 0 0 0; padding-top: 24px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
                Received: ${timestamp}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 24px 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #666; font-size: 13px;">
                This application was submitted through thenotebookcafellc.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
