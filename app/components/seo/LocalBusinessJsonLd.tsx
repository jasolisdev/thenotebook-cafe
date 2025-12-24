/**
 * LocalBusiness JSON-LD Component
 *
 * Provides structured data for local SEO.
 * Implements Schema.org CafeOrCoffeeShop type with complete business info.
 *
 * @component
 */
import { SEO } from '@/app/lib/constants/seo';
import { BUSINESS_INFO } from '@/app/lib/constants/business';

export default function LocalBusinessJsonLd() {
  const b = BUSINESS_INFO;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${b.url}/#business`,
    name: b.name,
    legalName: b.legalName,
    url: b.url,
    telephone: b.phoneE164,
    email: b.email,
    logo: `${b.url}/logo.png`,
    image: `${b.url}${SEO.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressRegion: b.address.state,
      postalCode: b.address.zip,
      addressCountry: b.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: b.hours.monSat.opens,
        closes: b.hours.monSat.closes,
      },
    ],
    hasMap: b.maps.directionsUrl,
    servesCuisine: b.servesCuisine,
    priceRange: b.priceRange,
    sameAs: [b.social.instagram],
  };

  // Only include geo if verified coordinates exist
  if (b.geo) {
    jsonLd.geo = {
      '@type': 'GeoCoordinates',
      latitude: b.geo.latitude,
      longitude: b.geo.longitude,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
