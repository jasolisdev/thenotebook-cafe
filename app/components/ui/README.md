# UI Components

Reusable UI primitives and atoms. These are general-purpose components used across multiple features and pages.

## Components

### Interactive Elements

#### Button.tsx
Styled button component with variants.

**Props:**
- `variant`: "primary" | "secondary" | "outline"
- `children`: Button text/content
- Standard button props

**Usage:**
```tsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

### Animation Components

#### Reveal.tsx
Scroll-triggered reveal animation wrapper.

**Features:**
- Reveals content when scrolling into view
- Uses Intersection Observer
- Configurable animation direction

#### RevealText.tsx
Animated text reveal component.

**Features:**
- Character-by-character or word-by-word animation
- Smooth fade and slide effects

#### FadeInSection.tsx
Simple fade-in animation on scroll.

**Features:**
- Lightweight fade-in effect
- Intersection Observer based
- Minimal configuration

### Forms & Input

#### NewsletterSubscribe.tsx
Newsletter subscription input component.

**Features:**
- Email validation
- Loading states
- Success/error messaging
- Duplicate detection

### Utility Components

#### ConsentBanner.tsx
Cookie/analytics consent banner.

**Features:**
- Persistent consent storage
- Accept/decline options
- Mobile responsive

#### PasswordGate.tsx
Password protection for content.

**Features:**
- Session-based access
- Input validation
- Error handling

#### AnnouncementBanner.tsx
Dismissible announcement banner.

**Features:**
- Persistent dismiss state
- Customizable message
- Sticky positioning

### Accessibility

#### AccessibilityIcons.tsx
Accessibility toggle icons.

**Features:**
- High contrast mode
- Font size controls
- Screen reader support

#### VirtualBarista.tsx
AI chatbot assistant.

**Features:**
- FAQ responses
- Coffee recommendations
- Interactive dialog

### Performance

#### AnalyticsLoader.tsx
Lazy-loads analytics scripts.

**Features:**
- Deferred loading
- Consent-aware
- Performance optimized

### Navigation

#### HeroButtons.tsx
Call-to-action buttons for hero sections.

**Features:**
- Primary/secondary button pair
- Consistent styling
- Mobile responsive

#### StoryLink.tsx
Styled link to story page.

**Features:**
- Consistent branding
- Hover effects

## Styling

UI components use a mix of:
- Tailwind utility classes
- Component-specific CSS files
- Shared CSS variables from `globals.css`

## Best Practices

1. **Keep them reusable** - UI components should work in multiple contexts
2. **Accept props** - Make components configurable via props
3. **No business logic** - Keep business logic in feature components
4. **Composable** - Design for composition and flexibility
5. **Accessible** - Follow ARIA guidelines and semantic HTML
6. **Type-safe** - Use TypeScript props interfaces
