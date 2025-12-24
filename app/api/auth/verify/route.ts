import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkRateLimit } from "@/app/lib";

export async function POST(request: Request) {
  // Rate limiting: 3 requests per 15 minutes (prevent brute force)
  const rateLimitError = checkRateLimit(request, "/api/auth/verify", 3, 900000);
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
      // Set a cookie that expires in 7 days
      const cookieStore = await cookies();
      cookieStore.set("site-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
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
