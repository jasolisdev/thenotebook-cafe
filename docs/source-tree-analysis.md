# Source Tree Analysis
**The Notebook Café - Project Structure**

Generated: 2025-11-23
Project Type: Web Application (Next.js 16 + Sanity CMS)
Scan Level: Quick

---

## Annotated Directory Tree

```
thenotebook-cafe/                    # 🏠 Project Root
│
├── app/                             # ⚡ Next.js App Router (PRIMARY ENTRY POINT)
│   ├── layout.tsx                   # 🎯 Root layout (wraps all pages)
│   ├── page.tsx                     # 🎯 Homepage route (/)
│   ├── globals.css                  # Global styles and CSS variables
│   ├── fonts.ts                     # Custom font configuration (Alpino, Torus)
│   │
│   ├── api/                         # 🌐 API Routes (Next.js serverless functions)
│   │   ├── subscribe/
│   │   │   └── route.ts             # POST /api/subscribe - Newsletter subscription
│   │   └── auth/
│   │       └── verify/
│   │           └── route.ts         # POST /api/auth/verify - Password verification
│   │
│   ├── components/                  # 🧩 React Components (organized architecture)
│   │   ├── layout/                  # Layout components (global structure)
│   │   │   ├── SiteHeader.tsx       # Global navigation with mobile drawer
│   │   │   ├── SiteFooter.tsx       # Global footer
│   │   │   ├── ScrollReveal.tsx     # Scroll animation system
│   │   │   └── PageTransition.tsx   # Page transition animations
│   │   │
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── AnnouncementBanner.tsx   # Sticky top banner
│   │   │   ├── SectionCard.tsx      # Card component
│   │   │   ├── BulletList.tsx       # Styled bullet lists
│   │   │   ├── PasswordGate.tsx     # Password protection UI
│   │   │   ├── NotebookPage.tsx     # Page wrapper component
│   │   │   ├── SectionHeading.tsx   # Section headers
│   │   │   └── Icons.tsx            # Icon components
│   │   │
│   │   ├── features/                # Feature-specific components
│   │   │   ├── MenuContent.tsx      # Menu tab navigation & display
│   │   │   ├── MenuItemModal.tsx    # Menu item detail modal
│   │   │   ├── NewsLetterForm.tsx   # Email subscription form
│   │   │   ├── AtmosphereCarousel.tsx   # Image carousel
│   │   │   ├── BlogPosts.tsx        # Blog post display
│   │   │   ├── CardGallery.tsx      # Info card gallery
│   │   │   └── CoffeeDifferenceSection.tsx  # Feature section
│   │   │
│   │   └── decorative/              # Decorative elements
│   │       ├── HomeFloatingItems.tsx    # Homepage floating decorations
│   │       ├── AboutFloatingItems.tsx   # About page decorations
│   │       ├── EventsFloatingItems.tsx  # Events page decorations
│   │       └── FloatingItems.tsx    # Generic floating items
│   │
│   ├── menu/                        # 📄 Menu Page Route
│   │   └── page.tsx                 # Menu page (/menu)
│   │
│   ├── story/                       # 📄 Story Page Route (was /about)
│   │   └── page.tsx                 # Story page (/story)
│   │
│   ├── events/                      # 📄 Events Page Route
│   │   └── page.tsx                 # Events page (/events)
│   │
│   ├── studio/                      # 🎨 Sanity Studio Route
│   │   └── [[...tool]]/             # Embedded CMS at /studio
│   │       └── page.tsx             # Sanity Studio UI
│   │
│   ├── styles/                      # 🎨 CSS Organization
│   │   ├── components/              # Component-specific styles
│   │   │   ├── announcement.css
│   │   │   ├── buttons.css
│   │   │   ├── card-gallery.css
│   │   │   ├── footer.css
│   │   │   ├── hero.css
│   │   │   ├── modal.css
│   │   │   └── navigation.css
│   │   ├── layout/                  # Layout & structure styles
│   │   │   ├── animations.css
│   │   │   └── sections.css
│   │   └── pages/                   # Page-specific styles
│   │       ├── home.css
│   │       ├── menu.css
│   │       ├── about.css
│   │       └── events.css
│   │
│   ├── hooks/                       # ⚙️ Custom React Hooks
│   │   └── useScrollDirection.ts    # Scroll direction detection hook
│   │
│   ├── lib/                         # 🛠️ Utility Libraries
│   │   └── blur.ts                  # Image blur utilities
│   │
│   ├── not-found.tsx                # 404 error page
│   ├── robots.ts                    # SEO robots configuration
│   └── sitemap.ts                   # SEO sitemap generation
│
├── sanity/                          # 📊 Sanity CMS Configuration
│   ├── sanity.config.ts             # 🎯 Sanity configuration
│   ├── structure.ts                 # Studio structure customization
│   │
│   ├── schemaTypes/                 # Content schemas (data models)
│   │   ├── index.ts                 # Schema registry
│   │   ├── homePage.ts              # Homepage content schema
│   │   ├── aboutPage.ts             # About page content schema
│   │   ├── menuItem.ts              # Menu item schema
│   │   ├── subscriber.ts            # Newsletter subscriber schema
│   │   ├── settings.ts              # Global site settings schema
│   │   └── post.ts                  # Blog post schema (future)
│   │
│   └── lib/                         # Sanity client libraries
│       ├── client.ts                # Read-only client (CDN)
│       ├── writeClient.ts           # Write client (mutations)
│       ├── image.ts                 # Image URL builder
│       └── live.ts                  # Live preview utilities
│
├── public/                          # 📁 Static Assets
│   ├── fonts/                       # Custom web fonts
│   │   ├── Alpino-*.otf             # Display font (headings)
│   │   └── Torus-*.otf              # Body font
│   ├── menu/                        # Menu item images (19 images)
│   │   ├── cappuccino.jpg
│   │   ├── avocado-toast.jpg
│   │   └── ... (17 more)
│   ├── icons/                       # SVG icons
│   ├── logo.png                     # Site logo
│   ├── hero-bg.png                  # Hero background image
│   └── notebook-divider-cream.svg   # Section divider graphic
│
├── docs/                            # 📚 Project Documentation
│   ├── bmm-workflow-status.yaml     # BMAD workflow tracking
│   ├── project-scan-report.json     # Current scan state
│   └── sprint-artifacts/            # Sprint planning artifacts
│
├── .bmad/                           # 🤖 BMAD System Configuration
│   ├── bmm/                         # Boring Method of Agile Development
│   │   ├── config.yaml              # BMAD configuration
│   │   ├── workflows/               # Workflow definitions
│   │   └── agents/                  # Agent configurations
│   └── core/                        # BMAD core system files
│
├── CLAUDE.md                        # 📖 Claude Code project instructions (24KB)
├── README.md                        # 📖 Main project documentation
├── REFACTORING_SUMMARY.md           # 📖 Refactoring history and guide
├── CSS_ORGANIZATION.md              # 📖 CSS architecture documentation
│
├── package.json                     # 📦 Node.js dependencies
├── tsconfig.json                    # ⚙️ TypeScript configuration
├── next.config.ts                   # ⚙️ Next.js configuration
├── tailwind.config.ts               # ⚙️ Tailwind CSS configuration
├── sanity.cli.ts                    # ⚙️ Sanity CLI configuration
├── eslint.config.mjs                # ⚙️ ESLint configuration
├── postcss.config.mjs               # ⚙️ PostCSS configuration
└── .env.local                       # 🔒 Environment variables (git-ignored)
```

---

## Entry Points

### Primary Entry Points
1. **`app/layout.tsx`** - Root layout wrapping all pages
2. **`app/page.tsx`** - Homepage (/) - First page users see
3. **`sanity/sanity.config.ts`** - Sanity Studio configuration

### Route Entry Points
- **`app/menu/page.tsx`** - Menu page (/menu)
- **`app/story/page.tsx`** - Story page (/story)
- **`app/events/page.tsx`** - Events page (/events)
- **`app/studio/[[...tool]]/page.tsx`** - Sanity Studio (/studio)

### API Entry Points
- **`app/api/subscribe/route.ts`** - Newsletter subscription API
- **`app/api/auth/verify/route.ts`** - Password verification API

---

## Critical Directories Explained

### `/app` Directory
**Purpose:** Next.js 16 App Router - Main application code
**Pattern:** File-system based routing
**Contains:** Pages, components, API routes, styles, utilities

### `/app/components` Directory
**Purpose:** React component library (organized architecture)
**Organization:**
- `layout/` - Global layout components (header, footer, scroll)
- `ui/` - Reusable UI primitives (buttons, cards, banners)
- `features/` - Feature-specific components (menu, newsletter, carousel)
- `decorative/` - Visual enhancement components (floating items)

### `/app/styles` Directory
**Purpose:** CSS architecture (mobile-first, organized)
**Organization:**
- `components/` - Component-specific styles
- `layout/` - Layout and structural styles
- `pages/` - Page-specific styles

### `/sanity` Directory
**Purpose:** Sanity CMS configuration and schemas
**Key Files:**
- `schemaTypes/` - Content model definitions (7 schemas)
- `lib/client.ts` - Read-only Sanity client (CDN-enabled)
- `lib/writeClient.ts` - Write client for mutations (server-only)

### `/public` Directory
**Purpose:** Static assets served directly
**Contains:** Fonts, images, icons, menu photos (19 images)

---

## Architecture Highlights

**Rendering Strategy:** Server Components by default, Client Components for interactivity
**Data Fetching:** Server-side via Sanity CMS client
**Routing:** File-system based (Next.js App Router)
**Styling:** Hybrid approach (Tailwind + Custom CSS + CSS-in-JS)
**CMS Integration:** Embedded Sanity Studio at `/studio`

**Component Organization:** 4-tier hierarchy (layout → ui → features → decorative)
**CSS Organization:** 3-tier structure (components → layout → pages)

---

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Runtime | React 19 |
| CMS | Sanity 4.11 |
| Styling | Tailwind CSS 4.1 + Custom CSS |
| Animations | Framer Motion 12 |
| Icons | Lucide React + React Icons |

---

**Total Components:** 31
**Total API Routes:** 2
**Total Data Schemas:** 7
**Total Pages:** 4 (Home, Menu, Story, Events)
