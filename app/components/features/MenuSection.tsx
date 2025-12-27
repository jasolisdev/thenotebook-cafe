"use client";

import React from "react";
import { Button } from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";
import FadeInSection from "@/app/components/ui/FadeInSection";
import { MENU_ITEMS as ALL_MENU_ITEMS } from "@/app/constants";

// Select specific featured items from the real menu (Meals & Desserts)
const FEATURED_IDS = ["33", "36", "29", "41", "31", "39"];
const FEATURED_ITEMS = ALL_MENU_ITEMS.filter((item) =>
  FEATURED_IDS.includes(item.id),
);

const MenuSection: React.FC = () => {
  return (
    <section id="menu" className="pt-12 bg-cafe-mist">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center mb-20">
            <div className="space-y-6 relative pl-4 before:absolute before:left-0 before:top-2 before:h-24 before:w-px before:bg-cafe-tan/40">
              <Reveal>
                <span className="text-cafe-tan uppercase tracking-[0.25em] text-xs font-semibold block mb-4 font-inter">
                  Crafted With Care
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-cafe-black">
                  From Our <span className="text-cafe-tan">Kitchen</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="text-base md:text-lg text-cafe-brown/80 max-w-xl leading-relaxed">
                  Every item on our menu is made fresh daily. From buttery
                  croissants to hearty avocado toast, we pair quality
                  ingredients with our signature brews.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <ul className="space-y-2 text-[0.96rem] md:text-[1.1rem] text-cafe-brown list-disc list-inside">
                  <li>Signature espresso drinks</li>
                  <li>Fresh-baked pastries</li>
                  <li>All-day breakfast</li>
                  <li>Seasonal specials</li>
                </ul>
              </Reveal>
              <Reveal delay={260}>
                <div className="hidden lg:flex">
                  <Button
                    href="/menu"
                    variant="primary"
                    className="bg-cafe-brown text-cafe-cream hover:bg-cafe-black"
                  >
                    View Full Menu →
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="relative lg:pt-28">
              <FadeInSection delay="200ms">
                <div className="space-y-8">
                  {FEATURED_ITEMS.slice(0, 4).map((item) => (
                    <div
                      key={`crafted-${item.id}`}
                      className="group cursor-default"
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-xl font-semibold font-serif text-cafe-black group-hover:text-cafe-tan-dark transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex-grow mx-4 border-b border-cafe-luxe-oat/40" />
                        <span className="font-medium text-cafe-black">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-cafe-black/60 text-sm leading-relaxed max-w-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeInSection>
              <div className="mt-10 flex justify-center lg:hidden">
                <Button
                  href="/menu"
                  variant="primary"
                  className="bg-cafe-brown text-cafe-cream hover:bg-cafe-black"
                >
                  View Full Menu →
                </Button>
              </div>
            </div>
          </div>
        </div>

          {/*
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.3em] text-cafe-tan-dark font-bold block mb-4">
              The Selection
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl md:text-5xl font-bold font-dm-serif text-cafe-black">
              Featured Items
            </h2>
          </Reveal>
        </div>

        <FadeInSection delay="200ms">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {FEATURED_ITEMS.map((item) => (
              <div key={item.id} className="group cursor-default">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-semibold font-serif text-cafe-black group-hover:text-cafe-tan-dark transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex-grow mx-4 border-b border-cafe-luxe-oat/40" />
                  <span className="font-medium text-cafe-black">
                    {item.price}
                  </span>
                </div>
                <p className="text-cafe-black/60 text-sm leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <div className="mt-16 flex justify-center">
          <Reveal>
            <Button href="/menu" variant="cta" withArrow>
              View Our Menu
            </Button>
          </Reveal>
        </div>
        */}
      </div>
    </section>
  );
};

export default MenuSection;
