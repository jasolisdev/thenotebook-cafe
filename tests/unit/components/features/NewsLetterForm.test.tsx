/**
 * Unit tests for NewsletterForm
 */

import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsletterForm from '@/app/components/features/NewsLetterForm';

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  document.head.querySelectorAll('style').forEach((node) => node.remove());
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('NewsletterForm', () => {
  test('submits email and shows success message', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(mockFetch).toHaveBeenCalled();

    expect(await screen.findByText("Thanks! You're subscribed.")).toBeInTheDocument();
  });

  test('shows duplicate message and keeps email', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, duplicate: true }),
    } as Response);

    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(
      await screen.findByText("You're already on the list — thank you!")
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  test('shows error message on API error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: 'Invalid email' }),
    } as Response);

    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });

  test('shows network error message', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'test@example.com' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(
      await screen.findByText('Could not subscribe right now. Please try again later.')
    ).toBeInTheDocument();
  });

  test('renders inline variant and uses join button', () => {
    render(<NewsletterForm inline source="footer" />);

    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument();
  });
});
