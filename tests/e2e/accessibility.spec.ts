import { expect, test } from '@playwright/test';

test.describe('Accessibility widget', () => {
  test('text size toggle updates html class', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Accessibility Options' }).click();
    await expect(page.getByRole('heading', { name: 'Accessibility Tools' })).toBeVisible();

    await page.getByRole('button', { name: 'Text size large' }).click();
    await expect(page.locator('html')).toHaveClass(/acc-text-lg/);

    await page.getByRole('button', { name: 'Close accessibility panel' }).click();
    await expect(page.locator('div.fixed.inset-y-0.left-0.z-\\[110\\]')).toHaveClass(
      /-translate-x-full/
    );
  });
});
