import { expect, test } from '@playwright/test';

test.describe('Accessibility widget', () => {
  test('text size toggle updates html class', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click({ force: true });
    await expect(page.getByRole('heading', { name: 'Accessibility Tools' })).toBeVisible();

    // Wait for drawer animation to complete
    await page.waitForTimeout(600);

    await page.getByRole('button', { name: 'Text size large' }).click({ force: true });

    await expect(page.locator('html')).toHaveAttribute('class', /acc-text-lg/);

    await page.getByRole('button', { name: 'Close accessibility panel' }).click();
    await expect(page.locator('.acc-widget-panel')).toHaveClass(/-translate-x-full/);
  });
});
