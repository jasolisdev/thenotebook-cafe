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
  
  // Location
  address: {
    street: '3512 9th St',
    city: 'Riverside',
    state: 'CA',
    zip: '92501',
    country: 'US',
    full: '3512 9th St, Riverside, CA 92501',
  },
  
  // Contact
  phone: '(951) 823-0004',
  phoneRaw: '+19518230004', // For tel: links and schema
  email: 'thenotebookcafellc@gmail.com',
  
  // Hours (OpeningHoursSpecification format)
  hours: {
    // Human-readable
    display: {
      weekday: 'Monday – Saturday: 7am — 6pm',
      weekend: 'Sunday: Closed',
    },
    // Schema.org format
    schema: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
  },
  
  // Geo Coordinates (for future use - get from Google Maps)
  geo: {
    latitude: 33.9806,  // Approximate - should verify
    longitude: -117.3755,
  },
  
  // Social Media
  social: {
    instagram: 'https://www.instagram.com/thenotebookcafellc/',
  },
  
  // Business Details
  priceRange: '$$',
  servesCuisine: 'Coffee',
  
} as const;
