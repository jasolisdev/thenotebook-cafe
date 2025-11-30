# CSS Organization

This project's CSS has been refactored from a single large `globals.css` (2089 lines) into a clean, modular structure.

## Folder Structure

```
app/
├── globals.css (foundational styles only)
└── styles/
    ├── components/      # Reusable component styles
    │   ├── announcement.css
    │   ├── buttons.css
    │   ├── card-gallery.css
    │   ├── footer.css
    │   ├── hero.css
    │   ├── modal.css
    │   ├── navigation.css
    │   ├── page-transitions.css
    │   └── what-to-expect.css
    ├── layout/          # Layout primitives and animations
    │   ├── animations.css
    │   └── sections.css
    └── pages/           # Page-specific styles
        ├── about.css
        ├── contact.css
        ├── events.css
        ├── home.css
        └── menu.css
```

## File Contents

### `globals.css` (Foundation)
- Tailwind import
- Custom font declarations (@font-face for Alpino, now using DM Serif Display + Outfit from Google Fonts)
- Design tokens (CSS custom properties: colors, fonts, etc.)
- Base HTML/body styles
- Global utility classes (text-light, site-layout, section-cream, section-dark, etc.)
- Typography base (h1-h3, font-display)
- Core animations (fadeInUp, pulse, fadeIn, pulseGlow, scrollReveal)
- Scroll reveal system
- Accessibility styles (::selection, :focus-visible)

### `styles/components/` (Reusable Components)

**announcement.css**
- Announcement banner at top of site
- Fixed positioning and z-index management
- Gold gradient background
- Animated coffee cup icons with steam
- Responsive spacing and typography

**buttons.css**
- btn-pill (global pill button)
- badge-gold (gold badge styling)
- Button hover effects and transitions

**card-gallery.css**
- Card gallery layout and grid
- Individual card styles
- Card image containers
- Card content and typography
- Hover effects and animations

**footer.css**
- Footer layout and spacing
- Footer text styles (footer-dim)
- Social icon styling and hover effects
- Footer navigation links

**hero.css**
- Hero section layout
- Hero gradient background
- Hero title, tagline, divider, description
- Hero CTA button and badge
- All hero-specific animations

**modal.css**
- Modal overlay and backdrop
- Modal container and positioning
- Modal header, body, footer
- Close button styling
- Open/close animations
- Responsive modal sizing

**navigation.css**
- Nav bar (nav-glass-wrap, nav-glass, header-dark)
- Brand and navigation links
- Burger menu icon and animations
- Mobile drawer (drawer, drawer-nav, drawer-footer)
- All drawer transitions and effects
- Active state styling

**page-transitions.css**
- Page transition animations
- Route change effects
- Fade in/out transitions

**what-to-expect.css**
- "What to Expect" section styling
- Bullet point layouts
- Icon animations
- Section-specific typography

### `styles/pages/` (Page-Specific)

**about.css**
- About/Story hero section (badge, title, subtitle)
- About body card and content
- Values grid and value cards
- Mission card with glow animation
- About divider styling
- About footer

**contact.css**
- Contact page layout
- Contact form styling
- Form input fields and validation states
- Submit button styles
- Contact information display

**events.css**
- Events page layout
- Event card styling
- Event calendar integration
- Event details and descriptions
- RSVP/CTA buttons
- Floating decorative items specific to events page

**home.css**
- Welcome section (section label, highlights grid)
- Animated icons (coffee with steam, music notes, notebook with pen)
- Welcome CTA button
- Vibe quote section
- Home info cards (home-info-card, home-card-icon)
- Social icons (home-social-icon)
- Newsletter card (home-newsletter-card)
- Atmosphere carousel
- Home footer styling

**menu.css**
- Menu tab navigation
- Menu item cards and grid layout
- Menu item animations (menuItemFadeIn)
- Menu item icon hover effects
- Menu item modal integration
- Seasonal drinks section
- Scroll-to-top button

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
import "./styles/components/announcement.css";
import "./styles/components/what-to-expect.css";

// Layout styles
import "./styles/layout/sections.css";
import "./styles/layout/animations.css";

// Page styles
import "./styles/pages/home.css";
import "./styles/pages/about.css";
import "./styles/pages/menu.css";
import "./styles/pages/events.css";
import "./styles/pages/contact.css";
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

---

## Additional Component Files

The following CSS files exist in `styles/components/` but are not currently imported in `layout.tsx`. They are used by specific components that import them directly or are reserved for future features:

- **card-gallery.css** - Card gallery component (imported in component file)
- **modal.css** - Modal/dialog component (imported in component file)
- **page-transitions.css** - Page transition effects (conditionally used)

These files follow the same organizational principles but are included on-demand rather than globally.
