# ☕ The Notebook Café — Website

A modern web platform for **The Notebook Café LLC**, a Riverside-based coffee shop inspired by **house music, creative culture, and connection**.  
Built with **Next.js**, **Sanity CMS**, and **Tailwind CSS**, the site serves as both a **public-facing website** and a **content management system** for non-technical editors.

---

## 🧱 Tech Stack

| Layer             | Technology                                                         |
| ----------------- | ------------------------------------------------------------------ |
| **Framework**     | [Next.js 15 (App Router)](https://nextjs.org/)                     |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                      |
| **CMS / Backend** | [Sanity v4](https://www.sanity.io/) (Embedded Studio at `/studio`) |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                           |
| **Icons**         | [Lucide React](https://lucide.dev/)                                |
| **Linting**       | [ESLint](https://eslint.org/)                                      |
| **Deployment**    | [Vercel](https://vercel.com/)                                      |

---

## ✨ Features

- 🔄 **Dynamic content management** via Sanity Studio (home + about pages editable)
- 🪶 **Clean responsive UI** built with Tailwind CSS
- 📱 **Mobile navigation with animated burger menu**
- 🖼️ **Hero image & copy pulled directly from Sanity**
- 🧾 **Announcement banner** managed through site settings
- 🔗 **Social links (Instagram, TikTok, Spotify)** configured in `settings`
- ⚙️ **Type-safe data fetching** with `next-sanity`
- 🧑‍💻 **Developer tooling**: ESLint linting, TypeScript

---

## 📁 Directory Structure

.
├── app/
│ ├── page.tsx # Home page — fully dynamic from Sanity
│ ├── about/page.tsx # About page — rich text + mission content
│ └── components/
│ └── SiteHeader.tsx # Shared responsive header/nav
├── sanity/
│ ├── sanity.config.ts # Sanity Studio config
│ ├── env.ts # Env variable setup
│ ├── schemaTypes/
│ │ ├── homePage.ts # Homepage schema
│ │ ├── aboutPage.ts # About page schema
│ │ └── settings.ts # Global site settings (socials, hours, SEO)
│ └── lib/
│ ├── client.ts # Sanity client instance
│ ├── image.ts # Image helper
│ └── live.ts # Live preview helper
├── public/
│ └── logo.png # Café logo (used in navbar)
├── .env.local # Sanity + environment variables
├── eslint.config.mjs # ESLint configuration
└── tailwind.config.ts # Tailwind setup

---

🏠 homePage
| Field | Type | Description |
| --------------------- | -------- | ---------------------------------------- |
| `heroHeadline` | string | Main title at the top of the page |
| `heroTagline` | string | Short tagline below the title |
| `heroImage` | image | Image displayed below the headline |
| `statusLine` | string | Example: "☕ Coming Soon ☕" |
| `ctaText` | string | Call-to-action button label |
| `ctaUrl` | url | CTA link (Instagram, reservations, etc.) |
| `whatToExpectBullets` | string[] | List of bullet points |
| `vibeCopy` | text | Short paragraph about brand / vibe |

📖 aboutPage
| Field | Type | Description |
| ---------------- | ------------- | --------------------------------------- |
| `title` | string | Page title ("Our Story") |
| `body` | Portable Text | Story / intro text |
| `valuesHeading` | string | Section heading ("What we’re building") |
| `valuesBullets` | string[] | List of café values or statements |
| `missionHeading` | string | Heading for the mission card |
| `founderNote` | text | Mission / founder note |

⚙️ settings

| Field                | Type   | Description                     |
| -------------------- | ------ | ------------------------------- |
| `businessName`       | string | “The Notebook Café”             |
| `address`            | string | Business address                |
| `hours`              | object | Weekday + weekend hours         |
| `social`             | object | Instagram, TikTok, Spotify URLs |
| `announcementBanner` | object | Optional banner (active + text) |
| `seo`                | object | Default metadata + OG image     |

🗺️ Roadmap / Future Enhancements
📰 Blog section powered by Sanity
📋 Menu builder for drinks + specials
🎵 Embedded Spotify playlist
🧾 Newsletter or mailing list integration
🌗 Dark/light mode toggle

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/thenotebook-cafe.git
cd thenotebook-cafe
npm install
```

Create a .env.local file in the project root and add:

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

```bash
npm run dev
```

Then open:

🌐 http://localhost:3000 → main site
🛠️ http://localhost:3000/studio → Sanity Studio

📜 License
© The Notebook Café LLC
All rights reserved.
For inquiries or collaborations, contact the development team.
