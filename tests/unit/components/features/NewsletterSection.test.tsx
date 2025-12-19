import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import NewsletterSection from '@/app/components/features/NewsletterSection';

vi.mock('@/app/components/features/NewsLetterForm', () => ({
  default: ({ source }: { source?: string }) => (
    <div data-testid="newsletter-form" data-source={source}>
      Form
    </div>
  ),
}));

describe('NewsletterSection', () => {
  test('renders headline and newsletter form', () => {
    render(<NewsletterSection />);

    expect(screen.getByText('The Story Continues.')).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-form')).toHaveAttribute('data-source', 'homepage');
    expect(screen.getByRole('link', { name: /thenotebookcafellc/i })).toHaveAttribute(
      'href',
      'https://instagram.com/thenotebookcafellc'
    );
  });
});
