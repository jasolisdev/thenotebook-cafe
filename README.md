# The Notebook Cafe — Website

Modern web platform for The Notebook Cafe LLC — specialty coffee, house music, and creative community in Riverside, CA.

---

## Quick Start

```bash
npm install
npm run dev
```

App: http://localhost:3000

---

## Overview

The site is a Next.js 16 application with custom UI system. It focuses on marketing pages, menu browsing, newsletter capture, contact/careers intake, and accessibility tooling. Cart UI exists but there is no on-site checkout yet.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom CSS |
| Fonts | Playfair Display + Torus + OpenDyslexic |
| Email | Resend |
| Newsletter | Google Sheets + Apps Script |
| Analytics | Google Analytics 4 + Vercel Analytics |
| Testing | Vitest + Playwright |
| Deployment | Vercel |

---

## Project Structure (High-Level)

```
thenotebook-cafe/
├── app/          # App Router pages, components, API routes
├── public/       # Static assets
├── tests/        # Unit + E2E tests
└── docs/         # Documentation hub
```

For full details, see `docs/source-tree-analysis.md`.

---

## Key Features

- Menu browsing with product modal + cart UI (non-transactional)
- Newsletter subscription via Google Sheets + Apps Script
- Contact form and careers quick-apply email (Resend)
- Accessibility widget + cookie consent banner
- Google Analytics 4 with consent gating
- Structured data for local SEO (JSON-LD)

---

## Environment Variables

Create `.env.local`:

```bash
# Email (Required for contact/apply forms)
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_RECIPIENT=you@example.com
CAREERS_EMAIL_RECIPIENT=you@example.com

# Newsletter (Required for subscriptions)
GOOGLE_APPS_SCRIPT_URL=your_apps_script_url
NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL=your_google_form_url

# Analytics (Optional)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Optional: Password Protection
SITE_PASSWORD=
```

---

## Testing

```bash
npm run test
npm run test:coverage
npm run test:e2e
npm run test:all
```

---

## Documentation

Documentation is canonical in `docs/`. Start here: `docs/index.md`
- Architecture: `docs/architecture.md`
- Components: `docs/component-inventory.md`
- CSS system: `docs/CSS_ORGANIZATION.md`
- API contracts: `docs/api-contracts.md`
- Data models: `docs/data-models.md`
