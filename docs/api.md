# API Reference

**The Notebook Cafe - API Endpoints**

Last Updated: December 2025

---

## Overview

API routes live in `app/api/` and handle newsletter subscriptions, contact forms, job applications, and password protection.

**Security Measures:**
- CSRF origin validation on POST endpoints
- Rate limiting per endpoint
- Input sanitization for text fields
- File validation for uploads (size, type, magic bytes)

---

## Endpoints

| Endpoint | Method | Purpose | Rate Limit |
|----------|--------|---------|------------|
| `/api/subscribe` | POST | Newsletter signup | 5/min |
| `/api/unsubscribe` | GET | Redirect to unsubscribe | - |
| `/api/contact` | POST | Contact form → email | 3/min |
| `/api/apply` | POST | Job application → email | 2/hr |
| `/api/auth/verify` | POST | Password verification | 3/15min |

---

## Newsletter Subscription

**Endpoint:** `POST /api/subscribe`

Proxies to Google Apps Script, which saves to Google Sheets.

**Request:**
```json
{
  "email": "user@example.com",
  "source": "homepage"
}
```

**Success:**
```json
{ "ok": true }
```

**Duplicate:**
```json
{ "ok": true, "duplicate": true }
```

**Errors:** `400` (invalid email), `403` (CSRF), `429` (rate limit), `500` (server error)

---

## Unsubscribe

**Endpoint:** `GET /api/unsubscribe`

Redirects to a Google Form for unsubscribe requests.

---

## Contact Form

**Endpoint:** `POST /api/contact`

Sends email notification via Resend.

**Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "General Inquiry",
  "message": "Hello!"
}
```

**Success:**
```json
{ "ok": true }
```

**Errors:** `400` (validation), `403` (CSRF), `429` (rate limit), `500` (server error)

---

## Job Application

**Endpoint:** `POST /api/apply`

Sends application email with attachments via Resend.

**Request:** `multipart/form-data`

**Required fields:**
- `firstName`, `lastName`, `email`, `phone`
- `positions` (JSON array)
- `employmentType`, `daysAvailable` (JSON array)
- `startDate`, `hoursPerWeek`, `commitmentLength`

**Optional fields:**
- `message`
- `resume` (PDF/DOC/DOCX, max 5MB)

**Success:**
```json
{ "ok": true }
```

---

## Password Verification

**Endpoint:** `POST /api/auth/verify`

Validates password and sets auth cookie.

**Request:**
```json
{ "password": "<password>" }
```

**Success:**
```json
{ "success": true }
```

**Errors:** `401` (incorrect), `500` (not configured)
