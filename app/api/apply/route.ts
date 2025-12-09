import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const positionsRaw = formData.get("positions") as string;
    const employmentType = formData.get("employmentType") as string;
    const daysAvailableRaw = formData.get("daysAvailable") as string;
    const startDate = formData.get("startDate") as string;
    const hoursPerWeek = formData.get("hoursPerWeek") as string;
    const commitmentLength = formData.get("commitmentLength") as string;
    const message = formData.get("message") as string;
    const resumeFile = formData.get("resume") as File | null;
    const supplementalFile = formData.get("supplementalApplication") as File | null;

    // Validate required fields
    if (!fullName || !email || !phone || !positionsRaw || !employmentType || !daysAvailableRaw || !startDate || !hoursPerWeek || !commitmentLength || !message || !resumeFile) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address" },
        { status: 400 }
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
        { status: 400 }
      );
    }

    // Parse days available array
    let daysAvailable: string[] = [];
    try {
      daysAvailable = JSON.parse(daysAvailableRaw);
      if (!Array.isArray(daysAvailable) || daysAvailable.length === 0) {
        throw new Error("Invalid days available");
      }
      // Validate Saturday requirement (café is closed Sunday)
      const hasSaturday = daysAvailable.includes("saturday");
      if (!hasSaturday) {
        return NextResponse.json(
          { ok: false, error: "Saturday availability is required" },
          { status: 400 }
        );
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes("weekend")) {
        return NextResponse.json(
          { ok: false, error: e.message },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { ok: false, error: "Invalid days available data" },
        { status: 400 }
      );
    }

    // Validate resume file
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { ok: false, error: "Resume must be PDF, DOC, or DOCX" },
        { status: 400 }
      );
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (resumeFile.size > maxSize) {
      return NextResponse.json(
        { ok: false, error: "Resume file size must be under 5MB" },
        { status: 400 }
      );
    }

    // Upload resume to Sanity
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resumeAsset = await writeClient.assets.upload("file", buffer, {
      filename: resumeFile.name,
      contentType: resumeFile.type,
    });

    // Upload supplemental application if provided
    let supplementalAsset = null;
    if (supplementalFile) {
      // Validate supplemental file
      if (supplementalFile.type !== "application/pdf") {
        return NextResponse.json(
          { ok: false, error: "Supplemental application must be a PDF" },
          { status: 400 }
        );
      }
      if (supplementalFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, error: "Supplemental application file size must be under 5MB" },
          { status: 400 }
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
      fullName: string;
      email: string;
      phone: string;
      positions: string[];
      resume: FileReference;
      employmentType: string;
      daysAvailable: string;
      startDate: string;
      hoursPerWeek: string;
      commitmentLength: string;
      message: string;
      status: "new";
      appliedAt: string;
      supplementalApplication?: FileReference;
    } = {
      _type: "jobApplication",
      fullName,
      email,
      phone,
      positions,
      resume: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: resumeAsset._id,
        },
      },
      employmentType,
      daysAvailable,
      startDate,
      hoursPerWeek,
      commitmentLength,
      message,
      status: "new",
      appliedAt: new Date().toISOString(),
    };

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

    return NextResponse.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error("Application submission error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
