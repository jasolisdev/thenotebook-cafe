/**
 * Business Information - Single Source of Truth
 *
 * Centralized business details for The Notebook Café.
 * Used across UI components and structured data (JSON-LD).
 */

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
  },

  // Geo Coordinates - ONLY include when verified
  // To verify: Google Maps → right-click location → "What's here?"
  // Wrong coordinates hurt SEO more than missing coordinates
  geo: null as null | { latitude: number; longitude: number },

  // Business Details
  priceRange: '$$' as const,
  servesCuisine: 'Coffee' as const,
} as const;
