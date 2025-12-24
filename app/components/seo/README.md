# SEO Components

Structured data and schema markup components for search engine optimization.

## Overview

These components generate JSON-LD structured data that helps search engines understand the site content and display rich snippets in search results.

## Components

### LocalBusinessJsonLd.tsx

Local business schema markup for Google Maps and local search.

**Features:**
- Business name, address, phone
- Operating hours
- Service area (Riverside, CA)
- Price range
- Accepted payment methods
- Social media profiles

**Usage:**
```tsx
import { LocalBusinessJsonLd } from '@/app/components/seo/LocalBusinessJsonLd';

export default function Page() {
  return (
    <>
      <LocalBusinessJsonLd />
      {/* Page content */}
    </>
  );
}
```

**Benefits:**
- Appears in Google Maps
- Local search visibility
- Rich business card in SERPs

---

### FAQJsonLd.tsx

FAQ schema markup for frequently asked questions.

**Features:**
- Question/answer pairs
- Expandable FAQ snippets in search
- Structured FAQ data

**Usage:**
```tsx
import { FAQJsonLd } from '@/app/components/seo/FAQJsonLd';

const faqs = [
  {
    question: "What are your hours?",
    answer: "Mon-Fri: 7am-6pm, Sat-Sun: 8am-7pm"
  },
  // More FAQs...
];

export default function Page() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      {/* Page content */}
    </>
  );
}
```

**Benefits:**
- FAQ rich snippets in Google
- Increased SERP real estate
- Better click-through rates

---

### MenuJsonLd.tsx

Menu schema markup for food/beverage menus.

**Features:**
- Menu sections and items
- Item descriptions and prices
- Structured menu data

**Usage:**
```tsx
import { MenuJsonLd } from '@/app/components/seo/MenuJsonLd';

const menuItems = [
  {
    name: "Iced Brown Sugar Oat",
    description: "Espresso with brown sugar and oat milk",
    price: "5.50",
    section: "drinks"
  },
  // More items...
];

export default function Page() {
  return (
    <>
      <MenuJsonLd items={menuItems} />
      {/* Page content */}
    </>
  );
}
```

**Benefits:**
- Menu previews in search
- Attracts food/coffee searchers
- Better local discovery

## Implementation Notes

### Server-Side Only

All SEO components should be rendered server-side:
- Use in Server Components (default in Next.js App Router)
- Do NOT use `"use client"` directive
- No client-side JavaScript needed

### JSON-LD Format

Components output JSON-LD structured data:
```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...
  }
</script>
```

### Schema.org Types

We use these schema.org types:
- **LocalBusiness** - Business info
- **FAQPage** - FAQ section
- **Menu** - Food/beverage menu

## Testing Structured Data

### Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter page URL
3. Verify schema is valid

### Schema Markup Validator
1. Visit: https://validator.schema.org/
2. Paste page URL or HTML
3. Check for errors

## Best Practices

1. **One schema per page type** - Don't overload pages with too much structured data
2. **Keep data current** - Update hours, prices, menu items regularly
3. **Match page content** - Schema should reflect actual page content
4. **Test in production** - Structured data needs to be on live URLs
5. **Monitor in Search Console** - Track rich result performance

## References

- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Schema.org FAQPage](https://schema.org/FAQPage)
- [Schema.org Menu](https://schema.org/Menu)
- [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data)
