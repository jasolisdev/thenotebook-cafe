# ☕ The Notebook Café — Website

A modern web platform for **The Notebook Café LLC**, a Riverside-based coffee shop inspired by **house music, creative culture, and connection**.
Built with **Next.js**, **Sanity CMS**, and **custom CSS + Tailwind**, the site serves as both a **public-facing website** and a **content management system** for non-technical editors.

---

## 🧱 Tech Stack

| Layer             | Technology                                                         |
| ----------------- | ------------------------------------------------------------------ |
| **Framework**     | [Next.js 16 (App Router)](https://nextjs.org/)                    |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                     |
| **CMS / Backend** | [Sanity v4](https://www.sanity.io/) (Embedded Studio at `/studio`) |
| **Styling**       | Custom CSS + [Tailwind CSS](https://tailwindcss.com/)             |
| **Fonts**         | Alpino (display) + Torus (body)                                    |
| **Icons**         | [Lucide React](https://lucide.dev/) + Custom SVGs                 |
| **Theme**         | [next-themes](https://github.com/pacocoursey/next-themes)         |
| **Linting**       | [ESLint](https://eslint.org/)                                     |
| **Deployment**    | [Vercel](https://vercel.com/)                                     |

---

## ✨ Features

- 🔄 **Dynamic content management** via Sanity Studio (home, about, menu pages editable)
- 🎨 **Premium design system** with custom Alpino display font and modular CSS architecture
- 📱 **Mobile-first responsive design** optimized for all devices (tested on real hardware)
- 🍔 **Animated mobile navigation** with slide-down drawer menu
- 🌊 **Wavy SVG section dividers** with full-bleed mobile optimization
- ✨ **Scroll-triggered animations** using Intersection Observer API
- ☕ **Floating decorative elements** with continuous float animations
- 📢 **Animated announcement banner** with steaming coffee cup animation
- 🍰 **Dynamic menu system** with tab navigation (Drinks, Meals, Desserts)
- 📝 **Newsletter subscription** with duplicate detection and Sanity integration
- 🔗 **Social media integration** (Instagram, Facebook, Twitter)
- 🎯 **SEO optimized** with metadata and Open Graph tags
- 🔒 **Optional password protection** for development/preview environments
- ⚙️ **Type-safe data fetching** with `next-sanity`
- 🧑‍💻 **Developer tooling**: ESLint, TypeScript, modular CSS

---

## 📋 Sanity Schemas

### 🏠 homePage
| Field | Type | Description |
| --------------------- | -------- | ---------------------------------------- |
| `heroHeadline` | string | Main title at the top of the page |
| `heroTagline` | string | Short tagline below the title |
| `statusLine` | string | Example: "☕ Opening Fall 2025 ☕" |
| `ctaText` | string | Call-to-action button label |
| `ctaUrl` | url | CTA link (Instagram, reservations, etc.) |
| `whatToExpectBullets` | string[] | List of "What to Expect" highlights |
| `vibeCopy` | text | Short paragraph about brand / vibe |

### 📖 aboutPage
| Field | Type | Description |
| ---------------- | ------------- | --------------------------------------- |
| `title` | string | Page title ("Our Story") |
| `body` | Portable Text | Story / intro text |
| `valuesHeading` | string | Section heading ("What we're building") |
| `valuesBullets` | string[] | List of café values or statements |
| `missionHeading` | string | Heading for the mission card |
| `founderNote` | text | Mission / founder note |

### 🍰 menuItem
| Field | Type | Description |
| ------------ | ------ | ------------------------------------------------- |
| `name` | string | Menu item name (required) |
| `section` | string | drinks / meals / desserts (required) |
| `category` | string | Determines icon (espresso, latte, tea, etc.) |
| `description` | text | Item description |
| `price` | string | Price as string (e.g., "4.95") |
| `image` | image | Custom image (overrides category icon) |
| `sortOrder` | number | Display order (lower numbers appear first) |

### ⚙️ settings
| Field | Type | Description |
| ------------ | ------ | ------------------------------------------ |
| `businessName` | string | "The Notebook Café" |
| `address` | string | Business address |
| `hours` | object | Weekday + weekend hours |
| `social` | object | Instagram, Facebook, Twitter URLs |
| `seo` | object | Default metadata + OG image |

### 📧 subscriber
| Field | Type | Description |
| ------------ | -------- | ------------------------------------------ |
| `email` | string | Subscriber email address |
| `source` | string | Where they subscribed (homepage, etc.) |
| `subscribedAt` | datetime | Timestamp of subscription |

---

## 🗺️ Future Enhancements

- 📰 Blog section powered by Sanity
- 🎵 Embedded Spotify playlist on homepage
- 📅 Events calendar for live DJ sets
- 🎨 Custom illustrations for menu categories
- 🌐 Multi-language support (English/Spanish)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jasolisdev/thenotebook-cafe.git
cd thenotebook-cafe
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the project root:

```env
# Sanity Configuration (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity Write Token (Required for newsletter & mutations)
SANITY_WRITE_TOKEN=your_write_token

# Optional: Site Password Protection (for development/preview)
SITE_PASSWORD=  # Leave empty to disable
```

### 3. Run Development Server

```bash
npm run dev
```

Then open:
- 🌐 **Main Site**: http://localhost:3000
- 🛠️ **Sanity Studio**: http://localhost:3000/studio

### 4. Build for Production

```bash
npm run build    # Build the application
npm start        # Start production server
npm run lint     # Run ESLint checks
```

---

## 🎨 Design System

### Typography
- **Display Font**: Alpino (headings, hero text, branding)
- **Body Font**: Torus (paragraphs, navigation, UI elements)
- **Letter Spacing**: Carefully tuned for premium feel

### Color Palette
- **Dark Sections**: `#0f0c0a` (espresso black)
- **Cream Sections**: `#f4f0e9` (notebook paper)
- **Accent Gold**: `rgba(201, 154, 88)` (warm highlights)
- **Text on Dark**: `#efe6d7` (cream ink)

### Styling Architecture
- **Modular CSS**: Component-specific stylesheets in `app/styles/`
- **Tailwind Integration**: Utility classes for layout and spacing
- **Custom Animations**: Keyframe animations for scroll reveals and floating elements
- **Mobile-First**: Responsive breakpoints optimized for all devices

---

## 🔧 Key Technical Decisions

### Why Two Sanity Clients?
- **Read Client** (`sanity/lib/client.ts`): CDN-enabled for fast public reads
- **Write Client** (`sanity/lib/writeClient.ts`): Authenticated for mutations (newsletter, etc.)
- Keeps write token server-side only for security

### Password Protection
Optional development mode feature:
- Controlled via `SITE_PASSWORD` environment variable
- Uses HTTP-only cookies with 7-day expiration
- Does not protect `/studio` route
- Perfect for preview deployments

### Mobile Optimization
All features tested on real iPhone 13 hardware:
- Full-bleed SVG dividers with `scale(1.03)` for gap-free rendering
- Floating decorations positioned within viewport bounds
- Scroll animations use Intersection Observer API
- Touch-friendly navigation and interactive elements

---

## 📜 License
© The Notebook Café LLC
All rights reserved.
For inquiries or collaborations, contact the development team.
