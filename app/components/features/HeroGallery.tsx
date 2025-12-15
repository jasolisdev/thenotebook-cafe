/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroImage {
  src: string;
  srcSet?: string;
  alt: string;
}

interface HeroGalleryProps {
  images: HeroImage[];
}

/**
 * HeroGallery Component
 *
 * Displays a gallery of tilted images with individual scroll-triggered animations.
 * Each card reveals independently as it enters the viewport.
 *
 * @component
 * @example
 * ```tsx
 * <HeroGallery images={[
 *   { src: "/image1.jpg", alt: "Coffee" },
 *   { src: "/image2.jpg", alt: "Espresso" },
 *   { src: "/image3.jpg", alt: "Latte" }
 * ]} />
 * ```
 */
export default function HeroGallery({ images }: HeroGalleryProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedCards, setAnimatedCards] = useState<boolean[]>(new Array(images.length).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;

      // Create observer for each individual card
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Animate this specific card
              setAnimatedCards((prev) => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.3, // Trigger when 30% visible
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [images.length]);

  return (
    <div className="mt-12 sm:mt-16 pb-0">
      <div className="test-container">
        <div className="main-hero">
          <div className="flex-h hero-gallery test-hero-gallery">
            {images.map((item, idx) => {
              const cardNumber = idx + 1;
              const classes = [
                'image-card',
                `transform-0${cardNumber}`,
                'gallery-spread-initial',
                animatedCards[idx] ? 'gallery-spread-animate' : '',
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={idx}
                  className={classes}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                >
                  <img
                    src={item.src}
                    loading={idx === 1 ? "eager" : "lazy"}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    srcSet={item.srcSet || item.src}
                    alt={item.alt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
