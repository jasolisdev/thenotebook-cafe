import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, userEvent } from '@/tests/utils/test-utils';
import CommunityModalTrigger from '@/app/components/features/CommunityModalTrigger';

const modalProps: { isOpen: boolean; source?: string } = { isOpen: false };

vi.mock('@/app/components/features/NewsletterModal', () => ({
  default: ({ isOpen, source, onClose }: { isOpen: boolean; source?: string; onClose: () => void }) => {
    modalProps.isOpen = isOpen;
    modalProps.source = source;
    return (
      <div data-testid="newsletter-modal" data-open={isOpen ? 'true' : 'false'} data-source={source}>
        <button type="button" onClick={onClose}>
          close
        </button>
      </div>
    );
  },
}));

describe('CommunityModalTrigger', () => {
  test('opens and closes the newsletter modal', async () => {
    const user = userEvent.setup();
    render(
      <CommunityModalTrigger source="story-page">
        <button type="button">Join</button>
      </CommunityModalTrigger>
    );

    expect(screen.getByTestId('newsletter-modal')).toHaveAttribute('data-open', 'false');

    await user.click(screen.getByRole('button', { name: 'Join' }));
    expect(screen.getByTestId('newsletter-modal')).toHaveAttribute('data-open', 'true');
    expect(modalProps.source).toBe('story-page');

    await user.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.getByTestId('newsletter-modal')).toHaveAttribute('data-open', 'false');
  });
});
