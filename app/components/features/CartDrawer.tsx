'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Trash2, Minus, Plus, Edit2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../providers/CartProvider';
import { ProductModal } from './ProductModal';
import { CartItem } from '@/app/types';
import { COLORS } from '@/app/lib/constants/colors';

// Use shared colors for consistency across the app
const colors = COLORS;

export const CartDrawer: React.FC = () => {
  const { items: cart, isOpen, open, close, removeItem, updateQuantity } = useCart();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger animation when drawer opens
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      // Small delay to ensure CSS transition triggers
      timer = setTimeout(() => setIsAnimating(true), 10);
    } else {
      // Reset animation state immediately when closing
      timer = setTimeout(() => setIsAnimating(false), 0);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Listen for global 'open-cart' events (triggered by cart icon in header)
  useEffect(() => {
    const handleOpenCart = () => open();
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, [open]);

  if (!isOpen && !editingItem) return null;

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={close}
            data-testid="cart-overlay"
            className="fixed inset-0 z-50 transition-opacity duration-300"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              opacity: isAnimating ? 1 : 0,
            }}
          />

          <div
            data-testid="cart-drawer"
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col transition-transform duration-500"
            style={{
              backgroundColor: colors.mist,
              borderLeft: `1px solid ${colors.beige}80`,
              transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
              transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            <div
              className="p-6 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${colors.beige}80`, backgroundColor: colors.white }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag style={{ color: colors.black }} size={20} />
                <h2 className="font-serif text-2xl" style={{ color: colors.black }}>
                  Your Order
                </h2>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.tan, color: colors.white }}
                >
                  {totalItemCount}
                </span>
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                className="p-2 rounded-full transition-colors"
                style={{ color: colors.brown }}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ backgroundColor: colors.mist }}>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-70">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: colors.cream }}
                  >
                    <ShoppingBag size={32} style={{ color: colors.tan }} />
                  </div>
                  <h3 className="font-serif text-2xl mb-2" style={{ color: colors.black }}>
                    Your bag is empty
                  </h3>
                  <p className="text-sm" style={{ color: colors.brown }}>
                    Looks like you haven&apos;t added any treats yet.
                  </p>
                  <Link href="/menu" className="mt-8 inline-block" onClick={close}>
                    <Button variant="outline">
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.cartId}-${idx}`}
                      className="p-5 rounded-xl flex gap-4 group animate-fade-in"
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.beige}4D`,
                        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                        animationDelay: `${idx * 50}ms`,
                      }}
                    >
                      <div
                        className="relative w-16 h-16 rounded-lg shrink-0 overflow-hidden"
                        style={{ backgroundColor: colors.mist }}
                      >
                        <Image
                          src="/unsplash/tnc-placeholder-menuitem.png"
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                        <div
                          className="absolute bottom-0 right-0 text-2xs font-bold px-1.5 py-0.5 rounded-tl-md"
                          style={{ backgroundColor: colors.black, color: colors.white }}
                        >
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-lg leading-tight truncate" style={{ color: colors.black }}>
                            {item.name}
                          </h3>
                          <p className="font-medium" style={{ color: colors.black }}>
                            ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.modifiers.map((mod, i) => (
                            <span
                              key={i}
                              className="text-2xs px-1.5 py-0.5 rounded border"
                              style={{ backgroundColor: colors.mist, color: colors.brown, borderColor: `${colors.beige}80` }}
                            >
                              {mod.optionLabel}
                            </span>
                          ))}
                        </div>

                        {item.notes && (
                          <p
                            className="text-xs italic truncate border-l-2 pl-2"
                            style={{ color: '#6b7280', borderColor: colors.tan }}
                          >
                            &ldquo;{item.notes}&rdquo;
                          </p>
                        )}

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              style={{
                                borderColor: `${colors.beige}80`,
                                backgroundColor: colors.white,
                                color: colors.black
                              }}
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-semibold min-w-[24px] text-center" style={{ color: colors.black }}>
                              {item.quantity}
                            </span>
                            <button
                              className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors"
                              style={{
                                borderColor: `${colors.beige}80`,
                                backgroundColor: colors.white,
                                color: colors.black
                              }}
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
                              style={{ color: colors.tan }}
                              onClick={() => {
                                close(); // Close cart first
                                setEditingItem(item);
                              }}
                            >
                              <Edit2 size={12} /> Edit
                            </button>
                            <button
                              className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
                              style={{ color: colors.red }}
                              onClick={() => removeItem(item.cartId)}
                            >
                              <Trash2 size={12} /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add More Items Link */}
                  <Link
                    href="/menu"
                    className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed transition-all hover:border-solid"
                    style={{
                      borderColor: colors.tan,
                      color: colors.tan,
                      backgroundColor: `${colors.cream}40`
                    }}
                    onClick={close}
                  >
                    <Plus size={16} />
                    <span className="font-medium">Add More Items</span>
                  </Link>
                </>
              )}
            </div>

            <div
              className="p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
              style={{ backgroundColor: colors.white, borderTop: `1px solid ${colors.beige}` }}
            >
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-sm" style={{ color: colors.brown }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm" style={{ color: colors.brown }}>
                  <span>Taxes (est.)</span>
                  <span>${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <div
                  className="flex justify-between items-center pt-4 border-t border-dashed"
                  style={{ borderColor: colors.beige }}
                >
                  <span className="font-serif text-xl" style={{ color: colors.black }}>
                    Total
                  </span>
                  <span className="font-serif text-xl" style={{ color: colors.black }}>
                    ${(subtotal * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div
                className="p-3 rounded-lg mb-4 text-center border"
                style={{ backgroundColor: `${colors.cream}80`, borderColor: `${colors.beige}80` }}
              >
                <p className="text-xs font-medium" style={{ color: colors.black }}>
                  Online ordering is currently in beta. You won&apos;t be charged.
                </p>
              </div>

              <Button
                fullWidth
                disabled={cart.length === 0}
                onClick={() => alert("This is a demo. Checkout functionality coming soon!")}
                className="h-12 text-base"
              >
                Checkout (Coming Soon)
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <ProductModal
          key="edit-modal"
          item={editingItem}
          editingItem={editingItem}
          onClose={() => {
            setEditingItem(null);
            open(); // Reopen cart after closing modal
          }}
        />
      )}
    </>
  );
}
