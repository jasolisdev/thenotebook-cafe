"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import SiteFooter from "../components/layout/SiteFooter";
import Reveal from "../components/ui/Reveal";

type MenuSection = "drinks" | "meals" | "desserts";

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  section: MenuSection;
  category?: string;
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

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#FAF9F6" }}>
      {/* Header */}
      <div className="py-16 md:py-20 px-6 text-center" style={{ backgroundColor: "#FAF9F6" }}>
        <h1 className="font-serif text-5xl md:text-6xl mb-4" style={{ color: "#2C2420" }}>
          Our Menu
        </h1>
        <p className="font-light max-w-2xl mx-auto" style={{ color: "rgba(74, 59, 50, 0.75)", fontSize: "18px" }}>
          Thoughtfully sourced, carefully prepared. We believe in quality over quantity.
        </p>
      </div>

        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {/* Tabs */}
        <div className="p-2">
          <div className="flex justify-center gap-8 border-b border-[rgba(74,59,50,0.15)] pb-2 overflow-x-auto">
            {(["drinks", "meals", "desserts"] as MenuSection[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`pb-3 px-6 text-sm font-bold tracking-[0.22em] uppercase transition-all relative ${
                  activeTab === cat ? "text-cafe-black" : "text-cafe-brown/50 hover:text-cafe-brown"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                {activeTab === cat && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 animate-fade-in"
                    style={{ backgroundColor: "#A48D78" }}
                  ></span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-[rgba(74,59,50,0.12)]"></div>

        {/* Seasonal Highlight (Drinks) */}
        {activeTab === "drinks" && (
          <div
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
              <div className="absolute top-3 right-3 bg-[#A48D78] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-[0.18em] shadow-sm">
                Seasonal
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-5 text-left">
              <h3 className="font-serif text-3xl text-cafe-brown tracking-tight">Lavender Honey Oat Latte</h3>
              <p className="text-cafe-black/70 text-lg leading-relaxed">
                Our house-made syrup infused with dried lavender buds and organic wildflower honey, paired with our signature espresso blend and creamy oat milk.
              </p>
              <div className="pt-4">
                <button
                  className="px-8 py-3 text-sm font-bold tracking-[0.2em] uppercase transition-colors rounded-sm"
                  style={{ backgroundColor: "#4A3B32", color: "#FFFFFF" }}
                >
                  Try It Today
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 mt-4">
            {filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 100}>
                <div className="group cursor-pointer flex gap-4 items-start" onClick={() => setSelectedItem(item)}>
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
                        className="inline-block mt-2 text-[10px] uppercase tracking-wider font-bold text-cafe-tan px-2 py-1 bg-cafe-tan/10 rounded-sm"
                        style={{
                          color: "#A48D78",
                          backgroundColor: "rgba(164, 141, 120, 0.1)",
                          fontSize: "10px",
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cafe-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.imageUrl && (
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <Image src={selectedItem.imageUrl} alt={selectedItem.name} fill className="object-cover" />
              </div>
            )}
            <div className="p-8 md:p-10 flex-1 relative flex flex-col justify-center">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-cafe-brown hover:text-cafe-tan transition-colors"
              >
                <X size={24} />
              </button>
              <span className="text-cafe-tan text-xs uppercase tracking-widest font-bold mb-2">
                {selectedItem.section}
              </span>
              <h3 className="font-serif text-3xl mb-4 text-cafe-black">{selectedItem.name}</h3>
              <p className="text-cafe-brown/80 font-light mb-6 leading-relaxed">{selectedItem.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-serif text-cafe-black">{formatPrice(selectedItem.price)}</span>
                <button className="bg-cafe-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-cafe-tan transition-colors">
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
