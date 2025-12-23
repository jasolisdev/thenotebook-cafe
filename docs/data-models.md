# Data Models Documentation
**The Notebook Café - Sanity CMS Schema Reference**

Last Updated: 2025-12-23
Total Schemas: 8
CMS: Sanity 4.11

---

## Overview

Sanity CMS is used as the headless data layer. There is no traditional database. Schemas live in `sanity/schemaTypes/` and are registered in `sanity/schemaTypes/index.ts`.

---

## Schema Index

1. `homePage`
2. `aboutPage`
3. `menuItem`
4. `settings`
5. `post`
6. `subscriber`
7. `jobApplication`
8. `contactMessage`

---

## 1. homePage
**File:** `sanity/schemaTypes/homePage.ts`

**Purpose:** Homepage content (hero text, highlights, intro copy)

**Key Fields:**
- `heroHeadline` (string, required)
- `heroTagline` (string)
- `statusLine` (string)
- `ctaText` / `ctaUrl` (string/url)
- `whatToExpectBullets` (array of strings)
- `vibeCopy` (text)
- `heroImage` (image, optional)

---

## 2. aboutPage
**File:** `sanity/schemaTypes/aboutPage.ts`

**Purpose:** Story/mission content for the story/about page

**Key Fields:**
- `title` (string, required)
- `body` (portable text + images)
- `valuesHeading` (string)
- `valuesBullets` (array of strings)
- `missionHeading` (string)
- `founderNote` (text)

---

## 3. menuItem
**File:** `sanity/schemaTypes/menuItem.ts`

**Purpose:** Menu items for future CMS-driven menu

**Key Fields:**
- `name` (string, required)
- `description` (text)
- `price` (string)
- `section` (drinks | meals | desserts)
- `category` (espresso, latte, tea, food, etc.)
- `image` (image)
- `sortOrder` (number)
- `isFeatured` (boolean)

---

## 4. settings
**File:** `sanity/schemaTypes/settings.ts`

**Purpose:** Global site settings and SEO defaults

**Key Fields:**
- `businessName`, `address`, `phone`, `email`
- `hours` (weekday/weekend)
- `social` (instagram, tiktok, spotify)
- `announcementBanner` (isActive, text)
- `seo` (metaTitle, metaDescription, openGraphImage)

---

## 5. post
**File:** `sanity/schemaTypes/post.ts`

**Purpose:** Future blog/updates content

**Key Fields:**
- `title`, `slug`
- `coverImage`
- `publishedAt`
- `body` (portable text + images)
- `tags` (array of strings)

---

## 6. subscriber
**File:** `sanity/schemaTypes/subscriber.ts`

**Purpose:** Newsletter subscriber storage

**Key Fields:**
- `email` (string, required)
- `source` (string)
- `unsubscribeToken` (string)
- `status` (subscribed/pending/unsubscribed)
- `createdAt`, `unsubscribedAt` (datetime)

---

## 7. jobApplication
**File:** `sanity/schemaTypes/jobApplication.ts`

**Purpose:** Full job application intake (used by `/api/apply`)

**Key Fields:**
- Applicant details: `firstName`, `lastName`, `email`, `phone`, `birthdate`
- Availability: `positions`, `employmentType`, `daysAvailable`, `startDate`, `hoursPerWeek`, `commitmentLength`
- Files: `resume`, `supplementalApplication`
- Admin: `status`, `notes`, `appliedAt`

---

## 8. contactMessage
**File:** `sanity/schemaTypes/contactMessage.ts`

**Purpose:** Contact form submissions

**Key Fields:**
- `name`, `email`, `subject`, `message`
- `status`, `source`
- `createdAt`
