# API Contracts - The Notebook Café

Last Updated: 2025-12-23
API Count: 6

---

## Overview

The Notebook Café uses Next.js App Router API routes for server-side logic. Endpoints live in `app/api/` and support newsletter subscriptions, contact messages, careers applications, and password protection.

**Shared Security Measures:**
- CSRF origin validation (all POST form endpoints)
- Rate limiting per endpoint
- Input sanitization for user-provided text
- File validation for uploads (size/type + magic number where applicable)

---

## API Endpoints Summary

| Endpoint | Method | Purpose | CSRF | Rate Limit |
|----------|--------|---------|------|------------|
| `/api/subscribe` | POST | Newsletter signup | Yes | 5/min |
| `/api/unsubscribe` | GET | Unsubscribe by token | N/A | 10/hr |
| `/api/contact` | POST | Contact form | Yes | 3/min |
| `/api/apply` | POST | Job application (Sanity) | Yes | 2/hr |
| `/api/careers/apply` | POST | Careers quick-apply (Resend) | Yes | 3/min |
| `/api/auth/verify` | POST | Password gate verify | N/A | 3/15min |

---

## Detailed Endpoint Documentation

### 1. Newsletter Subscription
**Endpoint:** `POST /api/subscribe`
**File:** `app/api/subscribe/route.ts`

**Purpose:** Add a subscriber to Sanity with duplicate detection and unsubscribe token.

**Request (JSON):**
```json
{
  "email": "user@example.com",
  "source": "homepage"
}
```

**Success (200):**
```json
{ "ok": true, "id": "<sanity-id>" }
```

**Duplicate (200):**
```json
{ "ok": true, "duplicate": true }
```

**Errors:**
- `400` invalid email
- `403` CSRF violation
- `429` rate limit
- `500` server error

---

### 2. Unsubscribe
**Endpoint:** `GET /api/unsubscribe?token=...`
**File:** `app/api/unsubscribe/route.ts`

**Purpose:** Mark a subscriber as unsubscribed by token.

**Response:** HTML message (200/400/404). No JSON payload.

---

### 3. Contact Form
**Endpoint:** `POST /api/contact`
**File:** `app/api/contact/route.ts`

**Purpose:** Store contact message in Sanity and send notification via Resend.

**Request (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "General Inquiry",
  "message": "Hello!"
}
```

**Success (200):**
```json
{ "ok": true, "id": "contactMessage-<id>" }
```

**Errors:**
- `400` validation failure
- `403` CSRF violation
- `429` rate limit
- `500` server error

---

### 4. Job Application (Sanity)
**Endpoint:** `POST /api/apply`
**File:** `app/api/apply/route.ts`

**Purpose:** Full job application intake with optional file uploads stored in Sanity.

**Request:** `multipart/form-data`

**Required fields:**
- `firstName`, `lastName`, `email`, `phone`, `birthdate`
- `positions` (JSON array string)
- `employmentType`, `daysAvailable` (JSON array string)
- `startDate`, `hoursPerWeek`, `commitmentLength`

**Optional fields:**
- `message`
- `resume` (PDF/DOC/DOCX, max 5MB)
- `supplementalApplication` (PDF, max 5MB)

**Success (200):**
```json
{ "ok": true, "id": "jobApplication-<id>" }
```

---

### 5. Careers Quick-Apply (Email)
**Endpoint:** `POST /api/careers/apply`
**File:** `app/api/careers/apply/route.ts`

**Purpose:** Email careers applications via Resend (no Sanity write).

**Request:** `multipart/form-data`

**Core fields:**
- `name` or `firstName`/`lastName`
- `email`
- `role` (or `positions` as JSON array)
- `availability` (or `daysAvailable` as JSON array)
- `message` (optional)
- `phone`, `birthdate` (optional)
- `resume` (required, PDF/DOC/DOCX, max 5MB)
- `application` (optional, PDF/DOC/DOCX, max 5MB)

**Success (200):**
```json
{ "ok": true }
```

---

### 6. Password Verification
**Endpoint:** `POST /api/auth/verify`
**File:** `app/api/auth/verify/route.ts`

**Purpose:** Validate `SITE_PASSWORD` and set auth cookie.

**Request (JSON):**
```json
{ "password": "<password>" }
```

**Success (200):**
```json
{ "success": true }
```

**Errors:**
- `401` incorrect password
- `500` password not configured or server error
