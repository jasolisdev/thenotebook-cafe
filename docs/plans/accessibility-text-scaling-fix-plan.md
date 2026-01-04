# Accessibility Text Size Scaling - Implementation Plan

## Summary

Fix the accessibility widget's text size scaling feature. The default (normal) size works, but the "Large" and "Extra Large" sizes cause text overflow and layout issues across pages. This plan simplifies to **2 text sizes** (Normal and Large) with properly tested, non-breaking scaling.

---

## Research Findings

### Current Implementation Analysis

| Setting | CSS Multiplier | Actual Effect |
|---------|----------------|---------------|
| Normal | 1.0 (none) | Works perfectly |
| Large | 1.125em | Minor overflow on mobile hero |
| XL | 1.35em | Critical overflow, text cut off |

**Problem:** The `em` unit multiplies with existing font sizes, causing exponential growth on already-large headings.

### WCAG 2.1 Guidelines (Key Points)

- **Success Criterion 1.4.4:** Text must be resizable up to 200% without loss of content
- **Success Criterion 1.4.10:** Content should reflow without horizontal scrolling
- **Recommendation:** Use relative units (em, rem) but with constraints
- Browser zoom already handles scaling - widgets add complexity

### Industry Best Practice

Major sites with accessibility widgets typically:
1. Offer 2-3 text size options maximum
2. Use conservative scaling (10-25% increases)
3. Exclude headings from scaling (already sized for impact)
4. Test thoroughly on mobile devices

### Decision: Simplify to 2 Sizes

**Rationale:**
- XL (1.35em) causes critical overflow on mobile - removes rather than fixes
- Single "Large" option with proper scaling serves accessibility needs
- Simpler UI = better UX for users with disabilities
- Aligns with web accessibility best practice of not over-engineering

---

## Implementation Tasks

### Phase 1: Analysis & Testing Setup

- [ ] **1.1** Run dev server and manually test current text sizes on all pages
- [ ] **1.2** Create Playwright test script to capture screenshots at each text size
- [ ] **1.3** Document specific overflow issues per page with screenshots

### Phase 2: CSS Modifications

- [ ] **2.1** Remove `.acc-text-xl` CSS rules from `globals.css`
- [ ] **2.2** Adjust `.acc-text-lg` scaling factor (reduce from 1.125em if needed)
- [ ] **2.3** Add mobile-specific scaling rules with gentler multipliers
- [ ] **2.4** Add `overflow-wrap: break-word` for long text safety
- [ ] **2.5** Test hero sections specifically (known problem area)

### Phase 3: Component Updates

- [ ] **3.1** Update `AccessibilityWidget.tsx` - remove XL button
- [ ] **3.2** Update `AccessibilitySettings` interface - remove `"xl"` from textSize type
- [ ] **3.3** Ensure localStorage migration (if user had XL selected, reset to large)
- [ ] **3.4** Update accessibility statement text if needed

### Phase 4: Cross-Page Testing with Playwright

- [ ] **4.1** Test Home page (`/`) at Normal and Large
- [ ] **4.2** Test Menu page (`/menu`) at Normal and Large
- [ ] **4.3** Test Story page (`/story`) at Normal and Large
- [ ] **4.4** Test Contact page (`/contact`) at Normal and Large
- [ ] **4.5** Test Careers page (`/careers`) at Normal and Large
- [ ] **4.6** Test Terms/Privacy/Refunds pages at Normal and Large
- [ ] **4.7** Test on mobile viewport (390px) and desktop (1280px)
- [ ] **4.8** Verify no horizontal overflow on any page

### Phase 5: Final Verification

- [ ] **5.1** Run existing accessibility E2E tests
- [ ] **5.2** Manual accessibility widget interaction test
- [ ] **5.3** Verify localStorage persistence works correctly
- [ ] **5.4** Check that reset button works properly

---

## Files to Modify

| File | Changes |
|------|---------|
| `app/globals.css` | Remove `.acc-text-xl` rules, adjust `.acc-text-lg` scaling |
| `app/components/features/Accessibility/AccessibilityWidget.tsx` | Remove XL button, update types |
| `tests/e2e/accessibility.spec.ts` | Update tests for 2-size system |

---

## CSS Changes Preview

```css
/* BEFORE: 3 sizes with aggressive scaling */
.acc-text-lg p, ... { font-size: 1.125em !important; }
.acc-text-xl p, ... { font-size: 1.35em !important; }

/* AFTER: Single "Large" size with safe scaling */
.acc-text-lg p, .acc-text-lg li, .acc-text-lg span,
.acc-text-lg a, .acc-text-lg button, .acc-text-lg label,
.acc-text-lg input, .acc-text-lg textarea {
  font-size: 1.1em !important;
  overflow-wrap: break-word;
}

/* Mobile: Even gentler scaling */
@media (max-width: 480px) {
  .acc-text-lg p, .acc-text-lg li, .acc-text-lg span,
  .acc-text-lg a, .acc-text-lg button {
    font-size: 1.06em !important;
  }
}
```

---

## Success Criteria

1. No text overflow or cut-off on any page at any viewport
2. Accessibility widget shows 2 text size options (Normal, Large)
3. All existing E2E tests pass
4. Scaling is perceptible but doesn't break layouts
5. Mobile and desktop both work correctly

---

## References

- [WCAG 2.1 Text Resize Criterion](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)
- [PayPal: Designing for Accessibility Text Resizing](https://medium.com/paypal-tech/designing-for-accessibility-how-text-resizing-works-in-different-web-browsers-bed9e424e071)
- [Accessible Font Sizing Explained (CSS-Tricks)](https://css-tricks.com/accessible-font-sizing-explained/)
- Existing issue documentation: `docs/plans/accessibility-text-size-mobile-fix.md`
