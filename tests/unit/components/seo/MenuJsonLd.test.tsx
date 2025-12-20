import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@/tests/utils/test-utils';
import MenuJsonLd from '@/app/components/seo/MenuJsonLd';
import { SEO } from '@/lib/seo';

describe('MenuJsonLd', () => {
  test('renders menu sections and items, including offers when price is present', () => {
    const { container } = render(
      <MenuJsonLd
        sections={[
          {
            name: 'Drinks',
            items: [
              { name: 'Espresso', description: 'Straight shot', price: '3.50' },
              { name: 'Water', description: 'Still' },
            ],
          },
        ]}
      />
    );

    const script = container.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    expect(script).toBeTruthy();

    const json = JSON.parse(script?.textContent ?? '{}');

    expect(json['@type']).toBe('Menu');
    expect(json['@id']).toBe(`${SEO.siteUrl}/menu#menu`);
    expect(json.hasMenuSection).toHaveLength(1);
    expect(json.hasMenuSection[0].name).toBe('Drinks');
    expect(json.hasMenuSection[0].hasMenuItem).toHaveLength(2);

    const espresso = json.hasMenuSection[0].hasMenuItem[0];
    expect(espresso.offers).toEqual(
      expect.objectContaining({
        '@type': 'Offer',
        price: '3.50',
        priceCurrency: 'USD',
      })
    );

    const water = json.hasMenuSection[0].hasMenuItem[1];
    expect(water.offers).toBeUndefined();
  });
});
