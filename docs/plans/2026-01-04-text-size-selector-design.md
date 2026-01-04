# Text Size Selector - Accessibility Widget Feature

**Date:** 2026-01-04
**Status:** Approved
**Branch:** `claude/accessibility-widget-text-scaling-fix-8161`

---

## Overview

Add a three-option text size selector to the accessibility widget, positioned above the Bionic Reading toggle. This feature serves both low vision users (WCAG compliance) and users who prefer larger text for comfort.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Target users | Both low vision + preference | Covers accessibility compliance and casual comfort |
| Control type | Three-option segmented control | Shows all options, one tap to change |
| Size levels | Normal / Large (115%) / XL (130%) | Meaningful help without breaking layouts |
| Scope | Main content area only | Nav/footer/widget stay fixed, consistent with existing features |
| Labels | Normal \| Large \| XL | Concise, clear, fits widget width |

---

## Component Structure

### Location in Widget

The text size selector appears at the top of the settings area:

```
┌─────────────────────────────────┐
│  Accessibility Tools        [X] │
├─────────────────────────────────┤
│  📏 Text Size                   │
│  [Normal] [Large] [XL]          │  ← NEW
│                                 │
│  🧠 Bionic Reading        [○──] │
│  📏 Reading Guide         [──○] │
│  ... other toggles ...          │
└─────────────────────────────────┘
```

### State Management

Add to `AccessibilitySettings` interface:

```typescript
interface AccessibilitySettings {
  // ... existing fields
  textSize: 'normal' | 'large' | 'xl';
}

const defaultSettings: AccessibilitySettings = {
  // ... existing defaults
  textSize: 'normal',
};
```

Persists to localStorage with other settings.

---

## Visual Design

### Segmented Control Styling

- **Container:** Full width, `rounded-xl`, `border border-cafe-tan/20`, `bg-white`
- **Segments:** Three equal-width buttons
- **Inactive segment:** `bg-white`, `text-cafe-brown`
- **Active segment:** `bg-cafe-tan/15`, `text-cafe-black`, `font-bold`, subtle inner shadow
- **Height:** 44px minimum (touch target compliance)
- **Transitions:** 200ms color/background transitions

### Label Row

- Icon: Ruler or text-size icon (reuse `RulerIcon` or create simple "Aa" text icon)
- Label: "Text Size" in same style as toggle labels
- Spacing: 16px below the control before Bionic Reading toggle

---

## Responsive Design

### Desktop (768px+)

- Widget: 380px side drawer
- Segmented control: Full width with 24px horizontal padding
- Each segment: ~100px wide

### Mobile (390px - iPhone 13)

- Widget: Fullscreen overlay
- Usable width: ~342px (390px - 48px padding)
- Each segment: ~114px wide
- Labels fully visible, no truncation

### iPhone SE (375px)

- Each segment: ~109px wide
- Still comfortable for "Normal", "Large", "XL" labels

---

## CSS Implementation

### Classes Applied to `<html>`

```css
/* Large - 115% scaling */
html.acc-text-large main {
  font-size: 115%;
}

html.acc-text-large main p,
html.acc-text-large main li,
html.acc-text-large main h1,
html.acc-text-large main h2,
html.acc-text-large main h3,
html.acc-text-large main h4,
html.acc-text-large main h5,
html.acc-text-large main h6 {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Extra Large - 130% scaling */
html.acc-text-xl main {
  font-size: 130%;
}

html.acc-text-xl main p,
html.acc-text-xl main li,
html.acc-text-xl main h1,
html.acc-text-xl main h2,
html.acc-text-xl main h3,
html.acc-text-xl main h4,
html.acc-text-xl main h5,
html.acc-text-xl main h6 {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

### What Scales

Inside `<main>` only:
- Paragraphs, list items
- All heading levels
- Spans and inline text
- Button and link text within main

### What Stays Fixed

- Navigation bar
- Footer
- Accessibility widget itself
- Cookie banner
- All UI outside `<main>`

### Feature Interactions

- **Dyslexia Font:** Works together (OpenDyslexic + larger = combined benefit)
- **Bionic Reading:** Bold portions scale with text
- **High Contrast / Grayscale:** No conflicts

---

## Testing Plan (Playwright)

### Test File

`tests/e2e/accessibility-text-size.spec.ts`

### Test Cases

1. **Default State**
   - Open widget, verify "Normal" is active
   - Verify no `acc-text-*` class on `<html>`

2. **Large Size Selection**
   - Click "Large" segment
   - Verify `acc-text-large` class applied
   - Verify visual active state on segment

3. **XL Size Selection**
   - Click "XL" segment
   - Verify `acc-text-xl` class applied

4. **Persistence**
   - Set to "Large", reload page
   - Verify selection persists

5. **Mobile Viewport (390x844)**
   - Run all above tests
   - Verify no horizontal overflow
   - Verify control is fully visible

### Screenshots

Capture at each size for visual regression:
- Desktop (1280px width)
- Mobile (390px width)

---

## Files to Modify

| File | Changes |
|------|---------|
| `app/components/features/Accessibility/AccessibilityWidget.tsx` | Add `textSize` to interface, new `TextSizeSelector` component, state logic |
| `app/globals.css` | Add `.acc-text-large` and `.acc-text-xl` classes |
| `tests/e2e/accessibility-text-size.spec.ts` | New file with Playwright tests |

---

## Implementation Order

1. Add CSS classes to `globals.css`
2. Update TypeScript interface and default settings
3. Build `TextSizeSelector` segmented control component
4. Integrate into widget above Bionic Reading
5. Wire up state and class application to `<html>`
6. Write Playwright tests
7. Visual review on desktop and mobile

---

## Estimated Scope

- ~50 lines CSS
- ~80 lines TSX
- ~100 lines Playwright tests

---

## Approval

Design approved via collaborative brainstorming session on 2026-01-04.
