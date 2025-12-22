# The Notebook Café Color System

## Sources of truth

- `app/globals.css` defines Tailwind v4 theme colors in `@theme` (the `--color-*` variables) and shared design tokens in `:root`.
- `app/lib/colors.ts` exposes a small set of constants for JS-only logic. Prefer Tailwind classes or CSS variables for actual styling.

## Theme Colors (`@theme` in `app/globals.css`)

These are the canonical, named colors. Tailwind utilities like `bg-cafe-black` and CSS variables like `var(--color-cafe-black)` both come from this list.

### Core Café Palette

| Token | Hex |
|------|-----|
| `--color-cafe-black` | `#2C2420` |
| `--color-cafe-brown` | `#4A3B32` |
| `--color-cafe-tan` | `#A48D78` |
| `--color-cafe-tan-dark` | `#8E7965` |
| `--color-cafe-beige` | `#CBB9A4` |
| `--color-cafe-luxe-oat` | `#CBBFAF` |
| `--color-cafe-cream` | `#EDE7D8` |
| `--color-cafe-mist` | `#F4F1EA` |
| `--color-cafe-white` | `#FDFBF7` |
| `--color-cafe-olive` | `#4A4F41` |

### Coffee Palette (Navbar/Footer)

| Token | Hex |
|------|-----|
| `--color-coffee-50` | `#F3EFE9` |
| `--color-coffee-100` | `#E6DCCA` |
| `--color-coffee-900` | `#2C241F` |

### Extended Palette

| Token | Hex |
|------|-----|
| `--color-espresso-brown` | `#2a1f16` |
| `--color-warm-brown` | `#5a4a38` |

## RGB Helpers (`:root` in `app/globals.css`)

Use these for alpha / translucency via `rgba()`:

- `--cafe-black-rgb`, `--cafe-brown-rgb`, `--cafe-tan-rgb`, `--cafe-beige-rgb`, `--cafe-cream-rgb`, `--cafe-mist-rgb`
- `--coffee-50-rgb`, `--coffee-100-rgb`
- `--espresso-brown-rgb`

Example:

```css
.panel {
  background: rgba(var(--cafe-tan-rgb), 0.12);
}
```

## Semantic Tokens (`:root` in `app/globals.css`)

Prefer these when the intent is clearer than the exact color:

- Backgrounds: `--bg-solid`, `--bg-dark`
- Text: `--text-dark`, `--text-light`, `--text-light-muted`
- Overlays: `--dark-overlay`, `--white-overlay`, `--black-overlay-subtle`, `--white-overlay-subtle`
- Opacity system: `--opacity-subtle`, `--opacity-light`, `--opacity-medium`, `--opacity-strong`
- Tan transparency presets: `--tan-subtle`, `--tan-light`, `--tan-medium`, `--tan-strong`

## Usage Guidelines

### Tailwind (preferred)

Use Tailwind utilities whenever possible:

- `bg-cafe-cream`, `text-cafe-brown`, `border-cafe-tan/30`
- `text-coffee-50`, `border-coffee-900/40`

### CSS

Use CSS variables for non-Tailwind situations:

```css
.title {
  color: var(--color-cafe-black);
}
```

### React inline styles

```tsx
<div style={{ color: "var(--color-cafe-black)" }} />
```

Avoid hardcoded hex values in components and styles unless you’re intentionally defining a brand-new token.

## Adding New Colors

1. Add the color in `app/globals.css` inside the `@theme` block as a new `--color-*` token.
2. If you need opacity via `rgba()`, add a matching `*-rgb` helper in `:root`.
3. If JavaScript needs a literal value for non-style logic, add it to `app/lib/colors.ts` (otherwise prefer `var(--color-...)`).

## Theme Support (Future)

To theme the site, override the `--color-*` variables under a selector (e.g. `.dark` or `[data-theme="dark"]`). Tailwind utilities and `var(--color-...)` usages adapt automatically.
