/**
 * SEO Constants - Single source of truth for metadata
 *
 * Centralized SEO configuration for The Notebook Café website.
 * All metadata should reference these constants to ensure consistency.
 */

export const SEO = {
  // Core Site Info
  siteUrl: 'https://www.thenotebookcafellc.com',
  siteName: 'The Notebook Café',
  siteTagline: 'Coffee. Culture. House Music.',

  // Default Metadata
  defaultTitle: 'The Notebook Café | Coffee Shop in Riverside, CA',
  defaultDescription: 'Specialty coffee and community vibes in Riverside, CA. Visit The Notebook Café for espresso, matcha, cold brew, and signature pours.',

  // Location
  location: {
    city: 'Riverside',
    state: 'CA',
    fullLocation: 'Riverside, CA',
  },

  // Social/OG Images
  ogImage: '/og.png', // 1200x630 recommended
  twitterImage: '/og.png',

  // Social Handles
  social: {
    instagram: 'https://www.instagram.com/thenotebookcafellc/',
    // Add other social links as they become available
  },

  // Page-Specific Metadata
  pages: {
    home: {
      title: 'The Notebook Café | Coffee Shop in Riverside, CA',
      description: 'Specialty coffee and community vibes in Riverside, CA. Visit The Notebook Café for espresso, matcha, cold brew, and signature pours.',
      ogImage: '/og.png',
    },
    menu: {
      title: 'Menu | The Notebook Café, Riverside CA',
      description: 'Explore The Notebook Café menu in Riverside, CA. Espresso, cold brew, matcha, and seasonal favorites crafted daily.',
      ogImage: '/og-menu.png',
    },
    story: {
      title: 'Our Story | The Notebook Café, Riverside CA',
      description: 'Learn how The Notebook Café became Riverside\'s community hub for specialty coffee, creativity, and curated sound.',
      ogImage: '/og-story.png',
    },
    careers: {
      title: 'Careers',
      description: 'Join The Notebook Café team in Riverside, CA. We\'re looking for passionate people who love coffee and community.',
      ogImage: '/og.png',
    },
    contact: {
      title: 'Contact | The Notebook Café, Riverside CA',
      description: 'Visit The Notebook Café in Riverside, CA. Find hours, location, and contact information.',
      ogImage: '/og.png',
    },
  },
} as const;
