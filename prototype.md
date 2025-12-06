# Story Prototype Design Session - Quick Start Guide

> **Purpose:** This file helps Claude quickly resume story page redesign work by activating necessary agents, skills, and reading key context files.

---

## 🚀 Quick Start Commands

When starting a new session for story prototype work, follow these steps:

### Step 1: Activate the UX Designer Agent
```
Read and activate: .bmad/bmm/agents/ux-designer.md
```

### Step 2: Activate Frontend Design Skill
```
Use the Skill tool to activate: frontend-design
```

### Step 3: Read Essential Context Files

**Required Reading (in order):**
1. `CLAUDE.md` - Project overview and architecture
2. `docs/ux-design-specification.md` - Complete UX design direction and "Artisanal Warmth" aesthetic
3. `docs/prd.md` - Product requirements and features
4. `app/page.tsx` - Home page for aesthetic reference (lines 1-400)
5. `app/story/page.tsx` - Current production story page
6. `app/story/prototype/page.tsx` - Prototype story page (our working canvas)

**Optional Context:**
- `docs/ux-design-directions.html` - Visual design explorations
- `app/events/page.tsx` - Events page for hero section reference
- `.bmad/bmm/workflows/2-plan-workflows/create-ux-design/workflow.md` - UX workflow process

---

## 📍 Current State (as of 2025-12-06)

### What We've Built

**Location:** `/story/prototype` (http://localhost:3000/story/prototype)

**Page Structure:**
1. **Hero Section** - KenBurnsHero with events-page height (`pt-28 pb-28 md:pt-32 md:pb-32`)
2. **Dark Quote Section** - Large opening quote on cafe-black background
3. **Timeline Narrative** - Visual timeline with 3 chapters (Observation → Vision → Commitment)
4. **Meet the Founders** - Detailed profiles for two founders with credentials
5. **Why Riverside** - Community focus and location story
6. **What Sets Us Apart** - 4 detailed differentiator cards
7. **Newsletter CTA** - Dark background closer

### Design Principles Applied

**Aesthetic:** Matches home page visual language but with unique storytelling elements
- Same color palette (cafe-white, cafe-black, cafe-tan, cafe-mist, cafe-cream)
- Same typography (DM Serif Display for headings, sans-serif for body)
- Same floating decorative icons (`.section-deco`)
- Same Reveal animations
- **BUT** with unique sections (timeline, founder profiles, dark quotes)

**Key Differences from Home Page:**
- Deeper narrative dive (timeline storytelling)
- Personal founder profiles (not on home page)
- Dark sections for contrast
- More detailed differentiators
- "Chapter One" framing

### Technical Details

**CSS:** `app/styles/pages/story-prototype.css` - Hero height overrides
**Component:** Uses existing components (KenBurnsHero, Reveal, NewsletterForm)
**Images:** Placeholder images from `/public/unsplash/`

---

## 🎯 Design Goals

### Home Page → Story Prototype Relationship
- **Home Page:** Builds anticipation, teases the story
- **Story Prototype:** Delivers on that anticipation with depth

### Story Page Should:
1. **Go Deeper** - More detail than home page teases
2. **Introduce Founders** - Humanize the business
3. **Explain "Why"** - Why Riverside, why this approach, why care
4. **Differentiate** - What makes this café unique vs. franchises
5. **Build Trust** - Through transparency and story depth

### Design Constraints:
- Must match home page aesthetic (cohesive experience)
- Must be unique enough to not feel redundant
- Events-page hero height (shorter, more focused)
- Mobile-first responsive design
- WCAG AA accessibility compliance

---

## 🛠️ Common Tasks

### To Redesign a Section:
1. Read current `app/story/prototype/page.tsx`
2. Review home page aesthetic (`app/page.tsx`)
3. Check UX spec for content guidance (`docs/ux-design-specification.md`)
4. Make changes maintaining existing components (Reveal, section-deco, etc.)
5. Build and test: `npm run build`

### To Add New Content:
1. Reference UX spec for approved copy direction
2. Maintain home page typography patterns
3. Use existing color variables (var(--cafe-*))
4. Add floating decorative icons if section is large
5. Ensure Reveal animations for scroll reveals

### To Match Home Page Style:
- **Section backgrounds:** cafe-white, cafe-mist, cafe-cream, cafe-black
- **Floating icons:** `.section-deco` with varying `animationDuration`
- **Headings:** `font-serif` with cafe-black, italics in cafe-tan
- **Body text:** `font-light` with `rgba(var(--cafe-brown-rgb), 0.82)`
- **Dividers:** Gradient lines with `linear-gradient()`
- **Icon circles:** `rounded-full` with subtle backgrounds and tan borders

---

## 📝 Key Files Reference

| File | Purpose |
|------|---------|
| `app/story/prototype/page.tsx` | Main prototype page component |
| `app/styles/pages/story-prototype.css` | Custom styles (hero height) |
| `app/components/features/KenBurnsHero.tsx` | Hero component |
| `app/components/ui/Reveal.tsx` | Scroll reveal animations |
| `app/components/features/NewsLetterForm.tsx` | Newsletter signup |
| `CLAUDE.md` | Full project documentation |
| `docs/ux-design-specification.md` | Design system and UX direction |
| `docs/prd.md` | Product requirements |

---

## 💡 Quick Reference: Color Usage

```tsx
// Backgrounds
style={{ backgroundColor: 'var(--cafe-white)' }}   // Main sections
style={{ backgroundColor: 'var(--cafe-mist)' }}    // Warm alternates
style={{ backgroundColor: 'var(--cafe-cream)' }}   // Warmer alternates
style={{ backgroundColor: 'var(--cafe-black)' }}   // Dark sections

// Text
style={{ color: 'var(--cafe-black)' }}                    // Headings
style={{ color: 'var(--cafe-tan)' }}                      // Accents, italics
style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}    // Body text
style={{ color: 'var(--cafe-cream)' }}                    // Light text on dark
```

---

## 🎨 Quick Reference: Typography Patterns

```tsx
// Section Labels
<span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--cafe-tan)' }}>
  Section Label
</span>

// Main Headings
<h2 className="font-serif text-4xl md:text-6xl" style={{ color: 'var(--cafe-black)' }}>
  Main <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Heading</span>
</h2>

// Body Text
<p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}>
  Body content here
</p>

// Divider
<div className="w-24 h-[2px]" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
```

---

## ✅ Session Checklist

When resuming work:
- [ ] Activate UX Designer agent (`.bmad/bmm/agents/ux-designer.md`)
- [ ] Activate frontend-design skill
- [ ] Read `CLAUDE.md` for project context
- [ ] Read `docs/ux-design-specification.md` for design direction
- [ ] Review current `app/story/prototype/page.tsx`
- [ ] Check home page `app/page.tsx` for aesthetic consistency
- [ ] Understand current state (sections, content, unique elements)
- [ ] Build to verify everything works: `npm run build`

---

## 🚨 Important Notes

1. **Always maintain home page aesthetic** - The prototype should feel like a natural extension, not a different site
2. **Use existing components** - KenBurnsHero, Reveal, NewsletterForm, decorative icons
3. **Hero height is custom** - Uses CSS overrides to match events page (7rem/8rem padding)
4. **Build before committing** - Always verify with `npm run build`
5. **Reference UX spec** - It contains approved content direction and "Artisanal Warmth" design choices

---

## 📞 Need Help?

If context is unclear:
1. Read `CLAUDE.md` - Most comprehensive project guide
2. Check `docs/ux-design-specification.md` - Design system details
3. Review home page code - Best reference for patterns
4. Look at `docs/prd.md` - Feature requirements

---

**Last Updated:** 2025-12-06
**Status:** Story prototype redesigned with unique narrative journey, founder profiles, timeline storytelling
**Next Steps:** Continue refining based on feedback, consider adding more unique visual elements
