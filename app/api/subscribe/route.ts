/**
 * Newsletter Subscription API
 *
 * Forwards subscription requests to Google Sheets via Apps Script.
 * Handles validation, rate limiting, and CSRF protection.
 *
 * @see docs/google-sheets-newsletter.md for architecture details
 */
import { NextResponse } from "next/server";
import {
  validateOrigin,
  checkRateLimit,
  logger,
} from "@/app/lib";
import { normalizeEmail, normalizeText } from "@/app/lib/server/validation";

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

function normalizeSource(input: unknown): string {
  const source = normalizeText(input, 64);
  return source || "homepage";
}

/**
 * Hash IP address for abuse tracking (first 8 bytes of SHA-256)
 */
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: Request) {
  // CSRF protection
  const originError = validateOrigin(req);
  if (originError) return originError;

  // Rate limiting: 5 requests per minute
  const rateLimitError = await checkRateLimit(req, "/api/subscribe", 5, 60000);
  if (rateLimitError) return rateLimitError;

  // Check if Google Apps Script URL is configured
  if (!GOOGLE_APPS_SCRIPT_URL) {
    logger.error("GOOGLE_APPS_SCRIPT_URL not configured");
    return NextResponse.json(
      { ok: false, error: "Newsletter service not configured" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const { email, source } = await req.json().catch(() => ({}));

    // Validate email
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Hash IP for abuse tracking
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const ipHash = await hashIP(ip);

    // Forward to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalizedEmail,
        source: normalizeSource(source),
        ipHash,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      logger.error("Google Sheets subscription failed", {
        email: normalizedEmail,
        error: result.error,
      });
      return NextResponse.json(
        { ok: false, error: result.error || "Subscription failed" },
        { status: 500, headers: { "Cache-Control": "no-store" } }
      );
    }

    logger.info("Newsletter subscription", {
      email: normalizedEmail,
      source: normalizeSource(source),
      duplicate: result.duplicate,
      resubscribed: result.resubscribed,
    });

    return NextResponse.json(
      {
        ok: true,
        duplicate: result.duplicate || false,
        resubscribed: result.resubscribed || false,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    logger.error("Subscribe error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
