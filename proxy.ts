import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to /studio (Sanity CMS) and API routes without authentication
  if (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const authCookie = request.cookies.get("site-auth");

  // If not authenticated and SITE_PASSWORD is set, show password gate
  if (!authCookie && process.env.SITE_PASSWORD) {
    // Instead of redirecting, we'll handle this in the layout
    const response = NextResponse.next();
    response.headers.set("x-requires-auth", "true");
    return response;
  }

  return NextResponse.next();
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
