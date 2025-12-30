# Type Definitions

TypeScript type definitions organized by domain. All types are exported through a barrel export for convenient importing.

## Organization

Types are split into domain-specific files:

```
types/
├── index.ts      # Barrel export (import from here)
├── menu.ts       # Menu, cart, and product types
├── api.ts        # API request/response types
├── forms.ts      # Form data types
└── common.ts     # Shared utility types
```

## Import Convention

Always import from the barrel export:

```typescript
// ✅ Good - Use barrel export
import { MenuItem, CartItem, ContactFormData } from '@/app/types';

// ❌ Avoid - Direct file imports
import { MenuItem } from '@/app/types/menu';
import { ContactFormData } from '@/app/types/forms';
```

## Type Files

### menu.ts

Menu items, modifiers, and cart functionality.

**Types:**
- `MenuItem` - Menu item definition
- `SelectedModifier` - User-selected modifier
- `CartItem` - Cart item with modifiers and quantity
- `ViewState` - Menu navigation state
- `ModifierOption` - Modifier choice option
- `ModifierGroup` - Group of modifiers

**Usage:**
```typescript
import { MenuItem, CartItem } from '@/app/types';

const item: MenuItem = {
  id: 'latte-1',
  name: 'Latte',
  description: 'Classic latte',
  price: '5.50',
  section: 'drinks',
};

const cartItem: CartItem = {
  ...item,
  cartId: 'cart-123',
  quantity: 2,
  modifiers: [],
  notes: '',
  totalPrice: 11.00,
};
```

---

### api.ts

API endpoint request and response types.

**Types:**
- `ApiResponse<T>` - Generic API response wrapper
- `SubscribeResponse` - Newsletter subscription response
- `ContactResponse` - Contact form submission response

**Usage:**
```typescript
import { SubscribeResponse, ContactResponse } from '@/app/types';

const response: SubscribeResponse = {
  ok: true,
  duplicate: false,
  id: 'sub-123',
};

const contactResp: ContactResponse = {
  ok: true,
  id: 'msg-456',
};
```

---

### forms.ts

Form submission data types.

**Types:**
- `ContactFormData` - Contact form fields
- `SubscribeFormData` - Newsletter subscription form
- `ApplicationFormData` - Job application form

**Usage:**
```typescript
import { ContactFormData, SubscribeFormData } from '@/app/types';

const contactData: ContactFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'General Inquiry',
  message: 'Hello...',
};

const subscribeData: SubscribeFormData = {
  email: 'user@example.com',
  source: 'homepage',
};
```

---

### common.ts

Shared utility types.

**Types:**
- `DeepPartial<T>` - Make all properties optional recursively
- `RequireFields<T, K>` - Make specific properties required
- `Awaited<T>` - Extract promise resolve type

**Usage:**
```typescript
import { DeepPartial, RequireFields } from '@/app/types';

type PartialUser = DeepPartial<User>;
type RequiredEmail = RequireFields<User, 'email'>;
```

---

## Adding New Types

1. **Determine domain** - Which file should contain this type?
2. **Add to appropriate file** - Add type with JSDoc
3. **Export in barrel** - Add to `index.ts`
4. **Document here** - Update this README

### Example: Adding a new type

```typescript
// 1. Add to appropriate file (e.g., forms.ts)
/**
 * Reservation form submission data
 */
export interface ReservationFormData {
  name: string;
  email: string;
  date: string;
  partySize: number;
}

// 2. Export in index.ts
export type {
  // ... existing exports
  ReservationFormData,
} from './forms';

// 3. Use anywhere
import { ReservationFormData } from '@/app/types';
```

## Best Practices

1. **Export types only** - Use `export type` instead of `export`
2. **Document with JSDoc** - Add description comments
3. **Use interfaces for objects** - Prefer `interface` over `type` for object shapes
4. **Use type for unions** - Use `type` for union types
5. **Avoid `any`** - Use `unknown` or proper types
6. **Be specific** - Use literal types (`'subscribed' | 'unsubscribed'`) over strings
7. **Keep it DRY** - Extend or compose types instead of duplicating

## Type vs Interface

### Use `interface` when:
- ✅ Defining object shapes
- ✅ Might need to extend later
- ✅ Representing data structures

```typescript
interface MenuItem {
  id: string;
  name: string;
  price: string;
}
```

### Use `type` when:
- ✅ Creating unions or intersections
- ✅ Aliasing primitives
- ✅ Utility types

```typescript
type ViewState = 'HOME' | 'MENU';
type PartialMenuItem = Partial<MenuItem>;
```

## Testing with Types

Types are checked at compile time. Ensure:
- `npm run build` passes without type errors
- IDE shows no type errors
- All imports resolve correctly

## Migration from Old Structure

Previously, all types lived in `app/types.ts`. Now they're organized by domain in `app/types/*.ts` with a barrel export.

**Old:**
```typescript
import { MenuItem } from '@/app/types';
```

**New:**
```typescript
import { MenuItem } from '@/app/types'; // Same! Uses barrel export
```

No changes needed in consuming code - the barrel export maintains backward compatibility.
