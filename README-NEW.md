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

✅ **Dynamic Content Management** - Sanity CMS integration with embedded studio
✅ **Responsive Design** - Mobile-first, optimized for all devices (320px+)
✅ **Premium Animations** - Scroll-triggered reveals and smooth transitions
✅ **Newsletter System** - Email subscription with duplicate detection
✅ **Menu System** - Tab-based navigation with seasonal drinks section
✅ **Spotify Integration** - Embedded playlist showcasing café vibes
✅ **Password Protection** - Optional site-wide password gate for development

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **CMS** | [Sanity v4](https://www.sanity.io/) |
| **Styling** | Custom CSS + [Tailwind CSS](https://tailwindcss.com/) |
| **Fonts** | Alpino (display) + Torus (body) |
| **Icons** | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```
thenotebook-cafe/
├── app/                              # Next.js App Router
│   ├── components/
│   │   ├── layout/                   # Global layout (Header, Footer, ScrollReveal)
│   │   ├── ui/                       # Reusable UI (Banner, Buttons, Modals)
│   │   ├── features/                 # Page features (Menu, Newsletter, Carousel)
│   │   └── decorative/               # Floating decorations (coffee beans, plants)
│   ├── styles/
│   │   ├── components/               # Component-specific styles
│   │   ├── layout/                   # Layout & animations
│   │   └── pages/                    # Page-specific styles
│   ├── api/                          # API routes (newsletter, auth)
│   ├── (pages)/                      # Route pages (menu, story, events)
│   └── globals.css                   # Global styles & design tokens
├── sanity/                           # Sanity CMS configuration
│   ├── schemaTypes/                  # Content models
│   ├── lib/                          # Client utilities
│   └── sanity.config.ts              # CMS config
├── public/                           # Static assets (fonts, images, icons)
└── (docs)/                           # Documentation
```

---

## 🎨 Design System

### **Typography**
- **Display Font:** Alpino — Headlines, hero text, branding
- **Body Font:** Torus — Paragraphs, navigation, UI elements

### **Color Palette**

```css
/* Neutral Tones */
--cream: #f4f0e9;              /* Light section background */
--espresso-brown: #2a1f16;     /* Primary dark text */

/* Cool Accents */
--coffee-bean: #1a3636;        /* Dark section background (cool teal) */

/* Gold Accents */
--gold-primary: rgba(201, 154, 88, 1);
--gold-muted: rgba(164, 131, 116, 0.9);
```

### **Responsive Breakpoints**
- **320px** — Base mobile (iPhone SE)
- **375px** — Standard mobile
- **640px** — Tablet (sm)
- **768px** — Desktop (md)
- **1024px** — Large desktop (lg)

---

## ✨ Key Features

### **1. Content Management (Sanity CMS)**

Access the embedded CMS at `/studio` to manage:
- Homepage hero, tagline, and highlights
- About/Story page content and values
- Menu items (future integration)
- Global settings (social links, business hours)
- Newsletter subscribers

**Two-Client Architecture:**
- **Read Client:** CDN-enabled for fast public data fetching
- **Write Client:** Authenticated for mutations (newsletter, etc.)

---

### **2. Menu System**

**Tab Navigation:**
- Drinks | Meals | Desserts
- Seasonal/Specialty drinks section
- Two-column grid layout with card design
- Modal for item details

**Data:** Currently hardcoded in `MenuContent.tsx` (Sanity schema exists for future integration)

---

### **3. Newsletter Subscription**

**Flow:**
1. User enters email in form
2. Client-side validation
3. POST to `/api/subscribe`
4. Duplicate check in Sanity
5. Create subscriber document
6. Return success/error status

**Integration:** Saves to Sanity CMS `subscriber` schema

---

### **4. Scroll Animations**

**System:** Intersection Observer API

**Usage:**
```tsx
import ScrollReveal from '@/app/components/layout/ScrollReveal';

<ScrollReveal />
<div className="scroll-reveal">
  This content animates when scrolled into view
</div>
```

**Behavior:**
- Above-fold: 0.3s quick fade
- Below-fold: 0.5s scale + fade
- Triggers 50px before viewport entry

---

### **5. Mobile Navigation**

**Desktop (640px+):**
- Horizontal nav bar (Home | Menu | Story | Events)
- Fixed announcement banner

**Mobile (< 640px):**
- Full-screen overlay drawer
- Fade + scale animation
- Navigation links + social icons + vibe text
- Decorative floating coffee beans
- Body scroll lock when open
- Closes on route change or ESC key

---

### **6. Password Protection** *(Optional)*

Enable site-wide password protection for development/preview:

```bash
# .env.local
SITE_PASSWORD=your_password_here
```

**Features:**
- Middleware-based authentication
- HTTP-only cookie (7-day expiration)
- Excludes `/studio` from protection
- Clean password gate UI

**To disable:** Remove or leave `SITE_PASSWORD` empty

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
```

**Important:** Restart server after changing environment variables.

---

### **Component Organization**

Components are organized by purpose:

**Layout** (`app/components/layout/`):
- `SiteHeader.tsx` — Global navigation
- `SiteFooter.tsx` — Global footer
- `ScrollReveal.tsx` — Animation system

**UI** (`app/components/ui/`):
- Reusable components (Banner, Buttons, Cards, Modals)

**Features** (`app/components/features/`):
- Page-specific features (Menu, Newsletter, Carousel)

**Decorative** (`app/components/decorative/`):
- Floating items (coffee beans, plants)

---

### **CSS Architecture**

**Component Styles:**
```
app/styles/components/
├── announcement.css
├── buttons.css
├── card-gallery.css
├── footer.css
├── hero.css
├── modal.css
├── navigation.css
├── page-transitions.css
└── what-to-expect.css
```

**Layout Styles:**
```
app/styles/layout/
├── animations.css
└── sections.css
```

**Page Styles:**
```
app/styles/pages/
├── about.css
├── contact.css
├── events.css
├── home.css
└── menu.css
```

**Best Practices:**
- Mobile-first responsive design
- Use existing classes before creating new ones
- Semantic class names (no `.test-*` or `.temp-*`)
- Follow established naming conventions

---

## 📋 Content Schemas

### **homePage**
Homepage content management.

**Fields:**
- `heroHeadline` — Main title (hidden, logo shown)
- `heroTagline` — Tagline text
- `whatToExpectBullets` — Array of 3 highlights
- `vibeCopy` — Quote section text

---

### **aboutPage**
Story/about page content.

**Fields:**
- `title` — Page title
- `body` — Portable text content
- `valuesBullets` — Array of values
- `founderNote` — Mission statement

---

### **menuItem**
Menu system items (future integration).

**Fields:**
- `section` — "drinks" | "meals" | "desserts"
- `category` — Icon type
- `name` — Item name
- `description` — Item description
- `price` — Price string
- `sortOrder` — Display order

---

### **settings**
Global site settings.

**Fields:**
- `social` — Instagram, Spotify URLs
- `hours` — Weekday, weekend hours
- `address` — Business address

---

### **subscriber**
Newsletter subscribers.

**Fields:**
- `email` — Subscriber email
- `source` — Source page
- `subscribedAt` — Timestamp

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

**Branches:**
- `master` — Production branch
- Feature branches — Development

**Automatic Deployments:**
- Push to `master` → Production deployment
- Push to feature branch → Preview deployment

---

## 📚 Documentation

- **CLAUDE.md** — Developer guide and AI assistant context
- **README.md** (this file) — Project overview and quick start
- **CSS_ORGANIZATION.md** — Complete CSS architecture and organization guide
- **REFACTORING_SUMMARY.md** — Complete refactoring documentation

---

## 🎯 Roadmap

### **Phase 1 (Current)**
- ✅ Homepage with hero, welcome, atmosphere sections
- ✅ Menu page with tab navigation
- ✅ Story page (about)
- ✅ Events page
- ✅ Newsletter integration
- ✅ Password protection

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
- **REFACTORING_SUMMARY.md** for architecture changes
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 📄 License

© The Notebook Café LLC — All rights reserved

---

**Built with ❤️ in Riverside, CA**

*Low lights, good sound, better coffee.*
