import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import RevealText from '@/app/components/ui/RevealText';

describe('RevealText', () => {
  test('renders children with delay and style', () => {
    render(
      <RevealText delay="200ms" style={{ marginBottom: '1rem' }}>
        <span>Headline</span>
      </RevealText>
    );

    const child = screen.getByText('Headline');
    const mask = child.parentElement?.parentElement;
    const anim = child.parentElement;

    expect(mask).toHaveClass('reveal-mask');
    expect(mask).toHaveStyle({ marginBottom: '1rem' });
    expect(anim).toHaveClass('reveal-text-anim');
    expect(anim).toHaveStyle({ animationDelay: '200ms' });
  });
});
