/**
 * Error Monitoring Integration
 *
 * Provides integration points for error monitoring services like Sentry.
 * This file is ready to be activated once Sentry credentials are added.
 *
 * To enable Sentry:
 * 1. Install: npm install @sentry/nextjs
 * 2. Add to .env.local:
 *    NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
 *    SENTRY_AUTH_TOKEN=your_token_here
 * 3. Uncomment the initialization code below
 * 4. Run: npx @sentry/wizard@latest -i nextjs
 */

// Uncomment to enable Sentry integration:
// import * as Sentry from "@sentry/nextjs";

interface ErrorContext {
  [key: string]: unknown;
}

/**
 * Initialize error monitoring (call in app startup)
 */
export function initErrorMonitoring(): void {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Monitoring] Error monitoring disabled in development");
    return;
  }

  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!sentryDsn) {
    console.warn(
      "[Monitoring] NEXT_PUBLIC_SENTRY_DSN not set. Error monitoring disabled."
    );
    return;
  }

  // Uncomment to enable Sentry:
  /*
  Sentry.init({
    dsn: sentryDsn,
    environment: process.env.NODE_ENV,

    // Set sample rate (100% = capture all errors)
    tracesSampleRate: 1.0,

    // Set sampling rate for profiling (10% = capture 10% of transactions)
    profilesSampleRate: 0.1,

    // Filter out common noise
    ignoreErrors: [
      // Browser extensions
      /extensions\//i,
      /^Non-Error promise rejection/,

      // Network errors
      "NetworkError",
      "Failed to fetch",

      // Common user errors
      "ResizeObserver loop limit exceeded",
    ],

    beforeSend(event, hint) {
      // Don't send errors that contain sensitive data
      if (event.request?.url?.includes("/api/")) {
        // Remove sensitive headers
        if (event.request.headers) {
          delete event.request.headers["authorization"];
          delete event.request.headers["cookie"];
        }
      }
      return event;
    },
  });

  console.log("[Monitoring] Sentry initialized");
  */
}

/**
 * Capture an error to monitoring service
 */
export function captureError(
  error: Error | unknown,
  context?: ErrorContext
): void {
  void error;
  void context;
  if (process.env.NODE_ENV !== "production") {
    return; // Logger handles dev errors
  }

  // Uncomment to enable Sentry:
  /*
  if (error instanceof Error) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    Sentry.captureMessage(String(error), {
      level: "error",
      extra: context,
    });
  }
  */
}

/**
 * Capture a message to monitoring service
 */
export function captureMessage(
  message: string,
  level: "info" | "warning" | "error" = "info",
  context?: ErrorContext
): void {
  void message;
  void level;
  void context;
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Uncomment to enable Sentry:
  /*
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
  */
}

/**
 * Record a performance or business metric
 */
export function recordMetric(
  name: string,
  value: number,
  tags?: Record<string, string | number | boolean>
): void {
  void name;
  void value;
  void tags;
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Integrate with your metrics provider (e.g., DataDog, New Relic, Sentry).
  // Example with a hypothetical metrics client:
  /*
  metricsClient.record(name, value, {
    tags,
    timestamp: Date.now(),
  });
  */
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: {
  id?: string;
  email?: string;
  username?: string;
}): void {
  void user;
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Uncomment to enable Sentry:
  /*
  Sentry.setUser(user);
  */
}

/**
 * Clear user context
 */
export function clearUserContext(): void {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Uncomment to enable Sentry:
  /*
  Sentry.setUser(null);
  */
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: ErrorContext
): void {
  void message;
  void category;
  void data;
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  // Uncomment to enable Sentry:
  /*
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
    timestamp: Date.now() / 1000,
  });
  */
}
