import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@/tests/utils/test-utils';
import ImagePreloader from '@/app/components/layout/ImagePreloader';

describe('ImagePreloader', () => {
  test('renders nothing and does not add preload links when list is empty', () => {
    const beforeCount = document.head.querySelectorAll('link[rel="preload"]').length;

    const { container } = render(<ImagePreloader />);

    const afterCount = document.head.querySelectorAll('link[rel="preload"]').length;
    expect(afterCount).toBe(beforeCount);
    expect(container.firstChild).toBeNull();
  });
});
