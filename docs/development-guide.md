# Development Guide
**The Notebook Café - Local Development Setup**

Generated: 2025-11-23
Project: Next.js 16 + Sanity CMS Web Application

---

## Prerequisites

### Required
- **Node.js:** Version 20.x or later
- **npm:** Version 10.x or later (comes with Node.js)
- **Git:** For version control

### Recommended
- **VS Code** or similar code editor
- **Modern browser** (Chrome, Firefox, Safari, Edge)

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd thenotebook-cafe
```

### 2. Install Dependencies
```bash
npm install
```

This installs all required packages:
- Next.js 16
- React 19
- Sanity CMS 4.11
- TypeScript 5
- Tailwind CSS 4.1
- And 37+ other dependencies

---

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the project root:

```bash
# Sanity CMS Configuration (REQUIRED)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_write_token

# Optional: Password Protection
SITE_PASSWORD=  # Leave empty to disable, or set a password for site-wide protection
```

**How to get Sanity credentials:**
1. Visit [sanity.io/manage](https://sanity.io/manage)
2. Select your project (or create one)
3. Copy the Project ID from settings
4. Generate an API token with Editor permissions for `SANITY_WRITE_TOKEN`

**Important:** After changing environment variables, restart the development server.

---

## Development Commands

### Start Development Server
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Sanity Studio CMS: http://localhost:3000/studio

**Features in dev mode:**
- Hot module replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- Automatic route updates

### Build for Production
```bash
npm run build
```
- Compiles TypeScript
- Optimizes assets and images
- Generates static pages
- Creates production bundle in `.next/` directory

### Start Production Server (Local)
```bash
npm start
```
- Runs the production build locally
- Must run `npm run build` first
- Serves on http://localhost:3000

### Lint Code
```bash
npm run lint
```
- Runs ESLint on the codebase
- Checks for code quality issues
- Follows Next.js ESLint rules

---

## Project Structure

### Key Directories for Development

| Directory | Purpose | When to Edit |
|-----------|---------|--------------|
| `app/` | Main application code | Always - pages, components, styles |
| `app/components/` | React components | Adding/editing UI components |
| `app/api/` | API routes | Adding backend endpoints |
| `app/styles/` | CSS files | Styling updates |
| `sanity/schemaTypes/` | Content schemas | Changing CMS data structure |
| `public/` | Static assets | Adding images, fonts, icons |

### Important Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout (global wrapper) |
| `app/page.tsx` | Homepage |
| `app/globals.css` | Global styles and CSS variables |
| `sanity/sanity.config.ts` | Sanity CMS configuration |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |

---

## Development Workflow

### Typical Development Flow

1. **Start dev server:** `npm run dev`
2. **Make changes** to files in `app/` or `sanity/`
3. **Save file** - changes appear automatically (HMR)
4. **Test in browser** at http://localhost:3000
5. **Commit changes** when ready

### Working with Components

**Location:** `app/components/[category]/ComponentName.tsx`

**Categories:**
- `layout/` - Global layout components (header, footer, scroll)
- `ui/` - Reusable UI components (buttons, cards, forms)
- `features/` - Feature-specific components (menu, newsletter)
- `decorative/` - Visual decorations (floating items)

**Example: Creating a new component**
```typescript
// app/components/ui/MyButton.tsx
export default function MyButton({ text }: { text: string }) {
  return <button className="btn-primary">{text}</button>;
}
```

### Working with Pages

**Location:** `app/[route-name]/page.tsx`

**Example: Adding a new page at /about**
```bash
mkdir app/about
touch app/about/page.tsx
```

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <main><h1>About Us</h1></main>;
}
```

The route will be automatically available at `/about`.

### Working with API Routes

**Location:** `app/api/[route-name]/route.ts`

**Example: Existing API routes**
- `app/api/subscribe/route.ts` - POST endpoint for newsletter
- `app/api/auth/verify/route.ts` - POST endpoint for password verification

**Creating new API route:**
```typescript
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' });
}
```

Available at: `http://localhost:3000/api/hello`

### Working with Sanity CMS

**Access Studio:** http://localhost:3000/studio

**Schema Location:** `sanity/schemaTypes/`

**Existing Schemas:**
- `homePage.ts` - Homepage content
- `aboutPage.ts` - About page content
- `menuItem.ts` - Menu items
- `subscriber.ts` - Newsletter subscribers
- `settings.ts` - Global site settings

**Editing Content:**
1. Go to http://localhost:3000/studio
2. Select content type from sidebar
3. Edit fields
4. Click "Publish"
5. Changes appear on frontend immediately

---

## Styling

### CSS Architecture

The project uses a hybrid styling approach:

1. **Tailwind CSS** - Utility classes for rapid development
2. **Custom CSS** - Component-specific and page-specific styles
3. **CSS Variables** - Defined in `app/globals.css`

### Adding Styles

**Option 1: Tailwind Utilities (Preferred)**
```tsx
<div className="flex items-center gap-4 p-6 bg-cream">
  Content
</div>
```

**Option 2: Custom CSS**
```css
/* app/styles/components/my-component.css */
.my-component {
  background: var(--cream);
  padding: var(--spacing-md);
}
```

Import in component:
```typescript
import '@/app/styles/components/my-component.css';
```

### CSS Variables

Defined in `app/globals.css`:
```css
--cream: #f4f0e9;              /* Light background */
--espresso-brown: #2a1f16;     /* Dark text */
--coffee-bean: #1a3636;        /* Dark sections */
--gold-primary: rgba(201, 154, 88, 1);  /* Accent color */
```

---

## Common Development Tasks

### Adding a New Menu Item

1. Go to http://localhost:3000/studio
2. Click "Menu Item" in sidebar
3. Click "Create new Menu Item"
4. Fill in fields (name, description, price, category)
5. Upload image (optional)
6. Publish

**OR** hardcode in `app/components/features/MenuContent.tsx`

### Updating Site Settings

1. Go to http://localhost:3000/studio
2. Click "Settings" in sidebar
3. Edit fields (Instagram URL, hours, address, etc.)
4. Publish

### Adding Images

1. Place image in `public/` directory (e.g., `public/images/new-image.jpg`)
2. Reference in code:
```tsx
<Image src="/images/new-image.jpg" alt="Description" width={800} height={600} />
```

### Hot Reload Not Working?

1. Stop dev server (Ctrl+C)
2. Delete `.next/` folder: `rm -rf .next`
3. Restart: `npm run dev`

### TypeScript Errors?

```bash
# Check TypeScript errors
npx tsc --noEmit

# Auto-fix import/formatting issues
npm run lint --fix
```

---

## Testing

**Current Status:** No automated tests configured

**Recommended for future:**
- Jest + React Testing Library for component tests
- Playwright or Cypress for E2E tests

**Manual Testing Checklist:**
- [ ] Test all pages: Home, Menu, Story, Events
- [ ] Test mobile navigation (< 640px width)
- [ ] Test Sanity Studio CMS
- [ ] Test newsletter subscription
- [ ] Test password protection (if enabled)
- [ ] Test responsive design (320px - 1920px+)

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Sanity Studio Not Loading
1. Check `.env.local` has correct `NEXT_PUBLIC_SANITY_PROJECT_ID`
2. Verify you're logged into Sanity: `npx sanity login`
3. Check network tab for API errors

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### CSS Not Updating
1. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
2. Check CSS import order in component
3. Restart dev server

---

## Code Quality

### ESLint Rules
- Follows `eslint-config-next` standards
- TypeScript strict mode enabled
- Unused variables flagged as warnings

### Code Style
- Use TypeScript for all new files
- Prefer functional components
- Use async/await over promises
- Follow existing file organization patterns

### Component Guidelines
- One component per file
- Use meaningful names (PascalCase)
- Add JSDoc comments for complex components
- Keep components focused (single responsibility)

---

## Performance Tips

1. **Use Next.js Image Component**
   - Automatic optimization
   - Lazy loading
   - Responsive srcsets

2. **Server Components by Default**
   - Only add `"use client"` when needed
   - Reduces JavaScript sent to browser

3. **Import Only What You Need**
   ```typescript
   // ✅ Good
   import { Button } from '@/app/components/ui/Button';

   // ❌ Avoid
   import * as Components from '@/app/components';
   ```

---

## Additional Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

**Project-Specific Docs:**
- `CLAUDE.md` - Comprehensive developer guide for Claude Code
- `README.md` - Project overview and quick start
- `REFACTORING_SUMMARY.md` - Recent refactoring changes
- `CSS_ORGANIZATION.md` - CSS architecture details

---

**Last Updated:** 2025-11-23
**Maintained By:** The Notebook Café Development Team
