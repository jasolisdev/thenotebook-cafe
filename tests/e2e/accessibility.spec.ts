import { expect, test } from '@playwright/test';

test.describe('Accessibility widget', () => {
  test('text size toggle updates html class', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await expect(page.getByRole('heading', { name: 'Accessibility Tools' })).toBeVisible();

    // Wait for drawer animation to complete
    await page.waitForTimeout(600);

    // Test Large text size
    await page.getByRole('button', { name: 'Text size large' }).click({ force: true });
    await expect(page.locator('html')).toHaveAttribute('class', /acc-text-lg/);

    // Test Normal text size (reset)
    await page.getByRole('button', { name: 'Text size normal' }).click({ force: true });
    await expect(page.locator('html')).not.toHaveAttribute('class', /acc-text-lg/);
  });

  test('widget shows only 2 text size options', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await expect(page.getByRole('heading', { name: 'Accessibility Tools' })).toBeVisible();

    // Wait for drawer animation to complete
    await page.waitForTimeout(600);

    // Verify only Normal and Large buttons exist (no XL)
    await expect(page.getByRole('button', { name: 'Text size normal' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Text size large' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Text size extra large' })).not.toBeVisible();
  });
});
