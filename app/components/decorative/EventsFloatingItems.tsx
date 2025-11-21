"use client";

import Image from "next/image";

type EventsFloatingItemsProps = {
  variant: "hero" | "cream" | "footer";
};

const decoSize = 200;

export default function EventsFloatingItems({ variant }: EventsFloatingItemsProps) {
  if (variant === "hero") {
    return (
      <div className="floating-items-container">
        <Image
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item events-hero-bean-left visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
        <Image
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item events-hero-bean-right visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
      </div>
    );
  }

  if (variant === "cream") {
    return (
      <div className="floating-items-container">
        <Image
          src="/notebook-coffee-plant.svg"
          alt="Coffee plant decoration"
          className="floating-item events-cream-plant-left visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
        <Image
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item events-cream-bean-right visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
      </div>
    );
  }

  // Footer variant (would be for dark section if needed)
  return null;
}
