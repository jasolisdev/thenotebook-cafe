# Security Audit Report
**The Notebook Café Production Security Assessment**

**Date:** December 16, 2025
**Auditor:** Claude Code
**Scope:** Full application security review
**Branch:** `claude/review-md-files-3pEpR`

---

## Executive Summary

This comprehensive security audit assessed The Notebook Café's production readiness across 5 API endpoints, authentication mechanisms, input validation, and infrastructure security. While Phase 1 and Phase 2 security improvements from PRODUCTION_HARDENING.md have been partially implemented, **critical gaps remain that must be addressed before production launch**.

### Overall Security Status: ⚠️ **NEEDS IMMEDIATE ATTENTION**

**Critical Issues:** 2
**High Priority:** 2
**Medium Priority:** 3
**Good Practices:** 7

---

## Critical Findings (MUST FIX BEFORE LAUNCH)

### 1. ❌ **CRITICAL: Missing Security Headers Middleware**

**Severity:** CRITICAL
**Risk:** XSS, Clickjacking, MIME sniffing attacks
**Status:** NOT IMPLEMENTED

**Issue:**
The PRODUCTION_HARDENING.md document claims Phase 2 includes `middleware.ts` with comprehensive security headers, but **the file does not exist in the codebase**. This means the application is currently deployed without:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security (HSTS)

**Impact:**
- Users vulnerable to XSS attacks
- Site can be embedded in malicious iframes (clickjacking)
- No HTTPS enforcement
- Browser security features disabled

**Location:** `/middleware.ts` (missing)

**Recommendation:** **IMMEDIATE** - Implement middleware with all security headers as documented in Phase 2 of PRODUCTION_HARDENING.md

---

### 2. ❌ **CRITICAL: No Rate Limiting on Unsubscribe Endpoint**

**Severity:** CRITICAL
**Risk:** Abuse, mass unsubscribe attacks, token enumeration
**Status:** VULNERABLE

**Issue:**
`GET /api/unsubscribe?token=xxx` has no rate limiting, allowing attackers to:
1. Brute-force unsubscribe tokens
2. Mass-unsubscribe legitimate subscribers
3. Perform denial-of-service attacks

**Current Code:**
```typescript
// app/api/unsubscribe/route.ts
export async function GET(req: Request) {
  // NO rate limiting check
  // NO CSRF (acceptable for GET, but should have token validation)
  const token = url.searchParams.get("token");
  // ... processes unsubscribe
}
```

**Impact:**
- Attacker could unsubscribe all users by guessing/enumerating tokens
- No protection against automated abuse

**Location:** `app/api/unsubscribe/route.ts`

**Recommendation:** **IMMEDIATE** - Add rate limiting (10 requests/hour per IP)

---

## High Priority Findings

### 3. ⚠️ **HIGH: No Rate Limiting on Password Verification**

**Severity:** HIGH
**Risk:** Brute-force password attacks
**Status:** VULNERABLE

**Issue:**
`POST /api/auth/verify` has no rate limiting, allowing unlimited password guessing attempts.

**Current Protection:** ❌ None

**Impact:**
- Attackers can brute-force the site password
- No lockout after failed attempts
- No delay between attempts

**Location:** `app/api/auth/verify/route.ts`

**Recommendation:** Add aggressive rate limiting (3 attempts per 15 minutes per IP)

---

### 4. ⚠️ **HIGH: Unsubscribe Tokens Not Validated for Cryptographic Strength**

**Severity:** HIGH
**Risk:** Token enumeration, predictable tokens
**Status:** NEEDS IMPROVEMENT

**Issue:**
While unsubscribe tokens use `randomUUID()` (good), there's no:
- Token expiration
- Token invalidation after use
- Validation that token hasn't been used before

**Current Implementation:**
```typescript
// app/api/subscribe/route.ts
const token = randomUUID(); // Good: cryptographically secure

// But no expiration or single-use enforcement
```

**Recommendation:** Implement token expiration (30 days) and single-use validation

---

## Medium Priority Findings

### 5. ⚙️ **MEDIUM: API Documentation Outdated**

**Severity:** MEDIUM
**Risk:** Developer confusion, maintenance issues
**Status:** DOCUMENTATION GAP

**Issue:**
`docs/api-contracts.md` only documents 2 endpoints (subscribe, auth/verify) but the application has **5 API endpoints**:
1. ✅ `/api/subscribe` - Documented
2. ✅ `/api/auth/verify` - Documented
3. ❌ `/api/contact` - NOT documented
4. ❌ `/api/apply` - NOT documented
5. ❌ `/api/unsubscribe` - NOT documented

**Recommendation:** Update API documentation to include all endpoints

---

### 6. ⚙️ **MEDIUM: Sentry Error Monitoring Not Enabled**

**Severity:** MEDIUM
**Risk:** No production error visibility
**Status:** PREPARED BUT NOT ACTIVE

**Issue:**
Sentry integration is coded in `app/lib/monitoring.ts` but:
- Code is commented out
- `NEXT_PUBLIC_SENTRY_DSN` not set
- No npm package installed

**Current Status:**
```typescript
// app/lib/monitoring.ts
// export async function initErrorMonitoring() {
//   if (typeof window === 'undefined') return;
//   // Sentry code commented out
// }
```

**Recommendation:** Enable before production launch (see Phase 3 checklist)

---

### 7. ⚙️ **MEDIUM: Password Cookie Expiry Too Short**

**Severity:** MEDIUM
**Risk:** Poor user experience
**Status:** TESTING CONFIGURATION

**Issue:**
Password authentication cookie expires in 1 minute (testing mode):

**Current Code:**
```typescript
// app/api/auth/verify/route.ts
cookies().set("site-auth", "authenticated", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60, // ⚠️ 1 MINUTE (should be 7 days for production)
  path: "/",
});
```

**Recommendation:** Change `maxAge` to `60 * 60 * 24 * 7` (7 days) for production

---

## ✅ Good Security Practices Found

### 1. **CSRF Protection** ✅
**Status:** Implemented correctly on all POST endpoints

**Protected Endpoints:**
- ✅ `/api/subscribe` - validateOrigin()
- ✅ `/api/contact` - validateOrigin()
- ✅ `/api/apply` - validateOrigin()

**Implementation:**
```typescript
// app/lib/csrf.ts
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://thenotebookcafe.com",
  "https://www.thenotebookcafe.com",
];
```

**Recommendation:** ✅ No changes needed

---

### 2. **Rate Limiting (Partial)** ✅
**Status:** Implemented on 3/5 endpoints

**Protected Endpoints:**
- ✅ `/api/subscribe` - 5 requests/minute
- ✅ `/api/contact` - 3 requests/minute
- ✅ `/api/apply` - 2 requests/hour

**Not Protected:**
- ❌ `/api/auth/verify` - No limit
- ❌ `/api/unsubscribe` - No limit

**Recommendation:** Add rate limiting to missing endpoints (see Critical Findings #2-3)

---

### 3. **Input Sanitization** ✅
**Status:** Comprehensive implementation

**Sanitization Functions:**
- `sanitizeText()` - Removes HTML, scripts, injection patterns
- `sanitizeEmail()` - Strict email validation
- `sanitizePhone()` - Phone number sanitization
- `sanitizeUrl()` - URL validation (http/https only)
- `sanitizeObject()` - Recursive object sanitization

**Applied to:**
- ✅ All subscriber data
- ✅ All contact form fields
- ✅ All job application fields

**Recommendation:** ✅ Excellent implementation, no changes needed

---

### 4. **File Upload Validation** ✅
**Status:** Magic number validation implemented

**Security Measures:**
- Magic number (file signature) validation
- MIME type validation
- File size limits (5MB)
- Supported formats: PDF, DOC, DOCX

**Location:** `app/lib/fileValidation.ts`

**Magic Numbers Validated:**
```typescript
pdf:  [0x25, 0x50, 0x44, 0x46]        // %PDF
doc:  [0xd0, 0xcf, 0x11, 0xe0, ...]   // OLE
docx: [0x50, 0x4b, 0x03, 0x04]        // ZIP (PK) + Word content check
jpeg: [0xff, 0xd8, 0xff]              // JPEG
png:  [0x89, 0x50, 0x4e, 0x47, ...]   // PNG
```

**Recommendation:** ✅ Excellent implementation, prevents file type spoofing

---

### 5. **Error Boundary** ✅
**Status:** Implemented and integrated

**Features:**
- Catches all React errors
- User-friendly error UI
- "Reload Page" and "Try Again" recovery options
- Error details in development mode only
- Automatic logging via `logger.error()`

**Location:** `app/components/ErrorBoundary.tsx`
**Integration:** Wraps entire app in `app/layout.tsx`

**Recommendation:** ✅ Well implemented

---

### 6. **Production-Safe Logger** ✅
**Status:** Implemented and used throughout

**Features:**
- Development: Full logging with context
- Production: Message-only (no error objects exposed)
- Ready for monitoring service integration
- Methods: `info()`, `warn()`, `error()`

**Usage:**
- ✅ All API routes use logger instead of console.error
- ✅ ErrorBoundary uses logger
- ✅ All catch blocks use logger

**Location:** `app/lib/logger.ts`

**Recommendation:** ✅ Perfect implementation

---

### 7. **Environment Variable Security** ✅
**Status:** Properly configured

**Security Measures:**
- ✅ Sanity write token server-side only (`SANITY_WRITE_TOKEN`)
- ✅ No secrets in client code
- ✅ Password protection optional (`SITE_PASSWORD`)
- ✅ `.env.local` in `.gitignore`

**Recommendation:** ✅ No changes needed

---

## API Endpoint Security Matrix

| Endpoint | CSRF | Rate Limit | Sanitization | Validation | Status |
|----------|------|------------|--------------|------------|--------|
| `POST /api/subscribe` | ✅ | ✅ (5/min) | ✅ | ✅ | **SECURE** |
| `POST /api/contact` | ✅ | ✅ (3/min) | ✅ | ✅ | **SECURE** |
| `POST /api/apply` | ✅ | ✅ (2/hr) | ✅ | ✅ | **SECURE** |
| `POST /api/auth/verify` | N/A | ❌ | N/A | ⚠️ | **VULNERABLE** |
| `GET /api/unsubscribe` | N/A | ❌ | ✅ | ⚠️ | **VULNERABLE** |

**Legend:**
- ✅ Implemented correctly
- ❌ Not implemented (security gap)
- ⚠️ Partially implemented
- N/A - Not applicable for this endpoint type

---

## Security Headers Status

**Current Status:** ❌ **NONE IMPLEMENTED** (middleware.ts missing)

**Required Headers (from PRODUCTION_HARDENING.md Phase 2):**

| Header | Status | Purpose |
|--------|--------|---------|
| `X-Frame-Options: DENY` | ❌ | Prevents clickjacking |
| `X-Content-Type-Options: nosniff` | ❌ | Prevents MIME sniffing |
| `Referrer-Policy: strict-origin-when-cross-origin` | ❌ | Controls referrer info |
| `Permissions-Policy` | ❌ | Blocks camera/mic/geo |
| `Content-Security-Policy` | ❌ | Prevents XSS/injection |
| `Strict-Transport-Security` | ❌ | Enforces HTTPS |

**Impact:** Application is vulnerable to multiple attack vectors

**Recommendation:** Create `middleware.ts` immediately (see Remediation Plan)

---

## Pre-Launch Security Checklist

### Critical (MUST DO BEFORE LAUNCH)

- [ ] **Create middleware.ts with all security headers**
- [ ] **Add rate limiting to /api/unsubscribe (10/hour)**
- [ ] **Add rate limiting to /api/auth/verify (3/15min)**
- [ ] **Update password cookie maxAge to 7 days**
- [ ] **Implement unsubscribe token expiration (30 days)**
- [ ] **Test all security measures manually**

### High Priority (SHOULD DO BEFORE LAUNCH)

- [ ] **Enable Sentry error monitoring**
  ```bash
  npm install @sentry/nextjs
  # Add NEXT_PUBLIC_SENTRY_DSN to .env
  # Uncomment monitoring.ts code
  ```
- [ ] **Update API documentation** (add contact, apply, unsubscribe)
- [ ] **Perform penetration testing**
- [ ] **Security audit by third party** (if budget allows)

### Medium Priority (NICE TO HAVE)

- [ ] Add request validation with Zod (Phase 3)
- [ ] Migrate rate limiting to Redis/Upstash for multi-server (Phase 3)
- [ ] Implement email notifications (Phase 3)
- [ ] Create comprehensive test suite (Phase 3)

---

## Remediation Plan

### Step 1: Create Security Headers Middleware (1 hour)

**Priority:** CRITICAL
**Effort:** 1 hour

**Create `/middleware.ts`:**

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from '@/app/lib/logger';

export function middleware(req: NextRequest) {
  const start = Date.now();
  const { pathname, search } = req.nextUrl;

  // Get client IP
  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  // Log API requests
  if (pathname.startsWith('/api/')) {
    logger.info(`[${req.method}] ${pathname}${search} - IP: ${ip}`);
  }

  // Create response
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' https://cdn.sanity.io https://images.unsplash.com data: blob:",
    "media-src 'self' https://cdn.sanity.io",
    "connect-src 'self' https://cdn.sanity.io https://*.sanity.io",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // HSTS (production only)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }

  // Add response time header
  if (pathname.startsWith('/api/')) {
    const duration = Date.now() - start;
    response.headers.set('X-Response-Time', `${duration}ms`);
    logger.info(`[${req.method}] ${pathname} - ${duration}ms`);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**Test:**
```bash
curl -I http://localhost:3000/api/subscribe
# Should show all security headers
```

---

### Step 2: Add Missing Rate Limits (30 minutes)

**Priority:** CRITICAL
**Effort:** 30 minutes

**Update `/app/api/unsubscribe/route.ts`:**

```typescript
import { checkRateLimit } from "@/app/lib/rateLimit";

export async function GET(req: Request) {
  // Add rate limiting: 10 requests per hour
  const rateLimitError = checkRateLimit(req, "/api/unsubscribe", 10, 3600000);
  if (rateLimitError) return rateLimitError;

  // ... rest of existing code
}
```

**Update `/app/api/auth/verify/route.ts`:**

```typescript
import { checkRateLimit } from "@/app/lib/rateLimit";

export async function POST(req: Request) {
  // Add rate limiting: 3 requests per 15 minutes
  const rateLimitError = checkRateLimit(req, "/api/auth/verify", 3, 900000);
  if (rateLimitError) return rateLimitError;

  // ... rest of existing code

  // Also update cookie maxAge
  cookies().set("site-auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days (was 60 seconds)
    path: "/",
  });
}
```

---

### Step 3: Implement Token Expiration (1 hour)

**Priority:** HIGH
**Effort:** 1 hour

**Update subscriber schema in Sanity to include:**
- `unsubscribeTokenExpiry` (datetime)
- `unsubscribeTokenUsed` (boolean)

**Update `/app/api/subscribe/route.ts`:**

```typescript
const doc = await writeClient.create({
  _type: "subscriber",
  email: sanitizeEmail(normalizedEmail),
  source: sanitizeText(normalizeSource(source)),
  status: "subscribed",
  unsubscribeToken: token,
  unsubscribeTokenExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  unsubscribeTokenUsed: false,
  createdAt: new Date().toISOString(),
});
```

**Update `/app/api/unsubscribe/route.ts`:**

```typescript
const subscriber = await client.fetch<{
  _id: string;
  email: string;
  status: string;
  unsubscribeTokenExpiry?: string;
  unsubscribeTokenUsed?: boolean;
} | null>(
  `*[_type=="subscriber" && unsubscribeToken == $token][0]{
    _id, email, status, unsubscribeTokenExpiry, unsubscribeTokenUsed
  }`,
  { token }
);

// Check token expiry
if (subscriber.unsubscribeTokenExpiry) {
  const expiry = new Date(subscriber.unsubscribeTokenExpiry);
  if (expiry < new Date()) {
    return htmlResponse("This unsubscribe link has expired.", 410);
  }
}

// Check if already used
if (subscriber.unsubscribeTokenUsed) {
  return htmlResponse("This unsubscribe link has already been used.", 410);
}

// Mark token as used when unsubscribing
await writeClient
  .patch(subscriber._id)
  .set({
    status: "unsubscribed",
    unsubscribedAt: new Date().toISOString(),
    unsubscribeTokenUsed: true,
  })
  .commit({ autoGenerateArrayKeys: true, returnDocuments: false });
```

---

## Testing Recommendations

### Manual Security Testing Checklist

**CSRF Protection:**
- [ ] Try submitting forms from external domain → Should block
- [ ] Submit form with missing Origin header → Should block
- [ ] Submit form from localhost:3000 → Should work

**Rate Limiting:**
- [ ] Submit newsletter 6 times in 1 minute → 6th should fail
- [ ] Submit contact form 4 times in 1 minute → 4th should fail
- [ ] Submit job application 3 times in 1 hour → 3rd should fail
- [ ] Try password verification 4 times in 15 min → 4th should fail
- [ ] Access unsubscribe link 11 times in 1 hour → 11th should fail

**File Upload:**
- [ ] Upload legitimate PDF → Should work
- [ ] Rename .txt to .pdf → Should fail (magic number validation)
- [ ] Upload 10MB file → Should fail (size limit)
- [ ] Upload .exe file → Should fail (file type)

**Input Sanitization:**
- [ ] Submit `<script>alert('xss')</script>` in contact form → Should be sanitized
- [ ] Submit `javascript:alert(1)` in form field → Should be removed
- [ ] Submit email with HTML tags → Should be sanitized

**Error Boundary:**
- [ ] Trigger React error (modify component to throw) → Should show error UI
- [ ] Click "Reload Page" → Should refresh
- [ ] Click "Try Again" → Should attempt recovery

**Security Headers:**
- [ ] Check response headers in browser DevTools → All headers present
- [ ] Try embedding site in iframe → Should be blocked (X-Frame-Options)
- [ ] Verify CSP in browser console → No violations

---

## Automated Testing (Phase 3 Recommended)

**Security Test Suite with Jest:**

```typescript
describe('Security Tests', () => {
  describe('Rate Limiting', () => {
    it('blocks requests after limit exceeded', async () => {
      // Make 6 requests to /api/subscribe
      // Expect 6th to return 429
    });
  });

  describe('CSRF Protection', () => {
    it('blocks requests from unauthorized origins', async () => {
      // POST with Origin: evil.com
      // Expect 403
    });
  });

  describe('Input Sanitization', () => {
    it('removes XSS payloads', () => {
      const dirty = '<script>alert("xss")</script>';
      const clean = sanitizeText(dirty);
      expect(clean).not.toContain('<script>');
    });
  });
});
```

---

## Monitoring and Alerting

### Recommended Monitoring Setup (Phase 3)

**Sentry Alerts:**
- Error rate > 1% of requests
- API response time > 2 seconds (p95)
- Rate limit hits > 50/hour

**Vercel Analytics:**
- Track Core Web Vitals
- Monitor API usage patterns
- Detect unusual traffic spikes

**Custom Logging:**
- Log all rate limit violations
- Log all CSRF rejections
- Log all file upload rejections

---

## Conclusion

### Security Posture Summary

**Current Status:** ⚠️ **NOT PRODUCTION READY**

**Strengths:**
- ✅ Excellent input sanitization
- ✅ Good CSRF protection
- ✅ Strong file validation
- ✅ Error handling well implemented

**Critical Gaps:**
- ❌ No security headers (middleware missing)
- ❌ Incomplete rate limiting
- ❌ Token expiration not implemented

**Estimated Time to Production Ready:** 3-4 hours

**Priority Order:**
1. **Create middleware.ts** (1 hour) - CRITICAL
2. **Add missing rate limits** (30 min) - CRITICAL
3. **Fix password cookie expiry** (5 min) - CRITICAL
4. **Implement token expiration** (1 hour) - HIGH
5. **Enable Sentry** (1 hour) - HIGH
6. **Manual security testing** (1 hour) - HIGH

---

## References

- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [PRODUCTION_HARDENING.md](./PRODUCTION_HARDENING.md) - Original hardening plan
- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Content Security Policy Reference](https://content-security-policy.com/)

---

**Report Version:** 1.0
**Last Updated:** December 16, 2025
**Next Review:** Before production deployment
**Auditor:** Claude Code AI Assistant

**For questions or clarifications, refer to this report and the PRODUCTION_HARDENING.md document.**

---

**END OF SECURITY AUDIT REPORT**
