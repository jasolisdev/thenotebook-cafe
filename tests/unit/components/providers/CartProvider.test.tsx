/**
 * Unit tests for CartProvider
 */

import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/tests/utils/test-utils';
import { useCart } from '@/app/components/providers/CartProvider';
import type { MenuItem, SelectedModifier } from '@/app/types';
import { render as rtlRender } from '@testing-library/react';

const baseItem: MenuItem = {
  id: 'latte-1',
  name: 'Latte',
  description: 'Classic latte',
  price: '$5.00',
  section: 'drinks',
};

const sizeModifier: SelectedModifier = {
  groupId: 'size',
  groupName: 'Size',
  optionLabel: 'Large',
  priceDelta: 1.5,
};

function CartConsumer() {
  const {
    items,
    isOpen,
    open,
    close,
    toggle,
    addItem,
    removeItem,
    updateQuantity,
    updateItem,
    clear,
  } = useCart();

  const firstItem = items[0];

  return (
    <div>
      <div data-testid="count">{items.length}</div>
      <div data-testid="quantity">{firstItem?.quantity ?? 0}</div>
      <div data-testid="total">{firstItem?.totalPrice ?? 0}</div>
      <div data-testid="notes">{firstItem?.notes ?? ''}</div>
      <div data-testid="modifier-count">{firstItem?.modifiers.length ?? 0}</div>
      <div data-testid="cart-id">{firstItem?.cartId ?? ''}</div>
      <div data-testid="is-open">{isOpen ? 'open' : 'closed'}</div>

      <button type="button" onClick={() => open()}>
        open
      </button>
      <button type="button" onClick={() => close()}>
        close
      </button>
      <button type="button" onClick={() => toggle()}>
        toggle
      </button>
      <button
        type="button"
        onClick={() => addItem(baseItem, 1, [], 'no foam')}
      >
        add-base
      </button>
      <button
        type="button"
        onClick={() => addItem(baseItem, 2, [sizeModifier], 'extra hot')}
      >
        add-modifier
      </button>
      <button
        type="button"
        onClick={() => addItem(baseItem, 1, [], 'no foam')}
      >
        add-duplicate
      </button>
      <button
        type="button"
        onClick={() =>
          firstItem ? updateQuantity(firstItem.cartId, 0) : undefined
        }
      >
        remove-quantity
      </button>
      <button
        type="button"
        onClick={() =>
          firstItem ? updateQuantity(firstItem.cartId, -5) : undefined
        }
      >
        negative-quantity
      </button>
      <button
        type="button"
        onClick={() =>
          firstItem
            ? updateItem(firstItem.cartId, 3, [sizeModifier], 'updated')
            : undefined
        }
      >
        update-item
      </button>
      <button
        type="button"
        onClick={() => (firstItem ? removeItem(firstItem.cartId) : undefined)}
      >
        remove-item
      </button>
      <button type="button" onClick={() => clear()}>
        clear
      </button>
    </div>
  );
}

describe('CartProvider', () => {
  test('provides an empty cart initially', () => {
    render(<CartConsumer />);

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(document.body.dataset.cartCount).toBe('0');
  });

  test('throws when useCart is used outside provider', () => {
    function BadConsumer() {
      useCart();
      return null;
    }

    expect(() => rtlRender(<BadConsumer />)).toThrow(
      'useCart must be used within CartProvider'
    );
  });

  test('adds items and merges duplicates', async () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('add-duplicate'));

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('quantity')).toHaveTextContent('2');
    await waitFor(() => {
      expect(document.body.dataset.cartCount).toBe('2');
    });
  });

  test('does not merge items with different notes', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('add-modifier'));

    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  test('generates a cartId for new items', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    expect(screen.getByTestId('cart-id')).not.toHaveTextContent('');
  });

  test('adds items with modifiers and calculates total price', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-modifier'));

    expect(screen.getByTestId('modifier-count')).toHaveTextContent('1');
    expect(screen.getByTestId('quantity')).toHaveTextContent('2');
    expect(screen.getByTestId('total')).toHaveTextContent('13');
  });

  test('broadcasts cart-count-change event', async () => {
    const listener = vi.fn();
    window.addEventListener('cart-count-change', listener as EventListener);

    try {
      render(<CartConsumer />);
      fireEvent.click(screen.getByText('add-base'));

      await waitFor(() => {
        expect(listener).toHaveBeenCalled();
      });

      const event = listener.mock.calls.at(-1)?.[0] as CustomEvent<number>;
      expect(event.detail).toBe(1);
    } finally {
      window.removeEventListener('cart-count-change', listener as EventListener);
    }
  });

  test('updates item modifiers and notes', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('update-item'));

    expect(screen.getByTestId('quantity')).toHaveTextContent('3');
    expect(screen.getByTestId('modifier-count')).toHaveTextContent('1');
    expect(screen.getByTestId('notes')).toHaveTextContent('updated');
  });

  test('clamps negative quantities to removal', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('negative-quantity'));

    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  test('removes items via quantity update and clear', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('remove-quantity'));

    expect(screen.getByTestId('count')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('clear'));

    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  test('opens, closes, and toggles cart state', async () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('open'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('open');
    await waitFor(() => {
      expect(document.body.dataset.cartOpen).toBe('true');
    });
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('closed');

    fireEvent.click(screen.getByText('close'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('closed');
  });

  test('removes item directly', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('remove-item'));

    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});
