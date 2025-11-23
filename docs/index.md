# Project Documentation Index
**The Notebook Café - Complete Documentation Hub**

Generated: 2025-11-23 | Scan Mode: Quick | Scan Version: 1.2.0

👆 **This is your primary entry point for AI-assisted development**

---

## Project Overview

- **Name:** The Notebook Café
- **Type:** Monolith (Single-part web application)
- **Primary Language:** TypeScript
- **Architecture:** Next.js App Router (Server-First)
- **CMS:** Sanity 4.11 (Headless)
- **Deployment:** Vercel (inferred)

---

## Quick Reference

### Tech Stack Summary
- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Language:** TypeScript 5
- **CMS:** Sanity 4.11
- **Styling:** Tailwind CSS 4.1 + Custom CSS
- **Animations:** Framer Motion 12
- **Icons:** Lucide React + React Icons

### Entry Points
- **Root Layout:** `app/layout.tsx`
- **Homepage:** `app/page.tsx`
- **Sanity Config:** `sanity/sanity.config.ts`

### Architecture Pattern
- Next.js App Router (file-system routing)
- Server Components by default
- Client Components for interactivity
- API Routes for backend logic
- Sanity CMS as data layer (no traditional database)

### Project Statistics
- **Components:** 31 total (organized in 4 tiers)
- **API Routes:** 2 endpoints
- **Content Schemas:** 7 Sanity types
- **Pages:** 4 public routes (Home, Menu, Story, Events)

---

## Generated Documentation

### Core Documentation
- **[Project Overview](./project-overview.md)** - Executive summary and quick reference
- **[Architecture](./architecture.md)** - Complete system architecture and design
- **[Source Tree Analysis](./source-tree-analysis.md)** - Annotated directory structure
- **[Development Guide](./development-guide.md)** - Setup, workflow, and development instructions

### Detailed Documentation
- **[Component Inventory](./component-inventory.md)** - Catalog of all 31 components
- **[API Contracts](./api-contracts.md)** - API endpoint documentation
- **[Data Models](./data-models.md)** - Sanity schema documentation

### Workflow Metadata
- **[project-scan-report.json](./project-scan-report.json)** - Scan state and progress tracking

---

## Existing Documentation

### Project Documentation (Root)
- **[CLAUDE.md](../CLAUDE.md)** - Comprehensive developer guide for Claude Code (24KB, primary reference)
- **[README.md](../README.md)** - Project overview and quick start guide
- **[REFACTORING_SUMMARY.md](../REFACTORING_SUMMARY.md)** - Recent refactoring changes and migration guide
- **[CSS_ORGANIZATION.md](../CSS_ORGANIZATION.md)** - CSS architecture and styling patterns

### Additional Files
- **[README-NEW.md](../README-NEW.md)** - Updated project README (alternate version)
- **[CLAUDE-NEW.md](../CLAUDE-NEW.md)** - Updated Claude instructions (alternate version)

### Workflow Files (docs/)
- **[bmm-workflow-status.yaml](./bmm-workflow-status.yaml)** - BMAD workflow status tracking

---

## Getting Started

### For New Developers
1. **Read [Development Guide](./development-guide.md)** - Setup environment and install dependencies
2. **Review [Architecture](./architecture.md)** - Understand system design and patterns
3. **Check [Source Tree Analysis](./source-tree-analysis.md)** - Learn file organization
4. **Refer to [CLAUDE.md](../CLAUDE.md)** - Comprehensive Claude Code guidance (primary reference)

### Quick Start Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev  # http://localhost:3000

# Access Sanity Studio CMS
# http://localhost:3000/studio

# Build for production
npm run build

# Lint code
npm run lint
```

### Environment Setup
Create `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=<your_api_token>
SITE_PASSWORD=  # Optional dev protection
```

---

## For Content Editors

### Accessing Sanity Studio
1. Start development server: `npm run dev`
2. Visit: http://localhost:3000/studio
3. Log in with Sanity credentials
4. Edit content and click "Publish"

### Available Content Types
- **Homepage** - Hero, welcome section, bullet points
- **About Page** - Story, values, founder note
- **Menu Items** - Drinks, meals, desserts (section-based)
- **Settings** - Social links, hours, address
- **Subscribers** - Newsletter email list

---

## For AI-Assisted Development

### Brownfield PRD Creation
When creating PRDs for new features, reference:
1. **[Project Overview](./project-overview.md)** - High-level context
2. **[Architecture](./architecture.md)** - Technical constraints and patterns
3. **[Component Inventory](./component-inventory.md)** - Reusable components
4. **[Data Models](./data-models.md)** - Existing schemas
5. **[CLAUDE.md](../CLAUDE.md)** - Component patterns and guidelines

### Feature Development Workflow
1. Review existing architecture and patterns
2. Check component inventory for reusable elements
3. Consult data models for schema extensions
4. Follow development guide for workflow
5. Reference CLAUDE.md for code patterns

---

## Documentation Structure

### Directory Organization
```
docs/
├── index.md                         # This file (master index)
├── project-overview.md              # Executive summary
├── architecture.md                  # System architecture
├── source-tree-analysis.md          # Directory structure
├── development-guide.md             # Developer workflow
├── component-inventory.md           # Component catalog
├── api-contracts.md                 # API documentation
├── data-models.md                   # Schema documentation
├── project-scan-report.json         # Workflow state
├── bmm-workflow-status.yaml         # BMAD status
└── sprint-artifacts/                # Sprint planning artifacts
```

### Root Documentation
```
/
├── CLAUDE.md                        # Primary reference (24KB)
├── README.md                        # Project overview
├── REFACTORING_SUMMARY.md           # Refactoring guide
└── CSS_ORGANIZATION.md              # CSS architecture
```

---

## Key Architectural Patterns

### Component Organization (4-Tier)
```
app/components/
├── layout/      # Global layout (header, footer, scroll)
├── ui/          # Reusable primitives (buttons, cards)
├── features/    # Feature-specific (menu, newsletter)
└── decorative/  # Visual enhancements (floating items)
```

### CSS Organization (3-Tier)
```
app/styles/
├── components/  # Component-specific styles
├── layout/      # Layout and structural styles
└── pages/       # Page-specific styles
```

### Data Flow
```
Sanity Studio (/studio)
    ↓
Sanity Content Lake (Cloud)
    ↓
Next.js Server (Sanity Client)
    ↓
Server Components (SSR)
    ↓
Browser (Hydrated Client Components)
```

---

## Technology Decisions

### Why Next.js 16 App Router?
- File-system based routing
- Server Components for performance
- Built-in API routes
- Optimized image handling
- Excellent TypeScript support

### Why Sanity CMS?
- Headless architecture
- Real-time collaboration
- Structured content
- Powerful image API
- Embeddable studio UI

### Why Tailwind CSS?
- Rapid development
- Consistent design system
- Responsive utilities
- Small production bundle
- Easy customization

---

## Common Development Tasks

### Adding a New Page
```bash
# Create route directory
mkdir app/new-page

# Create page file
touch app/new-page/page.tsx

# Route automatically available at /new-page
```

### Creating a New Component
```typescript
// app/components/ui/MyComponent.tsx
export default function MyComponent({ title }: { title: string }) {
  return <div className="my-component">{title}</div>;
}
```

### Adding a New API Route
```typescript
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' });
}

// Available at: /api/hello
```

### Extending Sanity Schema
```typescript
// sanity/schemaTypes/newType.ts
export default {
  name: 'newType',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'content', type: 'text' }
  ]
}

// Add to sanity/schemaTypes/index.ts
```

---

## Performance Considerations

### Optimization Strategies
- ✅ Server Components reduce client JS
- ✅ Next.js Image component for optimization
- ✅ Code splitting by route
- ✅ Sanity CDN for fast content delivery
- ✅ Tailwind CSS purging for small bundles

### Target Metrics
- **Lighthouse Performance:** 90+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

---

## Security Notes

### Current Security Measures
- Environment variables for Sanity credentials
- Server-side API token handling (never exposed to client)
- Optional password protection for dev/staging
- HTTPS enforced (Vercel default)

### Recommendations for Production
- Implement proper authentication (NextAuth.js)
- Add rate limiting for API routes
- Enable Content Security Policy headers
- Add error monitoring (Sentry)
- Implement CORS restrictions

---

## Testing Strategy

**Current Status:** No automated tests configured

### Recommended Additions
- **Unit Tests:** Jest + React Testing Library for components
- **Integration Tests:** API route testing
- **E2E Tests:** Playwright for critical user flows
- **Visual Regression:** Percy or Chromatic

### Manual Testing Checklist
- [ ] All pages load correctly (Home, Menu, Story, Events)
- [ ] Mobile navigation works (< 640px)
- [ ] Newsletter subscription functional
- [ ] Sanity Studio CMS accessible
- [ ] Password protection (if enabled)
- [ ] Responsive design (320px - 1920px+)
- [ ] Images optimize and lazy load
- [ ] Animations perform smoothly
- [ ] SEO meta tags present

---

## Deployment Information

**Platform:** Vercel (inferred - Next.js standard)

### Deployment Flow
1. Push code to Git repository
2. Vercel auto-detects changes
3. Runs `npm run build`
4. Deploys to global CDN
5. Environment variables set in Vercel dashboard

### No Docker/CI-CD Required
- Vercel handles build and deployment
- No custom CI/CD pipelines needed
- No containerization required

---

## Future Enhancements

### Recommended Additions
- [ ] Automated testing infrastructure
- [ ] Performance monitoring (Web Vitals)
- [ ] Error tracking (Sentry)
- [ ] Blog activation (post schema exists)
- [ ] Online ordering system
- [ ] Event booking system
- [ ] Prettier + Husky for code formatting

---

## External Resources

### Official Documentation
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React 19 Documentation](https://react.dev)

### Community Resources
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Sanity Community](https://www.sanity.io/exchange)
- [Tailwind UI](https://tailwindui.com/)

---

## Version History

| Version | Date | Scan Mode | Files Generated |
|---------|------|-----------|-----------------|
| 1.0.0 | 2025-11-23 | Quick | 5 docs (overview, architecture, source-tree, dev-guide, index) |

---

## Contact & Maintenance

**Project Owner:** The Notebook Café LLC
**Documentation Maintained By:** Development Team
**Last Updated:** 2025-11-23

**For questions or updates:**
- Review this index for navigation
- Check CLAUDE.md for comprehensive guidance
- Refer to individual documentation files for details

---

**🎯 Start Here:** [Project Overview](./project-overview.md) → [Architecture](./architecture.md) → [Development Guide](./development-guide.md)
