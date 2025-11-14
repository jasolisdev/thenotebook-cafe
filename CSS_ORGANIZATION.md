# CSS Organization

This project's CSS has been refactored from a single large `globals.css` (2089 lines) into a clean, modular structure.

## Folder Structure

```
app/
├── globals.css (211 lines - foundational styles only)
└── styles/
    ├── components/      # Reusable component styles
    │   ├── navigation.css
    │   ├── hero.css
    │   ├── buttons.css
    │   └── footer.css
    ├── pages/           # Page-specific styles
    │   ├── home.css
    │   ├── about.css
    │   └── menu.css
    └── layout/          # Layout primitives and animations
        ├── sections.css
        └── animations.css
```

## File Contents

### `globals.css` (Foundation)
- Tailwind import
- Custom font declarations (@font-face for Alpino)
- Design tokens (CSS custom properties: colors, fonts, etc.)
- Base HTML/body styles
- Global utility classes (ink-cream, page-dark, etc.)
- Typography base (h1-h3, font-display)
- Core animations (fadeInUp, pulse, fadeIn, pulseGlow, scrollReveal)
- Scroll reveal system
- Accessibility styles (::selection, :focus-visible)

### `styles/components/` (Reusable Components)

**navigation.css**
- Nav bar (nav-glass-wrap, nav-glass, header-dark)
- Brand and navigation links
- Burger menu icon and animations
- Mobile drawer (drawer, drawer-nav, drawer-footer)
- All drawer transitions and effects

**hero.css**
- Hero section layout
- Hero gradient background
- Hero title, tagline, divider, description
- Hero CTA button and badge
- All hero-specific animations

**buttons.css**
- btn-pill (global pill button)
- badge-gold (gold badge styling)

**footer.css**
- Footer text styles (footer-dim)
- Social icon hover effects

### `styles/pages/` (Page-Specific)

**home.css**
- Welcome section (section label, highlights grid)
- Animated icons (coffee with steam, music notes, notebook with pen)
- Welcome CTA button
- Vibe quote section
- Home info cards (home-info-card, home-card-icon)
- Social icons (home-social-icon)
- Newsletter card (home-newsletter-card)
- Home footer styling

**about.css**
- About hero (badge, title, subtitle)
- About body card
- Values grid and value cards
- Mission card with glow animation
- About divider
- About footer

**menu.css**
- Menu item cards
- Menu item animations (menuItemFadeIn)
- Menu item icon hover effects

### `styles/layout/` (Layout Primitives)

**sections.css**
- Divider styling (divider-cream)
- Section backgrounds (section-cream, section-dark)
- Section-specific icon color adjustments

**animations.css**
- Floating items container
- Menu page floating items (cup, beans)
- Home page floating items:
  - Hero section (hero-bean-left, hero-bean-right)
  - Welcome section (home-bean-up-left, home-bean-bottom-right, home-coffee-plant)
  - Cards section (4 beans at corners)
  - Footer section (flower, beans)
- All floating animation keyframes
- Responsive sizing for mobile

## Import Order in layout.tsx

```tsx
import "./globals.css";

// Component styles
import "./styles/components/navigation.css";
import "./styles/components/hero.css";
import "./styles/components/buttons.css";
import "./styles/components/footer.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";

// Page styles
import "./styles/pages/home.css";
import "./styles/pages/about.css";
import "./styles/pages/menu.css";
```

This order ensures proper CSS cascade: foundation → components → layout → pages.

## Benefits of This Organization

1. **Easy to find styles** - Component, page, or layout? Each has its own folder
2. **Maintainable** - Small, focused files instead of one 2000+ line file
3. **Modular** - Easy to add/remove page-specific styles
4. **Clear separation** - Globals contain only foundational styles
5. **Better performance** - CSS can be cached more efficiently by file
6. **Easier collaboration** - Team members can work on different files without conflicts

## Adding New Styles

- **New global utility?** → Add to `globals.css`
- **New component?** → Create file in `styles/components/`
- **New page?** → Create file in `styles/pages/`
- **New animation/layout?** → Add to `styles/layout/`

Don't forget to import the new CSS file in `app/layout.tsx`!
