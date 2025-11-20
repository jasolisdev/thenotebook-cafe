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

// Hardcoded menu items
const MENU_DRINKS: MenuItem[] = [
  {
    name: "Marble Drip",
    price: "5.50",
    description: "Our in-house sweet milk made from condensed milk and fresh cream poured over bold Vietnamese coffee.",
    section: "drinks",
  },
  {
    name: "Egg Cream Coffee",
    price: "6.00",
    description: "Classic Vietnamese egg cream whipped with cocoa and layered over rich iced coffee.",
    section: "drinks",
  },
  {
    name: "Ube Cream Coffee",
    price: "6.00",
    description: "Smooth, fragrant ube cream blended with Vietnamese iced coffee for a sweet, earthy finish.",
    section: "drinks",
  },
  {
    name: "Matcha Cream Coffee",
    price: "6.00",
    description: "Premium matcha cold cream layered over bold Vietnamese coffee for a balanced, creamy sip.",
    section: "drinks",
  },
];

export default function MenuContent({ items }: MenuContentProps) {
  const [activeTab, setActiveTab] = useState<"drinks" | "meals" | "desserts">("drinks");

  return (
    <>
      {/* Tabs - Sticky */}
      <div className="menu-tabs-sticky flex justify-center gap-8 sm:gap-16 mb-16 border-b border-[rgba(201,154,88,0.2)] scroll-reveal">
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

      {/* Drinks Tab - New Card Design */}
      {activeTab === "drinks" && (
        <div className="max-w-[900px] mx-auto space-y-6 scroll-reveal">
          {MENU_DRINKS.map((drink, idx) => (
            <div
              key={`drink-${idx}`}
              className="menu-card"
            >
              {/* Left Side - Text */}
              <div className="flex-1">
                <h3 className="menu-card-title">{drink.name}</h3>
                <p className="menu-card-description">{drink.description}</p>
                <p className="menu-card-price">${drink.price}</p>
              </div>

              {/* Right Side - Image + Button */}
              <div className="relative flex-shrink-0">
                <div className="menu-card-image-wrapper">
                  <Image
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop"
                    alt={drink.name}
                    width={120}
                    height={120}
                    className="menu-card-image"
                  />
                </div>
                <button className="menu-card-plus-button" aria-label={`Add ${drink.name}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Specialty/Seasonal Section */}
          <div className="mt-16 pt-12 border-t-2 border-[rgba(201,154,88,0.15)]">
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#2a1f16] tracking-wide mb-2">
                SPECIALTY / SEASONAL
              </h3>
              <div className="w-16 h-1 bg-[rgba(201,154,88,0.4)] mx-auto rounded-full"></div>
            </div>

            <div className="text-center py-12">
              <p className="text-[16px] sm:text-[18px] text-[#8a7a68] italic">
                Check back soon for seasonal offerings
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Meals Tab - Placeholder */}
      {activeTab === "meals" && (
        <div className="text-center py-20 scroll-reveal">
          <div className="max-w-[600px] mx-auto">
            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#2a1f16] mb-4">
              Coming Soon
            </h3>
            <p className="text-[16px] sm:text-[18px] text-[#5a4a38] leading-relaxed">
              We're crafting a selection of fresh meals and light bites. Check back soon to see what's on the menu.
            </p>
          </div>
        </div>
      )}

      {/* Desserts Tab - Placeholder */}
      {activeTab === "desserts" && (
        <div className="text-center py-20 scroll-reveal">
          <div className="max-w-[600px] mx-auto">
            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#2a1f16] mb-4">
              Coming Soon
            </h3>
            <p className="text-[16px] sm:text-[18px] text-[#5a4a38] leading-relaxed">
              Sweet treats and handcrafted desserts will be added soon. Stay tuned for delicious updates.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
