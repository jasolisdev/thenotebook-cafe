# Styles

CSS organization for The Notebook Café.

**Updated December 2025:** CSS has been consolidated into `globals.css` for improved performance (7 HTTP requests → 1).

## Structure

```
app/
├── globals.css           # All core styles consolidated here
└── styles/
    └── pages/            # Page-specific styles
        ├── home.css
        ├── menu.css
        ├── story.css
        ├── contact.css
        └── careers.css
```

## Import Hierarchy

### 1. Global CSS (layout.tsx)

All component and layout styles are consolidated in `globals.css`:

```typescript
// app/layout.tsx
import "./globals.css";  // Single import for all core styles
```

**Includes:**
- Tailwind v4 configuration
- Theme tokens (colors, typography)
- Navigation, footer, buttons
- Animations and sections
- Cookie consent banner

### 2. Page CSS (each page)

Page-specific styles are imported by each route:

```typescript
// app/page.tsx
import "./styles/pages/home.css";

// app/menu/page.tsx
import "@/app/styles/pages/menu.css";
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
- Complex media queries
- Animations and transitions
- Grid/flexbox with many rules

## Color Palette

Registered via `@theme` directive in `globals.css`:

```css
--color-cafe-black: #2c2420;     /* Dark brown - headings */
--color-cafe-brown: #4a3b32;     /* Medium brown - body text */
--color-cafe-tan: #a48d78;       /* Primary accent - CTAs */
--color-cafe-beige: #cbb9a4;     /* Borders, muted elements */
--color-cafe-cream: #ede7d8;     /* Light backgrounds */
--color-cafe-mist: #f4f1ea;      /* Very light backgrounds */
--color-cafe-white: #fdfbf7;     /* Main background */
```

**Usage:**
```tsx
<div className="bg-cafe-mist text-cafe-brown">
  <button className="bg-cafe-tan hover:bg-cafe-tan-dark">
    Order Now
  </button>
</div>
```

## Typography

```css
--font-display: "Playfair Display", serif;  /* Headings */
--font-sans: "Torus", "Inter", sans-serif;  /* Body */
```

**Usage:**
```tsx
<h1 className="font-display text-5xl">The Notebook Café</h1>
<p className="font-sans text-base">Premium coffee experience...</p>
```

## Responsive Breakpoints

```css
320px   /* Base mobile (iPhone SE) */
375px   /* Standard mobile */
640px   /* sm: Tablet portrait */
768px   /* md: Tablet landscape */
1024px  /* lg: Desktop */
1280px  /* xl: Large desktop */
```

## Visual Rhythm

Homepage uses alternating backgrounds for visual flow:

```
Hero              → cafe-mist
Signature Pours   → cafe-white
Philosophy        → cafe-mist + skewed accent
Low Lights        → cafe-cream + skewed accent
Trinity           → cafe-white
Atmosphere        → cafe-mist + skewed accent
Newsletter        → light tan tint
```

## Best Practices

1. **Mobile-first** - Start with mobile, enhance for desktop
2. **Tailwind first** - Use utilities before custom CSS
3. **CSS variables** - Use theme tokens for consistency
4. **Avoid duplication** - Core styles are in globals.css
5. **Use semantic names** - `.hero-section`, not `.test-123`

## Import Examples

### In layout.tsx (global)
```typescript
// All component and layout styles consolidated in globals.css
import './globals.css';
```

### In page.tsx (page-specific)
```typescript
import '@/app/styles/pages/home.css';

export default function HomePage() {
  // ...
}
```

## Adding New Styles

- **Global utility or component?** → Add to `app/globals.css`
- **Page-specific styles?** → Create file in `app/styles/pages/`

**Important:** Component and layout styles are consolidated in `globals.css`. Only create new CSS files for page-specific styles.

## Reference

See `docs/css.md` for detailed CSS organization documentation.
