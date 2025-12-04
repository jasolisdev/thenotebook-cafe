'use client';

import { useState, useRef, useEffect } from 'react';
import { Coffee, Search, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem as MenuItemType, CartItem, SelectedModifier } from '@/app/types';
import { MENU_ITEMS } from '@/app/constants';
import { ProductModal } from '@/app/components/features/ProductModal';
import { useCart } from '@/app/components/providers/CartProvider';
import Reveal from '../components/ui/Reveal';

const colors = {
  black: '#2C2420',
  brown: '#4A3B32',
  tan: '#A48D78',
  beige: '#CBB9A4',
  cream: '#EDE7D8',
  mist: '#F4F1EA',
  white: '#FAF9F6',
};

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const { items: cart, open: openCart, addItem, isOpen: cartOpen } = useCart();
  const [activeSection, setActiveSection] = useState<'drinks' | 'meals' | 'desserts'>('drinks');
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const tabClickedRef = useRef(false);
  const cartLength = cart.length;

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSection = item.section === activeSection;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    const key = item.subcategory || 'General';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, MenuItemType[]>);

  const handleAddToCart = (item: MenuItemType, quantity: number, modifiers: SelectedModifier[], notes?: string, totalPrice?: number) => {
    addItem(item, quantity, modifiers, notes, totalPrice);
  };

  // Scroll list into view when switching tabs to keep context
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!tabClickedRef.current) return; // only scroll after a user clicks a tab
    if (typeof window === 'undefined' || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    const targetY = Math.max(rect.top + window.scrollY - 220, 0); // pull list higher; leave ~10px of hero visible
    const delta = Math.abs(window.scrollY - targetY);
    if (delta > 8) {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <>
      <div
        className="min-h-screen pb-32"
        ref={menuRef}
        style={{ backgroundColor: colors.mist, color: colors.brown }}
      >
        {/* Menu Header */}
        <div
          className="pt-24 pb-32 px-4 relative overflow-hidden text-center"
          style={{ backgroundColor: colors.black, color: colors.cream }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div
              className="absolute right-0 top-0 w-96 h-96 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: colors.tan }}
            ></div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Reveal>
              <span
                className="font-bold tracking-[0.2em] uppercase text-sm mb-5 block"
                style={{ color: colors.tan }}
              >
                The Menu
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif text-[70px] md:text-[90px] leading-[0.9] mb-7">Curated Selection</h1>
            </Reveal>
            <Reveal delay={220}>
              <p
                className="text-lg max-w-xl mx-auto font-light leading-relaxed"
                style={{ color: `${colors.beige}CC` }}
              >
                Everything we serve is made with intention. From our single-origin espressos to our locally sourced pastries.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="sticky top-20 z-30 px-4 -mt-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row items-center gap-4 border"
              style={{ backgroundColor: colors.white, borderColor: `${colors.beige}33` }}
            >
              {/* Section Tabs */}
              <div className="flex gap-1 w-full sm:w-auto justify-center sm:justify-start overflow-visible p-1">
                {(['drinks', 'meals', 'desserts'] as const).map(section => {
                  const isActive = activeSection === section;
                  return (
                    <button
                      key={section}
                      onClick={() => {
                        tabClickedRef.current = true;
                        setActiveSection(section);
                      }}
                      aria-pressed={isActive}
                      className="basis-1/3 sm:flex-none px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.22em] whitespace-nowrap transition-colors duration-150 ease-out border"
                      style={{
                        backgroundColor: isActive ? colors.black : `${colors.mist}CC`,
                        color: isActive ? colors.white : colors.brown,
                        borderColor: isActive ? colors.black : `${colors.beige}80`,
                        boxShadow: isActive ? '0 8px 18px rgba(0,0,0,0.12)' : 'none',
                      }}
                    >
                      {section}
                    </button>
                  );
                })}
              </div>

              <div
                className="h-8 w-px hidden sm:block"
                style={{ backgroundColor: `${colors.beige}80` }}
              ></div>

              {/* Search */}
              <div className="relative w-full flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={18} color={colors.tan} />
                <input
                  type="text"
                  placeholder="Search for latte, croissant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-none text-sm transition-all"
                  style={{
                    backgroundColor: `${colors.mist}99`,
                    color: colors.black,
                    fontSize: '16px',
                  }}
                  onFocus={(e) => (e.currentTarget.style.backgroundColor = colors.white)}
                  onBlur={(e) => (e.currentTarget.style.backgroundColor = `${colors.mist}99`)}
                />
              </div>
            </div>
          </div>
        </div>

        <div ref={listRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {Object.entries(groupedItems).length === 0 ? (
            <div className="text-center py-32 opacity-50">
              <Coffee size={64} className="mx-auto mb-6" color={colors.tan} strokeWidth={1} />
              <p className="font-serif text-3xl mb-2" style={{ color: colors.black }}>No items found.</p>
              <p style={{ color: colors.brown }}>Try adjusting your search terms.</p>
              <button onClick={() => { setSearchQuery(''); setActiveSection('drinks') }} className="font-bold uppercase tracking-widest text-xs mt-8 border-b pb-1" style={{ color: colors.black, borderColor: colors.black }}>Clear filters</button>
            </div>
          ) : (
            Object.entries(groupedItems).map(([subcategory, items]) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={subcategory}
                className="mb-16"
              >
                <div className="flex items-end gap-4 mb-8 pb-4 border-b" style={{ borderColor: `${colors.beige}80` }}>
                  <h2 className="font-serif text-3xl" style={{ color: colors.black }}>{subcategory}</h2>
                  <span className="text-sm mb-1.5 font-medium" style={{ color: `${colors.brown}66` }}>{items.length} items</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group rounded-2xl p-3 transition-all duration-300 border cursor-pointer flex gap-4 items-center"
                      style={{ backgroundColor: colors.white, borderColor: 'transparent' }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${colors.beige}80`)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: colors.mist }}>
                        <img
                          src="/unsplash/tnc-placeholder-menuitem.png"
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-lg truncate pr-2 transition-colors" style={{ color: colors.black }}>{item.name}</h3>
                          <span className="font-medium text-sm whitespace-nowrap" style={{ color: colors.black }}>{item.price}</span>
                        </div>
                        <p className="text-xs line-clamp-2 mb-2 leading-relaxed" style={{ color: `${colors.brown}B3` }}>{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {item.tag && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={item.tag === 'seasonal'
                                  ? { backgroundColor: '#FFEDD5', color: '#C05621' }
                                  : { backgroundColor: colors.mist, color: colors.black }}
                              >
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: colors.mist, color: colors.black }}>
                            <ArrowRight size={12} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <ProductModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToOrder={(cartItem) =>
          handleAddToCart(cartItem, cartItem.quantity || 1, cartItem.modifiers || [], cartItem.notes, cartItem.totalPrice)}
      />
    </>
  );
}
