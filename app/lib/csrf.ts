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
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://thenotebookcafe.com",
  "https://www.thenotebookcafe.com",
];

/**
 * Check if an origin is allowed
 * Supports exact matches and Vercel preview deployments
 */
function isOriginAllowed(origin: string): boolean {
  // Check exact matches
  if (ALLOWED_ORIGINS.includes(origin)) {
    return true;
  }

  // Allow Vercel preview deployments (*.vercel.app)
  if (origin.endsWith('.vercel.app') && origin.startsWith('https://')) {
    return true;
  }

  return false;
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
