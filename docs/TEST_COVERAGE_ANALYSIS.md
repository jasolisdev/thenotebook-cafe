# Test Coverage Analysis - The Notebook Café

Last Updated: 2025-12-23

---

## Snapshot

- **Unit tests:** 46 files (Vitest)
- **E2E tests:** 6 specs (Playwright)
- **Coverage reports:** generated via `npm run test:coverage`
- **CI:** GitHub Actions runs lint, unit (coverage), and e2e tests

> Coverage percentages are not recorded here. Run `npm run test:coverage` to generate current metrics.

---

## Unit Test Coverage Areas

- API routes: subscribe, unsubscribe, contact, apply, auth
- Utilities: csrf, rateLimit, sanitize, logger, virtualBaristaResponder
- Layout components: header, footer, shell, transitions
- UI components: buttons, banners, reveal animations, consent, analytics loader
- Feature components: cart drawer, product modal, menu sections, newsletter
- SEO JSON-LD components

---

## E2E Coverage Areas

- Navigation behavior and header interactions
- Newsletter subscription flow
- Cart flow interactions
- Contact form submission
- Accessibility behaviors
- Sticky/scroll-based layout behaviors

---

## Gaps / Follow-ups

- Sanity data fetching paths (settings, content) not covered with integration tests
- Menu JSON-LD not wired into menu page yet
- Visual regression snapshots not configured
- Performance testing not automated
