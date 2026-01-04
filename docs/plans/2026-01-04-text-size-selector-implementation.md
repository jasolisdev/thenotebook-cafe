# Text Size Selector Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a three-option text size selector (Normal/Large/XL) to the accessibility widget with Playwright tests.

**Architecture:** Segmented control UI component integrated into existing AccessibilityWidget. CSS classes on `<html>` element scale text within `<main>` content area only. State persisted to localStorage.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Playwright for E2E testing.

---

## Task 1: Add CSS Classes for Text Scaling

**Files:**
- Modify: `app/globals.css` (after line ~670, near other accessibility styles)

**Step 1: Add the text size CSS classes**

Add this CSS after the `.acc-stop-animations` rules (around line 690):

```css
/* Text Size Scaling - Main content only */
html.acc-text-lg main {
  font-size: 115%;
}

html.acc-text-lg main p,
html.acc-text-lg main li,
html.acc-text-lg main h1,
html.acc-text-lg main h2,
html.acc-text-lg main h3,
html.acc-text-lg main h4,
html.acc-text-lg main h5,
html.acc-text-lg main h6 {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

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

**Step 2: Verify CSS syntax**

Run: `npm run build`
Expected: Build succeeds with no CSS errors.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(accessibility): add text size scaling CSS classes

- acc-text-lg: 115% font size for main content
- acc-text-xl: 130% font size for main content
- Word wrap protection for larger text"
```

---

## Task 2: Update TypeScript Interface and Default Settings

**Files:**
- Modify: `app/components/features/Accessibility/AccessibilityWidget.tsx:20-44`

**Step 1: Add textSize to AccessibilitySettings interface**

Find the `AccessibilitySettings` interface (line ~20) and add:

```typescript
interface AccessibilitySettings {
  textSize: "normal" | "large" | "xl";  // ADD THIS LINE FIRST
  grayscale: boolean;
  highContrast: boolean;
  readableFont: boolean;
  hideImages: boolean;
  cursorSize: boolean;
  highlightLinks: boolean;
  dyslexiaFont: boolean;
  readingGuide: boolean;
  stopAnimations: boolean;
  bionicReading: boolean;
}
```

**Step 2: Add textSize to defaultSettings**

Find `defaultSettings` (line ~33) and add:

```typescript
const defaultSettings: AccessibilitySettings = {
  textSize: "normal",  // ADD THIS LINE FIRST
  grayscale: false,
  highContrast: false,
  readableFont: false,
  hideImages: false,
  cursorSize: false,
  highlightLinks: false,
  dyslexiaFont: false,
  readingGuide: false,
  stopAnimations: false,
  bionicReading: false,
};
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build`
Expected: Build succeeds (TypeScript will warn about unused field, that's OK for now).

**Step 4: Commit**

```bash
git add app/components/features/Accessibility/AccessibilityWidget.tsx
git commit -m "feat(accessibility): add textSize to settings interface

Three options: normal, large, xl
Default: normal"
```

---

## Task 3: Add TypeIcon Import and setTextSize Function

**Files:**
- Modify: `app/components/features/Accessibility/AccessibilityWidget.tsx:6-16` (imports)
- Modify: `app/components/features/Accessibility/AccessibilityWidget.tsx:258-264` (add function)

**Step 1: Add TypeIcon to imports**

Find the import block (line ~6) and add `TypeIcon`:

```typescript
import {
  XMarkIcon,
  TypeIcon,  // ADD THIS
  ContrastIcon,
  EyeIcon,
  ResetIcon,
  ChevronLeftIcon,
  MousePointerIcon,
  LinkIcon,
  RulerIcon,
  PauseIcon,
  BrainIcon,
} from "@/app/components/ui/AccessibilityIcons";
```

**Step 2: Add setTextSize function**

Find the `toggleSetting` function (around line 258) and add this function right after it:

```typescript
const setTextSize = (size: "normal" | "large" | "xl") => {
  setSettings((prev) => ({ ...prev, textSize: size }));
};
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
git add app/components/features/Accessibility/AccessibilityWidget.tsx
git commit -m "feat(accessibility): add TypeIcon import and setTextSize function"
```

---

## Task 4: Apply Text Size Class to HTML Element

**Files:**
- Modify: `app/components/features/Accessibility/AccessibilityWidget.tsx:137-159` (useEffect)

**Step 1: Add text size class application**

Find the `useEffect` that applies settings to document (around line 137). Add the text size logic at the start of the effect, right after `const html = document.documentElement;`:

```typescript
useEffect(() => {
  const html = document.documentElement;

  // Text Size (3 options: normal, large, xl)
  html.classList.remove("acc-text-lg", "acc-text-xl");
  if (settings.textSize === "large") html.classList.add("acc-text-lg");
  if (settings.textSize === "xl") html.classList.add("acc-text-xl");

  // Toggles (existing code continues below...)
  if (settings.grayscale) html.classList.add("acc-grayscale");
  // ... rest of existing toggles
}, [settings]);
```

**Step 2: Test manually in browser**

Run: `npm run dev`
- Open http://localhost:3000
- Open browser DevTools
- Add class `acc-text-lg` to `<html>` element manually
- Verify main content text gets larger
- Add class `acc-text-xl` instead
- Verify text gets even larger

**Step 3: Commit**

```bash
git add app/components/features/Accessibility/AccessibilityWidget.tsx
git commit -m "feat(accessibility): apply text size class to html element

Adds/removes acc-text-lg and acc-text-xl classes based on settings.textSize"
```

---

## Task 5: Build TextSizeSelector Component

**Files:**
- Modify: `app/components/features/Accessibility/AccessibilityWidget.tsx:347-360` (add UI component)

**Step 1: Add TextSizeSelector UI above Bionic Reading**

Find the toggles section (around line 347, after the `<p>` intro text). Add the Text Size control BEFORE the `<div className="space-y-3">` that contains the toggles:

```tsx
{/* Text Size Control */}
<div className="bg-white p-4 rounded-xl border border-cafe-tan/20 shadow-sm mb-4">
  <div className="flex items-center gap-2 mb-3 text-cafe-black font-bold">
    <TypeIcon className="w-5 h-5" />
    <span>Text Size</span>
  </div>
  <div className="flex rounded-lg border border-cafe-tan/20 overflow-hidden">
    <button
      onClick={() => setTextSize("normal")}
      aria-label="Text size normal"
      aria-pressed={settings.textSize === "normal"}
      className={`flex-1 py-3 text-sm font-bold transition-colors ${
        settings.textSize === "normal"
          ? "bg-cafe-tan/15 text-cafe-black"
          : "bg-white text-cafe-brown hover:bg-cafe-tan/5"
      }`}
    >
      Normal
    </button>
    <button
      onClick={() => setTextSize("large")}
      aria-label="Text size large"
      aria-pressed={settings.textSize === "large"}
      className={`flex-1 py-3 text-sm font-bold transition-colors border-x border-cafe-tan/20 ${
        settings.textSize === "large"
          ? "bg-cafe-tan/15 text-cafe-black"
          : "bg-white text-cafe-brown hover:bg-cafe-tan/5"
      }`}
    >
      Large
    </button>
    <button
      onClick={() => setTextSize("xl")}
      aria-label="Text size extra large"
      aria-pressed={settings.textSize === "xl"}
      className={`flex-1 py-3 text-sm font-bold transition-colors ${
        settings.textSize === "xl"
          ? "bg-cafe-tan/15 text-cafe-black"
          : "bg-white text-cafe-brown hover:bg-cafe-tan/5"
      }`}
    >
      XL
    </button>
  </div>
</div>

{/* Toggles */}
<div className="space-y-3">
```

**Step 2: Verify in browser**

Run: `npm run dev`
- Open accessibility widget
- Verify segmented control appears above Bionic Reading
- Click each option, verify visual active state changes
- Verify text size changes in main content

**Step 3: Commit**

```bash
git add app/components/features/Accessibility/AccessibilityWidget.tsx
git commit -m "feat(accessibility): add TextSizeSelector segmented control

Three-option selector: Normal, Large, XL
Positioned above Bionic Reading toggle
Full accessibility with aria-label and aria-pressed"
```

---

## Task 6: Update Accessibility Statement

**Files:**
- Modify: `app/components/features/Accessibility/AccessibilityWidget.tsx:433-436`

**Step 1: Update the features list in accessibility statement**

Find the `<ul>` in the statement view (around line 433) and update the first list item:

```tsx
<li>
  <strong>Text Options:</strong> Three text sizes (Normal, Large, XL) and dyslexia-friendly font.
</li>
```

**Step 2: Commit**

```bash
git add app/components/features/Accessibility/AccessibilityWidget.tsx
git commit -m "docs(accessibility): update statement with text size feature"
```

---

## Task 7: Write Playwright Tests

**Files:**
- Modify: `tests/e2e/accessibility.spec.ts`

**Step 1: Update existing tests for 3 options**

Replace the entire file content:

```typescript
import { expect, test } from '@playwright/test';

test.describe('Accessibility widget', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('text size defaults to normal with no class', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await expect(page.getByRole('heading', { name: 'Accessibility Tools' })).toBeVisible();
    await page.waitForTimeout(600);

    // Verify Normal is active by default
    const normalBtn = page.getByRole('button', { name: 'Text size normal' });
    await expect(normalBtn).toHaveAttribute('aria-pressed', 'true');

    // Verify no text size class on html
    await expect(page.locator('html')).not.toHaveClass(/acc-text-lg/);
    await expect(page.locator('html')).not.toHaveClass(/acc-text-xl/);
  });

  test('large text size applies acc-text-lg class', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    await page.getByRole('button', { name: 'Text size large' }).click({ force: true });

    await expect(page.locator('html')).toHaveClass(/acc-text-lg/);
    await expect(page.locator('html')).not.toHaveClass(/acc-text-xl/);

    const largeBtn = page.getByRole('button', { name: 'Text size large' });
    await expect(largeBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('xl text size applies acc-text-xl class', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    await page.getByRole('button', { name: 'Text size extra large' }).click({ force: true });

    await expect(page.locator('html')).toHaveClass(/acc-text-xl/);
    await expect(page.locator('html')).not.toHaveClass(/acc-text-lg/);

    const xlBtn = page.getByRole('button', { name: 'Text size extra large' });
    await expect(xlBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('text size persists after page reload', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    await page.getByRole('button', { name: 'Text size large' }).click({ force: true });
    await expect(page.locator('html')).toHaveClass(/acc-text-lg/);

    // Reload and verify persistence
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/acc-text-lg/);

    // Open widget and verify Large is still selected
    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    const largeBtn = page.getByRole('button', { name: 'Text size large' });
    await expect(largeBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('switching from xl to normal removes class', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    // Set to XL first
    await page.getByRole('button', { name: 'Text size extra large' }).click({ force: true });
    await expect(page.locator('html')).toHaveClass(/acc-text-xl/);

    // Switch back to Normal
    await page.getByRole('button', { name: 'Text size normal' }).click({ force: true });
    await expect(page.locator('html')).not.toHaveClass(/acc-text-lg/);
    await expect(page.locator('html')).not.toHaveClass(/acc-text-xl/);
  });

  test('widget shows all 3 text size options', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    await expect(page.getByRole('button', { name: 'Text size normal' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Text size large' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Text size extra large' })).toBeVisible();
  });
});

test.describe('Accessibility widget - mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 13

  test('text size selector is fully visible on mobile', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    // All three buttons should be visible
    await expect(page.getByRole('button', { name: 'Text size normal' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Text size large' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Text size extra large' })).toBeVisible();

    // Click XL and verify it works
    await page.getByRole('button', { name: 'Text size extra large' }).click({ force: true });
    await expect(page.locator('html')).toHaveClass(/acc-text-xl/);
  });

  test('no horizontal overflow with xl text on mobile', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await page.waitForTimeout(600);

    await page.getByRole('button', { name: 'Text size extra large' }).click({ force: true });

    // Close widget
    await page.getByRole('button', { name: 'Close accessibility panel' }).click({ force: true });
    await page.waitForTimeout(400);

    // Check for horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasOverflow).toBe(false);
  });
});
```

**Step 2: Run tests to verify they fail (feature not complete)**

Run: `npx playwright test tests/e2e/accessibility.spec.ts --headed`
Expected: Tests should pass if implementation is complete, or show specific failures.

**Step 3: Commit**

```bash
git add tests/e2e/accessibility.spec.ts
git commit -m "test(accessibility): add Playwright tests for text size selector

- Default state (normal, no class)
- Large size (acc-text-lg)
- XL size (acc-text-xl)
- Persistence after reload
- Mobile viewport tests
- Overflow check on mobile"
```

---

## Task 8: Run Full Test Suite and Fix Issues

**Step 1: Run all Playwright tests**

Run: `npx playwright test tests/e2e/accessibility.spec.ts`
Expected: All tests pass.

**Step 2: Run full E2E suite to check for regressions**

Run: `npx playwright test`
Expected: All tests pass.

**Step 3: Run build to ensure no type errors**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix(accessibility): address test feedback" # Only if needed
```

---

## Task 9: Visual Verification with Screenshots

**Step 1: Take desktop screenshots**

Run: `npm run dev`
Open browser at 1280px width and take screenshots:
1. Widget open, Normal selected
2. Widget open, Large selected
3. Widget open, XL selected
4. Home page with XL text (widget closed)

**Step 2: Take mobile screenshots**

Open browser at 390px width (iPhone 13) and take screenshots:
1. Widget open showing all 3 options
2. Home page with XL text

**Step 3: Verify visually**

- Segmented control looks balanced
- Active state is clearly visible
- Text scales appropriately
- No layout breaks on mobile

---

## Verification Checklist

- [ ] CSS classes added to globals.css
- [ ] TypeScript interface updated with textSize
- [ ] setTextSize function added
- [ ] Class applied to html element in useEffect
- [ ] TextSizeSelector UI renders above Bionic Reading
- [ ] All 3 options work (Normal, Large, XL)
- [ ] Settings persist to localStorage
- [ ] Playwright tests pass
- [ ] No horizontal overflow on mobile
- [ ] Build succeeds
- [ ] Visual review complete
