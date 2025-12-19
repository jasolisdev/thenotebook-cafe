import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@/tests/utils/test-utils';
import HeroGallery from '@/app/components/features/HeroGallery';

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

describe('HeroGallery', () => {
  afterEach(() => {
    global.IntersectionObserver = originalObserver;
  });

  test('renders images and applies animation class', async () => {
    global.IntersectionObserver = MockIntersectionObserver as any;

    render(
      <HeroGallery
        images={[
          { src: '/img-1.jpg', alt: 'Coffee' },
          { src: '/img-2.jpg', alt: 'Latte' },
        ]}
      />
    );

    expect(screen.getByAltText('Coffee')).toBeInTheDocument();
    expect(screen.getByAltText('Latte')).toBeInTheDocument();

    await waitFor(() => {
      const cards = document.querySelectorAll('.image-card');
      expect(cards.length).toBe(2);
      cards.forEach((card) => {
        expect(card.classList.contains('gallery-spread-animate')).toBe(true);
      });
    });
  });
});
