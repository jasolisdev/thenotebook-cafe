import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import {
  validateOrigin,
  checkRateLimit,
  validateUploadedFile,
  logger,
  sanitizeEmail,
  sanitizeText,
  sanitizePhone,
} from "@/app/lib";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.trim();
  if (email.length > 254) return null;
  if (/[<>"'`\s]/.test(email)) return null;
  if (!EMAIL_RE.test(email)) return null;
  return email;
}

export async function POST(req: Request) {
  // CSRF protection
  const originError = validateOrigin(req);
  if (originError) return originError;

  // Rate limiting: 2 requests per hour (applications are infrequent)
  const rateLimitError = checkRateLimit(req, "/api/apply", 2, 3600000);
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

    // Upload resume to Sanity (if provided)
    let resumeAsset = null;
    if (resumeFile) {
      // Validate file with magic number checks
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
      const buffer = Buffer.from(arrayBuffer);

      resumeAsset = await writeClient.assets.upload("file", buffer, {
        filename: resumeFile.name,
        contentType: resumeFile.type,
      });
    }

    // Upload supplemental application if provided
    let supplementalAsset = null;
    if (supplementalFile) {
      // Validate supplemental file with magic number checks
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
      const suppBuffer = Buffer.from(suppArrayBuffer);

      supplementalAsset = await writeClient.assets.upload("file", suppBuffer, {
        filename: supplementalFile.name,
        contentType: supplementalFile.type,
      });
    }

    // Create job application document
    type FileReference = {
      _type: "file";
      asset: {
        _type: "reference";
        _ref: string;
      };
    };

    const applicationData: {
      _type: "jobApplication";
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
      status: "new";
      appliedAt: string;
      resume?: FileReference;
      supplementalApplication?: FileReference;
    } = {
      _type: "jobApplication",
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
      status: "new",
      appliedAt: new Date().toISOString(),
    };

    // Add optional fields if provided (with sanitization)
    if (message) {
      applicationData.message = sanitizeText(message);
    }
    if (resumeAsset) {
      applicationData.resume = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: resumeAsset._id,
        },
      };
    }

    // Add supplemental application if uploaded
    if (supplementalAsset) {
      applicationData.supplementalApplication = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: supplementalAsset._id,
        },
      };
    }

    const doc = await writeClient.create(applicationData);

    return NextResponse.json(
      { ok: true, id: doc._id },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    logger.error("Application submission error", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
