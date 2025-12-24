import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@/tests/utils/test-utils';
import FAQJsonLd from '@/app/components/seo/FAQJsonLd';

describe('FAQJsonLd', () => {
  test('renders FAQPage schema', () => {
    const { container } = render(
      <FAQJsonLd
        items={[
          { question: 'Where are you located?', answer: 'Riverside, CA.' },
          { question: 'Do you have WiFi?', answer: 'Yes.' },
        ]}
      />
    );

    const script = container.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    expect(script).toBeTruthy();

    const json = JSON.parse(script?.textContent ?? '{}');

    expect(json['@type']).toBe('FAQPage');
    expect(json.mainEntity).toHaveLength(2);
    expect(json.mainEntity[0]).toEqual(
      expect.objectContaining({
        '@type': 'Question',
        name: 'Where are you located?',
        acceptedAnswer: expect.objectContaining({
          '@type': 'Answer',
          text: 'Riverside, CA.',
        }),
      })
    );
  });
});
