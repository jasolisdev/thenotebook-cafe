# Development Guide

**The Notebook Cafe - Local Development Setup**

Last Updated: December 2025

---

## Prerequisites

- **Node.js:** 20.x or later
- **npm:** 10.x or later
- **Git:** Version control

---

## Installation

```bash
npm install
```

---

## Environment Setup

Create `.env.local` in the project root:

```bash
# Email (Resend)
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_RECIPIENT=you@example.com

# Newsletter (Google Apps Script)
GOOGLE_APPS_SCRIPT_URL=your_apps_script_url
NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL=your_google_form_url

# Optional
SITE_PASSWORD=
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

---

## Commands

```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Production build
npm start             # Start production server
npm run lint          # ESLint
npm run test          # Unit tests
npm run test:coverage # Tests with coverage
npm run test:e2e      # E2E tests
npm run test:all      # All tests
```

---

## Project Structure

| Directory | Purpose |
|-----------|---------|
| `app/` | Pages, components, API routes |
| `app/components/` | React components |
| `app/lib/` | Server utilities |
| `app/utils/` | Client utilities |
| `app/styles/` | Page-specific CSS |
| `public/` | Static assets |
| `tests/` | Unit + E2E tests |

---

## Common Workflows

### Add a Page

Create `app/<route>/page.tsx`.

### Add an API Route

Create `app/api/<route>/route.ts` with `GET`/`POST` handlers.

### Add a Component

Add to `app/components/<category>/`:
- `layout/` - Global wrappers
- `ui/` - Reusable primitives
- `features/` - Feature-specific

---

## Performance

### Font Strategy
- `.woff2` format with `font-display: optional`
- OpenDyslexic lazy-loaded via accessibility widget

### CSS Strategy
- Core styles in `globals.css`
- Page-specific CSS in `app/styles/pages/`
- See `docs/css.md` for details

### Image Strategy
- `fetchPriority="high"` for hero images
- Automatic optimization via `next/image`

---

## Entry Points

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout |
| `app/page.tsx` | Homepage |
| `app/globals.css` | Global styles |
| `app/fonts.ts` | Font configuration |

---

## Testing

See `docs/testing.md` for test strategy and commands.
