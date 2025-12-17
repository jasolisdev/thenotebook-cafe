/**
 * LocalBusiness JSON-LD Component
 *
 * Provides structured data for local SEO.
 * Implements Schema.org CafeOrCoffeeShop type.
 *
 * @component
 */
import { SEO } from '@/lib/seo';

export default function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: SEO.siteName,
    description: SEO.defaultDescription,
    url: SEO.siteUrl,
    logo: `${SEO.siteUrl}/logo.png`,
    image: `${SEO.siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO.location.city,
      addressRegion: SEO.location.state,
      addressCountry: 'US',
    },
    servesCuisine: 'Coffee',
    priceRange: '$$',
    sameAs: [
      SEO.social.instagram,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
