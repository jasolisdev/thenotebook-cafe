# The Notebook Café Color System

## Overview

This document defines the complete color system for The Notebook Café website. All colors are centrally managed through CSS variables in `globals.css` and TypeScript constants in `app/lib/colors.ts`.

---

## Core Color Palette

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| `--cafe-black` | #2C2420 | 44, 36, 32 | Primary dark text, dark section backgrounds |
| `--cafe-brown` | #4A3B32 | 74, 59, 50 | Secondary text, navigation, borders |
| `--cafe-tan` | #A48D78 | 164, 141, 120 | Primary accent color, active states, highlights |
| `--cafe-beige` | #CBB9A4 | 203, 185, 164 | Muted text on dark, secondary accents |
| `--cafe-cream` | #EDE7D8 | 237, 231, 216 | Light section backgrounds |
| `--cafe-mist` | #F4F1EA | 244, 241, 234 | Light text on dark backgrounds, very light backgrounds |
| `--cafe-white` | #FAF9F6 | 250, 249, 246 | Default background, cards, modals |

---

## Extended Color Palette

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| `--espresso-brown` | #2a1f16 | 42, 31, 22 | Deep brown for emphasized text |
| `--warm-brown` | #5a4a38 | 90, 74, 56 | Warm brown for descriptive text |
| `--medium-brown` | #6b5a48 | - | Medium brown for button text |
| `--cream-light` | #f4f0e9 | 244, 240, 233 | Light cream for subtle backgrounds |
| `--pearl-white` | #fffcf9 | - | Off-white for modal backgrounds |
| `--latte-cream` | #f6ebdf` | - | Events page light cream headings |
| `--gold-primary` | #c99a58 | 201, 154, 88 | Gold accent (primary) |
| `--gold-darker` | #b48a4e | - | Darker gold variant |

---

## Semantic Color Tokens

### Backgrounds
```css
--bg-solid: var(--cafe-white);     /* Default page background */
--bg-dark: var(--cafe-black);      /* Dark section backgrounds */
--bg-cream: var(--cafe-cream);     /* Light section backgrounds */
--bg-mist: var(--cafe-mist);       /* Subtle light backgrounds */
```

### Text Colors
```css
--text-dark: var(--cafe-brown);         /* Secondary dark text */
--text-black: var(--cafe-black);        /* Primary dark text */
--text-light: var(--cafe-mist);         /* Light text on dark */
--text-light-muted: var(--cafe-beige);  /* Muted light text */
```

### Accent Colors
```css
--accent-primary: var(--cafe-tan);   /* Primary accent */
--accent-dark: var(--cafe-brown);    /* Dark accent */
```

---

## Opacity Levels

Standardized opacity values for consistent transparency:

```css
--opacity-subtle: 0.08;    /* Very subtle overlays */
--opacity-light: 0.12;     /* Light overlays */
--opacity-medium: 0.25;    /* Medium overlays */
--opacity-strong: 0.5;     /* Strong overlays */
--opacity-heavy: 0.75;     /* Heavy overlays */
```

---

## Common Transparency Combinations

### Tan Family
```css
--tan-subtle: rgba(var(--cafe-tan-rgb), var(--opacity-subtle));    /* Very subtle tan */
--tan-light: rgba(var(--cafe-tan-rgb), var(--opacity-light));      /* Light tan overlay */
--tan-medium: rgba(var(--cafe-tan-rgb), var(--opacity-medium));    /* Medium tan overlay */
--tan-strong: rgba(var(--cafe-tan-rgb), var(--opacity-strong));    /* Strong tan overlay */
```

### Gold Family
```css
--gold-subtle: rgba(var(--gold-primary-rgb), var(--opacity-subtle));
--gold-light: rgba(var(--gold-primary-rgb), var(--opacity-light));
--gold-medium: rgba(var(--gold-primary-rgb), var(--opacity-medium));
--gold-strong: rgba(var(--gold-primary-rgb), var(--opacity-strong));
```

### Overlays
```css
--dark-overlay: rgba(0, 0, 0, var(--opacity-medium));              /* Modal/drawer backdrops */
--white-overlay: rgba(255, 255, 255, var(--opacity-light));        /* Light overlays */
--black-overlay-subtle: rgba(0, 0, 0, var(--opacity-subtle));      /* Subtle shadows */
--white-overlay-subtle: rgba(255, 255, 255, var(--opacity-subtle)); /* Subtle highlights */
```

---

## Usage Guidelines

### In CSS Files

✅ **DO:** Use CSS variables
```css
.element {
  color: var(--cafe-black);
  background: var(--tan-light);
  border-color: var(--cafe-tan);
}
```

❌ **DON'T:** Hardcode colors
```css
.element {
  color: #2C2420;
  background: rgba(164, 141, 120, 0.12);
  border-color: #A48D78;
}
```

---

### In React Components

✅ **DO:** Use CSS variables in inline styles
```typescript
<div style={{
  color: 'var(--cafe-black)',
  background: 'var(--cafe-cream)'
}} />
```

✅ **DO:** Import shared constants for JavaScript logic
```typescript
import { COLORS, RGBA_COLORS } from '@/app/lib/colors';

const buttonColor = COLORS.black;
const overlayColor = RGBA_COLORS.tanLight;
```

❌ **DON'T:** Hardcode colors in components
```typescript
<div style={{ color: '#2C2420', background: '#EDE7D8' }} />

const colors = {
  black: '#2C2420',
  tan: '#A48D78'
};
```

---

### Hover States

✅ **DO:** Use CSS for hover effects
```css
.button {
  background-color: var(--cafe-black);
  transition: background-color 0.3s;
}

.button:hover {
  background-color: var(--cafe-tan);
}
```

❌ **DON'T:** Use JavaScript for hover effects
```typescript
onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#A48D78'}
```

---

## Color Contrast & Accessibility

### WCAG Compliance

All text/background combinations must meet **WCAG AA** standards (4.5:1 for normal text, 3:1 for large text).

**Verified Combinations:**
- `--cafe-black` text on `--cafe-cream` background ✓
- `--cafe-brown` text on `--cafe-white` background ✓
- `--cafe-mist` text on `--cafe-black` background ✓
- `--cafe-white` text on `--cafe-black` background ✓

---

## Design Principles

### 1. Single Source of Truth
All colors are defined once in `globals.css` and referenced everywhere using CSS variables.

### 2. Semantic Naming
Use semantic tokens (`--text-dark`, `--bg-cream`) over direct color references when the context is clear.

### 3. Transparency via RGB
For colors that need transparency, use RGB helpers:
```css
rgba(var(--cafe-tan-rgb), 0.12)
```

### 4. Consistency First
Never introduce new hardcoded colors. If a new color is needed, add it to `globals.css` first.

---

## Migration Checklist

When adding new features or components:

- [ ] Use existing CSS variables from `globals.css`
- [ ] If inline styles needed, use `var(--color-name)` syntax
- [ ] Import `COLORS` from `@/app/lib/colors` for JavaScript logic
- [ ] Use CSS `:hover` states instead of JavaScript event handlers
- [ ] Verify contrast ratios for accessibility
- [ ] Document any new colors added to the system

---

## Theme Support (Future)

This color system is designed to support future theming (e.g., dark mode). To implement:

1. Add theme-specific variable overrides:
```css
[data-theme="dark"] {
  --cafe-black: #FAF9F6;  /* Flip colors */
  --cafe-white: #2C2420;
  /* ... */
}
```

2. Components automatically adapt since they use variables

---

## Maintenance

### Adding New Colors

1. Add hex value to `globals.css`:
```css
--new-color: #HEXCODE;
```

2. Add RGB helper if transparency needed:
```css
--new-color-rgb: R, G, B;
```

3. Add to `app/lib/colors.ts`:
```typescript
export const COLORS = {
  // ...
  newColor: '#HEXCODE',
} as const;
```

4. Document in this file

### Deprecating Colors

1. Search codebase for usage
2. Replace with preferred alternative
3. Remove from `globals.css` and `colors.ts`
4. Update documentation

---

## File Locations

| File | Purpose |
|------|---------|
| `app/globals.css` | CSS variable definitions (`:root` section) |
| `app/lib/colors.ts` | TypeScript color constants |
| `app/styles/COLOR_SYSTEM.md` | This documentation file |

---

## Quick Reference

**Most Common Patterns:**

```css
/* Text on light background */
color: var(--cafe-black);

/* Text on dark background */
color: var(--cafe-mist);

/* Primary accent */
color: var(--cafe-tan);

/* Light background */
background: var(--cafe-cream);

/* Dark background */
background: var(--cafe-black);

/* Subtle overlay */
background: var(--tan-light);

/* Border */
border-color: var(--cafe-tan);
```

---

**Last Updated:** December 2024

**Maintained By:** Development Team

For questions or suggestions, please update this document via pull request.
