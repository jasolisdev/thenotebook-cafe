# Provider Components

React Context providers for global state management.

## CartProvider.tsx

Shopping cart state management provider.

### Features

- **Cart State**: Manages cart items with localStorage persistence
- **Cart Actions**: Add, remove, update items
- **Drawer State**: Controls cart drawer open/close
- **Price Calculation**: Calculates totals with modifiers

### Usage

Wrap your app with CartProvider:

```tsx
import { CartProvider } from '@/app/components/providers/CartProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

Use the cart hook in components:

```tsx
import { useCart } from '@/app/components/providers/CartProvider';

function MyComponent() {
  const { items, addItem, removeItem, open, close } = useCart();

  // Access cart state and actions
  const itemCount = items.length;

  return (
    <button onClick={open}>
      Cart ({itemCount})
    </button>
  );
}
```

### API

#### State
- `items: CartItem[]` - Array of cart items
- `isOpen: boolean` - Cart drawer open state

#### Actions
- `open()` - Open cart drawer
- `close()` - Close cart drawer
- `toggle()` - Toggle cart drawer
- `addItem(item, quantity, modifiers, notes, totalPrice)` - Add item to cart
- `removeItem(cartId)` - Remove item from cart
- `updateQuantity(cartId, quantity)` - Update item quantity
- `updateItem(cartId, quantity, modifiers, notes)` - Update item details
- `clear()` - Clear all items from cart

### Data Persistence

Cart items are automatically persisted to localStorage:
- Key: `notebook-cafe-cart`
- Rehydrates on page load
- Syncs across tabs

### Item Structure

Each cart item includes:
```typescript
{
  cartId: string;           // Unique cart item ID
  ...menuItem,              // All menu item properties
  quantity: number;         // Item quantity
  modifiers: SelectedModifier[];  // Selected modifiers
  notes: string;            // Customer notes
  totalPrice: number;       // Calculated total
}
```

## Best Practices

1. **Use the hook** - Always use `useCart()` instead of accessing context directly
2. **Unique cartIds** - Each cart item gets a unique ID for editing
3. **Persist carefully** - localStorage has limits, keep data minimal
4. **Error handling** - Handle localStorage errors gracefully
5. **Type safety** - Use TypeScript types from `@/app/types`
