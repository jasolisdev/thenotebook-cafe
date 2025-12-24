# Development Guide
**The Notebook Café - Local Development Setup**

Last Updated: 2025-12-24
Project: Next.js 16 + Sanity CMS Web Application

---

## Prerequisites

### Required
- **Node.js:** 20.x or later
- **npm:** 10.x or later
- **Git:** Version control

### Recommended
- **VS Code** or similar editor
- **Modern browser** (Chrome, Firefox, Safari, Edge)

---

## Installation

### 1. Install Dependencies
```bash
npm install
```

---

## Environment Setup

Create `.env.local` in the project root:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token

# Email (Resend)
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_RECIPIENT=you@example.com
CAREERS_EMAIL_RECIPIENT=you@example.com

# Optional: Password Protection
SITE_PASSWORD=

# Optional: Business coordinates override
NEXT_PUBLIC_BUSINESS_LAT=
NEXT_PUBLIC_BUSINESS_LNG=
```

**Sanity credentials:**
1. Visit `https://sanity.io/manage`
2. Select your project
3. Copy Project ID + dataset
4. Create a write token for `SANITY_WRITE_TOKEN`

---

## Development Commands

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm start             # Start prod server locally
npm run lint          # ESLint
npm run test          # Vitest unit tests
npm run test:coverage # Unit tests with coverage
npm run test:e2e      # Playwright E2E tests
npm run test:all      # Unit + E2E
```

Dev server:
- App: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

---

## Project Structure (Key Directories)

| Directory | Purpose |
|-----------|---------|
| `app/` | App Router pages, components, API routes |
| `app/components/` | Shared UI, layout, feature components |
| `app/api/` | Serverless API routes |
| `app/styles/` | Modular CSS files |
| `sanity/` | CMS config and schemas |
| `public/` | Static assets |
| `tests/` | Unit + E2E tests |

---

## Common Workflows

### Add a Page
Create `app/<route>/page.tsx` and optionally `app/styles/pages/<route>.css`.

### Add an API Route
Create `app/api/<route>/route.ts` using `GET`/`POST` handlers.

### Add a Component
Add to `app/components/<category>/`:
- `layout/` for global wrappers
- `ui/` for reusable primitives
- `features/` for feature sections

### Add/Update a Schema
Edit or add a file in `sanity/schemaTypes/` and update the registry in `sanity/schemaTypes/index.ts`.

---

## Testing Notes

- Unit tests live in `tests/unit/` and use Vitest + Testing Library.
- E2E tests live in `tests/e2e/` and run in Playwright.
- MSW is configured in `tests/utils/` for API mocks.
- Coverage thresholds are optional; set `VITEST_STRICT_COVERAGE=1` to enforce.

---

## Performance Optimizations

The project has been optimized for fast page loads (FCP < 1.5s):

### Font Strategy
- **Playfair Display:** Converted to `.woff2` format (64% smaller)
- **Font Display:** Using `font-display: optional` for instant text rendering
- **Lazy Loading:** OpenDyslexic font only loads when accessibility widget enables it

### CSS Strategy
- **Consolidated:** All component/layout CSS merged into `globals.css` (7 requests → 1)
- **Page-Specific:** Only load page-specific CSS when needed
- **See:** `docs/CSS_ORGANIZATION.md` for details

### Image Strategy
- **Hero Images:** Use `fetchPriority="high"` for above-the-fold content
- **Next.js Image:** All images optimized automatically via `next/image`

### Performance Checklist
- ✅ All fonts converted to `.woff2` (except Torus which is .otf)
- ✅ CSS consolidated to reduce HTTP requests
- ✅ Unused fonts removed (Alpino removed, OpenDyslexic lazy-loaded)
- ✅ Critical images prioritized with `fetchPriority`
- ✅ Accessibility features maintained via lazy loading

---

## Useful Entry Points

- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage
- `app/menu/page.tsx` - Menu page
- `app/story/page.tsx` - Story page
- `app/careers/page.tsx` - Careers page
- `app/contact/page.tsx` - Contact page
- `sanity/sanity.config.ts` - CMS configuration

---

## Performance Testing

Run Lighthouse or Vercel Analytics to verify:
- **Target FCP:** < 1.5s
- **Target Score:** > 90
- **Font Load:** < 500ms for critical fonts
