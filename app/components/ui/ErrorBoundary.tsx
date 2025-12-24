"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { logger } from "@/app/lib";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary Component
 *
 * Catches React errors and prevents white screen crashes.
 * Displays a user-friendly error message and provides recovery options.
 *
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to monitoring service
    logger.error("React Error Boundary caught error", error, {
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div
          className="min-h-screen flex items-center justify-center px-6"
          style={{ backgroundColor: 'var(--color-cafe-mist)' }}
        >
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto"
                style={{ color: 'var(--color-cafe-tan)' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <h1
              className="font-serif text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--color-cafe-black)' }}
            >
              Oops! Something Went Wrong
            </h1>

            <p
              className="text-lg mb-8"
              style={{ color: 'var(--color-cafe-brown)' }}
            >
              We encountered an unexpected error. Don&apos;t worry—your coffee is safe. Try refreshing the page.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-cafe-tan)',
                  color: 'var(--color-cafe-white)',
                }}
              >
                Reload Page
              </button>

              <button
                onClick={this.handleReset}
                className="px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider border-2 transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: 'var(--color-cafe-tan)',
                  color: 'var(--color-cafe-tan)',
                  backgroundColor: 'transparent',
                }}
              >
                Try Again
              </button>
            </div>

            {/* Development Error Details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary
                  className="cursor-pointer text-sm font-semibold mb-2"
                  style={{ color: 'var(--color-cafe-brown)' }}
                >
                  Error Details (Development Only)
                </summary>
                <pre
                  className="text-xs p-4 rounded overflow-auto"
                  style={{
                    backgroundColor: 'var(--color-cafe-cream)',
                    color: 'var(--color-cafe-black)',
                  }}
                >
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
