# Architecture Documentation
**The Notebook Café - System Architecture**

Generated: 2025-11-23
Version: 1.0.0
Project Type: Web Application (Monolith)

---

## Executive Summary

The Notebook Café is a modern web application built with Next.js 16, featuring an integrated Sanity CMS for content management. The architecture follows a server-first approach using Next.js App Router, with React Server Components as the default rendering strategy and selective client-side interactivity where needed.

**Architecture Type:** Monolithic Next.js Application with Headless CMS
**Deployment Platform:** Vercel (inferred - Next.js standard)
**Primary Use Case:** Public-facing coffee shop website with dynamic content management

---

## Technology Stack

### Core Framework & Runtime

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 16.0.0 | React framework with App Router, SSR, and API routes |
| **Runtime** | React | 19.2.0 | UI library with Server Components and concurrent features |
| **Language** | TypeScript | 5.x | Type-safe JavaScript superset |
| **Node.js** | Node.js | 20.x+ | JavaScript runtime (inferred from Next.js 16 requirements) |

### Content Management

| Technology | Version | Purpose |
|-----------|---------|---------|
| Sanity CMS | 4.11.0 | Headless CMS for content management |
| @sanity/client | 7.12.0 | Sanity JavaScript client |
| @sanity/image-url | 1.2.0 | Image URL transformation |
| next-sanity | 11.6.2 | Next.js + Sanity integration |

### Styling & UI

| Technology | Version | Purpose |
|-----------|---------|---------|
| Tailwind CSS | 4.1.16 | Utility-first CSS framework |
| Custom CSS | - | Component and page-specific styles |
| Styled Components | 6.1.19 | CSS-in-JS library |
| Framer Motion | 12.23.24 | Animation library |
| Lucide React | 0.548.0 | Icon library (primary) |
| React Icons | 5.5.0 | Additional icon sets |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint | 9.x | Code linting and quality |
| PostCSS | 8.5.6 | CSS processing |
| Autoprefixer | 10.4.21 | CSS vendor prefixing |

---

## Architecture Pattern

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         React Components (Hydrated Client-Side)       │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server (Vercel)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              App Router (File-based Routing)          │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Server Components (Default)                   │  │  │
│  │  │  - Fetch data from Sanity                      │  │  │
│  │  │  - Render HTML on server                       │  │  │
│  │  │  - Send minimal JS to client                   │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Client Components ("use client")              │  │  │
│  │  │  - Interactive UI (forms, modals, animations)  │  │  │
│  │  │  - Browser APIs (window, localStorage)         │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  API Routes (/api/*)                           │  │  │
│  │  │  - /api/subscribe (newsletter)                 │  │  │
│  │  │  - /api/auth/verify (password)                 │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │ Sanity API (HTTPS)
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                  Sanity CMS (sanity.io)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Content Lake (Headless CMS)                         │  │
│  │  - Homepage content                                  │  │
│  │  - Menu items                                        │  │
│  │  - Settings                                          │  │
│  │  - Subscribers                                       │  │
│  │  - About page content                                │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Sanity Studio (Embedded at /studio)                 │  │
│  │  - Content editing UI                                │  │
│  │  - Schema management                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Rendering Strategy

**Default: Server Components**
- Pages render on the server by default
- Data fetched during SSR from Sanity CMS
- HTML sent to browser (fast first paint)
- Minimal JavaScript shipped to client

**Selective: Client Components**
- Components marked with `"use client"` directive
- Used for interactivity, browser APIs, event handlers
- Examples: SiteHeader (mobile menu), MenuContent (tabs), NewsLetterForm (form state)

**Hybrid Approach Benefits:**
- Fast initial page loads (Server Components)
- Rich interactivity where needed (Client Components)
- Reduced JavaScript bundle size
- Better SEO (server-rendered HTML)

---

## Data Architecture

### Content Management (Sanity CMS)

**Sanity Client Pattern:**
- **Read Client** (`sanity/lib/client.ts`) - CDN-enabled, public data fetching
- **Write Client** (`sanity/lib/writeClient.ts`) - Authenticated, server-side only (API routes)

**Data Schemas (7 total):**

| Schema | Purpose | Fields | Usage |
|--------|---------|--------|-------|
| `homePage` | Homepage content | heroTagline, whatToExpectBullets, vibeCopy | Homepage rendering |
| `aboutPage` | About/Story page | title, body, valuesBullets, founderNote | Story page |
| `menuItem` | Menu items | section, category, name, description, price, imageUrl | Menu page |
| `subscriber` | Newsletter subscribers | email, source, subscribedAt | Newsletter tracking |
| `settings` | Global settings | social, hours, address | Site-wide configuration |
| `post` | Blog posts | title, slug, content | Future use (not yet active) |
| Schema Index | Schema registry | - | Sanity schema management |

**Data Flow:**
1. Content editors update content in Sanity Studio (/studio)
2. Content stored in Sanity Content Lake (cloud)
3. Next.js pages fetch data via Sanity client (SSR)
4. Pages render with latest content
5. Optional: ISR (Incremental Static Regeneration) for caching

**No Traditional Database:**
- Sanity CMS serves as the data layer
- No PostgreSQL, MongoDB, or other traditional DB
- All dynamic content managed through Sanity

---

## API Design

### API Routes (2 endpoints)

**Pattern:** Next.js Route Handlers (App Router)
**Location:** `app/api/[route]/route.ts`
**Authentication:** Environment-based (SANITY_WRITE_TOKEN for mutations)

#### 1. Newsletter Subscription

**Endpoint:** `POST /api/subscribe`
**Purpose:** Subscribe users to newsletter
**Request Body:**
```json
{
  "email": "user@example.com",
  "source": "homepage" | "footer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscribed successfully"
}
```

**Flow:**
1. Validate email format
2. Check for duplicate subscribers (Sanity query)
3. Create subscriber document in Sanity (writeClient)
4. Return success/error response

**Error Handling:**
- Duplicate email → 200 with "already subscribed" message
- Invalid email → 400 Bad Request
- Sanity error → 500 Internal Server Error

#### 2. Password Verification

**Endpoint:** `POST /api/auth/verify`
**Purpose:** Site-wide password protection (optional)
**Request Body:**
```json
{
  "password": "user_entered_password"
}
```

**Response:**
```json
{
  "success": true
}
```

**Flow:**
1. Compare with `SITE_PASSWORD` environment variable
2. Return success/failure
3. No session/cookie management (handled client-side)

**Security:**
- Password stored in environment variable
- Not intended for production security
- Development/staging environment feature

---

## Component Architecture

### Component Organization (31 components)

**4-Tier Hierarchy:**

```
app/components/
├── layout/              # Global layout components (4)
│   ├── SiteHeader       # Navigation + mobile drawer
│   ├── SiteFooter       # Footer with links and info
│   ├── ScrollReveal     # Scroll animation system
│   └── PageTransition   # Page transition effects
│
├── ui/                  # Reusable UI primitives (8)
│   ├── AnnouncementBanner   # Sticky top banner
│   ├── SectionCard      # Card component
│   ├── BulletList       # Styled lists
│   ├── PasswordGate     # Password protection UI
│   ├── NotebookPage     # Page wrapper
│   ├── SectionHeading   # Section headers
│   ├── Icons            # Icon components
│   └── ... (additional UI components)
│
├── features/            # Feature-specific components (8)
│   ├── MenuContent      # Menu system with tabs
│   ├── MenuItemModal    # Menu detail modal
│   ├── NewsLetterForm   # Email subscription
│   ├── AtmosphereCarousel   # Image carousel
│   ├── BlogPosts        # Blog post display
│   ├── CardGallery      # Info card grid
│   ├── CoffeeDifferenceSection  # Feature section
│   └── ... (additional features)
│
└── decorative/          # Visual decorations (4)
    ├── HomeFloatingItems    # Homepage floating elements
    ├── AboutFloatingItems   # About page decorations
    ├── EventsFloatingItems  # Events page decorations
    └── FloatingItems    # Generic floating decorations
```

**Component Patterns:**

1. **Server Components (Default)**
   - No `"use client"` directive
   - Async data fetching
   - Example: Page components, static sections

2. **Client Components (Interactive)**
   - Marked with `"use client"`
   - Event handlers, React hooks
   - Examples: SiteHeader, MenuContent, NewsLetterForm

3. **Shared Components**
   - Reusable across multiple pages
   - Consistent design language
   - Example: SectionCard, BulletList

### Key Component Behaviors

**SiteHeader:**
- Responsive navigation
- Mobile: Full-screen overlay drawer
- Desktop: Horizontal nav bar
- Breakpoint: 640px (sm)

**MenuContent:**
- Tab navigation (Drinks | Meals | Desserts)
- Hardcoded menu data (arrays)
- Modal integration for item details
- Scroll-to-top button

**ScrollReveal:**
- Intersection Observer API
- Detects `.scroll-reveal` class elements
- Adds `.is-visible` when entering viewport
- Different behavior for above-fold vs below-fold

---

## Styling Architecture

### Hybrid Styling Approach

**Three-Layer System:**

1. **Tailwind CSS (Utility-First)**
   - Rapid development with utility classes
   - Responsive modifiers
   - Configuration: `tailwind.config.ts`

2. **Custom CSS (Organized)**
   - Component-specific styles
   - Page-specific styles
   - Layout styles
   - Location: `app/styles/`

3. **CSS-in-JS (Styled Components)**
   - Dynamic styling
   - Component-scoped styles
   - Limited usage

**CSS Organization:**

```
app/styles/
├── components/          # Component-specific CSS
│   ├── announcement.css
│   ├── buttons.css
│   ├── card-gallery.css
│   ├── footer.css
│   ├── hero.css
│   ├── modal.css
│   └── navigation.css
│
├── layout/              # Layout & structural CSS
│   ├── animations.css   # Scroll animations, transitions
│   └── sections.css     # Section layouts
│
└── pages/               # Page-specific CSS
    ├── home.css
    ├── menu.css
    ├── about.css
    └── events.css
```

**Design Tokens (CSS Variables):**

```css
/* Color Palette */
--cream: #f4f0e9;              /* Light sections */
--espresso-brown: #2a1f16;     /* Primary text */
--coffee-bean: #1a3636;        /* Dark sections */
--gold-primary: rgba(201, 154, 88, 1);  /* Accent */

/* Typography */
--font-sans: "Torus", system-ui, sans-serif;      /* Body */
--font-display: "Alpino", "Torus", sans-serif;    /* Headings */
```

**Responsive Strategy:**
- Mobile-first approach
- Breakpoints: 320px (base), 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Fluid spacing: 40px → 100px based on viewport

---

## File Structure & Routing

### Next.js App Router

**File-System Based Routing:**

| Route | File Path | Purpose |
|-------|-----------|---------|
| `/` | `app/page.tsx` | Homepage |
| `/menu` | `app/menu/page.tsx` | Menu page |
| `/story` | `app/story/page.tsx` | About/Story page |
| `/events` | `app/events/page.tsx` | Events page |
| `/studio` | `app/studio/[[...tool]]/page.tsx` | Sanity Studio (catch-all) |
| `/api/subscribe` | `app/api/subscribe/route.ts` | Newsletter API |
| `/api/auth/verify` | `app/api/auth/verify/route.ts` | Password API |

**Special Files:**

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout (wraps all pages) |
| `app/globals.css` | Global styles |
| `app/not-found.tsx` | 404 error page |
| `app/robots.ts` | SEO robots configuration |
| `app/sitemap.ts` | SEO sitemap generation |

---

## Development Workflow

### Local Development

**Prerequisites:**
- Node.js 20.x+
- npm 10.x+

**Setup:**
```bash
npm install                    # Install dependencies
npm run dev                    # Start dev server (localhost:3000)
```

**Environment Variables:**
```bash
# Required (.env.local)
NEXT_PUBLIC_SANITY_PROJECT_ID=<project_id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=<api_token>

# Optional
SITE_PASSWORD=<password_for_dev_protection>
```

**Development Commands:**

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build locally |
| `npm run lint` | Run ESLint |

**Hot Module Replacement:**
- Automatic page refresh on file changes
- Fast Refresh for React components
- TypeScript type checking in background

### Code Organization Standards

**Component Files:**
- One component per file
- PascalCase naming (e.g., `SiteHeader.tsx`)
- Collocate styles if component-specific

**Import Paths:**
- Use absolute imports with `@` alias
- Example: `import SiteHeader from '@/app/components/layout/SiteHeader'`

**TypeScript:**
- Strict mode enabled
- Define types for props
- Avoid `any` type

---

## Testing Strategy

**Current Status:** No automated tests configured

**Recommended Testing Approach:**

### Unit Testing (Recommended)
- **Framework:** Jest + React Testing Library
- **Scope:** UI components, utility functions
- **Coverage Target:** 70%+ for critical components

### Integration Testing
- **Framework:** Playwright or Cypress
- **Scope:** API routes, form submissions
- **Key Flows:** Newsletter subscription, password verification

### End-to-End Testing
- **Framework:** Playwright
- **Scope:** Full user journeys
- **Critical Paths:**
  - Homepage → Menu → Item Modal
  - Newsletter subscription flow
  - Content updates from Sanity Studio

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Mobile navigation works (< 640px)
- [ ] Sanity Studio CMS accessible
- [ ] Newsletter subscription functional
- [ ] Password protection (if enabled)
- [ ] Responsive design (320px - 1920px+)
- [ ] Images load and optimize
- [ ] Animations perform smoothly

---

## Deployment Architecture

**Platform:** Vercel (inferred - Next.js standard)

**Deployment Flow:**
1. Push code to Git repository (GitHub/GitLab/Bitbucket)
2. Vercel detects push
3. Runs `npm run build`
4. Deploys to global CDN
5. Environment variables configured in Vercel dashboard

**Environment Configuration:**
- Production: `NEXT_PUBLIC_SANITY_DATASET=production`
- Staging: `NEXT_PUBLIC_SANITY_DATASET=staging` (optional)
- Environment variables managed in Vercel project settings

**No Docker/CI-CD Pipelines:**
- Vercel handles build and deployment
- No custom CI/CD required
- No containerization needed

**Performance Optimizations:**
- Next.js automatic code splitting
- Image optimization via Next.js Image component
- CDN distribution (Vercel Edge Network)
- Server-side rendering for fast first paint

---

## Security Considerations

### Current Security Measures

1. **Environment Variables**
   - Sanity credentials in `.env.local`
   - Not committed to version control
   - Server-side only for write operations

2. **API Routes**
   - Write client used only in API routes (server-side)
   - Sanity write token never exposed to client

3. **Optional Password Protection**
   - Simple password gate for development/staging
   - Not suitable for production security
   - Basic authentication pattern

### Security Recommendations

1. **Production Readiness:**
   - Implement proper authentication (e.g., NextAuth.js)
   - Add rate limiting for API routes
   - Enable CORS restrictions
   - Add CSRF protection for forms

2. **Content Security:**
   - Sanitize user inputs (newsletter emails)
   - Validate Sanity content before rendering
   - Implement Content Security Policy (CSP) headers

3. **Monitoring:**
   - Add error tracking (e.g., Sentry)
   - Monitor API usage
   - Track Sanity API quota

---

## Performance Characteristics

**Lighthouse Scores (Target):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

**Optimization Strategies:**

1. **Image Optimization**
   - Next.js Image component with automatic optimization
   - WebP format support
   - Lazy loading below fold
   - Responsive srcsets

2. **Code Splitting**
   - Automatic route-based splitting
   - Dynamic imports for heavy components
   - Minimal initial JavaScript bundle

3. **Caching**
   - Sanity CDN for content delivery
   - Static asset caching (fonts, images)
   - Server-side caching for Sanity queries (potential)

4. **Rendering**
   - Server Components reduce client JS
   - SSR for fast first contentful paint
   - Streaming for progressive rendering

---

## Future Considerations

### Potential Enhancements

1. **Testing Infrastructure**
   - Add Jest + React Testing Library
   - Implement E2E tests with Playwright
   - Set up CI/CD pipeline for automated testing

2. **Performance Monitoring**
   - Integrate Web Vitals tracking
   - Add Real User Monitoring (RUM)
   - Performance budgets and alerts

3. **Feature Expansion**
   - Online ordering system
   - Loyalty program integration
   - Event booking system
   - Blog activation (post schema exists)

4. **Developer Experience**
   - Add Prettier for code formatting
   - Husky for pre-commit hooks
   - Conventional commits standard
   - Automated changelog generation

---

## Appendix

### Related Documentation
- [Source Tree Analysis](./source-tree-analysis.md) - Detailed directory structure
- [Development Guide](./development-guide.md) - Setup and workflow instructions
- [CLAUDE.md](../CLAUDE.md) - Comprehensive developer guide for Claude Code
- [README.md](../README.md) - Project overview

### External Resources
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-23
**Maintained By:** The Notebook Café Development Team
