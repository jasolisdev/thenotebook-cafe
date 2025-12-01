# Scroll Position Bug - Debug Log

## Problem Description
When navigating between pages (especially from menu page scrolled to bottom → story page), the page loads with an offset. The heading appears just below the navbar, and scrolling up reveals extra spacing above the content. The page is NOT scrolling to position 0 on navigation.

**Expected:** Page scrolls to position 0 (true top)
**Actual:** Page appears to be scrolled down by ~80-100px (navbar height + some extra)

---

## What We've Tried (Chronological)

### ✅ Attempt 1: Added Manual Scroll in SiteHeader
**File:** `app/components/layout/SiteHeader.tsx`
**Change:** Added `window.scrollTo(0, 0)` in useEffect on pathname change
**Result:** ❌ Still had offset
**Reason Failed:** Was fighting with Next.js's built-in scroll restoration

---

### ✅ Attempt 2: Added scroll-padding-top
**File:** `app/globals.css`
**Change:** Added `scroll-padding-top: 80px` to account for sticky navbar
**Result:** ❌ Made it worse - created the 80px offset
**Reason Failed:** scroll-padding-top affects ALL scroll positioning globally, not just anchor links

---

### ✅ Attempt 3: Removed scroll-behavior CSS conflicts
**Files:**
- `app/styles/components/page-transitions.css` - Removed `scroll-behavior: smooth`
- `app/globals.css` - Removed `scroll-behavior: auto`

**Result:** ❌ Still had offset
**Reason Failed:** Scroll behavior settings weren't the root cause

---

### ✅ Attempt 4: Removed ALL manual scroll code
**File:** `app/components/layout/SiteHeader.tsx`
**Change:** Removed manual `window.scrollTo()` completely - let Next.js handle it
**Result:** ❌ Still had offset
**Reason Failed:** The issue wasn't our manual scroll code

---

### ✅ Attempt 5: Added scroll-padding-top back, then removed it again
**File:** `app/globals.css`
**Change:** Tried adding it back for anchor links, then removed it completely
**Result:** ❌ Still had offset
**Reason Failed:** scroll-padding-top was interfering, removing it didn't fix the core issue

---

### ✅ Attempt 6: Added targeted scroll for drawer navigation
**File:** `app/components/layout/SiteHeader.tsx`
**Change:** Only scroll when navigating FROM mobile drawer using useRef + requestAnimationFrame
**Result:** ❌ Still had offset
**Reason Failed:** Issue wasn't specific to drawer navigation

---

### ✅ Attempt 7: Created minimal TestHeader
**Files:**
- Created `app/components/layout/TestHeader.tsx` - Bare-bones nav with ZERO scroll manipulation
- Modified `app/layout.tsx` - Swapped TestHeader for SiteHeader

**What TestHeader has:**
- ✅ Just Next.js Link components
- ✅ Sticky positioning
- ❌ NO drawer/hamburger
- ❌ NO useEffect hooks
- ❌ NO scroll manipulation
- ❌ NO body overflow changes

**Result:** ❌ STILL HAS OFFSET (This confirms issue is NOT in SiteHeader!)
**Key Finding:** Problem is somewhere else in the app - not the navigation component

---

### ✅ Attempt 8: Removed unused Webflow jQuery script
**File:** `app/layout.tsx`
**Change:** Commented out Webflow jQuery loaded with `strategy="beforeInteractive"`
**Reason:**
- Script loaded BEFORE React hydration
- No Webflow code used anywhere in site
- Could intercept scroll events before Next.js initializes
- Prime suspect for blocking Next.js scroll restoration

**Result:** ❌ Still had offset
**Reason Failed:** Webflow jQuery wasn't the culprit

---

## Current State

**Active Test Setup:**
- ✅ TestHeader (minimal nav) is active
- ✅ Webflow jQuery script removed
- ✅ No manual scroll code anywhere
- ✅ No scroll-padding-top
- ✅ No scroll-behavior CSS

**Issue Status:** 🔴 STILL BROKEN

---

## Remaining Suspects (From Deep Analysis)

### 1. View Transitions API ⭐ HIGH PRIORITY
**File:** `app/styles/components/page-transitions.css`
**Lines:** 7-45
```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.25s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Suspicion:** View Transitions API handles page transitions and might be interfering with Next.js's scroll restoration during the transition phase.

**Evidence:**
- Relatively new API
- Handles navigation transitions
- Could be capturing scroll state during transition
- May not restore scroll properly after animation

**Next Test:** Disable View Transitions API completely

---

### 2. Reveal Component Animations
**File:** `app/components/ui/Reveal.tsx`
**Lines:** 38-53 (Intersection Observer)

**Suspicion:** Reveal components on hero sections might trigger layout shifts on initial render

**Evidence:**
- Uses Intersection Observer
- Multiple Reveal components in hero sections (Story page has 3)
- Could cause layout calculations before scroll restoration completes

**Next Test:** Temporarily remove Reveal components from hero sections

---

### 3. Hero Section CSS Transforms
**File:** `app/globals.css`
**Lines:** 114-128
```css
.hero-content {
  transform: translateY(-16px);
}

@media (max-width: 400px) {
  .hero-content {
    transform: translateY(34px);
  }
}
```

**Suspicion:** Transform on hero content could affect scroll position calculation

**Evidence:**
- Applied to home page hero (line 97 of page.tsx)
- Transform shifts content position
- Might affect browser's scroll restoration calculation

**Next Test:** Remove hero-content transform temporarily

---

### 4. Body overflow-anchor: none
**File:** `app/globals.css`
**Line:** 93
```css
body {
  overflow-anchor: none;
}
```

**Suspicion:** Disables scroll anchoring which helps prevent scroll jumps

**Evidence:**
- Explicitly disables browser's scroll anchor behavior
- Meant to prevent jank during transitions
- Might be preventing proper scroll restoration

**Next Test:** Remove or comment out this rule

---

## Next.js Default Behavior

**Expected (App Router):**
- Next.js App Router (v13+) has built-in scroll restoration
- Should automatically scroll to top (position 0) on navigation
- No manual code needed
- Works via browser's Navigation API

**Our Setup:**
- Using Next.js 16 (App Router)
- No custom scroll restoration config in next.config.ts
- Should work automatically, but doesn't

---

## Browser Console Tests to Try

```javascript
// Test 1: Check current scroll position after navigation
console.log('Scroll position:', window.scrollY);

// Test 2: Check if manual scroll works
window.scrollTo(0, 0);

// Test 3: Check if View Transitions are active
console.log('View Transition:', document.startViewTransition);

// Test 4: Check body styles
console.log('Body overflow:', document.body.style.overflow);
console.log('Body position:', getComputedStyle(document.body).position);
```

---

## Files Modified During Debug

1. `app/components/layout/SiteHeader.tsx` - Multiple scroll attempts
2. `app/components/layout/TestHeader.tsx` - Created for testing
3. `app/layout.tsx` - Removed Webflow script, swapped headers
4. `app/globals.css` - Added/removed scroll-padding-top, scroll-behavior
5. `app/styles/components/page-transitions.css` - Removed scroll-behavior

---

## Commit History (Most Recent First)

1. `1b5093e` - Remove unused Webflow jQuery script
2. `4fa386c` - Add minimal TestHeader for debugging
3. `af0a7ff` - Fix scroll position when navigating from mobile drawer
4. `255e188` - Remove scroll-padding-top
5. `40a0a57` - Remove scroll behavior conflicts
6. `06acbad` - Fix scroll position offset on page navigation
7. `3dd4da5` - Make navbar sticky and standardize hero backgrounds
8. `69b8c90` - Update navbar and modal behavior
9. `689a9f6` - Fix menu modal layout and improve UX

---

## Questions to Answer

1. ❓ Does the issue happen on ALL page navigations or just some?
2. ❓ Does it happen when navigating FROM the home page?
3. ❓ Does it happen in different browsers?
4. ❓ Does clearing browser cache help?
5. ❓ What is the EXACT scroll position when page loads? (window.scrollY)

---

## Priority Test Queue

1. 🔴 **NEXT:** Disable View Transitions API
2. 🟡 Remove Reveal components from hero sections temporarily
3. 🟡 Remove hero-content transform
4. 🟡 Comment out `overflow-anchor: none`
5. 🟡 Test in different browser
6. 🟡 Check if issue exists in production build vs dev

---

## Notes

- Issue persists even with the most minimal setup possible
- Next.js should handle this automatically - something is blocking it
- Problem is likely in CSS or page transition handling, not JS
- Need to systematically disable features until we find the culprit
