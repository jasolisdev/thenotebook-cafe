"use client";

import { Coffee, Plus } from "lucide-react";
import { TextWithSerifAmpersand, TextWithSansAmpersand } from "@/app/utils/ampersandUtils";
import type { MenuItem as MenuItemType } from "@/app/types";

type MenuSectionListProps = {
  groupedItems: Record<string, MenuItemType[]>;
  onSelectItem: (item: MenuItemType) => void;
  onClearFilters: () => void;
};

export function MenuSectionList({ groupedItems, onSelectItem, onClearFilters }: MenuSectionListProps) {
  if (Object.entries(groupedItems).length === 0) {
    return (
      <div className="menu-empty-state text-center py-32 opacity-50">
        <Coffee size={64} className="mx-auto mb-6" strokeWidth={1} />
        <p className="font-serif text-3xl mb-2 menu-empty-state__title">No items found.</p>
        <p className="menu-empty-state__copy">Try adjusting your search terms.</p>
        <button
          type="button"
          onClick={onClearFilters}
          className="menu-empty-state__button font-bold uppercase tracking-widest text-xs mt-8 border-b pb-1"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <>
      {Object.entries(groupedItems).map(([subcategory, items]) => (
        <section key={subcategory} className="mb-16">
          <div className="menu-subcategory-header flex items-baseline justify-between mb-2 pb-3 border-b">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-3xl md:text-4xl">
                <TextWithSerifAmpersand>{subcategory}</TextWithSerifAmpersand>
              </h2>
              <span className="hidden md:inline text-base font-light">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <span className="md:hidden text-sm font-light">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="space-y-4 mt-8">
            {items.map((item) => (
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
                  <h3 className="menu-item-title">
                    {item.name}
                    {item.tag && (
                      <span
                        className="menu-item-tag ml-3 text-2xs font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block"
                        data-tag={item.tag}
                      >
                        {item.tag}
                      </span>
                    )}
                  </h3>
                  <p className="menu-item-desc">
                    <TextWithSansAmpersand>{item.description}</TextWithSansAmpersand>
                  </p>
                </div>

                <span className="price menu-item-price">{item.price}</span>

                <button
                  className="add-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem(item);
                  }}
                  aria-label={`View ${item.name} details`}
                  type="button"
                >
                  <Plus size={20} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
