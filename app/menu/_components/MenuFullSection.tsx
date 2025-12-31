"use client";

import { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { TextWithSerifAmpersand, TextWithSansAmpersand } from "@/app/utils/ampersandUtils";
import type { MenuItem as MenuItemType } from "@/app/types";

type MenuFullSectionProps = {
  sectionId: string;
  sectionTitle: string;
  items: MenuItemType[];
  onSelectItem: (item: MenuItemType) => void;
  showPrices?: boolean;
  /** Optional custom content to show instead of items (e.g., "Coming Soon") */
  customContent?: React.ReactNode;
};

/**
 * Renders a full menu section with its subcategories and items.
 * Used in the single-page scroll layout.
 */
export function MenuFullSection({
  sectionId,
  sectionTitle,
  items,
  onSelectItem,
  showPrices = false,
  customContent,
}: MenuFullSectionProps) {
  // Group items by subcategory
  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const key = item.subcategory || "General";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, MenuItemType[]>);
  }, [items]);

  return (
    <section
      id={sectionId}
      className="menu-full-section scroll-mt-[160px] sm:scroll-mt-[140px]"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Section Header */}
      <div className="menu-section-header mb-8 sm:mb-10">
        <h2
          id={`${sectionId}-heading`}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cafe-black"
        >
          {sectionTitle}
        </h2>
        <div className="mt-3 w-16 h-0.5 bg-cafe-tan" aria-hidden="true" />
      </div>

      {/* Custom content (e.g., Coming Soon) or items */}
      {customContent ? (
        <div className="py-8">{customContent}</div>
      ) : (
        <div className="space-y-12 sm:space-y-16">
          {Object.entries(groupedItems).map(([subcategory, subcategoryItems]) => (
            <div key={subcategory} className="menu-subcategory">
              {/* Subcategory Header */}
              <div className="menu-subcategory-header flex items-baseline justify-between mb-2 pb-3 border-b">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-serif text-2xl md:text-3xl text-cafe-black">
                    <TextWithSerifAmpersand>{subcategory}</TextWithSerifAmpersand>
                  </h3>
                  <span className="hidden md:inline text-sm font-light text-cafe-brown">
                    {subcategoryItems.length} {subcategoryItems.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <span className="md:hidden text-sm font-light text-cafe-brown">
                  {subcategoryItems.length} {subcategoryItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-4 mt-6">
                {subcategoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`menu-item-editorial menu-item-${item.section} cursor-pointer group`}
                    onClick={() => onSelectItem(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectItem(item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${item.name} details`}
                  >
                    <div className="flex-1 pr-4">
                      <h4 className="menu-item-title">
                        {item.name}
                        {item.tag && (
                          <span
                            className="menu-item-tag ml-2 text-[10px] leading-none font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full inline-flex items-center"
                            data-tag={item.tag}
                          >
                            {item.tag}
                          </span>
                        )}
                      </h4>
                      <p className="menu-item-desc">
                        <TextWithSansAmpersand>{item.description}</TextWithSansAmpersand>
                      </p>
                    </div>

                    {showPrices && <span className="price menu-item-price">{item.price}</span>}

                    <button
                      className="details-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      aria-label={`View ${item.name} details`}
                      type="button"
                    >
                      <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
