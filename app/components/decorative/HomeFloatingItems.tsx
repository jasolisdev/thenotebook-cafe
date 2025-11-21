"use client";

import Image from "next/image";

type FloatingItemsProps = {
  variant: "welcome" | "footer" | "hero" | "cards";
};

const decoSize = 200;

function DecoImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={decoSize}
      height={decoSize}
      className={className}
      priority={false}
    />
  );
}

export default function HomeFloatingItems({ variant }: FloatingItemsProps) {
  if (variant === "welcome") {
    return (
      <div className="floating-items-container">
        <DecoImage
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item home-bean-up-left visible"
        />
        <DecoImage
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item home-bean-bottom-right visible"
        />
        <DecoImage
          src="/notebook-coffee-plant.svg"
          alt="Coffee plant decoration"
          className="floating-item home-coffee-plant visible"
        />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className="floating-items-container">
        <DecoImage
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item hero-bean-left visible"
        />
        <DecoImage
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item hero-bean-right visible"
        />
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="floating-items-container">
        <DecoImage
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-top-left visible"
        />
        <DecoImage
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-top-right visible"
        />
        <DecoImage
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-bottom-left visible"
        />
        <DecoImage
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-bottom-right visible"
        />
      </div>
    );
  }

  // Footer variant
  return (
    <div className="floating-items-container">
      <DecoImage
        src="/notebook-footer-flower-dark.svg"
        alt="Flower decoration"
        className="floating-item footer-flower-dark visible"
      />
      <DecoImage
        src="/notebook-footer-coffe-bean-left-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item footer-bean-left-dark visible"
      />
      <DecoImage
        src="/notebook-footer-coffe-bean-right-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item footer-bean-right-dark visible"
      />
    </div>
  );
}
