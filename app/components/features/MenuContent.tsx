"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MenuItemModal from "./MenuItemModal";

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
    name: "Drip Coffee",
    price: "3.50",
    description: "Classic drip coffee brewed fresh throughout the day. Smooth and bold.",
    section: "drinks",
  },
  {
    name: "Cappuccino",
    price: "4.50",
    description: "Espresso with velvety steamed milk and thick foam. Perfectly balanced.",
    section: "drinks",
  },
  {
    name: "Vanilla Latte",
    price: "5.00",
    description: "House-made vanilla syrup, espresso, and steamed milk. Sweet and creamy.",
    section: "drinks",
  },
  {
    name: "Iced Mocha",
    price: "5.50",
    description: "Rich chocolate, espresso, and milk over ice. Cool and indulgent.",
    section: "drinks",
  },
  {
    name: "Cold Brew",
    price: "4.50",
    description: "Smooth cold brew steeped for 16 hours. Served over ice, naturally sweet.",
    section: "drinks",
  },
  {
    name: "Caramel Macchiato",
    price: "5.50",
    description: "Vanilla-infused milk, espresso, and caramel drizzle. Layered and sweet.",
    section: "drinks",
  },
];

const MENU_SEASONAL: MenuItem[] = [
  {
    name: "Pumpkin Spice Latte",
    price: "6.00",
    description: "Fall classic with pumpkin, cinnamon, and nutmeg. Topped with whipped cream.",
    section: "drinks",
    category: "seasonal",
  },
  {
    name: "Honey Lavender Latte",
    price: "5.75",
    description: "Floral lavender and local honey with espresso and steamed milk. Light and aromatic.",
    section: "drinks",
    category: "seasonal",
  },
  {
    name: "Iced Brown Sugar Shaken Espresso",
    price: "5.50",
    description: "Shaken espresso with brown sugar and oat milk over ice. Smooth and lightly sweet.",
    section: "drinks",
    category: "seasonal",
  },
  {
    name: "Peppermint Mocha",
    price: "6.00",
    description: "Rich chocolate, espresso, and cool peppermint. Holiday favorite, hot or iced.",
    section: "drinks",
    category: "seasonal",
  },
];

const MENU_MEALS: MenuItem[] = [
  {
    name: "Breakfast Sandwich",
    price: "8.50",
    description: "Egg, cheddar, and bacon on a toasted English muffin. Add avocado +$2.",
    section: "meals",
  },
  {
    name: "Avocado Toast",
    price: "9.00",
    description: "Smashed avocado on sourdough with cherry tomatoes, feta, and chili flakes.",
    section: "meals",
  },
  {
    name: "Turkey & Swiss Panini",
    price: "10.50",
    description: "Sliced turkey, Swiss cheese, spinach, and honey mustard on pressed ciabatta.",
    section: "meals",
  },
  {
    name: "Grilled Cheese & Tomato Soup",
    price: "9.50",
    description: "Classic grilled cheese on sourdough with creamy tomato basil soup.",
    section: "meals",
  },
  {
    name: "Caesar Salad",
    price: "9.00",
    description: "Crisp romaine, parmesan, croutons, and house Caesar dressing. Add chicken +$3.",
    section: "meals",
  },
  {
    name: "Yogurt Parfait",
    price: "7.00",
    description: "Greek yogurt layered with granola, fresh berries, and a drizzle of honey.",
    section: "meals",
  },
];

const MENU_DESSERTS: MenuItem[] = [
  {
    name: "New York Cheesecake",
    price: "6.00",
    description: "Classic creamy cheesecake on a graham cracker crust. Topped with berry compote.",
    section: "desserts",
  },
  {
    name: "Chocolate Brownie",
    price: "5.00",
    description: "Rich, fudgy brownie with walnuts. Served warm with vanilla ice cream.",
    section: "desserts",
  },
  {
    name: "Chocolate Chip Cookie",
    price: "3.50",
    description: "Freshly baked, gooey center with semi-sweet chocolate chips. A classic favorite.",
    section: "desserts",
  },
  {
    name: "Cinnamon Roll",
    price: "5.50",
    description: "House-made cinnamon roll with cream cheese frosting. Warm and indulgent.",
    section: "desserts",
  },
];

export default function MenuContent({ items }: MenuContentProps) {
  const [activeTab, setActiveTab] = useState<"drinks" | "meals" | "desserts">("drinks");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Clear after animation
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Tabs - Sticky */}
      <div className="menu-tabs-sticky flex justify-center gap-8 sm:gap-16 mb-8 border-b border-[rgba(201,154,88,0.2)] scroll-reveal">
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

      {/* Drinks Tab - Notebook Café Card Design */}
      {activeTab === "drinks" && (
        <div className="w-full max-w-[1200px] mx-auto px-1 sm:px-4 lg:px-6 scroll-reveal">
          <div className="notebook-menu-grid">
            {MENU_DRINKS.map((drink, idx) => (
              <div
                key={`drink-${idx}`}
                className="notebook-menu-item"
                onClick={() => handleItemClick(drink)}
              >
                {/* Text Content - Title, Description, Price */}
                <div className="notebook-item-content">
                  <h3 className="notebook-item-header">{drink.name}</h3>
                  <p className="notebook-item-details">{drink.description}</p>
                  <p className="notebook-item-pricing">${drink.price}</p>
                </div>

                {/* Visual Section - Image + Add Button */}
                <div className="notebook-item-visual">
                  <Image
                    src="/unsplash/dark-coffee.png"
                    alt={drink.name}
                    fill
                    className="notebook-item-photo"
                  />
                  <button
                    className="notebook-add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(drink);
                    }}
                    aria-label={`Add ${drink.name}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Specialty/Seasonal Section */}
          <div className="mt-16 pt-12 border-t-2 border-[rgba(201,154,88,0.15)]">
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#2a1f16] tracking-wide mb-2">
                SPECIALTY / SEASONAL
              </h3>
              <div className="w-16 h-1 bg-[rgba(201,154,88,0.4)] mx-auto rounded-full"></div>
            </div>

            <div className="notebook-menu-grid">
              {MENU_SEASONAL.map((drink, idx) => (
                <div
                  key={`seasonal-${idx}`}
                  className="notebook-menu-item"
                >
                  {/* Text Content - Title, Description, Price */}
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>

                  {/* Visual Section - Image + Add Button */}
                  <div className="notebook-item-visual">
                    <Image
                      src="/unsplash/dark-coffee.png"
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button className="notebook-add-btn" aria-label={`Add ${drink.name}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Meals Tab */}
      {activeTab === "meals" && (
        <div className="w-full max-w-[1200px] mx-auto px-1 sm:px-4 lg:px-6 scroll-reveal">
          <div className="notebook-menu-grid">
            {MENU_MEALS.map((meal, idx) => (
              <div
                key={`meal-${idx}`}
                className="notebook-menu-item"
              >
                {/* Text Content - Title, Description, Price */}
                <div className="notebook-item-content">
                  <h3 className="notebook-item-header">{meal.name}</h3>
                  <p className="notebook-item-details">{meal.description}</p>
                  <p className="notebook-item-pricing">${meal.price}</p>
                </div>

                {/* Visual Section - Image + Add Button */}
                <div className="notebook-item-visual">
                  <Image
                    src="/unsplash/dark-coffee.png"
                    alt={meal.name}
                    fill
                    className="notebook-item-photo"
                  />
                  <button className="notebook-add-btn" aria-label={`Add ${meal.name}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desserts Tab */}
      {activeTab === "desserts" && (
        <div className="w-full max-w-[1200px] mx-auto px-1 sm:px-4 lg:px-6 scroll-reveal">
          <div className="notebook-menu-grid">
            {MENU_DESSERTS.map((dessert, idx) => (
              <div
                key={`dessert-${idx}`}
                className="notebook-menu-item"
              >
                {/* Text Content - Title, Description, Price */}
                <div className="notebook-item-content">
                  <h3 className="notebook-item-header">{dessert.name}</h3>
                  <p className="notebook-item-details">{dessert.description}</p>
                  <p className="notebook-item-pricing">${dessert.price}</p>
                </div>

                {/* Visual Section - Image + Add Button */}
                <div className="notebook-item-visual">
                  <Image
                    src="/unsplash/dark-coffee.png"
                    alt={dessert.name}
                    fill
                    className="notebook-item-photo"
                  />
                  <button className="notebook-add-btn" aria-label={`Add ${dessert.name}`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Menu Item Modal */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
      />
    </>
  );
}
