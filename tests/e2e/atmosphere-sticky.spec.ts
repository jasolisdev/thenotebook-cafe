import { test, expect } from '@playwright/test';

test('Atmosphere Images sticky ritual column stays pinned while scrolling', async ({ page }) => {
  await page.goto('/');

  const section = page.locator('[data-section="Atmosphere Images"]');
  await expect(section).toBeVisible();

  // Ensure the section is near the top before measuring.
  await section.scrollIntoViewIfNeeded();

  const ritualLabel = page.getByText('The Atmosphere', { exact: true });
  await expect(ritualLabel).toBeVisible();

  const stickyColumn = ritualLabel.locator('..').locator('..');
  await expect(stickyColumn).toBeVisible();

  // Sticky layouts often switch off on mobile; don't assert pinned behavior there.
  if (test.info().project.use?.isMobile) {
    await page.evaluate(() => window.scrollBy(0, 300));
    await expect(stickyColumn).toBeVisible();
    return;
  }

  // Scroll enough to engage sticky behavior before measuring stability.
  await page.evaluate(() => window.scrollBy(0, 300));
  await expect.poll(async () => {
    const top = await stickyColumn.evaluate((el) =>
      Math.round(el.getBoundingClientRect().top)
    );
    return top >= 0 && top <= 200;
  }).toBeTruthy();

  const stuckTop = await stickyColumn.evaluate((el) =>
    Math.round(el.getBoundingClientRect().top)
  );

  // Scroll further; sticky should keep the element near the same top position.
  await page.evaluate(() => window.scrollBy(0, 300));

  await expect.poll(async () => {
    const afterTop = await stickyColumn.evaluate((el) =>
      Math.round(el.getBoundingClientRect().top)
    );
    return Math.abs(afterTop - stuckTop);
  }).toBeLessThanOrEqual(6);
});
