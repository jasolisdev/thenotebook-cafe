"use client";

import "../../styles/components/philosophy-blob.css";
import { useEffect, useRef, useState } from "react";

export default function PhilosophyBlob() {
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

  const visibleClass = isVisible ? "philosophy-blob-visible" : "";

  return (
    <div className="blob-marker blob-marker-left" aria-hidden="true">
      <div
        ref={ref}
        className={`philosophy-blob ${visibleClass}`}
      />
    </div>
  );
}
