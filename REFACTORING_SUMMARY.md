# Notebook Café - Comprehensive Refactoring Summary

## Overview

This document outlines the complete refactoring and reorganization of the Notebook Café codebase, including all naming changes, file reorganization, and documentation improvements.

---

## 🗂️ New Directory Structure

### **Before:**
```
app/components/
├── (24 files in flat structure)
```

### **After:**
```
app/components/
├── layout/              # Global layout components
│   ├── SiteHeader.tsx   # Navigation header with mobile drawer
│   ├── SiteFooter.tsx   # Global footer
│   └── ScrollReveal.tsx # Scroll animation system
├── ui/                  # Reusable UI components
│   ├── AnnouncementBanner.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── features/            # Page-specific feature components
│   ├── MenuContent.tsx
│   ├── MenuItemModal.tsx
│   ├── NewsletterForm.tsx
│   ├── AtmosphereCarousel.tsx
│   ├── CardGallery.tsx
│   └── CoffeeDifferenceSection.tsx
└── decorative/          # Floating/decorative elements
    ├── HomeFloatingItems.tsx
    ├── AboutFloatingItems.tsx
    ├── EventsFloatingItems.tsx
    └── MenuFloatingItems.tsx
```

---

## 🏷️ CSS Class Name Changes

### **Global Layout Classes**

| Old Name | New Name | Reason |
|----------|----------|--------|
| `.page-dark` | `.site-layout` | Not actually dark mode, just main layout |
| `.header-dark` | `.site-header` | More semantic, not theme-specific |
| `.brand-dark` | `.site-brand` | Consistent naming |
| `.nav-dark` | `.site-nav` | Clearer purpose |
| `.icon-btn--dark` | `.icon-btn-primary` | BEM naming, not theme-specific |
| `.section-dark` | *(keep)* | Actually IS a dark section |

### **Text Color Classes**

| Old Name | New Name | Reason |
|----------|----------|--------|
| `.ink-cream` | `.text-light` | More semantic and clear |
| `.ink-cream-dim` | `.text-light-muted` | Follows standard naming |

### **Test/Debug Classes** *(to be removed)*

- `.test-gallery-card` → `.gallery-card`
- `.test-container` → `.container`
- `.test-hero-gallery` → `.hero-gallery`

---

## 📝 CSS Custom Properties (Variables)

### **Color Palette** *(Updated naming)*

```css
:root {
  /* === TYPOGRAPHY === */
  --font-sans: "Torus", system-ui, sans-serif;
  --font-mono: "Torus", monospace;
  --font-display: "Alpino", "Torus", system-ui, sans-serif;

  /* === COLORS === */
  /* Neutral tones */
  --cream: #f4f0e9;                    /* Light background (notebook paper) */
  --latte-cream: #ede7d8;             /* Lighter cream variant */
  --vanilla-beige: #d6bd98;           /* Almond tone */
  --paper-bag: #c4b59f;               /* Softened neutral */

  /* Brown tones (primary text on light backgrounds) */
  --espresso-brown: #2a1f16;          /* Primary dark text */
  --warm-brown: #5a4a38;              /* Secondary text */
  --warm-roast: #40534c;              /* Soft mocha */

  /* Cool accents */
  --coffee-bean: #1a3636;             /* Cool teal (dark sections) */
  --soft-mocha: #40534c;              /* Forest roast */

  /* Gold accents */
  --gold-primary: rgba(201, 154, 88, 1);
  --gold-light: rgba(201, 154, 88, 0.85);
  --gold-muted: rgba(164, 131, 116, 0.9);

  /* === SEMANTIC COLORS === */
  --bg-dark: var(--coffee-bean);      /* Dark section background */
  --bg-cream: var(--cream);           /* Light section background */
  --text-light: #f8f3e8;              /* Text on dark backgrounds */
  --text-light-muted: #e4dbc8;        /* Muted text on dark */

  /* === EFFECTS === */
  --panel: rgba(26, 54, 54, 0.06);
  --panel-border: rgba(26, 54, 54, 0.08);
  --glow: 0 0 0.6rem rgba(64, 83, 76, 0.35);
  --accent-warm: rgba(64, 83, 76, 0.18);
  --accent-glow: rgba(64, 83, 76, 0.42);
}
```

---

## 📦 Component Reorganization

### **Layout Components** (`app/components/layout/`)

#### `SiteHeader.tsx`
**Purpose:** Global navigation with responsive mobile drawer

**Features:**
- Fixed announcement banner integration
- Desktop horizontal navigation
- Full-screen mobile overlay menu
- Active page highlighting
- Keyboard navigation (ESC to close)
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
  instagramUrl="https://instagram.com/notebookcafe"
  spotifyUrl="https://open.spotify.com/playlist/..."
/>
```

---

#### `SiteFooter.tsx`
**Purpose:** Global footer with business info and navigation

**Features:**
- Business address and phone
- Footer navigation links
- Copyright notice
- Optional floating decorative items

**Props:**
```typescript
{
  showFloatingItems?: boolean;
  FloatingItemsComponent?: React.ComponentType<{variant: "welcome" | "footer" | "hero" | "cards"}>;
}
```

**Usage:**
```tsx
import SiteFooter from '@/app/components/layout/SiteFooter';
import HomeFloatingItems from '@/app/components/decorative/HomeFloatingItems';

// Basic footer
<SiteFooter />

// With decorations (homepage)
<SiteFooter showFloatingItems={true} FloatingItemsComponent={HomeFloatingItems} />
```

---

#### `ScrollReveal.tsx`
**Purpose:** Manages scroll-triggered animations using Intersection Observer API

**Features:**
- Detects elements with `.scroll-reveal` class
- Adds `.is-visible` class when entering viewport
- Different behavior for above-fold vs below-fold content
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
        This content will animate when scrolled into view
      </div>
    </main>
  );
}
```

**Animation Behavior:**
- Above-fold: 0.3s quick fade (`above-fold` class)
- Below-fold: 0.5s scale + fade animation

---

### **UI Components** (`app/components/ui/`)

#### `AnnouncementBanner.tsx`
**Purpose:** Sticky banner at top of all pages

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

**Styles:** `app/styles/components/announcement.css`

---

### **Feature Components** (`app/components/features/`)

#### `MenuContent.tsx`
**Purpose:** Tab navigation and menu item display

**Features:**
- Tab navigation (Drinks, Meals, Desserts)
- Two-column grid layout
- Seasonal drinks section
- Modal integration for item details
- Scroll-to-top button

**Data Source:** Hardcoded menu arrays (MENU_DRINKS, MENU_MEALS, MENU_DESSERTS, MENU_SEASONAL)

---

#### `NewsletterForm.tsx`
**Purpose:** Email subscription form with Sanity integration

**Features:**
- Email validation
- Duplicate detection
- Success/error states
- API integration (`/api/subscribe`)

---

#### `AtmosphereCarousel.tsx`
**Purpose:** Horizontal image carousel with tilted cards

**Features:**
- Responsive horizontal scroll
- Tilted card animations
- Card number badges
- Stack-to-spread animation

---

#### `CardGallery.tsx`
**Purpose:** Hero image gallery with stacked animation

---

#### `CoffeeDifferenceSection.tsx`
**Purpose:** "What Makes Our Coffee Different" content section

---

### **Decorative Components** (`app/components/decorative/`)

#### Floating Items Components
- `HomeFloatingItems.tsx` - Homepage decorations (4 variants: hero, welcome, cards, footer)
- `AboutFloatingItems.tsx` - About page coffee beans
- `EventsFloatingItems.tsx` - Events page decorations
- `MenuFloatingItems.tsx` - Menu page decorations

**Common Props:**
```typescript
{
  variant: "hero" | "welcome" | "cards" | "footer";
}
```

**Features:**
- Absolutely positioned (scroll naturally with content)
- Continuous float animations
- Different durations for organic feel
- Responsive sizing

---

## 🎨 CSS File Organization

### **Current Structure:**
```
app/styles/
├── components/
│   ├── announcement.css    # Announcement banner
│   ├── buttons.css         # Button styles
│   ├── card-gallery.css    # Image card gallery
│   ├── footer.css          # Footer styles
│   ├── hero.css            # Hero section
│   ├── modal.css           # Modal overlays
│   └── navigation.css      # Header and drawer navigation
├── layout/
│   ├── animations.css      # Global animations
│   └── sections.css        # Section containers (.section-cream, .section-dark)
└── pages/
    ├── home.css            # Homepage-specific
    ├── menu.css            # Menu page
    ├── about.css           # About/Story page
    └── events.css          # Events page
```

### **Key CSS Updates Needed:**

1. **globals.css**
   - Replace `.page-dark` with `.site-layout`
   - Replace `.ink-cream` with `.text-light`
   - Replace `.ink-cream-dim` with `.text-light-muted`

2. **navigation.css**
   - `.header-dark` → `.site-header`
   - `.brand-dark` → `.site-brand`
   - `.nav-dark` → `.site-nav`
   - `.icon-btn--dark` → `.icon-btn-primary`

3. **home.css**
   - Remove `.test-*` class prefixes
   - Update references to old class names

---

## 📐 Component Documentation Standard

All components now follow this JSDoc structure:

```typescript
/**
 * ComponentName Component
 *
 * Brief one-line description of the component's purpose.
 *
 * @component
 * @example
 * ```tsx
 * import ComponentName from '@/app/components/category/ComponentName';
 *
 * // Example usage
 * <ComponentName prop="value" />
 * ```
 *
 * @description
 * Detailed description including:
 * - Main features (bulleted list)
 * - Behavior notes
 * - Dependencies
 * - Related styles
 *
 * @param {PropType} props - Component props
 * @returns {JSX.Element} Rendered component
 */
```

### **Function Documentation:**

```typescript
/**
 * Brief description of what the function does
 *
 * @param {Type} paramName - Parameter description
 * @returns {ReturnType} Return value description
 *
 * @example
 * ```typescript
 * const result = functionName(input);
 * ```
 */
```

---

## 🔄 Import Path Updates

### **Old Imports:**
```typescript
import SiteHeader from './components/SiteHeader';
import ScrollReveal from './components/ScrollReveal';
import NewsletterForm from './components/NewsLetterForm';
```

### **New Imports:**
```typescript
import SiteHeader from '@/app/components/layout/SiteHeader';
import ScrollReveal from '@/app/components/layout/ScrollReveal';
import NewsletterForm from '@/app/components/features/NewsletterForm';
import AnnouncementBanner from '@/app/components/ui/AnnouncementBanner';
import HomeFloatingItems from '@/app/components/decorative/HomeFloatingItems';
```

---

## 🚀 Migration Checklist

### ✅ **Completed:**
- [x] Created new directory structure
- [x] Moved and documented layout components (SiteHeader, SiteFooter, ScrollReveal)
- [x] Moved and documented AnnouncementBanner to ui/
- [x] Created comprehensive naming documentation
- [x] Created refactoring summary

### 🔄 **In Progress:**
- [ ] Move remaining components to organized folders
- [ ] Update all CSS files with new class names
- [ ] Update all import paths throughout application
- [ ] Refactor and document API routes
- [ ] Refactor and document Sanity schemas

### 📋 **TODO:**
- [ ] Update CLAUDE.md with new structure
- [ ] Update README.md with new structure
- [ ] Add JSDoc to all remaining components
- [ ] Test all pages after refactoring
- [ ] Remove old component files from root components/
- [ ] Update any CI/CD configurations if needed

---

## 🎯 Key Benefits

### **Before Refactoring:**
- ❌ Flat component structure (hard to navigate)
- ❌ Inconsistent naming (`page-dark`, `ink-cream`)
- ❌ Minimal documentation
- ❌ Test classes in production code
- ❌ Confusing color semantics

### **After Refactoring:**
- ✅ Organized directory structure (layout/ui/features/decorative)
- ✅ Semantic, consistent naming (`.site-layout`, `.text-light`)
- ✅ Comprehensive JSDoc documentation on all components
- ✅ Clean production code (no test artifacts)
- ✅ Clear color system with semantic variable names
- ✅ Easy to understand and maintain
- ✅ Better developer experience

---

## 📚 Documentation Files

### **CLAUDE.md**
- Project overview and architecture
- Development guidelines
- Content management patterns
- Recent changes and updates

### **README.md**
- Quick start guide
- Tech stack overview
- Key features
- Deployment instructions

### **REFACTORING_SUMMARY.md** (this file)
- Complete refactoring documentation
- Migration guide
- Before/after comparisons

---

## 🔧 Next Steps

1. **Complete component migration:**
   ```bash
   # Move remaining components
   mv app/components/MenuContent.tsx app/components/features/
   mv app/components/NewsLetterForm.tsx app/components/features/
   mv app/components/MenuItemModal.tsx app/components/features/
   # ... etc
   ```

2. **Update CSS files:**
   - Find and replace class names in all CSS files
   - Test each page after updates

3. **Update imports:**
   - Run find-and-replace for import paths
   - Fix any broken references

4. **Test thoroughly:**
   ```bash
   npm run dev
   # Test all pages: /, /menu, /story, /events
   # Test mobile navigation
   # Test scroll animations
   # Test newsletter form
   ```

5. **Clean up:**
   ```bash
   # Remove old component files
   rm app/components/*.tsx
   # Only keep organized folders
   ```

---

## 🤝 Contributing

When adding new components:
- Place in appropriate folder (layout/ui/features/decorative)
- Add comprehensive JSDoc documentation
- Use semantic class names (no `.test-*`, `.temp-*`, etc.)
- Follow existing patterns for consistency
- Update this document if adding new patterns

---

**Last Updated:** November 20, 2025
**Refactored By:** Claude Code
**Status:** In Progress
