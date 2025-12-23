# The Notebook Cafe — Website

Modern web platform for The Notebook Cafe LLC — specialty coffee, house music, and creative community in Riverside, CA.

---

## Quick Start

```bash
npm install
npm run dev
```

App: http://localhost:3000
Sanity Studio: http://localhost:3000/studio

---

## Overview

The site is a Next.js 16 monolith with an embedded Sanity Studio and custom UI system. It focuses on marketing pages, menu browsing, newsletter capture, contact/careers intake, and accessibility tooling. Cart UI exists but there is no on-site checkout yet.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| CMS | Sanity v4 (embedded Studio) |
| Styling | Tailwind CSS v4 + custom CSS |
| Animations | Framer Motion |
| Fonts | Playfair Display + Torus (Alpino available) + OpenDyslexic |
| Email | Resend |
| Testing | Vitest + Playwright |
| Deployment | Vercel-ready |

---

## Project Structure (High-Level)

```
thenotebook-cafe/
├── app/          # App Router pages, components, API routes
├── sanity/       # Sanity config + schemas
├── public/       # Static assets
├── tests/        # Unit + E2E tests
└── docs/         # Documentation hub
```

For full details, see `docs/source-tree-analysis.md`.

---

## Key Features

- Embedded Sanity Studio at `/studio`
- Menu browsing with product modal + cart UI (non-transactional)
- Newsletter subscription + unsubscribe flow (Sanity)
- Contact form and careers quick-apply email (Resend)
- Accessibility widget + consent banner
- Structured data for local SEO

---

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_RECIPIENT=you@example.com
CAREERS_EMAIL_RECIPIENT=you@example.com
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
