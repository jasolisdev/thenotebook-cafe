import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/test'),
}));

import PageTransition from '@/app/components/layout/PageTransition';

describe('PageTransition', () => {
  test('renders children inside motion wrapper', () => {
    render(
      <PageTransition>
        <div>Page content</div>
      </PageTransition>
    );

    expect(screen.getByText('Page content')).toBeInTheDocument();
  });
});
