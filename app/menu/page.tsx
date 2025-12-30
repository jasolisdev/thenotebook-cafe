/**
 * @fileoverview Menu page with product browsing
 * @module pages/menu
 *
 * @description
 * Interactive menu page with tabbed navigation, product cards,
 * and cart integration. Features sticky category tabs, modal-based
 * product customization, and real-time cart updates.
 *
 * Key features:
 * - Hero banner with menu title and tagline
 * - Sticky tab navigation (Drinks, Meals, Desserts) that adjusts with header visibility
 * - Smart scroll behavior - locks viewport when switching tabs above threshold
 * - Filterable product cards grouped by subcategory
 * - ProductModal for customization (size, milk, extras, notes)
 * - Add to cart with modifiers and special instructions
 * - "Coming soon" placeholder for drinks section
 * - Mobile-responsive layout with fixed background
 *
 * @route /menu
 * @access public
 *
 * @example
 * Route: /menu
 * Flow: Browse → Select Tab → Click Product → Customize → Add to Cart
 *
 * @see {@link app/components/features/ProductModal.tsx} for product customization
 * @see {@link app/menu/_components/MenuTabs.tsx} for navigation tabs
 * @see {@link app/menu/_components/MenuSectionList.tsx} for product listing
 * @see {@link app/constants.ts} for MENU_ITEMS data
 */
'use client';

import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { MenuItem as MenuItemType } from '@/app/types';
import { MENU_ITEMS } from '@/app/constants';
import RevealText from '@/app/components/ui/RevealText';
import FadeInSection from '@/app/components/ui/FadeInSection';
import '@/app/styles/pages/menu.css';
import { MenuTabs } from './_components/MenuTabs';
import { MenuSectionList } from './_components/MenuSectionList';

// Lazy load ProductModal - only loaded when user selects a product
const ProductModal = dynamic(
  () => import('@/app/components/features/ProductModal').then((m) => m.ProductModal),
  { ssr: false, loading: () => null }
);

const MENU_VIEWPORT_LOCK_Y = 250;

function readCssPxVariable(name: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const num = Number.parseFloat(raw.replace("px", ""));
  return Number.isFinite(num) ? num : fallback;
}

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [activeSection, setActiveSection] = useState<'drinks' | 'meals' | 'desserts'>('drinks');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const groupedItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filteredItems = MENU_ITEMS.filter((item) => {
      if (item.section !== activeSection) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });

    return filteredItems.reduce((acc, item) => {
      const key = item.subcategory || 'General';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, MenuItemType[]>);
  }, [activeSection, searchQuery]);

  // Listen for SiteHeader visibility (single source of truth)
  useEffect(() => {
    const onHeaderState = (e: Event) => {
      const detail = (e as CustomEvent).detail as { visible?: boolean } | undefined;
      if (typeof detail?.visible === "boolean") setIsHeaderVisible(detail.visible);
    };
    window.addEventListener("tnc-header-state", onHeaderState as EventListener);
    return () => window.removeEventListener("tnc-header-state", onHeaderState as EventListener);
  }, []);

  const scrollToMenuContent = useCallback(() => {
    if (!menuContentRef.current) return;

    const headerHeight = readCssPxVariable("--site-header-height", 80);
    const tabsHeight = tabsRef.current?.offsetHeight ?? 0;
    const yOffset = -(headerHeight + tabsHeight - 5);

    const element = menuContentRef.current;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const handleTabChange = useCallback((section: "drinks" | "meals" | "desserts") => {
    setActiveSection(section);

    const currentScrollY = window.scrollY;
    if (currentScrollY < MENU_VIEWPORT_LOCK_Y) return;
    scrollToMenuContent();
  }, [scrollToMenuContent]);

  return (
    <>
      <main
        className="menu-page min-h-screen pb-32 relative bg-gradient-to-b from-cafe-tan/0 via-cafe-tan/12 to-cafe-tan/24" /* Added relative for z-index context */
      >
        {/* Fixed background layer for mobile compatibility */}
        <div className="menu-fixed-background" aria-hidden="true" />

        {/* Menu Header */}
        <section
          className="relative min-h-[32vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden pt-[var(--site-header-height,80px)]"
          data-section="Hero"
          style={{
            backgroundImage: 'url(/menu/tnc-menu-banner.webp)',
            backgroundColor: 'var(--color-cafe-black)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 32%',
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden="true" />
          <div className="relative z-10 text-left md:text-center px-6 w-full max-w-7xl mx-auto">
            <h1 className="font-dm-serif font-bold text-4xl md:text-6xl text-cafe-cream mb-4">
              <RevealText delay="0ms">The Menu</RevealText>
            </h1>
            <FadeInSection delay="200ms">
              <p className="font-serif italic text-lg md:text-2xl text-cafe-cream/90 drop-shadow-sm">
                Handcrafted Daily in Riverside, CA.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Sticky Tabs Container */}
        <div
          className="menu-sticky-tabs w-full md:px-4 md:relative md:static transition-all duration-300 z-30"
          ref={tabsRef}
          style={{
            top: isHeaderVisible ? 'var(--site-header-height, 80px)' : '0px',
          }}
        >
          <div className="w-full md:max-w-md md:mx-auto">
            <div
              className="menu-tabs-wrapper w-full md:w-auto rounded-none md:rounded-2xl shadow-sm md:shadow-xl p-0 md:p-2 flex flex-row items-stretch md:items-center justify-center border-b md:border bg-[#FAF9F6] md:bg-white"
            >
              {/* Section Tabs */}
              <MenuTabs activeSection={activeSection} onChange={handleTabChange} />

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

        <div ref={menuContentRef} className="menu-content mx-auto px-4 sm:px-6 py-12">
          {activeSection === "drinks" ? (
            <section
              aria-label="Drinks coming soon"
              className="mx-auto max-w-2xl text-center py-20 md:py-28 px-4"
            >
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-cafe-black">
                <RevealText delay="0ms">We&apos;re Busy Brewing!</RevealText>
              </h2>
              <FadeInSection delay="200ms">
                <p className="mt-5 text-base md:text-lg leading-relaxed text-cafe-brown/80">
                  Thank you for your patience! We&apos;re putting the finishing touches on our handcrafted drink menu.
                  Check back very soon to see what we&apos;ve been mixing up.
                </p>
              </FadeInSection>
              <FadeInSection delay="400ms">
                <p className="mt-6 text-sm md:text-base font-medium text-cafe-brown/80">
                  In the meantime, explore our comforting{" "}
                  <button
                    type="button"
                    onClick={() => setActiveSection("meals")}
                    className="underline underline-offset-4 hover:text-cafe-black transition-colors"
                  >
                    MEALS
                  </button>{" "}
                  and sweet{" "}
                  <button
                    type="button"
                    onClick={() => setActiveSection("desserts")}
                    className="underline underline-offset-4 hover:text-cafe-black transition-colors"
                  >
                    DESSERTS
                  </button>
                  !
                </p>
              </FadeInSection>
            </section>
          ) : (
            <MenuSectionList
              groupedItems={groupedItems}
              onSelectItem={setSelectedItem}
              onClearFilters={() => { setSearchQuery(''); setActiveSection('drinks'); }}
              showPrices={false}
            />
          )}
        </div>
      </main>

      {/* Online ordering disabled until launch - showcase mode only */}
      {selectedItem && (
        <ProductModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          orderingEnabled={false}
        />
      )}
    </>
  );
}
