/**
 * MSW (Mock Service Worker) Setup for Vitest
 *
 * Sets up API mocking for all tests.
 */

import { setupServer } from 'msw/node';
import { handlers } from './msw-handlers';
import { beforeAll, afterEach, afterAll } from 'vitest';

// Create mock server with default handlers
export const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => {
  server.close();
});
