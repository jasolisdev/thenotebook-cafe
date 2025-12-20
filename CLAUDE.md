# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with The Notebook Café codebase.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Development Commands](#development-commands)
4. [Architecture & File Organization](#architecture--file-organization)
5. [Component Library](#component-library)
6. [Styling System](#styling-system)
7. [Security & API Routes](#security--api-routes)
8. [Content Management (Sanity)](#content-management-sanity)
9. [Key Technical Patterns](#key-technical-patterns)
10. [Development Guidelines](#development-guidelines)
11. [Testing](#testing)
12. [Recent Updates](#recent-updates)

---

## Project Overview

**The Notebook Café** is a Next.js 16 website for a Riverside-based coffee shop, using Sanity CMS for content management. The site features a public-facing website with e-commerce capabilities and an embedded CMS studio at `/studio`.

### Core Philosophy
- **Coffee culture meets creative community**
- **House music and soulful vibes**
- **Premium, minimal design aesthetic**
- **Mobile-first, responsive experience**
- **Security-first development** (CSRF protection, rate limiting, input sanitization)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16 |
| **Language** | TypeScript | Latest |
| **CMS** | Sanity | v4 |
| **Styling** | Tailwind CSS v4 + Custom CSS | v4.1.16 |
| **Fonts** | Alpino (display) + Torus (body) | Custom |
| **Icons** | Lucide React + React Icons | Latest |
| **Animation** | Framer Motion | Latest |
| **Email** | Resend | Latest |
| **Analytics** | Vercel Analytics + Speed Insights | Latest |
| **Deployment** | Vercel | Latest |

---

## Development Commands

### Local Development
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Build & Production
```bash
npm run build    # Build for production
npm start        # Start production server
```

### Linting
```bash
npm run lint     # Run ESLint
```

### Testing
**Note:** Test infrastructure is not yet configured. See `TEST_COVERAGE_ANALYSIS.md` for comprehensive testing roadmap and recommended setup (Vitest + React Testing Library + Playwright).

---

## Architecture & File Organization

### **Directory Structure**

```
thenotebook-cafe/
├── app/                              # Next.js App Router
│   ├── components/                   # React components (organized)
│   │   ├── layout/                   # Global layout components
│   │   │   ├── SiteHeader.tsx        # Navigation with mobile drawer
│   │   │   ├── SiteFooter.tsx        # Global footer with newsletter
│   │   │   ├── SiteShell.tsx         # Root layout wrapper
│   │   │   ├── PageTransition.tsx    # Page transition animations
│   │   │   └── ImagePreloader.tsx    # Image preloading utility
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── AnnouncementBanner.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── ConsentBanner.tsx     # Cookie/analytics consent
│   │   │   ├── PasswordGate.tsx      # Password protection
│   │   │   ├── AnalyticsLoader.tsx   # Vercel Analytics loader
│   │   │   ├── HeroButtons.tsx       # CTA button group
│   │   │   ├── HeroHeart.tsx         # Decorative heart icon
│   │   │   ├── Reveal.tsx            # Scroll reveal wrapper
│   │   │   ├── RevealText.tsx        # Text reveal animation
│   │   │   ├── FadeInSection.tsx     # Fade-in animation
│   │   │   ├── StoryLink.tsx         # Stylized story link
│   │   │   ├── VirtualBarista.tsx    # AI chat widget
│   │   │   ├── NewsletterSubscribe.tsx
│   │   │   └── AccessibilityIcons.tsx
│   │   ├── features/                 # Page-specific features
│   │   │   ├── CartDrawer.tsx        # Shopping cart sidebar
│   │   │   ├── ProductModal.tsx      # Product detail modal
│   │   │   ├── MenuSection.tsx       # Menu display system
│   │   │   ├── ContactForm.tsx       # Contact form with email
│   │   │   ├── NewsLetterForm.tsx    # Email subscription
│   │   │   ├── NewsletterModal.tsx   # Newsletter popup
│   │   │   ├── NewsletterSection.tsx # Newsletter section
│   │   │   ├── HeroSection.tsx       # Homepage hero
│   │   │   ├── HeroGallery.tsx       # Hero image carousel
│   │   │   ├── CommunityModalTrigger.tsx
│   │   │   └── Accessibility/
│   │   │       └── AccessibilityWidget.tsx
│   │   ├── providers/                # Context providers
│   │   │   └── CartProvider.tsx      # Cart state management
│   │   ├── seo/                      # SEO & structured data
│   │   │   ├── LocalBusinessJsonLd.tsx
│   │   │   ├── MenuJsonLd.tsx
│   │   │   └── FAQJsonLd.tsx
│   │   ├── AtmosphereStrip.tsx       # Atmosphere section
│   │   ├── SignaturePoursGrid.tsx    # Signature drinks grid
│   │   └── ErrorBoundary.tsx         # Error boundary wrapper
│   ├── lib/                          # Utility functions
│   │   ├── colors.ts                 # Shared color constants
│   │   ├── csrf.ts                   # CSRF protection
│   │   ├── rateLimit.ts              # API rate limiting
│   │   ├── sanitize.ts               # Input sanitization
│   │   ├── logger.ts                 # Logging utility
│   │   ├── monitoring.ts             # Error monitoring
│   │   ├── fileValidation.ts         # File upload validation
│   │   ├── virtualBaristaResponder.ts # AI chat logic
│   │   └── baristaFaqData.ts         # FAQ data
│   ├── api/                          # API routes
│   │   ├── auth/verify/route.ts      # Password verification
│   │   ├── subscribe/route.ts        # Newsletter subscription
│   │   ├── unsubscribe/route.ts      # Newsletter unsubscribe
│   │   ├── contact/route.ts          # Contact form + email
│   │   └── apply/route.ts            # Job applications
│   ├── page.tsx                      # Homepage
│   ├── menu/page.tsx                 # Menu page
│   ├── story/page.tsx                # Story/About page
│   ├── contact/page.tsx              # Contact page
│   ├── careers/page.tsx              # Careers page
│   ├── privacy/page.tsx              # Privacy policy
│   ├── terms/page.tsx                # Terms of service
│   ├── refunds/page.tsx              # Refund policy
│   ├── globals.css                   # Global styles & Tailwind
│   ├── layout.tsx                    # Root layout
│   └── fonts.ts                      # Font configuration
├── sanity/                           # Sanity CMS
│   ├── schemaTypes/                  # Content schemas
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   ├── menuItem.ts
│   │   ├── settings.ts
│   │   ├── subscriber.ts
│   │   ├── contactMessage.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── client.ts                 # Read-only client (CDN)
│   │   ├── writeClient.ts            # Write client (mutations)
│   │   ├── image.ts                  # Image URL builder
│   │   └── live.ts                   # Live preview
│   ├── sanity.config.ts              # Sanity configuration
│   └── structure.ts                  # Studio structure
├── public/                           # Static assets
│   ├── fonts/                        # Alpino font files
│   ├── icons/                        # Menu category SVG icons
│   ├── unsplash/                     # Stock images
│   ├── hero-bg.png
│   ├── logo.png
│   └── notebook-divider-cream.svg
├── CLAUDE.md                         # This file
├── README.md                         # User-facing documentation
├── TEST_COVERAGE_ANALYSIS.md         # Test coverage roadmap
└── REFACTORING_SUMMARY.md            # Refactoring guide
```

---

## Component Library

### **Layout Components** (`app/components/layout/`)

#### SiteHeader
Global navigation header with responsive mobile drawer.

**Features:**
- Fixed announcement banner integration
- Desktop horizontal navigation (Home | Menu | Story | Contact | Careers)
- Full-screen mobile overlay menu
- Active page highlighting
- Keyboard navigation (ESC to close drawer)
- Body scroll lock when drawer open
- Shopping cart icon with item count badge
- Social media links (Instagram, Spotify)

**Props:**
```typescript
{
  instagramUrl?: string;
  spotifyUrl?: string;
  burgerUntil?: "sm" | "md" | "lg" | "xl";  // Breakpoint for mobile menu
  announcementText?: string;
}
```

---

#### SiteFooter
Global footer with business information, navigation, and newsletter signup.

**Features:**
- Business address, phone, and hours
- Footer navigation links
- Inline newsletter subscription form
- Copyright notice
- Social media links
- Minimal mobile-first design (redesigned Dec 2024)

**Props:**
```typescript
{
  showFloatingItems?: boolean;
  FloatingItemsComponent?: React.ComponentType<{variant: string}>;
}
```

---

#### SiteShell
Root layout wrapper that provides global context and providers.

**Features:**
- Wraps all pages with CartProvider
- Manages global state
- Provides layout structure

---

### **UI Components** (`app/components/ui/`)

#### Button
Reusable button component with multiple variants.

**Variants:**
- `default` - Primary CTA button
- `outline` - Outlined button
- `ghost` - Minimal button

**Features:**
- Full-width option
- Disabled state
- Loading state support
- Accessible (ARIA attributes)

---

#### ConsentBanner
Cookie and analytics consent banner (GDPR/CCPA compliant).

**Features:**
- Shows on first visit
- Persists acceptance to localStorage
- Loads Vercel Analytics only after consent
- Dismissible
- Privacy policy link

---

#### PasswordGate
Password protection wrapper for protected content.

**Features:**
- Session-based authentication
- Integrates with `/api/auth/verify`
- Error handling
- Persists auth to sessionStorage
- Responsive design

---

#### VirtualBarista
AI-powered chat widget for customer support.

**Features:**
- FAQ-based responses
- Menu information
- Hours and location
- Expandable/collapsible interface
- Mobile-optimized

---

#### Accessibility Widget
Full-featured accessibility controls.

**Features:**
- Font size adjustment (3 levels)
- High contrast mode
- Reduced motion toggle
- Persists settings to localStorage
- Keyboard accessible
- ARIA-compliant

---

### **Feature Components** (`app/components/features/`)

#### CartDrawer
Shopping cart sidebar with full e-commerce functionality.

**Features:**
- Add/remove items
- Quantity adjustment (+/-)
- Edit item customizations
- Price calculation with tax (8%)
- LocalStorage persistence
- Empty state
- Checkout CTA (coming soon)
- Framer Motion animations

**State Management:**
- Uses CartProvider context
- Syncs across components
- Persists to localStorage

---

#### ProductModal
Product detail modal with customization options.

**Features:**
- Product image and description
- Modifier selection (size, milk, etc.)
- Special instructions field
- Quantity selector
- Add to cart / Update cart
- Edit mode for existing cart items
- Responsive layout

---

#### ContactForm
Contact form with email notification via Resend.

**Features:**
- Fields: name, email, subject, message
- Comprehensive validation
- Rate limiting (3 req/min)
- CSRF protection
- Input sanitization
- Sends formatted email to business
- Creates Sanity document for record-keeping
- Beautiful HTML email template with dark mode support
- Success/error states

**Email Template Features:**
- Editorial newsletter design
- Dark mode support with `prefers-color-scheme`
- Mobile-responsive
- Reply-to button with pre-filled subject and signature
- Timezone-aware timestamp (PST)
- XSS protection (all inputs escaped)

---

#### NewsLetterForm
Email subscription form with duplicate detection.

**Features:**
- Email validation
- Duplicate detection (case-insensitive)
- Two styles: default (homepage) and inline (footer)
- API integration (`/api/subscribe`)
- Creates subscriber documents in Sanity
- Unsubscribe token generation
- Rate limiting (5 req/min)
- CSRF protection

---

#### MenuSection
Menu display system with product modals.

**Features:**
- Grid layout for menu items
- Product cards with images
- Click to open ProductModal
- Category filtering
- Responsive design

---

### **SEO Components** (`app/components/seo/`)

#### LocalBusinessJsonLd
Structured data for local business SEO.

**Schema.org Fields:**
- Business name, address, phone
- Hours of operation
- Price range
- Accepts reservations
- Geo coordinates
- Social media profiles

---

#### MenuJsonLd
Structured data for menu items.

**Schema.org Fields:**
- Menu sections
- Item names, descriptions, prices
- Dietary information
- Images

---

#### FAQJsonLd
Structured data for frequently asked questions.

**Schema.org Fields:**
- Question/answer pairs
- Improves rich snippet eligibility
- Voice search optimization

---

### **Providers** (`app/components/providers/`)

#### CartProvider
Global cart state management using React Context.

**API:**
```typescript
const {
  items,           // CartItem[]
  isOpen,          // boolean
  open,            // () => void
  close,           // () => void
  addItem,         // (item: CartItem) => void
  removeItem,      // (cartId: string) => void
  updateQuantity,  // (cartId: string, quantity: number) => void
  clearCart,       // () => void
} = useCart();
```

**Features:**
- LocalStorage persistence
- Cart open/close state
- Item CRUD operations
- Automatic price calculations

---

## Styling System

### **Design Tokens**

#### Typography
```css
--font-sans: "Torus", system-ui, sans-serif;      /* Body text */
--font-display: "Alpino", "Torus", sans-serif;    /* Headings */
```

**Usage:**
- **Display Font (Alpino)**: All h1, h2, h3, branding, hero text
- **Body Font (Torus)**: Paragraphs, navigation, UI elements

---

#### Color Palette

**Tailwind v4 Configuration:**
The site uses Tailwind CSS v4 with colors registered via the `@theme` directive in `globals.css`:

```css
/* Tailwind v4 Theme - generates bg-cafe-*, text-cafe-* utilities */
@theme {
  /* Core Palette */
  --color-cafe-black: #2C2420;      /* Dark brown - headings, primary text */
  --color-cafe-brown: #4A3B32;      /* Medium brown - body text */
  --color-cafe-tan: #A48D78;        /* Primary accent - CTAs, highlights */
  --color-cafe-tan-dark: #8E7965;   /* Button hover states */
  --color-cafe-beige: #CBB9A4;      /* Borders, muted elements */
  --color-cafe-luxe-oat: #CBBFAF;   /* Navigation accents */
  --color-cafe-cream: #EDE7D8;      /* Light backgrounds */
  --color-cafe-mist: #F4F1EA;       /* Very light backgrounds */
  --color-cafe-white: #FAF9F6;      /* Main background */

  /* Premium Navbar/Footer */
  --color-coffee-50: #F3EFE9;       /* Navbar text (light) */
  --color-coffee-900: #2C241F;      /* Navbar text (scrolled) */

  /* Accent */
  --color-gold: #C4A484;            /* Accessibility, password gate */
}
```

**Shared Colors** (`app/lib/colors.ts`):
Used in React components that need static color values (e.g., CartDrawer, ProductModal).

```typescript
import { COLORS } from '@/app/lib/colors';

// Available colors:
COLORS.black, COLORS.brown, COLORS.tan, COLORS.beige,
COLORS.cream, COLORS.mist, COLORS.white, COLORS.red
```

**Best Practice:** Prefer CSS variables (`var(--color-cafe-tan)`) for theme support over static imports.

---

#### Responsive Breakpoints
```css
/* Mobile */
320px   /* Base mobile (iPhone SE) */
375px   /* Standard mobile */

/* Tablet */
640px   /* sm: Tablet portrait */
768px   /* md: Tablet landscape */

/* Desktop */
1024px  /* lg: Desktop */
1280px  /* xl: Large desktop */
```

---

### **Visual Rhythm: Alternating Background Pattern**

The homepage uses an intentional alternating background pattern to create visual flow:

**Homepage Section Flow:**
1. **Hero** - `cafe-mist` - Warm welcome
2. **Signature Pours** - `cafe-white` - Clean product showcase
3. **Our Philosophy** - `cafe-mist` + skewed cream accent (right)
4. **Low Lights** - `cafe-cream` + skewed mist accent (left)
5. **Trinity** - `cafe-white` - Breathing room
6. **Atmosphere** - `cafe-mist` + skewed cream accent (bottom)
7. **Newsletter** - Light tan tint - Warm close

**Design Principle:**
- Alternating warm/clean creates natural scroll rhythm
- Skewed decorative elements vary in direction for dynamic interest
- Warm sections feel intimate; white sections provide breathing room
- Mirrors the layered aesthetic of coffee (crema, espresso, milk)

---

## Security & API Routes

### **Security Architecture**

All API routes are protected by three layers of security:

1. **CSRF Protection** (`app/lib/csrf.ts`)
   - Validates Origin/Referer headers
   - Allows localhost, production domain, and Vercel previews
   - Returns 403 for invalid origins

2. **Rate Limiting** (`app/lib/rateLimit.ts`)
   - In-memory IP-based rate limiting
   - Configurable limits per endpoint
   - Returns 429 with Retry-After header
   - Automatic cleanup of expired entries

3. **Input Sanitization** (`app/lib/sanitize.ts`)
   - Removes HTML tags and script injection
   - Validates email format
   - Sanitizes URLs (http/https only)
   - Multi-line text sanitization
   - Recursive object sanitization

---

### **API Routes**

#### POST `/api/subscribe`
Newsletter subscription endpoint.

**Security:**
- Rate limit: 5 requests per minute
- CSRF protected
- Input sanitization

**Request:**
```json
{
  "email": "user@example.com",
  "source": "homepage"
}
```

**Response:**
```json
{
  "ok": true,
  "duplicate": false,
  "id": "doc-id"
}
```

**Features:**
- Duplicate detection (case-insensitive)
- Generates unsubscribe token
- Email normalization
- Length validation (max 254 chars)

---

#### POST `/api/contact`
Contact form submission with email notification.

**Security:**
- Rate limit: 3 requests per minute
- CSRF protected
- Input sanitization
- HTML escaping in email template

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "Hello..."
}
```

**Features:**
- Sends formatted email via Resend
- Beautiful HTML template with dark mode
- Creates Sanity document for record-keeping
- Reply-to button with pre-filled content
- Continues even if email fails (logs error)

**Email Template:**
- Editorial newsletter design
- Dark mode support via `prefers-color-scheme`
- Mobile responsive
- XSS protection (all inputs escaped)
- Timezone-aware formatting (PST)

---

#### POST `/api/unsubscribe`
Newsletter unsubscription endpoint.

**Security:**
- Token-based unsubscribe (no authentication needed)
- CSRF protected
- Rate limiting

---

#### POST `/api/apply`
Job application submission.

**Security:**
- Rate limiting
- File upload validation
- Input sanitization

---

#### POST `/api/auth/verify`
Password verification for protected content.

**Security:**
- Session-based
- Rate limiting (prevents brute force)
- Constant-time comparison

---

### **Logging & Monitoring**

**Logger** (`app/lib/logger.ts`):
- Structured logging
- Development: console output
- Production: JSON format (ready for log aggregation)
- Log levels: info, warn, error

**Monitoring** (`app/lib/monitoring.ts`):
- Error tracking
- Performance monitoring
- Ready for Sentry/DataDog integration

---

## Content Management (Sanity)

### **Two Client Pattern**

**Read Client** (`sanity/lib/client.ts`):
- CDN-enabled for fast public data fetching
- Used in all page components
- No authentication required

**Write Client** (`sanity/lib/writeClient.ts`):
- Authenticated with `SANITY_WRITE_TOKEN`
- Only used in API routes (newsletter, mutations, contact)
- Keeps token server-side for security

---

### **Content Schemas**

#### subscriber
Newsletter subscriber data.

**Fields:**
- `email` - Subscriber email (unique, lowercase)
- `source` - Source page ("homepage", "footer", "modal", etc.)
- `status` - "subscribed" | "unsubscribed"
- `unsubscribeToken` - UUID for unsubscribe link
- `createdAt` - Timestamp

---

#### contactMessage
Contact form submissions.

**Fields:**
- `name` - Sender name
- `email` - Sender email
- `subject` - Message subject
- `message` - Message body
- `status` - "new" | "read" | "archived"
- `source` - "contact-page"
- `createdAt` - Timestamp

---

#### settings
Global site configuration.

**Fields:**
- `social.instagram` - Instagram URL
- `social.spotify` - Spotify playlist URL
- `hours.weekday` - Weekday hours
- `hours.weekend` - Weekend hours
- `address` - Business address
- `phone` - Business phone

---

## Key Technical Patterns

### **Server Components (Default)**
All pages use async Server Components for data fetching.

```typescript
export default async function HomePage() {
  const data = await client.fetch(`*[_type=="homePage"][0]{ ... }`);
  return <main>...</main>;
}
```

---

### **Client Components**
Mark with `"use client"` directive when using:
- React hooks (useState, useEffect)
- Browser APIs (window, document)
- Event handlers (onClick, onChange)
- Third-party interactive libraries (Framer Motion)

**Examples:** CartDrawer, ProductModal, NewsLetterForm, CartProvider

---

### **Cart Flow**
1. User clicks product on menu
2. ProductModal opens with customization options
3. User selects modifiers, quantity, and adds notes
4. Clicks "Add to Cart" → calls `addItem()` from CartProvider
5. Item added to cart state and localStorage
6. Cart badge updates with item count
7. User clicks cart icon → CartDrawer opens
8. Can edit quantity, remove items, or edit customizations
9. Click "Checkout" → Coming soon (shows alert)

---

### **Contact Form Flow**
1. User fills out form (name, email, subject, message)
2. Client-side validation
3. POST to `/api/contact`
4. Server validates, sanitizes, and checks rate limit
5. Sends HTML email via Resend to business owner
6. Creates contactMessage document in Sanity
7. Returns success/error to client
8. Form shows appropriate message

---

### **Newsletter Flow**
1. User enters email in NewsLetterForm (homepage, footer, or modal)
2. Client-side email validation
3. POST to `/api/subscribe` with email and source
4. Server checks for duplicates (case-insensitive)
5. If duplicate: returns `{ok: true, duplicate: true}`
6. If new: creates subscriber document with unsubscribe token
7. Form shows success message or duplicate message

---

## Development Guidelines

### **CSS Organization**
- Component styles → `app/styles/components/`
- Page styles → `app/styles/pages/`
- Use Tailwind utilities first
- Use existing CSS variables before adding new ones
- Follow mobile-first responsive approach
- Use semantic class names (no `.test-*`, `.temp-*`)

### **Naming Conventions**

**CSS Classes:** kebab-case
```css
.site-header
.hero-title
.welcome-card
```

**Components:** PascalCase
```tsx
SiteHeader
CartDrawer
NewsLetterForm
```

**Files:**
- Components: PascalCase (`CartDrawer.tsx`)
- Styles: kebab-case (`navigation.css`)
- Utils: camelCase (`sanitize.ts`)

### **Import Paths**
Use absolute imports with `@` alias:
```typescript
// ✅ Good
import { CartProvider } from '@/app/components/providers/CartProvider';
import { COLORS } from '@/app/lib/colors';

// ❌ Avoid
import { CartProvider } from '../../components/providers/CartProvider';
```

### **Security Best Practices**

1. **Always sanitize user input** before storing in Sanity
2. **Use CSRF protection** on all mutation endpoints
3. **Implement rate limiting** to prevent abuse
4. **Escape HTML** in email templates
5. **Use write client only server-side** (never expose token to client)
6. **Validate file uploads** (size, type, content)
7. **Log security events** for monitoring

### **Git Workflow**
- Work in feature branches (format: `claude/feature-name-xxxxx`)
- Commit with descriptive messages (format: `type(scope): description`)
- Push to remote with: `git push -u origin branch-name`
- Merge to `master` when ready for production
- Test thoroughly before deploying

---

## Testing

### **Current Status**
- **Test Coverage: 0%**
- No test framework configured
- No test files exist

### **Testing Roadmap**
See `TEST_COVERAGE_ANALYSIS.md` for comprehensive testing strategy.

**Recommended Stack:**
- **Vitest** - Unit/integration testing (better Next.js 16 support than Jest)
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **MSW** - API mocking

**Priority Areas:**
1. **CRITICAL:** API routes security (subscribe, contact, apply)
2. **CRITICAL:** Security utilities (csrf, rateLimit, sanitize)
3. **HIGH:** Cart system (CartProvider, CartDrawer, ProductModal)
4. **HIGH:** Forms (NewsLetterForm, ContactForm)
5. **MEDIUM:** UI components (Button, ConsentBanner, PasswordGate)
6. **LOW:** SEO components, layout components

**Target Coverage:**
- API routes: 90%+
- Security utilities: 95%+
- Cart & forms: 80%+
- Overall: 80%+

---

## Recent Updates

### **December 2025 - Test Coverage Analysis**
- ✅ Created comprehensive test coverage analysis document
- ✅ Identified 190-230 test cases needed
- ✅ Proposed Vitest + React Testing Library + Playwright setup
- ✅ Documented security testing scenarios (XSS, CSRF, rate limiting)
- ✅ Created 7-week testing implementation roadmap

### **December 2025 - Tailwind v4 Migration & Visual Rhythm**
- ✅ Fixed Tailwind v4 color generation using `@theme` directive
- ✅ Registered all cafe-* colors for proper utility class generation
- ✅ Implemented alternating background pattern for visual flow
- ✅ Added directional skewed accent elements (right, left, bottom)
- ✅ Updated navbar to cafe-mist/85 with tan border for cohesion
- ✅ Fixed cart delete button visibility (always visible, theme color)
- ✅ Increased navbar logo by 5% and "Café" text by 10%
- ✅ Created systematic color documentation in colors.ts
- ✅ Ignored .playwright-mcp artifacts in git

### **December 2025 - Contact Form & Email**
- ✅ Added Resend email integration for contact form
- ✅ Created beautiful editorial newsletter-style email template
- ✅ Implemented dark mode support for emails (prefers-color-scheme)
- ✅ Added mobile-responsive email layout
- ✅ Pre-filled reply button with subject and signature
- ✅ XSS protection with HTML escaping
- ✅ Timezone-aware timestamps (PST)
- ✅ Graceful email failure handling (logs error, still saves to Sanity)
- ✅ Allowed Vercel preview deployments in CSRF validation

### **December 2025 - Footer Redesign**
- ✅ Redesigned footer with minimal mobile-first layout
- ✅ Integrated inline newsletter subscription
- ✅ Improved responsive spacing and typography
- ✅ Updated footer navigation and business info

### **November 2025 - Major Refactoring**
- ✅ Reorganized components into `layout/`, `ui/`, `features/`, `providers/`, `seo/`
- ✅ Renamed confusing classes (`.page-dark` → `.site-layout`, `.ink-cream` → `.text-light`)
- ✅ Added comprehensive JSDoc documentation to all components
- ✅ Cleaned up test artifacts and legacy code
- ✅ Updated CSS with semantic variable names
- ✅ Created refactoring summary documentation

### **November 2025 - E-Commerce Features**
- ✅ Implemented shopping cart system (CartProvider, CartDrawer)
- ✅ Created ProductModal with customization options
- ✅ Added quantity controls and modifiers
- ✅ LocalStorage cart persistence
- ✅ Framer Motion animations
- ✅ Edit cart items functionality

### **November 2025 - SEO Enhancements**
- ✅ Added LocalBusinessJsonLd for local SEO
- ✅ Added MenuJsonLd for menu structured data
- ✅ Added FAQJsonLd for FAQ rich snippets
- ✅ Improved meta tags and Open Graph
- ✅ Enhanced accessibility (ARIA labels, semantic HTML)

---

## Environment Variables

Required in `.env.local`:
```bash
# Sanity CMS (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token

# Email (Required for contact form)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_RECIPIENT=business@example.com

# Optional: Password Protection
SITE_PASSWORD=  # Leave empty to disable

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

**Important:** Environment variables require server restart to take effect.

---

## Deployment

**Platform:** Vercel

**Build Command:** `npm run build`

**Environment Variables:** Set in Vercel project settings

**Branches:**
- `master` - Production (stable releases)
- `claude/*` - Claude-generated feature branches

**Deployment Notes:**
- Vercel preview deployments are allowed in CSRF validation
- Email sending works in both preview and production
- Sanity Studio is accessible at `/studio` on all deployments

---

## Support & Resources

- **TEST_COVERAGE_ANALYSIS.md** - Comprehensive testing roadmap (190+ test cases)
- **REFACTORING_SUMMARY.md** - Complete refactoring guide
- **README.md** - User-facing documentation
- **CLAUDE.md** (this file) - Developer guide for Claude Code

---

## Pages & Routes

### Public Pages
- `/` - Homepage with hero, signature pours, philosophy, newsletter
- `/menu` - Menu page with product cards and modals
- `/story` - About/Story page
- `/contact` - Contact page with form
- `/careers` - Careers page with job listings
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/refunds` - Refund policy

### Admin
- `/studio` - Sanity CMS Studio (requires authentication)

---

© The Notebook Café LLC — All rights reserved
