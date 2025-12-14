# CSS Organization

A modular CSS layout that breaks the old monolithic `globals.css` into focused, documented layers. Styles live alongside the App Router and are imported in a predictable cascade.

## Folder Structure

```
app/
├── globals.css
└── styles/
    ├── components/      # Reusable component styles
    │   ├── announcement.css
    │   ├── buttons.css
    │   ├── consent-banner.css
    │   ├── footer.css
    │   ├── hero.css
    │   ├── kenburns-hero.css
    │   ├── navigation.css
    │   ├── parallax-hero.css
    │   ├── SiteHeader.css
    │   └── what-to-expect.css
    ├── layout/          # Layout primitives and animations
    │   ├── animations.css
    │   └── sections.css
    └── pages/           # Page-specific styles
        ├── careers.css
        ├── home.css
        └── home/         # Home page split by section
            ├── hero.css
            ├── more-than-coffee.css
            ├── signature-pours-section.css
            └── trinity-slab.css
```

> Note: `.backup` files in the style folders are snapshots of older layouts—keep them unchanged unless intentionally restoring previous styling.

## Foundations (`globals.css`)
- Tailwind v4 import (`@import "tailwindcss";`) plus `@theme` tokens for the café palette.
- Imports only `SiteHeader.css` globally; other component styles are pulled in at the layout/component level to keep the base bundle light.
- Font variables provided by `next/font`: DM Serif Display (display), Outfit (body), Caveat (handwritten accents). `OpenDyslexic` is registered as an accessibility-friendly fallback.
- Expanded design tokens: semantic café colors, hero gradients, overlay helpers, and opacity presets—mirrored in `app/lib/colors.ts` for JS/TS parity.
- Base element resets and typography defaults, selection/focus treatments, scroll handling fixes, and global utility classes.
- Animation library (fade, pulse, scroll reveal) and accessibility hooks (`acc-*` classes for contrast, cursor sizing, dyslexia font, animation kill switch, bionic reading support).

## Component Styles
- **announcement.css** — Fixed top banner, gradient background, animated icons, responsive spacing.
- **buttons.css** — Pill buttons, gold badges, hover transitions, shared CTA styling.
- **consent-banner.css** — Cookie/analytics consent banner with warm gradient, stacked actions, responsive layout.
- **footer.css** — Footer grid, social/icon styling, muted text treatments.
- **hero.css** — Legacy hero styling and animations used by early layouts.
- **kenburns-hero.css** — Cinematic hero with Ken Burns pan/zoom, scroll-hide behavior, overlay variants (imported inside `KenBurnsHero.tsx`).
- **navigation.css** — Glassmorphism header, nav links, drawer/drawer-footer, burger animations, active state styling.
- **parallax-hero.css** — Parallax background hero with overlay variants and reduce-motion support (imported inside `ParallaxHero.tsx`).
- **SiteHeader.css** — Minimal hamburger icon animation used by `SiteHeader`.
- **what-to-expect.css** — “What to Expect” section bullets, icon animations, and typography.

## Layout Styles
- **sections.css** — Shared section backgrounds (cream/dark), dividers, and global spacing helpers.
- **animations.css** — Floating decorative items for hero/home/menu/footer, keyframes, and responsive sizing.

## Page Styles
- **careers.css** — Careers hero wrapper and parallax hero overrides.
- **home.css** — Home entrypoint; imports section styles from `styles/pages/home/`.

## Import Order

`app/layout.tsx` imports the global cascade in this order:

```tsx
import "./globals.css";

// Component styles
import "./styles/components/navigation.css";
import "./styles/components/hero.css";
import "./styles/components/buttons.css";
import "./styles/components/footer.css";
import "./styles/components/announcement.css";
import "./styles/components/consent-banner.css";
import "./styles/components/what-to-expect.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";
```

Page-specific CSS is imported by the route that needs it (e.g., `app/page.tsx` imports `./styles/pages/home.css`). Component-scoped CSS (e.g., `kenburns-hero.css`, `parallax-hero.css`) is imported within the React component that needs it.

## Why This Layout Works
1. Styles are discoverable by concern: foundation → components → layout → pages.
2. Tokens live in one place and stay in sync with TypeScript helpers.
3. Component-level imports keep specialized effects (hero, parallax) isolated and opt-in.
4. **Clear separation** - Globals contain only foundational styles
5. **Better performance** - CSS can be cached more efficiently by file
6. **Easier collaboration** - Team members can work on different files without conflicts

## Adding New Styles

- **New global utility?** → Add to `globals.css`
- **New component?** → Create file in `styles/components/`
- **New page?** → Create file in `styles/pages/`
- **New animation/layout?** → Add to `styles/layout/`

Don't forget to import new layout/component CSS in the correct place (layout vs. route/component).

---

## Additional Component Files

Legacy `.backup` files in `styles/components/` and `styles/pages/` preserve prior design experiments without shipping unused CSS to production. Keep them for reference or restoration, but avoid importing them unless intentionally reviving an old layout.
