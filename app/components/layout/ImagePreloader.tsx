"use client";

import { useEffect } from 'react';

/**
 * ImagePreloader Component
 *
 * Preloads critical hero background images for instant page transitions.
 * Images are fetched in the background on initial page load, ensuring
 * smooth navigation without loading flashes.
 *
 * @component
 * @example
 * ```tsx
 * // Add to root layout
 * <ImagePreloader />
 * ```
 */
export default function ImagePreloader() {
  useEffect(() => {
    // List of all hero images across the site
    const heroImages: string[] = [
      // Add any other critical images
    ];

    // Preload each image
    heroImages.forEach((src) => {
      // Use window.Image to avoid conflict with Next.js Image component
      const img = new window.Image();
      img.src = src;
      // Optional: Add to cache with higher priority
      img.loading = 'eager';
    });

    // Also preload using link tags for higher priority
    const preloadLinks = heroImages.map((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      // Add fetchpriority for modern browsers
      link.setAttribute('fetchpriority', 'high');
      return link;
    });

    // Append to head
    preloadLinks.forEach((link) => document.head.appendChild(link));

    // Cleanup
    return () => {
      preloadLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
