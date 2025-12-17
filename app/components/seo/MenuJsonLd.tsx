/**
 * Menu JSON-LD Component
 *
 * Provides menu structured data for rich snippets in search results.
 * Helps with "menu near me" searches and displays menu items in Google Search.
 *
 * @component
 * @example
 * ```tsx
 * <MenuJsonLd sections={menuSections} />
 * ```
 */

import { SEO } from '@/lib/seo';

interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

interface MenuSection {
  name: string;
  items: MenuItem[];
}

interface MenuJsonLdProps {
  sections: MenuSection[];
}

export default function MenuJsonLd({ sections }: MenuJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SEO.siteUrl}/menu#menu`,
    inLanguage: 'en-US',
    hasMenuSection: sections.map(section => ({
      '@type': 'MenuSection',
      name: section.name,
      hasMenuItem: section.items.map(item => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        ...(item.price && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'USD',
          },
        }),
      })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
