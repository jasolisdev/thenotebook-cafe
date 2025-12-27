/**
 * SEO Constants - Single source of truth for metadata
 *
 * Centralized SEO configuration for The Notebook Café website.
 * All metadata should reference these constants to ensure consistency.
 */

export const SEO = {
  // Core Site Info
  siteUrl: "https://www.thenotebookcafellc.com",
  siteName: "The Notebook Café",
  siteTagline: "Coffee. Culture. House Music.",

  // Default Metadata
  defaultTitle: "The Notebook Café | Coffee Shop in Riverside, CA",
  defaultDescription:
    "Specialty coffee and community vibes in Riverside, CA. Visit The Notebook Café for espresso, matcha, cold brew, and signature pours. House music and creative energy await.", // 172 chars

  // Location
  location: {
    city: "Riverside",
    state: "CA",
    fullLocation: "Riverside, CA",
  },

  // Social/OG Images
  ogImage: "/og.png", // 1200x630 recommended
  twitterImage: "/og.png",

  // Social Handles
  social: {
    instagram: "https://www.instagram.com/thenotebookcafellc/",
    // Add other social links as they become available
  },

  // Page-Specific Metadata (all descriptions 150-220 chars)
  pages: {
    home: {
      title: "The Notebook Café | Coffee Shop in Riverside, CA",
      description:
        "Specialty coffee and community vibes in Riverside, CA. Visit The Notebook Café for espresso, matcha, cold brew, and signature pours. House music and creative energy await.", // 172 chars
      ogImage: "/og.png",
    },
    menu: {
      title: "Menu | The Notebook Café, Riverside CA",
      description:
        "Explore The Notebook Café menu in Riverside, CA. Espresso, cold brew, matcha, and seasonal favorites crafted daily. Discover our signature pours and house-made syrups.", // 169 chars
      ogImage: "/og-menu.png",
    },
    story: {
      title: "Our Story | The Notebook Café, Riverside CA",
      description:
        "Learn how The Notebook Café became Riverside's community hub for specialty coffee, creativity, and curated sound. Our journey from idea to your favorite local café.", // 166 chars
      ogImage: "/og-story.png",
    },
    careers: {
      title: "Careers | The Notebook Café, Riverside CA",
      description:
        "Join The Notebook Café team in Riverside, CA. We're looking for passionate people who love coffee, community, and creating memorable experiences. Apply today.", // 160 chars
      ogImage: "/og-careers.png",
    },
    contact: {
      title: "Contact | The Notebook Café, Riverside CA",
      description:
        "Visit The Notebook Café in Riverside, CA. Find our hours, location, and contact information. Drop by for specialty coffee, good vibes, and a welcoming atmosphere.", // 165 chars
      ogImage: "/og-contact.png",
    },
    privacy: {
      title: "Privacy Policy | The Notebook Café",
      description:
        "Privacy policy for The Notebook Café. Learn how we collect, use, and protect your personal information.",
      ogImage: "/og-privacy.png",
    },
    terms: {
      title: "Terms of Service | The Notebook Café",
      description:
        "Terms of Service for The Notebook Café. By using our website, you agree to these terms and conditions.",
      ogImage: "/og-terms.png",
    },
    refunds: {
      title: "Refund Policy | The Notebook Café",
      description:
        "Refund Policy for The Notebook Café. Details on returns, refunds, and exchanges for our products and services.",
      ogImage: "/og-refunds.png",
    },
  },
} as const;
