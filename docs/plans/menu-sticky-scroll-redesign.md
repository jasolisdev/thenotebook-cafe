# Menu Page Redesign: Sticky Scroll Navigation

## Overview

Redesign the menu page from a tab-based filtering system to a single-page layout with all sections visible and sticky navigation that scrolls to sections.

## Current State

- **Location**: `app/menu/page.tsx`
- **Components**: `MenuTabs.tsx`, `MenuSectionList.tsx`
- **Behavior**: Tabs filter content to show only one section (drinks/meals/desserts) at a time
- **Data**: `MENU_ITEMS` in `app/constants.ts` with `section` and `subcategory` fields

## Target State

All menu sections displayed on one scrollable page with:
1. Sticky navigation bar showing all sections
2. Active section highlighted based on scroll position
3. Smooth scroll-to-section on nav click
4. Mobile-responsive design

---

## Implementation Tasks

### Task 1: Create MenuScrollNav Component
**File**: `app/menu/_components/MenuScrollNav.tsx`

Create a new navigation component that:
- Displays all section names (Drinks, Meals, Desserts)
- Accepts `activeSection` prop for highlighting
- Accepts `onNavigate` callback for click handling
- Sticky positioning below site header
- Uses same styling foundation as current tabs but horizontal scroll on mobile

```tsx
// Key props interface
type MenuScrollNavProps = {
  sections: string[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};
```

---

### Task 2: Create useScrollSpy Hook
**File**: `app/menu/_hooks/useScrollSpy.ts`

Custom hook using Intersection Observer to track which section is in view:
- Observes all section elements by ID
- Returns currently visible section ID
- Configurable threshold and root margin
- Handles header offset for accurate detection

```tsx
// Key signature
function useScrollSpy(sectionIds: string[], options?: {
  rootMargin?: string;
  threshold?: number;
}): string | null;
```

---

### Task 3: Create MenuFullSection Component
**File**: `app/menu/_components/MenuFullSection.tsx`

Component to render a complete menu section with all its subcategories:
- Accepts section name and items
- Renders section header with ID for scroll targeting
- Groups items by subcategory
- Reuses existing `MenuSectionList` item rendering logic

```tsx
type MenuFullSectionProps = {
  sectionId: string;
  sectionTitle: string;
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  showPrices?: boolean;
};
```

---

### Task 4: Refactor Menu Page
**File**: `app/menu/page.tsx`

Update the main menu page to:

1. **Remove tab filtering logic**:
   - Remove `activeSection` state for filtering
   - Keep state only for scroll tracking

2. **Group all items by section and subcategory**:
   ```tsx
   const groupedBySection = useMemo(() => {
     return MENU_ITEMS.reduce((acc, item) => {
       if (!acc[item.section]) acc[item.section] = [];
       acc[item.section].push(item);
       return acc;
     }, {} as Record<string, MenuItem[]>);
   }, []);
   ```

3. **Render all sections**:
   - Drinks section (with "Coming Soon" placeholder if empty)
   - Meals section
   - Desserts section
   - Each with proper section ID for scroll targeting

4. **Integrate scroll spy**:
   ```tsx
   const activeSection = useScrollSpy(['drinks', 'meals', 'desserts'], {
     rootMargin: '-20% 0px -70% 0px'
   });
   ```

5. **Implement smooth scroll navigation**:
   ```tsx
   const scrollToSection = (sectionId: string) => {
     const element = document.getElementById(sectionId);
     if (!element) return;

     const headerHeight = readCssPxVariable('--site-header-height', 80);
     const navHeight = 60; // Sticky nav height
     const offset = headerHeight + navHeight + 16;

     const y = element.getBoundingClientRect().top + window.scrollY - offset;
     window.scrollTo({ top: y, behavior: 'smooth' });
   };
   ```

---

### Task 5: Update CSS Styles
**File**: `app/styles/pages/menu.css`

Add/update styles for:

1. **Sticky scroll nav**:
   ```css
   .menu-scroll-nav {
     position: sticky;
     z-index: 40;
     background: var(--color-cafe-white);
     border-bottom: 1px solid rgba(var(--cafe-beige-rgb), 0.2);
     backdrop-filter: blur(8px);
   }
   ```

2. **Section headers with scroll margin**:
   ```css
   .menu-section-anchor {
     scroll-margin-top: calc(var(--site-header-height, 80px) + 70px);
   }
   ```

3. **Section dividers**:
   ```css
   .menu-section-divider {
     margin: 4rem 0;
     border-top: 1px solid rgba(var(--cafe-tan-rgb), 0.3);
   }
   ```

4. **Active nav item indicator**:
   ```css
   .menu-nav-item[data-active="true"] {
     color: var(--color-cafe-black);
     border-bottom: 2px solid var(--color-cafe-tan);
   }
   ```

---

### Task 6: Handle Drinks "Coming Soon" State
**File**: `app/menu/page.tsx`

Since drinks section shows "Coming Soon":
- Render the placeholder within the drinks section
- Keep section visible in navigation
- User can still scroll to it or past it
- Style consistently with other sections

---

### Task 7: Mobile Optimizations

1. **Horizontal scrollable nav on mobile**:
   - Nav items scroll horizontally if needed
   - Active item auto-scrolls into view

2. **Touch-friendly targets**:
   - Min 44px tap targets for nav items
   - Adequate spacing between items

3. **Performance**:
   - Debounce scroll spy updates
   - Use passive scroll listeners

---

### Task 8: Accessibility

1. **ARIA attributes**:
   - `role="navigation"` on nav container
   - `aria-current="true"` on active nav item
   - Section landmarks with `aria-labelledby`

2. **Keyboard navigation**:
   - Tab through nav items
   - Enter/Space to activate scroll
   - Focus management after scroll

3. **Screen reader announcements**:
   - Announce section changes on scroll (optional, may be noisy)

---

### Task 9: Testing

1. **Unit tests** for `useScrollSpy` hook
2. **E2E tests** for:
   - Clicking nav item scrolls to section
   - Scrolling updates active nav item
   - Mobile horizontal scroll behavior

---

## File Changes Summary

| File | Action |
|------|--------|
| `app/menu/_components/MenuScrollNav.tsx` | Create |
| `app/menu/_hooks/useScrollSpy.ts` | Create |
| `app/menu/_components/MenuFullSection.tsx` | Create |
| `app/menu/page.tsx` | Major refactor |
| `app/menu/_components/MenuTabs.tsx` | Delete (replaced by MenuScrollNav) |
| `app/styles/pages/menu.css` | Update |

---

## Execution Order

1. Create `useScrollSpy` hook (independent, testable)
2. Create `MenuScrollNav` component (uses activeSection prop)
3. Create `MenuFullSection` component (renders single section)
4. Refactor `page.tsx` to integrate all components
5. Update CSS for new layout
6. Test on desktop and mobile
7. Clean up unused code (old MenuTabs if fully replaced)

---

## Design Decisions

### Why Intersection Observer over scroll event?
- Better performance (browser optimized)
- No throttling/debouncing needed
- Accurate detection even with async content

### Why keep section headers as h2?
- Maintains document outline
- Better screen reader navigation
- Consistent with current structure

### Why scroll-margin-top over offset calculation?
- CSS-native solution
- Works with `scroll-to` and anchor links
- Simpler to maintain

---

## Rollback Plan

If issues arise:
1. Current `MenuTabs.tsx` remains unchanged during development
2. Feature branch allows easy revert
3. Can toggle between implementations via feature flag if needed
