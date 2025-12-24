# Server Utilities

Server-only utility functions and libraries. These files should **never** be imported in client components.

## ⚠️ Important

All code in this directory is **server-only**:
- Runs only on the server
- Cannot be imported in client components
- May contain sensitive tokens/secrets
- Uses Node.js APIs not available in browsers

## Current Structure

```
lib/
├── colors.ts              # Shared color constants (move to constants/)
├── csrf.ts                # CSRF protection
├── rateLimit.ts           # Rate limiting
├── sanitize.ts            # Input sanitization
├── logger.ts              # Structured logging
├── monitoring.ts          # Error tracking & monitoring
├── fileValidation.ts      # File upload validation
├── baristaFaqData.ts      # FAQ data (move to data/)
└── virtualBaristaResponder.ts  # AI responder (move to data/)
```

## Security Utilities

### csrf.ts

Cross-Site Request Forgery protection for API routes.

**Features:**
- Origin/Referer header validation
- Allows localhost, production, and Vercel previews
- Returns 403 for invalid origins

**Usage:**
```typescript
import { validateCsrf } from '@/app/lib/csrf';

export async function POST(request: Request) {
  const csrfValid = await validateCsrf(request);
  if (!csrfValid) {
    return new Response('Forbidden', { status: 403 });
  }
  // Handle request...
}
```

---

### rateLimit.ts

In-memory IP-based rate limiting.

**Features:**
- Configurable limits per endpoint
- Automatic cleanup of expired entries
- Returns 429 with Retry-After header

**Usage:**
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
    return new Response('Too many requests', {
      status: 429,
      headers: { 'Retry-After': '60' }
    });
  }
  // Handle request...
}
```

---

### sanitize.ts

Input sanitization to prevent XSS and injection attacks.

**Features:**
- HTML tag removal
- Script injection prevention
- Email validation
- URL sanitization
- Recursive object sanitization

**Usage:**
```typescript
import { sanitizeInput, sanitizeEmail } from '@/app/lib/sanitize';

const cleanName = sanitizeInput(userInput);
const cleanEmail = sanitizeEmail(email);
```

---

## Logging & Monitoring

### logger.ts

Structured logging utility.

**Features:**
- Development: Console output with colors
- Production: JSON format for log aggregation
- Log levels: info, warn, error

**Usage:**
```typescript
import { logger } from '@/app/lib/logger';

logger.info('User subscribed', { email: 'user@example.com' });
logger.warn('Rate limit approaching', { ip: '1.2.3.4' });
logger.error('API call failed', { error: err.message });
```

---

### monitoring.ts

Error tracking and performance monitoring.

**Features:**
- Ready for Sentry/DataDog integration
- Error capture with context
- Performance timing

**Usage:**
```typescript
import { captureError, recordMetric } from '@/app/lib/monitoring';

try {
  // Operation...
} catch (error) {
  captureError(error, { context: 'subscription' });
}

recordMetric('api.response_time', 150);
```

---

## Validation

### fileValidation.ts

File upload validation.

**Features:**
- File type checking
- Size limits
- Content validation
- Security checks

**Usage:**
```typescript
import { validateUploadedFile } from '@/app/lib';

const result = await validateUploadedFile(
  file,
  ['application/pdf'],
  5 * 1024 * 1024 // 5MB
);

if (!result.valid) {
  throw new Error(result.error ?? 'Invalid file');
}
```

---

## Data Files (To Reorganize)

### baristaFaqData.ts
Virtual barista FAQ data - **should move to** `lib/data/`

### virtualBaristaResponder.ts
AI responder logic - **should move to** `lib/data/`

---

## Best Practices

1. **Server-only** - Never import in client components
2. **No secrets in logs** - Sanitize before logging
3. **Validate all inputs** - Use sanitize.ts for user input
4. **Rate limit APIs** - Protect against abuse
5. **CSRF on mutations** - Validate on POST/PUT/DELETE
6. **Error handling** - Use monitoring.ts for errors
7. **Type safety** - Use TypeScript for all utilities

## Import Convention

```typescript
// ✅ Good - In server components or API routes
import { validateCsrf } from '@/app/lib/csrf';
import { logger } from '@/app/lib/logger';

// ❌ Bad - In client components
// This will cause build errors or bundle bloat
```

## Future Organization

Planned reorganization (Phase 2):
```
lib/
├── server/              # Server-only utilities
│   ├── csrf.ts
│   ├── rateLimit.ts
│   ├── sanitize.ts
│   ├── logger.ts
│   ├── monitoring.ts
│   └── fileValidation.ts
├── data/                # Data/content
│   ├── baristaFaqData.ts
│   └── virtualBaristaResponder.ts
└── constants/           # Shared constants
    └── colors.ts
```
