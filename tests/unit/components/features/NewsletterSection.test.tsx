import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import NewsletterSection from '@/app/components/features/NewsletterSection';
import { BUSINESS_INFO } from '@/app/lib/constants/business';

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

    expect(screen.getByRole('heading', { name: /the story continues/i })).toBeInTheDocument();
    expect(screen.getByTestId('newsletter-form')).toHaveAttribute('data-source', 'homepage');
    expect(screen.getByRole('link', { name: /thenotebookcafellc/i })).toHaveAttribute(
      'href',
      BUSINESS_INFO.social.instagram
    );
  });
});
