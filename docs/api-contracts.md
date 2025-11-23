# API Contracts Documentation
**The Notebook Café - API Endpoint Specifications**

Generated: 2025-11-23
Total Endpoints: 2
Framework: Next.js 16 Route Handlers

---

## Overview

The Notebook Café uses Next.js Route Handlers (App Router) for serverless API endpoints. All endpoints are deployed as serverless functions on Vercel.

**Base URL (Development):** `http://localhost:3000/api`
**Base URL (Production):** `https://[your-domain]/api`

**Authentication:** None required for public endpoints (Sanity token used server-side only)

---

## Table of Contents

1. [Newsletter Subscription](#1-newsletter-subscription-post-apisubscribe)
2. [Password Verification](#2-password-verification-post-apiauthverify)

---

## 1. Newsletter Subscription: `POST /api/subscribe`

**Purpose:** Subscribe email addresses to the newsletter and store them in Sanity CMS

**File:** `app/api/subscribe/route.ts`

**Authentication:** None required (public endpoint)

### Request

**Method:** `POST`

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```typescript
{
  email: string;      // Required: Valid email address
  source?: string;    // Optional: Source identifier (default: "homepage")
}
```

**Body Example:**
```json
{
  "email": "user@example.com",
  "source": "footer"
}
```

**Validation:**
- Email is required
- Email must be a string
- Email must match pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Source is optional (defaults to "homepage")

### Response

**Success (New Subscriber):**
```http
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
  "ok": true,
  "id": "draft-abc123..."
}
```

**Success (Duplicate Email):**
```http
HTTP/1.1 200 OK
Content-Type: application/json
```
```json
{
  "ok": true,
  "duplicate": true
}
```

**Error (Invalid Email):**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
```
```json
{
  "ok": false,
  "error": "Invalid email"
}
```

**Error (Server Error):**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
```
```json
{
  "ok": false,
  "error": "Server error"
}
```

### Implementation Details

**Flow:**
1. Parse request body (email, source)
2. Validate email format using regex
3. Query Sanity for existing subscriber (case-insensitive)
4. If duplicate → Return `{ ok: true, duplicate: true }`
5. If new → Create subscriber document in Sanity
6. Return success with document ID

**Sanity Integration:**
- **Read Client** (`client`) - Check for duplicates
- **Write Client** (`writeClient`) - Create new subscriber
- **Document Type:** `subscriber`

**Created Document Structure:**
```typescript
{
  _type: "subscriber",
  email: string,
  source: string,
  status: "subscribed",
  createdAt: string (ISO 8601)
}
```

**Duplicate Detection:**
- Case-insensitive email comparison
- GROQ query: `*[_type=="subscriber" && lower(email) == lower($email)][0]`

**Error Handling:**
- Invalid JSON → 400 Bad Request
- Invalid email format → 400 Bad Request
- Sanity errors → 500 Internal Server Error
- Errors logged to console

### Usage Example

**JavaScript/TypeScript:**
```typescript
async function subscribeToNewsletter(email: string, source: string = "homepage") {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, source }),
  });

  const data = await response.json();

  if (data.ok && data.duplicate) {
    console.log('Already subscribed');
  } else if (data.ok) {
    console.log('Successfully subscribed:', data.id);
  } else {
    console.error('Subscription failed:', data.error);
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","source":"footer"}'
```

### Security Considerations

- ✅ Email validation prevents malformed inputs
- ✅ Duplicate check prevents spam
- ✅ Sanity write token kept server-side (not exposed to client)
- ✅ Rate limiting recommended for production (not implemented)
- ⚠️ No CAPTCHA protection (vulnerable to bot submissions)
- ⚠️ No email verification (subscribers not confirmed)

### Frontend Integration

**Used By:**
- `app/components/features/NewsLetterForm.tsx`

**Form Component Example:**
```tsx
"use client";
import { useState } from "react";

export default function NewsletterForm({ source = "homepage" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });

    const data = await res.json();

    if (data.ok && data.duplicate) {
      setStatus("duplicate");
    } else if (data.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "success" && <p>Thanks! You're subscribed.</p>}
      {status === "duplicate" && <p>You're already subscribed!</p>}
      {status === "error" && <p>Something went wrong.</p>}
    </form>
  );
}
```

---

## 2. Password Verification: `POST /api/auth/verify`

**Purpose:** Verify site-wide password for dev/staging environment protection

**File:** `app/api/auth/verify/route.ts`

**Authentication:** None required (public endpoint, but checks password)

**Security Note:** This is a simple password gate for development/staging only. NOT suitable for production security.

### Request

**Method:** `POST`

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```typescript
{
  password: string;   // Required: Password to verify
}
```

**Body Example:**
```json
{
  "password": "my-secret-password"
}
```

### Response

**Success (Correct Password):**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: site-auth=authenticated; HttpOnly; Secure; SameSite=Strict; Max-Age=60; Path=/
```
```json
{
  "success": true
}
```

**Error (Incorrect Password):**
```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json
```
```json
{
  "success": false,
  "message": "Incorrect password"
}
```

**Error (Password Not Configured):**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
```
```json
{
  "success": false,
  "message": "Password not configured"
}
```

**Error (Server Error):**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
```
```json
{
  "success": false,
  "message": "Server error"
}
```

### Implementation Details

**Flow:**
1. Parse request body (password)
2. Check if `SITE_PASSWORD` environment variable is set
3. If not set → Return 500 "Password not configured"
4. Compare submitted password with `SITE_PASSWORD`
5. If match → Set `site-auth` cookie and return success
6. If no match → Return 401 "Incorrect password"

**Cookie Details:**
```typescript
{
  name: "site-auth",
  value: "authenticated",
  httpOnly: true,                          // Not accessible via JavaScript
  secure: process.env.NODE_ENV === "production",  // HTTPS only in production
  sameSite: "strict",                      // CSRF protection
  maxAge: 60,                              // 60 seconds (testing - should be 604800 for 7 days)
  path: "/"                                // Valid for entire site
}
```

**Environment Configuration:**
```bash
# .env.local
SITE_PASSWORD=your-secret-password

# Leave empty to disable password protection
SITE_PASSWORD=
```

**Security Warning:**
- ⚠️ No session management
- ⚠️ No password hashing (plain text comparison)
- ⚠️ Cookie expires in 60 seconds (testing mode)
- ⚠️ Not suitable for production use
- ⚠️ No brute-force protection

### Usage Example

**JavaScript/TypeScript:**
```typescript
async function verifyPassword(password: string) {
  const response = await fetch('/api/auth/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (data.success) {
    console.log('Password verified - cookie set');
    // Reload or redirect to access protected content
    window.location.reload();
  } else {
    console.error('Verification failed:', data.message);
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"password":"my-secret-password"}' \
  -c cookies.txt
```

### Frontend Integration

**Used By:**
- `app/components/ui/PasswordGate.tsx`

**Component Example:**
```tsx
"use client";
import { useState, useEffect } from "react";

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check if already authenticated (cookie exists)
  useEffect(() => {
    const isAuthed = document.cookie.includes("site-auth=authenticated");
    setAuthed(isAuthed);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      setAuthed(true);
    } else {
      setError(data.message || "Incorrect password");
    }
  }

  if (authed) {
    return <>{children}</>;
  }

  return (
    <div className="password-gate">
      <h1>Password Protected</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Access Site</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
```

---

## API Patterns & Best Practices

### Error Handling Pattern

All endpoints follow consistent error response format:

```typescript
// Success
{
  ok: true,
  // ... additional data
}

// Error
{
  ok: false,
  error: string  // Human-readable error message
}

// OR

{
  success: boolean,
  message?: string
}
```

### Response Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request (even if duplicate) |
| 400 | Bad Request | Invalid input (email format, missing fields) |
| 401 | Unauthorized | Incorrect password |
| 500 | Internal Server Error | Server/Sanity errors, missing config |

### Serverless Function Characteristics

- **Cold Start:** First request may be slower (~1-2 seconds)
- **Warm State:** Subsequent requests faster (~100-300ms)
- **Timeout:** Default 10 seconds (Vercel Hobby plan)
- **Memory:** Default 1024 MB
- **Regions:** Deployed globally (Vercel Edge Network)

---

## Future API Endpoints (Planned)

### Potential Additions

1. **`POST /api/contact`** - Contact form submission
2. **`GET /api/menu`** - Fetch menu items from Sanity
3. **`POST /api/reservation`** - Event/table reservation
4. **`POST /api/order`** - Online ordering (future)
5. **`GET /api/events`** - Fetch upcoming events

---

## Testing APIs

### Manual Testing (Browser)

**Using Browser DevTools Console:**
```javascript
// Test Newsletter Subscription
fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com', source: 'test' })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Test Password Verification
fetch('/api/auth/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: 'test-password' })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Automated Testing (Recommended)

**Example using Jest + Node.js fetch:**
```typescript
describe('POST /api/subscribe', () => {
  it('should subscribe new email', async () => {
    const res = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'new@example.com' }),
    });

    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.id).toBeDefined();
  });

  it('should detect duplicate email', async () => {
    // Subscribe once
    await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'duplicate@example.com' }),
    });

    // Try again
    const res = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'duplicate@example.com' }),
    });

    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.duplicate).toBe(true);
  });
});
```

---

## Related Documentation

- [Architecture](./architecture.md) - System architecture overview
- [Data Models](./data-models.md) - Sanity schema documentation
- [Development Guide](./development-guide.md) - Local development setup

---

## API Versioning

**Current Version:** v1 (implicit, no version prefix)

**Future Versioning Strategy:**
- When breaking changes needed, use `/api/v2/` prefix
- Maintain v1 endpoints for backward compatibility
- Document migration guide

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-23
**Total Endpoints:** 2
