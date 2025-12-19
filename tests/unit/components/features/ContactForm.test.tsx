/**
 * Unit tests for ContactForm
 */

import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '@/app/components/features/ContactForm';

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ContactForm', () => {
  test('submits form and shows success state', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'General Inquiry' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello there!' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));

    expect(await screen.findByText('Message Sent!')).toBeInTheDocument();
  });

  test('shows error message when request fails', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false }),
    } as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'General Inquiry' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello there!' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });

  test('shows error message on network failure', async () => {
    mockFetch.mockRejectedValue(new Error('network error'));

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'General Inquiry' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello there!' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });

  test('allows reset after success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'General Inquiry' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello there!' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Message Sent!')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /send another/i }));

    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
