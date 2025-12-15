import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlResponse(message: string, status = 200) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><title>Unsubscribe</title></head><body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 48px; line-height: 1.6; color: #2C2420; background:#FAF9F6;"><div style="max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #e7e0d9; border-radius: 12px; padding: 32px 36px; box-shadow: 0 10px 30px rgba(44,36,32,0.06);"><h1 style="margin:0 0 12px; font-size: 24px;">Subscription Update</h1><p style="margin:0;">${escapeHtml(message)}</p></div></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return htmlResponse("Unsubscribe token missing.", 400);
  }

  const subscriber = await client.fetch<{
    _id: string;
    email: string;
    status: string;
  } | null>(
    `*[_type=="subscriber" && unsubscribeToken == $token][0]{_id,email,status}`,
    { token } as Record<string, unknown>
  );

  if (!subscriber?._id) {
    return htmlResponse("We couldn't find that subscription.", 404);
  }

  if (subscriber.status === "unsubscribed") {
    return htmlResponse(
      `You're already unsubscribed for ${subscriber.email || "this address"}.`,
      200
    );
  }

  await writeClient
    .patch(subscriber._id)
    .set({
      status: "unsubscribed",
      unsubscribedAt: new Date().toISOString(),
    })
    .commit({ autoGenerateArrayKeys: true, returnDocuments: false });

  return htmlResponse("You're unsubscribed. Thank you.");
}
