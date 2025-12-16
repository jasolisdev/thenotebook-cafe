# API Contracts - The Notebook Café

**Generated:** 2025-12-16 | **Updated:** Security Audit | **API Count:** 5

---

## Overview

The Notebook Café uses Next.js 16 API Routes for server-side logic. All endpoints are located in `app/api/` and handle newsletter subscriptions, contact forms, job applications, password authentication, and unsubscribe requests.

**Security Features (All Endpoints):**
- ✅ Security headers via middleware
- ✅ Rate limiting
- ✅ Input sanitization
- ✅ Production-safe logging

---

## API Endpoints Summary

| Endpoint | Method | Purpose | CSRF | Rate Limit | Status |
|----------|--------|---------|------|------------|--------|
| `/api/subscribe` | POST | Newsletter signup | ✅ | 5/min | ✅ SECURE |
| `/api/contact` | POST | Contact form | ✅ | 3/min | ✅ SECURE |
| `/api/apply` | POST | Job applications | ✅ | 2/hr | ✅ SECURE |
| `/api/auth/verify` | POST | Password auth | N/A | 3/15min | ✅ SECURE |
| `/api/unsubscribe` | GET | Unsubscribe | N/A | 10/hr | ✅ SECURE |

---

## Detailed Endpoint Documentation

### 1. Newsletter Subscription

**Endpoint:** `POST /api/subscribe`
**File:** `app/api/subscribe/route.ts`

**Purpose:** Subscribe users to the newsletter mailing list

**Security:**
- CSRF protection (origin validation)
- Rate limiting: 5 requests/minute per IP
- Input sanitization
- Duplicate detection

**Request:**
```json
{
  "email": "user@example.com",
  "source": "homepage"  // optional
}
```

**Success Response (200):**
```json
{
  "ok": true,
  "id": "draft-123abc"
}
```

**Duplicate Response (200):**
```json
{
  "ok": true,
  "duplicate": true
}
```

**Error Responses:**
- `400` - Invalid email format
- `403` - CSRF violation
- `429` - Rate limit exceeded
- `500` - Server error

---

### 2. Contact Form

**Endpoint:** `POST /api/contact`
**File:** `app/api/contact/route.ts`

**Purpose:** Submit contact form messages

**Security:**
- CSRF protection
- Rate limiting: 3 requests/minute per IP
- Input sanitization
- Field length limits

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question",
  "message": "What are your hours?"
}
```

**Field Limits:**
- name: 120 chars
- email: 254 chars
- subject: 120 chars
- message: 5000 chars

**Success Response (200):**
```json
{
  "ok": true,
  "id": "contactMessage-123"
}
```

---

### 3. Job Applications

**Endpoint:** `POST /api/apply`
**File:** `app/api/apply/route.ts`

**Purpose:** Submit job applications with resume uploads

**Security:**
- CSRF protection
- Rate limiting: 2 requests/hour per IP
- Input sanitization (all 13 fields)
- File validation (magic number checks)
- 5MB file size limit

**Request:** `multipart/form-data`

**Required Fields:**
- firstName, lastName, email, phone, birthdate
- positions (JSON array)
- employmentType ("full-time" | "part-time")
- daysAvailable (JSON array)
- startDate, hoursPerWeek, commitmentLength

**Optional Fields:**
- message
- resume (PDF, DOC, DOCX - max 5MB)
- supplementalApplication (PDF - max 5MB)

**File Validation:**
- Magic number (file signature) validation
- Prevents type spoofing (.txt renamed to .pdf)
- Supported: PDF, DOC, DOCX

**Success Response (200):**
```json
{
  "ok": true,
  "id": "jobApplication-123"
}
```

---

### 4. Password Authentication

**Endpoint:** `POST /api/auth/verify`
**File:** `app/api/auth/verify/route.ts`

**Purpose:** Optional site-wide password protection

**Security:**
- Rate limiting: 3 requests per 15 minutes (brute-force protection)
- httpOnly cookie
- Secure cookie (HTTPS in production)
- sameSite: strict

**Request:**
```json
{
  "password": "your-password"
}
```

**Cookie (on success):**
- Name: `site-auth`
- Value: `authenticated`
- Expires: 7 days
- httpOnly, secure, sameSite strict

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Incorrect password"
}
```

---

### 5. Newsletter Unsubscribe

**Endpoint:** `GET /api/unsubscribe?token=xxx`
**File:** `app/api/unsubscribe/route.ts`

**Purpose:** Unsubscribe from newsletter via email link

**Security:**
- Rate limiting: 10 requests/hour per IP (prevents token enumeration)
- HTML output sanitization
- Token validation (UUID v4)

**Query Parameter:**
- `token` (required): Unsubscribe token

**Response:** HTML page (not JSON)

**Success (200):**
- "You're unsubscribed. Thank you."

**Already Unsubscribed (200):**
- "You're already unsubscribed for [email]."

**Not Found (404):**
- "We couldn't find that subscription."

**Missing Token (400):**
- "Unsubscribe token missing."

**Rate Limited (429):**
```json
{
  "ok": false,
  "error": "Too many requests. Please try again later."
}
```

---

## Global Security

### Proxy (`proxy.ts`)

**Security Headers:**
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` - Comprehensive CSP
- `Strict-Transport-Security` - HTTPS enforcement (production)

**Logging:**
- API request logging (IP + response time)
- Performance monitoring (X-Response-Time header)

### CSRF Protection

**Allowed Origins:**
- `http://localhost:3000` (development)
- `https://thenotebookcafe.com` (production)
- `https://www.thenotebookcafe.com` (production)

**Protected Endpoints:**
- POST /api/subscribe
- POST /api/contact
- POST /api/apply

### Rate Limiting

**Implementation:** In-memory (IP-based)

| Endpoint | Limit | Window |
|----------|-------|--------|
| /api/subscribe | 5 | 1 minute |
| /api/contact | 3 | 1 minute |
| /api/apply | 2 | 1 hour |
| /api/auth/verify | 3 | 15 minutes |
| /api/unsubscribe | 10 | 1 hour |

**Note:** For multi-server deployments, use Redis/Upstash (Phase 3)

### Input Sanitization

**Functions:**
- `sanitizeText()` - Removes HTML, scripts, injection patterns
- `sanitizeEmail()` - Strict email cleaning
- `sanitizePhone()` - Phone number sanitization
- `sanitizeUrl()` - URL validation (http/https only)

**Applied to:**
- All subscriber data
- All contact form fields
- All job application fields

---

## Testing

### Manual Testing Examples

**CSRF Test:**
```bash
# Should fail (403)
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: https://evil.com" \
  -d '{"email":"test@example.com"}'
```

**Rate Limit Test:**
```bash
# 6th request should fail (429)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/subscribe \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000" \
    -d '{"email":"test'$i'@example.com"}'
done
```

**Subscribe:**
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"test@example.com","source":"footer"}'
```

---

## Environment Variables

**Required:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<project_id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=<write_token>
```

**Optional:**
```bash
SITE_PASSWORD=<password>  # Leave empty to disable
NEXT_PUBLIC_SENTRY_DSN=<sentry_dsn>  # Phase 3
```

---

## References

- [SECURITY_AUDIT_REPORT.md](../SECURITY_AUDIT_REPORT.md) - Security assessment
- [PRODUCTION_HARDENING.md](../PRODUCTION_HARDENING.md) - Hardening guide
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Last Updated:** December 16, 2025
**Status:** ✅ Production-Ready
**Total Endpoints:** 5
**Framework:** Next.js 16
