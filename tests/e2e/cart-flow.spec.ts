import { expect, test } from '@playwright/test';

// Cart flow tests are skipped until online ordering launches
test.describe.skip('Cart flow', () => {
  test('add item from menu and remove from cart', async ({ page }) => {
    await page.goto('/menu');

    await page.locator('.menu-tab-button', { hasText: /meals/i }).first().click();
    await page.getByRole('button', { name: 'View Plain Bagel details' }).first().click();

    await expect(page.getByRole('button', { name: /add to order/i })).toBeVisible();
    await page.getByRole('button', { name: /add to order/i }).click();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Shopping cart' }).click();
    const cart = page.getByTestId('cart-drawer');
    await expect(cart.getByText('Your Order')).toBeVisible();
    await expect(cart.getByText('Plain Bagel')).toBeVisible();

    await cart.getByText('Remove').click();
    await expect(cart.getByText('Your bag is empty')).toBeVisible();
  });
});
