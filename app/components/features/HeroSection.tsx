"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import RevealText from "@/app/components/ui/RevealText";
import FadeInSection from "@/app/components/ui/FadeInSection";

const CAFE_INFO = {
  name: "The Notebook Café",
  address: "3512 9th St",
  location: "Riverside, CA 92501",
};

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full min-h-[90svh] md:min-h-[100svh] overflow-hidden bg-cafe-mist flex flex-col items-center">
      {/* Hero Content Section - Now flex-grow to push bar down */}
      <div className="relative w-full flex-grow flex flex-col items-center justify-center pt-12 md:pt-16 pb-0 md:pb-0">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 animate-hero-zoom"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/menu/tnc-menu-banner.webp"
              alt="The Notebook Cafe Riverside"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="100vw"
              style={{
                width: "100%",
                height: "100%",
                objectPosition: "60% center",
              }}
            />
          </div>
          {/* Deep overlay for high contrast with text */}
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center h-full">
          <div className="max-w-5xl w-full text-center flex flex-col items-center mt-6 md:mt-0">
            <div className="mb-8 md:mb-10">
              <h1 className="leading-[1.1] md:leading-[0.9] tracking-tight font-serif text-white text-[38px] md:text-[84px] lg:text-[111px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <RevealText>
                  <span className="block font-bold whitespace-nowrap">
                    Where Every Cup
                  </span>
                </RevealText>
                <RevealText delay="100ms">
                  <span className="block italic mt-2 md:mt-4 opacity-95 whitespace-nowrap text-cafe-luxe-oat">
                    Tells A Story
                  </span>
                </RevealText>
              </h1>
            </div>

            <FadeInSection
              delay="300ms"
              className="flex flex-col items-center space-y-4 text-white"
            >
              <p className="font-inter font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-[13px] opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                SPECIALTY COFFEE IN RIVERSIDE, CA.
              </p>
              <p className="font-serif italic text-lg md:text-2xl opacity-80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] tracking-wide">
                Come for the coffee, stay for the vibes
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>

      {/* Integrated Location & Hours Bar - Updated to Mist */}
      <div className="relative w-full bg-cafe-mist border-t border-cafe-brown/10 z-20 flex items-center pt-8 pb-4 md:py-10 lg:py-12 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <FadeInSection
          delay="700ms"
          className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row items-center justify-center md:justify-between space-y-10 md:space-y-0"
        >
          {/* Location Segment */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="flex items-center space-x-2 mb-3 text-cafe-brown">
              <MapPin size={16} />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold font-inter">
                Location
              </span>
            </div>
            <p className="font-serif text-xl md:text-2xl text-cafe-brown tracking-tight leading-snug">
              {CAFE_INFO.address},<br className="md:hidden" />{" "}
              {CAFE_INFO.location}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CAFE_INFO.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center space-x-2 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-extrabold font-inter text-cafe-brown/85 hover:text-cafe-brown transition-colors group"
            >
              <span>Get Directions</span>
              <ArrowUpRight
                size={14}
                className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>

          {/* Hours Segment */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="flex items-center space-x-2 mb-3 text-cafe-brown">
              <Clock size={16} />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold font-inter">
                Hours
              </span>
            </div>
            <div className="font-serif leading-tight">
              <p className="text-xl md:text-2xl text-cafe-brown tracking-tight leading-snug">
                Mon - Sat: <br className="md:hidden" />{" "}
                <span className="italic font-light">7:00am - 6:00pm</span>
              </p>
              <p className="text-[9px] md:text-[10px] text-cafe-brown uppercase tracking-[0.4em] font-bold font-inter mt-4">
                Sundays Closed
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default HeroSection;
