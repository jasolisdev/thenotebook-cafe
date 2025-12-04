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

    const cartItem: CartItem = {
      ...item,
      cartId: Math.random().toString(36).slice(2, 11),
      modifiers,
      notes: notes || '',
      totalPrice,
      quantity,
    };
    setItems((prev) => [...prev, cartItem]);
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
    body.dataset.cartCount = String(items.length);
    window.dispatchEvent(new CustomEvent("cart-count-change", { detail: items.length }));
  }, [items.length]);

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
