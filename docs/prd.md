# thenotebook-cafe - Product Requirements Document

**Author:** Jose
**Date:** 2025-12-05
**Version:** 1.0

---

## Executive Summary

The Story Page is the emotional payoff to the Homepage's anticipation. While the homepage teases glimpses of what's to come, the Story Page reveals the full narrative: a husband-wife team building Riverside's first custom-crafted coffee haven—designed by hand, built with love, for the community.

This isn't a construction documentary. It's an invitation to experience the finished vibe—warm, Instagram-worthy, and deeply personal. Visitors should scroll through and think: "I want to hang out here."

### What Makes This Special

Every bench, tabletop, and detail was custom-designed by the owner's wife—an aesthetic-driven creator building their first business together. This is by locals, for locals. The Story Page showcases the craft, warmth, and aspirational atmosphere that makes The Notebook Café a place you'll want to return to, share with friends, and make your creative home.

---

## Project Classification

**Technical Type:** Web Application (Next.js Single Page Redesign)
**Domain:** Hospitality / General
**Complexity:** Medium

This is a UX/content redesign of an existing page within a Next.js 16 brownfield website. The project involves consolidating four competing design alternatives into one cohesive, narrative-driven experience with consistent UI, increased visual storytelling, and interactive elements that match the homepage's aesthetic flow.

---

## Success Criteria

The redesigned Story Page succeeds when:

1. **Emotional Engagement:** Visitors feel the warmth and personal story of the husband-wife team building something for Riverside
2. **Desire to Visit:** Users finish scrolling and think "I want to hang out here" or "I need to check this place out"
3. **Shareability:** Visual moments are Instagram/TikTok-worthy, encouraging social sharing
4. **Clarity:** The narrative flows naturally from "why we started" → "what we're building" → "the craft behind it" → "come experience this"
5. **Time on Page:** Users spend 2-3x longer on Story page compared to current version (indicating engagement)
6. **Flow Continuation:** 40%+ of Story page visitors continue to Menu, Events, or Newsletter signup
7. **Brand Consistency:** Page feels like a natural extension of the homepage aesthetic (not a jarring shift)

### Business Metrics

- **Primary:** Newsletter signups from Story page CTA increase by 50%+
- **Secondary:** Social media shares/mentions featuring Story page content
- **Engagement:** Average time on page increases from ~30s to 90s+
- **Conversion:** Story page → Menu page clickthrough rate of 35%+

---

## Product Scope

### MVP - Minimum Viable Product

**Must-Have for Launch:**

1. **Origin Story Section** - Why we started, husband-wife team, first business, for Riverside locals
2. **Visual Showcase** - High-quality images of finished space, close-up detail shots, warm atmosphere
3. **Craftsmanship Highlight** - Section dedicated to custom-designed furniture, handcrafted details, wife's aesthetic vision
4. **The Experience** - What it feels like to be there (cozy, creative, Instagram-worthy)
5. **Three Core Promises** - Exceptional coffee, curated vibe, welcoming space (consolidated from current alternatives)
6. **Opening Timeline** - Simple, non-documentary mention of "Opening 2026" with excitement
7. **Newsletter CTA** - Clear invitation to follow the journey
8. **Responsive Design** - Perfect on mobile (320px+) through desktop (1920px+)
9. **Scroll Animations** - Sections reveal smoothly as user scrolls (matching homepage)
10. **Consistent UI** - Matches homepage color palette (cafe-mist, cafe-white, cafe-tan, cafe-black)

### Growth Features (Post-MVP)

**Nice-to-Have Enhancements:**

1. **Behind-the-Scenes Video** - Short (30-60s) clip of the space, the couple, the craft
2. **Interactive Image Gallery** - Click to zoom on detail shots (wood grain, furniture, lighting)
3. **Founder Voice** - Brief quote or message from the owners (audio or text)
4. **Community Section** - "Built for Riverside" testimonials or supporter quotes
5. **Progress Bar** - Subtle visual indicator of how close to opening
6. **Instagram Feed Integration** - Live feed of @thenotebookcafellc posts
7. **Virtual Tour** - 360° preview of the space (future)

### Vision (Future)

**Dream Version:**

1. **Interactive Timeline** - Scroll-triggered visual journey showing concept → design → completion
2. **Craftsmanship Stories** - Individual spotlights on each custom piece (bench story, table story, etc.)
3. **Design Process Gallery** - Wife's sketches, mood boards, inspiration (for design enthusiasts)
4. **Founder Interview** - Full Q&A or mini-documentary about the journey
5. **Community Wall** - User-submitted photos/stories once café is open
6. **AR Preview** - "See yourself in the space" using phone camera (post-opening)

---

## User Experience Principles

### Design Philosophy

**"Aspirational, Not Documentary"**

The Story Page should make visitors *want* to experience the space, not just learn about it. Every section, image, and interaction should reinforce: "This is somewhere you belong."

**Core UX Principles:**

1. **Visual-First Storytelling**
   - Images carry the narrative, text provides context
   - Close-up details reveal craftsmanship and care
   - Warm, inviting photography over clinical documentation

2. **Warmth Over Perfection**
   - Matches homepage aesthetic but feels more intimate
   - Softer lighting, warmer tones (cafe-mist, cafe-cream backgrounds)
   - Personal, human, approachable (not corporate)

3. **Scroll-Driven Narrative**
   - Story unfolds naturally as user scrolls
   - Clear beginning → middle → end flow
   - Each section builds on the previous

4. **Interactive, Not Static**
   - Scroll animations (matching homepage)
   - Hover effects on images
   - Smooth transitions between sections
   - Subtle motion that adds life without distraction

5. **Instagram-Worthy Moments**
   - Every section should have a "wow, that's beautiful" moment
   - Shareable compositions
   - Attention to typography, spacing, imagery balance

6. **Mobile-First Experience**
   - Most users will view on phones
   - Touch-friendly interactions
   - Readable text without zooming
   - Fast image loading (Next.js Image optimization)

### Visual Language

**Matching Homepage Aesthetic:**

- **Backgrounds:** Alternating cafe-mist (#F4F1EA) and cafe-white (#FAF9F6)
- **Accents:** cafe-tan (#A48D78) for highlights, emphasis
- **Text:** cafe-black (#2C2420) for headings, cafe-brown (#4A3B32) for body
- **Typography:** Alpino (serif) for headings, Torus (sans) for body
- **Spacing:** Generous whitespace, 24px+ padding on sections
- **Animations:** 0.4-0.6s ease-out transitions (matching homepage ScrollReveal)

### Key Interactions

1. **Scroll Reveal Animations**
   - Sections fade in as they enter viewport (like homepage)
   - Staggered delays for visual interest (0.1s, 0.2s, 0.3s)
   - Scale + opacity transitions for smooth reveal

2. **Image Hover Effects**
   - Subtle zoom (1.02-1.05 scale) on detail shots
   - Overlay text appears on hover (desktop)
   - Maintains accessibility (no critical info hidden behind hover)

3. **CTA Interactions**
   - Newsletter button scales on hover (1.05)
   - "Learn More" links underline smoothly
   - Clear focus states for keyboard navigation

4. **Section Transitions**
   - Smooth scrolling between anchors
   - Background color transitions blend naturally
   - No jarring jumps or layout shifts

5. **Mobile Touch Gestures**
   - Swipe-friendly image carousels (if used)
   - Tap-to-expand for detail views (Growth feature)
   - No accidental clicks from tight spacing

---

## Functional Requirements

### Content & Storytelling

**FR1:** Page displays origin story explaining why The Notebook Café was created (husband-wife team, first business, for Riverside locals)

**FR2:** Page highlights that the wife designed all custom furniture and aesthetic elements

**FR3:** Page communicates "by locals, for locals" positioning throughout the narrative

**FR4:** Page presents three core value propositions: exceptional coffee, curated vibe, welcoming space

**FR5:** Page includes "Opening 2026" messaging with positive, excited tone (not countdown/urgency)

**FR6:** Page presents content in narrative flow: why we started → what we're building → the craft → come experience this

### Visual Presentation

**FR7:** Page displays high-quality photographs of the finished café space

**FR8:** Page includes close-up detail shots showcasing craftsmanship (wood grain, furniture joints, textures)

**FR9:** Page presents images with warm, inviting lighting and composition (Instagram-worthy moments)

**FR10:** Page uses alternating background colors (cafe-mist, cafe-white) for visual rhythm matching homepage

**FR11:** Page maintains consistent typography with homepage (Alpino for headings, Torus for body)

**FR12:** Page uses color palette matching homepage (cafe-tan accents, cafe-black text, cafe-brown body)

### Layout & Structure

**FR13:** Page renders with responsive design supporting 320px mobile through 1920px+ desktop screens

**FR14:** Page sections stack vertically on mobile, utilize grid layouts on desktop where appropriate

**FR15:** Page maintains generous whitespace and padding (24px+ section padding) for breathing room

**FR16:** Page header includes navigation back to homepage and other sections

**FR17:** Page includes footer with newsletter CTA and site navigation

### Interactivity & Animation

**FR18:** Page sections reveal with scroll animations as they enter viewport (fade + scale effect)

**FR19:** Page animations use staggered delays (0.1s, 0.2s, 0.3s) for visual interest

**FR20:** Page images respond to hover with subtle zoom effect (1.02-1.05 scale) on desktop

**FR21:** Page CTA buttons scale on hover (1.05) with smooth transitions

**FR22:** Page animations match homepage timing and easing (0.4-0.6s ease-out)

**FR23:** Page maintains smooth scrolling behavior for anchor links

**FR24:** Page prevents layout shifts during image loading (Next.js Image with proper dimensions)

### Calls to Action

**FR25:** Page includes prominent newsletter signup CTA with clear value proposition

**FR26:** Page provides navigation to Menu page for users wanting to see offerings

**FR27:** Page links to social media profiles (Instagram, Spotify) for community connection

**FR28:** Page includes "Join the Waitlist" or "Stay Updated" action for pre-opening engagement

### Accessibility & Performance

**FR29:** Page images include descriptive alt text for screen readers

**FR30:** Page maintains keyboard navigation support (tab order, focus states)

**FR31:** Page provides sufficient color contrast for text readability (WCAG AA minimum)

**FR32:** Page loads critical content within 2 seconds on 4G connection

**FR33:** Page uses Next.js Image component for automatic optimization and lazy loading

**FR34:** Page supports browser back/forward navigation without loss of scroll position

### Content Management

**FR35:** Page text content can be updated via Sanity CMS (about page schema)

**FR36:** Page images can be managed through Sanity image fields or local public folder

**FR37:** Page maintains fallback content if Sanity data is unavailable

### Navigation & Flow

**FR38:** Page provides clear path to return to homepage

**FR39:** Page suggests next action at bottom (Menu, Events, Newsletter)

**FR40:** Page maintains site header with logo and primary navigation

**FR41:** Page includes SiteFooter component with consistent branding

### Mobile Experience

**FR42:** Page text is readable without zooming on mobile devices (16px+ body text)

**FR43:** Page touch targets are minimum 44x44px for easy tapping

**FR44:** Page images optimize for mobile bandwidth and screen size

**FR45:** Page animations perform smoothly on mobile devices (60fps)

### Section-Specific Requirements

**FR46:** Origin Story section includes hero image or visual element establishing tone

**FR47:** Craftsmanship section showcases multiple detail shots with optional captions

**FR48:** Experience section creates "I want to hang out here" feeling through imagery and copy

**FR49:** Promises section presents three commitments in visually distinct cards or layout

**FR50:** Final CTA section creates urgency and excitement without aggressive countdown timers

---

## Non-Functional Requirements

### Performance

**Page Load Speed:**
- Initial page load completes within 2 seconds on 4G connection
- Largest Contentful Paint (LCP) under 2.5 seconds
- First Input Delay (FID) under 100ms
- Cumulative Layout Shift (CLS) under 0.1

**Image Optimization:**
- All images use Next.js Image component with automatic format detection (WebP/AVIF)
- Images lazy-load below the fold
- Proper width/height attributes prevent layout shift
- Mobile receives appropriately sized images (not desktop versions)

**Animation Performance:**
- Scroll animations run at 60fps on modern devices
- No janky scrolling or stuttering during reveals
- Animations use CSS transforms (not layout properties) for GPU acceleration
- IntersectionObserver API used for scroll detection (efficient)

**Bundle Size:**
- Page JavaScript bundle under 100KB (gzipped)
- CSS bundle under 50KB (gzipped)
- No unnecessary dependencies or libraries

### Accessibility

**WCAG 2.1 AA Compliance:**
- Color contrast ratio minimum 4.5:1 for normal text, 3:1 for large text
- All interactive elements keyboard accessible (tab navigation)
- Focus indicators visible and clear (cafe-tan outline)
- Headings follow semantic hierarchy (h1 → h2 → h3)

**Screen Reader Support:**
- All images include meaningful alt text
- ARIA labels used for icon-only buttons
- Skip navigation link for keyboard users
- Page structure logical for screen reader announcement

**Responsive Text:**
- Text scales appropriately on mobile (minimum 16px body)
- Line length doesn't exceed 80 characters on wide screens
- Line height 1.5+ for readability
- No horizontal scrolling at any viewport width

**Motion Sensitivity:**
- Respects `prefers-reduced-motion` media query
- Users who prefer reduced motion see simpler transitions (fade only, no scale)
- All content accessible without relying on animation

### Browser Compatibility

**Supported Browsers:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari iOS 14+
- Chrome Android (last 2 versions)

**Graceful Degradation:**
- Page functional without JavaScript (progressive enhancement)
- Animations degrade gracefully on older browsers
- CSS fallbacks for unsupported properties

### Mobile Optimization

**Responsive Breakpoints:**
- 320px: Small phones (iPhone SE)
- 375px: Standard phones
- 640px: Tablet portrait
- 768px: Tablet landscape
- 1024px: Desktop
- 1920px+: Large desktop

**Touch Interactions:**
- Touch targets minimum 44x44px
- No hover-dependent critical functionality
- Tap delay removed (300ms)
- Touch gestures feel native

**Mobile Performance:**
- Page loads within 3 seconds on 3G
- Images optimized for mobile bandwidth
- Minimal JavaScript execution on mobile

### SEO & Discoverability

**Meta Tags:**
- Unique page title: "Our Story | The Notebook Café - Riverside Coffee & Community"
- Meta description (150-160 chars) highlighting husband-wife story and local focus
- Open Graph tags for social sharing (og:title, og:description, og:image)
- Twitter Card tags for enhanced Twitter shares

**Structured Data:**
- LocalBusiness schema markup (JSON-LD)
- Organization schema with founder information
- Breadcrumb schema for navigation context

**Content SEO:**
- Heading hierarchy supports keyword targeting (Riverside coffee, local café, custom design)
- Image alt text includes relevant keywords naturally
- Internal links to Menu, Events, Homepage
- URL structure: /story (clean, semantic)

### Reliability

**Error Handling:**
- Graceful fallback if Sanity CMS unavailable (static fallback content)
- Broken image handling (placeholder or hide)
- Network error doesn't break page layout

**Browser Storage:**
- No cookies required for basic functionality
- Optional: LocalStorage for "visited story page" tracking (analytics)

### Integration

**Sanity CMS Integration:**
- Fetches content from aboutPage schema
- Uses read-only client (CDN-enabled) for performance
- Handles missing fields gracefully with fallbacks
- Image URLs generated via Sanity image builder

**Analytics Integration:**
- Google Analytics 4 event tracking for scroll depth
- Newsletter CTA click tracking
- Time on page measurement
- Scroll-to-bottom completion rate

**Social Media Integration:**
- Instagram/Spotify links open in new tab
- Share buttons (optional growth feature) use Web Share API where supported

---

## Summary

This PRD defines the redesign of The Notebook Café's Story Page—transforming four competing design alternatives into one cohesive, narrative-driven experience that matches the homepage's aesthetic flow while revealing the personal journey of a husband-wife team building Riverside's first custom-crafted coffee haven.

**What Success Looks Like:**
Visitors scroll through and think "I want to hang out here," then take action (join newsletter, check menu, follow socials). The page becomes a shareable, Instagram-worthy showcase of craft, warmth, and community that converts curiosity into commitment.

**Core Differentiator:**
This isn't just an "about us" page—it's the emotional payoff to the homepage's tease. Every detail, from custom-designed furniture to warm photography, tells the story of two locals building something deeply personal for Riverside. The page doesn't document construction; it invites you to experience the destination.

**Captured in 50 Functional Requirements covering:**
- Content storytelling (origin, craft, promises)
- Visual presentation (warm photography, detail shots, brand consistency)
- Responsive layout (320px → 1920px+)
- Smooth interactions (scroll reveals, hover effects, CTAs)
- Accessibility and performance (WCAG AA, sub-2s load times)
- Integration (Sanity CMS, analytics, social media)

**Next Steps:**
With this PRD complete, the project is ready for:
1. **UX Design** - Wireframes and mockups translating requirements into visual designs
2. **Architecture** - Technical approach for implementing interactions and CMS integration
3. **Epic Breakdown** - Splitting work into implementable development tasks

---

_This PRD captures The Notebook Café Story Page redesign—a visual, narrative-driven experience showcasing the warmth, craft, and personal story behind Riverside's coffee community hub._

_Created through collaborative discovery between Jose and AI Product Manager._
