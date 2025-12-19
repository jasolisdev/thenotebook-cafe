/**
 * Unit tests for ContactForm
 */

import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen, userEvent, waitFor } from '@/tests/utils/test-utils';
import ContactForm from '@/app/components/features/ContactForm';
import { server } from '@/tests/utils/msw-setup';
import { HttpResponse, http } from 'msw';

describe('ContactForm', () => {
  test('renders required fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Subject')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  test('submits form and shows success state', async () => {
    let captured: any = null;
    server.use(
      http.post('/api/contact', async ({ request }) => {
        captured = await request.json();
        return HttpResponse.json({ ok: true }, { status: 200 });
      })
    );

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Subject'), 'General Inquiry');
    await user.type(screen.getByLabelText('Message'), 'Hello there!');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Message Sent!')).toBeInTheDocument();
    expect(captured).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'General Inquiry',
      message: 'Hello there!',
    });
  });

  test('shows error message when request fails', async () => {
    server.use(
      http.post('/api/contact', () => {
        return HttpResponse.json({ ok: false }, { status: 500 });
      })
    );

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Subject'), 'General Inquiry');
    await user.type(screen.getByLabelText('Message'), 'Hello there!');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ada@example.com')).toBeInTheDocument();
  });

  test('shows error message on network failure', async () => {
    server.use(
      http.post('/api/contact', () => {
        return HttpResponse.error();
      })
    );

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Subject'), 'General Inquiry');
    await user.type(screen.getByLabelText('Message'), 'Hello there!');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });

  test('disables submit while loading', async () => {
    let resolveRequest: (() => void) | null = null;
    server.use(
      http.post('/api/contact', async () => {
        await new Promise<void>((resolve) => {
          resolveRequest = resolve;
        });
        return HttpResponse.json({ ok: true }, { status: 200 });
      })
    );

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Subject'), 'General Inquiry');
    await user.type(screen.getByLabelText('Message'), 'Hello there!');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

    resolveRequest?.();
    expect(await screen.findByText('Message Sent!')).toBeInTheDocument();
  });

  test('shows error when response is not valid JSON', async () => {
    server.use(
      http.post('/api/contact', () => {
        return new HttpResponse('not-json', { status: 200 });
      })
    );

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Subject'), 'General Inquiry');
    await user.type(screen.getByLabelText('Message'), 'Hello there!');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(
      await screen.findByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument();
  });

  test('allows reset after success', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText('Subject'), 'General Inquiry');
    await user.type(screen.getByLabelText('Message'), 'Hello there!');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Message Sent!')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /send another/i }));

    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByLabelText('Name')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
    });
  });
});
