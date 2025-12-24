# API Routes

Next.js API routes for server-side operations. All routes are protected by security middleware.

## Security Architecture

Every API route implements three layers of security:

1. **CSRF Protection** - Validates Origin/Referer headers
2. **Rate Limiting** - IP-based request throttling
3. **Input Sanitization** - Prevents XSS and injection attacks

## Routes

### POST /api/subscribe

Newsletter subscription endpoint.

**Security:**
- Rate limit: 5 requests per minute
- CSRF protected
- Input sanitization

**Request:**
```json
{
  "email": "user@example.com",
  "source": "homepage"
}
```

**Response (success):**
```json
{
  "ok": true,
  "duplicate": false,
  "id": "subscriber-doc-id"
}
```

**Response (duplicate):**
```json
{
  "ok": true,
  "duplicate": true
}
```

**Features:**
- Duplicate detection (case-insensitive)
- Generates unsubscribe token
- Email normalization
- Length validation (max 254 chars)
- Creates Sanity subscriber document

**Implementation:**
```typescript
// app/api/subscribe/route.ts
import { validateCsrf } from '@/app/lib/csrf';
import { createRateLimiter } from '@/app/lib/rateLimit';
import { sanitizeEmail } from '@/app/lib/sanitize';
```

---

### POST /api/contact

Contact form submission with email notification.

**Security:**
- Rate limit: 3 requests per minute
- CSRF protected
- Input sanitization
- HTML escaping in email template

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "Hello..."
}
```

**Response (success):**
```json
{
  "ok": true,
  "id": "contact-message-id"
}
```

**Features:**
- Sends formatted email via Resend
- Beautiful HTML template with dark mode
- Creates Sanity document for record-keeping
- Reply-to button with pre-filled content
- Continues even if email fails (logs error)
- Timezone-aware formatting (PST)

**Email Template:**
- Editorial newsletter design
- Dark mode support via `prefers-color-scheme`
- Mobile responsive
- XSS protection (all inputs escaped)

---

### POST /api/unsubscribe

Newsletter unsubscription endpoint.

**Security:**
- Token-based unsubscribe (no authentication needed)
- CSRF protected
- Rate limiting

**Request:**
```json
{
  "token": "unsubscribe-token-uuid"
}
```

**Response:**
```json
{
  "ok": true
}
```

**Features:**
- Updates subscriber status to 'unsubscribed'
- Token validation
- No email required

---

### POST /api/apply

Job application submission.

**Security:**
- Rate limiting
- File upload validation
- Input sanitization

**Request:**
- `multipart/form-data` with resume file
- Name, email, phone, position, message

**Features:**
- Resume file validation (type, size)
- Creates application document in Sanity
- File storage (planned)

---

### POST /api/auth/verify

Password verification for protected content.

**Security:**
- Session-based
- Rate limiting (prevents brute force)
- Constant-time comparison

**Request:**
```json
{
  "password": "site-password"
}
```

**Response:**
```json
{
  "ok": true
}
```

**Features:**
- Password-protects sensitive pages
- Session storage
- No database needed

---

## Security Implementation

### CSRF Protection

```typescript
import { validateCsrf } from '@/app/lib/csrf';

export async function POST(request: Request) {
  const csrfValid = await validateCsrf(request);
  if (!csrfValid) {
    return new Response('Forbidden', { status: 403 });
  }
  // ...
}
```

### Rate Limiting

```typescript
import { createRateLimiter } from '@/app/lib/rateLimit';

const limiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 60000, // 1 minute
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const allowed = limiter.check(ip);

  if (!allowed) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' }
    });
  }
  // ...
}
```

### Input Sanitization

```typescript
import { sanitizeInput, sanitizeEmail } from '@/app/lib/sanitize';

const name = sanitizeInput(body.name);
const email = sanitizeEmail(body.email);
const message = sanitizeInput(body.message);
```

## Error Handling

All routes follow consistent error handling:

```typescript
try {
  // Route logic...
  return Response.json({ ok: true });
} catch (error) {
  logger.error('API error', { error });
  return Response.json(
    { ok: false, error: 'Internal server error' },
    { status: 500 }
  );
}
```

## Logging

All routes use structured logging:

```typescript
import { logger } from '@/app/lib/logger';

logger.info('Newsletter subscription', { email, source });
logger.warn('Rate limit hit', { ip });
logger.error('Email send failed', { error });
```

## Testing API Routes

### Manual Testing

```bash
# Subscribe endpoint
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"email":"test@example.com","source":"homepage"}'

# Contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

### Rate Limit Testing

```bash
# Hit endpoint multiple times to trigger rate limit
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/subscribe \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3000" \
    -d '{"email":"test'$i'@example.com","source":"homepage"}'
  echo ""
done
```

## Best Practices

1. **Always validate CSRF** - Use on all mutation endpoints
2. **Rate limit aggressively** - Prevent abuse
3. **Sanitize all inputs** - Never trust user data
4. **Log security events** - Track suspicious activity
5. **Use write client server-side** - Never expose tokens to client
6. **Handle errors gracefully** - Don't leak sensitive info
7. **Return consistent responses** - Always use `{ ok: boolean }`
8. **Validate file uploads** - Check size, type, content

## Environment Variables

Required for API routes:

```bash
# Sanity (Required)
SANITY_WRITE_TOKEN=your_write_token

# Email (Required for /contact)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_RECIPIENT=business@example.com

# Auth (Optional)
SITE_PASSWORD=your_password  # Leave empty to disable
```

## Adding New Routes

1. Create route file: `app/api/[route]/route.ts`
2. Implement security layers (CSRF, rate limit, sanitization)
3. Add error handling and logging
4. Create types in `app/types/api.ts`
5. Document in this README
6. Test thoroughly

### Template

```typescript
import { validateCsrf } from '@/app/lib/csrf';
import { createRateLimiter } from '@/app/lib/rateLimit';
import { sanitizeInput } from '@/app/lib/sanitize';
import { logger } from '@/app/lib/logger';

const limiter = createRateLimiter({
  maxRequests: 10,
  windowMs: 60000,
});

export async function POST(request: Request) {
  // 1. CSRF validation
  const csrfValid = await validateCsrf(request);
  if (!csrfValid) {
    return new Response('Forbidden', { status: 403 });
  }

  // 2. Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!limiter.check(ip)) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' }
    });
  }

  try {
    // 3. Parse and sanitize input
    const body = await request.json();
    const data = sanitizeInput(body.data);

    // 4. Business logic
    // ...

    // 5. Log and return
    logger.info('Route success', { data });
    return Response.json({ ok: true });

  } catch (error) {
    logger.error('Route error', { error });
    return Response.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```
