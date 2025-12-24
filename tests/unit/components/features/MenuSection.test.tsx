import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import MenuSection from '@/app/components/features/MenuSection';

describe('MenuSection', () => {
  test('renders featured items and menu link', () => {
    render(<MenuSection />);

    expect(screen.getByRole('heading', { name: /from our kitchen/i })).toBeInTheDocument();
    expect(screen.getByText('The Notebook Classic')).toBeInTheDocument();
    expect(screen.getByText('The Classic Chapter')).toBeInTheDocument();
    expect(screen.getByText('Matcha Croffle')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /cheddar bagel/i })).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /view full menu/i });
    expect(links[0]).toHaveAttribute('href', '/menu');
  });
});
