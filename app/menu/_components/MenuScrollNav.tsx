"use client";

import { useRef, useEffect } from "react";

type MenuSection = {
  id: string;
  label: string;
};

type MenuScrollNavProps = {
  sections: MenuSection[];
  activeSection: string | null;
  onNavigate: (sectionId: string) => void;
  isHeaderVisible?: boolean;
};

/**
 * Sticky navigation component for the menu page.
 * Displays section links that highlight based on scroll position
 * and smooth scroll to sections when clicked.
 */
export function MenuScrollNav({
  sections,
  activeSection,
  onNavigate,
  isHeaderVisible = true,
}: MenuScrollNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active nav item into view on mobile
  useEffect(() => {
    if (activeButtonRef.current && navRef.current) {
      const nav = navRef.current;
      const button = activeButtonRef.current;
      const navRect = nav.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Check if button is outside visible area
      if (buttonRect.left < navRect.left || buttonRect.right > navRect.right) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeSection]);

  return (
    <nav
      className="menu-scroll-nav w-full transition-all duration-300 z-40"
      style={{
        top: isHeaderVisible ? "var(--site-header-height, 80px)" : "0px",
      }}
      role="navigation"
      aria-label="Menu sections"
    >
      <div className="w-full max-w-4xl mx-auto px-4">
        <div
          ref={navRef}
          className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide py-3"
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                ref={isActive ? activeButtonRef : null}
                type="button"
                onClick={() => onNavigate(section.id)}
                className="menu-nav-item flex-shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-200"
                data-active={isActive ? "true" : "false"}
                aria-current={isActive ? "true" : undefined}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
