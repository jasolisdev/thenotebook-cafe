"use client";

import { useEffect, useRef, useState } from "react";

export default function AtmosphereBlob() {
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

  return (
    <div className="blob-marker blob-marker-atmosphere" aria-hidden="true">
      <div
        ref={ref}
        className={`atmosphere-blob ${isVisible ? "atmosphere-blob-visible" : ""}`}
      />
    </div>
  );
}
