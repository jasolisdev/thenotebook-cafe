/**
 * Unit tests for NewsletterForm
 */

import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen, userEvent, waitFor } from '@/tests/utils/test-utils';
import NewsletterForm from '@/app/components/features/NewsLetterForm';
import { server } from '@/tests/utils/msw-setup';
import { HttpResponse, http } from 'msw';

describe('NewsletterForm', () => {
  test('renders default variant', () => {
    render(<NewsletterForm />);

    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  test('submits email with source and shows success message', async () => {
    let captured: any = null;
    server.use(
      http.post('/api/subscribe', async ({ request }) => {
        captured = await request.json();
        return HttpResponse.json({ ok: true }, { status: 200 });
      })
    );

    render(<NewsletterForm />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText("Thanks! You're subscribed.")).toBeInTheDocument();
    expect(captured).toEqual({ email: 'test@example.com', source: 'homepage' });
    expect(screen.getByPlaceholderText('your@email.com')).toHaveValue('');
  });

  test('disables button while submitting (default variant)', async () => {
    let resolveRequest: (() => void) | null = null;
    server.use(
      http.post('/api/subscribe', async () => {
        await new Promise<void>((resolve) => {
          resolveRequest = resolve;
        });
        return HttpResponse.json({ ok: true }, { status: 200 });
      })
    );

    render(<NewsletterForm />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com');

    const button = screen.getByRole('button', { name: /subscribe/i });
    await user.click(button);

    expect(screen.getByRole('button', { name: /subscribing/i })).toBeDisabled();

    resolveRequest?.();
    expect(await screen.findByText("Thanks! You're subscribed.")).toBeInTheDocument();
  });

  test('shows duplicate message and keeps email', async () => {
    server.use(
      http.post('/api/subscribe', () => {
        return HttpResponse.json({ ok: true, duplicate: true }, { status: 200 });
      })
    );

    render(<NewsletterForm />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText("You're already on the list — thank you!")).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  test('shows API error message', async () => {
    server.use(
      http.post('/api/subscribe', () => {
        return HttpResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
      })
    );

    render(<NewsletterForm />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });

  test('falls back to generic message when API provides no error', async () => {
    server.use(
      http.post('/api/subscribe', () => {
        return HttpResponse.json({ ok: false }, { status: 400 });
      })
    );

    render(<NewsletterForm />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText('Something went wrong.')).toBeInTheDocument();
  });

  test('shows network error message', async () => {
    server.use(
      http.post('/api/subscribe', () => {
        return HttpResponse.error();
      })
    );

    render(<NewsletterForm />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(
      await screen.findByText('Could not subscribe right now. Please try again later.')
    ).toBeInTheDocument();
  });

  test('renders inline variant and uses join button', () => {
    render(<NewsletterForm inline source="footer" />);

    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument();
  });

  test('inline variant updates border color on focus/blur', async () => {
    render(<NewsletterForm inline source="footer" />);

    const input = screen.getByPlaceholderText('Your email address') as HTMLInputElement;
    expect(input.style.borderColor).toBe('rgba(var(--coffee-100-rgb), 0.3)');

    const user = userEvent.setup();
    await user.click(input);
    expect(input.style.borderColor).toBe('rgba(var(--coffee-100-rgb), 0.6)');

    await user.click(document.body);
    await waitFor(() => {
      expect(input.style.borderColor).toBe('rgba(var(--coffee-100-rgb), 0.3)');
    });
  });

  test('inline variant shows loading state', async () => {
    let resolveRequest: (() => void) | null = null;
    server.use(
      http.post('/api/subscribe', async () => {
        await new Promise<void>((resolve) => {
          resolveRequest = resolve;
        });
        return HttpResponse.json({ ok: true }, { status: 200 });
      })
    );

    render(<NewsletterForm inline source="footer" />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Your email address'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Join' }));

    expect(screen.getByRole('button', { name: '...' })).toBeDisabled();

    resolveRequest?.();
    expect(await screen.findByText("Thanks! You're subscribed.")).toBeInTheDocument();
  });
});
