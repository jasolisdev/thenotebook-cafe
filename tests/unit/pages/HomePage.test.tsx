import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen, within } from '@/tests/utils/test-utils';
import HomePage from '@/app/page';

describe('HomePage', () => {
  test('renders ritual sticky text block in Atmosphere Images section', () => {
    const { container } = render(<HomePage />);

    const atmosphereSection = container.querySelector(
      '[data-section="Atmosphere Images"]'
    );

    expect(atmosphereSection).toBeInTheDocument();

    const section = within(atmosphereSection as HTMLElement);

    const ritualLabel = section.getByText('The Ritual');
    expect(ritualLabel).toBeInTheDocument();
    expect(section.getByText(/Brewed for/i)).toBeInTheDocument();
    expect(section.getByText(/Connection/i)).toBeInTheDocument();
    expect(section.getByText(/Read Our Story/i)).toBeInTheDocument();

    const stickyColumn = ritualLabel.closest('div')?.parentElement;
    expect(stickyColumn).toBeTruthy();
    expect(stickyColumn).toHaveClass('lg:sticky');
    expect(stickyColumn).toHaveClass('lg:top-32');
  });
});
