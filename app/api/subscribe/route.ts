import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.trim();
  if (email.length > 254) return null;
  if (/[<>"'`\s]/.test(email)) return null;
  if (!EMAIL_RE.test(email)) return null;
  return email;
}

function normalizeSource(input: unknown): string {
  if (typeof input !== "string") return "homepage";
  const source = input.trim();
  if (!source) return "homepage";
  return source.length > 64 ? source.slice(0, 64) : source;
}

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json().catch(() => ({}));

    const token = randomUUID();

    // Validate
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Check duplicate (case-insensitive)
    const existing = await client.fetch(
      `*[_type=="subscriber" && lower(email) == lower($email)][0]{_id,status,unsubscribeToken}`,
      { email: normalizedEmail }
    );
    if (existing?._id) {
      if (!existing.unsubscribeToken) {
        await writeClient
          .patch(existing._id)
          .set({ unsubscribeToken: token })
          .commit({ autoGenerateArrayKeys: true, returnDocuments: false });
      }
      return NextResponse.json(
        { ok: true, duplicate: true },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    // Create
    const doc = await writeClient.create({
      _type: "subscriber",
      email: normalizedEmail,
      source: normalizeSource(source),
      status: "subscribed",
      unsubscribeToken: token,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { ok: true, id: doc._id },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
