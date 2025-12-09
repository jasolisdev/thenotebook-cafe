# API Contracts - The Notebook Café

**Generated:** 2025-12-05 | **Scan Mode:** Exhaustive | **API Count:** 2

---

## Overview

The Notebook Café uses Next.js 16 API Routes for server-side logic. All endpoints are located in `app/api/` and handle newsletter subscriptions and password authentication.

---

## API Endpoints

### 1. Newsletter Subscription

**Endpoint:** `POST /api/subscribe`

**Purpose:** Subscribe users to the newsletter mailing list

**Request Body:**
```json
{
  "email": "user@example.com",
  "source": "homepage"  // optional: defaults to "homepage"
}
```

**Response (Success):**
```json
{
  "ok": true,
  "id": "draft-123abc"  // Sanity document ID
}
```

**Response (Duplicate):**
```json
{
  "ok": true,
  "duplicate": true
}
```

**Response (Error):**
```json
{
  "ok": false,
  "error": "Invalid email"  // or "Server error"
}
```

**Status Codes:**
- `200` - Success (subscribed or duplicate)
- `400` - Invalid email format
- `500` - Server error

**Implementation Details:**
- Email validation using regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Duplicate detection (case-insensitive GROQ query)
- Creates `subscriber` document in Sanity CMS
- Uses write client for mutations
- Stores: email, source, status ("subscribed"), createdAt timestamp

**Security:**
- Email sanitization
- Duplicate prevention
- Error handling with generic messages

**File:** `app/api/subscribe/route.ts`

---

### 2. Password Authentication

**Endpoint:** `POST /api/auth/verify`

**Purpose:** Verify site password for dev/staging environment protection

**Request Body:**
```json
{
  "password": "your-password"
}
```

**Response (Success):**
```json
{
  "success": true
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Incorrect password"  // or "Password not configured" or "Server error"
}
```

**Status Codes:**
- `200` - Correct password (cookie set)
- `401` - Incorrect password
- `500` - Password not configured or server error

**Implementation Details:**
- Compares against `SITE_PASSWORD` environment variable
- Sets `site-auth` cookie on successful authentication
- Cookie configuration:
  - `httpOnly: true` - JavaScript cannot access
  - `secure: true` - HTTPS only in production
  - `sameSite: "strict"` - CSRF protection
  - `maxAge: 60` - 1 minute (testing mode; production should be 7 days)
  - `path: "/"` - Site-wide

**Security:**
- Environment variable for password (not hardcoded)
- httpOnly cookie prevents XSS attacks
- Secure cookie for HTTPS in production
- sameSite strict prevents CSRF
- Generic error messages (no password hints)

**Notes:**
⚠️ **Testing Mode Active:** Cookie expires in 1 minute. For production, change `maxAge` to `60 * 60 * 24 * 7` (7 days)

**File:** `app/api/auth/verify/route.ts`

---

## Authentication Flow

### Password Protection (Optional)
1. User visits site
2. If `SITE_PASSWORD` env var is set, password prompt appears
3. User submits password via `/api/auth/verify`
4. On success, `site-auth` cookie is set
5. Cookie expires after configured duration
6. User can access site while cookie is valid

### Newsletter Subscription
1. User enters email in newsletter form
2. Frontend validates email format
3. POST request to `/api/subscribe`
4. Server validates and checks for duplicates
5. Creates subscriber document in Sanity
6. Returns success/duplicate/error response
7. Frontend displays appropriate message

---

## Data Integration

### Sanity CMS

**Read Operations** (via `client`):
- Duplicate email check: `*[_type=="subscriber" && lower(email) == lower($email)][0]{_id}`

**Write Operations** (via `writeClient`):
- Create subscriber: Creates document with `_type: "subscriber"`

**Environment Variables Required:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (production)
- `SANITY_WRITE_TOKEN` - API token for mutations
- `SITE_PASSWORD` - Optional password for dev/staging protection

---

## Error Handling

### Global Error Strategy
- Try-catch blocks on all routes
- Generic error messages to prevent information leakage
- Console logging for server-side debugging
- Appropriate HTTP status codes
- JSON responses for all outcomes

### Common Error Responses
```typescript
// 400 - Client Error
{ ok: false, error: "Invalid email" }

// 401 - Unauthorized
{ success: false, message: "Incorrect password" }

// 500 - Server Error
{ ok: false, error: "Server error" }
{ success: false, message: "Password not configured" }
```

---

## Testing

### Manual Testing Checklist

**POST /api/subscribe**
- [ ] Valid email → Returns success with ID
- [ ] Invalid email → Returns 400 error
- [ ] Duplicate email → Returns success with duplicate flag
- [ ] Missing email → Returns 400 error
- [ ] Sanity write failure → Returns 500 error

**POST /api/auth/verify**
- [ ] Correct password → Returns success, sets cookie
- [ ] Incorrect password → Returns 401 error
- [ ] No SITE_PASSWORD env var → Returns 500 error
- [ ] Cookie expires correctly (check maxAge)

### Example Requests

**Subscribe to Newsletter:**
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"footer"}'
```

**Verify Password:**
```bash
curl -X POST http://localhost:3000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}' \
  -c cookies.txt  # Save cookies
```

---

## Future Enhancements

### Potential Additions
- [ ] GET /api/health - Health check endpoint
- [ ] POST /api/contact - Contact form submission
- [ ] GET /api/menu - Menu items API (currently Sanity-only)
- [ ] POST /api/events/rsvp - Event RSVP system
- [ ] GET /api/hours - Business hours API
- [ ] Rate limiting middleware
- [ ] Request logging
- [ ] API versioning (/api/v1/)

---

## Security Considerations

### Current Measures
✅ Environment variables for secrets
✅ httpOnly cookies
✅ HTTPS in production
✅ CSRF protection (sameSite)
✅ Email validation
✅ Generic error messages
✅ Server-side API token handling

### Recommended Additions
- [ ] Rate limiting (prevent abuse)
- [ ] Request validation library (Zod/Yup)
- [ ] CORS configuration
- [ ] API authentication tokens (for future mobile app)
- [ ] Request logging/monitoring
- [ ] Extend cookie expiry for production auth

---

## Dependencies

### Used in API Routes
- `next/server` - NextResponse, cookies
- `@/sanity/lib/client` - Read-only Sanity client (CDN)
- `@/sanity/lib/writeClient` - Write Sanity client (mutations)

### Environment Access
- `process.env.SITE_PASSWORD` - Optional site password
- `process.env.NODE_ENV` - Environment detection

---

**API Documentation Complete** ✓
**Total Endpoints:** 2
**Authentication:** Cookie-based (optional)
**Data Layer:** Sanity CMS
**Framework:** Next.js 16 API Routes
