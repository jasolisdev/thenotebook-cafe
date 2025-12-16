# Production Hardening Implementation

**Project:** The Notebook Café
**Date:** December 2025
**Status:** Phase 1 & 2 Complete ✅

---

## Executive Summary

This document tracks the implementation of production hardening improvements identified in a comprehensive code quality review. The work is organized into three phases based on severity and impact.

**Current Status:**
- ✅ **Phase 1 (Critical):** Complete - Security & stability foundations
- ✅ **Phase 2 (High Priority):** Complete - Observability & hardening
- ⏳ **Phase 3 (Medium Priority):** Optional - Testing & polish

---

## Original Analysis Findings

### Critical Issues Identified

1. **No Rate Limiting** (CRITICAL)
   - **Risk:** API abuse, DoS attacks, cost overruns
   - **Location:** All API routes (`/api/subscribe`, `/api/contact`, `/api/apply`)
   - **Impact:** Could allow unlimited requests, overwhelming server

2. **No Error Boundaries** (CRITICAL)
   - **Risk:** White screen crashes, poor UX, lost users
   - **Location:** Missing from `app/layout.tsx`
   - **Impact:** Any React error crashes entire app

3. **Missing CSRF Protection** (CRITICAL)
   - **Risk:** Cross-site request forgery attacks
   - **Location:** Newsletter, contact, job application forms
   - **Impact:** Attackers could submit forms from other sites

4. **Inadequate File Upload Validation** (HIGH)
   - **Risk:** Malware uploads, file type spoofing
   - **Location:** `/api/apply` (resume/document uploads)
   - **Issue:** Only checks MIME type (easily spoofed by renaming files)

5. **console.error in Production** (HIGH)
   - **Risk:** Sensitive data leaks, no error tracking
   - **Location:** 4 files (API routes + AccessibilityWidget)
   - **Impact:** Errors logged to console but not tracked

6. **No Security Headers** (HIGH)
   - **Risk:** Clickjacking, XSS, MIME sniffing attacks
   - **Location:** No middleware implementing headers
   - **Impact:** Browser security features not enabled

7. **Zero Test Coverage** (MEDIUM)
   - **Risk:** Bugs in production, regression issues
   - **Impact:** No automated testing for API routes or components

8. **No Input Sanitization** (MEDIUM)
   - **Risk:** XSS, injection attacks in Sanity CMS
   - **Location:** All API routes creating Sanity documents
   - **Impact:** Malicious input could corrupt database

---

## Phase 1: Critical Security & Stability (COMPLETE ✅)

**Timeline:** Implemented December 2025
**Commit:** `2f0cf94` - "Add Phase 1 critical production fixes"

### Implementations

#### 1. Production-Safe Logger (`app/lib/logger.ts`)
**Purpose:** Replace console.error to prevent sensitive data leaks

**Features:**
- Development: Full logging with context
- Production: Message-only logging (no error objects)
- Ready for monitoring service integration
- Methods: `info()`, `warn()`, `error()`

**Usage:**
```typescript
import { logger } from '@/app/lib/logger';

try {
  // risky operation
} catch (err) {
  logger.error("Operation failed", err, { userId: '123' });
}
```

---

#### 2. React Error Boundary (`app/components/ErrorBoundary.tsx`)
**Purpose:** Catch React errors to prevent white screen crashes

**Features:**
- User-friendly error UI with coffee shop branding
- "Reload Page" and "Try Again" recovery buttons
- Error details shown in development mode
- Automatic error logging via logger utility

**Implementation:** Wrapped entire app in `layout.tsx`

---

#### 3. CSRF Protection (`app/lib/csrf.ts`)
**Purpose:** Prevent cross-site request forgery attacks

**Features:**
- Validates request origin header
- Fallback to referer header
- Whitelists allowed domains:
  - `http://localhost:3000` (development)
  - `https://thenotebookcafe.com` (production)
  - `https://www.thenotebookcafe.com` (production)

**Applied to:**
- `/api/subscribe` - Newsletter signups
- `/api/contact` - Contact form submissions
- `/api/apply` - Job applications

---

#### 4. Rate Limiting (`app/lib/rateLimit.ts`)
**Purpose:** Prevent API abuse and DoS attacks

**Implementation:** In-memory rate limiter (suitable for single-server)

**Limits:**
- **Newsletter (`/api/subscribe`):** 5 requests/minute
- **Contact Form (`/api/contact`):** 3 requests/minute
- **Job Applications (`/api/apply`):** 2 requests/hour

**Features:**
- IP-based tracking (via `x-forwarded-for` header)
- Automatic cleanup of expired entries
- Returns 429 status with `Retry-After` header

**Note:** For multi-server deployments, migrate to Redis/Upstash

---

#### 5. Enhanced File Validation (`app/lib/fileValidation.ts`)
**Purpose:** Prevent file type spoofing via magic number checks

**Features:**
- Validates file signatures (first bytes of file)
- Supports: PDF, DOC, DOCX, JPEG, PNG, GIF
- Size validation (5MB limit)
- Special validation for .docx (checks ZIP contains Word content)

**Magic Numbers:**
```typescript
pdf:  [0x25, 0x50, 0x44, 0x46]        // %PDF
doc:  [0xd0, 0xcf, 0x11, 0xe0, ...]   // OLE
docx: [0x50, 0x4b, 0x03, 0x04]        // ZIP (PK)
jpeg: [0xff, 0xd8, 0xff]              // JPEG
png:  [0x89, 0x50, 0x4e, 0x47, ...]   // PNG
```

**Applied to:** `/api/apply` (resume and supplemental application uploads)

---

#### 6. Code Cleanup
- Replaced 4 instances of `console.error` with `logger.error()`
- Removed DEBUG CSS section from `globals.css` (26 lines)
- Updated files:
  - `app/api/subscribe/route.ts`
  - `app/api/contact/route.ts`
  - `app/api/apply/route.ts`
  - `app/components/features/Accessibility/AccessibilityWidget.tsx`

---

### Phase 1 Results

| Issue | Status | Solution |
|-------|--------|----------|
| No rate limiting | ✅ Fixed | In-memory rate limiter with IP tracking |
| No error boundaries | ✅ Fixed | ErrorBoundary wrapping entire app |
| Missing CSRF protection | ✅ Fixed | Origin header validation |
| Weak file validation | ✅ Fixed | Magic number validation |
| console.error in production | ✅ Fixed | Production-safe logger |
| DEBUG CSS | ✅ Removed | Cleaned from globals.css |

**Files Created:** 5
**Files Modified:** 5
**Lines Added:** 653
**Lines Removed:** 51

---

## Phase 2: High Priority Hardening (COMPLETE ✅)

**Timeline:** Implemented December 2025
**Commit:** `0d6710e` - "Add Phase 2 production hardening improvements"

### Implementations

#### 1. Security Headers Middleware (`middleware.ts`)
**Purpose:** Enable browser security features to prevent attacks

**Headers Implemented:**

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking (blocks iframe embedding) |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Blocks browser features |
| `Content-Security-Policy` | (see below) | Prevents XSS and injection |
| `Strict-Transport-Security` | `max-age=31536000` | Enforces HTTPS (production only) |

**Content Security Policy:**
```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' https://cdn.sanity.io https://images.unsplash.com data: blob:;
media-src 'self' https://cdn.sanity.io;
connect-src 'self' https://cdn.sanity.io https://*.sanity.io;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
```

**Whitelisted Domains:**
- Sanity CDN: `cdn.sanity.io`, `*.sanity.io`
- Unsplash: `images.unsplash.com`
- Google Fonts: `fonts.googleapis.com`, `fonts.gstatic.com`

---

#### 2. Input Sanitization (`app/lib/sanitize.ts`)
**Purpose:** Prevent XSS and injection attacks in Sanity CMS

**Sanitization Functions:**

**`sanitizeText(input: string)`**
- Removes HTML tags (`<script>`, `<img>`, etc.)
- Removes script injection patterns (`javascript:`, `on*=`)
- Removes null bytes
- Normalizes whitespace

**`sanitizeEmail(input: string)`**
- Converts to lowercase
- Allows only: `a-z`, `0-9`, `@`, `.`, `_`, `+`, `-`
- Removes all other characters

**`sanitizePhone(input: string)`**
- Allows only: digits, `+`, `-`, `()`, spaces
- Removes all other characters

**`sanitizeUrl(input: string)`**
- Validates URL format
- Only allows `http://` and `https://` protocols
- Returns `null` for invalid URLs

**`sanitizeObject(obj: object)`**
- Recursively sanitizes all string values
- Auto-detects field types (email, phone, URL)
- Handles nested objects and arrays

**Applied to:**
- **Subscribe API:** Email and source fields
- **Contact API:** Name, email, subject, message
- **Apply API:** All 13 fields including arrays (positions, daysAvailable)

---

#### 3. Error Monitoring Integration (`app/lib/monitoring.ts`)
**Purpose:** Ready-to-enable Sentry integration for error tracking

**Features:**
- Complete Sentry setup (commented out, ready to enable)
- Integration points:
  - `initErrorMonitoring()` - Initialize Sentry
  - `captureError()` - Send errors
  - `captureMessage()` - Send custom messages
  - `setUserContext()` / `clearUserContext()` - User tracking
  - `addBreadcrumb()` - Debug trails

**Configuration:**
```typescript
// Filters out common noise
ignoreErrors: [
  /extensions\//i,                      // Browser extensions
  /^Non-Error promise rejection/,       // Promise rejections
  "NetworkError",                        // Network issues
  "Failed to fetch",                     // Fetch failures
  "ResizeObserver loop limit exceeded"   // Common React noise
]

// Sampling rates
tracesSampleRate: 1.0     // 100% error tracking
profilesSampleRate: 0.1   // 10% performance profiling
```

**To Enable:**
1. `npm install @sentry/nextjs`
2. Add `NEXT_PUBLIC_SENTRY_DSN` to `.env.local`
3. Uncomment initialization code in `monitoring.ts`
4. Run: `npx @sentry/wizard@latest -i nextjs`

**Logger Integration:**
- Automatically sends errors to Sentry in production
- Dynamic import prevents issues if Sentry not configured

---

#### 4. API Request Logging (middleware.ts)
**Purpose:** Track API usage and performance

**Features:**
- Logs all API requests with:
  - HTTP method (GET, POST, etc.)
  - Request path
  - Query parameters
  - Client IP address (from `x-forwarded-for`)
  - Response time in milliseconds

**Output Format:**
```
[POST] /api/subscribe - IP: 192.168.1.1
[POST] /api/subscribe - 45ms
```

**Performance Monitoring:**
- Adds `X-Response-Time` header to all API responses
- Tracks endpoint performance over time

---

#### 5. ErrorBoundary in Root Layout
**Purpose:** Wrap entire application to catch all React errors

**Implementation:**
```tsx
<ErrorBoundary>
  <CartProvider>
    {showPasswordGate ? (
      <PasswordGate />
    ) : (
      <SiteShell>
        {children}
      </SiteShell>
    )}
  </CartProvider>
</ErrorBoundary>
```

**Benefits:**
- Catches errors from any component
- Prevents white screen crashes
- User-friendly recovery options
- Automatic error logging

---

### Phase 2 Results

| Feature | Status | Implementation |
|---------|--------|----------------|
| Security headers | ✅ Complete | 6 headers via middleware |
| Input sanitization | ✅ Complete | All Sanity mutations sanitized |
| Error monitoring | ✅ Ready | Sentry integration prepared |
| Request logging | ✅ Complete | API logging with IP + timing |
| ErrorBoundary | ✅ Complete | Integrated in root layout |

**Files Created:** 3
**Files Modified:** 5
**Lines Added:** 497
**Lines Removed:** 49

---

## Phase 3: Medium Priority (OPTIONAL - NOT STARTED)

### Proposed Improvements

#### 1. Comprehensive Test Suite
**Priority:** Medium
**Effort:** 2-3 days

**Scope:**
- Unit tests for API routes (subscribe, contact, apply)
- Integration tests for form submissions
- Component tests for ErrorBoundary, forms
- E2E tests for critical user flows

**Tools:**
- Jest + React Testing Library
- Playwright or Cypress for E2E
- Mock Sanity client for API tests

**Coverage Goals:**
- API routes: 80%+
- Components: 70%+
- Utilities: 90%+

---

#### 2. API Request Validation with Zod
**Priority:** Medium
**Effort:** 1 day

**Benefits:**
- Type-safe request validation
- Better error messages
- Runtime type checking
- Auto-generated TypeScript types

**Implementation:**
```typescript
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email().max(254),
  source: z.string().max(64).optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = subscribeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues },
      { status: 400 }
    );
  }

  // Use parsed.data (type-safe!)
}
```

**Apply to:**
- `/api/subscribe` - Email validation
- `/api/contact` - Contact form validation
- `/api/apply` - Job application validation

---

#### 3. Database-Backed Rate Limiting
**Priority:** Medium
**Effort:** 1 day

**Current Limitation:**
- In-memory rate limiter only works on single server
- Resets on server restart
- No persistence

**Solution: Upstash Redis**
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }

  // Process request
}
```

**Benefits:**
- Works across multiple servers
- Persistent rate limits
- More accurate tracking
- Advanced algorithms (sliding window, token bucket)

**Cost:** Free tier: 10,000 requests/day

---

#### 4. Performance Monitoring
**Priority:** Medium
**Effort:** 1 day

**Metrics to Track:**
- API response times (p50, p95, p99)
- Database query performance
- Client-side rendering times
- Core Web Vitals (LCP, FID, CLS)

**Tools:**
- Vercel Analytics (built-in, free)
- Sentry Performance Monitoring
- Custom metrics in middleware

**Implementation:**
```typescript
// Track slow API endpoints
if (duration > 1000) {
  logger.warn('Slow API endpoint', {
    path: pathname,
    duration,
    method,
  });
}
```

---

#### 5. Email Notifications
**Priority:** Medium
**Effort:** 1 day

**Notifications:**
- New newsletter subscriber → Admin email
- Contact form submission → Admin email
- Job application received → Admin email + confirmation to applicant

**Service Options:**
- **Resend** (recommended): Modern API, generous free tier
- **SendGrid**: Established, 100 emails/day free
- **Postmark**: Transactional focus, 100 emails/month free

**Implementation:**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@thenotebookcafe.com',
  to: 'owner@thenotebookcafe.com',
  subject: 'New Contact Form Submission',
  html: `<p>Name: ${name}</p><p>Email: ${email}</p>...`,
});
```

---

#### 6. Enhanced Logging
**Priority:** Low
**Effort:** 0.5 days

**Improvements:**
- Structured logging (JSON format)
- Request IDs for tracing
- User context in logs
- Log levels (debug, info, warn, error)

**Example:**
```typescript
logger.info('User action', {
  requestId: crypto.randomUUID(),
  userId: '123',
  action: 'subscribe',
  timestamp: new Date().toISOString(),
});
```

---

## Security Best Practices Summary

### Implemented ✅

1. **Authentication & Authorization**
   - ✅ Password gate for pre-launch protection
   - ✅ CSRF protection on all forms
   - ✅ Rate limiting on all API endpoints

2. **Input Validation**
   - ✅ Email validation with regex
   - ✅ Input sanitization (HTML, scripts, injection patterns)
   - ✅ File upload validation (magic numbers)
   - ✅ Field length limits

3. **Output Security**
   - ✅ Content Security Policy headers
   - ✅ Sanitized data before Sanity mutations
   - ✅ Production-safe logging (no sensitive data)

4. **Error Handling**
   - ✅ Error boundaries prevent crashes
   - ✅ Generic error messages to users
   - ✅ Detailed errors in development only

5. **Headers & Transport**
   - ✅ X-Frame-Options (clickjacking prevention)
   - ✅ X-Content-Type-Options (MIME sniffing prevention)
   - ✅ Referrer-Policy
   - ✅ Permissions-Policy
   - ✅ Strict-Transport-Security (HSTS)

### Recommended for Future

1. **Additional Headers**
   - ⏳ Cross-Origin-Embedder-Policy (COEP)
   - ⏳ Cross-Origin-Opener-Policy (COOP)
   - ⏳ Cross-Origin-Resource-Policy (CORP)

2. **Enhanced Authentication**
   - ⏳ Admin dashboard authentication
   - ⏳ Two-factor authentication for sensitive operations
   - ⏳ Session management

3. **Advanced Security**
   - ⏳ Subresource Integrity (SRI) for CDN assets
   - ⏳ API key rotation
   - ⏳ Security.txt file
   - ⏳ Penetration testing

---

## Performance Optimizations

### Already Implemented

1. **Caching**
   - ✅ Sanity CDN caching
   - ✅ Next.js static generation
   - ✅ `Cache-Control: no-store` on API routes (security)

2. **Code Splitting**
   - ✅ Next.js automatic code splitting
   - ✅ Dynamic imports for heavy components
   - ✅ Font optimization (Google Fonts)

3. **Image Optimization**
   - ✅ Next.js Image component
   - ✅ WebP format with fallbacks
   - ✅ Lazy loading

### Potential Improvements

1. **Database Optimization**
   - ⏳ Sanity query optimization
   - ⏳ Index frequently queried fields
   - ⏳ Projection (fetch only needed fields)

2. **Client-Side Performance**
   - ⏳ Reduce JavaScript bundle size
   - ⏳ Prefetch critical data
   - ⏳ Service worker for offline support

3. **Server-Side Performance**
   - ⏳ Edge functions for global low latency
   - ⏳ Database connection pooling
   - ⏳ Response compression

---

## Monitoring & Alerting Strategy

### Error Monitoring (Sentry Ready)

**When to Enable:**
- Before public launch
- After testing in staging

**Alerts to Configure:**
1. **Error Threshold:** >10 errors/hour
2. **API Failures:** >5% error rate
3. **Slow Responses:** API >2s response time
4. **Rate Limit Hits:** >50 429 responses/hour

### Performance Monitoring

**Metrics to Track:**
1. **API Response Times**
   - Target: p95 < 500ms
   - Alert: p95 > 1000ms

2. **Core Web Vitals**
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

3. **Rate Limit Usage**
   - Track 429 responses
   - Identify abusive IPs

### Uptime Monitoring

**Services:**
- Vercel built-in monitoring
- UptimeRobot (free)
- Pingdom

**Endpoints to Monitor:**
- `/` (homepage)
- `/api/subscribe` (health check)
- `/menu` (critical page)

---

## Deployment Checklist

### Pre-Launch (CRITICAL)

- [x] Rate limiting enabled
- [x] CSRF protection enabled
- [x] Error boundary active
- [x] File validation with magic numbers
- [x] Security headers configured
- [x] Input sanitization on all forms
- [x] Production logger (no console.error)
- [ ] Sentry error monitoring enabled
- [ ] Test all API endpoints
- [ ] Load testing completed
- [ ] Security review completed

### Environment Variables Required

**Required:**
```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token

# Optional: Password Protection
SITE_PASSWORD=  # Leave empty to disable
```

**Optional (Phase 3):**
```bash
# Error Monitoring
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_token

# Rate Limiting (Redis)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Email Notifications
RESEND_API_KEY=your_resend_key
ADMIN_EMAIL=owner@thenotebookcafe.com
```

### Post-Launch Monitoring

**First 24 Hours:**
- [ ] Check error rates (target: <1% of requests)
- [ ] Monitor rate limit hits
- [ ] Review API response times
- [ ] Check Sanity mutation success rate
- [ ] Test all forms from production

**First Week:**
- [ ] Review accumulated errors in Sentry
- [ ] Analyze API usage patterns
- [ ] Optimize slow endpoints (>1s)
- [ ] Check for security incidents

**Ongoing:**
- [ ] Weekly error review
- [ ] Monthly security audit
- [ ] Quarterly dependency updates
- [ ] Annual penetration testing

---

## Testing Strategy

### Manual Testing Required

**Before Launch:**
1. **Newsletter Signup**
   - Valid email submission
   - Duplicate email handling
   - Invalid email rejection
   - Rate limit enforcement (try 6 times)

2. **Contact Form**
   - Valid submission
   - Required field validation
   - XSS attempt (try `<script>alert('xss')</script>`)
   - Rate limit enforcement (try 4 times)

3. **Job Application**
   - Valid submission with resume
   - Invalid file type rejection (try renaming .txt to .pdf)
   - File size limit (try 10MB file)
   - Rate limit enforcement (try 3 times in hour)

4. **Error Boundary**
   - Trigger React error (modify component to throw)
   - Verify error UI shows
   - Test "Reload Page" button
   - Test "Try Again" button

5. **Security Headers**
   - Check headers in browser DevTools (Network tab)
   - Verify CSP blocks unauthorized scripts
   - Test iframe embedding blocked (X-Frame-Options)

### Automated Testing (Phase 3)

**Unit Tests:**
```typescript
// Rate limiter
describe('checkRateLimit', () => {
  it('allows requests under limit', () => {});
  it('blocks requests over limit', () => {});
  it('resets after time window', () => {});
});

// Sanitization
describe('sanitizeText', () => {
  it('removes HTML tags', () => {});
  it('removes script tags', () => {});
  it('removes javascript: protocol', () => {});
});

// CSRF validation
describe('validateOrigin', () => {
  it('allows whitelisted origins', () => {});
  it('blocks unknown origins', () => {});
});
```

---

## Cost Analysis

### Current Implementation (Free)

| Service | Usage | Cost |
|---------|-------|------|
| Vercel | Next.js hosting | Free tier |
| Sanity | CMS (10GB bandwidth) | Free tier |
| In-memory rate limiting | Server RAM | $0 |
| Next.js middleware | Edge functions | Free tier |

**Total Monthly Cost:** $0

### With Phase 3 Additions

| Service | Usage | Cost |
|---------|-------|------|
| Vercel | Same | Free tier |
| Sanity | Same | Free tier |
| Sentry | 5,000 events/month | Free tier |
| Upstash Redis | 10,000 requests/day | Free tier |
| Resend | 100 emails/day | Free tier |

**Total Monthly Cost:** $0 (within free tiers)

### Expected Traffic Growth

| Metric | Current | 6 Months | 1 Year |
|--------|---------|----------|--------|
| Monthly visitors | 0 (pre-launch) | 5,000 | 15,000 |
| API requests | 0 | 10,000 | 30,000 |
| Newsletter subscribers | 0 | 500 | 2,000 |
| Job applications | 0 | 20 | 60 |

**Cost Projection (1 Year):** Still $0 (within all free tiers)

---

## Documentation Updates

### Files Added

**Phase 1:**
- `app/lib/logger.ts` - Production-safe logging
- `app/lib/csrf.ts` - CSRF protection
- `app/lib/rateLimit.ts` - Rate limiting
- `app/lib/fileValidation.ts` - Magic number validation
- `app/components/ErrorBoundary.tsx` - Error boundary

**Phase 2:**
- `middleware.ts` - Security headers + logging
- `app/lib/monitoring.ts` - Sentry integration
- `app/lib/sanitize.ts` - Input sanitization

**This Document:**
- `PRODUCTION_HARDENING.md` - This comprehensive guide

### Files Modified

**Phase 1:**
- `app/api/subscribe/route.ts` - CSRF, rate limit, logger
- `app/api/contact/route.ts` - CSRF, rate limit, logger
- `app/api/apply/route.ts` - CSRF, rate limit, validation, logger
- `app/components/features/Accessibility/AccessibilityWidget.tsx` - Logger
- `app/globals.css` - Removed DEBUG CSS

**Phase 2:**
- `app/layout.tsx` - Added ErrorBoundary wrapper
- `app/lib/logger.ts` - Monitoring integration
- `app/api/subscribe/route.ts` - Input sanitization
- `app/api/contact/route.ts` - Input sanitization
- `app/api/apply/route.ts` - Input sanitization

---

## Maintenance Plan

### Weekly Tasks
- Review error logs (when Sentry enabled)
- Check rate limit abuse patterns
- Monitor API performance

### Monthly Tasks
- Update dependencies (`npm audit`)
- Review security advisories
- Analyze API usage trends
- Test all forms manually

### Quarterly Tasks
- Full security audit
- Performance optimization review
- Update this documentation
- Penetration testing (if budget allows)

### Annual Tasks
- Comprehensive security review
- Dependency major version updates
- Architecture review
- Third-party security audit

---

## Contact & Support

**Developer:** Claude Code
**Project Owner:** The Notebook Café
**Repository:** github.com/jasolisdev/thenotebook-cafe
**Branch:** `claude/story-page-updates-oDXwR`

**For Issues:**
- Security vulnerabilities: Report immediately via email
- Bug reports: GitHub Issues
- Feature requests: GitHub Discussions

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| Dec 2025 | 1.0 | Initial analysis and Phase 1 implementation | Claude |
| Dec 2025 | 1.1 | Phase 2 implementation complete | Claude |
| Dec 2025 | 1.2 | Documentation finalized | Claude |

---

## Appendix: Quick Reference

### Rate Limit Configuration

| Endpoint | Limit | Window | Use Case |
|----------|-------|--------|----------|
| `/api/subscribe` | 5 | 1 minute | Newsletter signups |
| `/api/contact` | 3 | 1 minute | Contact forms |
| `/api/apply` | 2 | 1 hour | Job applications |

### Security Headers Reference

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: [see Phase 2 section]
```

### Allowed Origins (CSRF)

```
http://localhost:3000
https://thenotebookcafe.com
https://www.thenotebookcafe.com
```

### File Upload Limits

- **Max Size:** 5MB per file
- **Allowed Types:** PDF, DOC, DOCX
- **Validation Method:** Magic number + MIME type

---

**End of Document**
