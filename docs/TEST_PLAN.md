# Test Strategy & Plan - The Notebook Café

Last Updated: 2025-12-23

---

## Current Test Stack

- **Unit/Integration:** Vitest + React Testing Library
- **E2E:** Playwright
- **Mocking:** MSW
- **CI:** GitHub Actions (lint, unit, e2e)

---

## Current Coverage Scope

### Unit Tests (examples)
- API routes: subscribe, unsubscribe, contact, apply, auth
- Utilities: csrf, rateLimit, sanitize, logger, virtualBaristaResponder
- Components: layout, UI, feature sections, providers, SEO JSON-LD

### E2E Tests (examples)
- Navigation flows
- Newsletter subscription flow
- Cart flow interactions
- Contact form submission
- Accessibility checks
- Atmosphere/hero visual behaviors

---

## How to Run

```bash
npm run test          # Unit tests
npm run test:coverage # Unit tests with coverage
npm run test:e2e      # E2E tests
npm run test:all      # Unit + E2E
```

Optional strict coverage thresholds:
```bash
VITEST_STRICT_COVERAGE=1 npm run test:coverage
```

---

## Recommended Next Additions

1. **Sanity integration tests** for settings/content queries.
2. **Menu JSON-LD tests** once wired into the menu page.
3. **Form edge cases** (file validation paths in careers endpoints).
4. **Visual regression** for key landing sections.

---

## Test File Locations

- `tests/unit/` — unit and component tests
- `tests/e2e/` — Playwright specs
- `tests/utils/` — MSW setup and helpers
