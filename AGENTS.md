# AGENTS.md

**Canonical source of truth for AI agents working on The Notebook Café codebase.**

This document provides authoritative guidance for any AI assistant (Claude, Gemini, ChatGPT, Codex, etc.) when working with this project. Model-specific preferences are in their respective wrapper files (CLAUDE.md, GEMINI.md).

**Last Updated:** December 2025

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Development Commands](#development-commands)
4. [Architecture & File Organization](#architecture--file-organization)
5. [Component Library](#component-library)
6. [Styling System](#styling-system)
7. [Security & API Routes](#security--api-routes)
8. [Data & Content Management](#data--content-management)
9. [Key Technical Patterns](#key-technical-patterns)
10. [Development Guidelines](#development-guidelines)
11. [Skills](#skills)
12. [Testing](#testing)
13. [Environment Variables](#environment-variables)
14. [Deployment](#deployment)
15. [Pages & Routes](#pages--routes)

---

## Project Overview

**The Notebook Café** is a Next.js 16 website for a Riverside-based coffee shop. The site features marketing pages, menu browsing with a cart UI (no on-site checkout yet), and uses Google Sheets for newsletter subscriptions and Resend for email notifications.

### Core Philosophy

- **Coffee culture meets creative community**
- **House music and soulful vibes**
- **Premium, minimal design aesthetic**
- **Mobile-first, responsive experience**
- **Security-first development** (CSRF protection, rate limiting, input sanitization)

---

## Tech Stack

| Layer          | Technology                    | Version  |
| -------------- | ----------------------------- | -------- |
| **Framework**  | Next.js (App Router)          | 16       |
| **Language**   | TypeScript                    | Latest   |
| **Styling**    | Tailwind CSS v4 + Custom CSS  | v4.1.16  |
| **Fonts**      | Playfair Display + Torus + Inter | Custom |
| **Icons**      | Lucide React                  | Latest   |
| **Email**      | Resend                        | Latest   |
| **Newsletter** | Google Sheets + Apps Script   | -        |
| **Analytics**  | Vercel Analytics + GA4        | Latest   |
| **Testing**    | Vitest + Playwright           | Latest   |
| **Deployment** | Vercel                        | Latest   |

---

## Development Commands

### Local Development

```bash
npm run dev        # Start dev server at http://localhost:3000
```

### Build & Production

```bash
npm run build      # Build for production
npm start          # Start production server
```

### Linting & Testing

```bash
npm run lint           # Run ESLint
npm run test           # Run unit tests (Vitest)
npm run test:coverage  # Run tests with coverage
npm run test:e2e       # Run E2E tests (Playwright)
npm run test:all       # Run all tests
```

---

## Architecture & File Organization

```
thenotebook-cafe/
├── app/                              # Next.js App Router
│   ├── components/                   # React components
│   │   ├── layout/                   # Global layout (Header, Footer, etc.)
│   │   ├── ui/                       # Reusable UI (Button, Card, Modal)
│   │   ├── features/                 # Page-specific features
│   │   ├── providers/                # React context providers
│   │   ├── seo/                      # SEO components (JSON-LD, etc.)
│   │   └── decorative/               # Decorative elements
│   ├── styles/                       # CSS organization
│   │   ├── components/               # Component-specific styles
│   │   ├── layout/                   # Layout & structure
│   │   └── pages/                    # Page-specific styles
│   ├── lib/                          # Server utilities
│   │   ├── server/                   # Server-only (csrf, logger, etc.)
│   │   ├── data/                     # Data/content files
│   │   └── constants/                # Business, SEO, colors
│   ├── utils/                        # Client-safe utilities
│   ├── types/                        # Domain-specific TypeScript types
│   ├── api/                          # API routes
│   ├── globals.css                   # Global styles & Tailwind config
│   ├── layout.tsx                    # Root layout
│   └── fonts.ts                      # Font configuration
├── public/                           # Static assets
├── tests/                            # Test files
│   ├── unit/                         # Vitest unit tests
│   ├── e2e/                          # Playwright E2E tests
│   └── utils/                        # Test utilities (MSW, etc.)
└── docs/                             # Project documentation
```

**Canonical references:**
- `docs/source-tree-analysis.md` - Full directory tree
- `docs/component-inventory.md` - Component catalog

---

## Component Library

### Organization

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `layout/` | Global layout components | SiteHeader, SiteFooter, ScrollReveal |
| `ui/` | Reusable UI elements | Button, Card, Modal, ErrorBoundary |
| `features/` | Page-specific features | MenuContent, NewsletterForm, CartDrawer |
| `providers/` | React context providers | CartProvider |
| `seo/` | SEO components | LocalBusinessJsonLd, MenuJsonLd |
| `decorative/` | Aesthetic elements | HomeFloatingItems |

### Key Components

- **CartProvider** - Shopping cart state management with localStorage persistence
- **CartDrawer** - Slide-out cart panel with Framer Motion animations
- **ProductModal** - Product customization modal
- **NewsLetterForm** - Newsletter subscription form
- **ScrollReveal** - Intersection Observer-based reveal animations
- **AccessibilityWidget** - A11y features (large cursor, dyslexia font, etc.)

---

## Styling System

### CSS Architecture

The project uses a **hybrid approach**:
- **`globals.css`** - Core styles, Tailwind v4 config, design tokens, animations
- **`app/styles/`** - Modular CSS files for specific components/pages

### Design Tokens

#### Typography

```css
--font-sans: "Torus", "Inter", system-ui, sans-serif;   /* Body text */
--font-display: "Playfair Display", serif;              /* Headings */
```

- **Playfair Display**: h1, h2, h3, branding, hero text
- **Torus/Inter**: Paragraphs, navigation, UI elements

#### Color Palette (Tailwind v4)

Colors are registered via `@theme` directive in `globals.css`:

```css
@theme {
  --color-cafe-black: #2c2420;      /* Dark brown - headings */
  --color-cafe-brown: #4a3b32;      /* Medium brown - body text */
  --color-cafe-tan: #a48d78;        /* Primary accent - CTAs */
  --color-cafe-tan-dark: #8e7965;   /* Button hover states */
  --color-cafe-beige: #cbb9a4;      /* Borders, muted elements */
  --color-cafe-cream: #ede7d8;      /* Light backgrounds */
  --color-cafe-mist: #f4f1ea;       /* Very light backgrounds */
  --color-cafe-white: #fdfbf7;      /* Main background */
}
```

Use Tailwind utilities: `bg-cafe-tan`, `text-cafe-brown`, etc.

For JavaScript/React components needing static values, import from:
```typescript
import { COLORS } from "@/app/lib/constants/colors";
```

#### Responsive Breakpoints

```css
320px   /* Base mobile (iPhone SE) */
375px   /* Standard mobile */
640px   /* sm: Tablet portrait */
768px   /* md: Tablet landscape */
1024px  /* lg: Desktop */
1280px  /* xl: Large desktop */
```

### Visual Rhythm

Homepage uses alternating backgrounds for visual flow:
1. **Hero** - `cafe-mist`
2. **Signature Pours** - `cafe-white`
3. **Philosophy** - `cafe-mist` + skewed cream accent
4. **Low Lights** - `cafe-cream` + skewed mist accent
5. **Trinity** - `cafe-white`
6. **Atmosphere** - `cafe-mist` + skewed cream accent
7. **Newsletter** - Light tan tint

---

## Security & API Routes

### Security Architecture

All API routes are protected by three layers:

1. **CSRF Protection** (`app/lib/server/csrf.ts`)
   - Validates Origin/Referer headers
   - Allows localhost, production domain, Vercel previews

2. **Rate Limiting** (`app/lib/server/rateLimit.ts`)
   - In-memory IP-based limiting
   - Configurable per endpoint
   - Returns 429 with Retry-After header

3. **Input Sanitization** (`app/lib/server/sanitize.ts`)
   - Removes HTML tags and script injection
   - Validates email format
   - Sanitizes URLs

### API Endpoints

| Endpoint | Method | Purpose | Rate Limit |
|----------|--------|---------|------------|
| `/api/subscribe` | POST | Newsletter subscription | 5/min |
| `/api/contact` | POST | Contact form submission | 3/min |
| `/api/unsubscribe` | POST | Newsletter unsubscribe | - |
| `/api/apply` | POST | Job application | - |
| `/api/auth/verify` | POST | Password verification | - |

---

## Data & Content Management

### Static Content

All site content uses TypeScript constants (no CMS):

- **`app/lib/constants/business.ts`** - Business info, hours, social links
- **`app/lib/constants/seo.ts`** - Page titles, descriptions, OG images
- **`app/lib/constants/colors.ts`** - Color values for JS components

### Newsletter Subscriptions

Uses **Google Sheets + Apps Script**:
- `/api/subscribe` proxies to Google Apps Script
- Data stored in Google Sheets
- Duplicate detection and unsubscribe tokens

### Contact & Applications

Uses **Resend** for email delivery:
- `/api/contact` - Sends formatted HTML email to business owner
- `/api/apply` - Sends application with resume attachment

---

## Key Technical Patterns

### Server Components (Default)

All pages use async Server Components for data fetching:

```typescript
export default async function HomePage() {
  // Server-side data fetching
  return <main>...</main>;
}
```

### Client Components

Mark with `"use client"` when using:
- React hooks (useState, useEffect)
- Browser APIs (window, document)
- Event handlers (onClick, onChange)
- Interactive libraries (Framer Motion)

**Examples:** CartDrawer, ProductModal, NewsLetterForm, CartProvider

### Cart Flow

1. User clicks product → ProductModal opens
2. User customizes and clicks "Add to Cart"
3. Item added to CartProvider state + localStorage
4. Cart badge updates
5. CartDrawer opens on cart icon click
6. "Checkout" shows coming soon alert

### Contact Form Flow

1. User fills form → client validation
2. POST to `/api/contact`
3. Server validates, sanitizes, rate-limits
4. Sends HTML email via Resend
5. Returns success/error

### Newsletter Flow

1. User enters email → client validation
2. POST to `/api/subscribe`
3. Server proxies to Google Apps Script
4. Apps Script checks duplicates, saves to Sheets
5. Returns success/duplicate status

---

## Development Guidelines

### CSS Organization

- Use Tailwind utilities first
- Component styles → `app/styles/components/`
- Page styles → `app/styles/pages/`
- Use existing CSS variables before adding new ones
- Mobile-first responsive approach

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| CSS Classes | kebab-case | `.site-header`, `.hero-title` |
| Components | PascalCase | `SiteHeader`, `CartDrawer` |
| Files (components) | PascalCase | `CartDrawer.tsx` |
| Files (styles) | kebab-case | `navigation.css` |
| Files (utils) | camelCase | `sanitize.ts` |

### Import Paths

Use absolute imports with `@` alias:

```typescript
// Good
import { CartProvider } from "@/app/components/providers/CartProvider";
import { COLORS } from "@/app/lib/constants/colors";

// Avoid
import { CartProvider } from "../../components/providers/CartProvider";
```

### Security Best Practices

1. Always sanitize user input before sending emails or storing
2. Use CSRF protection on all mutation endpoints
3. Implement rate limiting to prevent abuse
4. Escape HTML in email templates
5. Keep API keys server-side only
6. Validate file uploads (size, type, content)
7. Log security events for monitoring

### Git Workflow

- Feature branches: `claude/feature-name-xxxxx` or `gemini/feature-name-xxxxx`
- Commit format: `type(scope): description`
- Push: `git push -u origin branch-name`
- Merge to `master` for production

---

## Skills

Skills are specialized prompts that enhance agent capabilities for specific tasks. They are defined in `.claude/skills/` and should be invoked when appropriate.

### Available Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| `git-commit-helper` | Generate descriptive commit messages by analyzing git diffs | Before creating any commit |
| `session-start-hook` | Set up repository hooks for Claude Code web sessions | When configuring startup hooks |

### Using Skills

**Before committing changes**, always invoke the `git-commit-helper` skill:

```
skill: "git-commit-helper"
```

This skill:
- Analyzes staged changes via `git diff --cached`
- Generates a descriptive commit message following project conventions
- Ensures consistent commit message format: `type(scope): description`

### Commit Message Format

Skills should generate commits following this format:

```
type(scope): short description

- Detailed bullet point (optional)
- Another detail (optional)
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

**Examples:**
- `feat(cart): add quantity controls to cart drawer`
- `fix(api): handle rate limit edge case in subscribe endpoint`
- `docs(agents): add skills section to AGENTS.md`

### Available Agents

Custom agents are defined in `.claude/agents/` and provide specialized expertise for different development tasks. These are invoked automatically via the Task tool when appropriate.

| Agent | Model | Purpose | When to Use |
|-------|-------|---------|-------------|
| `code-reviewer` | sonnet | Code quality, security, and maintainability review | After writing or modifying code |
| `frontend-developer` | sonnet | React components, responsive design, accessibility | UI development, performance optimization |
| `fullstack-developer` | opus | End-to-end application development | Complex features spanning frontend/backend |
| `seo-analyzer` | sonnet | Technical SEO audits and optimization | Meta tags, Core Web Vitals, structured data |
| `ui-ux-designer` | sonnet | User-centered design and interface systems | Wireframes, design systems, UX flows |

### Agent Usage Guidelines

**Proactive usage** - These agents should be used proactively:
- Run `code-reviewer` after implementing significant code changes
- Use `seo-analyzer` when modifying pages or adding new routes
- Invoke `frontend-developer` for complex UI component work

**Model selection:**
- `sonnet` agents are faster and cost-effective for focused tasks
- `opus` agents (fullstack-developer) handle complex, multi-faceted problems

**Agent outputs:**
- Review checklist with prioritized feedback (critical/warnings/suggestions)
- Implementation code with accessibility and performance considerations
- Audit reports with actionable recommendations

---

## Testing

### Infrastructure

- **Unit tests**: Vitest + React Testing Library (`tests/unit/`)
- **E2E tests**: Playwright (`tests/e2e/`)
- **API mocks**: MSW (`tests/utils/`)
- **CI**: GitHub Actions (`.github/workflows/test.yml`)

### Running Tests

```bash
npm run test           # Unit tests
npm run test:coverage  # With coverage report
npm run test:e2e       # E2E tests
npm run test:all       # All tests
```

### Documentation

- `docs/TEST_PLAN.md` - Test strategy
- `docs/TEST_COVERAGE_ANALYSIS.md` - Coverage analysis

---

## Environment Variables

Required in `.env.local`:

```bash
# Email (Required for contact/apply forms)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_RECIPIENT=business@example.com

# Newsletter (Required for subscriptions)
GOOGLE_APPS_SCRIPT_URL=your_apps_script_url
NEXT_PUBLIC_UNSUBSCRIBE_FORM_URL=your_google_form_url

# Analytics (Optional)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Password Protection (Optional)
SITE_PASSWORD=  # Leave empty to disable
```

**Note:** Requires server restart after changes.

---

## Deployment

**Platform:** Vercel

**Build Command:** `npm run build`

**Branches:**
- `master` - Production
- `claude/*`, `gemini/*` - AI-generated feature branches

**Notes:**
- Vercel preview deployments allowed in CSRF validation
- Email works in both preview and production
- Newsletter saves to Google Sheets

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (hero, signature pours, philosophy, newsletter) |
| `/menu` | Menu page with product cards and modals |
| `/story` | About/Story page |
| `/contact` | Contact page with form |
| `/careers` | Careers page with job listings |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/refunds` | Refund policy |

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| `docs/source-tree-analysis.md` | Full directory structure |
| `docs/component-inventory.md` | Component catalog |
| `docs/CSS_ORGANIZATION.md` | CSS architecture |
| `docs/TEST_PLAN.md` | Test strategy |
| `docs/TEST_COVERAGE_ANALYSIS.md` | Coverage gaps |
| `docs/google-sheets-newsletter.md` | Newsletter setup |
| `docs/EMAIL_SETUP.md` | Resend email setup |
| `docs/architecture.md` | Architecture overview |

---

## Agent-Specific Instructions

For model-specific output preferences and behaviors, see:
- **CLAUDE.md** - Claude Code preferences
- **GEMINI.md** - Gemini preferences
- **docs/agents/** - Extended agent configurations (optional)

---

*Update this file when making structural changes to the codebase.*

© The Notebook Café LLC — All rights reserved
