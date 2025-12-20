# GEMINI.md

This file provides comprehensive guidance to Google's Gemini when working with The Notebook Café codebase.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Development Commands](#development-commands)
4. [Architecture & File Organization](#architecture--file-organization)
5. [Component Library](#component-library)
6. [Styling System](#styling-system)
7. [Content Management (Sanity)](#content-management-sanity)
8. [Key Technical Patterns](#key-technical-patterns)
9. [Development Guidelines](#development-guidelines)
10. [How Gemini Can Help](#how-gemini-can-help)

---

## Project Overview

**The Notebook Café** is a Next.js 16 website for a Riverside-based coffee shop, using Sanity CMS for content management. The site features a public-facing website and an embedded CMS studio at `/studio`.

### Core Philosophy
- **Coffee culture meets creative community**
- **House music and soulful vibes**
- **Premium, minimal design aesthetic**
- **Mobile-first, responsive experience**

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16 |
| **Language** | TypeScript | Latest |
| **CMS** | Sanity | v4 |
| **Styling** | Custom CSS + Tailwind | Latest |
| **Fonts** | Alpino (display) + Torus (body) | Custom |
| **Icons** | Lucide React + React Icons | Latest |
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

---

## Architecture & File Organization

### **Directory Structure**

```
thenotebook-cafe/
├── app/                              # Next.js App Router
│   ├── components/                   # React components (organized)
│   │   ├── layout/                   # Global layout components
│   │   ├── ui/                       # Reusable UI components
│   │   ├── features/                 # Page-specific features
│   │   └── decorative/               # Floating decorations
│   ├── styles/                       # CSS organization
│   │   ├── components/               # Component-specific styles
│   │   ├── layout/                   # Layout & structure
│   │   └── pages/                    # Page-specific styles
│   ├── api/                          # API routes
│   ├── page.tsx                      # Homepage
│   ├── menu/page.tsx                 # Menu page
│   ├── story/page.tsx                # Story page (was /about)
│   ├── events/page.tsx               # Events page
│   ├── globals.css                   # Global styles & variables
│   ├── layout.tsx                    # Root layout
│   └── fonts.ts                      # Font configuration
├── sanity/                           # Sanity CMS
│   ├── schemaTypes/                  # Content schemas
│   ├── lib/
│   ├── sanity.config.ts              # Sanity configuration
│   └── structure.ts                  # Studio structure
├── public/                           # Static assets
└── docs/                             # Project documentation
```

---

## Component Library

### **Component Organization**
- **`app/components/layout/`**: Core layout components like `SiteHeader`, `SiteFooter`, and `ScrollReveal`.
- **`app/components/ui/`**: Reusable, general-purpose UI elements like `Button`, `Card`, and `Modal`.
- **`app/components/features/`**: Components tied to specific features or pages, such as `MenuContent` or `NewsletterForm`.
- **`app/components/decorative/`**: Purely aesthetic components, like the floating coffee beans (`HomeFloatingItems`).

---

## Styling System

### **CSS Architecture**
- **`globals.css`**: Base styles, Tailwind imports, CSS variables (design tokens), and global utility classes.
- **`app/styles/components/`**: Styles for reusable components.
- **`app/styles/pages/`**: Styles specific to a single page.
- **`app/styles/layout/`**: Styles for layout-related concerns like sections and animations.

This modular structure is documented in `CSS_ORGANIZATION.md`.

### **Design Tokens**
- **Colors**: A palette of creams, browns, and cool accents. See `--cream`, `--espresso-brown`, `--coffee-bean` in `globals.css`.
- **Typography**: `–font-sans` (Torus) for body and `–font-display` (Alpino) for headings.

---

## Content Management (Sanity)

- **Studio**: The CMS is embedded at `/studio`.
- **Schemas**: Content models are defined in `sanity/schemaTypes/`.
- **Clients**: The project uses a two-client pattern: a read-only client for fetching public data (`sanity/lib/client.ts`) and a write-client for mutations (`sanity/lib/writeClient.ts`).

---

## Key Technical Patterns

- **Next.js App Router**: The project uses the App Router, with a focus on Server Components for data fetching.
- **Client Components**: Components using hooks or browser APIs are marked with `"use client"`.
- **Image Optimization**: `next/image` is used for image optimization, with Sanity's CDN configured in `next.config.ts`.
- **Scroll Animations**: A custom `ScrollReveal` component uses the Intersection Observer API to trigger animations on scroll.

---

## Development Guidelines

- **CSS**: Follow the existing modular structure. Use utility classes where possible.
- **Naming Conventions**:
    - Components: `PascalCase`
    - CSS Classes: `kebab-case`
    - Files: `PascalCase` for components, `kebab-case` for styles.
- **Imports**: Use absolute paths with the `@` alias (e.g., `import Component from '@/app/components/...'`).
- **Documentation**: Components should have JSDoc comments.

---

## How Gemini Can Help

As a large language model from Google, I can assist with a variety of tasks in this project. Here are some of the ways I can help:

### **Code Generation & Refactoring**
- **Component Scaffolding**: Create new React components following the project's structure and conventions.
- **Refactoring**: Help refactor components to improve readability, performance, or to align with new patterns.
- **Implementing Features**: Write the code for new features, such as the planned blog or e-commerce functionality.

### **Documentation & Analysis**
- **Writing Documentation**: Generate or update documentation, including JSDoc for components and markdown files like this one.
- **Code Analysis**: Analyze the codebase to identify potential issues, suggest improvements, or explain complex parts of the code.
- **Answering Questions**: Answer questions about the code, architecture, or tech stack.

### **Styling & CSS**
- **Writing CSS**: Write CSS that follows the project's modular architecture and naming conventions.
- **Tailwind CSS**: Utilize Tailwind CSS for utility-first styling where appropriate.

### **Sanity & Content Management**
- **Schema Development**: Help define and create new Sanity schemas.
- **Querying Data**: Write GROQ queries to fetch data from Sanity.

### **General Tasks**
- **Writing Tests**: Create unit or integration tests for components and functions.
- **Debugging**: Help identify and fix bugs in the code.
- **Brainstorming**: Assist in brainstorming ideas for new features or solutions to problems.

By leveraging the information in this file and the rest of the project documentation, I can provide assistance that is consistent with the project's standards and goals.

no need to run npm run build after making changes.
update this file if there are any changes to the project structure, tech stack, or development guidelines.


