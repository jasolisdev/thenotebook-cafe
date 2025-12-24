# Styles

CSS organization for The Notebook Café. Uses a hybrid approach: global CSS for shared patterns, page-specific CSS for unique layouts, and component-scoped CSS for features.

## Import Hierarchy

### 1. Global CSS (imported in `layout.tsx`)

Loaded on every page:
```css
globals.css              /* Tailwind, theme tokens, base styles */
components/navigation.css   /* Site-wide header navigation */
components/footer.css       /* Site-wide footer */
components/buttons.css      /* Shared button styles */
components/announcement.css /* Announcement banner */
layout/animations.css       /* Shared animations */
layout/sections.css         /* Section layout patterns */
```

### 2. Page CSS (imported by each page)

Loaded only on specific pages:
```css
pages/home.css      /* Homepage styles */
pages/menu.css      /* Menu page styles */
pages/story.css     /* Story page styles */
pages/contact.css   /* Contact page styles */
pages/careers.css   /* Careers page styles */
```

### 3. Feature CSS (imported by component)

Loaded only when component is used:
```css
components/consent-banner.css     /* ConsentBanner component */
components/signature-pours-grid.css /* Product grid */
components/application-form.css    /* Job application form */
```

## Organization Rules

### Import Globally When:
- ✅ Style is used on multiple pages
- ✅ Style is part of core layout (header, footer)
- ✅ Style defines shared patterns (buttons, animations)

### Import in Page When:
- ✅ Style is only used on one page
- ✅ Style defines page-specific layout
- ✅ Style is for page-unique components

### Import in Component When:
- ✅ Style is only used by one component
- ✅ Style is feature-specific
- ✅ Component may not be used on all pages

## Directory Structure

```
styles/
├── globals.css              # Tailwind + theme tokens + base
├── components/              # Global component styles
│   ├── navigation.css       # Header navigation
│   ├── footer.css           # Footer
│   ├── buttons.css          # Button variants
│   ├── announcement.css     # Announcement banner
│   ├── consent-banner.css   # Cookie consent
│   ├── signature-pours-grid.css # Product grid
│   └── application-form.css # Application form
├── layout/                  # Layout patterns
│   ├── animations.css       # Shared animations
│   └── sections.css         # Section layouts
└── pages/                   # Page-specific styles
    ├── home.css             # Homepage
    ├── menu.css             # Menu page
    ├── story.css            # Story page
    ├── contact.css          # Contact page
    └── careers.css          # Careers page
```

## Styling Approach

### Tailwind CSS v4 First

Use Tailwind utility classes as the primary styling method:
```tsx
<div className="bg-cafe-white text-cafe-brown p-8 rounded-lg">
  <h2 className="font-display text-4xl">Coffee & Community</h2>
</div>
```

### CSS Files for Complex Patterns

Use CSS files when:
- Multiple related rules
- Pseudo-selectors (`:hover`, `:before`, `:after`)
- Media queries with complex breakpoints
- Animations and transitions
- Grid/flexbox with many rules

### CSS Variables for Theme

Define tokens in `globals.css`:
```css
@theme {
  --color-cafe-black: #2c2420;
  --color-cafe-brown: #4a3b32;
  --color-cafe-tan: #a48d78;
  /* ... */
}
```

Use in CSS or inline:
```css
.custom-element {
  background-color: var(--color-cafe-cream);
}
```

## Color Palette

### Core Colors
```css
--color-cafe-black: #2c2420;     /* Dark brown - headings */
--color-cafe-brown: #4a3b32;     /* Medium brown - body text */
--color-cafe-tan: #a48d78;       /* Primary accent - CTAs */
--color-cafe-beige: #cbb9a4;     /* Borders, muted elements */
--color-cafe-cream: #ede7d8;     /* Light backgrounds */
--color-cafe-mist: #f4f1ea;      /* Very light backgrounds */
--color-cafe-white: #faf9f6;     /* Main background */
```

### Usage Examples
```tsx
<div className="bg-cafe-mist text-cafe-brown">
  <button className="bg-cafe-tan hover:bg-cafe-tan-dark">
    Order Now
  </button>
</div>
```

## Typography

### Font Families
```css
--font-display: "Playfair Display", serif;  /* Headings */
--font-sans: "Torus", "Inter", sans-serif;  /* Body */
```

### Usage
```tsx
<h1 className="font-display text-5xl">The Notebook Café</h1>
<p className="font-sans text-base">Premium coffee experience...</p>
```

## Responsive Design

### Breakpoints
```css
/* Mobile first approach */
320px   /* Base mobile (iPhone SE) */
375px   /* Standard mobile */
640px   /* sm: Tablet portrait */
768px   /* md: Tablet landscape */
1024px  /* lg: Desktop */
1280px  /* xl: Large desktop */
```

### Usage in Tailwind
```tsx
<div className="p-4 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-4xl lg:text-6xl">
    Responsive Heading
  </h1>
</div>
```

### Usage in CSS
```css
.custom-section {
  padding: 1rem;
}

@media (min-width: 768px) {
  .custom-section {
    padding: 2rem;
  }
}
```

## Visual Rhythm Pattern

Homepage uses alternating backgrounds for flow:
```
Hero              → cafe-mist
Signature Pours   → cafe-white
Philosophy        → cafe-mist + skewed accent
Low Lights        → cafe-cream + skewed accent
Trinity           → cafe-white
Atmosphere        → cafe-mist + skewed accent
Newsletter        → light tan tint
```

**Principle:** Alternating warm/clean creates natural scroll rhythm.

## Best Practices

1. **Mobile-first** - Start with mobile, enhance for desktop
2. **Tailwind first** - Use utilities before custom CSS
3. **CSS variables** - Use theme tokens for consistency
4. **Co-locate** - Keep feature CSS with feature component
5. **Document ownership** - Clear which file imports which CSS
6. **Avoid duplication** - Extract shared patterns to global CSS
7. **Use semantic names** - `.hero-section`, not `.test-123`

## Import Examples

### In layout.tsx (global)
```typescript
import '@/app/styles/globals.css';
import '@/app/styles/components/navigation.css';
import '@/app/styles/components/footer.css';
import '@/app/styles/components/buttons.css';
import '@/app/styles/layout/animations.css';
```

### In page.tsx (page-specific)
```typescript
import '@/app/styles/pages/home.css';

export default function HomePage() {
  // ...
}
```

### In component (feature-specific)
```typescript
import './consent-banner.css';

export function ConsentBanner() {
  // ...
}
```

## Adding New Styles

1. **Determine scope** - Global, page, or component?
2. **Choose location** - Based on scope
3. **Use absolute imports** - `@/app/styles/...`
4. **Add JSDoc header** - Document purpose and import location
5. **Update this README** - Keep documentation current

## CSS File Headers

Add headers to all CSS files:
```css
/**
 * @fileoverview Navigation component styles
 * @module styles/components/navigation
 *
 * Imported globally in layout.tsx
 * Provides styles for SiteHeader component
 */
```
