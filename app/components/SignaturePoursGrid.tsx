"use client";

import "@/app/styles/components/signature-pours-grid.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Pour = {
  name: string;
  description?: string;
  image: string;
};

type Props = {
  pours: Pour[];
};

/**
 * SignaturePoursGrid
 *
 * Animates each pour card with a direction-aware slide:
 * - Mobile: cards alternate sliding in from right/left.
 * - Desktop: cards slide up.
 * Image animates first, then the name.
 */
export default function SignaturePoursGrid({ pours }: Props) {
  return (
    <>
      {pours.map((pour, index) => (
        <SignaturePourCard key={pour.name} pour={pour} index={index} />
      ))}
    </>
  );
}

function SignaturePourCard({ pour, index }: { pour: Pour; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set visible to true when entering viewport; never reset to false
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const mobileStart = index % 2 === 0 ? "translate-x-[130%]" : "-translate-x-[130%]";
  const desktopStart = "md:translate-y-[110%] md:translate-x-0";
  const baseHidden = `${mobileStart} ${desktopStart}`;
  const baseVisible = "translate-x-0 translate-y-0";
  const nameHiddenMobile = "translate-y-6 opacity-0";
  const nameVisibleMobile = "translate-y-0 opacity-100";
  const nameHiddenDesktop = `${baseHidden} opacity-0`;
  const nameVisibleDesktop = "translate-x-0 translate-y-0 opacity-100";

  const imageDelay = index * 160;
  // Name slides up after the image starts moving (add 400ms delay)
  const nameDelay = imageDelay + 400;
  const transitionTiming = "cubic-bezier(0.16, 1, 0.3, 1)";
  const transitionDuration = "1400ms";

  return (
    <div ref={ref} className="h-full flex flex-col items-center gap-4 signature-pour-card">
      <div
        className={`relative w-full max-w-[68%] sm:max-w-full h-[288px] md:h-[360px] overflow-visible rounded-lg transform transition-all p-4 md:p-5 flex items-center justify-center signature-pour-image-wrapper ${
          visible ? baseVisible : baseHidden
        }`}
        style={{
          transitionDelay: `${imageDelay}ms`,
          transitionTimingFunction: transitionTiming,
          transitionDuration
        }}
      >
        <Image
          src={pour.image}
          alt={pour.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-contain signature-pour-image ${index === 0 ? "scale-[1.24]" : ""}`}
          priority={index < 2}
        />
      </div>
      <h3
        className={`font-serif text-lg md:text-xl text-cafe-brown text-center transform transition-all ${
          visible
            ? `${nameVisibleMobile} md:${nameVisibleDesktop}`
            : `${nameHiddenMobile} md:${nameHiddenDesktop}`
        }`}
        style={{
          transitionDelay: `${nameDelay}ms`,
          transitionTimingFunction: transitionTiming,
          transitionDuration
        }}
      >
        {pour.name}
      </h3>
    </div>
  );
}
