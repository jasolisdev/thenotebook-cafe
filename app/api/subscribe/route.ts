import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json().catch(() => ({}));

    // Validate
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // Check duplicate (case-insensitive)
    const existing = await client.fetch(
      `*[_type=="subscriber" && lower(email) == lower($email)][0]{_id}`,
      { email }
    );
    if (existing?._id) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    // Create
    const doc = await writeClient.create({
      _type: "subscriber",
      email,
      source: source || "homepage",
      status: "subscribed",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
