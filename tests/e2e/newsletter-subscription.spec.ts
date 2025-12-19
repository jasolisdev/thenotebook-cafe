import { expect, test } from '@playwright/test';

test.describe('Newsletter subscription', () => {
  test('subscribes from homepage', async ({ page }) => {
    await page.route('**/api/subscribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/');
    await page.getByPlaceholder('your@email.com').fill('test@example.com');
    await page.getByRole('button', { name: /subscribe/i }).click();

    await expect(page.getByText("Thanks! You're subscribed.")).toBeVisible();
  });

  test('shows duplicate message for existing subscriber', async ({ page }) => {
    await page.route('**/api/subscribe', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, duplicate: true }),
      });
    });

    await page.goto('/');
    await page.getByPlaceholder('your@email.com').fill('test@example.com');
    await page.getByRole('button', { name: /subscribe/i }).click();

    await expect(page.getByText("You're already on the list — thank you!")).toBeVisible();
    await expect(page.getByPlaceholder('your@email.com')).toHaveValue('test@example.com');
  });

  test('shows API error message', async ({ page }) => {
    await page.route('**/api/subscribe', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'Invalid email' }),
      });
    });

    await page.goto('/');
    await page.getByPlaceholder('your@email.com').fill('test@example.com');
    await page.getByRole('button', { name: /subscribe/i }).click();

    await expect(page.getByText('Invalid email')).toBeVisible();
  });
});

