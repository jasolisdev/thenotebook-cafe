"use client";

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
  const hasAnimated = useRef(false); // Track if initial animation has played

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
    // Calculate viewport height in pixels for rootMargin (doesn't support vh units)
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const bufferMargin = `${viewportHeight}px 0px ${viewportHeight}px 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMobile) {
          // On mobile: animate in when entering, stay visible while in section
          // Only reset when scrolled far away (section height buffer)
          if (entry.isIntersecting) {
            setVisible(true);
            hasAnimated.current = true;
          } else if (!entry.isIntersecting && hasAnimated.current) {
            // Far out of view (beyond buffer zone) - reset for next entrance
            setVisible(false);
            hasAnimated.current = false;
          }
        } else {
          // On desktop: only set visible to true when entering viewport, never back to false
          if (entry.isIntersecting) {
            setVisible(true);
          }
        }
      },
      {
        threshold: 0,
        rootMargin: bufferMargin // Large buffer: must scroll viewport height away to reset
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isMobile]);

  const mobileStart = index % 2 === 0 ? "translate-x-[115%]" : "-translate-x-[115%]";
  const desktopStart = "md:translate-y-[80%] md:translate-x-0";
  const baseHidden = `${mobileStart} ${desktopStart}`;
  const baseVisible = "translate-x-0 translate-y-0";
  const nameHidden = `${baseHidden} opacity-0`;
  const nameVisible = "translate-x-0 translate-y-0 opacity-100";

  const imageDelay = index * 160;
  // Name slides up after the image starts moving (add 400ms delay)
  const nameDelay = imageDelay + 400;
  const transitionTiming = "cubic-bezier(0.16, 1, 0.3, 1)";
  const transitionDuration = "2000ms"; // Lengthened for smoother, more visible animation

  return (
    <div ref={ref} className="h-full flex flex-col items-center gap-4">
      <div
        className={`relative w-full max-w-[75%] sm:max-w-full aspect-[3/4] overflow-hidden rounded-lg transform transition-all ${
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
          className="object-cover"
          priority={index < 2}
        />
      </div>
      <h3
        className={`font-serif text-lg md:text-xl text-cafe-brown text-center transform transition-all ${
          visible ? nameVisible : nameHidden
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
