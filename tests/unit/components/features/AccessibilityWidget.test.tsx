import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@/tests/utils/test-utils';
import { AccessibilityWidget } from '@/app/components/features/Accessibility/AccessibilityWidget';

describe('AccessibilityWidget', () => {
  afterEach(() => {
    const html = document.documentElement;
    [
      'acc-text-md',
      'acc-text-lg',
      'acc-text-xl',
      'acc-grayscale',
      'acc-contrast',
      'acc-readable-font',
      'acc-hide-images',
      'acc-cursor-lg',
      'acc-highlight-links',
      'acc-dyslexia-font',
      'acc-reading-guide',
      'acc-stop-animations',
    ].forEach((cls) => html.classList.remove(cls));
    window.localStorage.clear();
    vi.useRealTimers();
  });

  test('opens and applies text size setting', async () => {
    window.localStorage.clear();

    const { userEvent } = await import('@/tests/utils/test-utils');
    const user = userEvent.setup();

    render(<AccessibilityWidget />);

    await user.click(screen.getByRole('button', { name: 'Accessibility Options' }));
    expect(screen.getByText('Accessibility Tools')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Text size large' }));

    await waitFor(() =>
      expect(document.documentElement.classList.contains('acc-text-lg')).toBe(true)
    );

    const saved = JSON.parse(window.localStorage.getItem('accessibility-settings') ?? '{}');
    expect(saved.textSize).toBe('large');
  });

  test('toggles reading guide line and tracks mouse position', async () => {
    const { userEvent } = await import('@/tests/utils/test-utils');
    const user = userEvent.setup();

    render(<AccessibilityWidget />);

    await user.click(screen.getByRole('button', { name: 'Accessibility Options' }));
    await user.click(screen.getByRole('button', { name: 'Reading Guide' }));

    const line = document.getElementById('reading-guide-line');
    expect(line).toBeInTheDocument();

    fireEvent.mouseMove(window, { clientY: 123 });
    expect(line?.style.top).toBe('123px');
  });
});
