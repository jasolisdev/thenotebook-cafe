import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import HeroButtons from '@/app/components/ui/HeroButtons';

describe('HeroButtons', () => {
  test('renders menu link', () => {
    render(<HeroButtons />);

    const link = screen.getByRole('link', { name: /explore our menu/i });
    expect(link).toHaveAttribute('href', '/menu');
  });
});
