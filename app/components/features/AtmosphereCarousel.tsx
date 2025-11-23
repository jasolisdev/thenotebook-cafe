'use client';

import { useEffect, useRef, useState } from 'react';

interface AtmosphereImage {
  src: string;
  alt: string;
}

interface AtmosphereCarouselProps {
  images: AtmosphereImage[];
}

export default function AtmosphereCarousel({ images }: AtmosphereCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Center carousel on card 2 immediately, then animate when visible
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;

    // First, instantly center card 2 (no animation yet)
    const centerCarousel = () => {
      const centerImage = carousel.querySelector('.image-card:nth-child(2)') as HTMLElement;
      if (centerImage && window.innerWidth < 768) {
        const scrollLeft = centerImage.offsetLeft - (carousel.offsetWidth - centerImage.offsetWidth) / 2;
        carousel.scrollTo({
          left: scrollLeft,
          behavior: 'auto', // Instant, no smooth scroll
        });
      }
    };

    // Center immediately
    setTimeout(centerCarousel, 50);

    // Then set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay so user sees the cards before animation starts
            setTimeout(() => {
              setAnimate(true);
            }, 200);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible (more in view)
      }
    );

    observer.observe(carousel);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-12 sm:mt-16 pb-0">
      <div className="test-container">
        <div className="main-hero">
          <div className="flex-h atmosphere-carousel" ref={carouselRef}>
            {images.map((item, idx) => {
              const cardNumber = idx + 1;
              const classes = [
                'image-card',
                'atmosphere-image-wrapper',
                `atmosphere-tilt-${cardNumber}`,
                `atmosphere-card-${cardNumber}`,
                'atmosphere-card-initial',
                animate ? 'atmosphere-card-animate' : '',
              ].filter(Boolean).join(' ');

              return (
                <div key={idx} className={classes}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={idx === 1 ? "eager" : "lazy"}
                  />
                  <span className="atmosphere-image-number">
                    {cardNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
