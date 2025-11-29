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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const mobileStart = index % 2 === 0 ? "translate-x-[115%]" : "-translate-x-[115%]";
  const desktopStart = "md:translate-y-24 md:translate-x-0";
  const baseHidden = `${mobileStart} ${desktopStart}`;
  const baseVisible = "translate-x-0 translate-y-0";

  const imageDelay = index * 160;
  const nameDelay = imageDelay + 120;

  return (
    <div ref={ref} className="h-full flex flex-col items-center gap-4">
      <div
        className={`relative w-full max-w-[85%] sm:max-w-full aspect-[3/4] overflow-hidden rounded-lg transform transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          visible ? baseVisible : baseHidden
        }`}
        style={{ transitionDelay: `${imageDelay}ms` }}
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
        className={`font-serif text-lg md:text-xl text-cafe-brown text-center transform transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          visible ? baseVisible : baseHidden
        }`}
        style={{ transitionDelay: `${nameDelay}ms` }}
      >
        {pour.name}
      </h3>
    </div>
  );
}
