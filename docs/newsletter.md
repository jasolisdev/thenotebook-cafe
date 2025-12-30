# Google Sheets Newsletter System

A free, lightweight newsletter signup system using Google Sheets + Apps Script.

---

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  Website Form   │────▶│  /api/subscribe  │────▶│  Google Apps Script │
│  (Next.js)      │     │  (proxy/validate)│     │  (Web App)          │
└─────────────────┘     └──────────────────┘     └──────────┬──────────┘
                                                            │
                                                            ▼
                                                 ┌─────────────────────┐
                                                 │   Google Sheet      │
                                                 │   (Source of Truth) │
                                                 └─────────────────────┘

Unsubscribe Flow:
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  Unsubscribe    │────▶│   Google Form       │────▶│   Apps Script       │
│  Link in Email  │     │   (collects email)  │     │   (marks unsub)     │
└─────────────────┘     └─────────────────────┘     └─────────────────────┘
```

**Why this architecture:**
- Website form → better UX, matches your design
- API proxy → validates input, rate limits, hides Apps Script URL
- Apps Script → free serverless functions, native Sheets integration
- Google Sheet → free database, easy to export, filter, manage

---

## Google Sheet Schema

Create a new Google Sheet with these columns in Row 1:

| Column | Name | Type | Description |
|--------|------|------|-------------|
| A | `email` | String | Subscriber email (lowercase) |
| B | `status` | String | `subscribed` or `unsubscribed` |
| C | `subscribed_at` | DateTime | When they subscribed |
| D | `unsubscribed_at` | DateTime | When they unsubscribed (if applicable) |
| E | `source` | String | Where they signed up (`homepage`, `footer`, etc.) |
| F | `ip_hash` | String | Hashed IP for abuse prevention (optional) |

**Example data:**
```
| email                  | status       | subscribed_at        | unsubscribed_at | source   | ip_hash |
|------------------------|--------------|----------------------|-----------------|----------|---------|
| john@example.com       | subscribed   | 2025-12-26T10:30:00Z |                 | homepage | a1b2c3  |
| jane@example.com       | unsubscribed | 2025-12-20T08:15:00Z | 2025-12-25T14:00:00Z | footer | d4e5f6  |
```

---

## Google Apps Script Code

### Setup Instructions

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any existing code
4. Paste the code below
5. Click **Deploy → New deployment**
6. Select **Web app**
7. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy** and copy the Web App URL

### Apps Script Code

```javascript
/**
 * Google Apps Script for Newsletter Subscriptions
 * Handles subscribe requests from website form
 */

// Configuration
const SHEET_NAME = 'Subscribers'; // Name of the sheet tab
const EMAIL_COL = 1;    // Column A
const STATUS_COL = 2;   // Column B
const SUBSCRIBED_AT_COL = 3; // Column C
const UNSUBSCRIBED_AT_COL = 4; // Column D
const SOURCE_COL = 5;   // Column E
const IP_HASH_COL = 6;  // Column F

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = (data.email || '').toLowerCase().trim();
    const source = data.source || 'website';
    const ipHash = data.ipHash || '';

    // Validate email
    if (!email || !isValidEmail(email)) {
      return jsonResponse({ success: false, error: 'Invalid email address' }, 400);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ success: false, error: 'Sheet not found' }, 500);
    }

    // Check for duplicate
    const existingRow = findEmailRow(sheet, email);

    if (existingRow) {
      const status = sheet.getRange(existingRow, STATUS_COL).getValue();

      if (status === 'subscribed') {
        // Already subscribed
        return jsonResponse({ success: true, duplicate: true, message: 'Already subscribed' });
      } else {
        // Re-subscribe (was previously unsubscribed)
        sheet.getRange(existingRow, STATUS_COL).setValue('subscribed');
        sheet.getRange(existingRow, SUBSCRIBED_AT_COL).setValue(new Date().toISOString());
        sheet.getRange(existingRow, UNSUBSCRIBED_AT_COL).setValue('');
        sheet.getRange(existingRow, SOURCE_COL).setValue(source + ' (resubscribed)');
        return jsonResponse({ success: true, resubscribed: true, message: 'Welcome back!' });
      }
    }

    // Add new subscriber
    sheet.appendRow([
      email,
      'subscribed',
      new Date().toISOString(),
      '',
      source,
      ipHash
    ]);

    return jsonResponse({ success: true, message: 'Successfully subscribed' });

  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ success: false, error: 'Server error' }, 500);
  }
}

/**
 * Handle GET requests (health check)
 */
function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'Newsletter API is running' });
}

/**
 * Find row number for an email (returns null if not found)
 */
function findEmailRow(sheet, email) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) { // Start at 1 to skip header
    if (data[i][0].toLowerCase().trim() === email) {
      return i + 1; // Convert to 1-indexed row number
    }
  }
  return null;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Create JSON response
 */
function jsonResponse(data, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Function to handle unsubscribe from Google Form
 * Set this as a trigger on form submit
 */
function onFormSubmit(e) {
  const email = e.values[1].toLowerCase().trim(); // Adjust index based on form structure

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const existingRow = findEmailRow(sheet, email);

  if (existingRow) {
    sheet.getRange(existingRow, STATUS_COL).setValue('unsubscribed');
    sheet.getRange(existingRow, UNSUBSCRIBED_AT_COL).setValue(new Date().toISOString());
  }
}

/**
 * Utility: Export active subscribers for newsletter sending
 * Run this manually or schedule it
 */
function exportActiveSubscribers() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  const activeEmails = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === 'subscribed') {
      activeEmails.push(data[i][0]);
    }
  }

  console.log('Active subscribers:', activeEmails.length);
  console.log(activeEmails.join('\n'));

  return activeEmails;
}
```

---

## Frontend Integration

### Update `/api/subscribe/route.ts`

The existing endpoint will proxy to Google Apps Script:

```typescript
// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { validateCsrf } from '@/app/lib/server/csrf';
import { rateLimit } from '@/app/lib/server/rateLimit';
import { sanitizeEmail } from '@/app/lib/server/sanitize';
import { logger } from '@/app/lib/server/logger';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

export async function POST(request: Request) {
  // CSRF protection
  const csrfResult = validateCsrf(request);
  if (!csrfResult.valid) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 403 });
  }

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = rateLimit(ip, 'subscribe', 5, 60000); // 5 per minute
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(rateLimitResult.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const email = sanitizeEmail(body.email);
    const source = body.source || 'website';

    if (!email) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Hash IP for abuse tracking (optional)
    const ipHash = await hashString(ip);

    // Forward to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, ipHash }),
    });

    const result = await response.json();

    if (!result.success) {
      logger.error('Newsletter subscription failed', { email, error: result.error });
      return NextResponse.json({ error: result.error || 'Subscription failed' }, { status: 500 });
    }

    logger.info('Newsletter subscription', { email, source, duplicate: result.duplicate });

    return NextResponse.json({
      ok: true,
      duplicate: result.duplicate || false,
      resubscribed: result.resubscribed || false,
    });

  } catch (error) {
    logger.error('Newsletter subscription error', { error });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
}
```

---

## Unsubscribe Flow

### Create Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create new form titled "Unsubscribe from The Notebook Café Newsletter"
3. Add one question:
   - Type: **Short answer**
   - Question: "Enter your email address"
   - Required: **Yes**
   - Validation: **Email**
4. Link responses to your Google Sheet:
   - Click **Responses** tab
   - Click **Link to Sheets**
   - Choose your existing newsletter sheet
5. Set up Apps Script trigger:
   - In Apps Script, go to **Triggers**
   - Add trigger for `onFormSubmit` on form submit

### Unsubscribe Link Format

Include this in every newsletter email:

```html
<p style="font-size: 12px; color: #666; text-align: center;">
  You're receiving this because you signed up at thenotebookcafellc.com.<br>
  <a href="https://forms.google.com/YOUR_FORM_ID">Unsubscribe</a> |
  <a href="https://www.thenotebookcafellc.com/privacy">Privacy Policy</a>
</p>
```

---

## Best Practices

### Exporting Emails for Newsletter Sends

**Option 1: Manual Export**
1. Open Google Sheet
2. Filter by `status = subscribed`
3. Copy email column
4. Paste into your email tool (Gmail, Resend, etc.)

**Option 2: Apps Script Export**
Run `exportActiveSubscribers()` from Apps Script to get a list.

**Option 3: Scheduled Export**
Create a trigger to run weekly and email you the list:

```javascript
function emailActiveSubscribers() {
  const emails = exportActiveSubscribers();
  GmailApp.sendEmail(
    'your@email.com',
    'Weekly Newsletter Subscriber List',
    'Active subscribers:\n\n' + emails.join('\n')
  );
}
```

### Compliance Requirements

**CAN-SPAM (US) & GDPR (EU) Requirements:**

1. **Clear unsubscribe link** in every email
2. **Physical address** in email footer
3. **Honor unsubscribe requests** within 10 days (aim for instant)
4. **Don't sell/share** the email list

**Recommended Email Footer:**

```
────────────────────────────────────
The Notebook Café
[Your Street Address]
Riverside, CA [ZIP]

You're receiving this because you subscribed at thenotebookcafellc.com.
Unsubscribe: [Google Form Link]
Privacy: https://www.thenotebookcafellc.com/privacy
────────────────────────────────────
```

### Security Considerations

1. **Never expose Apps Script URL** in frontend code (use API proxy)
2. **Rate limit** the subscribe endpoint
3. **Validate email format** on both frontend and backend
4. **Hash IPs** instead of storing raw IPs
5. **Use HTTPS** for all requests

---

## Environment Variables

Add to `.env.local` and Vercel:

```bash
# Google Sheets Newsletter
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

---

## Migration from Sanity

If you have existing subscribers in Sanity:

1. Export from Sanity Studio or use GROQ query
2. Format as CSV with columns matching Sheet schema
3. Import into Google Sheet
4. Verify counts match
5. Keep Sanity running in parallel for 1 week
6. Once verified, proceed with Phase 4 (Sanity removal)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Apps Script handles CORS automatically when deployed as "Anyone" |
| 403 Forbidden | Check Apps Script deployment settings |
| Duplicates appearing | Verify `findEmailRow` function is working |
| Form not submitting | Check browser console for errors, verify API route |
| Unsubscribe not working | Verify Google Form trigger is set up correctly |

---

## Cost

**Completely free:**
- Google Sheets: Free (up to 10M cells)
- Google Apps Script: Free (up to 6 min/execution, 90 min/day)
- Google Forms: Free

**Limits that matter:**
- ~20,000 requests/day to Apps Script
- More than enough for a small-medium newsletter
