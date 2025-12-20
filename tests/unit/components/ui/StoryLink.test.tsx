import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@/tests/utils/test-utils';
import StoryLink from '@/app/components/ui/StoryLink';

describe('StoryLink', () => {
  test('renders link to story page', () => {
    render(<StoryLink />);

    const link = screen.getByRole('link', { name: /read our story/i });
    expect(link).toHaveAttribute('href', '/story');
  });
});
