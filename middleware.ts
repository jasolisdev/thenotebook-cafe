/**
 * Next.js Proxy (Next.js 16)
 *
 * Handles authentication, security headers, and request logging.
 *
 * Security Headers:
 * - X-Frame-Options: Prevents clickjacking attacks
 * - X-Content-Type-Options: Prevents MIME sniffing
 * - Referrer-Policy: Controls referrer information
 * - Permissions-Policy: Restricts browser features
 * - Content-Security-Policy: Prevents XSS and injection attacks
 * - Strict-Transport-Security: Enforces HTTPS (production only)
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { pathname, search } = request.nextUrl;
  const method = request.method;

  // Log API requests
  const isApiRoute = pathname.startsWith("/api/");
  if (isApiRoute) {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    console.log(`[${method}] ${pathname}${search} - IP: ${ip.split(",")[0].trim()}`);
  }

  // Allow access to /studio (Sanity CMS) and API routes without authentication
  if (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    const response = NextResponse.next();
    addSecurityHeaders(response, isApiRoute, startTime, pathname, method);
    return response;
  }

  // Check if user is authenticated
  const authCookie = request.cookies.get("site-auth");

  // If not authenticated and SITE_PASSWORD is set, show password gate
  if (!authCookie && process.env.SITE_PASSWORD) {
    // Instead of redirecting, we'll handle this in the layout
    const response = NextResponse.next();
    response.headers.set("x-requires-auth", "true");
    addSecurityHeaders(response, isApiRoute, startTime, pathname, method);
    return response;
  }

  const response = NextResponse.next();
  addSecurityHeaders(response, isApiRoute, startTime, pathname, method);
  return response;
}

/**
 * Add security headers and performance metrics to response
 */
function addSecurityHeaders(
  response: NextResponse,
  isApiRoute: boolean,
  startTime: number,
  pathname: string,
  method: string
): void {
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
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com", // Next.js requires unsafe-eval and unsafe-inline
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Tailwind and Google Fonts
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' https://cdn.sanity.io https://images.unsplash.com data: blob:",
    "media-src 'self' https://cdn.sanity.io",
    "connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://region1.google-analytics.com https://region1.analytics.google.com https://*.vercel.com",
    "frame-src 'self' https://www.google.com https://maps.google.com",
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
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
