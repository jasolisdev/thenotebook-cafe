import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@/tests/utils/test-utils';

vi.mock('@/app/lib/virtualBaristaResponder', () => ({
  getLocalBaristaReply: vi.fn(),
}));

import VirtualBarista from '@/app/components/ui/VirtualBarista';
import { getLocalBaristaReply } from '@/app/lib/virtualBaristaResponder';

describe('VirtualBarista', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    document.body.dataset.modalOpen = 'false';
    document.body.dataset.cartOpen = 'false';
  });

  test('opens chat and sends a message', async () => {
    vi.mocked(getLocalBaristaReply).mockResolvedValue('Try our Honey Lavender Latte.');

    const { userEvent } = await import('@/tests/utils/test-utils');
    const user = userEvent.setup();

    render(<VirtualBarista />);

    await user.click(screen.getByRole('button', { name: 'Toggle virtual barista chat' }));
    expect(screen.getByText(/Need a recommendation/i)).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Ask about our coffee...'), 'Any recs?');
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByText('Any recs?')).toBeInTheDocument();

    expect(await screen.findByText('Try our Honey Lavender Latte.')).toBeInTheDocument();
  });

  test('does not render when a modal or cart is open', async () => {
    document.body.dataset.modalOpen = 'true';
    render(<VirtualBarista />);

    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: 'Toggle virtual barista chat' })
      ).not.toBeInTheDocument()
    );
  });
});
