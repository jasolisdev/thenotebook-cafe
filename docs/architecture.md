# Architecture

**The Notebook Cafe - System Architecture**

Last Updated: December 2025

---

## Overview

The Notebook Cafe is a Next.js 16 web application for a Riverside-based coffee shop. It uses a server-first rendering strategy with client components for interactivity.

**Architecture Type:** Monolithic Next.js App Router
**Deployment Model:** Serverless (Vercel)
**Primary Use Case:** Marketing site with menu, forms, and newsletter

---

## Technology Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | App Router, SSR, API routes |
| React | 19 | UI rendering |
| TypeScript | 5.x | Type safety |
| Node.js | 20.x+ | Runtime |

### Data & Services

| Technology | Purpose |
|------------|---------|
| Google Sheets | Newsletter subscriber storage |
| Resend | Email delivery (contact, careers) |
| Static constants | Menu data, business info, SEO |

### UI & Styling

| Technology | Purpose |
|------------|---------|
| Tailwind CSS v4 | Utility styling |
| Custom CSS | Layout, components, animations |
| Lucide React | Icons |
| next-themes | Theme handling |

### Observability

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Deferred analytics (post-consent) |
| Vercel Speed Insights | Performance metrics |

---

## High-Level Architecture

```
Client Browser
  └─ Next.js App Router
       ├─ Server Components (default)
       ├─ Client Components (menu, cart, forms, accessibility)
       └─ API Routes (/api/*)

External Services
  ├─ Google Apps Script → Google Sheets (newsletter)
  └─ Resend (email delivery)
```

### Rendering Strategy

- **Server Components** by default for pages and static content
- **Client Components** for interactive sections (menu tabs, modals, cart, forms)
- **Metadata** centralized in `app/lib/constants/seo.ts`

---

## Project Structure

```
thenotebook-cafe/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles + Tailwind config
│   ├── fonts.ts                  # Font configuration
│   │
│   ├── api/                      # API Routes
│   │   ├── subscribe/            # Newsletter (→ Google Sheets)
│   │   ├── unsubscribe/          # Unsubscribe redirect
│   │   ├── contact/              # Contact form (→ Resend)
│   │   ├── apply/                # Job application (→ Resend)
│   │   └── auth/verify/          # Password verification
│   │
│   ├── components/               # React components
│   │   ├── layout/               # Header, footer, shell
│   │   ├── ui/                   # Buttons, banners, modals
│   │   ├── features/             # Menu, cart, forms, hero
│   │   ├── providers/            # Context providers
│   │   └── seo/                  # JSON-LD components
│   │
│   ├── lib/                      # Server utilities
│   │   ├── server/               # CSRF, rate limit, sanitize
│   │   ├── constants/            # Business, SEO, colors
│   │   └── data/                 # Static content
│   │
│   ├── utils/                    # Client utilities
│   ├── types/                    # TypeScript types
│   ├── styles/                   # Page-specific CSS
│   │
│   ├── menu/                     # /menu
│   ├── story/                    # /story
│   ├── careers/                  # /careers
│   ├── contact/                  # /contact
│   └── (legal pages)             # /privacy, /terms, /refunds
│
├── public/                       # Static assets
├── tests/                        # Unit + E2E tests
├── docs/                         # Documentation
└── .github/workflows/            # CI pipeline
```

---

## API Layer

| Endpoint | Method | Purpose | Rate Limit |
|----------|--------|---------|------------|
| `/api/subscribe` | POST | Newsletter signup | 5/min |
| `/api/unsubscribe` | GET | Redirect to Google Form | - |
| `/api/contact` | POST | Contact form → email | 3/min |
| `/api/apply` | POST | Job application → email | 2/hr |
| `/api/auth/verify` | POST | Password verification | 3/15min |

### Security

- **CSRF:** Origin/Referer validation on POST endpoints
- **Rate Limiting:** IP-based, configurable per endpoint
- **Input Sanitization:** HTML/script injection prevention
- **File Validation:** Size, type, magic bytes for uploads

---

## Data Flow

### Newsletter

```
Form → /api/subscribe → Google Apps Script → Google Sheets
```

### Contact/Careers

```
Form → /api/contact → Resend → Email to business owner
```

### Static Content

All marketing content (menu, business info, SEO) is in TypeScript constants:
- `app/lib/constants/business.ts`
- `app/lib/constants/seo.ts`
- `app/lib/data/menu.ts`

---

## Performance

### Optimizations

- **Fonts:** `.woff2` format, `font-display: optional`
- **CSS:** Consolidated into single `globals.css`
- **Images:** Next.js optimization + `fetchPriority` for hero
- **Lazy Loading:** OpenDyslexic font loads on-demand

### Targets

| Metric | Target |
|--------|--------|
| FCP | < 1.5s |
| Lighthouse | > 90 |
| Font Weight | < 500KB |

---

## Routes

### Public

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/menu` | Menu with product modals |
| `/story` | About page |
| `/careers` | Job listings |
| `/contact` | Contact form |
| `/privacy`, `/terms`, `/refunds` | Legal pages |

---

## Deployment

- **Platform:** Vercel
- **Build:** `npm run build`
- **Environment:** See `AGENTS.md` for required variables

---

## Known Constraints

- Menu data is static (not CMS-driven)
- Cart is UI-only (no payment integration yet)
- Newsletter unsubscribe redirects to Google Form
