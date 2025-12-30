# Testing Guide

**The Notebook Cafe - Test Strategy & Coverage**

Last Updated: December 2025

---

## Test Stack

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit & integration tests |
| **React Testing Library** | Component testing |
| **Playwright** | E2E browser tests |
| **MSW** | API mocking |
| **GitHub Actions** | CI pipeline |

---

## Running Tests

```bash
npm run test          # Unit tests
npm run test:ui       # Vitest UI
npm run test:coverage # With coverage report
npm run test:e2e      # E2E tests
npm run test:e2e:ui   # Playwright UI
npm run test:all      # Unit + E2E
```

Optional strict coverage:
```bash
VITEST_STRICT_COVERAGE=1 npm run test:coverage
```

---

## Test File Locations

```
tests/
├── unit/       # Vitest unit & component tests
├── e2e/        # Playwright specs
└── utils/      # MSW setup and helpers
```

---

## Coverage Areas

### Unit Tests

- **API Routes:** subscribe, unsubscribe, contact, apply, auth
- **Utilities:** csrf, rateLimit, sanitize, logger
- **Layout:** header, footer, shell, transitions
- **UI:** buttons, banners, reveals, consent, analytics
- **Features:** cart drawer, product modal, menu sections, newsletter
- **SEO:** JSON-LD components

### E2E Tests

- Navigation flows and header interactions
- Newsletter subscription flow
- Cart flow interactions
- Contact form submission
- Accessibility behaviors
- Sticky/scroll-based layout

---

## CI Pipeline

GitHub Actions (`.github/workflows/test.yml`) runs:
1. ESLint
2. Unit tests with coverage
3. E2E tests

---

## Adding Tests

### Unit Test Pattern

```typescript
// tests/unit/example.test.ts
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('renders correctly', () => {
    // test implementation
  });
});
```

### E2E Test Pattern

```typescript
// tests/e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('navigation works', async ({ page }) => {
  await page.goto('/');
  // assertions
});
```

---

## Known Gaps

- Visual regression snapshots not configured
- Performance testing not automated
- Menu JSON-LD not wired into menu page yet
