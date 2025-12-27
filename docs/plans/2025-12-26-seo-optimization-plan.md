# SEO Optimization Plan - Full Implementation

**Created:** 2025-12-26
**Branch:** `claude/seo-optimization-full`
**Status:** In Progress

---

## Overview

Comprehensive SEO optimization addressing performance, analytics, and architecture improvements identified in the site audit.

### Current Metrics (Baseline)
| Metric | Current | Target |
|--------|---------|--------|
| Meta Description | 132 chars | 150-220 chars |
| Google Analytics | None | GA4 Implemented |
| HTML Size | 61.96 KB | ~33 KB |
| HTTP Requests | 35 | <20 |
| FCP | 2.268s | <1.8s |
| CDN | Not optimized | Vercel Edge optimized |

### Key Decisions
- **Analytics:** Google Analytics 4 (GA4)
- **Newsletter:** Migrate from Sanity to Mailchimp
- **CMS:** Remove Sanity entirely (hardcode content)

---

## Phase Checklist

### Phase 1: Quick Wins (Low Risk, High Impact)
> Simple fixes that don't require architectural changes

- [ ] **1.1** Extend meta description to 150-220 characters
- [ ] **1.2** Update page-specific meta descriptions (menu, story, contact, careers)
- [ ] **1.3** Add ads.txt file (empty or with placeholder if not running ads)
- [ ] **1.4** Verify www redirect is properly configured in Vercel

### Phase 2: Google Analytics 4 Integration
> Add tracking while minimizing performance impact

- [ ] **2.1** Create GA4 property in Google Analytics console
- [ ] **2.2** Install @next/third-parties for optimized GA loading
- [ ] **2.3** Add GA4 component with proper gtag configuration
- [ ] **2.4** Configure GA4 to respect cookie consent (GDPR-friendly)
- [ ] **2.5** Test tracking in development and verify in GA4 dashboard
- [ ] **2.6** Update privacy policy to mention Google Analytics

### Phase 3: Mailchimp Integration
> Replace Sanity newsletter storage with Mailchimp

- [ ] **3.1** Create Mailchimp account and audience list
- [ ] **3.2** Generate Mailchimp API key
- [ ] **3.3** Create new `/api/subscribe` endpoint using Mailchimp API
- [ ] **3.4** Update NewsLetterForm component to use new endpoint
- [ ] **3.5** Migrate existing subscribers from Sanity to Mailchimp (if any)
- [ ] **3.6** Update `/api/unsubscribe` endpoint for Mailchimp
- [ ] **3.7** Test subscription flow end-to-end
- [ ] **3.8** Remove Sanity subscriber schema

### Phase 4: Sanity CMS Removal
> Remove CMS dependency and hardcode content

- [ ] **4.1** Audit all Sanity queries in codebase
- [ ] **4.2** Extract current content from Sanity (settings, social links)
- [ ] **4.3** Create static content files in `app/lib/data/`
- [ ] **4.4** Replace Sanity fetches with static imports
- [ ] **4.5** Remove Sanity client configuration
- [ ] **4.6** Remove Sanity packages from package.json
- [ ] **4.7** Delete `/studio` route and Sanity schemas
- [ ] **4.8** Remove Sanity environment variables from Vercel
- [ ] **4.9** Update CLAUDE.md documentation

### Phase 5: HTML & Bundle Size Reduction
> Reduce HTML from 62KB to ~33KB

- [ ] **5.1** Audit current bundle with `npm run build` analyzer
- [ ] **5.2** Enable gzip/brotli compression verification in Vercel
- [ ] **5.3** Remove unused dependencies from package.json
- [ ] **5.4** Lazy load non-critical components (footer, modals)
- [ ] **5.5** Convert large inline SVGs to external files
- [ ] **5.6** Minify JSON-LD structured data
- [ ] **5.7** Audit and remove unused CSS classes
- [ ] **5.8** Split large components into smaller chunks

### Phase 6: HTTP Request Optimization
> Reduce from 35 requests to under 20

- [ ] **6.1** Audit all current requests with browser DevTools
- [ ] **6.2** Combine/inline critical CSS
- [ ] **6.3** Defer non-critical JavaScript
- [ ] **6.4** Preconnect to required origins (fonts, analytics)
- [ ] **6.5** Remove unused font weights/styles
- [ ] **6.6** Optimize image loading (lazy load below-fold)
- [ ] **6.7** Bundle small JS files together
- [ ] **6.8** Use resource hints (prefetch, preload) strategically

### Phase 7: Core Web Vitals & FCP
> Improve FCP from 2.27s to under 1.8s

- [ ] **7.1** Run Lighthouse audit for baseline
- [ ] **7.2** Inline critical above-fold CSS
- [ ] **7.3** Defer all non-critical CSS
- [ ] **7.4** Optimize Largest Contentful Paint (LCP) element
- [ ] **7.5** Reduce server response time (check Vercel edge config)
- [ ] **7.6** Eliminate render-blocking resources
- [ ] **7.7** Optimize font loading strategy (font-display: optional)
- [ ] **7.8** Run final Lighthouse audit and document improvements

### Phase 8: Final Verification & Documentation
> Validate all improvements and update docs

- [ ] **8.1** Run full site audit with SEO tool
- [ ] **8.2** Verify all meta descriptions meet length requirements
- [ ] **8.3** Test GA4 tracking on production
- [ ] **8.4** Test newsletter subscription with Mailchimp
- [ ] **8.5** Verify Core Web Vitals in Google Search Console
- [ ] **8.6** Update CLAUDE.md with new architecture
- [ ] **8.7** Update README.md if needed
- [ ] **8.8** Create PR with full changelog

---

## Implementation Notes

### Files to Create
- `app/components/analytics/GoogleAnalytics.tsx` - GA4 component
- `public/ads.txt` - Ads.txt file
- `app/lib/data/content.ts` - Static content (replacing Sanity)

### Files to Modify
- `app/lib/constants/seo.ts` - Extended meta descriptions
- `app/layout.tsx` - Add GA4, remove Sanity
- `app/api/subscribe/route.ts` - Mailchimp integration
- `app/api/unsubscribe/route.ts` - Mailchimp integration
- `package.json` - Remove Sanity, add Mailchimp SDK

### Files to Delete
- `sanity/` directory (entire folder)
- `sanity.config.ts`
- `sanity.cli.ts`
- `app/studio/` directory

### Environment Variables
**Add:**
- `NEXT_PUBLIC_GA4_ID` - Google Analytics 4 Measurement ID
- `MAILCHIMP_API_KEY` - Mailchimp API key
- `MAILCHIMP_AUDIENCE_ID` - Mailchimp audience/list ID
- `MAILCHIMP_SERVER_PREFIX` - Mailchimp server (e.g., us21)

**Remove (after migration):**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_WRITE_TOKEN`

---

## Progress Log

| Date | Phase | Items Completed | Notes |
|------|-------|-----------------|-------|
| 2025-12-26 | Setup | Branch created, plan written | Starting Phase 1 |

---

## Rollback Plan

If issues arise:
1. Each phase is independent - can be reverted separately
2. Keep Sanity credentials until Mailchimp is verified working
3. GA4 can be disabled by removing component
4. All changes are in feature branch until verified

---

## Resources

- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Next.js Third Parties](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries)
- [Mailchimp Marketing API](https://mailchimp.com/developer/marketing/api/)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)
- [Web Vitals](https://web.dev/vitals/)
