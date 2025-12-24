import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import HeroSection from '@/app/components/features/HeroSection';

describe('HeroSection', () => {
  test('renders hero headline and info', () => {
    render(<HeroSection />);

    expect(screen.getByText('Where Every Cup')).toBeInTheDocument();
    expect(screen.getByText('Tells A Story')).toBeInTheDocument();
    expect(screen.getByText(/specialty coffee in riverside/i)).toBeInTheDocument();
    expect(screen.getByText(/3512 9th st/i)).toBeInTheDocument();
    expect(screen.getByText(/mon - sat/i)).toBeInTheDocument();
  });
});
