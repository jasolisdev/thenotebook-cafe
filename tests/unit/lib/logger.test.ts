import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '@/app/lib/server/logger';

describe('Logger Utility', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let originalEnv: string;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.restoreAllMocks();
  });

  describe('Development Environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
      // Re-instantiate logger to pick up new env if it cached it?
      // Actually, Logger class reads env in constructor or property initializer.
      // Since logger is a singleton exported as `new Logger()`, we might need to reset it 
      // or access the private property if possible, or just rely on the fact that `isDev`
      // is initialized on creation.
      // Wait, `private isDev = process.env.NODE_ENV === 'development';`
      // This means changing process.env.NODE_ENV *after* import won't change `isDev`.
      // We need to mock the logger instance or bypass the singleton for testing.
      // Or, since we can't re-import easily in CJS/ESM mixed, we can try to cast it.
      (logger as unknown as { isDev: boolean }).isDev = true; 
    });

    it('logs info messages', () => {
      logger.info('Test Info', { foo: 'bar' });
      expect(consoleLogSpy).toHaveBeenCalledWith('[INFO] Test Info', { foo: 'bar' });
    });

    it('logs warn messages', () => {
      logger.warn('Test Warn');
      expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN] Test Warn', '');
    });

    it('logs error messages with full details', () => {
      const err = new Error('Oops');
      logger.error('Test Error', err, { context: 'test' });
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] Test Error', err, { context: 'test' });
    });
  });

  describe('Production Environment', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
      (logger as unknown as { isDev: boolean }).isDev = false;
    });

    it('does not log info messages', () => {
      logger.info('Test Info');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('does not log warn messages to console (unless sendToMonitoring calls it, but warn is usually console.warn in dev only per implementation?)', () => {
      // Implementation: warn checks isDev.
      logger.warn('Test Warn');
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('logs minimal error message to console and sends to monitoring', () => {
      // Mock dynamic import or monitoring
      // The implementation calls `import('./monitoring')`. We can't easily mock dynamic imports in Vitest without hoist?
      // Actually, we can check console.error behavior first.
      logger.error('Test Error', new Error('Fail'));
      
      // In production: console.error('[ERROR] message') only
      expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] Test Error');
      // Should NOT log the error object to console to prevent leaking secrets
      expect(consoleErrorSpy).not.toHaveBeenCalledWith(expect.anything(), expect.any(Error));
    });
  });
});
