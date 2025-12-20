# Test Implementation Plan - The Notebook Café

**Project:** The Notebook Café Website
**Framework:** Next.js 16 + React 19
**Current Coverage:** 0%
**Target Coverage:** 80%+ overall, 90%+ on critical paths
**Timeline:** 7 weeks

---

## 📋 Executive Summary

This document outlines the phased implementation plan for achieving comprehensive test coverage across The Notebook Café codebase. The plan prioritizes critical security and business logic while building a robust testing infrastructure.

### Success Metrics
- ✅ 95%+ coverage on security utilities
- ✅ 90%+ coverage on API routes
- ✅ 80%+ coverage on cart & forms
- ✅ 70%+ coverage on UI components
- ✅ 8-10 E2E critical flows
- ✅ CI/CD pipeline with automated testing
- ✅ 190-230 total test cases

---

## 🎯 Phase 1: Foundation (Week 1)

**Goal:** Establish testing infrastructure and tooling

### Tasks

#### 1.1 Install Testing Dependencies
```bash
npm install -D vitest @vitest/ui @vitest/coverage-v8
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event jsdom
npm install -D @playwright/test
npm install -D msw
```

**Dependencies:**
- `vitest` - Fast unit/integration testing (Vite-based)
- `@vitest/ui` - Visual test UI
- `@vitest/coverage-v8` - Code coverage reporting
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment for Node
- `@playwright/test` - E2E testing framework
- `msw` - API mocking (Mock Service Worker)

#### 1.2 Configure Vitest

**File:** `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['app/**/*.{ts,tsx}'],
      exclude: [
        'app/**/*.test.{ts,tsx}',
        'app/**/*.spec.{ts,tsx}',
        'app/types/**',
        'app/globals.css',
        'app/layout.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

#### 1.3 Create Test Setup File

**File:** `tests/setup.ts`
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'test';
process.env.SANITY_WRITE_TOKEN = 'test-token';
```

#### 1.4 Configure Playwright

**File:** `playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### 1.5 Create Test Utilities

**File:** `tests/utils/test-utils.tsx`
```typescript
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { CartProvider } from '@/app/components/providers/CartProvider';

// Custom render with providers
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

**File:** `tests/utils/msw-handlers.ts`
```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock newsletter subscription
  http.post('/api/subscribe', () => {
    return HttpResponse.json({ ok: true, duplicate: false });
  }),

  // Mock contact form
  http.post('/api/contact', () => {
    return HttpResponse.json({ ok: true, id: 'test-id' });
  }),

  // Mock Sanity fetch
  http.get('https://*.apicdn.sanity.io/*', () => {
    return HttpResponse.json({ result: [] });
  }),
];
```

#### 1.6 Update package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:coverage && npm run test:e2e"
  }
}
```

#### 1.7 Create Directory Structure

```bash
mkdir -p tests/unit/lib
mkdir -p tests/unit/api
mkdir -p tests/unit/components/ui
mkdir -p tests/unit/components/features
mkdir -p tests/unit/components/providers
mkdir -p tests/integration
mkdir -p tests/e2e
mkdir -p tests/utils
mkdir -p tests/fixtures
```

**Deliverables:**
- ✅ Testing dependencies installed
- ✅ Vitest configured with coverage thresholds
- ✅ Playwright configured for E2E
- ✅ Test utilities and helpers created
- ✅ MSW handlers for API mocking
- ✅ Test directory structure established
- ✅ npm scripts added

**Estimated Time:** 3-5 hours

---

## 🔒 Phase 2: Critical Security Testing (Week 2-3)

**Goal:** Achieve 95%+ coverage on security utilities and 90%+ on API routes

### Week 2: Security Utilities

#### 2.1 Test `app/lib/sanitize.ts` (174 lines)

**File:** `tests/unit/lib/sanitize.test.ts`

**Test Cases (25):**
```typescript
describe('sanitizeText', () => {
  test('removes HTML tags');
  test('removes script tags');
  test('removes javascript: protocol');
  test('removes event handlers (onload, onclick, etc.)');
  test('removes null bytes');
  test('normalizes whitespace');
  test('trims leading/trailing spaces');
  test('handles empty strings');
  test('handles null/undefined');
});

describe('sanitizeMultilineText', () => {
  test('preserves newlines');
  test('removes HTML while keeping line breaks');
  test('normalizes CRLF to LF');
  test('normalizes CR to LF');
  test('removes script injection in multiline');
});

describe('sanitizeEmail', () => {
  test('converts to lowercase');
  test('removes invalid characters');
  test('allows valid email characters (+, -, _, .)');
  test('trims whitespace');
});

describe('sanitizeUrl', () => {
  test('accepts valid http URLs');
  test('accepts valid https URLs');
  test('rejects javascript: protocol');
  test('rejects data: URLs');
  test('rejects URLs without protocol');
  test('rejects file: protocol');
});

describe('sanitizeObject', () => {
  test('recursively sanitizes nested objects');
  test('handles email fields specially');
});
```

**Target Coverage:** 95%+

#### 2.2 Test `app/lib/rateLimit.ts` (109 lines)

**File:** `tests/unit/lib/rateLimit.test.ts`

**Test Cases (12):**
```typescript
describe('checkRateLimit', () => {
  test('allows first request');
  test('allows requests within limit');
  test('blocks requests after limit exceeded');
  test('returns 429 status with Retry-After header');
  test('resets counter after time window expires');
  test('isolates different IPs');
  test('isolates different endpoints');
  test('extracts IP from x-forwarded-for');
  test('extracts IP from x-real-ip');
  test('handles comma-separated x-forwarded-for');
  test('cleans up expired entries when store grows');
  test('handles unknown IP fallback');
});
```

**Target Coverage:** 95%+

#### 2.3 Test `app/lib/csrf.ts` (95 lines)

**File:** `tests/unit/lib/csrf.test.ts`

**Test Cases (10):**
```typescript
describe('validateOrigin', () => {
  test('allows localhost:3000');
  test('allows production domain');
  test('allows Vercel preview deployments (*.vercel.app)');
  test('blocks unknown origins');
  test('blocks requests missing both origin and referer');
  test('falls back to referer when origin missing');
  test('validates referer URL format');
  test('blocks malicious referer');
  test('returns 403 for blocked requests');
  test('includes Cache-Control: no-store header');
});
```

**Target Coverage:** 95%+

**Deliverables (Week 2):**
- ✅ 47 security utility test cases
- ✅ 95%+ coverage on sanitize.ts
- ✅ 95%+ coverage on rateLimit.ts
- ✅ 95%+ coverage on csrf.ts

**Estimated Time:** 8-10 hours

### Week 3: API Routes

#### 2.4 Test `app/api/subscribe/route.ts` (90 lines)

**File:** `tests/unit/api/subscribe.test.ts`

**Test Cases (18):**
```typescript
describe('POST /api/subscribe', () => {
  describe('Security', () => {
    test('blocks requests from invalid origins');
    test('enforces rate limiting (5 requests per minute)');
    test('sanitizes email input');
    test('returns 403 for CSRF violations');
    test('returns 429 for rate limit violations');
  });

  describe('Validation', () => {
    test('rejects emails longer than 254 characters');
    test('rejects invalid email format');
    test('rejects emails with dangerous characters');
    test('rejects non-string email input');
    test('normalizes email to lowercase');
    test('limits source field to 64 characters');
  });

  describe('Business Logic', () => {
    test('detects duplicate subscriptions (case-insensitive)');
    test('adds unsubscribe token to existing subscribers');
    test('creates new subscriber with correct schema');
    test('returns duplicate: true for existing emails');
  });

  describe('Error Handling', () => {
    test('handles Sanity client failures');
    test('handles malformed JSON');
    test('includes Cache-Control headers');
  });
});
```

**Target Coverage:** 90%+

#### 2.5 Test `app/api/contact/route.ts` (326 lines)

**File:** `tests/unit/api/contact.test.ts`

**Test Cases (22):**
```typescript
describe('POST /api/contact', () => {
  describe('Security', () => {
    test('blocks requests from invalid origins');
    test('enforces rate limiting (3 requests per minute)');
    test('sanitizes all input fields');
    test('escapes HTML in email template');
    test('prevents XSS in email body');
  });

  describe('Validation', () => {
    test('requires all fields (name, email, subject, message)');
    test('limits name to 120 characters');
    test('limits subject to 120 characters');
    test('limits message to 5000 characters');
    test('validates email format');
  });

  describe('Email Generation', () => {
    test('builds plain text email correctly');
    test('builds HTML email with proper escaping');
    test('formats date with LA timezone');
    test('preserves line breaks in message');
    test('generates valid mailto link for reply');
    test('includes café signature in reply');
  });

  describe('Integration', () => {
    test('sends email via Resend when configured');
    test('logs warning when Resend not configured');
    test('creates Sanity document even if email fails');
    test('logs email send success with ID');
    test('handles Resend API errors gracefully');
  });

  describe('Error Handling', () => {
    test('handles malformed JSON');
  });
});
```

**Target Coverage:** 90%+

#### 2.6 Test Other API Routes

**Files:**
- `tests/unit/api/unsubscribe.test.ts` (8 cases)
- `tests/unit/api/apply.test.ts` (12 cases)
- `tests/unit/api/auth-verify.test.ts` (10 cases)

**Deliverables (Week 3):**
- ✅ 70 API route test cases
- ✅ 90%+ coverage on /api/subscribe
- ✅ 90%+ coverage on /api/contact
- ✅ 85%+ coverage on other API routes

**Estimated Time:** 12-15 hours

**Phase 2 Total:**
- ✅ 117 test cases
- ✅ 95%+ security utility coverage
- ✅ 90%+ API route coverage
- ✅ ~20-25 hours total

---

## 🛒 Phase 3: User Functionality Testing (Week 4-5)

**Goal:** Achieve 80%+ coverage on cart, forms, and modals

### Week 4: Cart System

#### 3.1 Test `app/components/providers/CartProvider.tsx`

**File:** `tests/unit/components/providers/CartProvider.test.tsx`

**Test Cases (15):**
```typescript
describe('CartProvider', () => {
  test('provides empty cart initially');
  test('adds items to cart');
  test('removes items from cart');
  test('updates item quantity');
  test('calculates cart totals correctly');
  test('persists cart to localStorage');
  test('restores cart from localStorage on mount');
  test('opens cart drawer');
  test('closes cart drawer');
  test('clears entire cart');
  test('prevents negative quantities');
  test('handles duplicate cart items');
  test('generates unique cartId for items');
  test('calculates totalPrice with modifiers');
  test('syncs cart state across components');
});
```

#### 3.2 Test `app/components/features/CartDrawer.tsx` (298 lines)

**File:** `tests/unit/components/features/CartDrawer.test.tsx`

**Test Cases (22):**
```typescript
describe('CartDrawer', () => {
  describe('Rendering', () => {
    test('renders nothing when closed');
    test('renders overlay and drawer when open');
    test('shows empty state with correct messaging');
    test('displays cart items with correct data');
    test('shows total item count badge');
    test('calculates subtotal correctly');
    test('calculates 8% tax');
    test('displays total with taxes');
  });

  describe('Cart Item Display', () => {
    test('shows item name, quantity, and price');
    test('displays modifiers as chips');
    test('shows special notes if present');
    test('displays item image');
    test('shows quantity badge on image');
  });

  describe('Quantity Controls', () => {
    test('decreases quantity when minus clicked');
    test('increases quantity when plus clicked');
    test('disables minus when quantity is 1');
    test('updates total when quantity changes');
  });

  describe('User Interactions', () => {
    test('closes drawer when X clicked');
    test('closes drawer when overlay clicked');
    test('opens drawer on open-cart event');
    test('navigates to menu when "Add More Items" clicked');
    test('shows alert when Checkout clicked');
  });
});
```

#### 3.3 Test `app/components/features/ProductModal.tsx`

**File:** `tests/unit/components/features/ProductModal.test.tsx`

**Test Cases (16):**
```typescript
describe('ProductModal', () => {
  test('renders product details correctly');
  test('displays product image');
  test('shows modifier options');
  test('allows selecting size modifier');
  test('allows selecting milk type modifier');
  test('allows entering special instructions');
  test('increases/decreases quantity');
  test('calculates price with modifiers');
  test('adds item to cart');
  test('updates existing cart item in edit mode');
  test('closes modal on close button click');
  test('closes modal on overlay click');
  test('disables Add button when processing');
  test('shows correct button text (Add/Update)');
  test('validates required modifiers');
  test('prevents negative quantities');
});
```

**Deliverables (Week 4):**
- ✅ 53 cart system test cases
- ✅ 80%+ coverage on CartProvider
- ✅ 80%+ coverage on CartDrawer
- ✅ 80%+ coverage on ProductModal

**Estimated Time:** 10-12 hours

### Week 5: Forms

#### 3.4 Test `app/components/features/NewsLetterForm.tsx` (157 lines)

**File:** `tests/unit/components/features/NewsLetterForm.test.tsx`

**Test Cases (18):**
```typescript
describe('NewsletterForm', () => {
  describe('Default Style', () => {
    test('renders email input and submit button');
    test('shows placeholder text');
    test('requires email input');
    test('disables button during submission');
    test('shows loading text while submitting');
  });

  describe('Inline Style', () => {
    test('renders minimal inline layout');
    test('applies footer-specific styles');
  });

  describe('Form Submission', () => {
    test('submits email to /api/subscribe');
    test('includes source parameter');
    test('sends correct headers');
  });

  describe('Success States', () => {
    test('shows success message on subscription');
    test('clears email input after success');
    test('shows duplicate message if already subscribed');
    test('keeps email visible on duplicate');
  });

  describe('Error Handling', () => {
    test('shows API error message');
    test('shows network error message');
    test('allows retry after error');
  });

  describe('Focus States', () => {
    test('changes border on focus/blur');
  });
});
```

#### 3.5 Test `app/components/features/ContactForm.tsx`

**File:** `tests/unit/components/features/ContactForm.test.tsx`

**Test Cases (14):**
```typescript
describe('ContactForm', () => {
  test('renders all form fields');
  test('requires all fields');
  test('validates email format');
  test('submits data to /api/contact');
  test('shows loading state during submission');
  test('disables submit button while loading');
  test('shows success message on send');
  test('clears form after success');
  test('shows error message on failure');
  test('preserves form data on error');
  test('handles network errors');
  test('validates field lengths');
  test('sanitizes input before submission');
  test('handles rate limit errors');
});
```

**Deliverables (Week 5):**
- ✅ 32 form test cases
- ✅ 80%+ coverage on NewsLetterForm
- ✅ 80%+ coverage on ContactForm

**Estimated Time:** 8-10 hours

**Phase 3 Total:**
- ✅ 85 test cases
- ✅ 80%+ coverage on cart & forms
- ✅ ~18-22 hours total

---

## 🔗 Phase 4: Integration & E2E Testing (Week 6)

**Goal:** Implement E2E tests for critical user flows

### 4.1 Newsletter Subscription Flow

**File:** `tests/e2e/newsletter-subscription.spec.ts`

```typescript
test('user subscribes from homepage', async ({ page }) => {
  await page.goto('/');
  await page.fill('[placeholder*="email"]', 'test@example.com');
  await page.click('text=Subscribe');
  await expect(page.locator('text=Thanks! You\'re subscribed')).toBeVisible();
});

test('shows duplicate message for existing subscriber', async ({ page }) => {
  // Subscribe twice
});

test('subscribes from footer', async ({ page }) => {
  // Test footer form
});
```

### 4.2 Contact Form Flow

**File:** `tests/e2e/contact-form.spec.ts`

```typescript
test('user submits contact form successfully', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="subject"]', 'General Inquiry');
  await page.fill('[name="message"]', 'Test message content');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Message sent')).toBeVisible();
});

test('validates required fields', async ({ page }) => {
  // Test validation
});

test('shows error on server failure', async ({ page }) => {
  // Test error state
});
```

### 4.3 Cart & Checkout Flow

**File:** `tests/e2e/cart-flow.spec.ts`

```typescript
test('complete cart flow: add, edit, remove', async ({ page }) => {
  await page.goto('/menu');

  // Add item
  await page.click('text=Espresso');
  await page.click('text=Add to Cart');

  // Open cart
  await page.click('[aria-label="Shopping cart"]');
  await expect(page.locator('text=Your Order')).toBeVisible();

  // Edit quantity
  await page.click('[aria-label="Increase quantity"]');
  await expect(page.locator('text=x2')).toBeVisible();

  // Remove item
  await page.click('text=Remove');
  await expect(page.locator('text=Your bag is empty')).toBeVisible();
});

test('persists cart across page navigation', async ({ page }) => {
  // Test localStorage persistence
});

test('edit cart item customizations', async ({ page }) => {
  // Test edit flow
});
```

### 4.4 Navigation Flow

**File:** `tests/e2e/navigation.spec.ts`

```typescript
test('desktop navigation works', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await page.click('nav >> text=Menu');
  await expect(page).toHaveURL('/menu');
});

test('mobile navigation drawer works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.click('[aria-label="Menu"]');
  await expect(page.locator('nav >> text=Menu')).toBeVisible();
  await page.click('nav >> text=Menu');
  await expect(page).toHaveURL('/menu');
});

test('ESC key closes mobile drawer', async ({ page }) => {
  // Test keyboard navigation
});
```

### 4.5 Accessibility Tests

**File:** `tests/e2e/accessibility.spec.ts`

```typescript
test('accessibility widget adjusts font size', async ({ page }) => {
  await page.goto('/');
  await page.click('[aria-label="Accessibility"]');
  await page.click('text=Increase font size');
  // Verify font size changed
});

test('keyboard navigation works throughout site', async ({ page }) => {
  // Tab through interactive elements
});
```

**Deliverables:**
- ✅ 8-10 E2E test scenarios
- ✅ Critical user flows covered
- ✅ Mobile and desktop tested
- ✅ Accessibility validation

**Estimated Time:** 8-10 hours

---

## 🎨 Phase 5: Polish & Remaining Components (Week 7)

**Goal:** Test remaining UI components and achieve overall coverage targets

### 5.1 UI Components

**Files to Test:**
- `Button.test.tsx` (8 cases)
- `ConsentBanner.test.tsx` (6 cases)
- `PasswordGate.test.tsx` (8 cases)
- `VirtualBarista.test.tsx` (10 cases)
- `AccessibilityWidget.test.tsx` (8 cases)

### 5.2 Layout Components

**Files to Test:**
- `SiteHeader.test.tsx` (10 cases)
- `SiteFooter.test.tsx` (6 cases)

### 5.3 SEO Components

**Files to Test:**
- `LocalBusinessJsonLd.test.tsx` (5 cases)
- `MenuJsonLd.test.tsx` (5 cases)
- `FAQJsonLd.test.tsx` (4 cases)

### 5.4 CI/CD Integration

**File:** `.github/workflows/test.yml`

```yaml
name: Test Suite

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

**Deliverables:**
- ✅ 60 additional test cases
- ✅ 70%+ coverage on UI components
- ✅ 60%+ coverage on layout components
- ✅ CI/CD pipeline configured
- ✅ Overall 80%+ coverage achieved

**Estimated Time:** 10-12 hours

---

## 📊 Final Deliverables

### Test Coverage Summary

| Category | Target | Test Cases |
|----------|--------|------------|
| Security Utils | 95%+ | 47 |
| API Routes | 90%+ | 70 |
| Cart System | 80%+ | 53 |
| Forms | 80%+ | 32 |
| UI Components | 70%+ | 40 |
| Layout | 60%+ | 16 |
| SEO | 50%+ | 14 |
| E2E Flows | - | 10 |
| **TOTAL** | **80%+** | **282** |

### Timeline Summary

| Phase | Duration | Effort | Key Deliverables |
|-------|----------|--------|------------------|
| Phase 1 | Week 1 | 3-5h | Testing infrastructure |
| Phase 2 | Week 2-3 | 20-25h | Security & API tests |
| Phase 3 | Week 4-5 | 18-22h | Cart & form tests |
| Phase 4 | Week 6 | 8-10h | E2E tests |
| Phase 5 | Week 7 | 10-12h | UI tests & CI/CD |
| **TOTAL** | **7 weeks** | **60-75h** | **80%+ coverage** |

### Success Criteria

- ✅ All API routes have 90%+ coverage
- ✅ All security utilities have 95%+ coverage
- ✅ Cart functionality has 80%+ coverage
- ✅ Forms have 80%+ coverage
- ✅ 8-10 critical E2E flows passing
- ✅ CI/CD pipeline running on all PRs
- ✅ Overall codebase has 80%+ coverage
- ✅ Zero high-priority security vulnerabilities
- ✅ Test suite runs in < 2 minutes
- ✅ E2E suite runs in < 5 minutes

---

## 🚀 Getting Started

### Immediate Next Steps

1. **Install dependencies:**
   ```bash
   npm install -D vitest @vitest/ui @vitest/coverage-v8 \
     @testing-library/react @testing-library/jest-dom \
     @testing-library/user-event jsdom @playwright/test msw
   ```

2. **Create configuration files:**
   - `vitest.config.ts`
   - `playwright.config.ts`
   - `tests/setup.ts`

3. **Set up directory structure:**
   ```bash
   mkdir -p tests/{unit/{lib,api,components/{ui,features,providers}},integration,e2e,utils,fixtures}
   ```

4. **Add npm scripts** to package.json

5. **Start with Phase 1** - Complete foundation setup

6. **Begin Phase 2** - Start with security utilities (highest priority)

---

## 📝 Notes

### Testing Philosophy
- **Test behavior, not implementation** - Focus on what users experience
- **Prioritize critical paths** - Security and business logic first
- **Keep tests simple** - One assertion per test when possible
- **Use descriptive names** - Test names should read like specifications
- **Mock external dependencies** - Sanity, Resend, external APIs
- **Test error cases** - Don't just test happy paths

### Maintenance
- Run tests before every commit
- Update tests when adding features
- Review coverage reports weekly
- Refactor tests when refactoring code
- Keep test suite fast (< 2 min for unit tests)

### Resources
- Vitest Docs: https://vitest.dev
- Testing Library: https://testing-library.com
- Playwright: https://playwright.dev
- MSW: https://mswjs.io

---

**Last Updated:** December 19, 2025
**Status:** Ready to implement
**Owner:** Development Team
