# Accessibility Text Size - Mobile UI/UX Fix Plan

## Summary
The accessibility text size feature (Large and Extra Large) causes significant UI/UX issues on mobile devices (iPhone 13 / 390px width). Text overflows, gets cut off, and the accessibility button overlaps content.

---

## Issues Discovered

### Critical: Text Overflow/Cut-off

#### LARGE Text Size (1.125em)
| Location | Issue | Severity |
|----------|-------|----------|
| Hero title | "Where Every Cup" shows as "Where Every Cu" - cut off | High |
| Location section | "GET DIRECTIONS" split awkwardly across 2 lines | Medium |
| Menu section | "VIEW FULL MENU →" button text/arrow on separate lines | Medium |

#### XL Text Size (1.35em)
| Location | Issue | Severity |
|----------|-------|----------|
| Hero title | "Where Every Cup" shows as "re Every" - severely cut off | Critical |
| Hero subtitle | "Tells A Story" shows as "ells A Sto" - cut off | Critical |
| Hero tagline | "SPECIALTY COFFEE IN RIVERSIDE, CA." spans 5 lines | High |
| Kitchen heading | "From Our Kitchen" shows as "From Our Kitche" | High |
| Hours | "7am - 6pm" splits with "6pm" on new line | Medium |
| Menu description | "matcha" and "Strawberry" cut off at edges | Medium |

### Moderate: Accessibility Button Overlap

The fixed accessibility button (bottom-left) overlaps content when scrolling:

| Section | Text Affected |
|---------|---------------|
| Experience | "Low lights" → "ow lights" |
| Experience | "READ OUR STORY" → "AD OUR STORY" |
| Atmosphere | "It's not just" → "s not just" |
| Atmosphere | "stronger." → "ronger." |
| Menu | "Multigrain" partially covered |

### Minor: Layout Issues

- "THE EXPERIENCE" and "THE ATMOSPHERE" labels split across 2 lines (XL)
- "CRAFTED WITH CARE" splits across 2 lines (XL)
- Various acceptable but non-ideal text wrapping

---

## Root Cause Analysis

1. **Multiplicative Scaling**: CSS uses `font-size: 1.125em` and `1.35em` which multiplies with existing font sizes, causing exponential growth on already-large headings

2. **No Mobile Constraints**: No breakpoint-specific limits for accessibility scaling

3. **Fixed Pixel Sizes**: Hero titles use fixed sizes that don't account for accessibility scaling

4. **Button Overlap**: Accessibility button in fixed position overlaps scrolling content

---

## Proposed Fixes

### Fix 1: Reduce Mobile Scaling Factors

```css
/* Current - too aggressive on mobile */
.acc-text-lg p, .acc-text-lg li, ... { font-size: 1.125em !important; }
.acc-text-xl p, .acc-text-xl li, ... { font-size: 1.35em !important; }

/* Proposed - gentler mobile scaling */
@media (max-width: 480px) {
  .acc-text-lg p, .acc-text-lg li, .acc-text-lg span,
  .acc-text-lg a, .acc-text-lg button {
    font-size: 1.06em !important;
  }

  .acc-text-xl p, .acc-text-xl li, .acc-text-xl span,
  .acc-text-xl a, .acc-text-xl button {
    font-size: 1.12em !important;
  }
}
```

### Fix 2: Exclude Large Headings from Scaling

```css
/* Don't scale h1, h2 as aggressively - they're already large */
@media (max-width: 480px) {
  .acc-text-lg h1, .acc-text-lg h2 {
    font-size: inherit !important; /* or a smaller multiplier like 1.02em */
  }

  .acc-text-xl h1, .acc-text-xl h2 {
    font-size: 1.05em !important;
  }
}
```

### Fix 3: Add Content Padding for Accessibility Button

```css
/* When non-default accessibility settings are active, add left padding */
.acc-text-lg main,
.acc-text-xl main,
.acc-grayscale main,
.acc-contrast main {
  padding-left: 70px; /* Width of accessibility button + margin */
}

@media (min-width: 768px) {
  .acc-text-lg main,
  .acc-text-xl main {
    padding-left: 0; /* Desktop doesn't need this */
  }
}
```

### Fix 4: Use CSS Clamp for Constrained Scaling

```css
/* For body text - scale but with max constraint */
@media (max-width: 480px) {
  .acc-text-xl p {
    font-size: clamp(1rem, 1.12em, 1.25rem) !important;
  }
}
```

### Fix 5: Hero-Specific Mobile Overrides

```css
/* Prevent hero title overflow on mobile with accessibility */
@media (max-width: 480px) {
  .acc-text-lg .hero-title,
  .acc-text-xl .hero-title {
    font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
    word-break: break-word;
  }
}
```

---

## Implementation Priority

### Phase 1 (Immediate)
1. Reduce mobile scaling factors for body text
2. Exclude or minimize scaling for h1/h2 headings on mobile

### Phase 2 (Short-term)
3. Add hero-specific CSS overrides
4. Add padding for accessibility button overlap

### Phase 3 (Polish)
5. Fine-tune specific sections that still have issues
6. Test on additional device sizes (375px iPhone SE, 414px iPhone Plus)

---

## Testing Checklist

- [ ] iPhone 13 (390px) - Normal text
- [ ] iPhone 13 (390px) - Large text
- [ ] iPhone 13 (390px) - XL text
- [ ] iPhone SE (375px) - All text sizes
- [ ] iPhone Plus (414px) - All text sizes
- [ ] Tablet portrait (768px) - All text sizes
- [ ] No text overflow in hero section
- [ ] No text overflow in section headings
- [ ] Accessibility button doesn't overlap readable content
- [ ] Hours/location info remains readable
- [ ] Buttons remain usable

---

## Files to Modify

1. `app/globals.css` - Accessibility text size rules
2. Possibly `app/styles/pages/home.css` - Hero-specific overrides (if exists)
3. Component-level styles if needed

