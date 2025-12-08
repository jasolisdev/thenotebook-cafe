import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json().catch(() => ({}));

    const token = randomUUID();

    // Validate
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // Check duplicate (case-insensitive)
    const existing = await client.fetch(
      `*[_type=="subscriber" && lower(email) == lower($email)][0]{_id,status,unsubscribeToken}`,
      { email }
    );
    if (existing?._id) {
      if (!existing.unsubscribeToken) {
        await writeClient
          .patch(existing._id)
          .set({ unsubscribeToken: token })
          .commit({ autoGenerateArrayKeys: true, returnDocuments: false });
      }
      return NextResponse.json({ ok: true, duplicate: true });
    }

    // Create
    const doc = await writeClient.create({
      _type: "subscriber",
      email,
      source: source || "homepage",
      status: "subscribed",
      unsubscribeToken: token,
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
