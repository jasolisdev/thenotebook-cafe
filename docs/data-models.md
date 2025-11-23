# Data Models Documentation
**The Notebook Café - Sanity CMS Schema Reference**

Generated: 2025-11-23
Total Schemas: 7
CMS: Sanity v4.11

---

## Overview

The Notebook Café uses Sanity CMS as its headless content management system and data layer. There is no traditional database (PostgreSQL, MongoDB, etc.). All dynamic content is stored in Sanity's Content Lake and accessed via the Sanity API.

**Schema Location:** `sanity/schemaTypes/`

**Schema Definition:** All schemas use Sanity's `defineType` and `defineField` utilities for type-safe schema definitions.

---

## Table of Contents

1. [homePage](#1-homepage-schema)
2. [aboutPage](#2-aboutpage-schema)
3. [menuItem](#3-menuitem-schema)
4. [subscriber](#4-subscriber-schema)
5. [settings](#5-settings-schema)
6. [post](#6-post-schema)
7. [Schema Index](#7-schema-index)

---

## 1. homePage Schema

**File:** `sanity/schemaTypes/homePage.ts`

**Purpose:** Content structure for the homepage (Hero, highlights, mission)

**Schema Type:** `document` (singleton - only one instance)

### Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `heroHeadline` | `string` | ✅ Yes | Main headline (e.g., "The Notebook Café") |
| `heroTagline` | `string` | No | Subheadline under hero (e.g., "Coffee. Culture. House Music.") |
| `statusLine` | `string` | No | Status text (e.g., "☕ Coming Soon ☕") |
| `ctaText` | `string` | No | Call-to-action button text (e.g., "Follow us on Instagram") |
| `ctaUrl` | `url` | No | CTA button destination URL |
| `whatToExpectBullets` | `array` of `string` | No | Array of highlight bullet points |
| `vibeCopy` | `text` | No | Mission paragraph (3-5 sentences) |
| `heroImage` | `image` | No | Hero background image (future use, not yet implemented) |

### Field Details

**heroHeadline:**
- Main heading displayed in hero section
- Currently hidden on frontend (logo shown instead)
- Required for Sanity Studio completeness

**whatToExpectBullets:**
- Array of strings (typically 3 items)
- Example values:
  - "Specialty espresso, roasted right"
  - "House music energy, daytime into night"
  - "Stay, study, create — Riverside"

**vibeCopy:**
- Text area (3 rows in Studio)
- Mission/vibe paragraph
- Appears below bullet points

**heroImage:**
- Sanity image type with hotspot support
- Not currently rendered on frontend
- Reserved for future feature

### Usage Example

**Fetch in Next.js:**
```typescript
import { client } from '@/sanity/lib/client';

const homePageData = await client.fetch(`
  *[_type == "homePage"][0]{
    heroHeadline,
    heroTagline,
    statusLine,
    ctaText,
    ctaUrl,
    whatToExpectBullets,
    vibeCopy
  }
`);
```

**Example Data:**
```json
{
  "heroHeadline": "The Notebook Café",
  "heroTagline": "Where Every Sip Tells a Story",
  "whatToExpectBullets": [
    "Premium specialty coffee",
    "House music vibes",
    "Creative community space"
  ],
  "vibeCopy": "The Notebook Café is Riverside's home for coffee culture, house music, and creative community. Stay, create, and connect.",
  "ctaText": "Follow Our Journey",
  "ctaUrl": "https://instagram.com/notebookcafe"
}
```

---

## 2. aboutPage Schema

**File:** `sanity/schemaTypes/aboutPage.ts`

**Purpose:** Content structure for the About/Story page

**Schema Type:** `document` (singleton)

### Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | `string` | ✅ Yes | Page title/heading (e.g., "Our Story") |
| `body` | `array` (portable text) | No | Main story/intro content with rich text |
| `valuesHeading` | `string` | No | Heading for values section (default: "What we're building") |
| `valuesBullets` | `array` of `string` | No | Array of value statements |
| `missionHeading` | `string` | No | Heading for mission card (default: "Why we're doing this") |
| `founderNote` | `text` | No | Founder's message (5 rows in Studio) |

### Field Details

**body (Portable Text):**
- Rich text content with multiple block types:
  - **Block styles:** Normal, Heading (h3), Quote (blockquote)
  - **Lists:** Bullet lists
  - **Images:** Inline images with hotspot support
- Used for main story narrative

**valuesBullets:**
- Array of strings (typically 4 items)
- Example values:
  - "A café that plays house, soul, and groove — not top 40 radio."
  - "A space you can actually sit in. Stay, settle, think, create."
  - "Coffee treated with respect — from beans to texture."
  - "A Riverside original — for locals and creatives alike."

**founderNote:**
- Appears in bordered card
- Direct message from founder
- Supports line breaks

### Usage Example

**Fetch in Next.js:**
```typescript
import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';

const aboutPageData = await client.fetch(`
  *[_type == "aboutPage"][0]{
    title,
    body,
    valuesHeading,
    valuesBullets,
    missionHeading,
    founderNote
  }
`);

// Render portable text
<PortableText value={aboutPageData.body} />
```

---

## 3. menuItem Schema

**File:** `sanity/schemaTypes/menuItem.ts`

**Purpose:** Menu items (drinks, meals, desserts)

**Schema Type:** `document` (multiple instances)

**Current Status:** Schema defined, but menu is hardcoded in `MenuContent.tsx`. Future integration planned.

### Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | `string` | ✅ Yes | Item name (e.g., "Cappuccino") |
| `description` | `text` | No | Flavor notes, description |
| `price` | `string` | No | Price as string (e.g., "5.50") |
| `section` | `string` | ✅ Yes | Menu section: "drinks", "meals", or "desserts" |
| `category` | `string` | No | Category within section (espresso, latte, cold-brew, etc.) |
| `image` | `image` | No | Item photo (if no image, category icon used) |
| `sortOrder` | `number` | No | Display order (lower = first, default: 100) |
| `isFeatured` | `boolean` | No | Show on homepage highlights (default: false) |

### Field Details

**section (Required):**
- Options (radio buttons):
  - "Drinks" (`drinks`)
  - "Meals" (`meals`)
  - "Desserts" (`desserts`)

**category:**
- Options (radio buttons):
  - "Espresso" (`espresso`)
  - "Latte / Signature" (`latte`)
  - "Cold Brew" (`cold-brew`)
  - "Tea / Matcha" (`tea`)
  - "Pastry / Food" (`food`)
  - "Seasonal / Limited" (`seasonal`)

**image:**
- Hotspot support for focal point selection
- Recommended: Square images, 200x200px or larger
- Fallback: Category icon if no image uploaded

**sortOrder:**
- Integer (min: 0)
- Used to control display order within section
- Lower numbers appear first

### Usage Example

**Fetch menu items:**
```typescript
const menuItems = await client.fetch(`
  *[_type == "menuItem"] | order(sortOrder asc) {
    name,
    description,
    price,
    section,
    category,
    "imageUrl": image.asset->url,
    sortOrder,
    isFeatured
  }
`);

// Filter by section
const drinks = menuItems.filter(item => item.section === 'drinks');
```

**Example Data:**
```json
{
  "name": "Cappuccino",
  "description": "Espresso with velvety steamed milk and thick foam.",
  "price": "4.50",
  "section": "drinks",
  "category": "espresso",
  "imageUrl": "https://cdn.sanity.io/images/...",
  "sortOrder": 2,
  "isFeatured": true
}
```

---

## 4. subscriber Schema

**File:** `sanity/schemaTypes/subscriber.ts`

**Purpose:** Newsletter subscriber tracking

**Schema Type:** `document` (multiple instances)

**Created By:** `/api/subscribe` endpoint

### Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `email` | `string` | ✅ Yes | Subscriber email (validated with regex) |
| `source` | `string` | No | Source page (homepage, footer, etc.) |
| `status` | `string` | No | Subscription status (default: "subscribed") |
| `createdAt` | `datetime` | No | Timestamp (auto-set to current time) |

### Field Details

**email:**
- Validated with regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Required field
- Case-insensitive duplicate detection in API

**source:**
- String identifier for tracking
- Common values: "homepage", "footer", "menu", "story"
- Set by frontend when calling `/api/subscribe`

**status:**
- Options (radio buttons):
  - "Subscribed" (`subscribed`) - Default
  - "Pending" (`pending`)
  - "Unsubscribed" (`unsubscribed`)
- Initial value: `subscribed`

**createdAt:**
- ISO 8601 datetime
- Auto-populated on creation
- Example: `"2025-11-23T00:00:00.000Z"`

### Preview Configuration

**Studio List View:**
- **Title:** Email address
- **Subtitle:** Status

### Usage Example

**Created via API:**
```typescript
// POST /api/subscribe creates this document
const doc = await writeClient.create({
  _type: "subscriber",
  email: "user@example.com",
  source: "homepage",
  status: "subscribed",
  createdAt: new Date().toISOString(),
});
```

**Query subscribers:**
```typescript
// Get all subscribers
const subscribers = await client.fetch(`
  *[_type == "subscriber" && status == "subscribed"] | order(createdAt desc) {
    email,
    source,
    status,
    createdAt
  }
`);

// Check for duplicate (case-insensitive)
const existing = await client.fetch(`
  *[_type == "subscriber" && lower(email) == lower($email)][0]{_id}
`, { email });
```

---

## 5. settings Schema

**File:** `sanity/schemaTypes/settings.ts`

**Purpose:** Global site settings and configuration

**Schema Type:** `document` (singleton)

### Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `businessName` | `string` | No | Business name (default: "The Notebook Café") |
| `address` | `string` | No | Street address, city, state |
| `phone` | `string` | No | Contact phone number |
| `email` | `string` | No | Contact email address |
| `hours` | `object` | No | Business hours (weekday, weekend) |
| `social` | `object` | No | Social media links (instagram, tiktok, spotify) |
| `announcementBanner` | `object` | No | Announcement banner config |
| `seo` | `object` | No | Default SEO metadata |

### Nested Field Structures

**hours (Object):**
```typescript
{
  weekday: string;  // "Mon–Fri" hours (e.g., "7am – 9pm")
  weekend: string;  // "Sat–Sun" hours (e.g., "8am – Late")
}
```

**social (Object):**
```typescript
{
  instagram: url;   // Instagram profile URL
  tiktok: url;      // TikTok profile URL
  spotify: url;     // Spotify playlist URL
}
```

**announcementBanner (Object):**
```typescript
{
  isActive: boolean;  // Show/hide banner (default: false)
  text: string;       // Banner message (e.g., "Soft Opening Soon")
}
```

**seo (Object):**
```typescript
{
  metaTitle: string;           // Default meta title
  metaDescription: text;       // Default meta description
  openGraphImage: image;       // Social share image (with hotspot)
}
```

### Usage Example

**Fetch settings:**
```typescript
const settings = await client.fetch(`
  *[_type == "settings"][0]{
    businessName,
    address,
    phone,
    email,
    hours,
    social,
    announcementBanner,
    seo{
      metaTitle,
      metaDescription,
      "ogImageUrl": openGraphImage.asset->url
    }
  }
`);
```

**Example Data:**
```json
{
  "businessName": "The Notebook Café",
  "address": "123 Main St, Riverside, CA",
  "phone": "(951) 555-0100",
  "email": "hello@notebookcafe.com",
  "hours": {
    "weekday": "7am – 9pm",
    "weekend": "8am – Late"
  },
  "social": {
    "instagram": "https://instagram.com/notebookcafe",
    "spotify": "https://open.spotify.com/playlist/..."
  },
  "announcementBanner": {
    "isActive": true,
    "text": "Grand Opening 2026"
  }
}
```

---

## 6. post Schema

**File:** `sanity/schemaTypes/post.ts`

**Purpose:** Blog posts and updates

**Schema Type:** `document` (multiple instances)

**Current Status:** Defined for future use. Not yet implemented in frontend.

### Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | `string` | ✅ Yes | Post title |
| `slug` | `slug` | ✅ Yes | URL-friendly slug (auto-generated from title) |
| `coverImage` | `image` | No | Cover/featured image (with hotspot) |
| `publishedAt` | `datetime` | No | Publish date (default: current time) |
| `body` | `array` (portable text) | No | Post content (rich text + images) |
| `tags` | `array` of `string` | No | Post tags for categorization |

### Field Details

**slug:**
- Auto-generated from `title`
- Max length: 96 characters
- Used for URL: `/blog/[slug]`
- Required for publishing

**body (Portable Text):**
- Supports:
  - **Blocks:** Regular paragraphs
  - **Images:** Inline images with hotspot

**tags:**
- Array of strings
- Example values: "event", "menu", "hiring", "soft-opening"
- Used for filtering and categorization

### Usage Example

**Fetch posts:**
```typescript
const posts = await client.fetch(`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    publishedAt,
    body,
    tags
  }
`);
```

**Fetch single post by slug:**
```typescript
const post = await client.fetch(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    publishedAt,
    body,
    tags
  }
`, { slug: 'my-post-slug' });
```

**Future Frontend Route:**
- `app/blog/page.tsx` - Blog index/listing
- `app/blog/[slug]/page.tsx` - Individual post page

---

## 7. Schema Index

**File:** `sanity/schemaTypes/index.ts`

**Purpose:** Central schema registry for Sanity Studio

**Contents:**
```typescript
import homePage from './homePage';
import aboutPage from './aboutPage';
import menuItem from './menuItem';
import subscriber from './subscriber';
import settings from './settings';
import post from './post';

export const schemaTypes = [
  homePage,
  aboutPage,
  menuItem,
  subscriber,
  settings,
  post
];
```

**Imported By:** `sanity/sanity.config.ts`

---

## Schema Patterns & Conventions

### Singleton vs Multiple Documents

**Singleton Schemas (Only one instance):**
- `homePage`
- `aboutPage`
- `settings`

**Multiple Document Schemas:**
- `menuItem`
- `subscriber`
- `post`

### Portable Text Usage

**Schemas Using Portable Text:**
- `aboutPage.body` - Rich text with images
- `post.body` - Rich text with images

**Benefits:**
- Structured content (not just plain text)
- Inline images
- Formatted paragraphs, headings, quotes
- Lists (bullet, numbered)

### Image Handling

**All image fields use:**
- `type: "image"`
- `options: { hotspot: true }` - Focal point selection

**Image URLs (via GROQ):**
```groq
"imageUrl": image.asset->url
```

**Using Sanity Image URL Builder:**
```typescript
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

// Usage
<Image
  src={urlFor(item.image).width(400).height(400).url()}
  alt={item.name}
  width={400}
  height={400}
/>
```

---

## Querying Data (GROQ)

### Basic Queries

**Fetch all of a type:**
```groq
*[_type == "menuItem"]
```

**Fetch single document (singleton):**
```groq
*[_type == "homePage"][0]
```

**Fetch with ordering:**
```groq
*[_type == "post"] | order(publishedAt desc)
```

**Fetch with filtering:**
```groq
*[_type == "menuItem" && section == "drinks"]
```

### Projection (Select Fields)

**Basic projection:**
```groq
*[_type == "menuItem"]{
  name,
  price,
  section
}
```

**Image references:**
```groq
*[_type == "menuItem"]{
  name,
  "imageUrl": image.asset->url
}
```

**Nested objects:**
```groq
*[_type == "settings"][0]{
  hours{
    weekday,
    weekend
  },
  social{
    instagram,
    spotify
  }
}
```

---

## Data Access Clients

### Read Client (CDN)

**File:** `sanity/lib/client.ts`

**Purpose:** Public data fetching (used in Server Components)

**Configuration:**
- CDN-enabled for fast access
- Read-only access
- No authentication required
- Global availability

**Usage:**
```typescript
import { client } from '@/sanity/lib/client';

const data = await client.fetch(query, params);
```

### Write Client (Authenticated)

**File:** `sanity/lib/writeClient.ts`

**Purpose:** Data mutations (used in API routes)

**Configuration:**
- Authenticated with `SANITY_WRITE_TOKEN`
- Server-side only (never exposed to client)
- Used for creating/updating/deleting documents

**Usage:**
```typescript
import { writeClient } from '@/sanity/lib/writeClient';

// Create document
const doc = await writeClient.create({
  _type: 'subscriber',
  email: 'user@example.com'
});

// Update document
await writeClient.patch(docId).set({ status: 'unsubscribed' }).commit();
```

---

## Migration & Data Integrity

### Adding New Fields

1. Add field to schema in `sanity/schemaTypes/[schema].ts`
2. Deploy Sanity Studio (automatic on save)
3. Update frontend queries to include new field
4. Test in Sanity Studio

### Renaming Fields

**Safe approach:**
1. Add new field
2. Migrate data (Sanity CLI or manual)
3. Update frontend to use new field
4. Test thoroughly
5. Remove old field

### Deleting Fields

1. Remove from frontend queries first
2. Remove from schema
3. Old data persists in documents (not deleted automatically)

---

## Best Practices

### Schema Design

✅ **Use descriptive field names**
- `heroTagline` not `tagline`
- `whatToExpectBullets` not `bullets`

✅ **Add descriptions**
- Help content editors understand each field
- Include examples in descriptions

✅ **Set appropriate validation**
- Required fields: `.validation(Rule => Rule.required())`
- Email format: `.regex(/pattern/)`
- Min/max values: `.min(0).max(100)`

✅ **Use initial values**
- `initialValue: "default text"`
- `initialValue: () => new Date().toISOString()`

### Query Optimization

✅ **Project only needed fields**
```groq
// ✅ Good - only fetch what you need
*[_type == "menuItem"]{name, price}

// ❌ Avoid - fetches all fields
*[_type == "menuItem"]
```

✅ **Use CDN client for public data**
- Faster response times
- Global edge caching

✅ **Use write client only in API routes**
- Never expose write token to client
- Keep server-side only

---

## Related Documentation

- [API Contracts](./api-contracts.md) - API endpoints that use these schemas
- [Architecture](./architecture.md) - System architecture overview
- [Development Guide](./development-guide.md) - Local development setup

---

## External Resources

- [Sanity Schema Documentation](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [Image URL Builder](https://www.sanity.io/docs/image-url)

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-23
**Total Schemas:** 7
**CMS Version:** Sanity v4.11
