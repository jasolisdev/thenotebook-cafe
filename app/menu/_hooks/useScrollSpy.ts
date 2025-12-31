"use client";

import { useState, useEffect, useRef } from "react";

type UseScrollSpyOptions = {
  /** Root margin for intersection observer (e.g., "-20% 0px -70% 0px") */
  rootMargin?: string;
  /** Intersection threshold (0-1) */
  threshold?: number;
};

/**
 * Custom hook that tracks which section is currently in the viewport
 * using Intersection Observer for optimal performance.
 *
 * @param sectionIds - Array of section element IDs to observe
 * @param options - Configuration options for the observer
 * @returns The ID of the currently active/visible section
 */
export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): string | null {
  const { rootMargin = "-20% 0px -60% 0px", threshold = 0 } = options;
  const [activeSection, setActiveSection] = useState<string | null>(
    sectionIds[0] ?? null
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Track which sections are currently intersecting
    const intersectingEntries = new Map<string, IntersectionObserverEntry>();

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      // Update our map of intersecting entries
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingEntries.set(entry.target.id, entry);
        } else {
          intersectingEntries.delete(entry.target.id);
        }
      });

      // Find the topmost intersecting section
      if (intersectingEntries.size > 0) {
        let topSection: string | null = null;
        let topPosition = Infinity;

        intersectingEntries.forEach((entry, id) => {
          const rect = entry.boundingClientRect;
          if (rect.top < topPosition) {
            topPosition = rect.top;
            topSection = id;
          }
        });

        if (topSection) {
          setActiveSection(topSection);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    // Observe all section elements
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}
