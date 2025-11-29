"use client";

import { useMemo, useState } from "react";
import { Sparkles, X } from "lucide-react";
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
      <div
        className="bg-cafe-black text-white py-24 md:py-32 px-6 text-center"
        style={{ backgroundColor: "#2C2420", color: "#FFFFFF" }}
      >
        <h1 className="font-serif text-5xl md:text-6xl mb-4">Our Menu</h1>
        <p className="text-cafe-beige font-light max-w-lg mx-auto">
          Thoughtfully sourced, carefully prepared. We believe in quality over quantity.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8">
        {/* Tabs */}
        <div
          className="shadow-lg rounded-sm p-2 flex justify-center gap-2 overflow-x-auto"
          style={{ backgroundColor: "#F4F1EA" }}
        >
          {(["drinks", "meals", "desserts"] as MenuSection[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-sm uppercase text-xs tracking-widest font-semibold transition-all ${
                activeTab === cat ? "bg-cafe-tan text-white shadow-md" : "text-cafe-brown hover:bg-cafe-mist"
              }`}
              style={{
                backgroundColor: activeTab === cat ? "#A48D78" : "transparent",
                color: activeTab === cat ? "#FFFFFF" : "#4A3B32",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 mt-16">
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

      {/* Seasonal Highlight */}
      <section className="mt-24 mb-20 max-w-7xl mx-auto px-6">
        <div
          className="bg-cafe-mist rounded-sm p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center border border-cafe-beige/30"
          style={{ backgroundColor: "#F4F1EA" }}
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-cafe-tan">
              <Sparkles size={16} />
              <span className="uppercase text-xs tracking-widest font-bold">Seasonal Special</span>
            </div>
            <h3 className="font-serif text-3xl text-cafe-black">Lavender Honey Oat Latte</h3>
            <p className="text-cafe-brown/80 font-light">
              Our house-made syrup infused with dried lavender buds and organic wildflower honey, paired with our
              signature espresso blend and creamy oat milk.
            </p>
          </div>
          <div className="w-full md:w-1/3 aspect-square rounded-sm overflow-hidden relative">
            <Image
              src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=800"
              alt="Lavender Honey Oat Latte"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

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
