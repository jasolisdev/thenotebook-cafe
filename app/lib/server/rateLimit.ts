/**
 * Rate Limiting Utility
 *
 * Simple in-memory rate limiter to prevent API abuse.
 * Uses IP address + endpoint as key.
 *
 * NOTE: This is a basic implementation suitable for single-server deployments.
 * For production with multiple servers, consider using Redis or Upstash.
 *
 * @example
 * import { checkRateLimit } from '@/app/lib/rateLimit';
 *
 * export async function POST(req: Request) {
 *   const rateLimitError = checkRateLimit(req, '/api/subscribe', 5, 60000);
 *   if (rateLimitError) return rateLimitError;
 *   // ... process request
 * }
 */

import { NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store: Map<key, RateLimitEntry>
// Key format: "ip:endpoint"
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Get client IP from request headers
 */
function getClientIP(req: Request): string {
  // Check common headers set by proxies/load balancers
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list
    return forwarded.split(",")[0].trim();
  }

  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;

  // Fallback (won't work in production behind proxy)
  return "unknown";
}

/**
 * Check rate limit for a request
 *
 * @param req - The incoming request
 * @param endpoint - Endpoint identifier (e.g., '/api/subscribe')
 * @param maxRequests - Maximum requests allowed in the time window
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @returns NextResponse with 429 error if rate limit exceeded, null if within limit
 */
export function checkRateLimit(
  req: Request,
  endpoint: string,
  maxRequests: number,
  windowMs: number = 60000
): NextResponse | null {
  const ip = getClientIP(req);
  const key = `${ip}:${endpoint}`;
  const now = Date.now();

  // Clean up expired entries periodically (simple cleanup)
  if (rateLimitStore.size > 10000) {
    for (const [k, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(k);
      }
    }
  }

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // First request or window expired - create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return null;
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  // Check if limit exceeded
  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000); // seconds
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": retryAfter.toString(),
        },
      }
    );
  }

  return null;
}
