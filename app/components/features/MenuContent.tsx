"use client";

import { useState } from "react";
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
const MENU_FEATURED: MenuItem[] = [
  {
    name: "Honey Lavender Latte",
    price: "5.75",
    description: "Floral lavender and local honey with espresso and steamed milk. Light and aromatic.",
    section: "drinks",
    imageUrl: "/menu/honey-lavender-latte.jpg",
  },
  {
    name: "Iced Brown Sugar Shaken Espresso",
    price: "5.50",
    description: "Shaken espresso with brown sugar and oat milk over ice. Smooth and lightly sweet.",
    section: "drinks",
    imageUrl: "/menu/iced-brown-sugar-espresso.jpg",
  },
];

const MENU_ESPRESSO: MenuItem[] = [
  {
    name: "Espresso",
    price: "3.50",
    description: "Rich, concentrated shot of pure coffee excellence. Bold flavor with a smooth crema finish.",
    section: "drinks",
    imageUrl: "/menu/tnc-menu-expresso-1.png",
  },
  {
    name: "Cappuccino",
    price: "4.50",
    description: "Espresso with velvety steamed milk and thick foam. Perfectly balanced.",
    section: "drinks",
    imageUrl: "/menu/cappuccino.jpg",
  },
  {
    name: "Vanilla Latte",
    price: "5.00",
    description: "House-made vanilla syrup, espresso, and steamed milk. Sweet and creamy.",
    section: "drinks",
    imageUrl: "/menu/vanilla-latte.jpg",
  },
  {
    name: "Caramel Macchiato",
    price: "5.50",
    description: "Vanilla-infused milk, espresso, and caramel drizzle. Layered and sweet.",
    section: "drinks",
    imageUrl: "/menu/caramel-macchiato.jpg",
  },
];

const MENU_CLASSIC_COFFEE: MenuItem[] = [
  {
    name: "Drip Coffee",
    price: "3.00",
    description: "Freshly brewed classic coffee. Available in light, medium, or dark roast.",
    section: "drinks",
    imageUrl: "/menu/cold-brew.jpg",
  },
  {
    name: "Americano",
    price: "3.75",
    description: "Espresso shots diluted with hot water. Bold yet smooth.",
    section: "drinks",
    imageUrl: "/menu/cold-brew.jpg",
  },
  {
    name: "Cold Brew",
    price: "4.50",
    description: "Smooth cold brew steeped for 16 hours. Served over ice, naturally sweet.",
    section: "drinks",
    imageUrl: "/menu/cold-brew.jpg",
  },
  {
    name: "Iced Coffee",
    price: "3.50",
    description: "Chilled brewed coffee over ice. Simple and refreshing.",
    section: "drinks",
    imageUrl: "/menu/cold-brew.jpg",
  },
];

const MENU_MATCHA: MenuItem[] = [
  {
    name: "Matcha Latte",
    price: "5.50",
    description: "Premium Japanese matcha whisked with steamed milk. Earthy and smooth.",
    section: "drinks",
    imageUrl: "/menu/vanilla-latte.jpg",
  },
  {
    name: "Iced Matcha Latte",
    price: "5.50",
    description: "Creamy iced matcha with your choice of milk. Refreshing green goodness.",
    section: "drinks",
    imageUrl: "/menu/iced-mocha.jpg",
  },
  {
    name: "Matcha Lemonade",
    price: "5.75",
    description: "Vibrant matcha shaken with fresh lemonade. Sweet, tart, and energizing.",
    section: "drinks",
    imageUrl: "/menu/iced-mocha.jpg",
  },
  {
    name: "Vanilla Matcha",
    price: "6.00",
    description: "Matcha with house-made vanilla syrup and steamed milk. Sweet and balanced.",
    section: "drinks",
    imageUrl: "/menu/vanilla-latte.jpg",
  },
  {
    name: "Coconut Matcha",
    price: "6.00",
    description: "Matcha with coconut milk and a hint of coconut syrup. Tropical twist.",
    section: "drinks",
    imageUrl: "/menu/vanilla-latte.jpg",
  },
  {
    name: "Strawberry Matcha",
    price: "6.25",
    description: "Matcha layered with strawberry puree and milk. Instagram-worthy favorite.",
    section: "drinks",
    imageUrl: "/menu/iced-mocha.jpg",
  },
];

const MENU_TEAS: MenuItem[] = [
  {
    name: "Earl Grey Tea",
    price: "3.50",
    description: "Classic black tea with bergamot. Aromatic and refined.",
    section: "drinks",
    imageUrl: "/menu/cappuccino.jpg",
  },
  {
    name: "Chamomile Tea",
    price: "3.50",
    description: "Soothing herbal tea. Naturally caffeine-free and calming.",
    section: "drinks",
    imageUrl: "/menu/cappuccino.jpg",
  },
  {
    name: "Green Tea",
    price: "3.50",
    description: "Light and refreshing Japanese green tea. Delicate and pure.",
    section: "drinks",
    imageUrl: "/menu/cappuccino.jpg",
  },
  {
    name: "Chai Latte",
    price: "5.00",
    description: "Spiced black tea with steamed milk. Warm and comforting.",
    section: "drinks",
    imageUrl: "/menu/vanilla-latte.jpg",
  },
  {
    name: "Hot Chocolate",
    price: "4.50",
    description: "Rich dark chocolate with steamed milk and whipped cream. Kid and adult approved.",
    section: "drinks",
    imageUrl: "/menu/iced-mocha.jpg",
  },
];

const MENU_KIDS: MenuItem[] = [
  {
    name: "Steamed Milk",
    price: "3.00",
    description: "Warm steamed milk with a choice of vanilla, chocolate, or caramel flavor.",
    section: "drinks",
    imageUrl: "/menu/vanilla-latte.jpg",
  },
  {
    name: "Kids Hot Chocolate",
    price: "3.50",
    description: "Smaller portion of our rich hot chocolate. Topped with whipped cream and sprinkles.",
    section: "drinks",
    imageUrl: "/menu/iced-mocha.jpg",
  },
  {
    name: "Apple Juice",
    price: "2.50",
    description: "Fresh pressed apple juice. No added sugar.",
    section: "drinks",
    imageUrl: "/menu/cold-brew.jpg",
  },
  {
    name: "Chocolate Milk",
    price: "3.00",
    description: "Cold whole milk with premium chocolate syrup. Classic favorite.",
    section: "drinks",
    imageUrl: "/menu/iced-mocha.jpg",
  },
];

const MENU_SEASONAL: MenuItem[] = [
  {
    name: "Pumpkin Spice Latte",
    price: "6.00",
    description: "Fall classic with pumpkin, cinnamon, and nutmeg. Topped with whipped cream.",
    section: "drinks",
    category: "seasonal",
    imageUrl: "/menu/pumpkin-spice-latte.jpg",
  },
  {
    name: "Honey Lavender Latte",
    price: "5.75",
    description: "Floral lavender and local honey with espresso and steamed milk. Light and aromatic.",
    section: "drinks",
    category: "seasonal",
    imageUrl: "/menu/honey-lavender-latte.jpg",
  },
  {
    name: "Iced Brown Sugar Shaken Espresso",
    price: "5.50",
    description: "Shaken espresso with brown sugar and oat milk over ice. Smooth and lightly sweet.",
    section: "drinks",
    category: "seasonal",
    imageUrl: "/menu/iced-brown-sugar-espresso.jpg",
  },
  {
    name: "Peppermint Mocha",
    price: "6.00",
    description: "Rich chocolate, espresso, and cool peppermint. Holiday favorite, hot or iced.",
    section: "drinks",
    category: "seasonal",
    imageUrl: "/menu/peppermint-mocha.jpg",
  },
];

const MENU_MEALS: MenuItem[] = [
  {
    name: "Breakfast Sandwich",
    price: "8.50",
    description: "Egg, cheddar, and bacon on a toasted English muffin. Add avocado +$2.",
    section: "meals",
    imageUrl: "/menu/breakfast-sandwich.jpg",
  },
  {
    name: "Avocado Toast",
    price: "9.00",
    description: "Smashed avocado on sourdough with cherry tomatoes, feta, and chili flakes.",
    section: "meals",
    imageUrl: "/menu/avocado-toast.jpg",
  },
  {
    name: "Turkey & Swiss Panini",
    price: "10.50",
    description: "Sliced turkey, Swiss cheese, spinach, and honey mustard on pressed ciabatta.",
    section: "meals",
    imageUrl: "/menu/turkey-swiss-panini.jpg",
  },
  {
    name: "Grilled Cheese & Tomato Soup",
    price: "9.50",
    description: "Classic grilled cheese on sourdough with creamy tomato basil soup.",
    section: "meals",
    imageUrl: "/menu/grilled-cheese-soup.jpg",
  },
  {
    name: "Caesar Salad",
    price: "9.00",
    description: "Crisp romaine, parmesan, croutons, and house Caesar dressing. Add chicken +$3.",
    section: "meals",
    imageUrl: "/menu/caesar-salad.jpg",
  },
  {
    name: "Yogurt Parfait",
    price: "7.00",
    description: "Greek yogurt layered with granola, fresh berries, and a drizzle of honey.",
    section: "meals",
    imageUrl: "/menu/yogurt-parfait.jpg",
  },
];

const MENU_DESSERTS: MenuItem[] = [
  {
    name: "New York Cheesecake",
    price: "6.00",
    description: "Classic creamy cheesecake on a graham cracker crust. Topped with berry compote.",
    section: "desserts",
    imageUrl: "/menu/new-york-cheesecake.jpg",
  },
  {
    name: "Chocolate Brownie",
    price: "5.00",
    description: "Rich, fudgy brownie with walnuts. Served warm with vanilla ice cream.",
    section: "desserts",
    imageUrl: "/menu/chocolate-brownie.jpg",
  },
  {
    name: "Chocolate Chip Cookie",
    price: "3.50",
    description: "Freshly baked, gooey center with semi-sweet chocolate chips. A classic favorite.",
    section: "desserts",
    imageUrl: "/menu/chocolate-chip-cookie.jpg",
  },
  {
    name: "Cinnamon Roll",
    price: "5.50",
    description: "House-made cinnamon roll with cream cheese frosting. Warm and indulgent.",
    section: "desserts",
    imageUrl: "/menu/cinnamon-roll.jpg",
  },
];

export default function MenuContent({ items }: MenuContentProps) {
  const [activeTab, setActiveTab] = useState<"drinks" | "meals" | "desserts">("drinks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddClick = (e: React.MouseEvent, itemName: string) => {
    e.stopPropagation();
    setAddedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Clear after animation
  };

  return (
    <>
      {/* Tabs - Sticky */}
      <div className="menu-tabs-sticky flex justify-center gap-8 sm:gap-16 mb-3 scroll-reveal" style={{ borderBottom: '1px solid rgba(164, 141, 120, 0.2)' }}>
        <button
          onClick={() => setActiveTab("drinks")}
          className="pb-4 text-[16px] sm:text-[18px] font-semibold uppercase tracking-wider transition-all relative"
          style={{ color: activeTab === "drinks" ? "#2C2420" : "rgba(74, 59, 50, 0.6)" }}
          onMouseEnter={(e) => activeTab !== "drinks" && (e.currentTarget.style.color = "#4A3B32")}
          onMouseLeave={(e) => activeTab !== "drinks" && (e.currentTarget.style.color = "rgba(74, 59, 50, 0.6)")}
        >
          DRINKS
          {activeTab === "drinks" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: '#A48D78' }}></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("meals")}
          className="pb-4 text-[16px] sm:text-[18px] font-semibold uppercase tracking-wider transition-all relative"
          style={{ color: activeTab === "meals" ? "#2C2420" : "rgba(74, 59, 50, 0.6)" }}
          onMouseEnter={(e) => activeTab !== "meals" && (e.currentTarget.style.color = "#4A3B32")}
          onMouseLeave={(e) => activeTab !== "meals" && (e.currentTarget.style.color = "rgba(74, 59, 50, 0.6)")}
        >
          MEALS
          {activeTab === "meals" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: '#A48D78' }}></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("desserts")}
          className="pb-4 text-[16px] sm:text-[18px] font-semibold uppercase tracking-wider transition-all relative"
          style={{ color: activeTab === "desserts" ? "#2C2420" : "rgba(74, 59, 50, 0.6)" }}
          onMouseEnter={(e) => activeTab !== "desserts" && (e.currentTarget.style.color = "#4A3B32")}
          onMouseLeave={(e) => activeTab !== "desserts" && (e.currentTarget.style.color = "rgba(74, 59, 50, 0.6)")}
        >
          DESSERTS
          {activeTab === "desserts" && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: '#A48D78' }}></div>
          )}
        </button>
      </div>

      {/* Drinks Tab - Notebook Café Card Design */}
      {activeTab === "drinks" && (
        <div className="w-full max-w-[1200px] mx-auto px-1 sm:px-4 lg:px-6 scroll-reveal">
          {/* Featured Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-wide mb-2" style={{ color: '#2C2420' }}>
                FEATURED
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'rgba(164, 141, 120, 0.4)' }}></div>
            </div>
            <div className="notebook-menu-grid">
              {MENU_FEATURED.map((drink, idx) => (
                <div
                  key={`featured-${idx}`}
                  className="notebook-menu-item"
                  onClick={() => handleItemClick(drink)}
                >
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>
                  <div className="notebook-item-visual">
                    <Image
                      src={drink.imageUrl || "/unsplash/dark-coffee.png"}
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button
                      className={`notebook-add-btn ${addedItems.has(drink.name) ? 'added' : ''}`}
                      onClick={(e) => handleAddClick(e, drink.name)}
                      aria-label={`Add ${drink.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Espresso Section */}
          <div className="mb-16 pt-12 border-t-2" style={{ borderTopColor: 'rgba(164, 141, 120, 0.15)' }}>
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-wide mb-2" style={{ color: '#2C2420' }}>
                ESPRESSO
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'rgba(164, 141, 120, 0.4)' }}></div>
            </div>
            <div className="notebook-menu-grid">
              {MENU_ESPRESSO.map((drink, idx) => (
                <div
                  key={`espresso-${idx}`}
                  className="notebook-menu-item"
                  onClick={() => handleItemClick(drink)}
                >
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>
                  <div className="notebook-item-visual">
                    <Image
                      src={drink.imageUrl || "/unsplash/dark-coffee.png"}
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button
                      className={`notebook-add-btn ${addedItems.has(drink.name) ? 'added' : ''}`}
                      onClick={(e) => handleAddClick(e, drink.name)}
                      aria-label={`Add ${drink.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classic Coffee Section */}
          <div className="mb-16 pt-12 border-t-2" style={{ borderTopColor: 'rgba(164, 141, 120, 0.15)' }}>
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-wide mb-2" style={{ color: '#2C2420' }}>
                CLASSIC COFFEE
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'rgba(164, 141, 120, 0.4)' }}></div>
            </div>
            <div className="notebook-menu-grid">
              {MENU_CLASSIC_COFFEE.map((drink, idx) => (
                <div
                  key={`classic-${idx}`}
                  className="notebook-menu-item"
                  onClick={() => handleItemClick(drink)}
                >
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>
                  <div className="notebook-item-visual">
                    <Image
                      src={drink.imageUrl || "/unsplash/dark-coffee.png"}
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button
                      className={`notebook-add-btn ${addedItems.has(drink.name) ? 'added' : ''}`}
                      onClick={(e) => handleAddClick(e, drink.name)}
                      aria-label={`Add ${drink.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Matcha Section */}
          <div className="mb-16 pt-12 border-t-2" style={{ borderTopColor: 'rgba(164, 141, 120, 0.15)' }}>
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-wide mb-2" style={{ color: '#2C2420' }}>
                MATCHA
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'rgba(164, 141, 120, 0.4)' }}></div>
            </div>
            <div className="notebook-menu-grid">
              {MENU_MATCHA.map((drink, idx) => (
                <div
                  key={`matcha-${idx}`}
                  className="notebook-menu-item"
                  onClick={() => handleItemClick(drink)}
                >
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>
                  <div className="notebook-item-visual">
                    <Image
                      src={drink.imageUrl || "/unsplash/dark-coffee.png"}
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button
                      className={`notebook-add-btn ${addedItems.has(drink.name) ? 'added' : ''}`}
                      onClick={(e) => handleAddClick(e, drink.name)}
                      aria-label={`Add ${drink.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teas & More Section */}
          <div className="mb-16 pt-12 border-t-2" style={{ borderTopColor: 'rgba(164, 141, 120, 0.15)' }}>
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-wide mb-2" style={{ color: '#2C2420' }}>
                TEAS & MORE
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'rgba(164, 141, 120, 0.4)' }}></div>
            </div>
            <div className="notebook-menu-grid">
              {MENU_TEAS.map((drink, idx) => (
                <div
                  key={`tea-${idx}`}
                  className="notebook-menu-item"
                  onClick={() => handleItemClick(drink)}
                >
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>
                  <div className="notebook-item-visual">
                    <Image
                      src={drink.imageUrl || "/unsplash/dark-coffee.png"}
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button
                      className={`notebook-add-btn ${addedItems.has(drink.name) ? 'added' : ''}`}
                      onClick={(e) => handleAddClick(e, drink.name)}
                      aria-label={`Add ${drink.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kids Drinks Section */}
          <div className="mb-16 pt-12 border-t-2" style={{ borderTopColor: 'rgba(164, 141, 120, 0.15)' }}>
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-wide mb-2" style={{ color: '#2C2420' }}>
                KIDS DRINKS
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'rgba(164, 141, 120, 0.4)' }}></div>
            </div>
            <div className="notebook-menu-grid">
              {MENU_KIDS.map((drink, idx) => (
                <div
                  key={`kids-${idx}`}
                  className="notebook-menu-item"
                  onClick={() => handleItemClick(drink)}
                >
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>
                  <div className="notebook-item-visual">
                    <Image
                      src={drink.imageUrl || "/unsplash/dark-coffee.png"}
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button
                      className={`notebook-add-btn ${addedItems.has(drink.name) ? 'added' : ''}`}
                      onClick={(e) => handleAddClick(e, drink.name)}
                      aria-label={`Add ${drink.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialty/Seasonal Section */}
          <div className="pt-12 border-t-2" style={{ borderTopColor: 'rgba(164, 141, 120, 0.15)' }}>
            <div className="text-center mb-10">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-wide mb-2" style={{ color: '#2C2420' }}>
                SPECIALTY / SEASONAL
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'rgba(164, 141, 120, 0.4)' }}></div>
            </div>
            <div className="notebook-menu-grid">
              {MENU_SEASONAL.map((drink, idx) => (
                <div
                  key={`seasonal-${idx}`}
                  className="notebook-menu-item"
                  onClick={() => handleItemClick(drink)}
                >
                  <div className="notebook-item-content">
                    <h3 className="notebook-item-header">{drink.name}</h3>
                    <p className="notebook-item-details">{drink.description}</p>
                    <p className="notebook-item-pricing">${drink.price}</p>
                  </div>
                  <div className="notebook-item-visual">
                    <Image
                      src={drink.imageUrl || "/unsplash/dark-coffee.png"}
                      alt={drink.name}
                      fill
                      className="notebook-item-photo"
                    />
                    <button
                      className={`notebook-add-btn ${addedItems.has(drink.name) ? 'added' : ''}`}
                      onClick={(e) => handleAddClick(e, drink.name)}
                      aria-label={`Add ${drink.name}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                onClick={() => handleItemClick(meal)}
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
                    src={meal.imageUrl || "/unsplash/dark-coffee.png"}
                    alt={meal.name}
                    fill
                    className="notebook-item-photo"
                  />
                  <button
                    className={`notebook-add-btn ${addedItems.has(meal.name) ? 'added' : ''}`}
                    onClick={(e) => handleAddClick(e, meal.name)}
                    aria-label={`Add ${meal.name}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                onClick={() => handleItemClick(dessert)}
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
                    src={dessert.imageUrl || "/unsplash/dark-coffee.png"}
                    alt={dessert.name}
                    fill
                    className="notebook-item-photo"
                  />
                  <button
                    className={`notebook-add-btn ${addedItems.has(dessert.name) ? 'added' : ''}`}
                    onClick={(e) => handleAddClick(e, dessert.name)}
                    aria-label={`Add ${dessert.name}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Item Modal */}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
      />
    </>
  );
}
