# Components

This directory contains all React components organized by purpose and scope.

## Folder Structure

```
components/
├── layout/       Layout and page structure components
├── ui/           Reusable UI primitives and atoms
├── features/     Feature-specific components
├── providers/    React Context providers
└── seo/          SEO and structured data components
```

## Organization Rules

### When to Use Page-Local `_components/`

Use `_components/` folder inside a page route when:
1. Component is **ONLY** used by that page
2. Component is tightly coupled to page-specific data/logic
3. Component is unlikely to be reused elsewhere

**Example:** `app/menu/_components/MenuTabs.tsx`

### When to Use `app/components/`

Use shared components folder when:
1. Component is used by 2+ pages
2. Component is a general-purpose UI element
3. Component might be reused in the future

## Component Categories

### Layout (`layout/`)
Page structure components that define the overall layout:
- `SiteHeader.tsx` - Main navigation header
- `SiteFooter.tsx` - Site-wide footer
- `SiteShell.tsx` - Page wrapper with header/footer
- `PageTransition.tsx` - Page transition animations
- `ImagePreloader.tsx` - Image preloading utility

### UI (`ui/`)
Reusable UI primitives and atoms:
- `Button.tsx` - Button component
- `Reveal.tsx` - Scroll reveal animations
- `RevealText.tsx` - Text reveal animations
- `FadeInSection.tsx` - Fade-in animations
- And more...

### Features (`features/`)
Feature-specific components with business logic:
- `ContactForm.tsx` - Contact form
- `CartDrawer.tsx` - Shopping cart drawer
- `ProductModal.tsx` - Product customization modal
- `NewsLetterForm.tsx` - Newsletter subscription
- And more...

### Providers (`providers/`)
React Context providers for global state:
- `CartProvider.tsx` - Shopping cart state management

### SEO (`seo/`)
SEO and structured data components:
- `LocalBusinessJsonLd.tsx` - Local business schema
- `FAQJsonLd.tsx` - FAQ schema
- `MenuJsonLd.tsx` - Menu schema

## Import Convention

Always use absolute imports with `@/app/` prefix:

```typescript
// ✅ Good
import { Button } from '@/app/components/ui/Button';
import { CartProvider } from '@/app/components/providers/CartProvider';

// ❌ Avoid
import { Button } from '../ui/Button';
import { CartProvider } from '../../providers/CartProvider';
```

## Best Practices

1. **One component per file** - Keep files focused
2. **Co-locate styles** - Component-specific CSS next to component
3. **Use TypeScript** - All components should be `.tsx` with proper types
4. **Add JSDoc** - Document component purpose and props
5. **Client/Server split** - Mark client components with `"use client"`
6. **Export named** - Prefer named exports over default exports
