"use client";

import { useEffect, useRef, useState } from "react";

export default function StoryBlobs() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const visibleClass = isVisible ? "story-blob-visible" : "";

  return (
    <div ref={ref} className="story-blob-wrapper" aria-hidden="true">
      <div className="blob-marker blob-marker-left">
        <div className={`story-blob story-blob-left ${visibleClass}`} />
      </div>
    </div>
  );
}
