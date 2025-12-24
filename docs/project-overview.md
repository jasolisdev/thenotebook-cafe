# Project Overview
**The Notebook Café - Executive Summary**

Last Updated: 2025-12-23

---

## Project Identity

**Name:** The Notebook Café
**Type:** Web Application (Public-facing website)
**Industry:** Hospitality / Coffee Shop
**Location:** Riverside, California
**Status:** Active Development

---

## Purpose

A modern web platform for The Notebook Café LLC — a specialty coffee shop that merges premium coffee culture with house music and creative community in Riverside, CA. The website serves as the digital presence for the café, providing marketing pages, menu browsing, careers/contact intake, and content management capabilities.

---

## Executive Summary

The Notebook Café website is a monolithic Next.js 16 application with an integrated Sanity CMS for content management and a custom UI system. The architecture prioritizes performance through server-first rendering, a cohesive visual system, and secure form handling for newsletter, contact, and hiring workflows.

**Key Characteristics:**
- Server-first architecture using Next.js App Router
- Embedded Sanity Studio at `/studio`
- Custom CSS system alongside Tailwind CSS 4
- Interactive menu with cart UI (no on-site checkout)
- Email workflows powered by Resend
- Accessibility tooling (widget + preference toggles)

---

## Technology Stack Summary

### Frontend
- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4.1 + Custom CSS
- **Animations:** Framer Motion 12
- **Icons:** Lucide React + React Icons
- **Theming:** next-themes

### Backend / CMS
- **CMS:** Sanity 4.11 (Headless)
- **API Routes:** 6 Next.js serverless endpoints
- **Email Provider:** Resend (contact + careers)
- **Data Layer:** Sanity Content Lake (no traditional DB)

### Development
- **Runtime:** Node.js 20.x+
- **Package Manager:** npm
- **Linting:** ESLint 9
- **Testing:** Vitest + Playwright
- **CI:** GitHub Actions (lint, unit, e2e)

---

## Architecture Type Classification

**Repository Type:** Monolith
- Single cohesive codebase
- Integrated frontend + API + CMS

**Architecture Pattern:** Next.js App Router (Server-First)
- Server Components by default
- Client Components for interactivity
- API Routes for backend logic

**Deployment Model:** Serverless (Vercel-ready)
- Global CDN distribution
- Automatic scaling

---

## Repository Structure (High-Level)

```
thenotebook-cafe/                    # Monolith
├── app/                             # Next.js application (App Router)
│   ├── components/                  # React component library
│   ├── api/                         # API routes
│   ├── styles/                      # CSS organization
│   ├── (routes: home, menu, story, careers, contact, legal, style-guide)
│   └── studio/                      # Embedded Sanity Studio
├── sanity/                          # Sanity CMS configuration & schemas
└── public/                          # Static assets (fonts, images)
```

**Components:** 37
**API Endpoints:** 6
**Sanity Schemas:** 8
**Routes:** Home, Menu, Story, Careers, Careers Thank You, Contact, Privacy, Terms, Refunds, Style Guide, Studio

---

## Core Features

### Public-Facing Features
- Homepage with hero, menu preview, and newsletter capture
- Menu page with tabs, product modal, and cart drawer
- Story page narrative content
- Careers page with job details + application flow
- Contact page with business info and form
- Legal pages (Privacy, Terms, Refunds)
- Style Guide route for design system

### Admin / CMS Features
- Embedded Sanity Studio at `/studio`
- Content schemas for homepage, menu items, settings, posts
- Subscriber, contact message, and job application storage

### Developer Features
- TypeScript strict mode
- ESLint 9 linting
- Vitest unit tests + Playwright E2E
- Centralized SEO constants in `lib/seo.ts`
- Structured data components (LocalBusiness, FAQ, Menu)

---

## Development Workflow

### Local Development
```bash
npm install
npm run dev  # http://localhost:3000
# Sanity Studio: http://localhost:3000/studio
```

### Build & Deploy
```bash
npm run build
npm start
npm run lint
npm run test:coverage
npm run test:e2e
```

### Environment Setup
Create `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=<your_api_token>
RESEND_API_KEY=<resend_key>
CONTACT_EMAIL_RECIPIENT=<recipient_email>
CAREERS_EMAIL_RECIPIENT=<recipient_email>
SITE_PASSWORD=  # Optional
```

---

## Project Health

### Strengths
- Modern stack (Next.js 16, React 19, TypeScript)
- Structured component organization
- Strong test coverage footprint (unit + E2E)
- Centralized SEO/business metadata
- Accessible UI patterns

### Areas for Future Enhancement
- Integrate Clover checkout redirect for online ordering
- Expand Sanity usage for menu/content delivery
- Add production error monitoring (Sentry hooks are scaffolded)

---

## Documentation Links

- **[Architecture](./architecture.md)**
- **[Source Tree Analysis](./source-tree-analysis.md)**
- **[Development Guide](./development-guide.md)**
- **[Component Inventory](./component-inventory.md)**
- **[API Contracts](./api-contracts.md)**
- **[Data Models](./data-models.md)**
