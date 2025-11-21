"use client";

import Image from "next/image";

type AboutFloatingItemsProps = {
  variant: "hero" | "body" | "mission";
};

const decoSize = 200;

export default function AboutFloatingItems({ variant }: AboutFloatingItemsProps) {
  if (variant === "hero") {
    return (
      <div className="floating-items-container">
        <Image
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item about-hero-bean-left visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
        <Image
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item about-hero-bean-right visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
      </div>
    );
  }

  if (variant === "body") {
    return (
      <div className="floating-items-container">
        <Image
          src="/notebook-coffee-plant.svg"
          alt="Coffee plant decoration"
          className="floating-item about-body-plant-left visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
        <Image
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item about-body-bean-right visible"
          width={decoSize}
          height={decoSize}
          priority={false}
        />
      </div>
    );
  }

  // Mission variant (dark section)
  return (
    <div className="floating-items-container">
      <Image
        src="/notebook-footer-flower-dark.svg"
        alt="Flower decoration"
        className="floating-item about-mission-flower visible"
        width={decoSize}
        height={decoSize}
        priority={false}
      />
      <Image
        src="/notebook-footer-coffe-bean-left-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item about-mission-bean-left visible"
        width={decoSize}
        height={decoSize}
        priority={false}
      />
      <Image
        src="/notebook-footer-coffe-bean-right-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item about-mission-bean-right visible"
        width={decoSize}
        height={decoSize}
        priority={false}
      />
    </div>
  );
}
