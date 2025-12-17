/**
 * LocalBusiness JSON-LD Component
 *
 * Provides structured data for local SEO.
 * Implements Schema.org CafeOrCoffeeShop type with complete business info.
 *
 * @component
 */
import { SEO } from '@/lib/seo';
import { BUSINESS_INFO } from '@/lib/business';

export default function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    description: SEO.defaultDescription,
    url: SEO.siteUrl,
    logo: `${SEO.siteUrl}/logo.png`,
    image: `${SEO.siteUrl}/logo.png`,
    telephone: BUSINESS_INFO.phoneRaw,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zip,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: BUSINESS_INFO.hours.schema,
    servesCuisine: BUSINESS_INFO.servesCuisine,
    priceRange: BUSINESS_INFO.priceRange,
    sameAs: [
      BUSINESS_INFO.social.instagram,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
