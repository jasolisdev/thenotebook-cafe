import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity: number, modifiers: Record<string, string[]>, notes: string, price: number) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage on mount (optional, nice for UX)
  useEffect(() => {
    const saved = localStorage.getItem('tnc-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tnc-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen]);

  const addItem = (item: MenuItem, quantity: number, modifiers: Record<string, string[]>, notes: string, price: number) => {
    const cartId = Math.random().toString(36).substring(7);
    const newItem: CartItem = {
      cartId,
      item,
      quantity,
      modifiers,
      notes,
      totalPrice: price
    };
    setItems(prev => [...prev, newItem]);
    openCart();
  };

  const removeItem = (cartId: string) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartId);
      return;
    }
    setItems(prev => prev.map(i => {
      if (i.cartId === cartId) {
        // Calculate unit price derived from total price (approx)
        const unitPrice = i.totalPrice / i.quantity;
        return { ...i, quantity, totalPrice: unitPrice * quantity };
      }
      return i;
    }));
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const subtotal = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const count = items.reduce((acc, curr) => acc + curr.quantity, 0);

  // Listen for global open-cart event
  useEffect(() => {
    const handleGlobalOpen = () => openCart();
    window.addEventListener('open-cart', handleGlobalOpen);
    return () => window.removeEventListener('open-cart', handleGlobalOpen);
  }, []);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      isCartOpen, openCart, closeCart,
      subtotal, count
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};