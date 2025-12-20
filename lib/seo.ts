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
  defaultTitle: 'The Notebook Café | Riverside, CA',
  defaultDescription: 'A genuine coffee community hub in Riverside, California. Come for the coffee, stay for the vibe.',

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
      title: 'The Notebook Café | Riverside, CA',
      description: 'A genuine coffee community hub in Riverside, California. Come for the coffee, stay for the vibe.',
      ogImage: '/og.png',
    },
    menu: {
      title: 'Menu',
      description: 'Explore espresso, pour-overs, and seasonal specials at The Notebook Café in Riverside, CA.',
      ogImage: '/og-menu.png',
    },
    story: {
      title: 'Our Story',
      description: 'Built by locals, for locals—learn how The Notebook Café is creating a genuine Riverside coffee community hub.',
      ogImage: '/og-story.png',
    },
    careers: {
      title: 'Careers',
      description: 'Join The Notebook Café team in Riverside, CA. We\'re looking for passionate people who love coffee and community.',
      ogImage: '/og.png',
    },
    contact: {
      title: 'Contact',
      description: 'Get in touch with The Notebook Café in Riverside, CA. Hours, location info, and how to reach us.',
      ogImage: '/og.png',
    },
  },
} as const;
