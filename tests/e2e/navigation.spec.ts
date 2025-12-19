import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('desktop nav links navigate between pages', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('Mobile'), 'Desktop nav only');
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    await page.locator('nav').getByRole('link', { name: 'Menu' }).first().click();
    await expect(page).toHaveURL(/\/menu$/);

    await page.locator('nav').getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('mobile drawer opens, navigates, and closes on ESC', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    const drawer = page.locator('.menu-drawer-cinematic.open');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Menu' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();

    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(drawer).toBeVisible();
    await drawer.getByRole('link', { name: 'Menu' }).click();
    await expect(page).toHaveURL(/\/menu$/);
  });
});
