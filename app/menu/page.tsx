'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Coffee, ArrowRight, Plus } from 'lucide-react';
import { MenuItem as MenuItemType, SelectedModifier } from '@/app/types';
import { MENU_ITEMS } from '@/app/constants';
import { ProductModal } from '@/app/components/features/ProductModal';
import { useCart } from '@/app/components/providers/CartProvider';
import Reveal from '../components/ui/Reveal';
import ParallaxHero from '../components/features/ParallaxHero';
import '../styles/pages/menu.css';

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
  const { addItem } = useCart();
  const [activeSection, setActiveSection] = useState<'drinks' | 'meals' | 'desserts'>('drinks');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const menuContentRef = useRef<HTMLDivElement>(null);

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

  // Detect navbar visibility for sticky tabs positioning
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Navbar shows when scrolling up, hides when scrolling down
          if (currentScrollY < lastScrollY || currentScrollY < 100) {
            setIsNavbarVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsNavbarVisible(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main
        className="min-h-screen pb-32"
        style={{ backgroundColor: colors.mist, color: colors.brown }}
      >
        {/* Menu Header */}
        <ParallaxHero backgroundImage="/menu/tnc-menu-hero-bg.png" overlayVariant="lighter">
          <div className="max-w-4xl mx-auto text-center relative z-10 px-6 space-y-6">
            <Reveal>
              <span
                className="font-bold tracking-[0.2em] uppercase text-sm block"
                style={{ color: 'var(--cafe-tan)' }}
              >
                The Menu
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif text-[70px] md:text-[90px] leading-[0.9]" style={{ color: 'var(--cafe-cream)' }}>
                Curated Selection
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p
                className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
                style={{ color: 'rgba(var(--cafe-cream-rgb), 0.82)' }}
              >
                Small-batch roasts, house-made syrups, and locally sourced ingredients.
              </p>
            </Reveal>
          </div>
        </ParallaxHero>

        {/* Sticky Tabs Container */}
        <div
          className="px-4 md:relative md:static transition-all duration-300"
          style={{
            position: 'sticky',
            top: isNavbarVisible ? '80px' : '0', // 80px = navbar height (h-20), 0 when navbar hidden
            zIndex: 40,
            backgroundColor: colors.mist,
            paddingTop: '1rem',
            paddingBottom: '1rem'
          }}
        >
          <div className="max-w-md mx-auto">
            <div
              className="rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row items-center gap-3 border"
              style={{ backgroundColor: colors.white, borderColor: `${colors.beige}33`, justifyContent: 'center' }}
            >
              {/* Section Tabs */}
              <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-center overflow-visible p-1">
                {(['drinks', 'meals', 'desserts'] as const).map(section => {
                  const isActive = activeSection === section;
                  return (
                    <button
                      key={section}
                      onClick={() => {
                        setActiveSection(section);
                        // Scroll to menu content
                        if (menuContentRef.current) {
                          const yOffset = 0; // Scroll so the top of the section touches viewport
                          const element = menuContentRef.current;
                          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      aria-pressed={isActive}
                      className="basis-1/3 sm:flex-none px-6 py-2 rounded-lg text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] whitespace-nowrap transition-colors duration-150 ease-out border"
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

              {/* Search temporarily hidden per request; keeping structure for future use */}
              {/* <div className="relative w-full flex-1">
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
              </div> */}
            </div>
          </div>
        </div>

        <div ref={menuContentRef} className="mx-auto px-4 sm:px-6 py-12" style={{ maxWidth: '900px' }}>
          {Object.entries(groupedItems).length === 0 ? (
            <div className="text-center py-32 opacity-50">
              <Coffee size={64} className="mx-auto mb-6" color={colors.tan} strokeWidth={1} />
              <p className="font-serif text-3xl mb-2" style={{ color: colors.black }}>No items found.</p>
              <p style={{ color: colors.brown }}>Try adjusting your search terms.</p>
              <button onClick={() => { setSearchQuery(''); setActiveSection('drinks') }} className="font-bold uppercase tracking-widest text-xs mt-8 border-b pb-1" style={{ color: colors.black, borderColor: colors.black }}>Clear filters</button>
            </div>
          ) : (
            Object.entries(groupedItems).map(([subcategory, items]) => (
              <div
                key={subcategory}
                className="mb-16"
              >
                {/* Category Header - Editorial Style */}
                <h2
                  className="font-serif text-3xl md:text-4xl mb-2 pb-3 border-b"
                  style={{
                    color: colors.black,
                    borderColor: colors.tan
                  }}
                >
                  {subcategory}
                </h2>

                {/* Menu Items - Clean List Layout */}
                <div className="space-y-4 mt-8">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`menu-item-editorial menu-item-${item.section} cursor-pointer group`}
                      onClick={() => setSelectedItem(item)}
                    >
                      {/* Left Side: Title & Description */}
                      <div className="flex-1 pr-4">
                        <h3 style={{ color: colors.black }}>
                          {item.name}
                          {item.tag && (
                            <span
                              className="ml-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block"
                              style={item.tag === 'seasonal'
                                ? { backgroundColor: '#FFEDD5', color: '#C05621' }
                                : { backgroundColor: colors.mist, color: colors.black }}
                            >
                              {item.tag}
                            </span>
                          )}
                        </h3>
                        <p style={{ color: colors.brown }}>
                          {item.description}
                        </p>
                      </div>

                      {/* Right Side: Price (top right) */}
                      <span className="price" style={{ color: colors.black }}>
                        {item.price}
                      </span>

                      {/* Plus Button (bottom right - absolutely positioned) */}
                      <button
                        className="add-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <ProductModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToOrder={(cartItem) =>
          handleAddToCart(cartItem, cartItem.quantity || 1, cartItem.modifiers || [], cartItem.notes, cartItem.totalPrice)}
      />
    </>
  );
}
