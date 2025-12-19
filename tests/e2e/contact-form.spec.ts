import { expect, test } from '@playwright/test';

test.describe('Contact form', () => {
  test('submits successfully', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto('/contact');

    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email', { exact: true }).fill('john@example.com');
    await page.getByLabel('Subject').selectOption('General Inquiry');
    await page.getByLabel('Message').fill('Test message content');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText('Message Sent!')).toBeVisible();
  });

  test('validates required fields', async ({ page }) => {
    await page.goto('/contact');

    await page.getByRole('button', { name: /send message/i }).click();

    const name = page.getByLabel('Name');
    await expect(name).toBeVisible();
    await expect(name).toHaveJSProperty('validity.valid', false);
  });

  test('shows error on server failure', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false }),
      });
    });

    await page.goto('/contact');

    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email', { exact: true }).fill('john@example.com');
    await page.getByLabel('Subject').selectOption('General Inquiry');
    await page.getByLabel('Message').fill('Test message content');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText('Something went wrong. Please try again later.')).toBeVisible();
  });
});
