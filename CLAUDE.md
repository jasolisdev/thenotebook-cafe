# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with The Notebook Café codebase.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Development Commands](#development-commands)
4. [Architecture & File Organization](#architecture--file-organization)
5. [Component Library](#component-library)
6. [Styling System](#styling-system)
7. [Content Management (Sanity)](#content-management-sanity)
8. [Key Technical Patterns](#key-technical-patterns)
9. [Development Guidelines](#development-guidelines)
10. [Recent Updates](#recent-updates)

---

## Project Overview

**The Notebook Café** is a Next.js 16 website for a Riverside-based coffee shop, using Sanity CMS for content management. The site features a public-facing website and an embedded CMS studio at `/studio`.

### Core Philosophy
- **Coffee culture meets creative community**
- **House music and soulful vibes**
- **Premium, minimal design aesthetic**
- **Mobile-first, responsive experience**

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16 |
| **Language** | TypeScript | Latest |
| **CMS** | Sanity | v4 |
| **Styling** | Custom CSS + Tailwind | Latest |
| **Fonts** | Alpino (display) + Torus (body) | Custom |
| **Icons** | Lucide React + React Icons | Latest |
| **Deployment** | Vercel | Latest |

---

## Development Commands

### Local Development
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

---

## Architecture & File Organization

### **Directory Structure**

```
thenotebook-cafe/
├── app/                              # Next.js App Router
│   ├── components/                   # React components (organized)
│   │   ├── layout/                   # Global layout components
│   │   │   ├── SiteHeader.tsx        # Navigation with mobile drawer
│   │   │   ├── SiteFooter.tsx        # Global footer
│   │   │   └── ScrollReveal.tsx      # Scroll animation system
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── AnnouncementBanner.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── features/                 # Page-specific features
│   │   │   ├── MenuContent.tsx       # Menu system with tabs
│   │   │   ├── MenuItemModal.tsx     # Item detail modal
│   │   │   ├── NewsletterForm.tsx    # Email subscription
│   │   │   ├── AtmosphereCarousel.tsx
│   │   │   ├── CardGallery.tsx
│   │   │   └── CoffeeDifferenceSection.tsx
│   │   └── decorative/               # Floating decorations
│   │       ├── HomeFloatingItems.tsx
│   │       ├── AboutFloatingItems.tsx
│   │       ├── EventsFloatingItems.tsx
│   │       └── MenuFloatingItems.tsx
│   ├── styles/                       # CSS organization
│   │   ├── components/               # Component-specific styles
│   │   │   ├── announcement.css
│   │   │   ├── buttons.css
│   │   │   ├── card-gallery.css
│   │   │   ├── footer.css
│   │   │   ├── hero.css
│   │   │   ├── modal.css
│   │   │   └── navigation.css
│   │   ├── layout/                   # Layout & structure
│   │   │   ├── animations.css
│   │   │   └── sections.css
│   │   └── pages/                    # Page-specific styles
│   │       ├── home.css
│   │       ├── menu.css
│   │       ├── about.css
│   │       └── events.css
│   ├── api/                          # API routes
│   │   ├── auth/verify/route.ts      # Password verification
│   │   └── subscribe/route.ts        # Newsletter subscription
│   ├── page.tsx                      # Homepage
│   ├── menu/page.tsx                 # Menu page
│   ├── story/page.tsx                # Story page (was /about)
│   ├── events/page.tsx               # Events page
│   ├── globals.css                   # Global styles & variables
│   ├── layout.tsx                    # Root layout
│   └── fonts.ts                      # Font configuration
├── sanity/                           # Sanity CMS
│   ├── schemaTypes/                  # Content schemas
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   ├── menuItem.ts
│   │   ├── settings.ts
│   │   ├── subscriber.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── client.ts                 # Read-only client (CDN)
│   │   ├── writeClient.ts            # Write client (mutations)
│   │   ├── image.ts                  # Image URL builder
│   │   └── live.ts                   # Live preview
│   ├── sanity.config.ts              # Sanity configuration
│   └── structure.ts                  # Studio structure
├── public/                           # Static assets
│   ├── fonts/                        # Alpino font files
│   ├── icons/                        # Menu category SVG icons
│   ├── unsplash/                     # Stock images
│   ├── hero-bg.png
│   ├── logo.png
│   └── notebook-divider-cream.svg
├── CLAUDE.md                         # This file
├── README.md                         # User-facing documentation
└── REFACTORING_SUMMARY.md            # Refactoring guide
```

---

## Component Library

### **Layout Components** (`app/components/layout/`)

#### SiteHeader
Global navigation header with responsive mobile drawer.

**Features:**
- Fixed announcement banner integration
- Desktop horizontal navigation (Home | Menu | Story | Events)
- Full-screen mobile overlay menu
- Active page highlighting
- Keyboard navigation (ESC to close drawer)
- Body scroll lock when drawer open
- Decorative floating coffee beans in drawer

**Props:**
```typescript
{
  instagramUrl?: string;
  spotifyUrl?: string;
  burgerUntil?: "sm" | "md" | "lg" | "xl";  // Breakpoint for mobile menu
  announcementText?: string;
}
```

**Usage:**
```tsx
import SiteHeader from '@/app/components/layout/SiteHeader';

<SiteHeader
  instagramUrl="https://www.instagram.com/thenotebookcafellc/"
  spotifyUrl="https://open.spotify.com/playlist/..."
/>
```

---

#### SiteFooter
Global footer with business information and navigation.

**Features:**
- Business address and phone
- Footer navigation links
- Copyright notice
- Optional floating decorative items

**Props:**
```typescript
{
  showFloatingItems?: boolean;
  FloatingItemsComponent?: React.ComponentType<{variant: string}>;
}
```

**Usage:**
```tsx
import SiteFooter from '@/app/components/layout/SiteFooter';
import HomeFloatingItems from '@/app/components/decorative/HomeFloatingItems';

// Basic footer
<SiteFooter />

// With decorations
<SiteFooter showFloatingItems={true} FloatingItemsComponent={HomeFloatingItems} />
```

---

#### ScrollReveal
Manages scroll-triggered animations using Intersection Observer API.

**Features:**
- Detects `.scroll-reveal` class elements
- Adds `.is-visible` class when entering viewport
- Different behavior for above-fold vs below-fold
- Watches for dynamically added elements
- Triggers 50px before viewport entry

**Usage:**
```tsx
import ScrollReveal from '@/app/components/layout/ScrollReveal';

export default function Page() {
  return (
    <main>
      <ScrollReveal />
      <div className="scroll-reveal">
        Animates when scrolled into view
      </div>
    </main>
  );
}
```

---

### **UI Components** (`app/components/ui/`)

#### AnnouncementBanner
Sticky banner at top of all pages with animated coffee cups.

**Features:**
- Fixed positioning (z-index: 50)
- Gold gradient background
- Animated steam from coffee cups (2s loop)
- Responsive spacing
- Client-side hydration handling

**Props:**
```typescript
{
  text?: string;  // Default: "Grand Opening 2026"
}
```

---

### **Feature Components** (`app/components/features/`)

#### MenuContent
Tab navigation and menu item display system.

**Features:**
- Tab navigation (Drinks | Meals | Desserts)
- Two-column grid layout with card design
- Seasonal drinks section
- Modal integration for item details
- Scroll-to-top button
- Hardcoded menu data (MENU_DRINKS, MENU_MEALS, MENU_DESSERTS, MENU_SEASONAL)

---

#### NewsletterForm
Email subscription form with Sanity CMS integration.

**Features:**
- Email validation
- Duplicate detection
- Success/error states
- API integration (`/api/subscribe`)
- Creates subscriber documents in Sanity

---

#### AtmosphereCarousel
Horizontal image carousel with tilted card animations.

**Features:**
- Responsive horizontal scroll
- Tilted card animations (-6°, 8°, -7°)
- Card number badges
- Stack-to-spread animation on scroll reveal

---

### **Decorative Components** (`app/components/decorative/`)

#### HomeFloatingItems
Homepage floating decorations (coffee beans, plants).

**Variants:**
- `hero` - Hero section decorations (2 coffee beans)
- `welcome` - Welcome section (3 items: beans + plant)
- `cards` - Info cards section (4 coffee beans at corners)
- `footer` - Footer decorations (dark variants)

**Features:**
- Absolutely positioned (scroll naturally)
- Continuous float animations
- Different durations for organic feel (8s, 9s, 10s)
- Responsive sizing

**Usage:**
```tsx
import HomeFloatingItems from '@/app/components/decorative/HomeFloatingItems';

<section className="relative">
  <HomeFloatingItems variant="hero" />
  {/* Section content */}
</section>
```

---

## Styling System

### **Design Tokens**

#### Typography
```css
--font-sans: "Torus", system-ui, sans-serif;      /* Body text */
--font-display: "Alpino", "Torus", sans-serif;    /* Headings */
```

**Usage:**
- **Display Font (Alpino)**: All h1, h2, h3, branding, hero text
- **Body Font (Torus)**: Paragraphs, navigation, UI elements

#### Color Palette

**Tailwind v4 Configuration:**
The site uses Tailwind CSS v4 with colors registered via the `@theme` directive in `globals.css`:

```css
/* Tailwind v4 Theme - generates bg-cafe-*, text-cafe-* utilities */
@theme {
  --color-cafe-black: #2C2420;    /* Dark brown, primary text */
  --color-cafe-brown: #4A3B32;    /* Medium brown, body text */
  --color-cafe-tan: #A48D78;      /* Gold/tan accent color */
  --color-cafe-beige: #CBB9A4;    /* Beige for borders/muted elements */
  --color-cafe-cream: #EDE7D8;    /* Light cream backgrounds */
  --color-cafe-mist: #F4F1EA;     /* Lightest warm background */
  --color-cafe-white: #FAF9F6;    /* Off-white, main background */
  --color-cafe-red: #ef4444;      /* Danger/delete actions */
}
```

**CSS Variables** (for inline styles):
```css
/* Core palette */
--cafe-black: #2C2420;
--cafe-brown: #4A3B32;
--cafe-tan: #A48D78;
--cafe-beige: #CBB9A4;
--cafe-cream: #EDE7D8;
--cafe-mist: #F4F1EA;
--cafe-white: #FAF9F6;

/* Extended palette */
--espresso-brown: #2a1f16;
--warm-brown: #5a4a38;
--gold-primary: #c99a58;

/* Semantic tokens */
--bg-solid: var(--cafe-white);
--bg-dark: var(--cafe-black);
--bg-cream: var(--cafe-cream);
--text-dark: var(--cafe-brown);
--text-light: var(--cafe-mist);
```

#### Responsive Breakpoints
```css
/* Mobile */
320px   /* Base mobile (iPhone SE) */
375px   /* Standard mobile */

/* Tablet */
640px   /* sm: Tablet portrait */
768px   /* md: Tablet landscape */

/* Desktop */
1024px  /* lg: Desktop */
1280px  /* xl: Large desktop */
```

---

### **CSS Architecture**

#### Visual Rhythm: Alternating Background Pattern

The homepage uses an intentional alternating background pattern to create visual flow and guide the user's eye:

**Homepage Section Flow:**
1. **Hero** - `cafe-mist` - Warm welcome
2. **Signature Pours** - `cafe-white` - Clean product showcase
3. **Our Philosophy** - `cafe-mist` + skewed cream accent (right) - Premium layered
4. **Low Lights** - `cafe-cream` + skewed mist accent (left) - Inverted warmth
5. **Trinity** - `cafe-white` - Breathing room
6. **Atmosphere** - `cafe-mist` + skewed cream accent (bottom) - Echoes philosophy
7. **Atmosphere Images** - `cafe-white` - Clean transition
8. **Newsletter** - Light tan tint - Warm close

**Design Principle:**
- Alternating warm/clean creates natural scroll rhythm
- Skewed decorative elements vary in direction (right, left, bottom) for dynamic interest
- Warm sections feel intimate and story-driven
- White sections provide visual breathing room
- Mirrors the layered aesthetic of coffee (crema, espresso, milk)

**Example Pattern:**
```tsx
<section
  className="relative overflow-visible py-24 px-6"
  style={{ backgroundColor: 'var(--cafe-cream)' }}
>
  <div className="absolute top-0 left-0 w-1/3 h-full bg-cafe-mist/40 skew-x-12 -translate-x-1/4 pointer-events-none"></div>
  {/* Content */}
</section>
```

#### Global Utility Classes

```css
/* Layout */
.site-layout          /* Main page container */
.section-cream        /* Light/cream section background */
.section-dark         /* Dark section background */

/* Typography */
.text-light           /* Light text on dark backgrounds */
.text-light-muted     /* Muted light text */
.font-display         /* Alpino display font */

/* Visibility */
.sr-only              /* Screen reader only (hidden visually) */
```

---

### **Animation System**

#### Scroll Reveal
```css
.scroll-reveal {
  opacity: 0;
  transform: scale(0.95);
}

.scroll-reveal.is-visible:not(.above-fold) {
  animation: scrollReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.scroll-reveal.is-visible.above-fold {
  animation: fadeInQuick 0.3s ease-out forwards;
}
```

**Usage:**
```tsx
<div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
  Content fades in when scrolled into view
</div>
```

---

## Content Management (Sanity)

### **Two Client Pattern**

**Read Client** (`sanity/lib/client.ts`):
- CDN-enabled for fast public data fetching
- Used in all page components
- No authentication required

**Write Client** (`sanity/lib/writeClient.ts`):
- Authenticated with `SANITY_WRITE_TOKEN`
- Only used in API routes (newsletter, mutations)
- Keeps token server-side for security

---

### **Content Schemas**

#### homePage
Controls homepage content.

**Fields:**
- `heroHeadline` - Main hero title (hidden, logo shown instead)
- `heroTagline` - "Where Every Sip Tells a Story"
- `whatToExpectBullets` - Array of 3 highlights
- `vibeCopy` - Quote text below highlights

**Fetch Example:**
```typescript
const home = await client.fetch(`
  *[_type=="homePage"][0]{
    heroHeadline, heroTagline, statusLine, ctaText, ctaUrl,
    whatToExpectBullets, vibeCopy
  }
`);
```

---

#### aboutPage
About/Story page content.

**Fields:**
- `title` - Page title
- `body` - Portable text (story/intro)
- `valuesBullets` - Array of café values
- `founderNote` - Mission statement

---

#### menuItem
Menu system items.

**Fields:**
- `section` - "drinks" | "meals" | "desserts"
- `category` - Icon type (espresso, latte, cold-brew, tea, food, seasonal)
- `name` - Item name
- `description` - Item description
- `price` - Price (string, e.g., "4.50")
- `sortOrder` - Display order (lower = first)
- `imageUrl` - Optional custom image

**Note:** Menu is currently hardcoded in `MenuContent.tsx`. Sanity schema exists for future integration.

---

#### settings
Global site configuration.

**Fields:**
- `social.instagram` - Instagram URL
- `social.spotify` - Spotify playlist URL
- `hours.weekday` - Weekday hours
- `hours.weekend` - Weekend hours
- `address` - Business address

---

#### subscriber
Newsletter subscriber data.

**Fields:**
- `email` - Subscriber email
- `source` - Source page ("homepage", "footer", etc.)
- `subscribedAt` - Timestamp

**Created via:** `/api/subscribe` endpoint

---

## Key Technical Patterns

### **Server Components (Default)**
All pages use async Server Components for data fetching.

```typescript
export default async function HomePage() {
  const data = await client.fetch(`*[_type=="homePage"][0]{ ... }`);
  return <main>...</main>;
}
```

---

### **Client Components**
Mark with `"use client"` directive when using:
- React hooks (useState, useEffect)
- Browser APIs (window, document)
- Event handlers (onClick, onChange)
- Third-party interactive libraries

**Examples:** SiteHeader, MenuContent, NewsletterForm, ScrollReveal

---

### **Image Optimization**
```tsx
import Image from "next/image";

// Next.js Image with Sanity CDN
<Image
  src={imageUrl}
  alt="Description"
  width={800}
  height={600}
  priority  // For above-fold images
/>
```

**Configuration** (`next.config.ts`):
```typescript
images: {
  remotePatterns: [
    { hostname: 'cdn.sanity.io' },
    { hostname: 'images.unsplash.com' },
  ],
}
```

---

### **Scroll Animations**
```tsx
// 1. Include ScrollReveal once per page
<ScrollReveal />

// 2. Add .scroll-reveal class to animating elements
<div className="scroll-reveal">Content</div>

// 3. Optional staggered delays
<div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
  First item
</div>
<div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
  Second item
</div>
```

---

### **Mobile Navigation**
- **Desktop (640px+)**: Horizontal nav bar
- **Mobile (< 640px)**: Full-screen overlay

**Behavior:**
- Opens: Hamburger icon click
- Closes: X button, ESC key, route change
- Body scroll: Locked when open
- Animation: 0.4s fade + scale

---

### **Newsletter Flow**
1. User enters email in `NewsletterForm`
2. Client-side validation
3. POST to `/api/subscribe`
4. Server checks for duplicates in Sanity
5. Creates subscriber document (writeClient)
6. Returns success/duplicate/error status
7. Form shows appropriate message

---

## Development Guidelines

### **CSS Organization**
- Component styles → `app/styles/components/`
- Page styles → `app/styles/pages/`
- Use existing classes before creating new ones
- Follow mobile-first responsive approach
- Use semantic class names (no `.test-*`, `.temp-*`)

### **Naming Conventions**

**CSS Classes:** kebab-case
```css
.site-header
.hero-title
.welcome-card
.text-light
```

**Components:** PascalCase
```tsx
SiteHeader
MenuContent
NewsletterForm
```

**Files:**
- Components: PascalCase (`SiteHeader.tsx`)
- Styles: kebab-case (`navigation.css`)
- Utils: camelCase (`imageUtils.ts`)

### **Import Paths**
Use absolute imports with `@` alias:
```typescript
// ✅ Good
import SiteHeader from '@/app/components/layout/SiteHeader';
import { client } from '@/sanity/lib/client';

// ❌ Avoid
import SiteHeader from '../../components/layout/SiteHeader';
```

### **Documentation Standards**

All components must include JSDoc:
```typescript
/**
 * ComponentName Component
 *
 * Brief description of purpose.
 *
 * @component
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 *
 * @param {PropType} props - Component props
 * @returns {JSX.Element} Rendered component
 */
```

### **Git Workflow**
- Work in feature branches
- Commit with descriptive messages
- Merge to `master` when ready for production
- Test thoroughly before deploying

---

## Recent Updates

### **December 2025 - Tailwind v4 Migration & Visual Rhythm**
- ✅ Fixed Tailwind v4 color generation using `@theme` directive
- ✅ Registered all cafe-* colors for proper utility class generation
- ✅ Implemented alternating background pattern for visual flow
- ✅ Added directional skewed accent elements (right, left, bottom)
- ✅ Updated navbar to cafe-mist/85 with tan border for cohesion
- ✅ Fixed cart delete button visibility (always visible, theme color)
- ✅ Increased navbar logo by 5% and "Café" text by 10%
- ✅ Created systematic color documentation in COLORS.ts

### **November 2025 - Major Refactoring**
- ✅ Reorganized components into `layout/`, `ui/`, `features/`, `decorative/`
- ✅ Renamed confusing classes (`.page-dark` → `.site-layout`, `.ink-cream` → `.text-light`)
- ✅ Added comprehensive JSDoc documentation to all components
- ✅ Cleaned up test artifacts and legacy code
- ✅ Updated CSS with semantic variable names
- ✅ Created refactoring summary documentation

### **January 2025 - Navigation & Atmosphere Polish**
- Updated announcement banner integration
- Redesigned navbar with PNG logo
- Enhanced mobile drawer (full-screen overlay)
- Fixed atmosphere carousel animation
- Removed debug borders and test classes

### **December 2024 - Mobile Optimization**
- iPhone 5/SE support (320px+ screens)
- Responsive padding scales (40px → 100px)
- Enhanced announcement banner
- Full-screen mobile navigation
- Footer redesign

---

## Environment Variables

Required in `.env.local`:
```bash
# Sanity CMS (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token

# Optional: Password Protection
SITE_PASSWORD=  # Leave empty to disable
```

**Important:** Environment variables require server restart to take effect.

---

## Deployment

**Platform:** Vercel

**Build Command:** `npm run build`

**Environment Variables:** Set in Vercel project settings

**Branches:**
- `master` - Production (stable releases)
- Feature branches - Active development

---

## Support & Resources

- **REFACTORING_SUMMARY.md** - Complete refactoring guide
- **README.md** - User-facing documentation
- **CLAUDE.md** (this file) - Developer guide

© The Notebook Café LLC — All rights reserved
