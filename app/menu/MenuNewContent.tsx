"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Reveal from "../components/ui/Reveal";

type MenuSection = "drinks" | "meals" | "desserts";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  section: MenuSection;
  category?: string;
  subcategory?: string;
  sortOrder?: number;
  imageUrl?: string;
  tag?: "new" | "seasonal" | "popular";
};

type MenuNewContentProps = {
  items: MenuItem[];
};

function formatPrice(price?: string) {
  if (!price) return "";
  return price.startsWith("$") ? price : `$${price}`;
}

export default function MenuNewContent({ items }: MenuNewContentProps) {
  const [activeTab, setActiveTab] = useState<MenuSection>("drinks");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const normalizedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        tag: item.tag ?? (item.category === "seasonal" ? "seasonal" : undefined),
      })),
    [items],
  );

  const filteredItems = normalizedItems.filter((item) => item.section === activeTab);

  // Group items by subcategory for drinks
  const groupedItems = useMemo(() => {
    if (activeTab !== "drinks" || !filteredItems.some((item) => item.subcategory)) {
      return { "": filteredItems };
    }

    const groups: Record<string, MenuItem[]> = {};
    filteredItems.forEach((item) => {
      const subcategory = item.subcategory || "Other";
      if (!groups[subcategory]) {
        groups[subcategory] = [];
      }
      groups[subcategory].push(item);
    });
    return groups;
  }, [filteredItems, activeTab]);

  const hasSubcategories = activeTab === "drinks" && Object.keys(groupedItems).length > 1;

  return (
    <section
      data-section="Menu Page"
      className="min-h-screen"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* Header */}
      <section
        data-section="Menu Hero"
        className="pt-28 pb-16 md:pt-32 md:pb-20 px-6 text-center"
        style={{ backgroundColor: "#F4F1EA" }}
      >
        <h1 className="font-serif text-5xl md:text-6xl mb-4" style={{ color: "#2C2420" }}>
          Our Menu
        </h1>
        <p className="font-light max-w-2xl mx-auto" style={{ color: "rgba(74, 59, 50, 0.75)", fontSize: "18px" }}>
          Thoughtfully sourced, carefully prepared. We believe in quality over quantity.
        </p>
      </section>

      <section
        data-section="Menu Body"
        className="max-w-7xl mx-auto px-4 md:px-12 space-y-8"
      >
        {/* Tabs */}
        <div className="p-2">
          <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 border-b border-[rgba(74,59,50,0.15)] pb-2">
            {(["drinks", "meals", "desserts"] as MenuSection[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`pb-3 px-2 sm:px-4 md:px-6 text-xs sm:text-sm font-bold tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.22em] uppercase transition-all relative whitespace-nowrap ${activeTab === cat ? "text-cafe-black" : "text-cafe-brown/50 hover:text-cafe-brown"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                {activeTab === cat && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 animate-fade-in bg-cafe-tan"
                  ></span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-[rgba(74,59,50,0.12)]"></div>

        {/* Seasonal Highlight (Drinks) */}
        {activeTab === "drinks" && (
          <section
            data-section="Seasonal Highlight"
            className="p-8 md:p-10 rounded-sm mb-12 flex flex-col md:flex-row gap-10 items-center animate-fade-in"
            style={{ backgroundColor: "#F0E9DF", border: "1px solid #E1D6C9" }}
          >
            <div className="w-full md:w-1/3 aspect-square rounded-sm overflow-hidden relative" style={{ backgroundColor: "#E7D8C9" }}>
              <Image
                src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=800"
                alt="Lavender Honey Oat Latte"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-cafe-tan text-white text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-[0.18em] shadow-sm">
                Seasonal
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-5 text-left">
              <h3 className="font-serif text-3xl text-cafe-brown tracking-tight">Lavender Honey Oat Latte</h3>
              <p className="text-cafe-black/70 text-lg leading-relaxed">
                Our house-made syrup infused with dried lavender buds and organic wildflower honey, paired with our signature espresso blend and creamy oat milk.
              </p>
            </div>
          </section>
        )}

        {/* Grid */}
        <section
          data-section="Menu Grid"
        >
          {hasSubcategories ? (
            <div className="space-y-12">
              {Object.entries(groupedItems).map(([subcategory, subcategoryItems]) => (
                <div key={subcategory} className="space-y-6">
                  {/* Subcategory Header */}
                  <h2 className="font-serif text-2xl text-cafe-black pb-3">
                    {subcategory}
                  </h2>
                  {/* Subcategory Items */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                    {subcategoryItems.map((item, index) => (
                      <Reveal key={item.id} delay={index * 30} replay={false}>
                        <div
                          className="group cursor-pointer flex gap-4 items-start p-4 rounded-lg transition-all duration-300 hover:bg-cafe-tan/5 hover:shadow-md hover:-translate-y-1 relative"
                          onClick={() => setSelectedItem(item)}
                        >
                          <div className="flex-1">
                            <div className="flex justify-between items-baseline mb-2 border-b border-cafe-beige/20 pb-2 group-hover:border-cafe-tan/50 transition-colors">
                              <h3 className="font-serif text-xl text-cafe-black group-hover:text-cafe-tan transition-colors">
                                {item.name}
                              </h3>
                              <span className="font-sans font-medium text-cafe-brown">{formatPrice(item.price)}</span>
                            </div>
                            <p className="text-cafe-brown/70 text-sm font-light leading-relaxed">{item.description}</p>
                            {item.tag && (
                              <span
                                className="inline-block mt-2 text-2xs uppercase tracking-wider font-bold text-cafe-tan px-2 py-1 bg-cafe-tan/10 rounded-sm"
                              >
                                {item.tag}
                              </span>
                            )}
                          </div>
                          {/* Click indicator */}
                          <div className="flex-shrink-0 text-cafe-brown/30 group-hover:text-cafe-black transition-colors self-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="16" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-4">
              {filteredItems.map((item, index) => (
                <Reveal key={item.id} delay={index * 30} replay={false}>
                  <div
                    className="group cursor-pointer flex gap-4 items-start p-4 rounded-lg transition-all duration-300 hover:bg-cafe-tan/5 hover:shadow-md hover:-translate-y-1 relative"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-2 border-b border-cafe-beige/20 pb-2 group-hover:border-cafe-tan/50 transition-colors">
                        <h3 className="font-serif text-xl text-cafe-black group-hover:text-cafe-tan transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-sans font-medium text-cafe-brown">{formatPrice(item.price)}</span>
                      </div>
                      <p className="text-cafe-brown/70 text-sm font-light leading-relaxed">{item.description}</p>
                      {item.tag && (
                        <span
                          className="inline-block mt-2 text-2xs uppercase tracking-wider font-bold text-cafe-tan px-2 py-1 bg-cafe-tan/10 rounded-sm"
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>
                    {/* Click indicator */}
                    <div className="flex-shrink-0 text-cafe-brown/30 group-hover:text-cafe-tan transition-colors self-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-0 sm:p-4 bg-cafe-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-none sm:rounded-sm w-full h-full sm:h-auto sm:max-w-2xl overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.imageUrl && (
              <div className="w-full md:w-1/2 h-[40vh] sm:h-64 md:h-auto relative">
                <Image src={selectedItem.imageUrl} alt={selectedItem.name} fill className="object-cover" />
              </div>
            )}
            <div className="p-6 sm:p-8 md:p-10 flex-1 relative flex flex-col justify-between sm:justify-center overflow-y-auto">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-cafe-brown hover:text-cafe-tan transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 sm:bg-transparent sm:backdrop-blur-none sm:p-0"
              >
                <X size={24} />
              </button>
              <div className="flex-1 sm:flex-none">
                <span className="text-cafe-tan text-xs uppercase tracking-widest font-bold mb-2 block">
                  {selectedItem.section}
                </span>
                <h3 className="font-serif text-3xl mb-4 text-cafe-black">{selectedItem.name}</h3>
                <p className="text-cafe-brown/80 font-light mb-6 leading-relaxed">{selectedItem.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-cafe-beige/20 sm:border-0 sm:pt-0">
                <span className="text-2xl font-serif text-cafe-black">{formatPrice(selectedItem.price)}</span>
                <button className="bg-cafe-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-cafe-tan transition-colors">
                  Add to Order {formatPrice(selectedItem.price)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
