# ☕ The Notebook Café — Website

> Internal documentation for The Notebook Café website development

A modern web platform for **The Notebook Café LLC**, a Riverside-based coffee shop inspired by **house music, creative culture, and connection**.

---

## 🧱 Tech Stack

| Layer             | Technology                                                         |
| ----------------- | ------------------------------------------------------------------ |
| **Framework**     | [Next.js 16 (App Router)](https://nextjs.org/)                    |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                     |
| **CMS / Backend** | [Sanity v4](https://www.sanity.io/) (Embedded Studio at `/studio`) |
| **Styling**       | Custom CSS + [Tailwind CSS](https://tailwindcss.com/)             |
| **Fonts**         | Alpino (display) + Torus (body)                                    |
| **Icons**         | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Theme**         | [next-themes](https://github.com/pacocoursey/next-themes)         |
| **Deployment**    | [Vercel](https://vercel.com/)                                     |

---

## ✨ Key Features

### Content & CMS
- 🔄 **Dynamic content management** via Sanity Studio at `/studio`
- 📝 **Newsletter subscription** with duplicate detection and Sanity integration
- ☕ **Dynamic menu system** with tab navigation (Drinks, Meals, Desserts)
- 🎵 **Spotify playlist integration** embedded on homepage

### Design & UX
- 🎨 **Premium design system** with custom Alpino display font
- 📱 **Mobile-first responsive design** (iPhone 13 optimized)
- 🍔 **Animated mobile navigation** with slide-down drawer menu
- 🌊 **Wavy SVG section dividers** for visual flow
- ✨ **Scroll-triggered animations** using Intersection Observer API
- ☕ **Floating decorative elements** (coffee beans, plants)
- 📢 **Announcement banner** with steaming coffee cup animation

### Technical
- 🔒 **Optional password protection** for development/preview
- 🎯 **SEO optimized** with metadata and Open Graph tags
- ⚙️ **Type-safe data fetching** with `next-sanity`
- 🚀 **Vercel deployment** with automatic builds

---

## 📂 Project Structure

```
thenotebook-cafe/
├── app/                          # Next.js App Router
│   ├── components/               # Reusable React components
│   │   ├── AnnouncementBanner.tsx  # Top banner with coffee cups
│   │   ├── SiteHeader.tsx         # Navigation (desktop + mobile drawer)
│   │   ├── MenuContent.tsx        # Menu tabs and item grid
│   │   └── NewsLetterForm.tsx     # Email subscription form
│   ├── styles/                   # CSS organization
│   │   ├── components/           # Component-specific styles
│   │   │   ├── hero.css          # Hero section (logo, CTA, badge)
│   │   │   ├── navigation.css    # Nav bar and mobile drawer
│   │   │   └── announcement.css  # Banner styles
│   │   └── pages/                # Page-specific styles
│   │       ├── home.css          # Homepage cards, welcome section
│   │       ├── menu.css          # Menu items, tabs
│   │       └── about.css         # About page layout
│   ├── page.tsx                  # Homepage
│   ├── menu/page.tsx             # Menu page
│   ├── about/page.tsx            # About page
│   └── api/                      # API routes (newsletter, etc.)
├── sanity/                       # Sanity CMS configuration
│   ├── schemaTypes/              # Content models
│   │   ├── homePage.ts           # Hero, bullets, vibe copy
│   │   ├── aboutPage.ts          # Story, values, mission
│   │   ├── menuItem.ts           # Menu items with categories
│   │   ├── settings.ts           # Global site settings
│   │   └── subscriber.ts         # Newsletter subscribers
│   └── lib/
│       ├── client.ts             # Read-only Sanity client (CDN)
│       └── writeClient.ts        # Write client (mutations)
├── public/                       # Static assets
│   ├── fonts/                    # Alpino font files
│   ├── icons/                    # Menu category SVG icons
│   ├── hero-bg.png               # Hero background image
│   └── logo.png                  # Café logo
└── CLAUDE.md                     # AI assistant context & guidelines
```

---

## 🎨 Design System

### Typography
- **Display Font**: Alpino (h1, h2, h3, branding)
- **Body Font**: Torus (paragraphs, navigation, UI)
- **Navigation**: 400 weight, 1.2px letter-spacing
- **Card Headings**: 600 weight, 1.5px letter-spacing

### Color Palette
```css
/* Primary Colors */
--bg-solid: #0f0c0a;              /* Dark sections (espresso black) */
--bg-cream: #f4f0e9;              /* Cream sections (notebook paper) */
--gold: rgba(201, 154, 88);       /* Accent gold (warm highlights) */
--ink-cream: #efe6d7;             /* Text on dark backgrounds */
--ink-cream-dim: rgba(239, 230, 215, 0.7);  /* Dimmed text */
```

### Responsive Breakpoints
- **320px** - Base mobile (iPhone SE)
- **375px** - Standard mobile
- **640px** - Tablet (sm)
- **768px** - Desktop (md)
- **1024px** - Large desktop (lg)

---

## 📋 Content Management (Sanity)

### Main Content Types

#### 🏠 homePage
Controls homepage content:
- `heroHeadline` - Main hero title (currently hidden, logo shown instead)
- `heroTagline` - "Where Every Sip Tells a Story"
- `whatToExpectBullets` - Array of 3 highlights (coffee, music, notebook)
- `vibeCopy` - Quote text below highlights

#### 📖 aboutPage
About page sections:
- `title` - Page title
- `body` - Portable text (story/intro)
- `valuesBullets` - Array of café values
- `founderNote` - Mission statement

#### 🍰 menuItem
Menu system items:
- `section` - "drinks" | "meals" | "desserts" (determines tab)
- `category` - Icon type (espresso, latte, cold-brew, tea, food, seasonal)
- `name`, `description`, `price` - Item details
- `sortOrder` - Display order

#### ⚙️ settings
Global site configuration:
- `social.instagram` - Instagram URL
- `social.spotify` - Spotify playlist URL (embedded on homepage)
- `hours.weekday`, `hours.weekend` - Business hours

---

## 🔧 Key Technical Patterns

### Two Sanity Clients
**Read Client** (`sanity/lib/client.ts`):
- CDN-enabled for fast public data fetching
- Used in all page components

**Write Client** (`sanity/lib/writeClient.ts`):
- Authenticated with `SANITY_WRITE_TOKEN`
- Only used in API routes (newsletter submissions)
- Keeps token server-side for security

### Scroll Animations
Uses Intersection Observer API:
- Elements with `.scroll-reveal` class fade in when entering viewport
- `ScrollReveal` component must be included once per page
- Staggered delays via `style={{ animationDelay: '0.1s' }}`

### Mobile Navigation
- **Desktop** (640px+): Horizontal nav bar
- **Mobile**: Hamburger menu → slide-down drawer
- Drawer includes nav links + social icons (Instagram, Spotify)
- Auto-closes on route change or ESC key

### Hero Section
- Logo image (replaces text title for visual impact)
- h1 with `.sr-only` class for SEO (hidden visually, readable by screen readers)
- Responsive logo sizing: 140px → 240px
- Maintains fadeInUp animation

---

## 🎵 Spotify Integration

**Playlist**: [The Notebook Café Playlist](https://open.spotify.com/playlist/58qhSWWn3g1QeCKoVFoAJk)

**Implementation**:
- Embedded iframe in "Hear the Vibe" section on homepage
- Styled with gold gradient frame and enhanced shadows
- Mobile drawer Spotify icon links to playlist
- Not in main navigation (only accessible via drawer or homepage)

---

## 🔐 Environment Variables

Required in `.env.local`:
```env
# Sanity CMS (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token

# Optional: Password Protection
SITE_PASSWORD=  # Leave empty to disable
```

**Note**: Environment variables require server restart to take effect.

---

## 🚢 Deployment

**Platform**: Vercel

**Build Command**: `npm run build`

**Environment Variables**: Set in Vercel project settings

**Branches**:
- `master` - Production branch (stable releases)
- `claude-edits` - Active development branch

---

## 📝 Development Guidelines

### CSS Organization
- Component styles in `app/styles/components/`
- Page styles in `app/styles/pages/`
- Use existing CSS classes before adding new ones
- Follow mobile-first responsive approach

### Naming Conventions
- **CSS Classes**: kebab-case (e.g., `hero-title`, `welcome-card`)
- **Components**: PascalCase (e.g., `SiteHeader`, `MenuContent`)
- **Files**: camelCase for scripts, kebab-case for styles

### Git Workflow
- Work in `claude-edits` branch
- Commit with descriptive messages
- Merge to `master` when ready for production
- Use AI-assisted commit messages

---

## 📞 Support & Documentation

For detailed implementation notes and change history, see **CLAUDE.md**.

© The Notebook Café LLC — All rights reserved
