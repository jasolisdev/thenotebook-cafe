/**
 * Next.js Middleware
 *
 * Runs on every request to add security headers and handle request logging.
 *
 * Security Headers:
 * - X-Frame-Options: Prevents clickjacking attacks
 * - X-Content-Type-Options: Prevents MIME sniffing
 * - Referrer-Policy: Controls referrer information
 * - Permissions-Policy: Restricts browser features
 * - Content-Security-Policy: Prevents XSS and injection attacks
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { pathname, search } = request.nextUrl;
  const method = request.method;

  // Log API requests (only in development or for API routes)
  const isApiRoute = pathname.startsWith("/api/");
  if (isApiRoute) {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    console.log(`[${method}] ${pathname}${search} - IP: ${ip.split(",")[0].trim()}`);
  }

  const response = NextResponse.next();

  // Add response time header for API routes
  if (isApiRoute) {
    const duration = Date.now() - startTime;
    response.headers.set("X-Response-Time", `${duration}ms`);
    console.log(`[${method}] ${pathname} - ${duration}ms`);
  }

  // Security Headers

  // Prevent clickjacking - don't allow site to be embedded in iframes
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Control referrer information sent to other sites
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict browser features (camera, microphone, geolocation, etc.)
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Content Security Policy (CSP)
  // Allows: self, Sanity CDN, Unsplash, Google Fonts, inline styles (for Next.js)
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval and unsafe-inline
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Tailwind and Google Fonts
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' https://cdn.sanity.io https://images.unsplash.com data: blob:",
    "media-src 'self' https://cdn.sanity.io",
    "connect-src 'self' https://cdn.sanity.io https://*.sanity.io",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  response.headers.set(
    "Content-Security-Policy",
    cspDirectives.join("; ")
  );

  // Strict-Transport-Security (HSTS) - only in production
  // Tells browsers to only access site via HTTPS for next year
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  return response;
}

// Apply middleware to all routes except static files and Next.js internals
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (*.svg, *.png, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
