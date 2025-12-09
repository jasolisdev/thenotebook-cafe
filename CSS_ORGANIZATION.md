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
    │   ├── card-gallery.css
    │   ├── consent-banner.css
    │   ├── footer.css
    │   ├── hero.css
    │   ├── kenburns-hero.css
    │   ├── modal.css
    │   ├── navigation.css
    │   ├── page-transitions.css
    │   ├── parallax-hero.css
    │   ├── SiteHeader.css
    │   └── what-to-expect.css
    ├── layout/          # Layout primitives and animations
    │   ├── animations.css
    │   └── sections.css
    └── pages/           # Page-specific styles
        ├── about.css
        ├── careers.css
        ├── contact.css
        ├── events.css
        ├── home.css
        ├── menu.css
        └── story-prototype.css
```

> Note: `.backup` files in the style folders are snapshots of older layouts—keep them unchanged unless intentionally restoring previous styling.

## Foundations (`globals.css`)
- Tailwind v4 import (`@import "tailwindcss";`) plus `@theme` tokens for the café palette.
- Imports a few shared component styles early: `card-gallery.css`, `modal.css`, and `SiteHeader.css`.
- Font variables provided by `next/font`: DM Serif Display (display), Outfit (body), Caveat (handwritten accents). `OpenDyslexic` is registered as an accessibility-friendly fallback.
- Expanded design tokens: semantic café colors, hero gradients, overlay helpers, and opacity presets—mirrored in `app/lib/colors.ts` for JS/TS parity.
- Base element resets and typography defaults, selection/focus treatments, scroll handling fixes, and global utility classes.
- Animation library (fade, pulse, scroll reveal) and accessibility hooks (`acc-*` classes for contrast, cursor sizing, dyslexia font, animation kill switch, bionic reading support).

## Component Styles
- **announcement.css** — Fixed top banner, gradient background, animated icons, responsive spacing.
- **buttons.css** — Pill buttons, gold badges, hover transitions, shared CTA styling.
- **card-gallery.css** — Gallery grid, card shells, typography, hover/animation treatments.
- **consent-banner.css** — Cookie/analytics consent banner with warm gradient, stacked actions, responsive layout.
- **footer.css** — Footer grid, social/icon styling, muted text treatments.
- **hero.css** — Legacy hero styling and animations used by early layouts.
- **kenburns-hero.css** — Cinematic hero with Ken Burns pan/zoom, scroll-hide behavior, overlay variants.
- **modal.css** — Modal overlay, container sizing, headers/footers, animations, and responsive breakpoints.
- **navigation.css** — Glassmorphism header, nav links, drawer/drawer-footer, burger animations, active state styling.
- **page-transitions.css** — Route change fade/scale transitions.
- **parallax-hero.css** — Parallax background hero with overlay variants and reduce-motion support (imported inside `ParallaxHero.tsx`).
- **SiteHeader.css** — Minimal hamburger icon animation used by `SiteHeader`.
- **what-to-expect.css** — “What to Expect” section bullets, icon animations, and typography.

## Layout Styles
- **sections.css** — Shared section backgrounds (cream/dark), dividers, and global spacing helpers.
- **animations.css** — Floating decorative items for hero/home/menu/footer, keyframes, and responsive sizing.

## Page Styles
- **about.css** — Story page hero badges, body card, values grid, mission card glow, dividers.
- **careers.css** — Careers hero wrapper and parallax hero overrides.
- **contact.css** — Form layout, field states, validation, CTA styles, contact info layout.
- **events.css** — Event page grid, cards, CTA buttons, and floating decor.
- **home.css** — Welcome highlights, vibe quote, info cards, newsletter card, social icons, and carousel styling.
- **menu.css** — Legacy menu tab/grid/card system and notebook card animation keyframes.
- **story-prototype.css** — Prototype story hero padding and reduced-motion guardrails.

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

// Page styles
import "./styles/pages/home.css";
import "./styles/pages/about.css";
import "./styles/pages/events.css";
import "./styles/pages/contact.css";
```

Component-scoped CSS (e.g., `kenburns-hero.css`, `parallax-hero.css`) is imported within the React component that needs it. Additional page styles (`menu.css`, `careers.css`, `story-prototype.css`) can be pulled in locally as those routes evolve.

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

Don't forget to import the new CSS file in `app/layout.tsx`!

---

## Additional Component Files

The following CSS files exist in `styles/components/` but are not currently imported in `layout.tsx`. They are used by specific components that import them directly or are reserved for future features:

- **card-gallery.css** - Card gallery component (imported in component file)
- **modal.css** - Modal/dialog component (imported in component file)
- **page-transitions.css** - Page transition effects (conditionally used)

These files follow the same organizational principles but are included on-demand rather than globally.
