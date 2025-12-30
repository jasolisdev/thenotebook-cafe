# CSS Organization

**Updated December 2025:** CSS has been consolidated into a single file for improved performance.

---

## Current Structure (Performance-Optimized)

All CSS is now consolidated into `app/globals.css` for faster page loads (7 HTTP requests → 1).

```
app/
├── globals.css              # All global styles consolidated here
└── styles/
    ├── COLOR_SYSTEM.md      # Color palette documentation
    ├── components/          # Component-specific styles (still imported)
    │   ├── application-form.css
    │   └── signature-pours-grid.css
    └── pages/               # Page-specific styles (imported by routes)
        ├── careers.css
        ├── contact.css
        ├── home.css
        ├── legal.css
        ├── menu.css
        ├── story.css
        └── home/            # Home page split by section
            ├── base.css
            ├── hero.css
            ├── home-fixed-background.css
            ├── section-backgrounds.css
            ├── signature-pours-section.css
            └── trinity-slab.css
```

Additional reference: `app/styles/COLOR_SYSTEM.md` documents the palette and token usage.

---

## Consolidated `globals.css` Contents

**Performance Note:** All component and layout styles are now in `globals.css` to reduce HTTP requests.

### Foundations
- Tailwind v4 import (`@import "tailwindcss";`) plus `@theme` tokens
- Local font-face declarations (Inter .woff2, Playfair Display .woff2, Torus .otf)
- **Note:** OpenDyslexic font is lazy-loaded by AccessibilityWidget (not in globals.css)
- CSS variables for typography and color tokens
- Base element resets, typography defaults, and utility helpers
- Accessibility helpers (font switches, contrast, reduced motion)

### Consolidated Component Styles
- Navigation (header, drawer, hamburger menu)
- Buttons (hero buttons, pill buttons, badges)
- Footer (simple footer with newsletter)
- Announcement banner
- Cookie consent banner

### Consolidated Layout Styles
- Sections and dividers
- Animations (disabled floating items for performance)

---

## Page-Specific Styles

Page-specific CSS remains in separate files and is imported by the route that needs it:

- **home.css** — Home page entrypoint importing `styles/pages/home/*`
- **menu.css** — Menu page layout, tabs, and list styling
- **story.css** — Story page layout and backgrounds
- **contact.css** — Contact page layout, map, and info grid
- **careers.css** — Careers page and thank-you page styles
- **legal.css** — Shared styling for privacy/terms/refunds pages

---

## Import Order (Optimized)

`app/layout.tsx` now imports only the consolidated CSS:

```tsx
import "./globals.css"; // All component and layout styles consolidated here
```

Page-specific CSS is still imported by the route that needs it:

```tsx
// app/page.tsx
import "./styles/pages/home.css";

// app/menu/page.tsx
import "@/app/styles/pages/menu.css";
```

---

## Performance Benefits

**Before Consolidation:**
- 7 HTTP requests for CSS (globals + 6 component/layout files)
- Potential for redundant selectors across files
- More complex import management

**After Consolidation:**
- 1 HTTP request for global CSS
- Cleaner import tree in layout.tsx
- ~150-200ms faster FCP

---

## Adding New Styles

- **New global utility or component?** → Add to `app/globals.css` in the appropriate section
- **New page-specific styles?** → Create file in `app/styles/pages/`
- **Modifying existing component styles?** → Edit the relevant section in `app/globals.css`

**Important:** Component and layout styles are now in `globals.css`. Only create new CSS files for page-specific styles.

---

## Legacy Files (Deleted)

The following files were consolidated into `globals.css` and have been deleted:
- ~~`app/styles/components/navigation.css`~~ → `globals.css` (NAVIGATION section)
- ~~`app/styles/components/buttons.css`~~ → `globals.css` (BUTTONS section)
- ~~`app/styles/components/footer.css`~~ → `globals.css` (FOOTER section)
- ~~`app/styles/components/announcement.css`~~ → `globals.css` (ANNOUNCEMENT BANNER section)
- ~~`app/styles/components/consent-banner.css`~~ → `globals.css` (COOKIE CONSENT BANNER section)
- ~~`app/styles/layout/sections.css`~~ → `globals.css` (SECTIONS & DIVIDERS section)
- ~~`app/styles/layout/animations.css`~~ → `globals.css` (LAYOUT ANIMATIONS section)

**Still Active (Page-Specific):**
- `app/styles/components/application-form.css` — Careers application form styles
- `app/styles/components/signature-pours-grid.css` — SignaturePoursGrid component styles
