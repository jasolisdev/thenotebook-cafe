# Test Coverage Analysis - The Notebook Café

**Date:** December 19, 2025
**Codebase Version:** Current (Next.js 16, React 19)

---

## Executive Summary

**Current Test Coverage: 0%**

The codebase currently has **no test infrastructure** or test files. Given the complexity of the application—including API routes with security features, client-side state management, form validation, cart functionality, and CMS integration—implementing comprehensive testing is a critical priority.

---

## Current State

### What Exists
- ✅ Production code with security features (CSRF, rate limiting, input sanitization)
- ✅ Complex client components (cart, forms, modals)
- ✅ API routes handling sensitive operations (contact, subscribe, apply)
- ✅ Utility functions for validation and security
- ✅ Sanity CMS integration

### What's Missing
- ❌ No test framework configured (Jest, Vitest, or similar)
- ❌ No test files (`.test.ts`, `.spec.ts`)
- ❌ No test scripts in package.json
- ❌ No E2E testing setup (Playwright, Cypress)
- ❌ No CI/CD test automation
- ❌ No test utilities or mocks

---

## Recommended Testing Strategy

### 1. Test Infrastructure Setup

**Priority: CRITICAL**

Install and configure testing frameworks:

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "jsdom": "^23.0.0",
    "@playwright/test": "^1.40.0",
    "msw": "^2.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:coverage": "vitest --coverage"
  }
}
```

**Why Vitest?**
- Native ESM support (matches Next.js 16)
- Faster than Jest
- Compatible with React Testing Library
- Built-in coverage reporting

---

## Priority Testing Areas

### **CRITICAL PRIORITY** (Security & Data Integrity)

#### 1. API Route Security (`app/api/**/route.ts`)

**Files to Test:**
- `/api/subscribe/route.ts` (90 lines)
- `/api/contact/route.ts` (326 lines)
- `/api/apply/route.ts`
- `/api/auth/verify/route.ts`
- `/api/unsubscribe/route.ts`

**Test Coverage Needed:**

##### `/api/subscribe/route.ts`
```typescript
// Tests needed:
describe('POST /api/subscribe', () => {
  describe('Security', () => {
    test('blocks requests from invalid origins (CSRF)', async () => {
      // Test CSRF protection
    });

    test('enforces rate limiting (5 requests per minute)', async () => {
      // Test rate limit of 5 req/min
    });

    test('sanitizes email input to prevent injection', async () => {
      // Test with malicious inputs: <script>, javascript:, etc.
    });
  });

  describe('Validation', () => {
    test('rejects emails longer than 254 characters', async () => {});
    test('rejects emails with invalid format', async () => {});
    test('rejects emails with dangerous characters (<>"\'`)', async () => {});
    test('rejects non-string email input', async () => {});
    test('normalizes email to lowercase', async () => {});
  });

  describe('Business Logic', () => {
    test('detects duplicate subscriptions (case-insensitive)', async () => {});
    test('adds unsubscribe token to existing subscribers without one', async () => {});
    test('creates new subscriber with correct schema', async () => {});
    test('returns appropriate response for duplicates', async () => {});
    test('limits source field to 64 characters', async () => {});
  });

  describe('Error Handling', () => {
    test('handles Sanity client failures gracefully', async () => {});
    test('handles malformed JSON payloads', async () => {});
    test('returns 500 on unexpected errors', async () => {});
    test('includes Cache-Control headers on all responses', async () => {});
  });
});
```

##### `/api/contact/route.ts`
```typescript
// Tests needed (326 lines - complex email templating):
describe('POST /api/contact', () => {
  describe('Security', () => {
    test('blocks requests from invalid origins', async () => {});
    test('enforces rate limiting (3 requests per minute)', async () => {});
    test('sanitizes all input fields', async () => {});
    test('escapes HTML in email template', async () => {});
  });

  describe('Validation', () => {
    test('requires all fields (name, email, subject, message)', async () => {});
    test('limits name to 120 characters', async () => {});
    test('limits subject to 120 characters', async () => {});
    test('limits message to 5000 characters', async () => {});
    test('validates email format', async () => {});
  });

  describe('Email Generation', () => {
    test('builds plain text email correctly', () => {
      const result = buildContactEmailText({...});
      expect(result).toContain('From: Test User');
    });

    test('builds HTML email with proper escaping', () => {
      const malicious = '<script>alert("xss")</script>';
      const result = buildContactEmailHtml({name: malicious, ...});
      expect(result).not.toContain('<script>');
    });

    test('formats date with LA timezone', () => {});
    test('preserves line breaks in messages', () => {});
    test('generates valid mailto link for reply', () => {});
    test('includes café signature in reply template', () => {});
    test('applies dark mode styles correctly', () => {});
  });

  describe('Integration', () => {
    test('sends email via Resend when configured', async () => {});
    test('logs warning when Resend not configured', async () => {});
    test('creates Sanity document even if email fails', async () => {});
    test('logs email send success with ID', async () => {});
  });
});
```

**Estimated Test Files:** 5 files, ~40-50 test cases
**Impact:** HIGH - Prevents security vulnerabilities, data breaches, spam

---

#### 2. Security Utilities (`app/lib/*.ts`)

**Files to Test:**
- `app/lib/sanitize.ts` (174 lines)
- `app/lib/rateLimit.ts` (109 lines)
- `app/lib/csrf.ts` (95 lines)

##### `sanitize.ts`
```typescript
describe('sanitizeText', () => {
  test('removes HTML tags', () => {
    expect(sanitizeText('<script>alert(1)</script>')).toBe('');
    expect(sanitizeText('Hello <b>world</b>')).toBe('Hello world');
  });

  test('removes javascript: protocol', () => {
    expect(sanitizeText('javascript:alert(1)')).toBe('alert(1)');
  });

  test('removes event handlers', () => {
    expect(sanitizeText('onload=alert(1)')).toBe('alert(1)');
  });

  test('removes null bytes', () => {
    expect(sanitizeText('test\0null')).toBe('test null');
  });

  test('normalizes whitespace', () => {
    expect(sanitizeText('test   multiple   spaces')).toBe('test multiple spaces');
  });
});

describe('sanitizeMultilineText', () => {
  test('preserves newlines while removing HTML', () => {
    const input = 'Line 1\n<script>bad</script>\nLine 2';
    expect(sanitizeMultilineText(input)).toBe('Line 1\n\nLine 2');
  });

  test('normalizes line endings (CRLF to LF)', () => {});
});

describe('sanitizeEmail', () => {
  test('converts to lowercase', () => {
    expect(sanitizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
  });

  test('removes invalid characters', () => {
    expect(sanitizeEmail('test<>@example.com')).toBe('test@example.com');
  });

  test('allows valid email characters (+, -, _, .)', () => {
    expect(sanitizeEmail('test+tag@example.com')).toBe('test+tag@example.com');
  });
});

describe('sanitizeUrl', () => {
  test('accepts valid http URLs', () => {
    expect(sanitizeUrl('http://example.com')).toBe('http://example.com/');
  });

  test('accepts valid https URLs', () => {
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
  });

  test('rejects javascript: protocol', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBeNull();
  });

  test('rejects URLs without protocol', () => {
    expect(sanitizeUrl('example.com')).toBeNull();
  });

  test('rejects data: URLs', () => {
    expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
  });
});

describe('sanitizeObject', () => {
  test('recursively sanitizes nested objects', () => {});
  test('handles email fields specially', () => {});
  test('handles phone fields specially', () => {});
  test('sanitizes arrays of strings', () => {});
  test('preserves non-string values', () => {});
});
```

##### `rateLimit.ts`
```typescript
describe('checkRateLimit', () => {
  test('allows first request', () => {
    const req = new Request('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'x-forwarded-for': '1.2.3.4' }
    });
    expect(checkRateLimit(req, '/api/test', 5, 60000)).toBeNull();
  });

  test('blocks after maxRequests exceeded', () => {
    // Simulate 6 requests within 1 minute
    const req = new Request(...);
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(req, '/api/test', 5, 60000)).toBeNull();
    }
    const result = checkRateLimit(req, '/api/test', 5, 60000);
    expect(result).not.toBeNull();
    expect(result.status).toBe(429);
  });

  test('resets counter after time window', async () => {
    // Test with very short window (100ms)
    const req = new Request(...);
    checkRateLimit(req, '/api/test', 1, 100);
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(checkRateLimit(req, '/api/test', 1, 100)).toBeNull();
  });

  test('isolates different IPs', () => {});
  test('isolates different endpoints', () => {});
  test('extracts IP from x-forwarded-for', () => {});
  test('extracts IP from x-real-ip', () => {});
  test('includes Retry-After header in 429 response', () => {});
  test('cleans up expired entries when store grows large', () => {});
});
```

##### `csrf.ts`
```typescript
describe('validateOrigin', () => {
  test('allows requests from localhost:3000', () => {});
  test('allows requests from production domain', () => {});
  test('allows Vercel preview deployments', () => {});
  test('blocks requests from unknown origins', () => {});
  test('blocks requests missing origin and referer', () => {});
  test('falls back to referer when origin missing', () => {});
  test('blocks requests with malicious referer', () => {});
  test('returns 403 for blocked requests', () => {});
});
```

**Estimated Test Files:** 3 files, ~35-40 test cases
**Impact:** CRITICAL - Core security layer protecting all API routes

---

### **HIGH PRIORITY** (User-Facing Functionality)

#### 3. Client Components with State Management

##### `app/components/features/CartDrawer.tsx` (298 lines)
```typescript
describe('CartDrawer', () => {
  describe('Rendering', () => {
    test('renders nothing when closed', () => {});
    test('renders overlay and drawer when open', () => {});
    test('shows empty state when cart is empty', () => {});
    test('displays cart items with correct data', () => {});
    test('shows total item count badge', () => {});
    test('calculates subtotal correctly', () => {});
    test('calculates taxes at 8%', () => {});
    test('displays total with taxes', () => {});
  });

  describe('Cart Item Display', () => {
    test('shows item name, quantity, and price', () => {});
    test('displays modifiers as chips', () => {});
    test('shows special notes if present', () => {});
    test('displays item image', () => {});
    test('shows quantity badge on image', () => {});
  });

  describe('Quantity Controls', () => {
    test('decreases quantity when minus clicked', () => {});
    test('increases quantity when plus clicked', () => {});
    test('disables minus button when quantity is 1', () => {});
    test('updates total price when quantity changes', () => {});
    test('updates item count badge', () => {});
  });

  describe('Item Management', () => {
    test('removes item when Remove clicked', () => {});
    test('opens edit modal when Edit clicked', () => {});
    test('closes drawer when Edit clicked', () => {});
    test('reopens drawer after closing edit modal', () => {});
  });

  describe('User Interactions', () => {
    test('closes drawer when X button clicked', () => {});
    test('closes drawer when overlay clicked', () => {});
    test('opens drawer when open-cart event fired', () => {});
    test('navigates to menu when "Add More Items" clicked', () => {});
    test('shows alert when Checkout clicked (demo mode)', () => {});
  });

  describe('Animations', () => {
    test('animates drawer sliding in from right', () => {});
    test('fades in overlay', () => {});
    test('animates items with stagger effect', () => {});
  });

  describe('Beta Notice', () => {
    test('displays beta notice about no charging', () => {});
  });
});
```

##### `app/components/features/NewsLetterForm.tsx` (157 lines)
```typescript
describe('NewsletterForm', () => {
  describe('Default Style', () => {
    test('renders email input and submit button', () => {});
    test('shows placeholder text', () => {});
    test('requires email input', () => {});
    test('disables button during submission', () => {});
    test('shows "Subscribing..." text while loading', () => {});
  });

  describe('Inline Style', () => {
    test('renders minimal inline layout', () => {});
    test('applies footer-specific styles', () => {});
  });

  describe('Form Submission', () => {
    test('submits email to /api/subscribe', async () => {
      // Mock fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ ok: true })
        })
      );

      render(<NewsletterForm />);
      const input = screen.getByPlaceholderText(/email/i);
      const button = screen.getByRole('button');

      await userEvent.type(input, 'test@example.com');
      await userEvent.click(button);

      expect(fetch).toHaveBeenCalledWith('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', source: 'homepage' })
      });
    });

    test('includes custom source when provided', async () => {});
  });

  describe('Success States', () => {
    test('shows success message on successful subscription', async () => {});
    test('clears email input after success', async () => {});
    test('shows duplicate message if already subscribed', async () => {});
    test('keeps email in input on duplicate', async () => {});
  });

  describe('Error Handling', () => {
    test('shows error message from API', async () => {});
    test('shows generic error on network failure', async () => {});
    test('resets to idle state for retry', async () => {});
  });

  describe('Focus States', () => {
    test('changes border color on focus', () => {});
    test('resets border color on blur', () => {});
    test('applies shadow on focus (default style)', () => {});
  });
});
```

##### `app/components/features/ContactForm.tsx`
```typescript
describe('ContactForm', () => {
  describe('Form Fields', () => {
    test('renders name, email, subject, message fields', () => {});
    test('marks all fields as required', () => {});
    test('validates email format', () => {});
  });

  describe('Submission', () => {
    test('submits data to /api/contact', async () => {});
    test('shows loading state during submission', () => {});
    test('disables submit button while loading', () => {});
  });

  describe('Success/Error States', () => {
    test('shows success message on successful send', () => {});
    test('clears form after success', () => {});
    test('shows error message on failure', () => {});
    test('preserves form data on error', () => {});
  });
});
```

##### `app/components/providers/CartProvider.tsx`
```typescript
describe('CartProvider', () => {
  test('provides empty cart initially', () => {});
  test('adds items to cart', () => {});
  test('removes items from cart', () => {});
  test('updates item quantity', () => {});
  test('persists cart to localStorage', () => {});
  test('restores cart from localStorage on mount', () => {});
  test('opens and closes cart drawer', () => {});
  test('calculates cart totals correctly', () => {});
});
```

**Estimated Test Files:** 4 files, ~50-60 test cases
**Impact:** HIGH - Directly affects user experience and business goals

---

#### 4. UI Components

##### `app/components/ui/PasswordGate.tsx`
```typescript
describe('PasswordGate', () => {
  test('shows password form when not authenticated', () => {});
  test('hides content when not authenticated', () => {});
  test('submits password to /api/auth/verify', () => {});
  test('shows children when authenticated', () => {});
  test('persists auth state to session storage', () => {});
  test('shows error for incorrect password', () => {});
  test('clears error on new input', () => {});
});
```

##### `app/components/ui/ConsentBanner.tsx`
```typescript
describe('ConsentBanner', () => {
  test('shows banner on first visit', () => {});
  test('hides banner after acceptance', () => {});
  test('persists acceptance to localStorage', () => {});
  test('loads analytics after acceptance', () => {});
  test('respects prior acceptance', () => {});
});
```

**Estimated Test Files:** 2 files, ~10-12 test cases

---

### **MEDIUM PRIORITY** (Integration & CMS)

#### 5. Sanity CMS Integration

**Files to Test:**
- `sanity/lib/client.ts`
- `sanity/lib/writeClient.ts`
- `sanity/lib/image.ts`

```typescript
describe('Sanity Client', () => {
  test('creates read client with CDN enabled', () => {});
  test('includes correct project ID and dataset', () => {});
  test('handles missing environment variables', () => {});
});

describe('Sanity Write Client', () => {
  test('creates write client with token', () => {});
  test('disables CDN for write operations', () => {});
  test('handles missing write token', () => {});
});

describe('Image URL Builder', () => {
  test('generates correct image URLs', () => {});
  test('applies width/height parameters', () => {});
  test('handles auto format', () => {});
});
```

**Estimated Test Files:** 3 files, ~10 test cases

---

#### 6. Accessibility Widget

##### `app/components/features/Accessibility/AccessibilityWidget.tsx`
```typescript
describe('AccessibilityWidget', () => {
  test('renders toggle button', () => {});
  test('opens settings panel on click', () => {});
  test('adjusts font size', () => {});
  test('toggles high contrast mode', () => {});
  test('toggles reduced motion', () => {});
  test('persists settings to localStorage', () => {});
  test('applies settings on mount', () => {});
  test('resets to defaults', () => {});
});
```

**Estimated Test Files:** 1 file, ~8 test cases

---

### **LOW PRIORITY** (Static & Display)

#### 7. Layout Components

- `SiteHeader.tsx` - Test navigation, mobile menu, scroll behavior
- `SiteFooter.tsx` - Test links, business info display
- `ScrollReveal.tsx` - Test intersection observer logic

#### 8. SEO Components

- `LocalBusinessJsonLd.tsx` - Test JSON-LD schema generation
- `MenuJsonLd.tsx` - Test menu schema generation
- `FAQJsonLd.tsx` - Test FAQ schema generation

**Estimated Test Files:** 6 files, ~20 test cases

---

## E2E Testing Priority (Playwright)

### Critical User Flows

```typescript
// tests/e2e/newsletter-subscription.spec.ts
test('user can subscribe to newsletter from homepage', async ({ page }) => {
  await page.goto('/');
  await page.fill('[placeholder*="email"]', 'test@example.com');
  await page.click('text=Subscribe');
  await expect(page.locator('text=Thanks! You\'re subscribed')).toBeVisible();
});

// tests/e2e/contact-form.spec.ts
test('user can submit contact form', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="subject"]', 'Test Subject');
  await page.fill('[name="message"]', 'Test message content');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Message sent')).toBeVisible();
});

// tests/e2e/cart-flow.spec.ts
test('user can add items to cart and checkout', async ({ page }) => {
  await page.goto('/menu');
  await page.click('text=Espresso'); // Click first item
  await page.click('text=Add to Cart');
  await page.click('[aria-label="Shopping cart"]');
  await expect(page.locator('text=Your Order')).toBeVisible();
  await expect(page.locator('text=Espresso')).toBeVisible();
});

// tests/e2e/navigation.spec.ts
test('mobile navigation works correctly', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.click('[aria-label="Menu"]'); // Hamburger
  await expect(page.locator('nav >> text=Menu')).toBeVisible();
  await page.click('nav >> text=Menu');
  await expect(page).toHaveURL('/menu');
});
```

**Estimated E2E Tests:** 8-10 critical flows

---

## Testing Metrics & Goals

### Coverage Targets

| Category | Target Coverage | Priority |
|----------|----------------|----------|
| API Routes | 90%+ | CRITICAL |
| Security Utils | 95%+ | CRITICAL |
| Forms & Cart | 80%+ | HIGH |
| UI Components | 70%+ | HIGH |
| Layout Components | 60%+ | MEDIUM |
| SEO Components | 50%+ | LOW |

### Test Suite Size Estimate

- **Unit Tests:** ~150-180 test cases
- **Integration Tests:** ~30-40 test cases
- **E2E Tests:** ~8-10 critical flows
- **Total:** ~190-230 tests

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
1. Install Vitest + React Testing Library
2. Configure test environment (vitest.config.ts)
3. Set up MSW for API mocking
4. Create test utilities and helpers

### Phase 2: Critical Security (Week 2-3)
1. Test all security utilities (sanitize, rateLimit, csrf)
2. Test API routes with security focus
3. Achieve 90%+ coverage on critical paths

### Phase 3: User Functionality (Week 4-5)
1. Test cart system (provider + drawer)
2. Test forms (newsletter, contact, apply)
3. Test modal interactions
4. Achieve 80%+ coverage on user-facing features

### Phase 4: Integration & E2E (Week 6)
1. Set up Playwright
2. Write critical user flow tests
3. Configure CI/CD pipeline

### Phase 5: Polish (Week 7)
1. Test remaining UI components
2. Test accessibility features
3. Test SEO components
4. Achieve target coverage metrics

---

## Specific Test Scenarios to Prioritize

### Security Testing

**Injection Prevention:**
- XSS via form inputs (`<script>alert(1)</script>`)
- SQL-like injection patterns (`'; DROP TABLE--`)
- HTML entity encoding bypass (`&lt;script&gt;`)
- Unicode bypass attempts (`<script\x20>`)
- Null byte injection (`test\x00malicious`)

**CSRF Protection:**
- Missing Origin header
- Mismatched Origin header
- Malicious Referer
- Requests from non-browser clients

**Rate Limiting:**
- Burst requests (10 req/sec)
- Distributed attacks (different IPs)
- Time window reset behavior
- Memory cleanup under load

### Business Logic Testing

**Newsletter Subscription:**
- Duplicate detection (exact match)
- Duplicate detection (case variations: TEST@example.com vs test@example.com)
- Token assignment for existing subscribers
- Source tracking accuracy

**Contact Form:**
- Email delivery success
- Email delivery failure handling
- Sanity document creation even if email fails
- HTML template injection prevention
- Reply-to functionality

**Cart System:**
- Quantity limits
- Price calculation accuracy
- Modifier price additions
- Tax calculation (8%)
- LocalStorage persistence
- Multi-device sync (future)

### Edge Cases

**Input Validation:**
- Empty strings
- Whitespace-only input
- Maximum length boundaries (254 chars for email)
- Unicode characters (emoji, accents)
- Special characters in names (O'Brien, Müller)
- Multiple spaces in text

**State Management:**
- Cart with 50+ items (performance)
- Rapid add/remove operations
- Browser back button behavior
- Session restoration
- LocalStorage quota exceeded

**Accessibility:**
- Keyboard navigation
- Screen reader compatibility
- Focus management in modals
- ARIA attributes
- Color contrast

---

## Tools & Libraries Recommendation

### Unit/Integration Testing
```bash
npm install -D vitest @vitest/ui @testing-library/react \
  @testing-library/jest-dom @testing-library/user-event \
  jsdom msw
```

### E2E Testing
```bash
npm install -D @playwright/test
npx playwright install
```

### Coverage Reporting
```bash
npm install -D @vitest/coverage-v8
```

### Mocking & Fixtures
- **MSW (Mock Service Worker):** API mocking
- **next-router-mock:** Next.js router mocking
- **Test fixtures:** Sanity CMS mock data

---

## Risks of Not Testing

### Security Risks
- **Undetected XSS vulnerabilities** → User data theft
- **CSRF bypass** → Unauthorized actions
- **Rate limit failures** → API abuse, server costs
- **Injection attacks** → Database compromise

### Business Risks
- **Cart bugs** → Lost sales, user frustration
- **Form failures** → Lost leads, poor UX
- **Data integrity issues** → Invalid subscriptions, duplicate entries
- **Email delivery failures** → Missed customer inquiries

### Development Risks
- **Regression bugs** → Features break during refactoring
- **Difficult debugging** → No test-driven reproduction
- **Slow feature development** → Manual testing overhead
- **Team scaling issues** → New developers introduce bugs

---

## Conclusion

The Notebook Café codebase has **zero test coverage** despite having:
- 5 API routes with complex security logic
- 36+ React components with state management
- Multiple user-facing forms
- Cart functionality with persistence
- Critical security utilities

### Immediate Action Items

1. **This Week:** Set up Vitest + React Testing Library
2. **Week 2-3:** Test security layer (sanitize, CSRF, rate limit, API routes)
3. **Week 4-5:** Test user functionality (cart, forms, modals)
4. **Week 6:** Add E2E tests for critical flows
5. **Week 7:** Achieve 80%+ overall coverage

### ROI

- **Prevent security breaches** (CRITICAL)
- **Catch bugs before production** (saves 10x development time)
- **Enable confident refactoring** (faster feature development)
- **Improve code quality** (testable code = better architecture)
- **Reduce manual QA time** (automated regression testing)

**Estimated Effort:** 6-7 weeks for comprehensive coverage
**Estimated Test Count:** 190-230 tests
**Target Coverage:** 80%+ overall, 90%+ on critical paths
