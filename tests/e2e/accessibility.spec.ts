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
