# Component Inventory
**The Notebook Café - Component Catalog**

Last Updated: 2025-12-23
Total Components: 35

---

## Layout Components (3)
Location: `app/components/layout/`

- `SiteHeader.tsx` - Global navigation header + cart badge
- `SiteFooter.tsx` - Global footer with contact/social links
- `SiteShell.tsx` - App wrapper, header/footer, overlays

---

## UI Components (13)
Location: `app/components/ui/`

- `AnnouncementBanner.tsx` - Optional site-wide banner
- `Button.tsx` - Shared button styles/variants
- `ConsentBanner.tsx` - Cookie consent UI
- `AccessibilityIcons.tsx` - Accessibility toggle quick actions
- `Reveal.tsx` - Scroll-based reveal animations
- `RevealText.tsx` - Text reveal animations
- `FadeInSection.tsx` - Section fade-in wrapper
- `HeroButtons.tsx` - Homepage CTA cluster
- `NewsletterSubscribe.tsx` - Email capture wrapper
- `PasswordGate.tsx` - Site password protection
- `StoryLink.tsx` - Styled story CTA link
- `VirtualBarista.tsx` - Chat-inspired helper UI
- `AnalyticsLoader.tsx` - Consent-aware analytics loader

---

## Feature Components (13)
Location: `app/components/features/`

- `HeroSection.tsx` - Homepage hero content
- `HeroGallery.tsx` - Homepage image strip
- `MenuSection.tsx` - Homepage menu preview
- `ProductModal.tsx` - Menu item modal w/ modifiers
- `CartDrawer.tsx` - Cart UI and checkout prompt
- `NewsletterSection.tsx` - Homepage newsletter panel
- `NewsLetterForm.tsx` - Newsletter form logic
- `NewsletterModal.tsx` - Newsletter modal CTA
- `CommunityModalTrigger.tsx` - Community CTA modal
- `ContactForm.tsx` - Contact form UI/logic
- `CareersApplyForm.tsx` - Careers quick-apply form
- `JobPosition.tsx` - Careers accordion component
- `Accessibility/AccessibilityWidget.tsx` - Accessibility preferences panel

---

## Providers (1)
Location: `app/components/providers/`

- `CartProvider.tsx` - Cart context/state management

---

## SEO Components (3)
Location: `app/components/seo/`

- `LocalBusinessJsonLd.tsx` - LocalBusiness schema
- `FAQJsonLd.tsx` - FAQ schema for contact page
- `MenuJsonLd.tsx` - Menu schema (available, not currently used)

---

## Shared / Misc (2)
Location: `app/components/`

- `SignaturePoursGrid.tsx` - Signature pour grid (currently unused)
- `ErrorBoundary.tsx` - App-level error boundary

---

## Route-Level Components (Outside Inventory)

Some routes ship local components outside `app/components/`:
- `app/menu/_components/MenuTabs.tsx`
- `app/menu/_components/MenuSectionList.tsx`
