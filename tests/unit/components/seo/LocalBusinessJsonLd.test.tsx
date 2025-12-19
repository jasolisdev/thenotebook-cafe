import React from 'react';
import { describe, expect, test } from 'vitest';
import { render } from '@/tests/utils/test-utils';
import LocalBusinessJsonLd from '@/app/components/seo/LocalBusinessJsonLd';
import { BUSINESS_INFO } from '@/lib/business';
import { SEO } from '@/lib/seo';

describe('LocalBusinessJsonLd', () => {
  test('renders CafeOrCoffeeShop schema', () => {
    const { container } = render(<LocalBusinessJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    expect(script).toBeTruthy();

    const json = JSON.parse(script?.textContent ?? '{}');
    expect(json['@type']).toBe('CafeOrCoffeeShop');
    expect(json['@id']).toBe(`${BUSINESS_INFO.url}/#business`);
    expect(json.name).toBe(BUSINESS_INFO.name);
    expect(json.url).toBe(BUSINESS_INFO.url);
    expect(json.image).toBe(`${BUSINESS_INFO.url}${SEO.ogImage}`);
    expect(json.sameAs).toContain(BUSINESS_INFO.social.instagram);
    expect(json.geo).toEqual(
      expect.objectContaining({
        '@type': 'GeoCoordinates',
        latitude: BUSINESS_INFO.geo.latitude,
        longitude: BUSINESS_INFO.geo.longitude,
      })
    );
  });
});
