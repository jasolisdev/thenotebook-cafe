/**
 * Unsubscribe Route
 *
 * Redirects to Google Form for unsubscribe requests.
 * The Google Form collects the email and triggers Apps Script
 * to mark the subscriber as unsubscribed in Google Sheets.
 *
 * @see docs/google-sheets-newsletter.md for architecture details
 */
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/app/lib";

const UNSUBSCRIBE_FORM_URL = process.env.NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL;

function htmlResponse(title: string, message: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 48px 24px;
      line-height: 1.6;
      color: #2C2420;
      background: #FAF9F6;
      margin: 0;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #e7e0d9;
      border-radius: 12px;
      padding: 32px 36px;
      box-shadow: 0 10px 30px rgba(44,36,32,0.06);
      text-align: center;
    }
    h1 { margin: 0 0 12px; font-size: 24px; }
    p { margin: 0 0 24px; color: #4a3b32; }
    a.button {
      display: inline-block;
      background: #a48d78;
      color: #fff;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
    }
    a.button:hover { background: #8e7965; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p>${message}</p>
    ${UNSUBSCRIBE_FORM_URL ? `<a href="${UNSUBSCRIBE_FORM_URL}" class="button">Unsubscribe</a>` : ''}
  </div>
</body>
</html>`,
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
  // Rate limiting: 10 requests per hour
  const rateLimitError = checkRateLimit(req, "/api/unsubscribe", 10, 3600000);
  if (rateLimitError) return rateLimitError;

  // If unsubscribe form URL is configured, redirect to it
  if (UNSUBSCRIBE_FORM_URL) {
    return NextResponse.redirect(UNSUBSCRIBE_FORM_URL, 302);
  }

  // Fallback message if form URL not configured
  return htmlResponse(
    "Unsubscribe",
    "To unsubscribe from our newsletter, please reply to any newsletter email with 'Unsubscribe' in the subject line, or contact us at thenotebookcafellc@gmail.com."
  );
}
