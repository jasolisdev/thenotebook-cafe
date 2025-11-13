# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Notebook Café is a Next.js 16 website for a Riverside-based coffee shop, using Sanity CMS for content management. The site features a public-facing website and an embedded CMS studio at `/studio`.

## Development Commands

### Run Development Server
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Build & Production
```bash
npm run build    # Build for production
npm start        # Start production server
```

### Linting
```bash
npm run lint     # Run ESLint
```

## Architecture

### Next.js App Router Structure
- Uses Next.js 16 App Router with TypeScript
- Server components by default for data fetching
- Route handlers in `app/api/` for backend functionality
- Main pages: `/` (home), `/menu` (menu with tabs), `/about`

### Sanity CMS Integration
**Two Sanity clients exist with different purposes:**
- `sanity/lib/client.ts` - Read-only client with CDN enabled for fetching public data
- `sanity/lib/writeClient.ts` - Write client with authentication token for mutations (used in API routes)

**Key content schemas** (`sanity/schemaTypes/`):
- `homePage.ts` - Homepage hero, CTA, bullets, and vibe copy
- `aboutPage.ts` - About page with portable text body and values
- `settings.ts` - Global site settings (business info, social links, hours, SEO)
- `menuItem.ts` - Menu items for future menu functionality
- `post.ts` - Blog posts for future blog functionality
- `subscriber.ts` - Newsletter subscriber data

**Sanity configuration:**
- Embedded studio at `/studio` via `app/studio/[[...tool]]/page.tsx`
- Base path configured as `/studio` in `sanity/sanity.config.ts`
- API version: `2025-01-01`

### Data Fetching Pattern
Pages use async Server Components to fetch from Sanity:
```typescript
const data = await client.fetch(`*[_type=="homePage"][0]{ ... }`);
```

### Newsletter Subscription Flow
1. Client form (`app/components/NewsLetterForm.tsx`) submits to `/api/subscribe`
2. API route (`app/api/subscribe/route.ts`) validates email and checks for duplicates
3. Uses `writeClient` to create `subscriber` document in Sanity
4. Returns success/duplicate/error response

### Styling Approach
- Tailwind CSS with custom theme configuration
- Dark mode via `next-themes` (defaults to dark, system disabled)
- Custom font: Torus (loaded via `app/fonts.ts`)
- Responsive design with mobile-first approach
- Custom CSS classes with theme-specific styling in `globals.css`

### Image Handling
- Next.js Image component with Sanity CDN optimization
- Remote pattern configured for `cdn.sanity.io` in `next.config.ts`
- Sanity image URL builder in `sanity/lib/image.ts`

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token  # Only needed for mutations (newsletter, etc.)
```

## Key Technical Decisions

### Why Two Sanity Clients?
- Public reads use CDN-enabled client for performance
- Mutations require authenticated write client (used only in API routes)
- Keeps write token server-side only

### Component Organization
- Shared components in `app/components/`
- Page-specific logic in route files (`app/page.tsx`, `app/menu/page.tsx`, `app/about/page.tsx`)
- Reusable UI components: `BulletList`, `SectionCard`, `SectionHeading`, `NotebookPage`, `MenuContent`
- `MenuContent` - Client component with tab functionality for drinks/meals/desserts
- `ScrollReveal` - Client component that uses Intersection Observer for scroll animations

### Styling Pattern
The site uses a "light paper" aesthetic with custom CSS classes prefixed by component/section:
- `home-*` for homepage-specific styles
- `about-*` for about page styles
- `ink-cream` and `ink-cream-dim` for text colors
- Glass morphism effects for navigation

## Deployment Notes

- Configured for Vercel deployment
- Static metadata in `app/layout.tsx`
- Robots and sitemap generation via `app/robots.ts` and `app/sitemap.ts`
