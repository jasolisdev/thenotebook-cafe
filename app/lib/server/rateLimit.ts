/**
 * Rate Limiting Utility
 *
 * Provides rate limiting for API endpoints with support for both:
 * - In-memory storage (development/single-server)
 * - Upstash Redis (production/multi-server)
 *
 * ## Important Limitations (In-Memory Mode)
 *
 * When using the default in-memory store (no Redis configured):
 * - Rate limits are PER-SERVER-INSTANCE, not global
 * - With N server instances, actual rate limit is N × configured limit
 * - Rate limit state is lost on server restart
 * - Not suitable for horizontal scaling or serverless (Vercel functions)
 *
 * ## Production Recommendation
 *
 * For production deployments, configure Upstash Redis:
 * 1. Create an Upstash Redis database at https://upstash.com
 * 2. Set environment variables:
 *    - UPSTASH_REDIS_REST_URL
 *    - UPSTASH_REDIS_REST_TOKEN
 *
 * The rate limiter will automatically use Redis when these are configured.
 *
 * @example
 * // Basic usage (same API for both modes)
 * import { checkRateLimit } from '@/app/lib/server/rateLimit';
 *
 * export async function POST(req: Request) {
 *   const rateLimitError = await checkRateLimit(req, '/api/subscribe', 5, 60000);
 *   if (rateLimitError) return rateLimitError;
 *   // ... process request
 * }
 *
 * @module lib/server/rateLimit
 */

import { NextResponse } from "next/server";

// ============================================================================
// Types
// ============================================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitResult {
  limited: boolean;
  remaining: number;
  resetAt: number;
}

// ============================================================================
// Configuration
// ============================================================================

const UPSTASH_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const USE_REDIS = !!(UPSTASH_REST_URL && UPSTASH_REST_TOKEN);

// In-memory store (fallback)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup interval tracking
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 60000; // 1 minute

// ============================================================================
// IP Detection
// ============================================================================

/**
 * Get client IP from request headers
 * Handles common proxy/CDN headers with security considerations
 */
function getClientIP(req: Request): string {
  // Check Cloudflare header first (most reliable when using CF)
  const cfIP = req.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP;

  // Check x-forwarded-for (standard proxy header)
  // SECURITY: Only trust the leftmost IP if behind a trusted proxy
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  // Check x-real-ip (nginx)
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;

  // Vercel specific
  const vercelIP = req.headers.get("x-vercel-forwarded-for");
  if (vercelIP) {
    return vercelIP.split(",")[0].trim();
  }

  return "unknown";
}

// ============================================================================
// Upstash Redis Rate Limiting
// ============================================================================

/**
 * Check rate limit using Upstash Redis
 * Uses atomic INCR operation for accurate counting across instances
 */
async function checkRateLimitRedis(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const windowSeconds = Math.ceil(windowMs / 1000);

  try {
    // Use Upstash REST API for atomic increment with TTL
    const response = await fetch(`${UPSTASH_REST_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["TTL", key],
      ]),
    });

    if (!response.ok) {
      console.error("[RateLimit] Upstash request failed:", response.status);
      // Fall back to allowing request on Redis error
      return { limited: false, remaining: maxRequests, resetAt: Date.now() + windowMs };
    }

    const results = await response.json();
    const count = results[0]?.result ?? 1;
    const ttl = results[1]?.result ?? -1;

    // Set TTL on first request (when TTL is -1, key exists but no expiry)
    if (ttl === -1) {
      await fetch(`${UPSTASH_REST_URL}/EXPIRE/${encodeURIComponent(key)}/${windowSeconds}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${UPSTASH_REST_TOKEN}` },
      });
    }

    const resetAt = Date.now() + (ttl > 0 ? ttl * 1000 : windowMs);
    const remaining = Math.max(0, maxRequests - count);
    const limited = count > maxRequests;

    return { limited, remaining, resetAt };
  } catch (error) {
    console.error("[RateLimit] Redis error:", error);
    // Allow request on error to prevent blocking legitimate users
    return { limited: false, remaining: maxRequests, resetAt: Date.now() + windowMs };
  }
}

// ============================================================================
// In-Memory Rate Limiting (Development/Single-Server)
// ============================================================================

/**
 * Check rate limit using in-memory store
 * WARNING: Not suitable for multi-server/serverless deployments
 */
function checkRateLimitMemory(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  // Periodic cleanup of expired entries
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    lastCleanup = now;
    let cleaned = 0;
    for (const [k, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(k);
        cleaned++;
      }
    }
    if (cleaned > 0) {
      console.debug(`[RateLimit] Cleaned ${cleaned} expired entries`);
    }
  }

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      limited: false,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    limited: entry.count > maxRequests,
    remaining: Math.max(0, maxRequests - entry.count),
    resetAt: entry.resetAt,
  };
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Check rate limit for a request
 *
 * Automatically uses Redis when configured (UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN environment variables), otherwise falls back
 * to in-memory storage.
 *
 * @param req - The incoming request
 * @param endpoint - Endpoint identifier (e.g., '/api/subscribe')
 * @param maxRequests - Maximum requests allowed in the time window
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @returns NextResponse with 429 error if rate limited, null if within limit
 *
 * @example
 * const rateLimitError = await checkRateLimit(req, '/api/contact', 3, 60000);
 * if (rateLimitError) return rateLimitError;
 */
export async function checkRateLimit(
  req: Request,
  endpoint: string,
  maxRequests: number,
  windowMs: number = 60000
): Promise<NextResponse | null> {
  const ip = getClientIP(req);
  const key = `ratelimit:${ip}:${endpoint}`;

  // Use Redis if configured, otherwise fall back to in-memory
  const result = USE_REDIS
    ? await checkRateLimitRedis(key, maxRequests, windowMs)
    : checkRateLimitMemory(key, maxRequests, windowMs);

  if (result.limited) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": Math.max(1, retryAfter).toString(),
          "X-RateLimit-Limit": maxRequests.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": result.resetAt.toString(),
        },
      }
    );
  }

  return null;
}

/**
 * Check if Redis rate limiting is enabled
 * Useful for logging and debugging
 */
export function isRedisEnabled(): boolean {
  return USE_REDIS;
}
