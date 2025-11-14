"use client";

import { useState } from "react";
import Image from "next/image";

type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  section: "drinks" | "meals" | "desserts";
  category?: string;
  sortOrder?: number;
  imageUrl?: string;
};

type MenuContentProps = {
  items: MenuItem[];
};

// Map categories to SVG file paths
const categorySVGs: Record<string, string> = {
  espresso: "/icons/espresso.svg",
  latte: "/icons/latte.svg",
  "cold-brew": "/icons/cold-brew.svg",
  tea: "/icons/tea.svg",
  food: "/icons/food.svg",
  seasonal: "/icons/seasonal.svg",
};

// Function to get the appropriate icon/image for a menu item
function getMenuItemIcon(item: MenuItem) {
  // Priority 1: Use uploaded image (full-size photo)
  if (item.imageUrl) {
    return (
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={56}
        height={56}
        className="w-full h-full object-cover"
      />
    );
  }

  // Priority 2: Use category SVG icon
  if (item.category && categorySVGs[item.category]) {
    return (
      <img
        src={categorySVGs[item.category]}
        alt={item.category}
        className="w-6 h-6 sm:w-8 sm:h-8 object-contain opacity-80"
        style={{ maxWidth: '32px', maxHeight: '32px' }}
      />
    );
  }

  // Priority 3: Fallback SVG based on section
  const sectionSVGs: Record<string, string> = {
    drinks: "/icons/espresso.svg",
    meals: "/icons/food.svg",
    desserts: "/icons/seasonal.svg",
  };

  const fallbackSVG = sectionSVGs[item.section] || "/icons/espresso.svg";
  return (
    <img
      src={fallbackSVG}
      alt={item.section}
      className="w-6 h-6 sm:w-8 sm:h-8 object-contain opacity-80"
      style={{ maxWidth: '32px', maxHeight: '32px' }}
    />
  );
}

export default function MenuContent({ items }: MenuContentProps) {
  const [activeTab, setActiveTab] = useState<"drinks" | "meals" | "desserts">("drinks");
  const [renderKey, setRenderKey] = useState(0);

  const filteredItems = items.filter((item) => item.section === activeTab);

  // For drinks section, separate seasonal items
  let regularItems = filteredItems;
  let seasonalItems: MenuItem[] = [];

  if (activeTab === "drinks") {
    regularItems = filteredItems.filter((item) => item.category !== "seasonal");
    seasonalItems = filteredItems.filter((item) => item.category === "seasonal");
  }

  // Split regular items into two columns
  const midpoint = Math.ceil(regularItems.length / 2);
  const leftColumn = regularItems.slice(0, midpoint);
  const rightColumn = regularItems.slice(midpoint);

  // Split seasonal items into two columns
  const seasonalMidpoint = Math.ceil(seasonalItems.length / 2);
  const seasonalLeftColumn = seasonalItems.slice(0, seasonalMidpoint);
  const seasonalRightColumn = seasonalItems.slice(seasonalMidpoint);

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-8 sm:gap-16 mb-16 border-b border-[rgba(201,154,88,0.2)] scroll-reveal">
        <button
          onClick={() => {
            setActiveTab("drinks");
            setRenderKey(prev => prev + 1);
          }}
          className={`pb-4 text-[16px] sm:text-[18px] font-semibold uppercase tracking-wider transition-all relative ${
            activeTab === "drinks"
              ? "text-[#2a1f16]"
              : "text-[#8a7a68] hover:text-[#5a4a38]"
          }`}
        >
          DRINKS
          {activeTab === "drinks" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[rgba(201,154,88,0.8)]"></div>
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("meals");
            setRenderKey(prev => prev + 1);
          }}
          className={`pb-4 text-[16px] sm:text-[18px] font-semibold uppercase tracking-wider transition-all relative ${
            activeTab === "meals"
              ? "text-[#2a1f16]"
              : "text-[#8a7a68] hover:text-[#5a4a38]"
          }`}
        >
          MEALS
          {activeTab === "meals" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[rgba(201,154,88,0.8)]"></div>
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("desserts");
            setRenderKey(prev => prev + 1);
          }}
          className={`pb-4 text-[16px] sm:text-[18px] font-semibold uppercase tracking-wider transition-all relative ${
            activeTab === "desserts"
              ? "text-[#2a1f16]"
              : "text-[#8a7a68] hover:text-[#5a4a38]"
          }`}
        >
          DESSERTS
          {activeTab === "desserts" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[rgba(201,154,88,0.8)]"></div>
          )}
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 scroll-reveal">
        {/* Left Column */}
        <div className="space-y-10">
          {leftColumn.map((item, idx) => (
            <div
              key={`${activeTab}-left-${item.name}-${idx}`}
              className="menu-item-card"
            >
              <div className="flex gap-3 sm:gap-4">
                {/* Icon */}
                <div className="menu-item-icon flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[rgba(201,154,88,0.1)] border border-[rgba(201,154,88,0.2)] flex items-center justify-center overflow-hidden p-2 sm:p-2.5">
                    {getMenuItemIcon(item)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#2a1f16] uppercase tracking-wide flex-shrink-0">
                      {item.name}
                    </h3>
                    {item.price && (
                      <>
                        <div className="flex-1 border-b-2 border-dotted border-[rgba(201,154,88,0.3)] mb-1"></div>
                        <span className="text-[16px] sm:text-[18px] font-bold text-[rgba(201,154,88,0.9)] whitespace-nowrap flex-shrink-0">
                          $ {item.price} USD
                        </span>
                      </>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#5a4a38]">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {rightColumn.map((item, idx) => (
            <div
              key={`${activeTab}-right-${item.name}-${idx}`}
              className="menu-item-card"
            >
              <div className="flex gap-3 sm:gap-4">
                {/* Icon */}
                <div className="menu-item-icon flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[rgba(201,154,88,0.1)] border border-[rgba(201,154,88,0.2)] flex items-center justify-center overflow-hidden p-2 sm:p-2.5">
                    {getMenuItemIcon(item)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#2a1f16] uppercase tracking-wide flex-shrink-0">
                      {item.name}
                    </h3>
                    {item.price && (
                      <>
                        <div className="flex-1 border-b-2 border-dotted border-[rgba(201,154,88,0.3)] mb-1"></div>
                        <span className="text-[16px] sm:text-[18px] font-bold text-[rgba(201,154,88,0.9)] whitespace-nowrap flex-shrink-0">
                          $ {item.price} USD
                        </span>
                      </>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#5a4a38]">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialty/Seasonal Drinks Section - Only for drinks tab */}
      {activeTab === "drinks" && seasonalItems.length > 0 && (
        <div key={`seasonal-section-${renderKey}`} className="pb-12">
          {/* Section Heading */}
          <div className="mt-16 mb-10 text-center">
            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#2a1f16] uppercase tracking-wider mb-2">
              Specialty/Seasonal Drinks
            </h3>
            <div className="w-16 h-1 bg-[rgba(201,154,88,0.4)] mx-auto rounded-full"></div>
          </div>

          {/* Seasonal Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 scroll-reveal">
            {/* Left Column */}
            <div className="space-y-10">
              {seasonalLeftColumn.map((item, idx) => (
                <div
                  key={`${activeTab}-seasonal-left-${item.name}-${idx}`}
                  className="menu-item-card"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="menu-item-icon flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[rgba(201,154,88,0.1)] border border-[rgba(201,154,88,0.2)] flex items-center justify-center overflow-hidden p-2 sm:p-2.5">
                        {getMenuItemIcon(item)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Mobile: Stack name and price */}
                      <div className="sm:hidden mb-2">
                        <h3 className="text-[16px] font-bold text-[#2a1f16] uppercase tracking-wide leading-tight mb-1">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-[14px] font-bold text-[rgba(201,154,88,0.9)]">
                            ${item.price}
                          </span>
                        )}
                      </div>

                      {/* Desktop: Inline with dotted line */}
                      <div className="hidden sm:flex items-baseline gap-3 mb-2">
                        <h3 className="text-[18px] md:text-[20px] font-bold text-[#2a1f16] uppercase tracking-wide flex-shrink-0">
                          {item.name}
                        </h3>
                        {item.price && (
                          <>
                            <div className="flex-1 border-b-2 border-dotted border-[rgba(201,154,88,0.3)] mb-1 min-w-[20px]"></div>
                            <span className="text-[16px] md:text-[18px] font-bold text-[rgba(201,154,88,0.9)] whitespace-nowrap flex-shrink-0">
                              ${item.price}
                            </span>
                          </>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#5a4a38]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-10">
              {seasonalRightColumn.map((item, idx) => (
                <div
                  key={`${activeTab}-seasonal-right-${item.name}-${idx}`}
                  className="menu-item-card"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="menu-item-icon flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[rgba(201,154,88,0.1)] border border-[rgba(201,154,88,0.2)] flex items-center justify-center overflow-hidden p-2 sm:p-2.5">
                        {getMenuItemIcon(item)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Mobile: Stack name and price */}
                      <div className="sm:hidden mb-2">
                        <h3 className="text-[16px] font-bold text-[#2a1f16] uppercase tracking-wide leading-tight mb-1">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-[14px] font-bold text-[rgba(201,154,88,0.9)]">
                            ${item.price}
                          </span>
                        )}
                      </div>

                      {/* Desktop: Inline with dotted line */}
                      <div className="hidden sm:flex items-baseline gap-3 mb-2">
                        <h3 className="text-[18px] md:text-[20px] font-bold text-[#2a1f16] uppercase tracking-wide flex-shrink-0">
                          {item.name}
                        </h3>
                        {item.price && (
                          <>
                            <div className="flex-1 border-b-2 border-dotted border-[rgba(201,154,88,0.3)] mb-1 min-w-[20px]"></div>
                            <span className="text-[16px] md:text-[18px] font-bold text-[rgba(201,154,88,0.9)] whitespace-nowrap flex-shrink-0">
                              ${item.price}
                            </span>
                          </>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#5a4a38]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 scroll-reveal">
          <p className="text-[18px] text-[#8a7a68]">
            No items in this section yet. Check back soon!
          </p>
        </div>
      )}
    </>
  );
}
