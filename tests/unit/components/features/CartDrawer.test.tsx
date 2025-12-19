/**
 * Unit tests for CartDrawer
 */

import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/utils/test-utils';
import { CartDrawer } from '@/app/components/features/CartDrawer';
import type { CartItem } from '@/app/types';

const open = vi.fn();
const close = vi.fn();
const removeItem = vi.fn();
const updateQuantity = vi.fn();

vi.mock('@/app/components/providers/CartProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/app/components/providers/CartProvider')>();
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={props.alt} {...Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'fill'))} />
  ),
}));

vi.mock('@/app/components/features/ProductModal', () => ({
  ProductModal: ({ onClose }: { onClose: () => void }) => (
    <div>
      <p>Product modal</p>
      <button type="button" onClick={onClose}>
        close-modal
      </button>
    </div>
  ),
}));

const { useCart } = await import('@/app/components/providers/CartProvider');

const baseItem: CartItem = {
  id: 'latte-1',
  cartId: 'cart-1',
  name: 'Latte',
  description: 'Classic latte',
  price: '$5.00',
  section: 'drinks',
  modifiers: [{ groupId: 'size', groupName: 'Size', optionLabel: 'Large', priceDelta: 1 }],
  notes: 'extra hot',
  totalPrice: 12,
  quantity: 2,
};

const makeCartState = (overrides?: Partial<ReturnType<typeof useCart>>) => ({
  items: [],
  isOpen: true,
  open,
  close,
  removeItem,
  updateQuantity,
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CartDrawer', () => {
  test('renders nothing when closed', () => {
    vi.mocked(useCart).mockReturnValue(
      makeCartState({ isOpen: false, items: [] })
    );

    render(<CartDrawer />);

    expect(screen.queryByText('Your Order')).not.toBeInTheDocument();
  });

  test('renders empty state when cart is empty', () => {
    vi.mocked(useCart).mockReturnValue(makeCartState({ items: [] }));

    render(<CartDrawer />);

    expect(screen.getByText('Your bag is empty')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled();
  });

  test('renders items and totals when cart has entries', () => {
    vi.mocked(useCart).mockReturnValue(makeCartState({ items: [baseItem] }));

    render(<CartDrawer />);

    expect(screen.getByText('Latte')).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getAllByText('$12.00')).toHaveLength(2);
    expect(screen.getByText('$0.96')).toBeInTheDocument();
    expect(screen.getByText('$12.96')).toBeInTheDocument();
  });

  test('updates quantity and removes items', () => {
    vi.mocked(useCart).mockReturnValue(makeCartState({ items: [baseItem] }));

    render(<CartDrawer />);

    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(updateQuantity).toHaveBeenCalledWith('cart-1', 1);

    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(updateQuantity).toHaveBeenCalledWith('cart-1', 3);

    fireEvent.click(screen.getByText('Remove'));
    expect(removeItem).toHaveBeenCalledWith('cart-1');
  });

  test('disables decrement when quantity is one', () => {
    vi.mocked(useCart).mockReturnValue(
      makeCartState({ items: [{ ...baseItem, quantity: 1, totalPrice: 6 }] })
    );

    render(<CartDrawer />);

    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
  });

  test('opens cart on open-cart event', () => {
    vi.mocked(useCart).mockReturnValue(makeCartState({ items: [] }));

    render(<CartDrawer />);

    window.dispatchEvent(new Event('open-cart'));

    expect(open).toHaveBeenCalled();
  });

  test('opens edit modal and restores cart on close', () => {
    vi.mocked(useCart).mockReturnValue(makeCartState({ items: [baseItem] }));

    render(<CartDrawer />);

    fireEvent.click(screen.getByText('Edit'));
    expect(close).toHaveBeenCalled();
    expect(screen.getByText('Product modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('close-modal'));
    expect(open).toHaveBeenCalled();
  });
});
