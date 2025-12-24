# Client Utilities

Client-safe utility functions that can be used in both client and server components.

## ✅ Safe for Client

All code in this directory is safe for client-side use:
- No sensitive data
- No server-only APIs
- No Node.js dependencies
- Can be imported in `"use client"` components

## Current Utilities

### ampersandUtils.tsx

Typography utility for styling ampersands (`&`).

**Features:**
- Wraps `&` in styled spans
- Uses Playfair Display font
- Visual enhancement for headings

**Usage:**
```tsx
import { replaceAmpersands } from '@/app/utils/ampersandUtils';

function Heading() {
  return <h1>{replaceAmpersands("Coffee & Community")}</h1>;
}

// Renders: Coffee <span class="ampersand">&</span> Community
```

**Example:**
```tsx
// Before:
<h1>The Notebook Café & Coffee</h1>

// After:
<h1>{replaceAmpersands("The Notebook Café & Coffee")}</h1>
```

## Planned Utilities

Future utilities to add (Phase 2):

### formatters.ts (Planned)

Date, currency, and text formatting.

```typescript
// Planned usage:
import { formatCurrency, formatDate } from '@/app/utils/formatters';

const price = formatCurrency(5.50); // "$5.50"
const date = formatDate(new Date()); // "Dec 23, 2025"
```

## Best Practices

1. **Client-safe only** - No server-only code
2. **Pure functions** - Avoid side effects
3. **Type-safe** - Use TypeScript
4. **Well-documented** - Add JSDoc comments
5. **Small and focused** - One utility per file
6. **Testable** - Write unit tests

## Utilities vs Lib

### Use `app/utils/` when:
- ✅ Function is client-safe
- ✅ Can run in browser
- ✅ No sensitive data
- ✅ Used in client components

### Use `app/lib/` when:
- ⛔ Server-only code
- ⛔ Uses Node.js APIs
- ⛔ Contains secrets/tokens
- ⛔ Security utilities

## Import Convention

```typescript
// ✅ Good - Client components
"use client";
import { replaceAmpersands } from '@/app/utils/ampersandUtils';

// ✅ Good - Server components
import { replaceAmpersands } from '@/app/utils/ampersandUtils';

// Both work! Utils are client-safe.
```

## Testing

Write unit tests for all utilities:

```typescript
// ampersandUtils.test.tsx
import { replaceAmpersands } from './ampersandUtils';

test('replaces ampersands with styled spans', () => {
  const result = replaceAmpersands('A & B');
  // Assert styled span is present
});
```

## Adding New Utilities

1. Create new file in `app/utils/`
2. Add JSDoc documentation
3. Export functions
4. Add to `index.ts` barrel (when created)
5. Write tests
6. Update this README

## Future Structure

Planned organization:
```
utils/
├── ampersandUtils.tsx    # Typography
├── formatters.ts         # Date/currency/text formatting
├── validators.ts         # Client-side validation
├── index.ts              # Barrel export
└── README.md             # This file
```
