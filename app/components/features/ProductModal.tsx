'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, CartItem, SelectedModifier } from '@/app/types';
import { MODIFIERS } from '@/app/constants';
import { Button } from '../ui/Button';
import { useCart } from '../providers/CartProvider';
import { COLORS } from '@/app/lib/colors';

// Use shared colors for consistency across the app
const colors = COLORS;

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToOrder?: (item: CartItem) => void;
  editingItem?: CartItem | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, onAddToOrder, editingItem }) => {
  const { addItem, updateItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selections, setSelections] = useState<Record<string, Set<string>>>({});
  const modalOpen = !!item;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (modalOpen) {
      body.dataset.modalOpen = 'true';
      body.style.overflow = 'hidden';
    } else {
      body.dataset.modalOpen = 'false';
      if (body.dataset.cartOpen !== 'true' && body.dataset.navOpen !== 'true') {
        body.style.overflow = '';
      }
    }
    return () => {
      body.dataset.modalOpen = 'false';
      if (body.dataset.cartOpen !== 'true' && body.dataset.navOpen !== 'true') {
        body.style.overflow = '';
      }
    };
  }, [modalOpen]);

  const modifierGroups = useMemo(() => {
    if (!item) return [];
    if (item.section === 'drinks') return MODIFIERS.drinks;
    if (item.subcategory === 'Açaí Bowls') {
      // The Classic Chapter only has extra toppings
      if (item.name === 'The Classic Chapter') return MODIFIERS.classicBowl;
      // Build Your Own Bowl has all options
      return MODIFIERS.bowls;
    }
    if (item.subcategory === 'Bowls') return MODIFIERS.bowls;
    if (item.subcategory === 'Bagels') return MODIFIERS.bagels;
    if (item.subcategory === 'Panini Press') return MODIFIERS.paninis;
    return MODIFIERS.food;
  }, [item]);

  useEffect(() => {
    if (item) {
      // If editing, pre-fill with existing values
      if (editingItem) {
        setQuantity(editingItem.quantity);
        setNotes(editingItem.notes || '');

        // Rebuild selections from existing modifiers
        const initialSelections: Record<string, Set<string>> = {};
        modifierGroups.forEach(group => {
          const groupModifiers = editingItem.modifiers.filter(m => m.groupId === group.id);
          if (groupModifiers.length > 0) {
            initialSelections[group.id] = new Set(groupModifiers.map(m => m.optionLabel));
          } else if (group.type === 'radio' && group.required && group.options.length > 0) {
            initialSelections[group.id] = new Set([group.options[0].label]);
          } else {
            initialSelections[group.id] = new Set();
          }
        });
        setSelections(initialSelections);
      } else {
        // Adding new item - use defaults
        setQuantity(1);
        setNotes('');
        const initialSelections: Record<string, Set<string>> = {};
        modifierGroups.forEach(group => {
          if (group.type === 'radio' && group.required && group.options.length > 0) {
            initialSelections[group.id] = new Set([group.options[0].label]);
          } else {
            initialSelections[group.id] = new Set();
          }
        });
        setSelections(initialSelections);
      }
    }
  }, [item, modifierGroups, editingItem]);

  const toggleSelection = (groupId: string, optionLabel: string, type: 'select' | 'radio' | 'checkbox', maxSelections?: number) => {
    setSelections(prev => {
      const groupSelections = new Set(prev[groupId] || []);

      if (type === 'radio' || type === 'select') {
        return { ...prev, [groupId]: new Set([optionLabel]) };
      } else {
        if (groupSelections.has(optionLabel)) {
          groupSelections.delete(optionLabel);
        } else {
          if (maxSelections && groupSelections.size >= maxSelections) {
            return prev;
          }
          groupSelections.add(optionLabel);
        }
        return { ...prev, [groupId]: groupSelections };
      }
    });
  };

  const basePrice = useMemo(() => {
    if (!item) return 0;
    return parseFloat(item.price.replace('$', ''));
  }, [item]);

  const totalModifierPrice = useMemo(() => {
    let total = 0;
    modifierGroups.forEach(group => {
      const groupSet = selections[group.id];
      if (groupSet) {
        groupSet.forEach(label => {
          const option = group.options.find(o => o.label === label);
          if (option) total += option.priceDelta;
        });
      }
    });
    return total;
  }, [modifierGroups, selections]);

  const finalPrice = (basePrice + totalModifierPrice) * quantity;

  if (!item) return null;

  const close = () => onClose();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none"
      >
        <div
          className="absolute inset-0 pointer-events-auto"
          onClick={close}
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
        />

        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-xl sm:rounded-2xl shadow-2xl flex flex-col relative z-10 overflow-hidden"
          style={{ backgroundColor: colors.cream }}
        >
          <div className="relative h-64 sm:h-56 overflow-hidden shrink-0 group" style={{ backgroundColor: colors.brown }}>
            <img
              src="/unsplash/tnc-placeholder-menuitem.png"
              alt={item.name}
              className="w-full h-full object-cover opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:from-black/40" />
            <button
              onClick={close}
              className="absolute top-4 right-4 p-2 rounded-full text-white transition-colors z-20"
              style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-6 left-6 right-6 sm:hidden">
              <h2 className="font-serif text-3xl text-white leading-tight drop-shadow-md mb-2">{item.name}</h2>
              <span className="font-serif text-2xl" style={{ color: colors.tan }}>
                {item.price}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scroll-smooth pb-32" style={{ backgroundColor: colors.white }}>
            <div className="p-6 space-y-8">
              <div className="hidden sm:block">
                <div className="flex justify-between items-start gap-4">
                  <h2 className="font-serif text-3xl leading-tight" style={{ color: colors.black }}>
                    {item.name}
                  </h2>
                  <span className="font-serif text-2xl" style={{ color: colors.tan }}>
                    {item.price}
                  </span>
                </div>
              </div>

              <p className="text-lg font-light leading-relaxed" style={{ color: `${colors.brown}CC` }}>
                {item.description}
              </p>

              <div className="space-y-8">
                {modifierGroups.map(group => (
                  <div key={group.id} className="space-y-4">
                    <div
                      className="flex justify-between items-baseline pb-2"
                      style={{ borderBottom: `1px solid ${colors.beige}4D` }}
                    >
                      <div>
                        <h3 className="font-serif text-xl" style={{ color: colors.black }}>
                          {group.name}
                        </h3>
                        {group.description && (
                          <p className="text-xs" style={{ color: `${colors.brown}99` }}>
                            {group.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.tan }}>
                          {group.required ? 'Required' : 'Optional'}
                        </span>
                        {group.maxSelections && (
                          <span className="text-[10px]" style={{ color: `${colors.brown}99` }}>
                            Max {group.maxSelections}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {group.options.map(option => {
                        const isSelected = selections[group.id]?.has(option.label);
                        return (
                          <label
                            key={option.label}
                            className="relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200"
                            style={{
                              borderColor: isSelected ? colors.black : `${colors.beige}80`,
                              backgroundColor: isSelected ? colors.mist : colors.white,
                              boxShadow: isSelected ? `0 0 0 1px ${colors.black}` : 'none',
                            }}
                            onClick={e => {
                              e.preventDefault();
                              toggleSelection(group.id, option.label, group.type, group.maxSelections);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              {group.type === 'radio' ? (
                                <div
                                  className="w-5 h-5 rounded-full border flex items-center justify-center transition-colors"
                                  style={{ borderColor: isSelected ? colors.black : colors.beige }}
                                >
                                  {isSelected && (
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.black }} />
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="w-5 h-5 rounded border flex items-center justify-center transition-colors"
                                  style={{
                                    borderColor: isSelected ? colors.black : colors.beige,
                                    backgroundColor: isSelected ? colors.black : 'transparent',
                                  }}
                                >
                                  {isSelected && <Check size={12} className="text-white" />}
                                </div>
                              )}
                              <span
                                className="text-base"
                                style={{ color: isSelected ? colors.black : colors.brown, fontWeight: isSelected ? 600 : 400 }}
                              >
                                {option.label}
                              </span>
                            </div>
                            {option.priceDelta > 0 && (
                              <span className="text-sm font-bold" style={{ color: colors.tan }}>
                                +${option.priceDelta.toFixed(2)}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <label className="font-serif text-lg flex items-center gap-2" style={{ color: colors.black }}>
                  Special Requests
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={item.section === 'desserts' ? "Warmed, allergy info, etc..." : "Extra hot, allergy info, etc..."}
                  className="w-full p-4 rounded-xl border outline-none resize-none h-24 text-base"
                  style={{
                    borderColor: `${colors.beige}80`,
                    backgroundColor: colors.white,
                    color: colors.black,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 shadow-[0_-5px_30px_rgba(0,0,0,0.08)] z-20"
            style={{ backgroundColor: colors.white, borderTop: `1px solid ${colors.beige}` }}
          >
            <div className="flex items-center gap-4 max-w-xl mx-auto">
              <div
                className="flex items-center rounded-lg overflow-hidden shrink-0 border"
                style={{ backgroundColor: colors.mist, borderColor: `${colors.beige}80` }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 sm:p-3.5 transition-colors"
                  style={{ color: colors.black }}
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 sm:w-10 text-center font-bold text-lg" style={{ color: colors.black }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 sm:p-3.5 transition-colors"
                  style={{ color: colors.black }}
                >
                  <Plus size={18} />
                </button>
              </div>
              <Button
                fullWidth
                onClick={() => {
                  const modifiers: SelectedModifier[] = [];
                  modifierGroups.forEach(group => {
                    const groupSet = selections[group.id];
                    if (groupSet) {
                      groupSet.forEach(label => {
                        const option = group.options.find(o => o.label === label);
                        if (option) {
                          modifiers.push({
                            groupId: group.id,
                            groupName: group.name,
                            optionLabel: option.label,
                            priceDelta: option.priceDelta,
                          });
                        }
                      });
                    }
                  });

                  if (editingItem) {
                    // Update existing cart item
                    updateItem(editingItem.cartId, quantity, modifiers, notes);
                  } else {
                    // Add new item
                    const cartItem: CartItem = {
                      ...item,
                      cartId: Math.random().toString(36).substr(2, 9),
                      modifiers,
                      notes,
                      totalPrice: finalPrice,
                      quantity,
                    };
                    if (onAddToOrder) {
                      onAddToOrder(cartItem);
                    } else {
                      addItem(item, quantity, modifiers, notes, finalPrice);
                    }
                  }
                  close();
                }}
                className="h-12 sm:h-14 flex justify-between px-6 text-sm sm:text-base"
              >
                <span>{editingItem ? 'Update Order' : 'Add to Order'}</span>
                <span>${finalPrice.toFixed(2)}</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
