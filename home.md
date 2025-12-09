# The Notebook Café — Homepage Design Documentation

**For UI/AI Designers**

This document provides comprehensive design specifications for The Notebook Café homepage, including all visual elements, interactions, and content details.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Navigation Bar](#navigation-bar)
5. [Hero Section](#hero-section)
6. [Signature Pours Section](#signature-pours-section)
7. [Our Philosophy Section](#our-philosophy-section)
8. [Low Lights Section](#low-lights-section)
9. [The Trinity Section](#the-trinity-section)
10. [Atmosphere Section](#atmosphere-section)
11. [Atmosphere Images](#atmosphere-images)
12. [Newsletter Section](#newsletter-section)
13. [Footer](#footer)
14. [Animations & Interactions](#animations--interactions)
15. [Responsive Behavior](#responsive-behavior)
16. [Decorative Elements](#decorative-elements)

---

## Design Philosophy

**Core Brand Identity:**
- Premium coffee culture meets creative community
- House music and soulful vibes
- Minimal, sophisticated aesthetic
- Mobile-first, responsive experience
- Warm, welcoming color palette

**Visual Approach:**
- Alternating background sections (mist → white → mist) for rhythm
- Scroll-triggered animations for progressive disclosure
- Organic decorative elements (floating coffee icons, blob shapes)
- High-quality photography with natural lighting

---

## Color Palette

### Primary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Café Black** | `#2C2420` | `44, 36, 32` | Primary dark text, buttons |
| **Café Brown** | `#4A3B32` | `74, 59, 50` | Body text, headings |
| **Café Tan** | `#A48D78` | `164, 141, 120` | Primary accent, links, icons |
| **Café Beige** | `#CBB9A4` | `203, 185, 164` | Borders, muted elements |
| **Café Cream** | `#EDE7D8` | `237, 231, 216` | Light backgrounds |
| **Café Mist** | `#F4F1EA` | `244, 241, 234` | Lightest background (main) |
| **Café White** | `#FAF9F6` | `250, 249, 246` | Off-white, cards |

### Extended Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Espresso Brown** | `#2a1f16` | Dark elements, shadows |
| **Warm Brown** | `#5a4a38` | Warm text accents |
| **Gold Primary** | `#c99a58` | Gold accents, highlights |

### Background Pattern

The homepage uses an **alternating background rhythm** to create visual flow:

1. **Hero** — Café Mist (`#F4F1EA`)
2. **Signature Pours** — Café Mist
3. **Our Philosophy** — Café Mist
4. **Low Lights** — Café Mist
5. **The Trinity** — Café Beige with 45% opacity (`rgba(203, 185, 164, 0.45)`)
6. **Atmosphere** — Café Mist
7. **Atmosphere Images** — Café Mist
8. **Newsletter** — Café Mist

---

## Typography

### Fonts

- **Display Font (Headings):** DM Serif Display
  - h1, h2, h3, hero text, section titles
  - Serif, elegant, premium feel

- **Body Font (Content):** Outfit
  - Paragraphs, navigation, UI elements
  - Sans-serif, clean, readable

### Typographic Scale

| Element | Font | Size (Desktop) | Size (Mobile) | Weight | Letter Spacing |
|---------|------|----------------|---------------|--------|----------------|
| Hero Title | DM Serif Display | 108px | 52px | 400 | -0.4px |
| Section Headings (h2) | DM Serif Display | 60px | 48px | 400 | Normal |
| Body Text | Outfit | 18px | 14px | 400 | Normal |
| Labels | Outfit | 12px | 10px | 600-700 | 0.2-0.25em |
| Navigation | Outfit | 13px | 12px | 500 | 0.18em |

---

## Navigation Bar

### Position & Structure
- **Position:** Sticky at top (z-index: 50)
- **Background:** Café Mist with 85% opacity (`rgba(244, 241, 234, 0.85)`)
- **Backdrop Filter:** Blur (12px) for glass effect
- **Border:** Bottom border with Café Tan 10% opacity
- **Height:** 80px (5rem)
- **Max Width:** 1600px centered

### Logo
- **Type:** PNG image with text lockup
- **Image:** `/tnc-navbar-logo.png`
- **Size:** 65px × 65px (desktop), 56px × 56px (mobile)
- **Layout:**
  - Logo image on left
  - Text lockup on right:
    - "The Notebook" — Café Black, 32px (desktop), 24px (mobile), DM Serif Display
    - "Café" — Café Tan, 12px uppercase, 0.22em letter spacing

### Desktop Navigation (≥768px)
- **Links:** Home | Menu | Story | Events | Contact | Careers
- **Typography:** 13px, uppercase, 0.18em letter spacing, medium weight
- **Colors:**
  - Default: Café Brown
  - Hover: Café Black + slight lift (-0.5px translateY)
  - Active: Café Black, semibold, with underline accent
- **Underline:** 2px height, Café Tan, positioned at bottom
- **Divider:** Vertical line (4px height, 1px width) before cart icon

### Shopping Cart Icon
- **Icon:** Shopping Bag (Lucide)
- **Size:** 22px
- **Color:** Café Black (default), Café Tan (hover)
- **Badge:**
  - When items in cart: circular badge (-bottom-2, -right-2)
  - Background: Café Tan
  - Text: Café White, 10px bold
  - Size: 16px × 16px
  - Shadow: `0 2px 6px rgba(0,0,0,0.25)`

### Mobile Navigation (<768px)
- **Hamburger Icon:**
  - 3 lines, 2px height each
  - Café Black color
  - Transforms to X when open
- **Mobile Drawer:**
  - **Type:** Full-screen overlay
  - **Background:** Café Mist
  - **Position:** Fills from top: 80px to bottom
  - **Animation:** Fade in (0.3s)
  - **Content:**
    - Navigation links centered vertically
    - 20px font size, uppercase, 0.18em spacing
    - Active state: Café Tan color
    - Social icons below divider line
  - **Behavior:**
    - Body scroll locked when open
    - Closes on link click, ESC key, or route change

---

## Hero Section

### Layout & Background
- **Background:** Ken Burns effect (slow zoom on background image)
- **Image:** `/unsplash/tnc-home-hero-cup.jpg`
- **Effect:** Continuous subtle zoom animation (scale 1.0 to 1.1 over 20s)
- **Overlay:** None (image visible through text)
- **Grid:** Two-column layout on desktop, single column on mobile

### Content Structure

#### Left Column (Text Content)

**1. Establishment Badge**
- **Text:** "Est. Riverside 2026"
- **Style:**
  - Café Brown color
  - 0.85rem size
  - 0.26em letter spacing
  - Uppercase, 700 weight
  - Decorative gradient lines on left and right (70px each)
  - Lines: 1.5px height, gradient from transparent to Café Brown 35% opacity

**2. Hero Title**
- **Line 1:** "Where Every Cup"
- **Line 2 (Accent):** "Tells a Story"
- **Font:** DM Serif Display
- **Size:** Clamp(52px, 6.6vw, 108px)
- **Color:** Café Brown (line 1), Café Tan italic (line 2)
- **Line Height:** 1.05
- **Letter Spacing:** -0.4px

**3. Hero Subtitle**
- **Text:** "Come For The Coffee, Stay For The Vibe."
- **Style:**
  - Clamp(14px, 1.8vw, 18px)
  - Uppercase
  - 0.18em letter spacing
  - 600 weight
  - Café Brown 80% opacity
  - Line break on mobile after "Coffee,"

**4. Call-to-Action Button**
- **Text:** "Explore Our Menu"
- **Background:** Café Black
- **Text Color:** Café White
- **Size:** 10-12px uppercase, 0.2em letter spacing, semibold
- **Padding:** 12px 24px (mobile), 16px 32px (desktop)
- **Border Radius:** 2px (squared corners)
- **Icon:** Arrow right (14px), shifts 1px right on hover
- **Hover:**
  - Background: Café Brown
  - Shadow: Large lift shadow
  - Transform: translateY(-0.5px)
  - Café Tan overlay (10% opacity)

#### Right Column (Visual)

**Latte Image Circle**
- **Container:** Circular frame with glow aura
- **Image:** `/unsplash/tnc-hero-coffee-cup.png`
- **Size:** 460px × 460px (desktop), 260px × 260px (mobile)
- **Border:** 12px solid Café Cream 96% opacity
- **Border Radius:** 50% (perfect circle)
- **Float Animation:** Gentle up/down (0 to -20px over 6.5s)
- **Aura Effect:**
  - Position: Absolute, inset -52px
  - Two radial gradients:
    - Top-left (32%, 32%): Café Cream 45% opacity
    - Bottom-right (72%, 68%): Café Tan 32% opacity
  - Blur: 38px
  - Opacity: 0.9

**"Signature" Badge Card**
- **Position:** Absolute top-right (-18px, -18px)
- **Rotation:** 12deg
- **Background:** Café White 96% opacity
- **Border:** 1px Café Tan 30% opacity
- **Border Radius:** 26px
- **Padding:** 12px 14px
- **Shadow:** `0 18px 38px rgba(0,0,0,0.18)`, `0 12px 24px Café Cream 26%`
- **Content:**
  - "Signature" pill (Café Tan 10% background, Café Tan text, 10px uppercase)
  - "Latte" text (Café Brown, 14px semibold, DM Serif Display)
  - 4 stars (Café Tan, 12px)

**Heart Button**
- **Position:** Absolute bottom-left (10%, -12%)
- **Shape:** Circular (48px × 48px)
- **Background:** Café Brown
- **Icon:** Heart outline (24px, Café Cream)
- **Border:** 1px Café Cream 20% opacity
- **Shadow:** `0 20px 44px rgba(0,0,0,0.18)`, `0 10px 26px Café Tan 18%`
- **Interaction:**
  - Click: Heart fills with color, pops with scale animation
  - Burst ring animates outward
  - Hover: Lifts up 2px, scales 1.04

### Reveal Animation
- All elements use staggered delays:
  - Badge: 0ms
  - Title: 120ms
  - Subtitle: 240ms
  - CTA: 360ms
  - Visual: 120ms

---

## Signature Pours Section

### Layout
- **Background:** Café Mist
- **Padding:** 96px vertical, 24px horizontal
- **Max Width:** 1200px (6xl)
- **Grid:** 4 columns on desktop, 2 on tablet, 1 on mobile
- **Gap:** 40px (desktop), 32px (tablet/mobile)

### Section Header
- **Label:** "SIGNATURE POURS"
  - 12px uppercase, 0.25em letter spacing, semibold
  - Café Tan color
- **Heading:** "Crafted With Care"
  - DM Serif Display, 48-60px
  - Café Black
- **Description:** "Small-batch recipes we obsess over—balanced, nuanced, and poured with a steady hand."
  - 16-20px, light weight
  - Café Brown 75% opacity

### Pour Cards (4 Items)

**Products:**
1. **Iced Brown Sugar Oat**
   - "Caramelized brown sugar layered with velvety oat milk and slow-steeped espresso."
2. **Matcha Cloud**
   - "Ceremonial grade matcha poured over cold foam for a soft, cloudlike finish."
3. **Classic Cold Brew**
   - "18-hour brew for a chocolatey, low-acid sip served over crystal-clear ice."
4. **Espresso Tonic**
   - "Bright espresso lifted by artisanal tonic, citrus oils, and a crack of ice."

**Card Design:**
- **Image Container:**
  - Aspect ratio: Portrait (taller than wide)
  - Height: 288px (mobile), 360px (desktop)
  - Border radius: 8px
  - Padding: 16-20px
  - Hover: Lifts up 6px, scales 1.02
- **Blob Background (Mobile Only):**
  - SVG blob shape behind image
  - Unique per card: `/signature-pour-blob-{1-4}.svg`
  - Rotations: -12deg, 8deg, -15deg, 10deg
  - Mix blend mode: multiply
  - Opacity: 0 initially, zooms in dramatically when image lands (600ms)
- **Product Image:**
  - Object-fit: contain
  - First item scaled 1.24x (larger)
  - Hover: Scales to 1.05
- **Product Name:**
  - DM Serif Display, 18-20px
  - Café Brown
  - Center aligned
  - Slides up after image (400ms delay)

**Animation:**
- **Mobile:** Cards alternate sliding from right/left
  - Even indices: slide from right
  - Odd indices: slide from left
- **Desktop:** All cards slide up from bottom
- **Stagger:** 160ms delay between each card

### "View Our Menu" Button
- **Text:** "View Our Menu"
- **Style:**
  - 12px uppercase, 0.25em letter spacing, semibold
  - Café Black border (2px)
  - Café White background (transparent)
  - Padding: 12px 32px
  - Border radius: 2px
- **Icon:** Right arrow, shifts right 1px on hover
- **Hover:**
  - Background: Café Black
  - Text: Café White
  - Transform: translateY(-0.5px)
  - Shadow: Large

### Floating Decorations
- 2 coffee cup icons (Lucide Coffee)
- Subtle opacity (5%)
- Floating animation (10-12s duration)
- Positions: top-right (20%), bottom-left (32%)
- Size: 52-64px

---

## Our Philosophy Section

### Layout
- **Background:** Café Mist
- **Padding:** 96px vertical
- **Grid:** 2 columns (desktop), 1 column (mobile)
- **Order:** Images left, text right (desktop); text first on mobile

### Image Grid (Left Column)

**Two-Column Image Layout:**
- **Image 1 (Left):**
  - Source: `/unsplash/tnc-placeholder-philosophy-1.png`
  - Aspect ratio: 3:4 (portrait)
  - Border radius: 32px (2xl)
  - Shadow: xl
  - Transform: -24px margin top (desktop), 48px margin top (tablet)

- **Image 2 (Right):**
  - Source: `/unsplash/tnc-placeholder-philosophy-2.png`
  - Aspect ratio: 3:4
  - Border radius: 32px
  - Shadow: xl
  - Transform: 40px margin top (desktop), 0 on tablet

**"Grand Opening" Badge Card:**
- **Position:** Absolute bottom-left (-24px, -24px)
- **Background:** Café Black
- **Text Color:** Café Cream
- **Border radius:** Top-right 48px (3xl)
- **Padding:** 20-24px
- **Shadow:** 2xl
- **Content:**
  - "Grand Opening" — DM Serif Display, 32px
  - "Coming Soon 2025" — Café Tan, 12px
  - "SAVE THE DATE" — 10-11px uppercase, 60% opacity
- **Max width:** 180px (mobile), 220px (desktop)

### Text Content (Right Column)

**Section Label:**
- "OUR PHILOSOPHY"
- Café Tan
- 12px uppercase, 0.2em letter spacing, bold

**Heading:**
- **Line 1:** "Crafted for"
- **Line 2:** "Creatives" (italic, Café Tan)
- DM Serif Display, 60-72px
- Café Black

**Divider:**
- 96px width, 2px height
- Café Black
- Aligned to right

**Body Paragraphs (2):**
1. "We believe that great ideas start with great coffee. Whether you're sketching your next masterpiece, writing the next great novel, or just enjoying a moment of silence."

2. "Our beans are ethically sourced, roasted in small batches, and brewed with precision to fuel your inspiration."

- 18-20px, light weight
- Café Brown 80% opacity
- Right-aligned
- Line height: 1.5-1.7

**Stats Section:**
- Border top: 1px Café Beige
- Padding top: 32px
- Two stat blocks side by side:

  **Stat 1:**
  - "100%" — DM Serif Display, 32px, Café Black
  - "Organic Beans" — 12px uppercase, Café Brown

  **Stat 2:**
  - "Daily" — DM Serif Display, 32px, Café Black
  - "Fresh Pastries" — 12px uppercase, Café Brown

### Decorative Blob
- **Philosophy Blob:** Large organic SVG shape
- Source: `/philosophy-blob.svg`
- Position: Absolute top-right (desktop: -110px top, 100px right)
- Size: 540px × 540px (desktop), 352px × 352px (mobile)
- Opacity: 62% (desktop), 45% (mobile)
- Mix blend mode: multiply
- Animation: Fades in and slightly scales when scrolled into view

### Floating Icons
- Coffee and Sparkles icons scattered
- 5-10% opacity
- Café Tan and Café Brown colors
- Gentle floating animation (10-13s)
- Desktop only (hidden on mobile)

---

## Low Lights Section

### Layout
- **Background:** Café Mist
- **Padding:** 96-128px vertical
- **Grid:** 2 columns (desktop), 1 column (mobile)
- **Order:** Text left, images right

### Text Content (Left Column)

**Heading:**
- **Line 1:** "Low lights,"
- **Line 2:** "good sound,"
- **Line 3:** "better coffee." (italic, Café Tan)
- DM Serif Display, 60-72px
- Café Black
- Line height: 1.05
- Left-aligned

**Divider:**
- 96px width, 2px height
- Café Black

**Body Copy:**
- "We designed The Notebook Café as a sanctuary for the creatives, the writers, and the dreamers of Riverside. It is not just about the caffeine—it is about the headspace."
- 18-22px, light weight
- Café Brown 78% opacity
- Max width: 640px
- Line height: 1.5-1.7

**"Read Our Story" Link:**
- Component: StoryLink
- Text with arrow icon
- Café Tan color
- Underline on hover
- Arrow shifts right on hover

### Image Grid (Right Column)

**Two-Column Layout:**

**Image 1 (Left):**
- Source: `/unsplash/tnc-placeholder-1.png`
- Aspect ratio: 3:4 (portrait)
- Border radius: 2px (minimal)
- Shadow: xl
- Transform: translateY(48px) — dropped lower
- Grayscale: 20% (default), 0% (hover)
- Transition: 700ms

**Image 2 (Right):**
- Source: `/unsplash/tnc-placeholder-2.png`
- Aspect ratio: 3:4
- Border radius: 2px
- Shadow: xl
- No transform
- Grayscale: 20% (default), 0% (hover)
- Transition: 700ms

### Decorative Blobs
- **Story Blob (Left):**
  - Source: `/low-lights-blob.svg`
  - Size: 572px × 572px (desktop), 345px (mobile)
  - Position: Top-left (40px left, -6% top)
  - Rotation: -10deg
  - Opacity: 62%
  - Mix blend mode: multiply

- **Gallery Blob (Mobile Only):**
  - Source: `/low-lights-gallery-blob.svg`
  - Size: 484px × 484px
  - Position: Center (520px from top)
  - Rotation: -8deg, scale 0.85
  - Opacity: 25%
  - Only visible on mobile (<768px)

### Floating Icons
- Music and Coffee icons
- 8-12% opacity
- Positioned top-left and bottom-right
- Gentle floating animation

---

## The Trinity Section

### Layout & Background
- **Background:** Café Beige 45% opacity (`rgba(203, 185, 164, 0.45)`)
- **Border:** 1px solid Café Tan 18% opacity
- **Border Radius:** 24px
- **Margin:** 48px horizontal, 24px top
- **Padding:** 36px 28px (desktop), 28px 20px (mobile)
- **Grid:** 3 columns (desktop), 1 column (mobile)

### Card 1 — Craft Espresso

**Icon:**
- Custom SVG coffee cup with steam lines
- Size: 64px × 64px circular container
- Background: Café White
- Color: Café Tan
- Border: 1px Café Tan 35% opacity
- Steam Animation: 3 rising lines (2.4s loop)
  - Lines appear and rise with fade
  - Staggered delays (0s, 0.35s, 0.7s)

**Heading:**
- "Craft Espresso"
- DM Serif Display, 32px
- Café Black

**Description:**
- "Roasted locally, extracted with precision. We respect the bean and the process."
- Light weight, Café Black 70% opacity

---

### Card 2 — Curated Sound (Center)

**Container:**
- Vertical gradient dividers on left and right (desktop only)
- Horizontal gradient dividers on top and bottom (mobile only)
- Dividers: 1px, gradient from transparent to Café Brown 35% to transparent

**Icon:**
- Music visualizer (5 animated bars)
- Size: 64px circular container
- Background: Café White
- Bars: 4px width, Café Brown 80% opacity
- Animation: Bars pulse up and down (1.2s loop)
  - Heights alternate: 6px → 22px → 14px → 26px → 8px
  - Staggered delays (0.1s increments)

**Heading:**
- "Curated Sound"
- DM Serif Display, 32px
- Café Black

**Description:**
- "Deep house, soul, and lo-fi grooves tuned to keep you in flow."
- Light weight, Café Black 70% opacity

---

### Card 3 — Creative Comfort

**Icon:**
- Armchair icon (Lucide)
- Size: 26px
- Circular container: 64px
- Background: Café White
- Color: Café Tan
- Border: 1px Café Tan 35% opacity
- Animation: Gentle sway/bounce (2.4s loop)
  - Rotates slightly (-1.5deg to +1.25deg)
  - Translates up/down (0 to -3px)

**Heading:**
- "Creative Comfort"
- DM Serif Display, 32px
- Café Black

**Description:**
- "Cozy seating, warm light, plenty of outlets—stay as long as you need."
- Light weight, Café Black 70% opacity

### Decorative Icons
- Sparkles and Armchair icons
- 22% opacity
- Top-right and bottom-left positions
- Gentle float animation

---

## Atmosphere Section

### Layout
- **Background:** Café Mist
- **Padding:** 96-128px top, 96px bottom
- **Grid:** 2 columns (desktop), 1 column (mobile)
- **Order:** Features left, heading right (desktop); heading first on mobile

### Heading (Right Column)

**Section Label:**
- "THE ATMOSPHERE"
- Café Tan
- 12px uppercase, 0.2em letter spacing, bold

**Main Heading:**
- **Line 1:** "Designed for" (italic, Café Brown)
- **Line 2:** "Focus" (italic, Café Tan)
- DM Serif Display, 60-72px
- Line height: 1.05
- Right-aligned

**Divider:**
- 96px width, 2px height
- Café Black
- Aligned right

**Body Copy:**
- "A sanctuary with warm lighting, deep playlists, and Wi-Fi that never drops. Settle in for an hour or stay all day."
- 18-22px, light weight
- Café Brown 78% opacity
- Right-aligned
- Max width: 640px

### Features Grid (Left Column)

**4 Feature Cards (2×2 Grid):**

**1. Fiber Optic Wi-Fi**
- Icon: Wifi (Lucide, 22px)
- Icon container: 48px circle, Café Tan 10% background, Café Tan color
- Title: "Fiber Optic Wi-Fi" (DM Serif Display, 24px, Café Black)
- Description: "Gigabit speeds for heavy workflows." (14-16px, Café Brown 70%)

**2. Power Everywhere**
- Icon: PlugZap (Lucide, 22px)
- Icon container: 48px circle, Café Tan 10% background
- Title: "Power Everywhere" (DM Serif Display, 24px)
- Description: "Outlets at every single seat."

**3. Warm Ambience**
- Icon: Armchair (Lucide, 22px)
- Icon container: 48px circle, Café Tan 10% background
- Title: "Warm Ambience" (DM Serif Display, 24px)
- Description: "2700K lighting for eye comfort."

**4. Acoustics**
- Icon: Music (Lucide, 22px)
- Icon container: 48px circle, Café Tan 10% background
- Title: "Acoustics" (DM Serif Display, 24px)
- Description: "Sound-treated for conversation."

**Feature Card Layout:**
- Horizontal flex layout (icon + text)
- Gap: 16px
- Icon on left, text on right
- Text left-aligned

### Decorative Blob
- **Atmosphere Blob:** Large organic shape
- Source: `/atmosphere-blob.svg`
- Size: 820px × 520px (desktop), 388px (mobile)
- Position: Absolute top-right (10px right, -50px top on desktop)
- Opacity: 60% (desktop), 50% (mobile)
- Mix blend mode: multiply
- Fade and scale in on scroll reveal

### Floating Icons
- Wifi, PlugZap icons scattered
- 10-12% opacity
- Positions: top-left, bottom-right
- Gentle floating animation

---

## Atmosphere Images

### Layout
- **Background:** Café Mist
- **Padding:** 96-112px bottom
- **Component:** AtmosphereStrip

### Mobile View (<768px)
- **Grid:** 2 columns
- **Gap:** 16px
- **Padding:** 24px horizontal
- **Images:** 4 images in 2×2 grid
- **Aspect Ratio:** 3:4 (portrait)
- **Border Radius:** 2px (minimal)
- **Shadow:** Large
- **Offset:** Alternating images (even: translateY(24px))

### Desktop View (≥768px)
- **Layout:** Horizontal strip (flexbox)
- **Gap:** 56px
- **Padding:** 60px 100px (generous overflow)
- **Margin:** -60px -100px (pulls beyond container)
- **Overflow:** Visible (no scrolling)
- **Justify:** Center
- **Images:** All 4 visible, centered

**Image Cards:**
- **Size:** 320px min-width
- **Aspect Ratio:** 4:5
- **Border Radius:** 32px (2xl)
- **Shadow:** `0 8px 16px rgba(0,0,0,0.35)`
- **Border:** 1px white 32% opacity
- **Tilt:** Alternating rotations
  - Image 1: -6deg
  - Image 2: +8deg
  - Image 3: -6deg
  - Image 4: +8deg
- **Hover:**
  - Transform: translateY(-6px) scale(1.03)
  - Shadow: increased

**Images:**
1. `/unsplash/tnc-placeholder-3.png`
2. `/unsplash/tnc-placeholder-4.png`
3. `/unsplash/tnc-placeholder-5.png`
4. `/unsplash/tnc-placeholder-6.png`

### Floating Icons
- Sparkles and Coffee icons
- 6-10% opacity
- Positions: top-left, bottom-right
- Gentle floating animation

---

## Newsletter Section

### Layout
- **Background:** Café Mist
- **Padding:** 96px vertical, 24px horizontal
- **Max Width:** 800px (2xl) centered
- **Text Align:** Center

### Content

**Icon:**
- Mail icon (Lucide)
- Size: 32px
- Color: Café Tan
- Margin bottom: 24px

**Heading:**
- "Join the Inner Circle"
- DM Serif Display, 36-48px
- Café Black
- Margin bottom: 16px

**Description:**
- "Be the first to know about our grand opening, special tastings, and secret menu items."
- 14-16px, light weight
- Café Brown 80% opacity
- Margin bottom: 32px

**Newsletter Form Component:**
- Component: NewsletterForm
- Source: "homepage"
- Full width
- Contained within max-width container

**Form Elements:**
- Email input field
- Submit button
- Success/error states
- Privacy notice

### Floating Icons
- Mail and Sparkles icons
- 10-12% opacity
- Positions: top-left, bottom-right
- Gentle floating animation

---

## Footer

### Layout
- **Background:** Café Black
- **Text Color:** Café Mist (default), Café Cream (headings)
- **Padding:** 80px top, 40px bottom
- **Max Width:** 1400px (7xl)
- **Grid:** 6 columns (desktop), 1 column (mobile)

### Column 1 — Brand (2 columns wide)

**Heading:**
- "The Notebook Café"
- DM Serif Display, 48px
- Café Cream

**Description:**
- "A space for creatives, thinkers, and coffee lovers. Where house music meets premium espresso in the heart of Riverside."
- Light weight
- Café Cream 88% opacity
- Max width: 480px

**Social Icons:**
- Instagram icon link
- Size: 24px
- Color: Café Cream (default), Café Tan (hover)
- Margin top: 16px

---

### Column 2 — Contact

**Heading:**
- "CONTACT"
- 12px uppercase, 0.2em letter spacing
- Café Tan

**Links:**
- Phone: (951) 823-0004
- Email: hello@notebook.cafe
- Light weight
- Café Cream 90% opacity
- Hover: Café Cream 100%

---

### Column 3 — Location

**Heading:**
- "LOCATION"
- 12px uppercase, 0.2em letter spacing
- Café Tan

**Address:**
- 3512 9th St
- Riverside, CA 92501
- Light weight
- Café Cream 90% opacity
- Not italic (address tag)

---

### Column 4 — Hours

**Heading:**
- "HOURS"
- 12px uppercase, 0.2em letter spacing
- Café Tan

**Hours List:**
- Mon–Sat: 7:00am — 6pm
- Sun: Closed (italic, 50% opacity)
- Light weight
- Café Cream 90% opacity

---

### Column 5 — Navigation

**Heading:**
- "NAVIGATION"
- 12px uppercase, 0.2em letter spacing
- Café Tan

**Links:**
- Home
- Menu
- Story
- Events
- Contact
- Careers
- Light weight
- Café Cream 88% opacity
- Hover: Café Cream 100%
- Gap: 8px

---

### Bottom Bar

**Border Top:** 1px white 10% opacity
**Padding Top:** 32px
**Layout:** Flexbox (space between)

**Left Side:**
- Copyright: "© 2025 The Notebook Café. All rights reserved."
- "Made with ♥ in Riverside."
- 12px size
- Café Cream 65% opacity

**Right Side:**
- Links: Cookies | Privacy | Terms | Accessibility | Refunds
- 12px size
- Gap: 24px
- Café Cream 65% opacity
- Hover: Café Cream 100%

---

## Animations & Interactions

### Scroll Reveal System
- **Trigger:** Elements 50px before entering viewport
- **Animation:** Fade + scale (0.95 to 1.0)
- **Duration:** 500ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)
- **Class:** `.scroll-reveal`
- **Active Class:** `.is-visible`
- **Above Fold:** Quick fade only (300ms)

### Progressive Stagger
- Elements reveal sequentially with delays:
  - First item: 0ms
  - Second item: 100-150ms
  - Third item: 200-250ms
  - And so on...

### Hover States

**Buttons:**
- Transform: translateY(-2px to -4px)
- Shadow: Larger, more prominent
- Color shifts: Café Black → Café Brown
- Duration: 200-300ms

**Images:**
- Transform: translateY(-6px) scale(1.02-1.08)
- Shadow increase
- Grayscale removal (20% → 0%)
- Duration: 400-700ms

**Cards:**
- Transform: translateY(-4px to -6px)
- Shadow: More prominent
- Background: Slightly lighter
- Border: Café Tan accent
- Duration: 300-350ms

### Continuous Animations

**Floating Elements:**
- Icons, decorative shapes
- Vertical movement: 0 to -12px
- Duration: 10-13s
- Easing: ease-in-out
- Infinite loop

**Ken Burns Effect (Hero):**
- Background image slow zoom
- Scale: 1.0 to 1.1
- Duration: 20s
- Infinite loop

**Steam/Visualizer:**
- Coffee steam rises and fades
- Music bars pulse rhythmically
- Duration: 1.2-2.4s loops

---

## Responsive Behavior

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | 320px+ | Base styles |
| Small | 640px+ | Tablet portrait |
| Medium | 768px+ | Tablet landscape, desktop nav |
| Large | 1024px+ | Desktop layouts |
| XL | 1280px+ | Large desktop |

### Mobile Adaptations

**Hero:**
- Single column layout
- Centered text alignment
- Smaller logo image
- Reduced padding

**Signature Pours:**
- 1-2 columns
- Blob backgrounds visible
- Cards alternate slide from sides

**Philosophy & Low Lights:**
- Stack text above images
- Left-aligned text (not right)
- Smaller blob decorations
- Reduced image grids

**Trinity:**
- Single column stack
- Horizontal gradient dividers
- Reduced padding

**Atmosphere:**
- 2-column image grid instead of horizontal strip
- Stacked feature cards

**Footer:**
- Single column stack
- Center-aligned text
- Vertical social links

---

## Decorative Elements

### Floating Icons
- **Source:** Lucide React icons
- **Types:** Coffee, Music, Sparkles, Wifi, PlugZap, Armchair, Mail
- **Size:** 44-72px
- **Opacity:** 5-12%
- **Colors:** Café Tan, Café Brown
- **Animation:** Gentle float (10-13s loops)
- **Placement:** Scattered throughout sections
- **Responsive:** Hidden on mobile (<768px)

### Blob Shapes
- **Philosophy Blob:** `/philosophy-blob.svg`
- **Story Blob:** `/low-lights-blob.svg`
- **Atmosphere Blob:** `/atmosphere-blob.svg`
- **Signature Pour Blobs:** `/signature-pour-blob-{1-4}.svg`
- **Mix Blend Mode:** multiply
- **Opacity:** 25-62%
- **Animation:** Fade + scale on scroll reveal
- **Purpose:** Add organic, coffee-stain aesthetic

### Gradient Dividers
- **Type:** Horizontal or vertical lines
- **Style:** Linear gradient (transparent → color → transparent)
- **Colors:** Café Brown 35% opacity, Café Tan
- **Width/Height:** 1-2px
- **Usage:** Section labels, card separators

---

## Technical Notes

### Performance
- **Images:** Next.js Image component with lazy loading
- **Animations:** CSS transforms (GPU accelerated)
- **Fonts:** Preloaded via Google Fonts
- **Scroll:** Intersection Observer API (efficient)

### Accessibility
- **Focus States:** 2px Café Tan outline with offset
- **Alt Text:** Descriptive for all images
- **ARIA Labels:** For icon buttons
- **Keyboard Nav:** Full support (ESC closes drawers)
- **Color Contrast:** WCAG AA compliant

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14+
- Android Chrome 90+

---

## Assets Needed

### Images
- `/tnc-navbar-logo.png` — Logo with text lockup
- `/unsplash/tnc-home-hero-cup.jpg` — Hero background
- `/unsplash/tnc-hero-coffee-cup.png` — Hero latte image
- `/unsplash/tnc-placeholder-featured-{1-4}.png` — Signature pours
- `/unsplash/tnc-placeholder-philosophy-{1-2}.png` — Philosophy images
- `/unsplash/tnc-placeholder-{1-2}.png` — Low lights images
- `/unsplash/tnc-placeholder-{3-6}.png` — Atmosphere images

### SVG Assets
- `/philosophy-blob.svg` — Organic blob shape
- `/low-lights-blob.svg` — Organic blob shape
- `/low-lights-gallery-blob.svg` — Mobile gallery blob
- `/atmosphere-blob.svg` — Organic blob shape
- `/signature-pour-blob-{1-4}.svg` — Product card blobs

### Icons
- Lucide React library (installed via npm)

---

## Summary

The Notebook Café homepage is a **premium, minimal coffee shop website** with:

- **8 main sections** (Hero → Newsletter)
- **Warm, coffee-inspired color palette** (browns, creams, tans)
- **Scroll-triggered animations** for progressive disclosure
- **Organic decorative elements** (blobs, floating icons)
- **Responsive design** (mobile-first, adapts to all screens)
- **High-quality photography** with natural coffee aesthetic
- **Premium typography** (DM Serif Display + Outfit)
- **Interactive components** (cart, navigation, newsletter form)

The design balances **sophistication with approachability**, creating a welcoming digital experience that mirrors the physical café's atmosphere.

---

**End of Documentation**
