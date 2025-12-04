'use client';

import React, { useEffect } from 'react';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useCart } from '../providers/CartProvider';
import { COLORS } from '@/app/lib/colors';

// Use shared colors for consistency across the app
const colors = COLORS;

export const CartDrawer: React.FC = () => {
  const { items: cart, isOpen, open, close, removeItem } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    body.dataset.cartOpen = isOpen ? 'true' : 'false';
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else if (body.dataset.modalOpen !== 'true' && body.dataset.navOpen !== 'true') {
      body.style.overflow = '';
    }
    return () => {
      body.dataset.cartOpen = 'false';
      if (body.dataset.modalOpen !== 'true' && body.dataset.navOpen !== 'true') {
        body.style.overflow = '';
      }
    };
  }, [isOpen]);

  // Listen for global 'open-cart' events (triggered by cart icon in header)
  useEffect(() => {
    const handleOpenCart = () => open();
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, [open]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col"
            style={{ backgroundColor: colors.mist, borderLeft: `1px solid ${colors.beige}80` }}
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
                  {cart.length}
                </span>
              </div>
              <button
                onClick={close}
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
                  <Button variant="outline" className="mt-8" onClick={close}>
                    Browse Menu
                  </Button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${item.cartId}-${idx}`}
                    className="p-5 rounded-xl flex gap-4 group"
                    style={{
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.beige}4D`,
                      boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div
                      className="w-16 h-16 rounded-lg shrink-0 overflow-hidden relative"
                      style={{ backgroundColor: colors.mist }}
                    >
                      <img
                        src={`https://picsum.photos/seed/${item.id}/200/200`}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                      <div
                        className="absolute bottom-0 right-0 text-[10px] font-bold px-1.5 py-0.5 rounded-tl-md"
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
                            className="text-[10px] px-1.5 py-0.5 rounded border"
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

                      <div className="mt-2 flex justify-end">
                          <button
                            className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
                            style={{ color: colors.red }}
                            onClick={() => removeItem(item.cartId)}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                      </div>
                    </div>
                  </motion.div>
                ))
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
