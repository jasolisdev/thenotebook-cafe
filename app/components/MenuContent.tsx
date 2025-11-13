"use client";

import { useState } from "react";

type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  section: "drinks" | "meals" | "desserts";
  category?: string;
  icon?: string;
};

type MenuContentProps = {
  items: MenuItem[];
};

const menuIcons: Record<string, string> = {
  // Default icons for different drink types
  espresso: "☕",
  latte: "🥤",
  "cold-brew": "🧊",
  tea: "🍵",
  food: "🥐",
  seasonal: "⭐",
};

export default function MenuContent({ items }: MenuContentProps) {
  const [activeTab, setActiveTab] = useState<"drinks" | "meals" | "desserts">("drinks");

  const filteredItems = items.filter((item) => item.section === activeTab);

  // Split items into two columns
  const midpoint = Math.ceil(filteredItems.length / 2);
  const leftColumn = filteredItems.slice(0, midpoint);
  const rightColumn = filteredItems.slice(midpoint);

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-8 sm:gap-16 mb-16 border-b border-[rgba(201,154,88,0.2)] scroll-reveal">
        <button
          onClick={() => setActiveTab("drinks")}
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
          onClick={() => setActiveTab("meals")}
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
          onClick={() => setActiveTab("desserts")}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 scroll-reveal">
        {/* Left Column */}
        <div className="space-y-8">
          {leftColumn.map((item, idx) => (
            <div
              key={idx}
              className="menu-item-card scroll-reveal"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="menu-item-icon flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(201,154,88,0.1)] border border-[rgba(201,154,88,0.2)] flex items-center justify-center text-2xl">
                    {item.icon || menuIcons[item.category || "espresso"] || "☕"}
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
        <div className="space-y-8">
          {rightColumn.map((item, idx) => (
            <div
              key={idx}
              className="menu-item-card scroll-reveal"
              style={{ animationDelay: `${(idx + leftColumn.length) * 0.05}s` }}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="menu-item-icon flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(201,154,88,0.1)] border border-[rgba(201,154,88,0.2)] flex items-center justify-center text-2xl">
                    {item.icon || menuIcons[item.category || "espresso"] || "☕"}
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
