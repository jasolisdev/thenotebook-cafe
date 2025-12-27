import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, userEvent } from '@/tests/utils/test-utils';

// Create the mock component before any imports
const MockNewsletterModal = vi.hoisted(() =>
  vi.fn(({ isOpen, source, onClose }: { isOpen: boolean; source?: string; onClose: () => void }) => (
    <div data-testid="newsletter-modal" data-open={isOpen ? 'true' : 'false'} data-source={source}>
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  ))
);

// Mock the NewsletterModal module
vi.mock('@/app/components/features/NewsletterModal', () => ({
  default: MockNewsletterModal,
}));

// Mock next/dynamic to just return the imported component
vi.mock('next/dynamic', () => ({
  default: (fn: () => Promise<{ default: React.ComponentType }>, _opts?: unknown) => {
    // For this test, we just return the mock directly
    return MockNewsletterModal;
  },
}));

import CommunityModalTrigger from '@/app/components/features/CommunityModalTrigger';

describe('CommunityModalTrigger', () => {
  test('opens and closes the newsletter modal', async () => {
    const user = userEvent.setup();
    render(
      <CommunityModalTrigger source="story-page">
        <button type="button">Join</button>
      </CommunityModalTrigger>
    );

    // Modal is not rendered until trigger is clicked
    expect(screen.queryByTestId('newsletter-modal')).not.toBeInTheDocument();

    // Click trigger to open modal
    await user.click(screen.getByRole('button', { name: 'Join' }));

    const modal = screen.getByTestId('newsletter-modal');
    expect(modal).toHaveAttribute('data-open', 'true');
    expect(modal).toHaveAttribute('data-source', 'story-page');

    // Click close button
    await user.click(screen.getByRole('button', { name: 'close' }));

    // Modal should be removed from DOM after close
    expect(screen.queryByTestId('newsletter-modal')).not.toBeInTheDocument();
  });
});
