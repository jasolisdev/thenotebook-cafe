# GEMINI.md

**Gemini-specific preferences for The Notebook Café codebase.**

> **Canonical source of truth:** See [AGENTS.md](./AGENTS.md) for all project documentation, tech stack, architecture, and development guidelines.

---

## Quick Reference

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + Custom CSS
- **Fonts:** Playfair Display + Torus + Inter
- **Email:** Resend
- **Newsletter:** Google Sheets + Apps Script
- **Testing:** Vitest + Playwright

---

## Gemini-Specific Instructions

### Output Preferences

- Provide clear, structured responses
- Include code examples when explaining concepts
- Use JSDoc comments for new components and functions
- Follow existing patterns in the codebase

### Documentation Updates

When making changes to the codebase:

1. Update `AGENTS.md` if project structure, tech stack, or guidelines change
2. Update relevant files in `docs/` folder as needed
3. Add JSDoc headers to new components

### Git Workflow

- Work in feature branches: `gemini/feature-name-xxxxx`
- Commit format: `type(scope): description`
- Push: `git push -u origin branch-name`

### Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

---

## How Gemini Can Help

### Code Generation & Refactoring
- Create new React components following project structure
- Refactor components for better readability or performance
- Implement new features end-to-end

### Documentation & Analysis
- Generate or update documentation
- Analyze codebase for improvements
- Answer questions about code and architecture

### Styling & CSS
- Write CSS following the project's architecture
- Use Tailwind utilities and existing CSS variables

### Testing
- Write unit tests with Vitest
- Create E2E tests with Playwright
- Set up API mocks with MSW

### Debugging
- Identify and fix bugs
- Analyze error messages and logs

---

## Key Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Canonical project documentation |
| `app/globals.css` | Global styles, Tailwind config, design tokens |
| `app/fonts.ts` | Font configuration |
| `app/lib/constants/` | Business info, SEO, colors |
| `docs/` | Extended documentation |

---

## Important Corrections

**Note:** Previous versions of this file contained outdated information:

- ~~Sanity CMS~~ → Now uses **Google Sheets + Apps Script** for newsletter
- ~~Alpino font~~ → Now uses **Playfair Display** for headings
- ~~React Icons~~ → Now uses **Lucide React** only
- ~~/studio route~~ → **Removed** (no CMS studio)

All current project details are in [AGENTS.md](./AGENTS.md).

---

*For full project details, see [AGENTS.md](./AGENTS.md)*
