/**
 * Production-safe logging utility
 *
 * Replaces console.log/error calls with a service that:
 * - Only logs in development
 * - Can be connected to error tracking services (Sentry, LogRocket)
 * - Prevents sensitive data leaks in production
 *
 * @example
 * import { logger } from '@/app/lib/logger';
 *
 * try {
 *   // risky operation
 * } catch (err) {
 *   logger.error("Operation failed", err);
 * }
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development';

  /**
   * Log informational messages (development only)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.log(`[INFO] ${message}`, context || '');
    }
  }

  /**
   * Log warning messages (development only)
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.warn(`[WARN] ${message}`, context || '');
    }
    // In production, optionally send to monitoring service
    // this.sendToMonitoring('warn', message, context);
  }

  /**
   * Log error messages
   * Development: console.error
   * Production: Send to error tracking service
   */
  error(message: string, error?: unknown, context?: LogContext): void {
    if (this.isDev) {
      console.error(`[ERROR] ${message}`, error, context || '');
    } else {
      // Production: Log message only (not full error object)
      console.error(`[ERROR] ${message}`);

      // Send to monitoring service (Sentry/etc when configured)
      this.sendToMonitoring('error', message, { error, ...context });
    }
  }

  /**
   * Send logs to external monitoring service
   * Dynamically imports monitoring module to avoid circular dependencies
   */
  private sendToMonitoring(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    // Only send in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamically import monitoring module
    import('./monitoring')
      .then((monitoring) => {
        if (level === 'error' && context?.error instanceof Error) {
          monitoring.captureError(context.error, context);
        } else {
          const sentryLevel = level === 'warn' ? 'warning' : level;
          monitoring.captureMessage(message, sentryLevel, context);
        }
      })
      .catch(() => {
        // Silently fail if monitoring is not configured
      });
  }
}

export const logger = new Logger();
