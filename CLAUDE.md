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
- `menuItem.ts` - Menu items with section (drinks/meals/desserts), category, price, description, and icon
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
- **Typography**:
  - Torus (body text) loaded via `app/fonts.ts`
  - Alpino (display font for all headings h1, h2, h3) loaded via `@font-face` in `globals.css`
  - Font files located in `/public/fonts/`
- Responsive design with mobile-first approach
- Custom CSS classes with theme-specific styling in `globals.css`
- **Color sections**:
  - Dark sections use `--bg-solid` (#0f0c0a)
  - Cream sections use `#f4f0e9` background
  - Wavy divider transitions (`divider-cream.png`) between sections

### Image Handling
- Next.js Image component with Sanity CDN optimization
- Remote pattern configured for `cdn.sanity.io` in `next.config.ts`
- Sanity image URL builder in `sanity/lib/image.ts`
- Hero background: `/public/hero-bg.png`
- Wavy divider: `/public/notebook-divider-cream.svg` (can be inverted with `transform: scaleY(-1)`)

### Page Layout Structure

**Homepage (`/`)**
1. Hero section with background image (`hero-bg.png`) and dark overlay
2. Wavy divider transition to cream section
3. Cream section with "Welcome" heading and "What to Expect" content
4. Inverted wavy divider back to dark section
5. Info cards grid (4 cards in dark section)
6. Newsletter signup
7. Footer

**Menu Page (`/menu`)**
1. Navigation spacer
2. Cream section with full menu content
3. Tab navigation (Drinks/Meals/Desserts) - defaults to Drinks
4. Two-column grid of menu items with icons and dotted price lines
5. Inverted wavy divider to dark footer
6. Footer

**About Page (`/about`)**
- Dark page with hero, body text, values grid, and mission card

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token  # Only needed for mutations (newsletter, etc.)

# Optional: Site Password Protection (for development/preview)
SITE_PASSWORD=  # Leave empty to disable, or set a password to enable protection
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

**Key Client Components:**
- `MenuContent` - Client component with tab state management for drinks/meals/desserts
  - Splits menu items into two columns for desktop layout
  - Filters items by selected tab (section field in Sanity)
  - Shows icon, name with dotted line to price, and description
- `ScrollReveal` - Client component using Intersection Observer
  - Must be included once per page
  - Observes all `.scroll-reveal` elements and adds `.is-visible` class when in viewport
- `SiteHeader` - Client component with mobile drawer navigation
  - Mobile menu slides down from navbar (not from side)
  - Burger icon animates to X when open

### Styling Pattern
The site uses a "light paper" aesthetic with custom CSS classes prefixed by component/section:
- `home-*` for homepage-specific styles
- `about-*` for about page styles
- `menu-*` for menu page styles
- `ink-cream` and `ink-cream-dim` for text colors on dark backgrounds
- Glass morphism effects for navigation
- `scroll-reveal` class triggers animations when elements enter viewport (powered by Intersection Observer)

**Animation System:**
- Scroll-triggered animations use Intersection Observer API
- Elements with `.scroll-reveal` class fade in with scale and translateY effect
- Staggered delays can be applied via inline `style={{ animationDelay: '...' }}`
- Mobile navigation slides down from top of navbar (not from side)

## Important Patterns & Conventions

### Adding New Pages
1. Create route in `app/[pagename]/page.tsx`
2. Add `ScrollReveal` component to enable scroll animations
3. Add navigation link to `SiteHeader.tsx` (both desktop nav and mobile drawer)
4. Use `.scroll-reveal` class on elements that should animate on scroll
5. Apply staggered delays with inline styles: `style={{ animationDelay: '0.1s' }}`

### Section Background Pattern
- Use `section-cream` class for cream background sections
- Use `section-dark` class for dark background sections
- Use `divider-cream` with inverted transform to transition between sections:
  ```tsx
  <div className="divider-cream" style={{ transform: 'scaleY(-1)' }}>
    <img src="/notebook-divider-cream.svg" alt="" />
  </div>
  ```

### Menu Items in Sanity
- **Required fields**: `section` (drinks/meals/desserts), `name`
- **Optional fields**: `description`, `price`, `category`, `image`, `sortOrder`
- Menu items automatically grouped by section in the menu page
- **Category field** determines which SVG icon displays (if no image uploaded)
- **Image field**: Upload custom image for menu item (takes priority over category icon)
- **sortOrder field**: Controls display order (lower numbers appear first)
- Price should be entered as string (e.g., "3.25" or "4.95")

### Menu System Features
**Category Icons:**
- Menu items use SVG icons stored in `/public/icons/`
- Required SVG files: `espresso.svg`, `latte.svg`, `cold-brew.svg`, `tea.svg`, `food.svg`, `seasonal.svg`
- Icons display at 24x24px (mobile) / 32x32px (desktop) inside rounded beige containers
- If no image is uploaded, category SVG displays automatically
- If no category is set, section-based fallback is used

**Specialty/Seasonal Drinks Section:**
- Items with `category: "seasonal"` appear in separate section below regular drinks
- Only displays on Drinks tab when seasonal items exist
- Separate heading: "SPECIALTY/SEASONAL DRINKS"
- Same two-column grid layout as regular menu items

**Tab Navigation:**
- Three tabs: Drinks, Meals, Desserts
- Uses state management with `renderKey` to force fresh renders on tab switches
- Each tab click increments render key to prevent React from reusing stale DOM elements
- Menu items have unique keys: `${activeTab}-${position}-${item.name}-${idx}`

**Menu Item Animation:**
- Smooth 0.8s fade-in animation with slide-up and scale effects
- Uses `cubic-bezier(0.16, 1, 0.3, 1)` easing for premium feel
- Staggered delays: 0.12s between each item for cascade effect
- Animation defined in `.menu-item-card` class in `globals.css`

**Mobile Responsive Design:**
- Icon boxes: 48x48px (mobile) → 56x56px (tablet+)
- Text sizes scale responsively across breakpoints
- Mobile: Name and price stack vertically, no dotted line
- Desktop: Name, dotted line, and price display inline
- Item names wrap on mobile, truncate on desktop if needed

## Password Protection (Development Mode)

The site supports optional password protection for development/preview:

**Setup:**
Add to `.env.local`:
```
SITE_PASSWORD=your_password_here
```

**How it works:**
- `middleware.ts` - Checks authentication cookie on all routes except `/studio`
- `app/layout.tsx` - Shows `PasswordGate` component when password is set and user not authenticated
- `app/api/auth/verify/route.ts` - Validates password and sets HTTP-only cookie (7-day expiration)
- `app/components/PasswordGate.tsx` - Password entry UI matching site aesthetic

**To disable:** Remove or leave `SITE_PASSWORD` empty in `.env.local`

## Recent Updates & Changes

### November 2024 - Design System Overhaul

#### **Floating SVG Decoration System**
A comprehensive floating decoration system was implemented across all sections using `HomeFloatingItems` and `FloatingItems` components:

**Component Architecture:**
- `app/components/HomeFloatingItems.tsx` - Homepage decorations with 4 variants: "hero", "welcome", "cards", "footer"
- `app/components/FloatingItems.tsx` - Menu page decorations
- All use `position: absolute` to scroll naturally with content (not fixed to viewport)
- SVGs have continuous float animations with different durations for organic feel

**Homepage Decorations:**
- **Hero Section**: 2 coffee beans (left bottom, right top) with gentle float animations
- **Welcome Section**: 3 items - coffee bean (up-left), coffee bean (bottom-right), coffee plant (bottom-left)
- **Cards Section**: 4 coffee beans positioned at all corners with staggered animations
- **Footer Section**: 3 dark-themed items - flower, left coffee bean, right coffee bean (uses `*-dark.svg` variants)

**Menu Page Decorations:**
- Coffee cup SVG (right side, 350-450px)
- Left coffee bean (120px, top-left)
- Right coffee bean (100px, bottom-right)
- Each with independent float animations (8s, 9s, 10s)

**CSS Implementation:**
- Each decoration has custom positioning, rotation, and animation
- Keyframes defined for each item type (e.g., `floatHeroBean1`, `floatCardsBean2`)
- Responsive sizing with media queries (smaller on mobile)
- Opacity set to 1 by default, animations run continuously
- All use `cubic-bezier` easing for smooth motion

#### **Hero Section Complete Redesign**
The hero section was completely rebuilt for maximum impact and sophistication:

**Typography System:**
- **Main Title** (`.hero-title`): Alpino, 42-72px (clamp), bold, -0.02em letter-spacing
- **Tagline** (`.hero-tagline`): Torus Light 300, 20-28px, 0.02em spacing
- **Description** (`.hero-description`): Torus, 15-17px, max-width 650px, 85% opacity
- All use staggered fadeInUp animations (0.1s, 0.2s, 0.3s, 0.4s, 0.5s, 0.6s delays)

**Content Structure:**
```tsx
1. Main Title: "The Notebook Café"
2. Tagline: "Where Every Sip Tells a Story"
3. Decorative Divider: (—•—) with gold accent
4. Description: "A curated space where specialty coffee meets vibrant culture..."
5. Primary CTA: "Follow Our Journey" with arrow icon
6. Badge: "✦ Opening Fall 2025 ✦" with pulsing sparkles
```

**CTA Button Design** (`.hero-cta-button`):
- Gold background (rgba(201,154,88,1)) with dark text
- Pill shape (50px border-radius)
- Arrow SVG that slides right on hover
- Lift effect: translateY(-2px) with enhanced shadow
- All transitions use cubic-bezier(0.4, 0, 0.2, 1)

**Badge Design** (`.hero-badge`):
- Semi-transparent background with gold border
- Sparkle icons (✦) with 3s pulse animation
- Uppercase, letter-spaced text
- Backdrop blur for glass effect

**Layout:**
- Max-width: 900px container
- Center-aligned for optimal hero presentation
- Vertical spacing: 20px, 32px, 48px, 24px rhythm

#### **Welcome Section Enhancement**
Complete redesign of "What to Expect" section with card-based layout:

**Section Label:**
- Horizontal dividers with gold gradient on both sides
- Centered label text (12px, uppercase, 0.15em letter-spacing)
- Class: `.welcome-section-label`

**Card Grid System:**
- 3-column grid on desktop, 1-column on mobile
- Each card (`.welcome-highlight-card`):
  - Semi-transparent white background (rgba(255,255,255,0.4))
  - 16px border-radius
  - Hover: lifts 4px, brightens background
  - Contains icon + text

**Custom Animated Icons:**
1. **Coffee Cup with Steam** (Index 0):
   - SVG cup with 3 CSS-animated steam wisps
   - Steam rises 16px, fades in/out over 2s
   - Staggered delays (0s, 0.4s, 0.8s)
   - Keyframe: `@keyframes steam-rise`

2. **Music Notes** (Index 1):
   - 2 music note SVGs with float animation
   - Bounce 6px up/down over 2s
   - Second note offset by 0.5s for rhythm
   - Keyframe: `@keyframes music-float`

3. **Notebook with Pen** (Index 2):
   - Notebook SVG with animated pen
   - Pen moves in writing motion (±2px, ±5deg rotation)
   - 3s loop with opacity changes
   - Keyframe: `@keyframes pen-write`

**Icon Wrapper:**
- 56px circular container
- Gold background and border
- Scales to 1.05 on card hover
- Icons intensify color on hover

**Vibe Quote Section:**
- Large decorative quotation marks (72px, Georgia serif)
- Alpino italic font for quote text
- Centered layout with 700px max-width
- Quote marks positioned absolutely (top-left, bottom-right rotated)

**CTA Button** (`.welcome-cta-button`):
- Dark background (#2a1f16) for high contrast on cream
- Cream text (#f4f0e9)
- Hover: transforms to gold background with dark text
- Arrow icon with slide-right animation
- High visibility on light background (WCAG compliant)

#### **Menu Page Improvements**
**Padding Adjustments:**
- Menu header: Added `pt-12` (48px top padding)
- Specialty drinks section: Added `pb-12` (48px bottom padding)

**Menu Item Animations:**
- Changed from staggered cascade to simultaneous load
- All items: 0.6s zoom animation (scale 0.92 → 1.0)
- No individual delays for cleaner, faster appearance
- Keyframe: `@keyframes menuItemFadeIn`

**Floating Items Behavior:**
- Position changed from `fixed` to `absolute`
- Items now scroll naturally with page content
- Stay within section boundaries
- Continue gentle float animations

#### **Password Protection Notes**
**Important:** Environment variables require server restart to take effect.
- Cookie duration: 7 days (can be reduced to 60s for testing)
- To test: Clear `site-auth` cookie in DevTools → Application → Cookies
- Production: Use full 7-day duration for better UX

### December 2024 - Mobile Optimization & UI Enhancements

#### **iPhone 5/SE Support (320px+ Screens)**
Comprehensive responsive design overhaul to support small devices:
- **Section Padding**: Responsive padding scales from 40px (320px) → 60px (375px) → 80px (640px) → 100px (1024px)
- **Typography**: All text sizes scale appropriately from 320px upwards
  - Hero title: 36px → 42-72px (375px+)
  - Welcome headings: 16px/20px → 20px/24px (375px+)
  - Body text: 13.5px → 14.5px (375px+)
- **Components**: Buttons, cards, icons, and navigation all optimized for small screens
- **Logo**: Scales from 96px (mobile) → 192px (desktop)
- **Spacing**: Margins, padding, and gaps adjusted for compact mobile display

#### **Announcement Banner**
New sticky announcement banner at top of site:
- **Component**: `app/components/AnnouncementBanner.tsx`
- **Features**: "Opening Soon..." text with animated steaming coffee cup
- **Animation**: 3 steam wisps with staggered 2s rise-and-fade effect
- **Styling**: Gold gradient background, sticky positioning (z-index: 70)
- **Responsive**: Text 11-15px, icon 20-24px, padding scales with screen size

#### **Navigation Updates**
- **Position**: Changed from fixed/sticky to static (stays at top only)
- **Logo Font**: Uses Alpino display font with -0.01em letter-spacing
- **Nav Links Font**: Uses Torus sans font (matches drawer-footer styling)
  - Font weight: 500, letter-spacing: 0.5px
- **Z-Index**: Maintained at 60 for proper layering

#### **Footer Redesign**
Created reusable `SiteFooter` component:
- **Component**: `app/components/SiteFooter.tsx`
- **Navigation Links**: Home • About • Menu with gold color (rgba(201, 154, 88, 0.85))
- **Hover Effects**: Brightens to lighter gold with underline animation and slight lift
- **Reusable**: Used across all pages (Home, About, Menu)
- **Optional Floating Items**: Supports homepage floating decorations via props

#### **Homepage Enhancements**
- **Welcome Cards**: Icons moved from top to left side of text
  - Horizontal flexbox layout with responsive sizing
  - Icons: 44px (mobile) → 48px (375px) → 56px (640px)
- **Section Headings**: Swapped sizes and colors
  - "Welcome to The Notebook Café": Now smaller with gold color
  - "Where Every Cup Tells a Story": Now larger heading with dark brown
- **Logo Addition**: Added below main heading (96-192px responsive)
- **Explore Menu Button**: Added responsive bottom margin (32-64px)

#### **About Page Updates**
- **Hero Heading**: Changed from "The Notebook Café" to "Our Story"
  - Uses badge typography: uppercase, 1.5px letter-spacing, gold color
  - Large heading size: 38px → 48px → 60px
- **Padding Reductions**:
  - Hero section: Cut top/bottom padding by half (60px top, 40px bottom)
  - Cream section: Reduced top padding to pt-8 (32px)
- **Floating Beans**: Moved up 7-8% for better positioning (28% and 32%)

#### **Floating Items Adjustments**
- **Hero Bean (Right)**: Moved up from 25% to 18% (not behind "Café" text)
- **Cards Bean (Top Right)**: Moved down from 18% to 28% (not blocking cup icon)
- **Cards Beans (Bottom)**: Repositioned to -5% and 0% (float between cards and newsletter)

### Earlier November 2024 - Menu System Enhancements
1. **SVG Icon System**: Replaced emoji icons with SVG files for professional appearance
2. **Seasonal Drinks Section**: Added dedicated section for specialty/seasonal items
3. **Mobile Optimization**: Improved responsive layout for all screen sizes
4. **Animation Improvements**: Smoother, slower animations (0.5s → 0.8s) with better easing
5. **SVG Divider**: Replaced PNG divider with SVG (`notebook-divider-cream.svg`)
6. **Tab Switching Fix**: Implemented render key system to prevent disappearing items
7. **Password Protection**: Added full password gate system for development mode
8. **Divider Rendering**: Fixed gaps and graphical glitches on mobile devices

### Technical Improvements
- React key strategy updated to include `activeTab` for proper remounting
- CSS animations changed from `forwards` to standard completion for reliability
- Divider CSS enhanced with GPU acceleration and negative margins to eliminate gaps
- Menu item animations use premium spring-like cubic-bezier easing
- Icon rendering optimized with `object-contain` and responsive sizing
- ScrollReveal component enhanced with MutationObserver to detect dynamically added elements
- All floating decorations use opacity: 1 by default (no fade-in transition)
- Homepage cards section: proper centering with wrapper div structure

## Deployment Notes

- Configured for Vercel deployment
- Static metadata in `app/layout.tsx`
- Robots and sitemap generation via `app/robots.ts` and `app/sitemap.ts`
