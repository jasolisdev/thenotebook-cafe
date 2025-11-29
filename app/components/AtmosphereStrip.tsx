"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AtmosphereStripProps = {
  images: string[];
};

export default function AtmosphereStrip({ images }: AtmosphereStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActive = () => {
      const children = Array.from(container.children) as HTMLElement[];
      if (!children.length) return;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      let closestIdx = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      children.forEach((child, idx) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      container.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div
        ref={containerRef}
        className="flex gap-16 px-6 overflow-x-auto overflow-y-visible md:overflow-visible scrollbar-hide snap-x snap-mandatory pb-20 justify-center"
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-serif text-xl italic">The Notebook No. {i + 1}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 pb-2 md:hidden">
        {images.map((_, idx) => (
          <span
            key={idx}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: idx === activeIndex ? "#FFFFFF" : "rgba(255,255,255,0.3)",
              transform: idx === activeIndex ? "scale(1)" : "scale(1)",
              width: idx === activeIndex ? "20px" : "10px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
