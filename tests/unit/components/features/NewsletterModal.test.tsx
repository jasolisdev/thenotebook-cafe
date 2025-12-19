/**
 * Unit tests for NewsletterModal
 */

import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, userEvent } from '@/tests/utils/test-utils';
import NewsletterModal from '@/app/components/features/NewsletterModal';
import { server } from '@/tests/utils/msw-setup';
import { HttpResponse, http } from 'msw';

describe('NewsletterModal', () => {
  test('renders nothing when closed', () => {
    render(<NewsletterModal isOpen={false} onClose={vi.fn()} />);

    expect(screen.queryByText(/join our/i)).not.toBeInTheDocument();
  });

  test('locks scroll while open and restores on unmount', () => {
    const onClose = vi.fn();
    const { unmount } = render(<NewsletterModal isOpen={true} onClose={onClose} />);

    expect(document.body.dataset.modalOpen).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.dataset.modalOpen).toBe('false');
  });

  test('closes on overlay click', async () => {
    const onClose = vi.fn();
    render(<NewsletterModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByTestId('newsletter-modal-overlay'));

    expect(onClose).toHaveBeenCalled();
  });

  test('does not close when clicking inside modal container', async () => {
    const onClose = vi.fn();
    render(<NewsletterModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByText(/we respect your privacy/i));

    expect(onClose).not.toHaveBeenCalled();
  });

  test('closes on Escape key', async () => {
    const onClose = vi.fn();
    render(<NewsletterModal isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(document, {
      key: 'Escape',
      code: 'Escape',
    });

    expect(onClose).toHaveBeenCalled();
  });

  test('passes source through to NewsletterForm submission', async () => {
    let captured: any = null;
    server.use(
      http.post('/api/subscribe', async ({ request }) => {
        captured = await request.json();
        return HttpResponse.json({ ok: true }, { status: 200 });
      })
    );

    render(<NewsletterModal isOpen={true} onClose={vi.fn()} source="newsletter-modal" />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText("Thanks! You're subscribed.")).toBeInTheDocument();
    expect(captured).toEqual({ email: 'test@example.com', source: 'newsletter-modal' });
  });
});
