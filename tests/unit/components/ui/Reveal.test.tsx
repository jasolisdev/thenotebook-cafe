import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@/tests/utils/test-utils';
import Reveal from '@/app/components/ui/Reveal';

const originalObserver = global.IntersectionObserver;

class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe(target: Element) {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as any);
  }
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

describe('Reveal', () => {
  afterEach(() => {
    global.IntersectionObserver = originalObserver;
  });

  test('applies visible class and delay when intersecting', async () => {
    global.IntersectionObserver = MockIntersectionObserver as any;

    render(
      <Reveal delay={150} className="custom-reveal">
        <span>Revealed</span>
      </Reveal>
    );

    const wrapper = screen.getByText('Revealed').parentElement;
    expect(wrapper).toHaveStyle({ transitionDelay: '150ms' });

    await waitFor(() => {
      expect(wrapper).toHaveClass('opacity-100');
      expect(wrapper).toHaveClass('translate-y-0');
      expect(wrapper).toHaveClass('custom-reveal');
    });
  });
});
