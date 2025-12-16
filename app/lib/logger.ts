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
      // Production: Send to error tracking
      // Example integrations:
      // - Sentry.captureException(error, { tags: { message }, extra: context });
      // - LogRocket.captureException(error);
      // - Vercel Analytics (automatic)

      // For now, just log the message (not the full error object)
      console.error(`[ERROR] ${message}`);
    }
  }

  /**
   * Send logs to external monitoring service
   * Override this method to integrate with your monitoring provider
   */
  private sendToMonitoring(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): void {
    // TODO: Integrate with Sentry, LogRocket, or other service
    // Example:
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureMessage(message, {
    //     level,
    //     extra: context,
    //   });
    // }
  }
}

export const logger = new Logger();
