# Architecture Documentation
**The Notebook Café - System Architecture**

Last Updated: 2025-12-24
Project Type: Web Application (Monolith)

---

## Executive Summary

The Notebook Café is a monolithic Next.js 16 application with an embedded Sanity CMS and serverless API routes. The system uses a server-first rendering strategy, with client components layered in for interactivity (menu modals, cart, forms, accessibility tools). Data storage is handled by Sanity's Content Lake, and transactional email is delivered via Resend.

**Architecture Type:** Monolithic Next.js App Router + Headless CMS
**Deployment Model:** Serverless (Vercel-ready)
**Primary Use Case:** Public-facing coffee shop site with marketing pages and form workflows

---

## Technology Stack

### Core Framework & Runtime

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | Next.js | 16.0.7 | App Router, SSR, API routes |
| Runtime | React | 19.2.0 | UI rendering |
| Language | TypeScript | 5.x | Type safety |
| Node.js | Node.js | 20.x+ | Runtime |

### Content & Data

| Technology | Version | Purpose |
|------------|---------|---------|
| Sanity CMS | 4.11.x | Headless CMS & content storage |
| @sanity/client | 7.12.x | Sanity API client |
| next-sanity | 11.6.x | Next.js + Sanity integration |
| Resend | 6.6.x | Contact & careers email delivery |

### UI & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.1.x | Utility styling |
| Custom CSS | - | Layout and component styling |
| Framer Motion | 12.23.x | Animations |
| Lucide React | 0.548.x | Icon set |
| React Icons | 5.5.x | Supplemental icons |
| next-themes | 0.4.x | Theme handling |

### Observability

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Deferred analytics after consent |
| Vercel Speed Insights | Performance metrics |

---

## Architecture Pattern

### High-Level Architecture

```
Client Browser
  └─ Next.js App Router
       ├─ Server Components (default)
       ├─ Client Components (menus, forms, cart, accessibility)
       ├─ API Routes (/api/*)
       └─ Embedded Sanity Studio (/studio)

API/Data Services
  ├─ Sanity Content Lake (content + submissions)
  └─ Resend (email delivery)
```

### Rendering Strategy

- **Server Components by default** for page layouts and static content
- **Client Components** for interactive sections (menu tabs, modals, cart, forms)
- **Metadata** centralized via `lib/seo.ts` with per-route overrides

---

## API Layer

**API Routes:**
- `POST /api/subscribe` — newsletter signup (Sanity)
- `GET /api/unsubscribe` — newsletter unsubscribe (Sanity)
- `POST /api/contact` — contact form (Sanity + Resend)
- `POST /api/apply` — job application (Sanity + file uploads)
- `POST /api/careers/apply` — careers quick-apply email (Resend)
- `POST /api/auth/verify` — site password verification

**Security Practices:**
- CSRF origin validation (for POST forms)
- Rate limiting per endpoint
- Input sanitization for text fields
- File validation (mime/size and magic number checks where applicable)

---

## Data Flow Summary

1. Visitor requests a page (App Router, server-rendered).
2. UI renders content and client components hydrate.
3. Forms POST to `/api/*` routes.
4. API routes validate, sanitize, and write to Sanity and/or send Resend emails.
5. Responses are returned as JSON or HTML (unsubscribe).

---

## Sanity CMS Integration

- **Studio:** Embedded at `/studio` (noindex)
- **Schemas:** homePage, aboutPage, menuItem, settings, post, subscriber, jobApplication, contactMessage
- **Usage:** Settings and intake storage are live; most marketing content is currently static in code.

---

## Deployment Considerations

- **Vercel** recommended for serverless deployment and Edge distribution
- **Environment Variables** required for Sanity + Resend
- **Analytics** loaded only after cookie consent

---

## Performance Architecture

The application is optimized for fast First Contentful Paint (FCP) and minimal Time to Interactive (TTI):

### Asset Optimization
- **Fonts:** `.woff2` format with `font-display: optional` (instant text rendering)
- **CSS:** Single consolidated file for global styles (7 HTTP requests → 1)
- **Images:** Next.js automatic optimization + `fetchPriority="high"` for critical content
- **Lazy Loading:** Non-critical fonts (OpenDyslexic) load on-demand

### Performance Metrics (Target)
| Metric | Target | Current (Dec 2024) |
|--------|--------|-------------------|
| FCP | < 1.5s | ~1.0-1.3s |
| Lighthouse Score | > 90 | 90-95 (expected) |
| Total Font Weight | < 500KB | ~330KB |

### Optimization Strategy
1. **Critical Path:** Minimize render-blocking resources
2. **Resource Hints:** Use `fetchPriority` for above-the-fold images
3. **Font Strategy:** Load system fonts first, web fonts asynchronously
4. **Code Splitting:** Automatic via Next.js App Router
5. **Accessibility:** Lazy-load assistive features (dyslexia font) to avoid performance penalty

**See also:** `docs/development-guide.md` (Performance Optimizations section)

---

## Known Constraints

- Menu data is currently sourced from static constants, not Sanity.
- Cart flow is UI-only and does not connect to a payment provider yet.
