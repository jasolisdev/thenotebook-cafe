/**
 * Business Information - Single Source of Truth
 *
 * Centralized business details for The Notebook Café.
 * Used across UI components and structured data (JSON-LD).
 */

function parseBusinessGeo(): null | { latitude: number; longitude: number } {
  const latRaw =
    process.env.NEXT_PUBLIC_BUSINESS_LAT ??
    process.env.NEXT_PUBLIC_BUSINESS_LATITUDE;
  const lngRaw =
    process.env.NEXT_PUBLIC_BUSINESS_LNG ??
    process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE;

  if (!latRaw || !lngRaw) return null;

  const latitude = Number.parseFloat(latRaw);
  const longitude = Number.parseFloat(lngRaw);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (latitude < -90 || latitude > 90) return null;
  if (longitude < -180 || longitude > 180) return null;

  return { latitude, longitude };
}

const DEFAULT_BUSINESS_GEO = {
  latitude: 33.979948713950655,
  longitude: -117.37309811729195,
};

const BUSINESS_GEO = parseBusinessGeo() ?? DEFAULT_BUSINESS_GEO;

export const BUSINESS_INFO = {
  // Core Identity
  name: 'The Notebook Café',
  legalName: 'The Notebook Café LLC',
  url: 'https://www.thenotebookcafellc.com',

  // Address (NAP - Name, Address, Phone)
  address: {
    street: '3512 9th St',
    city: 'Riverside',
    state: 'CA',
    zip: '92501',
    country: 'US',
  },

  // Contact
  phoneDisplay: '(951) 823-0004',
  phoneE164: '+19518230004',
  email: 'thenotebookcafellc@gmail.com',

  // Business Hours
  hours: {
    monSat: { opens: '07:00', closes: '18:00' },
    closedDays: ['Sunday'] as const,
  },

  // Google Maps
  maps: {
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Notebook+Cafe%2C+3512+9th+St%2C+Riverside%2C+CA+92501',
    embedUrl: 'https://www.google.com/maps?q=The+Notebook+Cafe%2C+3512+9th+St%2C+Riverside%2C+CA+92501&output=embed',
  },

  // Social Media
  social: {
    instagram: 'https://www.instagram.com/thenotebookcafellc/',
    tiktok: 'https://tiktok.com/@thenotebookcafe',
  },

  // Geo Coordinates - ONLY include when verified
  // To verify: Google Maps → right-click location → "What's here?"
  // Wrong coordinates hurt SEO more than missing coordinates
  geo: BUSINESS_GEO,

  // Business Details
  priceRange: '$$' as const,
  servesCuisine: 'Coffee' as const,
} as const;
