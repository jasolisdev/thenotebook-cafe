/**
 * Unit tests for CartProvider
 */

import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/tests/utils/test-utils';
import { useCart } from '@/app/components/providers/CartProvider';
import type { MenuItem, SelectedModifier } from '@/app/types';

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

  test('adds items with modifiers and calculates total price', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-modifier'));

    expect(screen.getByTestId('modifier-count')).toHaveTextContent('1');
    expect(screen.getByTestId('quantity')).toHaveTextContent('2');
    expect(screen.getByTestId('total')).toHaveTextContent('13');
  });

  test('updates item modifiers and notes', () => {
    render(<CartConsumer />);

    fireEvent.click(screen.getByText('add-base'));
    fireEvent.click(screen.getByText('update-item'));

    expect(screen.getByTestId('quantity')).toHaveTextContent('3');
    expect(screen.getByTestId('modifier-count')).toHaveTextContent('1');
    expect(screen.getByTestId('notes')).toHaveTextContent('updated');
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
