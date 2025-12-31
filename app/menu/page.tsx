/**
 * @fileoverview Menu page with scroll-based navigation
 * @module pages/menu
 *
 * @description
 * Single-page menu with all sections visible and sticky navigation
 * that highlights based on scroll position and smooth-scrolls to sections.
 *
 * Key features:
 * - Hero banner with menu title and tagline
 * - Sticky navigation bar showing all sections (Drinks, Meals, Desserts)
 * - Scroll spy tracks current section and highlights nav
 * - Click nav items to smooth scroll to section
 * - All menu items visible on single scrollable page
 * - ProductModal for item details
 * - Mobile-responsive layout
 *
 * @route /menu
 * @access public
 */
"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import type { MenuItem as MenuItemType } from "@/app/types";
import { MENU_ITEMS } from "@/app/constants";
import RevealText from "@/app/components/ui/RevealText";
import FadeInSection from "@/app/components/ui/FadeInSection";
import "@/app/styles/pages/menu.css";
import { MenuScrollNav } from "./_components/MenuScrollNav";
import { MenuFullSection } from "./_components/MenuFullSection";
import { useScrollSpy } from "./_hooks/useScrollSpy";

// Lazy load ProductModal - only loaded when user selects a product
const ProductModal = dynamic(
  () =>
    import("@/app/components/features/ProductModal").then((m) => m.ProductModal),
  { ssr: false, loading: () => null }
);

const MENU_SECTIONS = [
  { id: "drinks", label: "Drinks" },
  { id: "meals", label: "Meals" },
  { id: "desserts", label: "Desserts" },
] as const;

function readCssPxVariable(name: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const raw = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const num = Number.parseFloat(raw.replace("px", ""));
  return Number.isFinite(num) ? num : fallback;
}

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Track which section is in view
  const activeSection = useScrollSpy(
    MENU_SECTIONS.map((s) => s.id),
    { rootMargin: "-20% 0px -60% 0px" }
  );

  // Group items by section
  const itemsBySection = useMemo(() => {
    return MENU_ITEMS.reduce(
      (acc, item) => {
        if (!acc[item.section]) acc[item.section] = [];
        acc[item.section].push(item);
        return acc;
      },
      {} as Record<string, MenuItemType[]>
    );
  }, []);

  // Listen for SiteHeader visibility
  useEffect(() => {
    const onHeaderState = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { visible?: boolean }
        | undefined;
      if (typeof detail?.visible === "boolean")
        setIsHeaderVisible(detail.visible);
    };
    window.addEventListener("tnc-header-state", onHeaderState as EventListener);
    return () =>
      window.removeEventListener(
        "tnc-header-state",
        onHeaderState as EventListener
      );
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const headerHeight = readCssPxVariable("--site-header-height", 80);
      const navHeight = 56; // Sticky nav height
      const offset = isHeaderVisible ? headerHeight + navHeight + 16 : navHeight + 16;

      const y =
        element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [isHeaderVisible]
  );

  return (
    <>
      <main className="menu-page min-h-screen pb-32 relative">
        {/* Fixed background layer for mobile compatibility */}
        <div className="menu-fixed-background" aria-hidden="true" />

        {/* Menu Header */}
        <section
          className="relative min-h-[32vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden pt-[var(--site-header-height,80px)]"
          data-section="Hero"
          style={{
            backgroundImage: "url(/menu/tnc-menu-banner.webp)",
            backgroundColor: "var(--color-cafe-black)",
            backgroundSize: "cover",
            backgroundPosition: "center 32%",
          }}
        >
          <div
            className="absolute inset-0 bg-black/40 z-[1]"
            aria-hidden="true"
          />
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

        {/* Sticky Navigation */}
        <MenuScrollNav
          sections={[...MENU_SECTIONS]}
          activeSection={activeSection}
          onNavigate={scrollToSection}
          isHeaderVisible={isHeaderVisible}
        />

        {/* Menu Content - All Sections */}
        <div className="menu-content mx-auto px-4 sm:px-6 py-12 space-y-20 sm:space-y-28">
          {/* Drinks Section */}
          <MenuFullSection
            sectionId="drinks"
            sectionTitle="Drinks"
            items={itemsBySection.drinks || []}
            onSelectItem={setSelectedItem}
            showPrices={false}
            customContent={
              <div className="text-center py-12 md:py-16">
                <h3 className="font-serif font-bold text-3xl md:text-4xl text-cafe-black mb-4">
                  <RevealText delay="0ms">We&apos;re Busy Brewing!</RevealText>
                </h3>
                <FadeInSection delay="200ms">
                  <p className="text-base md:text-lg leading-relaxed text-cafe-brown/80 max-w-xl mx-auto">
                    Thank you for your patience! We&apos;re putting the
                    finishing touches on our handcrafted drink menu. Check back
                    very soon to see what we&apos;ve been mixing up.
                  </p>
                </FadeInSection>
              </div>
            }
          />

          {/* Section Divider */}
          <div
            className="menu-section-divider"
            aria-hidden="true"
          />

          {/* Meals Section */}
          <MenuFullSection
            sectionId="meals"
            sectionTitle="Meals"
            items={itemsBySection.meals || []}
            onSelectItem={setSelectedItem}
            showPrices={false}
          />

          {/* Section Divider */}
          <div
            className="menu-section-divider"
            aria-hidden="true"
          />

          {/* Desserts Section */}
          <MenuFullSection
            sectionId="desserts"
            sectionTitle="Desserts"
            items={itemsBySection.desserts || []}
            onSelectItem={setSelectedItem}
            showPrices={false}
          />
        </div>
      </main>

      {/* Product Modal */}
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
