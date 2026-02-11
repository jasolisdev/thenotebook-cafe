import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/app/lib";
import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  createAuthCookieValue,
} from "@/app/lib/server/authCookie";

export async function POST(request: Request) {
  // Rate limiting: 3 requests per 15 minutes (prevent brute force)
  const rateLimitError = await checkRateLimit(request, "/api/auth/verify", 3, 900000);
  if (rateLimitError) return rateLimitError;

  try {
    const { password } = await request.json();
    const correctPassword = process.env.SITE_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { success: false, message: "Password not configured" },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      const authCookieValue = createAuthCookieValue();
      if (!authCookieValue) {
        return NextResponse.json(
          { success: false, message: "Auth cookie secret not configured" },
          { status: 500 }
        );
      }

      // Set a signed cookie that expires in 7 days
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, authCookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Incorrect password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
