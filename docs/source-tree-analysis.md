# Source Tree Analysis
**The Notebook Café - Project Structure**

Last Updated: 2025-12-23
Project Type: Web Application (Next.js 16 + Sanity CMS)

---

## Annotated Directory Tree

```
thenotebook-cafe/                    # Project root
│
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Homepage
│   ├── globals.css                  # Global styles
│   ├── fonts.ts                     # Local font config (Torus)
│   ├── constants.ts                 # Menu data + modifiers
│   ├── types.ts                     # Shared TS types
│   │
│   ├── api/                         # API Routes
│   │   ├── subscribe/route.ts       # POST /api/subscribe
│   │   ├── unsubscribe/route.ts     # GET /api/unsubscribe
│   │   ├── contact/route.ts         # POST /api/contact
│   │   ├── apply/route.ts           # POST /api/apply (Sanity)
│   │   ├── careers/apply/route.ts   # POST /api/careers/apply (Resend)
│   │   └── auth/verify/route.ts     # POST /api/auth/verify
│   │
│   ├── components/                  # Shared components
│   │   ├── layout/                  # Header, footer, shell
│   │   ├── ui/                      # Buttons, banners, reveals
│   │   ├── features/                # Menu, forms, cart, hero
│   │   ├── providers/               # Cart provider
│   │   └── seo/                     # JSON-LD components
│   │
│   ├── menu/                        # /menu
│   │   ├── page.tsx
│   │   └── _components/             # MenuTabs, MenuSectionList
│   ├── story/                       # /story
│   ├── careers/                     # /careers
│   │   └── thank-you/               # /careers/thank-you
│   ├── contact/                     # /contact
│   ├── privacy/                     # /privacy
│   ├── terms/                       # /terms
│   ├── refunds/                     # /refunds
│   ├── style-guide/                 # /style-guide
│   ├── studio/                      # /studio (Sanity Studio)
│   │
│   ├── styles/                      # CSS organization
│   │   ├── components/
│   │   ├── layout/
│   │   └── pages/
│   │
│   ├── hooks/                       # Custom hooks (useOnScreen)
│   ├── lib/                         # Utilities (csrf, rateLimit, sanitize)
│   ├── utils/                       # Misc helpers
│   ├── robots.ts                    # robots.txt
│   ├── sitemap.ts                   # sitemap.xml
│   └── not-found.tsx                # 404 page
│
├── sanity/                          # Sanity CMS
│   ├── sanity.config.ts
│   ├── schemaTypes/
│   └── lib/
│
├── public/                          # Static assets (fonts, images)
├── docs/                            # Project documentation
├── tests/                           # Unit + E2E tests
├── .github/workflows/               # CI (lint, unit, e2e)
└── package.json                     # Dependencies & scripts
```

---

## Entry Points

### Primary
- `app/layout.tsx` - Root layout wrapper
- `app/page.tsx` - Homepage
- `sanity/sanity.config.ts` - Sanity Studio config

### Public Routes
- `/` Home
- `/menu`
- `/story`
- `/careers`
- `/careers/thank-you`
- `/contact`
- `/privacy`, `/terms`, `/refunds`
- `/style-guide`

### Admin Routes
- `/studio` (Sanity Studio)

---

## Notes

- Menu data is currently sourced from `app/constants.ts`.
- Sanity is used for settings and form storage; content pages are mostly static today.
- E2E and unit tests live under `tests/`.
