"use client";

import Image from "next/image";
import { useRef } from "react";

type AtmosphereStripProps = {
  images: string[];
};

export default function AtmosphereStrip({ images }: AtmosphereStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6">
      {/* Mobile: two-column grid with slight offsets */}
      <div className="grid grid-cols-2 gap-4 px-6 md:hidden">
        {images.map((src, i) => {
          const mobileOffset = i % 2 === 0 ? "translate-y-6" : "";
          return (
            <div
              key={i}
              className={`aspect-[3/4] relative overflow-hidden rounded-sm shadow-lg ${mobileOffset}`}
            >
              <Image
                src={src}
                alt={`The Notebook No. ${i + 1}`}
                width={320}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Desktop: horizontal strip */}
      <div
        ref={containerRef}
        className="hidden md:flex gap-16 px-6 overflow-x-auto overflow-y-visible md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-20 justify-center"
        style={{ paddingTop: "32px", paddingBottom: "48px" }}
      >
        {images.map((src, i) => {
          const tiltClass = i === 0 ? "1" : i === 1 ? "2" : i === 2 ? "1" : "2";
          return (
            <div
              key={i}
              className={`min-w-[260px] md:min-w-[320px] aspect-[4/5] relative group snap-center rounded-2xl overflow-hidden cursor-pointer atmosphere-tilt atmosphere-tilt-${tiltClass}`}
            >
              <Image
                src={src}
                alt={`The Notebook No. ${i + 1}`}
                width={320}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
