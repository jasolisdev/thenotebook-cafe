# Modular Refactoring Plan

**Date:** 2025-12-23
**Status:** Approved - Ready for Implementation
**Scope:** Comprehensive cleanup (consistency, modularity, documentation)

---

## Executive Summary

This plan refactors The Notebook Café codebase to establish consistent patterns, improve modularity, and add comprehensive documentation. The approach is **risk-based**, starting with low-risk changes and progressively tackling higher-risk restructuring.

---

## Design Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| **Import Paths** | Absolute everywhere (`@/app/...`) | Next.js convention, safer refactoring |
| **CSS Organization** | Hybrid with clear rules | Global for shared, co-located for features |
| **Page Components** | Allow `_components/` folders | Valid App Router pattern, needs documentation |
| **Utilities** | Split by runtime | `app/lib/` server-only, `app/utils/` client-safe |
| **Types** | Multiple files + barrel export | `app/types/*.ts` with `index.ts` barrel |
| **Documentation** | JSDoc headers + function docs | Inline context without leaving code |
| **Phasing** | Risk-based | Low-risk first, build confidence |

---

## Phase Overview

| Phase | Risk Level | Focus | Est. Files |
|-------|------------|-------|------------|
| **Phase 1** | Low | Documentation & Types | ~25 |
| **Phase 2** | Low-Medium | Utilities & Constants | ~15 |
| **Phase 3** | Medium | Import Path Standardization | ~20 |
| **Phase 4** | Medium-High | Component Organization | ~37 |
| **Phase 5** | Medium | CSS Consolidation | ~25 |
| **Phase 6** | Low | Final Documentation & Validation | ~10 |

---

## Phase 1: Documentation & Types (Low Risk)

### Objective
Establish type system foundation and add documentation without changing any runtime behavior.

### 1.1 Create Type File Structure

**Create these files:**

```
app/types/
├── index.ts          # Barrel export
├── menu.ts           # MenuItem, ModifierGroup, CartItem, etc.
├── api.ts            # API request/response types
├── forms.ts          # ContactFormData, SubscribeFormData, ApplicationFormData
├── sanity.ts         # Sanity document types (Subscriber, ContactMessage, etc.)
└── common.ts         # Shared utility types
```

**Tasks:**
- [ ] Create `app/types/` directory
- [ ] Extract types from `app/types.ts` → `app/types/menu.ts`
- [ ] Create `app/types/api.ts` with API response types
- [ ] Create `app/types/forms.ts` with form data types
- [ ] Create `app/types/sanity.ts` with Sanity schema types
- [ ] Create `app/types/common.ts` for shared utility types
- [ ] Create `app/types/index.ts` barrel export
- [ ] Update imports across codebase to use new paths
- [ ] Delete old `app/types.ts` after migration

**Type definitions to create:**

```typescript
// app/types/api.ts
export interface ApiResponse<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}

export interface SubscribeResponse {
  ok: boolean;
  duplicate: boolean;
  id?: string;
}

export interface ContactResponse {
  ok: boolean;
  id?: string;
}

// app/types/forms.ts
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubscribeFormData {
  email: string;
  source: 'homepage' | 'footer' | 'modal' | 'newsletter-section';
}

export interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resume?: File;
}

// app/types/sanity.ts
export interface SanitySubscriber {
  _id: string;
  _type: 'subscriber';
  email: string;
  source: string;
  status: 'subscribed' | 'unsubscribed';
  unsubscribeToken: string;
  createdAt: string;
}

export interface SanityContactMessage {
  _id: string;
  _type: 'contactMessage';
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  source: string;
  createdAt: string;
}
```

### 1.2 Add Folder README Files

**Create README.md in each major folder:**

- [ ] `app/components/README.md` - Component organization rules
- [ ] `app/components/layout/README.md` - Layout components
- [ ] `app/components/ui/README.md` - UI primitives
- [ ] `app/components/features/README.md` - Feature components
- [ ] `app/components/providers/README.md` - Context providers
- [ ] `app/components/seo/README.md` - SEO components
- [ ] `app/lib/README.md` - Server utilities
- [ ] `app/utils/README.md` - Client utilities
- [ ] `app/styles/README.md` - CSS organization
- [ ] `app/types/README.md` - Type definitions
- [ ] `app/api/README.md` - API routes

### 1.3 Validation Checkpoint

- [ ] Run `npm run build` - must pass
- [ ] Run `npm run lint` - must pass
- [ ] Run `npm run test` - must pass
- [ ] Manual smoke test of key pages

---

## Phase 2: Utilities & Constants (Low-Medium Risk)

### Objective
Consolidate utilities by runtime (server/client) and organize constants.

### 2.1 Reorganize Server Utilities

**Current `app/lib/` stays for server-only code:**

```
app/lib/
├── README.md           # (from Phase 1)
├── server/             # NEW: Server-only utilities
│   ├── csrf.ts
│   ├── rateLimit.ts
│   ├── sanitize.ts
│   ├── logger.ts
│   ├── monitoring.ts
│   └── fileValidation.ts
├── data/               # NEW: Data/content
│   ├── baristaFaqData.ts
│   └── virtualBaristaResponder.ts
└── index.ts            # Barrel export
```

**Tasks:**
- [ ] Create `app/lib/server/` directory
- [ ] Move server utilities to `app/lib/server/`
- [ ] Create `app/lib/data/` directory
- [ ] Move data files to `app/lib/data/`
- [ ] Create `app/lib/index.ts` barrel export
- [ ] Update all imports

### 2.2 Consolidate Client Utilities

**Expand `app/utils/` for client-safe code:**

```
app/utils/
├── README.md           # (from Phase 1)
├── ampersandUtils.tsx  # (existing)
├── formatters.ts       # NEW: Date, currency, text formatters
└── index.ts            # Barrel export
```

**Tasks:**
- [ ] Create `app/utils/index.ts` barrel export
- [ ] Add JSDoc to `ampersandUtils.tsx`
- [ ] Identify any client-safe utilities in `app/lib/` and move

### 2.3 Consolidate Constants

**Move root `lib/` contents into appropriate locations:**

```
app/lib/constants/      # NEW
├── business.ts         # From lib/business.ts
├── seo.ts              # From lib/seo.ts
├── colors.ts           # From app/lib/colors.ts
└── index.ts            # Barrel export
```

**Tasks:**
- [ ] Create `app/lib/constants/` directory
- [ ] Move `lib/business.ts` → `app/lib/constants/business.ts`
- [ ] Move `lib/seo.ts` → `app/lib/constants/seo.ts`
- [ ] Move `app/lib/colors.ts` → `app/lib/constants/colors.ts`
- [ ] Create barrel export
- [ ] Update all imports
- [ ] Delete root `lib/` folder after migration
- [ ] Update `tsconfig.json` paths if needed

### 2.4 Validation Checkpoint

- [ ] Run `npm run build` - must pass
- [ ] Run `npm run lint` - must pass
- [ ] Run `npm run test` - must pass
- [ ] Manual smoke test of key pages

---

## Phase 3: Import Path Standardization (Medium Risk)

### Objective
Convert all imports to absolute paths (`@/app/...`).

### 3.1 Page Route Imports

**Files to update:**

| File | Current Pattern | Target Pattern |
|------|-----------------|----------------|
| `app/careers/page.tsx` | Relative (`../`) | Absolute (`@/app/`) |
| `app/menu/page.tsx` | Mixed | Absolute (`@/app/`) |
| `app/story/page.tsx` | Absolute | Verify consistency |
| `app/contact/page.tsx` | Absolute | Verify consistency |
| `app/privacy/page.tsx` | Check | Absolute (`@/app/`) |
| `app/terms/page.tsx` | Check | Absolute (`@/app/`) |
| `app/refunds/page.tsx` | Check | Absolute (`@/app/`) |

**Tasks:**
- [ ] Audit all page files for import patterns
- [ ] Update `app/careers/page.tsx` imports
- [ ] Update `app/careers/thank-you/page.tsx` imports
- [ ] Update `app/menu/page.tsx` imports
- [ ] Update `app/menu/layout.tsx` imports
- [ ] Update all other page imports
- [ ] Update `app/layout.tsx` imports
- [ ] Update `app/not-found.tsx` imports

### 3.2 Component Imports

**Update all components to use absolute imports:**

- [ ] `app/components/layout/*.tsx` - All 5 files
- [ ] `app/components/ui/*.tsx` - All 13 files
- [ ] `app/components/features/*.tsx` - All 13 files
- [ ] `app/components/providers/*.tsx` - 1 file
- [ ] `app/components/seo/*.tsx` - All 3 files
- [ ] `app/menu/_components/*.tsx` - 2 files

### 3.3 CSS Import Standardization

**Standardize CSS imports to absolute paths:**

- [ ] Update `app/page.tsx` CSS imports (already absolute - verify)
- [ ] Update `app/menu/page.tsx` CSS imports
- [ ] Update `app/story/page.tsx` CSS imports
- [ ] Update `app/contact/page.tsx` CSS imports
- [ ] Update `app/careers/page.tsx` CSS imports
- [ ] Update all other page CSS imports

### 3.4 API Route Imports

- [ ] Update all files in `app/api/` to use absolute imports

### 3.5 Validation Checkpoint

- [ ] Run `npm run build` - must pass
- [ ] Run `npm run lint` - must pass
- [ ] Run `npm run test` - must pass
- [ ] Manual smoke test of ALL pages

---

## Phase 4: Component Organization (Medium-High Risk)

### Objective
Add JSDoc documentation to all components and establish clear organization patterns.

### 4.1 Document Component Convention

**Update `app/components/README.md` with rules:**

```markdown
## Component Organization Rules

### Folder Structure
- `layout/` - Page structure components (SiteHeader, SiteFooter, etc.)
- `ui/` - Reusable UI primitives (Button, Reveal, etc.)
- `features/` - Feature-specific components (forms, modals, sections)
- `providers/` - React Context providers
- `seo/` - SEO/structured data components

### When to Use Page-Local `_components/`
Use `_components/` folder inside a page route when:
1. Component is ONLY used by that page
2. Component is tightly coupled to page-specific data/logic
3. Component is unlikely to be reused elsewhere

Example: `app/menu/_components/MenuTabs.tsx`

### When to Use `app/components/`
Use shared components folder when:
1. Component is used by 2+ pages
2. Component is a general-purpose UI element
3. Component might be reused in the future
```

### 4.2 Add JSDoc to Layout Components

**Template:**

```typescript
/**
 * @fileoverview [Component description]
 * @module components/layout/[ComponentName]
 *
 * @description
 * [Detailed description of what this component does]
 *
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
```

**Files:**
- [ ] `SiteHeader.tsx` - Add JSDoc header + function docs
- [ ] `SiteFooter.tsx` - Add JSDoc header + function docs
- [ ] `SiteShell.tsx` - Add JSDoc header + function docs
- [ ] `PageTransition.tsx` - Add JSDoc header + function docs
- [ ] `ImagePreloader.tsx` - Add JSDoc header + function docs

### 4.3 Add JSDoc to UI Components

- [ ] `Button.tsx`
- [ ] `Reveal.tsx`
- [ ] `RevealText.tsx`
- [ ] `FadeInSection.tsx`
- [ ] `NewsletterSubscribe.tsx`
- [ ] `ConsentBanner.tsx`
- [ ] `PasswordGate.tsx`
- [ ] `AnnouncementBanner.tsx`
- [ ] `HeroButtons.tsx`
- [ ] `StoryLink.tsx`
- [ ] `AccessibilityIcons.tsx`
- [ ] `VirtualBarista.tsx`
- [ ] `AnalyticsLoader.tsx`

### 4.4 Add JSDoc to Feature Components

- [ ] `ContactForm.tsx`
- [ ] `CareersApplyForm.tsx`
- [ ] `NewsLetterForm.tsx`
- [ ] `ProductModal.tsx`
- [ ] `CartDrawer.tsx`
- [ ] `NewsletterModal.tsx`
- [ ] `CommunityModalTrigger.tsx`
- [ ] `HeroSection.tsx`
- [ ] `MenuSection.tsx`
- [ ] `NewsletterSection.tsx`
- [ ] `HeroGallery.tsx`
- [ ] `JobPosition.tsx`
- [ ] `Accessibility/AccessibilityWidget.tsx`

### 4.5 Add JSDoc to Providers & SEO

- [ ] `CartProvider.tsx`
- [ ] `LocalBusinessJsonLd.tsx`
- [ ] `FAQJsonLd.tsx`
- [ ] `MenuJsonLd.tsx`

### 4.6 Add JSDoc to Page-Local Components

- [ ] `app/menu/_components/MenuTabs.tsx`
- [ ] `app/menu/_components/MenuSectionList.tsx`

### 4.7 Handle Root-Level Components

**Decision needed for:**
- `ErrorBoundary.tsx` - Move to `app/components/ui/` or keep at root?
- `SignaturePoursGrid.tsx` - Currently unused, move or delete?

**Tasks:**
- [ ] Move `ErrorBoundary.tsx` to `app/components/ui/`
- [ ] Evaluate `SignaturePoursGrid.tsx` usage - delete if unused

### 4.8 Validation Checkpoint

- [ ] Run `npm run build` - must pass
- [ ] Run `npm run lint` - must pass
- [ ] Run `npm run test` - must pass
- [ ] Manual smoke test of ALL pages
- [ ] Verify all components render correctly

---

## Phase 5: CSS Consolidation (Medium Risk)

### Objective
Establish clear CSS ownership rules and document the hybrid approach.

### 5.1 Document CSS Convention

**Create/update `app/styles/README.md`:**

```markdown
## CSS Organization

### Import Hierarchy

1. **Global CSS** (imported in `layout.tsx`)
   - `globals.css` - Tailwind, theme tokens, base styles
   - `components/navigation.css` - Site-wide navigation
   - `components/footer.css` - Site-wide footer
   - `components/buttons.css` - Shared button styles
   - `components/announcement.css` - Announcement banner
   - `layout/animations.css` - Shared animations
   - `layout/sections.css` - Section layout patterns

2. **Page CSS** (imported by each page)
   - `pages/home.css` - Homepage styles
   - `pages/menu.css` - Menu page styles
   - etc.

3. **Feature CSS** (imported by component)
   - Component-specific styles that shouldn't be global
   - Example: `consent-banner.css` imported by ConsentBanner

### Rules

**Import globally when:**
- Style is used on multiple pages
- Style is part of core layout
- Style defines shared patterns

**Import in component when:**
- Style is only used by one component
- Style is feature-specific
- Component may not be used on all pages
```

### 5.2 Audit Current CSS Imports

**Verify ownership is clear:**

| CSS File | Import Location | Correct? |
|----------|-----------------|----------|
| `navigation.css` | `layout.tsx` | ✓ Global |
| `footer.css` | `layout.tsx` | ✓ Global |
| `buttons.css` | `layout.tsx` | ✓ Global |
| `consent-banner.css` | `ConsentBanner.tsx` | ✓ Feature |
| `signature-pours-grid.css` | Component | Check usage |
| `application-form.css` | Where? | Audit needed |

**Tasks:**
- [ ] Audit all CSS files and their import locations
- [ ] Document ownership in README
- [ ] Move any misplaced CSS imports
- [ ] Remove unused CSS files

### 5.3 Standardize Page CSS Imports

**Ensure all pages follow same pattern:**

```typescript
// Every page should import CSS with absolute path
import "@/app/styles/pages/[page-name].css";
```

- [ ] Update all page CSS imports to absolute paths
- [ ] Verify no duplicate CSS imports

### 5.4 Add JSDoc to CSS Files

**Add file header comments:**

```css
/**
 * @fileoverview Navigation component styles
 * @module styles/components/navigation
 *
 * Imported globally in layout.tsx
 * Provides styles for SiteHeader component
 */
```

- [ ] Add headers to all component CSS files
- [ ] Add headers to all page CSS files
- [ ] Add headers to all layout CSS files

### 5.5 Validation Checkpoint

- [ ] Run `npm run build` - must pass
- [ ] Run `npm run lint` - must pass
- [ ] Visual regression check on all pages
- [ ] Verify no style regressions

---

## Phase 6: Final Documentation & Validation (Low Risk)

### Objective
Update all documentation to reflect changes and perform final validation.

### 6.1 Update CLAUDE.md

- [ ] Update Architecture section with new structure
- [ ] Update File Organization section
- [ ] Update Import Path conventions
- [ ] Update CSS Organization section
- [ ] Update Type definitions section
- [ ] Add Component Documentation section
- [ ] Update Recent Updates section

### 6.2 Update docs/ Files

- [ ] Update `docs/source-tree-analysis.md` with new structure
- [ ] Update `docs/component-inventory.md` with JSDoc info
- [ ] Update `docs/CSS_ORGANIZATION.md` with new rules
- [ ] Update `docs/architecture.md` with changes

### 6.3 Create Migration Summary

- [ ] Create `docs/plans/2025-12-23-modular-refactoring-summary.md`
- [ ] Document all changes made
- [ ] Document any breaking changes (should be none)
- [ ] Document new conventions established

### 6.4 Final Validation

- [ ] Run full test suite: `npm run test:all`
- [ ] Run production build: `npm run build`
- [ ] Manual test ALL pages:
  - [ ] Homepage (`/`)
  - [ ] Menu (`/menu`)
  - [ ] Story (`/story`)
  - [ ] Contact (`/contact`)
  - [ ] Careers (`/careers`)
  - [ ] Privacy (`/privacy`)
  - [ ] Terms (`/terms`)
  - [ ] Refunds (`/refunds`)
- [ ] Test cart functionality
- [ ] Test contact form
- [ ] Test newsletter signup
- [ ] Verify mobile responsiveness

### 6.5 Git Commit Strategy

Each phase should be committed separately:

```bash
# Phase 1
git commit -m "refactor(types): reorganize type definitions with barrel exports"

# Phase 2
git commit -m "refactor(utils): consolidate utilities by runtime"

# Phase 3
git commit -m "refactor(imports): standardize to absolute import paths"

# Phase 4
git commit -m "docs(components): add JSDoc documentation to all components"

# Phase 5
git commit -m "refactor(css): consolidate CSS with clear ownership rules"

# Phase 6
git commit -m "docs: update documentation to reflect refactoring changes"
```

---

## Risk Mitigation

### Before Each Phase
1. Ensure all tests pass
2. Create git checkpoint (commit or stash)
3. Note current working state

### During Each Phase
1. Make small, incremental changes
2. Test frequently
3. Commit working states

### If Something Breaks
1. Check git diff for recent changes
2. Run specific failing tests to isolate issue
3. Revert to last working commit if needed
4. Document what went wrong

### Rollback Plan
Each phase can be independently reverted:
```bash
git revert <phase-commit-hash>
```

---

## Success Criteria

### Consistency
- [ ] All imports use absolute paths (`@/app/...`)
- [ ] All CSS follows documented ownership rules
- [ ] All utilities are in correct runtime location

### Modularity
- [ ] Types are organized in separate files with barrel export
- [ ] Server/client utilities are clearly separated
- [ ] Component organization rules are documented

### Documentation
- [ ] Every component has JSDoc header
- [ ] Every folder has README.md
- [ ] CLAUDE.md is updated
- [ ] All docs/ files are current

### Stability
- [ ] All tests pass
- [ ] No visual regressions
- [ ] No runtime errors
- [ ] Build succeeds

---

## Estimated Effort

| Phase | Complexity | Notes |
|-------|------------|-------|
| Phase 1 | Low | Mostly new files, no changes to existing logic |
| Phase 2 | Low-Medium | File moves, import updates |
| Phase 3 | Medium | Many files touched, careful testing needed |
| Phase 4 | Medium-High | Most files touched, but only adding docs |
| Phase 5 | Medium | CSS changes need visual verification |
| Phase 6 | Low | Documentation only |

---

## Session Continuity

If continuing in another session, reference this document and note:
1. Which phase you're on
2. Which tasks within that phase are complete
3. Any issues encountered

The TodoWrite tool should be used to track progress within each phase.

---

**Document Status:** Ready for implementation
**Next Step:** Begin Phase 1 - Documentation & Types
