# ☕ The Notebook Café — Website

> Modern web platform for The Notebook Café LLC — Where specialty coffee meets house music and creative culture in Riverside, CA.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit the site
open http://localhost:3000

# Access Sanity Studio CMS
open http://localhost:3000/studio
```

---

## 🎯 Overview

The Notebook Café is a Next.js-powered website for a specialty coffee shop in Riverside, California. The site features a premium design aesthetic, seamless content management, and a focus on the intersection of coffee culture, house music, and creative community.

### **Core Features**

✅ **Dynamic Sanity CMS** - Homepage, story content, settings, and subscribers editable in the embedded Studio  
✅ **Cinematic Hero & Reveals** - Ken Burns hero, parallax hero, and Framer Motion-powered scroll reveals  
✅ **Menu + Cart Prototype** - Tabbed menu, product modal with modifiers, add-to-cart, and cart drawer  
✅ **Accessibility & Privacy** - Accessibility widget (text size, contrast, dyslexia font, bionic reading) plus consent banner  
✅ **Newsletter System** - Email subscription with duplicate detection saved to Sanity  
✅ **Password Protection** - Optional site-wide gate for development/previews  
✅ **Spotify Integration** - Embedded playlist to surface the café vibe

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **CMS** | [Sanity v4](https://www.sanity.io/) (embedded Studio) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + custom CSS architecture |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + bespoke CSS keyframes |
| **Fonts** | DM Serif Display (display) + Outfit (body) + Caveat (handwritten accents) + OpenDyslexic (accessibility) |
| **Icons** | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```
thenotebook-cafe/
├── app/                              # Next.js App Router
│   ├── components/
│   │   ├── layout/                   # SiteHeader, SiteFooter
│   │   ├── ui/                       # AnnouncementBanner, ConsentBanner, Buttons, PasswordGate, VirtualBarista, etc.
│   │   ├── features/                 # KenBurnsHero, ParallaxHero, ProductModal, CartDrawer, AccessibilityWidget, NewsletterForm
│   │   └── providers/                # CartProvider (global cart state)
│   ├── styles/
│   │   ├── components/               # Component-specific styles (heroes, banners, nav, etc.)
│   │   ├── layout/                   # Layout primitives & floating animations
│   │   └── pages/                    # Page-specific styles
│   ├── api/                          # API routes (newsletter, auth/password gate)
│   ├── (routes)/                     # page.tsx, menu/, story/, events/, contact/, careers/, privacy/, terms/, refunds/
│   └── globals.css                   # Tailwind + design tokens and base styles
├── sanity/                           # Sanity CMS configuration
│   ├── schemaTypes/                  # homePage, aboutPage, settings, menuItem, subscriber, post, jobApplication
│   ├── lib/                          # Client utilities
│   └── sanity.config.ts              # CMS config
├── public/                           # Static assets (fonts, images, icons)
└── docs/                             # Documentation hub (architecture, specs, workflows)
```

---

## 🎨 Design System

### **Typography**
- **Display:** DM Serif Display — Headlines, hero text, branding
- **Body:** Outfit — Paragraphs, navigation, UI elements
- **Accent:** Caveat — Handwritten/hand-drawn flourishes
- **Accessibility:** OpenDyslexic — Opt-in via the accessibility widget

### **Color Palette**

```css
--cafe-black: #2c2420;
--cafe-brown: #4a3b32;
--cafe-tan: #a48d78;
--cafe-beige: #cbb9a4;
--cafe-cream: #ede7d8;
--cafe-mist: #f4f1ea;
--cafe-white: #faf9f6;
--cafe-olive: #4a4f41;
--gold-primary: #c99a58;
--gold-darker: #b48a4e;

/* Hero gradients and overlay helpers live in globals.css */
```

### **Responsive Breakpoints**
- **320px** — Base mobile (iPhone SE)
- **375px** — Standard mobile
- **640px** — Tablet (sm)
- **768px** — Desktop (md)
- **1024px** — Large desktop (lg)
- **1280px** — Wide desktop (xl)

---

## ✨ Key Features

### **1. Content Management (Sanity CMS)**
- Studio available at `/studio` for homepage hero/tagline/status line/CTA, story copy/values, vibe copy, and global settings (social, hours, address).
- Newsletter subscribers saved to the `subscriber` schema; posts (`post`) and hiring (`jobApplication`) documents are captured for updates and careers submissions.
- `menuItem` schema is ready for future dynamic menu sourcing; current menu data lives in `app/constants.ts`.

---

### **2. Menu + Cart Prototype**
- `/menu` features a parallax hero, tab navigation (drinks | meals | desserts), and search-ready filtering.
- Product modal supports modifiers (size, temperature, milk, toppings) with price deltas and note capture.
- `CartProvider` manages global cart state; `CartDrawer` handles quantity edits, modifier review, and removal with Framer Motion animations.
- Checkout action is intentionally a stub (“coming soon”) so the ordering flow stays non-transactional.

---

### **3. Homepage Experience**
- Ken Burns hero (scroll-hide) with CTA buttons, latte accent card, and signature pours grid.
- `Reveal` component + Framer Motion deliver staggered scroll reveals; floating decor comes from `animations.css`.
- Sections cover philosophy, “Low lights, good sound, better coffee,” and a three-pillar “Trinity” block to reinforce brand voice.

---

### **4. Accessibility & Privacy**
- Accessibility widget toggles text scaling, grayscale, high-contrast mode, readable font, OpenDyslexic font, hide images, link highlighting, large cursor, animation kill switch, reading guide, and bionic reading.
- Consent banner provides cookie/analytics opt-in with warm café styling.
- Optional site password gate controlled by `SITE_PASSWORD` (middleware + HTTP-only cookie).

---

### **5. Newsletter Subscription**
- Flow: client form → `/api/subscribe` → duplicate check → Sanity `subscriber` document → success/error status.
- Duplicate detection prevents noisy submissions; restart server after changing env vars or tokens.

---

### **6. Navigation & Media**
- Glass header plus mobile overlay drawer with vibe text and social links; body scroll lock and auto-close on route change/ESC.
- Spotify playlist embed showcases the café’s sound palette.

---

## 🔧 Development

### **Commands**

```bash
# Development
npm run dev                # Start dev server (localhost:3000)

# Build
npm run build             # Production build
npm start                 # Start production server

# Linting
npm run lint              # Run ESLint
```

### **Environment Variables**

Create `.env.local`:

```bash
# === Sanity CMS (Required) ===
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token

# === Optional Features ===
SITE_PASSWORD=              # Leave empty to disable password protection
NEXT_PUBLIC_SITE_URL=       # Optional: canonical URL used by sitemap/robots
```

**Important:** Restart server after changing environment variables.

---

### **Component Organization**

Components are organized by purpose:

**Layout** (`app/components/layout/`):
- `SiteHeader.tsx` — Global navigation + cart trigger
- `SiteFooter.tsx` — Global footer
- `AtmosphereStrip.tsx`, `SignaturePoursGrid.tsx` — Standalone homepage slices

**UI** (`app/components/ui/`):
- Buttons, Reveal (scroll animations), AnnouncementBanner, ConsentBanner, PasswordGate, VirtualBarista, Story/Philosophy blobs, Hero buttons

**Features** (`app/components/features/`):
- KenBurnsHero, ParallaxHero, HeroGallery, NewsletterForm/Modal, ProductModal, CartDrawer, AccessibilityWidget

**Providers** (`app/components/providers/`):
- `CartProvider.tsx` — Cart context for menu interactions

---

### **CSS Architecture**

- Global cascade (see `app/layout.tsx`): `globals.css` → navigation/hero/buttons/footer/announcement/consent/what-to-expect → layout sections/animations → page styles (home, about, events, contact).
- Hero-specific CSS (`kenburns-hero.css`, `parallax-hero.css`) is imported inside the React components; additional page styles (menu, careers, story-prototype) are opt-in as those routes evolve.
- Full breakdown and file purposes live in `CSS_ORGANIZATION.md`.
- Guidelines: stay mobile-first, prefer existing classes/tokens, keep semantic class names, and mirror CSS variables when styling inline.

---

## 📋 Content Schemas

### **homePage**
Homepage content management.

**Fields:**
- `heroHeadline`, `heroTagline`, `statusLine`
- `ctaText`, `ctaUrl`
- `whatToExpectBullets` — Array of highlights
- `vibeCopy` — Quote/mission text
- `heroImage` (future use)

---

### **aboutPage**
Story/about page content.

**Fields:**
- `title` — Page title
- `body` — Portable text + optional inline images
- `valuesHeading`, `valuesBullets`
- `missionHeading`, `founderNote`

---

### **settings**
Global site settings.

**Fields:**
- `businessName`, `address`, `phone`, `email`
- `hours` — Weekday, weekend hours
- `social` — Instagram, TikTok, Spotify URLs
- `announcementBanner` — Toggle + text
- `seo` — Default meta + OG image

---

### **subscriber**
Newsletter subscribers.

**Fields:**
- `email` — Subscriber email
- `source` — Source page
- `subscribedAt` — Timestamp

---

### **menuItem** *(future menu integration)*
- `section` — "drinks" | "meals" | "desserts"
- `category`, `name`, `description`, `price`, `sortOrder`

---

### **post**
- `title`, `slug`, `coverImage`, `publishedAt`
- `body` (blocks + images), `tags`

---

### **jobApplication**
- `fullName`, `email`, `phone`
- `positions` (multi-select) + required Saturday availability
- `resume` upload, `employmentType`, `hoursPerWeek`, `commitmentLength`
- `startDate`, optional supplemental application, motivator `message`
- `status`, `notes`, `appliedAt`

---

## 🚢 Deployment

### **Vercel**

**Build Command:** `npm run build`

**Environment Variables:**
Set in Vercel project settings:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_WRITE_TOKEN`
- `SITE_PASSWORD` (optional)
- `NEXT_PUBLIC_SITE_URL` (optional; used by sitemap/robots)

**Branches:**
- `master` — Production branch
- Feature branches — Development

**Automatic Deployments:**
- Push to `master` → Production deployment
- Push to feature branch → Preview deployment

---

## 📚 Documentation

- **CLAUDE.md** — Developer guide and AI assistant context
- **README-NEW.md** (root README) — Project overview and quick start
- **CSS_ORGANIZATION.md** — Complete CSS architecture and organization guide
- **docs/index.md** — Docs hub with links to architecture, UX specs, and component inventory

---

## 🎯 Roadmap

### **Phase 1 (Current)**
- ✅ Homepage with hero, welcome, atmosphere sections
- ✅ Menu page with tab navigation
- ✅ Story page (about)
- ✅ Events page
- ✅ Newsletter integration
- ✅ Password protection
- ✅ Cart drawer + product modal prototype
- ✅ Accessibility widget + consent banner

### **Phase 2 (Planned)**
- [ ] Sanity integration for menu items
- [ ] Blog functionality
- [ ] Event RSVP system
- [ ] Online ordering integration
- [ ] Customer reviews/testimonials

### **Phase 3 (Future)**
- [ ] E-commerce (merchandise)
- [ ] Loyalty program
- [ ] Mobile app
- [ ] Gift cards

---

## 🤝 Contributing

### **Code Standards**
- TypeScript for type safety
- JSDoc comments for all components
- Mobile-first CSS
- Semantic HTML
- WCAG accessibility compliance

### **Git Workflow**
1. Create feature branch
2. Make changes with clear commits
3. Test thoroughly (all pages, mobile, desktop)
4. Open pull request
5. Merge to `master` after review

### **Naming Conventions**
- **Components:** PascalCase (`SiteHeader.tsx`)
- **CSS Classes:** kebab-case (`.site-header`)
- **Files:** camelCase (utils), kebab-case (styles)
- **Variables:** camelCase (`menuItems`)

---

## 📞 Support

For development questions or issues, refer to:
- **CLAUDE.md** for technical details
- **docs/architecture.md** for system overview and decisions
- **CSS_ORGANIZATION.md** for styling structure
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 📄 License

© The Notebook Café LLC — All rights reserved

---

**Built with ❤️ in Riverside, CA**

*Low lights, good sound, better coffee.*
