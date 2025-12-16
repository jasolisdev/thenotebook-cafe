/**
 * Next.js Middleware
 *
 * Implements security headers and API request logging.
 * Runs on all routes except static files.
 *
 * Security Features:
 * - Content Security Policy (CSP)
 * - X-Frame-Options (clickjacking prevention)
 * - X-Content-Type-Options (MIME sniffing prevention)
 * - Referrer-Policy
 * - Permissions-Policy
 * - Strict-Transport-Security (HSTS) in production
 *
 * @see PRODUCTION_HARDENING.md Phase 2
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "@/app/lib/logger";

export function middleware(req: NextRequest) {
  const start = Date.now();
  const { pathname, search } = req.nextUrl;

  // Get client IP for logging
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // Log API requests
  if (pathname.startsWith("/api/")) {
    logger.info(`[${req.method}] ${pathname}${search} - IP: ${ip}`);
  }

  // Create response
  const response = NextResponse.next();

  // Security Headers
  // -----------------

  /**
   * X-Frame-Options: DENY
   * Prevents the page from being embedded in iframes (clickjacking protection)
   */
  response.headers.set("X-Frame-Options", "DENY");

  /**
   * X-Content-Type-Options: nosniff
   * Prevents browsers from MIME-sniffing the response
   */
  response.headers.set("X-Content-Type-Options", "nosniff");

  /**
   * Referrer-Policy
   * Controls how much referrer information is sent
   */
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  /**
   * Permissions-Policy
   * Disables browser features not needed by the site
   */
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  /**
   * Content Security Policy (CSP)
   * Prevents XSS, injection attacks, and unauthorized resource loading
   */
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval/inline
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' https://cdn.sanity.io https://images.unsplash.com data: blob:",
    "media-src 'self' https://cdn.sanity.io",
    "connect-src 'self' https://cdn.sanity.io https://*.sanity.io",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  /**
   * Strict-Transport-Security (HSTS)
   * Forces HTTPS connections (production only)
   */
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // Performance Monitoring
  // ----------------------

  /**
   * Add response time header for API endpoints
   * Useful for monitoring and debugging
   */
  if (pathname.startsWith("/api/")) {
    const duration = Date.now() - start;
    response.headers.set("X-Response-Time", `${duration}ms`);
    logger.info(`[${req.method}] ${pathname} - ${duration}ms`);
  }

  return response;
}

/**
 * Middleware Configuration
 *
 * Runs on all routes except:
 * - /_next/static (static files)
 * - /_next/image (image optimization)
 * - /favicon.ico (favicon)
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
