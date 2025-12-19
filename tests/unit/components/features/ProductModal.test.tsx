/**
 * Unit tests for ProductModal
 */

import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductModal } from '@/app/components/features/ProductModal';
import type { CartItem, MenuItem } from '@/app/types';
import { useCart } from '@/app/components/providers/CartProvider';

const addItem = vi.fn();
const updateItem = vi.fn();

vi.mock('@/app/components/providers/CartProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/app/components/providers/CartProvider')>();
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      alt={props.alt}
      {...Object.fromEntries(
        Object.entries(props).filter(([key]) => !['fill', 'priority'].includes(key))
      )}
    />
  ),
}));

const baseItem: MenuItem = {
  id: 'latte-1',
  name: 'Latte',
  description: 'Classic latte',
  price: '$5.00',
  section: 'drinks',
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useCart).mockReturnValue({
    addItem,
    updateItem,
  } as ReturnType<typeof useCart>);
});

describe('ProductModal', () => {
  test('renders nothing when item is null', () => {
    render(<ProductModal item={null} onClose={vi.fn()} />);

    expect(screen.queryByText('Add to Order')).not.toBeInTheDocument();
  });

  test('updates price when selecting a modifier', () => {
    render(<ProductModal item={baseItem} onClose={vi.fn()} />);

    fireEvent.click(screen.getByText('16oz'));

    const button = screen.getByRole('button', { name: /add to order/i });
    expect(button).toHaveTextContent('$5.75');
  });

  test('adds item with default required modifiers', () => {
    const onClose = vi.fn();

    render(<ProductModal item={baseItem} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /add to order/i }));

    expect(addItem).toHaveBeenCalledWith(
      baseItem,
      1,
      expect.arrayContaining([
        expect.objectContaining({ optionLabel: '12oz' }),
        expect.objectContaining({ optionLabel: 'Hot' }),
        expect.objectContaining({ optionLabel: 'Whole Milk' }),
      ]),
      '',
      expect.any(Number)
    );
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onAddToOrder when provided (instead of CartProvider)', () => {
    const onClose = vi.fn();
    const onAddToOrder = vi.fn();

    render(
      <ProductModal item={baseItem} onClose={onClose} onAddToOrder={onAddToOrder} />
    );

    fireEvent.click(screen.getByRole('button', { name: /add to order/i }));

    expect(onAddToOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        id: baseItem.id,
        name: baseItem.name,
        quantity: 1,
      })
    );
    expect(addItem).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  test('updates item when editing', () => {
    const onClose = vi.fn();
    const editingItem: CartItem = {
      ...baseItem,
      cartId: 'cart-1',
      modifiers: [
        { groupId: 'size', groupName: 'Size', optionLabel: '16oz', priceDelta: 0.75 },
      ],
      notes: 'extra hot',
      totalPrice: 5.75,
      quantity: 2,
    };

    render(
      <ProductModal item={baseItem} onClose={onClose} editingItem={editingItem} />
    );

    fireEvent.click(screen.getByRole('button', { name: /update order/i }));

    expect(updateItem).toHaveBeenCalledWith(
      'cart-1',
      2,
      expect.arrayContaining([
        expect.objectContaining({ optionLabel: '16oz' }),
      ]),
      'extra hot'
    );
    expect(onClose).toHaveBeenCalled();
  });

  test('closes when overlay is clicked', () => {
    const onClose = vi.fn();

    render(<ProductModal item={baseItem} onClose={onClose} />);

    fireEvent.click(screen.getByTestId('product-modal-overlay'));
    expect(onClose).toHaveBeenCalled();
  });

  test('supports notes entry and quantity changes', () => {
    render(<ProductModal item={baseItem} onClose={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/extra hot/i), {
      target: { value: 'no foam' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add to order/i }));

    expect(addItem).toHaveBeenCalledWith(
      baseItem,
      1,
      expect.any(Array),
      'no foam',
      expect.any(Number)
    );
  });

  test('prevents quantity from dropping below 1', () => {
    render(<ProductModal item={baseItem} onClose={vi.fn()} />);

    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    fireEvent.click(screen.getByRole('button', { name: /add to order/i }));

    expect(addItem).toHaveBeenCalledWith(
      baseItem,
      1,
      expect.any(Array),
      '',
      expect.any(Number)
    );
  });

  test('renders non-ordering state with close action', () => {
    const onClose = vi.fn();

    render(
      <ProductModal item={baseItem} onClose={onClose} orderingEnabled={false} />
    );

    expect(
      screen.getByText(/online ordering is coming soon/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^close$/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
