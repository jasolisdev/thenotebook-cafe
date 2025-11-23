# Component Inventory
**The Notebook Café - Complete Component Catalog**

Generated: 2025-11-23
Total Components: 31
Organization: 4-Tier Hierarchy

---

## Component Organization

Components are organized into 4 categories following a clear hierarchy from global to specific:

1. **Layout** - Global layout components (headers, footers, page structure)
2. **UI** - Reusable UI primitives and design system elements
3. **Features** - Feature-specific components with business logic
4. **Decorative** - Visual enhancement components

---

## Layout Components (4)

Location: `app/components/layout/`

### SiteHeader
**File:** `layout/SiteHeader.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Global navigation header with responsive mobile drawer

**Props:**
- `instagramUrl?: string` - Instagram profile URL
- `spotifyUrl?: string` - Spotify playlist URL
- `burgerUntil?: "sm" | "md" | "lg" | "xl"` - Mobile menu breakpoint (default: "lg")
- `announcementText?: string` - Custom announcement banner text

**Features:**
- Fixed announcement banner integration
- Desktop: Horizontal navigation bar
- Mobile: Full-screen overlay drawer
- Active page highlighting
- Keyboard navigation (ESC to close)
- Body scroll lock when drawer open
- Social media links (Instagram, Spotify, Facebook)
- Decorative floating coffee beans in drawer

**Key Behaviors:**
- Breakpoint-responsive (switches at configurable breakpoint)
- Client-side routing with Next.js Link
- usePathname hook for active page detection
- Hydration-safe rendering

---

### SiteFooter
**File:** `layout/SiteFooter.tsx`
**Type:** Server Component (default)

**Purpose:** Global footer with business information and navigation

**Props:**
- `showFloatingItems?: boolean` - Show decorative floating items
- `FloatingItemsComponent?: React.ComponentType` - Custom floating items component

**Features:**
- Business address and phone
- Footer navigation links
- Copyright notice
- Optional floating decorative elements
- Social media integration

**Sections:**
- Contact information
- Quick links
- Legal/copyright
- Optional decorations

---

### ScrollReveal
**File:** `layout/ScrollReveal.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Scroll-triggered animation system using Intersection Observer

**Props:** None (detects `.scroll-reveal` class elements automatically)

**Features:**
- Detects all `.scroll-reveal` class elements
- Adds `.is-visible` when entering viewport
- Different behavior for above-fold vs below-fold elements
- Watches for dynamically added elements (MutationObserver)
- Triggers 50px before viewport entry

**Usage Pattern:**
```tsx
<div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
  Content animates when scrolled into view
</div>
```

---

### PageTransition
**File:** `layout/PageTransition.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Page transition animations between route changes

**Features:**
- Smooth transitions between pages
- Fade and/or slide effects
- Integrated with Next.js routing

---

## UI Components (8)

Location: `app/components/ui/`

### AnnouncementBanner
**File:** `ui/AnnouncementBanner.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Sticky banner at top of all pages with animated elements

**Props:**
- `text?: string` - Banner text (default: "Grand Opening 2026")

**Features:**
- Fixed positioning (z-index: 50)
- Gold gradient background
- Animated steam from coffee cups (2s loop)
- Responsive spacing
- Client-side hydration handling

**Styling:**
- CSS in: `app/styles/components/announcement.css`
- Uses CSS variables: `--gold-primary`, `--gold-light`

---

### SectionCard
**File:** `ui/SectionCard.tsx`
**Type:** Server Component (default)

**Purpose:** Reusable card component for content sections

**Props:**
- `title?: string` - Card title
- `children: React.ReactNode` - Card content
- `className?: string` - Additional CSS classes

**Features:**
- Consistent card styling
- Responsive padding
- Hover effects
- Shadow and border styling

---

### BulletList
**File:** `ui/BulletList.tsx`
**Type:** Server Component (default)

**Purpose:** Styled bullet list component

**Props:**
- `items: string[]` - Array of list items
- `className?: string` - Additional CSS classes

**Features:**
- Custom bullet styling
- Consistent spacing
- Accessible markup

---

### PasswordGate
**File:** `ui/PasswordGate.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Optional site-wide password protection for dev/staging

**Props:**
- `children: React.ReactNode` - Protected content
- `enabled?: boolean` - Enable/disable password gate

**Features:**
- Simple password input form
- Calls `/api/auth/verify` endpoint
- Local storage for "authenticated" state
- Styled modal overlay
- Not intended for production security

---

### NotebookPage
**File:** `ui/NotebookPage.tsx`
**Type:** Server Component (default)

**Purpose:** Page wrapper component with consistent styling

**Props:**
- `children: React.ReactNode` - Page content
- `className?: string` - Additional CSS classes

**Features:**
- Consistent page padding
- Responsive layout
- Background styling

---

### SectionHeading
**File:** `ui/SectionHeading.tsx`
**Type:** Server Component (default)

**Purpose:** Styled section heading component

**Props:**
- `title: string` - Heading text
- `level?: "h1" | "h2" | "h3"` - Heading level (default: "h2")
- `className?: string` - Additional CSS classes

**Features:**
- Typography styling (Alpino display font)
- Responsive sizing
- Semantic HTML headings

---

### Icons
**File:** `ui/Icons.tsx`
**Type:** Server Component (default)

**Purpose:** Icon component library wrapper

**Features:**
- Wraps Lucide React and React Icons
- Consistent sizing and styling
- Reusable icon components

---

## Feature Components (8)

Location: `app/components/features/`

### MenuContent
**File:** `features/MenuContent.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Menu tab navigation and item display system

**Props:**
- `items: MenuItem[]` - Array of menu items (optional, uses hardcoded data if not provided)

**MenuItem Type:**
```typescript
type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  section: "drinks" | "meals" | "desserts";
  category?: string;
  sortOrder?: number;
  imageUrl?: string;
}
```

**Features:**
- Tab navigation (Drinks | Meals | Desserts)
- Two-column grid layout with cards
- Seasonal drinks section
- Modal integration for item details
- Scroll-to-top button
- Hardcoded menu data arrays:
  - `MENU_DRINKS` - 8+ drink items
  - `MENU_MEALS` - 6+ meal items
  - `MENU_DESSERTS` - 4+ dessert items
  - `MENU_SEASONAL` - Seasonal specialty drinks

**State Management:**
- `useState` for active tab
- `useState` for selected item (modal)
- Tab switching logic

---

### MenuItemModal
**File:** `features/MenuItemModal.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Modal dialog for menu item details

**Props:**
- `item: MenuItem | null` - Selected menu item
- `onClose: () => void` - Close callback

**Features:**
- Full viewport height on mobile (100vh)
- Fixed positioning with overlay
- Sticky "Add to Order" button at bottom
- Image display with object-fit: cover
- ESC key to close
- Click outside to close
- Smooth open/close animations

**Styling:**
- Fixed z-index layering
- Cream background for action button
- Dark coffee-bean background for header

---

### NewsLetterForm
**File:** `features/NewsLetterForm.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Email subscription form with Sanity CMS integration

**Props:**
- `source?: string` - Source identifier (default: "homepage")

**Features:**
- Email input with validation (HTML5 required)
- Form submission to `/api/subscribe`
- Success/error/duplicate state handling
- Loading state during submission
- Accessible form markup

**States:**
- `idle` - Initial state
- `loading` - Submitting
- `success` - Successfully subscribed
- `duplicate` - Email already subscribed
- `error` - Submission failed

**API Integration:**
- POST to `/api/subscribe`
- Sends `{ email, source }`
- Handles response states

---

### AtmosphereCarousel
**File:** `features/AtmosphereCarousel.tsx`
**Type:** Client Component (`"use client"`)

**Purpose:** Horizontal image carousel with tilted card animations

**Features:**
- Responsive horizontal scroll
- Tilted card animations (-6°, 8°, -7° rotations)
- Card number badges
- Stack-to-spread animation on scroll reveal
- Smooth scrolling behavior
- Touch/mouse drag scrolling

**Card Animations:**
- CSS transforms for tilt effects
- Scroll-triggered reveals
- Stagger animations for multiple cards

---

### BlogPosts
**File:** `features/BlogPosts.tsx`
**Type:** Server Component (default)

**Purpose:** Blog post display component (future feature)

**Props:**
- `posts?: Post[]` - Array of blog posts

**Status:** Prepared for future blog feature (post schema exists in Sanity)

**Features:**
- Post grid layout
- Image thumbnails
- Excerpt display
- Read more links

---

### CardGallery
**File:** `features/CardGallery.tsx`
**Type:** Server Component (default)

**Purpose:** Info card gallery with grid layout

**Features:**
- Responsive grid layout (1-3 columns)
- Card components with icons
- Hover effects
- Scroll reveal integration

**Styling:**
- CSS in: `app/styles/components/card-gallery.css`
- Grid: 1 col mobile → 2 col tablet → 3 col desktop

---

### CoffeeDifferenceSection
**File:** `features/CoffeeDifferenceSection.tsx`
**Type:** Server Component (default)

**Purpose:** "What makes our coffee different" feature section

**Features:**
- Image and text layout
- Bullet points for features
- Responsive two-column layout
- Scroll reveal animations

---

## Decorative Components (4)

Location: `app/components/decorative/`

### HomeFloatingItems
**File:** `decorative/HomeFloatingItems.tsx`
**Type:** Server Component (default)

**Purpose:** Homepage floating decorations (coffee beans, plants)

**Props:**
- `variant: string` - Decoration variant

**Variants:**
- `hero` - Hero section decorations (2 coffee beans)
- `welcome` - Welcome section (3 items: beans + plant)
- `cards` - Info cards section (4 coffee beans at corners)
- `footer` - Footer decorations (dark variants)

**Features:**
- Absolutely positioned (scroll naturally with page)
- Continuous float animations (CSS keyframes)
- Different durations for organic feel (8s, 9s, 10s)
- Responsive sizing (scale based on viewport)

**Animation Pattern:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
```

---

### AboutFloatingItems
**File:** `decorative/AboutFloatingItems.tsx`
**Type:** Server Component (default)

**Purpose:** About/Story page floating decorations

**Props:**
- `variant: string` - Decoration variant

**Features:**
- Similar to HomeFloatingItems
- Page-specific positioning
- Coffee-themed decorations

---

### EventsFloatingItems
**File:** `decorative/EventsFloatingItems.tsx`
**Type:** Server Component (default)

**Purpose:** Events page floating decorations

**Props:**
- `variant: string` - Decoration variant

**Features:**
- Event-themed decorative elements
- Consistent animation patterns
- Responsive positioning

---

### FloatingItems (Generic)
**File:** `decorative/FloatingItems.tsx`
**Type:** Server Component (default)

**Purpose:** Generic floating items component (base class)

**Props:**
- `items: FloatingItem[]` - Array of floating decorations
- `className?: string` - Additional CSS classes

**Features:**
- Reusable across pages
- Configurable positions and animations
- Base component for specific page variants

---

## Legacy/Transitional Components (7)

**Location:** `app/components/` (root level, being migrated)

These components exist at the root of `app/components/` and are being migrated to the organized structure:

1. `AnnouncementBanner.tsx` → Migrated to `ui/`
2. `AtmosphereCarousel.tsx` → Migrated to `features/`
3. `BlogPosts.tsx` → Migrated to `features/`
4. `CardGallery.tsx` → Migrated to `features/`
5. `CoffeeDifferenceSection.tsx` → Migrated to `features/`
6. `EventsFloatingItems.tsx` → Migrated to `decorative/`
7. `ScrollReveal.tsx` → Migrated to `layout/`
8. `SiteFooter.tsx` → Migrated to `layout/`
9. `SiteHeader.tsx` → Migrated to `layout/`

**Status:** These are duplicates/old versions being phased out. The organized versions in subdirectories are the current canonical components.

---

## Component Patterns

### Server vs Client Components

**Server Components (Default):**
- No `"use client"` directive
- Can fetch data directly
- Run only on server
- Smaller JavaScript bundle

**Client Components:**
- Marked with `"use client"`
- Use React hooks (useState, useEffect, etc.)
- Access browser APIs
- Interactive elements

**Rule:** Use Server Components by default, Client Components only when needed.

### Component File Structure

```typescript
// Server Component
export default function ComponentName({ prop }: Props) {
  return <div>Content</div>;
}

// Client Component
"use client";

import { useState } from "react";

export default function ComponentName({ prop }: Props) {
  const [state, setState] = useState(initial);
  return <div onClick={handler}>Content</div>;
}
```

---

## Styling Patterns

### Component-Specific Styles

**Location:** `app/styles/components/[component-name].css`

**Examples:**
- `announcement.css` - AnnouncementBanner styles
- `buttons.css` - Button component styles
- `card-gallery.css` - CardGallery styles
- `footer.css` - SiteFooter styles
- `hero.css` - Hero section styles
- `modal.css` - Modal component styles
- `navigation.css` - SiteHeader navigation styles

### Import Pattern

```typescript
// Import component-specific CSS
import '@/app/styles/components/component-name.css';
```

---

## Component Dependencies

### Common Dependencies

- **Next.js:**
  - `next/link` - Client-side routing
  - `next/image` - Optimized images
  - `next/navigation` - usePathname, useRouter

- **React:**
  - `useState`, `useEffect` - State and effects
  - `React.ReactNode` - Type for children

- **Icons:**
  - `lucide-react` - Primary icon library
  - `react-icons` - Additional icon sets (SiSpotify, SiInstagram, etc.)

- **Animations:**
  - `framer-motion` - Animation library (future use)
  - CSS keyframe animations - Current implementation

---

## Usage Guidelines

### Creating New Components

1. **Determine Category:**
   - Layout → Global structure
   - UI → Reusable primitive
   - Feature → Business logic
   - Decorative → Visual enhancement

2. **Choose Component Type:**
   - Server Component (default) for static content
   - Client Component for interactivity

3. **File Location:**
   ```
   app/components/[category]/ComponentName.tsx
   ```

4. **Naming Convention:**
   - PascalCase for component files
   - Descriptive, specific names
   - Avoid generic names like "Button" (use "PrimaryButton", "CTAButton")

5. **Add Documentation:**
   - JSDoc comment with purpose
   - Document props with TypeScript
   - Include usage example

---

## Component Metrics

**Total Components:** 31

**By Category:**
- Layout: 4 components
- UI: 8 components
- Features: 8 components
- Decorative: 4 components
- Legacy/Transitional: 7 components (duplicates)

**By Type:**
- Client Components: 10 (interactive, hooks, browser APIs)
- Server Components: 21 (static, data fetching)

**Average Complexity:**
- Simple (< 100 lines): 15 components
- Medium (100-300 lines): 12 components
- Complex (> 300 lines): 4 components (SiteHeader, MenuContent, MenuItemModal)

---

## Related Documentation

- [Architecture](./architecture.md) - System architecture overview
- [Source Tree Analysis](./source-tree-analysis.md) - Directory structure
- [Development Guide](./development-guide.md) - Development workflow
- [CLAUDE.md](../CLAUDE.md) - Comprehensive component patterns

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-23
**Component Count:** 31
