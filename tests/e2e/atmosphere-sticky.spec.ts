import { test, expect } from '@playwright/test';

test('Atmosphere Images sticky ritual column stays pinned while scrolling', async ({ page }) => {
  await page.goto('/');

  const section = page.locator('[data-section="Atmosphere Images"]');
  await expect(section).toBeVisible();

  // Ensure the section is near the top before measuring.
  await section.scrollIntoViewIfNeeded();

  const ritualLabel = page.getByText('The Ritual', { exact: true });
  await expect(ritualLabel).toBeVisible();

  const stickyColumn = ritualLabel.locator('..').locator('..');
  await expect(stickyColumn).toBeVisible();

  const initialTop = await stickyColumn.evaluate((el) =>
    Math.round(el.getBoundingClientRect().top)
  );

  // Scroll the page further down while the section is still in view.
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(200);

  const afterTop = await stickyColumn.evaluate((el) =>
    Math.round(el.getBoundingClientRect().top)
  );

  // Sticky should keep the element near the same top position (allow small tolerance).
  expect(Math.abs(afterTop - initialTop)).toBeLessThanOrEqual(6);
});
