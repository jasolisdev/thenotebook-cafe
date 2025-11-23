# Project Overview
**The Notebook Café - Executive Summary**

Generated: 2025-11-23

---

## Project Identity

**Name:** The Notebook Café
**Type:** Web Application (Public-facing website)
**Industry:** Hospitality / Coffee Shop
**Location:** Riverside, California
**Status:** Active Development

---

## Purpose

A modern web platform for The Notebook Café LLC — a specialty coffee shop that merges premium coffee culture with house music and creative community in Riverside, CA. The website serves as the digital presence for the café, providing information, menu access, and content management capabilities.

---

## Executive Summary

The Notebook Café website is built as a monolithic Next.js 16 application with an integrated Sanity CMS for dynamic content management. The architecture prioritizes fast performance through server-side rendering, clean design through a custom CSS system, and content flexibility through a headless CMS approach.

**Key Characteristics:**
- Server-first architecture using Next.js App Router
- Integrated Sanity Studio for content management at `/studio`
- Component-based UI with organized 4-tier hierarchy
- Mobile-first responsive design (320px+)
- Premium animations and transitions
- No traditional database (Sanity CMS as data layer)

---

## Technology Stack Summary

### Frontend
- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4.1 + Custom CSS + Styled Components
- **Animations:** Framer Motion 12
- **Icons:** Lucide React + React Icons

### Backend/CMS
- **CMS:** Sanity 4.11 (Headless)
- **API Routes:** 2 Next.js serverless functions
- **Data Layer:** Sanity Content Lake (no traditional DB)

### Development
- **Runtime:** Node.js 20.x+
- **Package Manager:** npm
- **Linting:** ESLint 9
- **Type Checking:** TypeScript strict mode

---

## Architecture Type Classification

**Repository Type:** Monolith
- Single cohesive codebase
- No microservices or separate backend
- Integrated frontend + API + CMS

**Architecture Pattern:** Next.js App Router (Server-First)
- File-system based routing
- Server Components by default
- Client Components for interactivity
- API Routes for backend logic

**Deployment Model:** Serverless (Vercel)
- No traditional server infrastructure
- Global CDN distribution
- Automatic scaling

---

## Repository Structure

```
thenotebook-cafe/                    # Monolith
├── app/                             # Next.js Application (Main Part)
│   ├── components/                  # 31 React components (4-tier org)
│   ├── api/                         # 2 API routes
│   ├── styles/                      # Organized CSS (3-tier)
│   ├── (pages: menu, story, events)
│   └── studio/                      # Embedded Sanity Studio
├── sanity/                          # Sanity CMS Configuration
│   ├── schemaTypes/                 # 7 content schemas
│   └── lib/                         # Sanity clients
└── public/                          # Static assets (fonts, images)
```

**Total Components:** 31
**Total API Endpoints:** 2
**Total Content Schemas:** 7
**Total Routes:** 5 (Home, Menu, Story, Events, Studio)

---

## Quick Reference

### Primary Technologies
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript 5** - Type-safe JavaScript
- **Sanity 4.11** - Headless CMS
- **Tailwind CSS 4.1** - Utility-first CSS
- **Framer Motion 12** - Animation library

### Entry Points
- **Homepage:** `app/page.tsx` - Main landing page
- **Root Layout:** `app/layout.tsx` - Global wrapper
- **Sanity Config:** `sanity/sanity.config.ts` - CMS configuration

### Key Directories
- `app/components/` - React component library
- `app/api/` - API routes (newsletter, auth)
- `app/styles/` - CSS organization
- `sanity/schemaTypes/` - Content models
- `public/` - Static assets

---

## Core Features

### Public-Facing Features
✅ **Homepage** - Hero, welcome section, info cards
✅ **Menu System** - Tab navigation with seasonal drinks
✅ **Story Page** - About the café and values
✅ **Events Page** - Upcoming events and activities
✅ **Newsletter Subscription** - Email capture with duplicate detection
✅ **Responsive Design** - Mobile-first (320px - 1920px+)
✅ **Scroll Animations** - Reveal effects on scroll
✅ **Spotify Integration** - Embedded playlist

### Admin Features
✅ **Embedded CMS** - Sanity Studio at `/studio`
✅ **Content Management** - Update homepage, menu, settings
✅ **Media Library** - Sanity image management
✅ **Schema Customization** - Define content models

### Developer Features
✅ **TypeScript** - Full type safety
✅ **ESLint** - Code quality enforcement
✅ **Hot Module Replacement** - Fast development iteration
✅ **Environment-based Config** - `.env.local` support
✅ **Optional Password Protection** - Dev/staging security

---

## Project Statistics

### Codebase Metrics
- **Project Type:** Web Application (Monolith)
- **Primary Language:** TypeScript
- **Components:** 31 total
- **API Routes:** 2 endpoints
- **Content Schemas:** 7 types
- **CSS Files:** 12+ organized files

### Component Breakdown
- **Layout Components:** 4 (SiteHeader, SiteFooter, ScrollReveal, PageTransition)
- **UI Components:** 8 (AnnouncementBanner, Cards, Forms, etc.)
- **Feature Components:** 8 (Menu, Newsletter, Carousel, etc.)
- **Decorative Components:** 4 (Floating items)
- **Legacy/Transitional:** 7 (being migrated)

### Content Types (Sanity)
- **Pages:** homePage, aboutPage
- **Dynamic Content:** menuItem, post (future)
- **Subscribers:** subscriber
- **Configuration:** settings

---

## Development Workflow

### Local Development
```bash
# Install
npm install

# Run dev server
npm run dev  # http://localhost:3000

# Access CMS
# http://localhost:3000/studio
```

### Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Setup
Create `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=<your_api_token>
SITE_PASSWORD=  # Optional
```

---

## Links to Detailed Documentation

### Generated Documentation
- **[Architecture](./architecture.md)** - Complete system architecture
- **[Source Tree Analysis](./source-tree-analysis.md)** - Annotated directory structure
- **[Development Guide](./development-guide.md)** - Setup and workflow instructions
- **[Component Inventory](./component-inventory.md)** _(To be generated)_ - Component catalog
- **[API Contracts](./api-contracts.md)** _(To be generated)_ - API documentation
- **[Data Models](./data-models.md)** _(To be generated)_ - Schema documentation

### Existing Documentation
- **[CLAUDE.md](../CLAUDE.md)** - Comprehensive guide for Claude Code (24KB)
- **[README.md](../README.md)** - Project overview and quick start
- **[REFACTORING_SUMMARY.md](../REFACTORING_SUMMARY.md)** - Refactoring history
- **[CSS_ORGANIZATION.md](../CSS_ORGANIZATION.md)** - CSS architecture

---

## Getting Started

### For New Developers
1. Read [Development Guide](./development-guide.md) for setup instructions
2. Review [Architecture](./architecture.md) to understand system design
3. Check [Source Tree Analysis](./source-tree-analysis.md) for file organization
4. Refer to [CLAUDE.md](../CLAUDE.md) for comprehensive Claude Code guidance

### For Content Editors
1. Visit http://localhost:3000/studio (after running `npm run dev`)
2. Log in with Sanity credentials
3. Edit content types (Homepage, Menu, Settings, etc.)
4. Click "Publish" to make changes live

### For Designers
1. Review [CSS_ORGANIZATION.md](../CSS_ORGANIZATION.md) for styling patterns
2. Check `app/globals.css` for design tokens (colors, fonts)
3. Examine `app/components/` for component structure
4. Reference `public/fonts/` for custom typography (Alpino, Torus)

---

## Project Health

### Strengths
✅ Modern tech stack (Next.js 16, React 19, TypeScript)
✅ Well-organized component architecture
✅ Comprehensive documentation (CLAUDE.md)
✅ Clean separation of concerns (components by category)
✅ Mobile-first responsive design
✅ Integrated CMS for content flexibility

### Areas for Future Enhancement
⚠️ No automated testing (recommend Jest + Playwright)
⚠️ No CI/CD pipeline (Vercel handles deployment)
⚠️ Limited error monitoring (recommend Sentry)
⚠️ No performance monitoring (recommend Web Vitals tracking)

### Security Considerations
- ✅ Environment variables for credentials
- ✅ Server-side API token handling
- ⚠️ Basic password protection (dev/staging only)
- 📝 Consider NextAuth.js for production auth

---

## Next Steps

### For Brownfield PRD Creation
When creating a PRD for new features:
1. Reference this overview for project context
2. Consult [Architecture](./architecture.md) for technical constraints
3. Review [Component Inventory](./component-inventory.md) for reusable elements
4. Check [Data Models](./data-models.md) for existing schemas

### For New Feature Development
1. Read [Development Guide](./development-guide.md) for workflow
2. Follow existing component organization patterns
3. Add new routes via file-system routing
4. Extend Sanity schemas if new content types needed

---

## Contact & Resources

### Documentation
- **Project Docs:** `/docs` directory
- **Code Comments:** Inline JSDoc in components
- **CLAUDE.md:** Comprehensive guide (24KB)

### External Resources
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Sanity CMS Docs](https://www.sanity.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-23
**Project Owner:** The Notebook Café LLC
