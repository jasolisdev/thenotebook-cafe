import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen, userEvent } from '@/tests/utils/test-utils';
import NewsletterSubscribe from '@/app/components/ui/NewsletterSubscribe';

describe('NewsletterSubscribe', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('submits successfully and clears input', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<NewsletterSubscribe />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText('Enter your email');
    await user.type(input, 'hello@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/thanks/i);
    expect(input).toHaveValue('');
  });

  test('shows duplicate message when already subscribed', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ ok: true, duplicate: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<NewsletterSubscribe />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Enter your email'), 'hello@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/already subscribed/i);
  });

  test('shows error message on failure', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({ ok: false, error: 'nope' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<NewsletterSubscribe />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Enter your email'), 'hello@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/nope/i);
  });
});
