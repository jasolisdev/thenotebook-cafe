/**
 * CSRF Protection Utility
 *
 * Validates request origin to prevent Cross-Site Request Forgery attacks.
 * Checks that the Origin header matches allowed domains.
 *
 * @example
 * import { validateOrigin } from '@/app/lib/csrf';
 *
 * export async function POST(req: Request) {
 *   const originError = validateOrigin(req);
 *   if (originError) return originError;
 *   // ... process request
 * }
 */

import { NextResponse } from "next/server";

/**
 * Allowed origins for API requests
 * In production, this should match your actual domain(s)
 */
const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://thenotebookcafellc.com",
  "https://www.thenotebookcafellc.com",
  "https://thenotebook.cafe",
  "https://notebook.cafe",
];

function normalizeOrigin(origin: string): string | null {
  try {
    const parsed = new URL(origin);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

function getAllowedOrigins(): Set<string> {
  const allowed = new Set<string>();

  for (const origin of DEFAULT_ALLOWED_ORIGINS) {
    const normalized = normalizeOrigin(origin);
    if (normalized) allowed.add(normalized);
  }

  const deploymentOrigins = [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null,
    process.env.NEXT_PUBLIC_SITE_URL ?? null,
    process.env.SITE_URL ?? null,
  ];

  for (const origin of deploymentOrigins) {
    if (!origin) continue;
    const normalized = normalizeOrigin(origin);
    if (normalized) allowed.add(normalized);
  }

  const extraAllowedOrigins = process.env.CSRF_ALLOWED_ORIGINS;
  if (extraAllowedOrigins) {
    for (const origin of extraAllowedOrigins.split(",")) {
      const normalized = normalizeOrigin(origin.trim());
      if (normalized) allowed.add(normalized);
    }
  }

  return allowed;
}

const ALLOWED_ORIGINS = getAllowedOrigins();

/**
 * Check if an origin is allowed
 */
function isOriginAllowed(origin: string): boolean {
  const normalizedOrigin = normalizeOrigin(origin);
  if (!normalizedOrigin) return false;
  return ALLOWED_ORIGINS.has(normalizedOrigin);
}

/**
 * Validates the request origin header
 *
 * @param req - The incoming request
 * @returns NextResponse with 403 error if origin invalid, null if valid
 */
export function validateOrigin(req: Request): NextResponse | null {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // Check origin header first (most reliable)
  if (origin) {
    if (!isOriginAllowed(origin)) {
      return NextResponse.json(
        { ok: false, error: "Invalid origin" },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      );
    }
    return null;
  }

  // Fallback to referer (less reliable but better than nothing)
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = refererUrl.origin;
      if (!isOriginAllowed(refererOrigin)) {
        return NextResponse.json(
          { ok: false, error: "Invalid referer" },
          { status: 403, headers: { "Cache-Control": "no-store" } }
        );
      }
      return null;
    } catch {
      // Invalid URL in referer
      return NextResponse.json(
        { ok: false, error: "Invalid referer" },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      );
    }
  }

  // No origin or referer - likely not a browser request
  return NextResponse.json(
    { ok: false, error: "Missing origin header" },
    { status: 403, headers: { "Cache-Control": "no-store" } }
  );
}
