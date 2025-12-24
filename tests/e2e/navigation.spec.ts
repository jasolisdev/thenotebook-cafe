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

    // Wait for hydration and stability
    await page.waitForTimeout(1000);
    const menuButton = page.getByRole('button', { name: 'Open menu' });
    await expect(menuButton).toBeVisible();
    await menuButton.click({ force: true });
    
    // Wait for state update - ensure click registered
    await expect(page.getByRole('button', { name: 'Close menu' }).first()).toBeVisible();

    const drawer = page.locator('.menu-drawer-cinematic');
    await expect(drawer).toHaveClass(/open/);
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Menu' })).toBeVisible();

    // Ensure animation completes and focus is captured
    await page.waitForTimeout(1000); 
    // Click somewhere safe on the drawer to ensure focus
    await drawer.click({ position: { x: 10, y: 10 } });
    await page.keyboard.press('Escape');
    await expect(drawer).not.toHaveClass(/open/);

    await page.getByRole('button', { name: 'Open menu' }).click({ force: true });
    await expect(drawer).toBeVisible();
    await drawer.getByRole('link', { name: 'Menu' }).click();
    await expect(page).toHaveURL(/\/menu$/);
  });
});
