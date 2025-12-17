'use client';

import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import type { MenuItem as MenuItemType } from '@/app/types';
import { MENU_ITEMS } from '@/app/constants';
import { ProductModal } from '@/app/components/features/ProductModal';
import RevealText from '@/app/components/ui/RevealText';
import FadeInSection from '@/app/components/ui/FadeInSection';
import ParallaxHero from '@/app/components/features/ParallaxHero';
import '../styles/pages/menu.css';
import { MenuTabs } from './_components/MenuTabs';
import { MenuSectionList } from './_components/MenuSectionList';

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
        className="menu-page min-h-screen pb-32 relative" /* Added relative for z-index context */
      >
        {/* Fixed background layer for mobile compatibility */}
        <div className="menu-fixed-background" aria-hidden="true" />

        {/* Menu Header */}
        <ParallaxHero
          className="parallax-hero--compact"
          contentClassName="parallax-hero__content--compact tnc-hero__content"
          backgroundImage="/menu/tnc-menu-banner.webp"
          backgroundColor="var(--cafe-black)"
          backgroundFit="fitHeight"
          backgroundFitDesktop="cover"
          parallax={false}
          overlayVariant="solid"
          focusPercent={32}
        >
          <div className="tnc-hero__inner">
            <h1 className="tnc-hero__title font-serif">
              <RevealText delay="0ms">Specialty Coffee Menu</RevealText>
            </h1>
            <FadeInSection delay="200ms">
              <p className="tnc-hero__subtitle">
                Handcrafted Daily in Riverside, CA.
              </p>
            </FadeInSection>
          </div>
        </ParallaxHero>

        {/* Sticky Tabs Container */}
        <div
          className="menu-sticky-tabs px-4 md:relative md:static transition-all duration-300"
          ref={tabsRef}
          style={{
            top: isHeaderVisible ? 'var(--site-header-height, 80px)' : '0px',
          }}
        >
          <div className="max-w-md mx-auto">
            <div
              className="menu-tabs-wrapper rounded-2xl shadow-xl p-2 flex flex-col sm:flex-row items-center gap-3 border"
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
                We&apos;re Busy Brewing!
              </h2>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-cafe-brown/80">
                Thank you for your patience! We&apos;re putting the finishing touches on our handcrafted drink menu.
                Check back very soon to see what we&apos;ve been mixing up.
              </p>
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

      <ProductModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        orderingEnabled={false}
      />
    </>
  );
}
