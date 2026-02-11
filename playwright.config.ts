import { defineConfig, devices } from '@playwright/test';

const PLAYWRIGHT_HOST = process.env.PLAYWRIGHT_HOST ?? '127.0.0.1';
const PLAYWRIGHT_PORT = process.env.PLAYWRIGHT_PORT ?? '4017';
const DEFAULT_BASE_URL = `http://${PLAYWRIGHT_HOST}:${PLAYWRIGHT_PORT}`;
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? DEFAULT_BASE_URL;
const USE_WEB_SERVER = process.env.PLAYWRIGHT_BASE_URL == null;

/**
 * Playwright E2E Testing Configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    ...(process.env.PLAYWRIGHT_ALL === '1' || process.env.CI
      ? [
          {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
          },
          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
          },
          {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
          },
        ]
      : []),
  ],

  /* Run your local dev server before starting the tests */
  webServer: USE_WEB_SERVER
    ? {
        command: `npm run build && npm run start -- -H ${PLAYWRIGHT_HOST} -p ${PLAYWRIGHT_PORT}`,
        url: BASE_URL,
        reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === '1',
        timeout: 180 * 1000,
        env: {
          NEXT_DISABLE_TURBOPACK: '1',
        },
      }
    : undefined,
});
