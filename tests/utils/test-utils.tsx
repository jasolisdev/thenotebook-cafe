/**
 * Custom Testing Utilities
 *
 * Provides custom render function with all necessary providers
 * and re-exports all Testing Library utilities.
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { CartProvider } from '@/app/components/providers/CartProvider';

/**
 * All the providers wrapper
 * Add any global providers your app needs here
 */
function AllProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}

/**
 * Custom render function that includes all providers
 *
 * @example
 * import { render, screen } from '@/tests/utils/test-utils';
 *
 * render(<MyComponent />);
 * expect(screen.getByText('Hello')).toBeInTheDocument();
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from Testing Library
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';

// Override render with custom version
export { customRender as render };
