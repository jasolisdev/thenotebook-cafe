"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, MenuItem, SelectedModifier } from "@/app/types";

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (item: MenuItem, quantity: number, modifiers: SelectedModifier[], notes?: string, totalPrice?: number) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  updateItem: (cartId: string, quantity: number, modifiers: SelectedModifier[], notes?: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const addItem = (
    item: MenuItem,
    quantity: number,
    modifiers: SelectedModifier[],
    notes?: string,
    totalPriceOverride?: number,
  ) => {
    const totalPrice =
      totalPriceOverride ??
      quantity *
        (parseFloat(item.price.replace("$", "")) +
          modifiers.reduce((acc, m) => acc + m.priceDelta, 0));

    // Check if identical item already exists (same id, modifiers, and notes)
    setItems((prev) => {
      // Helper to compare modifiers
      const modifiersMatch = (a: SelectedModifier[], b: SelectedModifier[]) => {
        if (a.length !== b.length) return false;
        const aSorted = [...a].sort((x, y) => `${x.groupId}${x.optionLabel}`.localeCompare(`${y.groupId}${y.optionLabel}`));
        const bSorted = [...b].sort((x, y) => `${x.groupId}${x.optionLabel}`.localeCompare(`${y.groupId}${y.optionLabel}`));
        return aSorted.every((mod, i) =>
          mod.groupId === bSorted[i].groupId &&
          mod.optionLabel === bSorted[i].optionLabel &&
          mod.priceDelta === bSorted[i].priceDelta
        );
      };

      // Find existing identical item
      const existingIndex = prev.findIndex((cartItem) =>
        cartItem.id === item.id &&
        (cartItem.notes || '') === (notes || '') &&
        modifiersMatch(cartItem.modifiers, modifiers)
      );

      if (existingIndex !== -1) {
        // Identical item exists - increment quantity
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQuantity = existing.quantity + quantity;
        const basePrice = parseFloat(existing.price.replace("$", ""));
        const modifierTotal = existing.modifiers.reduce((sum, mod) => sum + mod.priceDelta, 0);
        updated[existingIndex] = {
          ...existing,
          quantity: newQuantity,
          totalPrice: (basePrice + modifierTotal) * newQuantity,
        };
        return updated;
      } else {
        // New unique item - add to cart
        const cartItem: CartItem = {
          ...item,
          cartId: Math.random().toString(36).slice(2, 11),
          modifiers,
          notes: notes || '',
          totalPrice,
          quantity,
        };
        return [...prev, cartItem];
      }
    });
    // Cart badge will update automatically via cart-count-change event
    // User can open cart manually via cart icon
  };

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    setItems((prev) => {
      return prev.reduce<CartItem[]>((acc, item) => {
        if (item.cartId !== cartId) {
          acc.push(item);
          return acc;
        }
        const nextQty = Math.max(0, quantity);
        if (nextQty < 1) {
          return acc; // remove item if quantity drops below 1
        }
        const basePrice = parseFloat(item.price.replace("$", ""));
        const modifierTotal = item.modifiers.reduce((sum, mod) => sum + mod.priceDelta, 0);
        const totalPrice = (basePrice + modifierTotal) * nextQty;
        acc.push({ ...item, quantity: nextQty, totalPrice });
        return acc;
      }, []);
    });
  };

  const updateItem = (cartId: string, quantity: number, modifiers: SelectedModifier[], notes?: string) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.cartId !== cartId) {
          return item;
        }
        const basePrice = parseFloat(item.price.replace("$", ""));
        const modifierTotal = modifiers.reduce((sum, mod) => sum + mod.priceDelta, 0);
        const totalPrice = (basePrice + modifierTotal) * quantity;
        return {
          ...item,
          quantity,
          modifiers,
          notes: notes || '',
          totalPrice,
        };
      });
    });
  };

  const clear = () => setItems([]);

  // Body flags for overlays / scroll lock / barista suppression
  useEffect(() => {
    const body = document.body;
    body.dataset.cartOpen = isOpen ? "true" : "false";
    if (isOpen) {
      body.style.overflow = "hidden";
    } else if (body.dataset.modalOpen !== "true" && body.dataset.navOpen !== "true") {
      body.style.overflow = "";
    }
  }, [isOpen]);

  // Broadcast cart count for header badge fallback
  useEffect(() => {
    const body = document.body;
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    body.dataset.cartCount = String(totalCount);
    window.dispatchEvent(new CustomEvent("cart-count-change", { detail: totalCount }));
  }, [items]);

  const value = useMemo(
    () => ({
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
    }),
    [items, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
