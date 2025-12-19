import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import MenuSection from '@/app/components/features/MenuSection';

describe('MenuSection', () => {
  test('renders featured items and menu link', () => {
    render(<MenuSection />);

    expect(screen.getByText('Featured Items')).toBeInTheDocument();
    expect(screen.getByText('The Notebook Classic')).toBeInTheDocument();
    expect(screen.getByText('The Classic Chapter')).toBeInTheDocument();
    expect(screen.getByText('Matcha Croffle')).toBeInTheDocument();
    expect(screen.getByText('Oreo Cheesecake')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /cheddar bagel/i })).toBeInTheDocument();
    expect(screen.getByText('The Trilogy Croffle')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /view our full menu/i });
    expect(link).toHaveAttribute('href', '/menu');
  });
});
