# CSS Organization

A modular CSS layout that breaks global styles into focused layers. Styles live alongside the App Router and are imported in a predictable cascade.

---

## Folder Structure

```
app/
├── globals.css
└── styles/
    ├── components/      # Reusable component styles
    │   ├── announcement.css
    │   ├── application-form.css
    │   ├── buttons.css
    │   ├── consent-banner.css
    │   ├── footer.css
    │   ├── navigation.css
    │   └── signature-pours-grid.css
    ├── layout/          # Layout primitives and animations
    │   ├── animations.css
    │   └── sections.css
    └── pages/           # Page-specific styles
        ├── careers.css
        ├── contact.css
        ├── home.css
        ├── legal.css
        ├── menu.css
        ├── story.css
        └── home/         # Home page split by section
            ├── base.css
            ├── hero.css
            ├── home-fixed-background.css
            ├── section-backgrounds.css
            ├── signature-pours-section.css
            └── trinity-slab.css
```

Additional reference: `app/styles/COLOR_SYSTEM.md` documents the palette and token usage.

---

## Foundations (`globals.css`)
- Tailwind v4 import (`@import "tailwindcss";`) plus `@theme` tokens.
- Local font-face declarations (Inter, Playfair Display, Alpino, Torus, OpenDyslexic).
- CSS variables for typography and color tokens.
- Base element resets, typography defaults, and utility helpers.
- Accessibility helpers (font switches, contrast, reduced motion).

---

## Component Styles
- **announcement.css** — Sticky top banner styling.
- **application-form.css** — Careers form layout and file upload UI.
- **buttons.css** — Button variants and CTA styling.
- **consent-banner.css** — Cookie consent banner.
- **footer.css** — Footer layout and typography.
- **navigation.css** — Header and mobile drawer styles.
- **signature-pours-grid.css** — Signature pours grid styling (currently unused).

---

## Layout Styles
- **sections.css** — Shared section spacing and divider patterns.
- **animations.css** — Floating decorative items and global keyframes.

---

## Page Styles
- **home.css** — Home page entrypoint importing `styles/pages/home/*`.
- **menu.css** — Menu page layout, tabs, and list styling.
- **story.css** — Story page layout and backgrounds.
- **contact.css** — Contact page layout, map, and info grid.
- **careers.css** — Careers page and thank-you page styles.
- **legal.css** — Shared styling for privacy/terms/refunds pages.

---

## Import Order

`app/layout.tsx` imports the global cascade in this order:

```tsx
import "./globals.css";

// Component styles
import "./styles/components/navigation.css";
import "./styles/components/buttons.css";
import "./styles/components/footer.css";
import "./styles/components/announcement.css";
import "./styles/components/consent-banner.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";
```

Page-specific CSS is imported by the route that needs it (e.g., `app/page.tsx` imports `./styles/pages/home.css`).

---

## Adding New Styles

- **New global utility?** → Add to `app/globals.css`
- **New component?** → Create file in `app/styles/components/`
- **New page?** → Create file in `app/styles/pages/`
- **New animation/layout?** → Add to `app/styles/layout/`

Remember to import new component/layout CSS in `app/layout.tsx` or the relevant route.
