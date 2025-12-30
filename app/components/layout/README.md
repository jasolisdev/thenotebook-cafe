# Layout Components

Page structure components that define the overall layout and navigation.

## Components

### SiteHeader.tsx
Main navigation header with responsive menu and cart button.

**Features:**
- Sticky navigation with scroll detection
- Mobile hamburger menu
- Cart button with item count badge
- Background changes on scroll

**Usage:**
```tsx
import { SiteHeader } from '@/app/components/layout/SiteHeader';

<SiteHeader />
```

### SiteFooter.tsx
Site-wide footer with business info and newsletter signup.

**Features:**
- Business hours and contact info
- Social media links
- Inline newsletter subscription
- Mobile-first responsive design

**Usage:**
```tsx
import { SiteFooter } from '@/app/components/layout/SiteFooter';

<SiteFooter />
```

### SiteShell.tsx
Page wrapper that includes header and footer.

**Features:**
- Consistent page structure
- Wraps page content with header/footer
- Handles layout spacing

**Usage:**
```tsx
import { SiteShell } from '@/app/components/layout/SiteShell';

<SiteShell>
  <YourPageContent />
</SiteShell>
```

## Styling

Layout component styles are consolidated in `app/globals.css`:
- Navigation section for header styles
- Footer section for footer styles
- Tailwind utility classes for responsive behavior

## Best Practices

1. **Use SiteShell** for consistent layout across pages
2. **Don't modify header/footer** in individual pages
3. **Global changes** to layout should be made here, not per-page
4. **Mobile-first** - All layout components are responsive by default
