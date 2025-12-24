# Feature Components

Feature-specific components that contain business logic and integrate multiple UI primitives.

## Forms

### ContactForm.tsx
Contact form with email notification.

**Features:**
- Client-side validation
- Server-side sanitization
- Email via Resend API
- Success/error states
- Rate limiting protection

**Usage:**
```tsx
import { ContactForm } from '@/app/components/features/ContactForm';

<ContactForm />
```

### CareersApplyForm.tsx
Job application form with file upload.

**Features:**
- Resume upload
- Position selection
- Form validation
- Sanitized submission

### NewsLetterForm.tsx
Newsletter subscription form.

**Features:**
- Email validation
- Duplicate detection
- Source tracking
- Success messaging

## Modals & Drawers

### ProductModal.tsx
Product customization modal for menu items.

**Features:**
- Modifier selection (size, milk, extras)
- Quantity controls
- Price calculation
- Notes input
- Add to cart integration

**Usage:**
```tsx
import { ProductModal } from '@/app/components/features/ProductModal';

<ProductModal
  item={menuItem}
  isOpen={isOpen}
  onClose={handleClose}
/>
```

### CartDrawer.tsx
Shopping cart sidebar drawer.

**Features:**
- Cart item list
- Quantity controls
- Item editing (re-opens ProductModal)
- Item removal
- Total price calculation
- Checkout button

**Usage:**
```tsx
import { CartDrawer } from '@/app/components/features/CartDrawer';

<CartDrawer />
```

### NewsletterModal.tsx
Newsletter signup modal popup.

**Features:**
- Auto-trigger after delay
- Dismissible
- Persistent dismiss state
- Form integration

### CommunityModalTrigger.tsx
Community event modal trigger.

**Features:**
- Click-to-open modal
- Event information display

## Sections

### HeroSection.tsx
Homepage hero section.

**Features:**
- Full-screen hero
- Call-to-action buttons
- Background image
- Responsive design

### MenuSection.tsx
Menu display section.

**Features:**
- Category filtering
- Product grid
- Modal integration

### NewsletterSection.tsx
Newsletter signup section.

**Features:**
- Inline subscription form
- Visual design integration
- Success states

### HeroGallery.tsx
Image gallery carousel.

**Features:**
- Auto-play slideshow
- Navigation controls
- Responsive images

## Job Listings

### JobPosition.tsx
Job listing card component.

**Features:**
- Position details
- Apply button
- Expandable description

## Accessibility

### Accessibility/AccessibilityWidget.tsx
Accessibility controls widget.

**Features:**
- Font size controls
- High contrast mode
- Keyboard navigation
- Screen reader announcements

## Best Practices

1. **Feature = Business Logic** - These components contain app-specific logic
2. **Compose UI components** - Build features from UI primitives
3. **Handle state** - Manage form state, modal state, etc.
4. **API integration** - Connect to backend APIs when needed
5. **Error handling** - Always handle errors gracefully
6. **Loading states** - Show loading indicators during async operations
