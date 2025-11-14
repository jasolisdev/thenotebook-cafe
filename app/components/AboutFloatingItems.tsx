"use client";

type AboutFloatingItemsProps = {
  variant: "hero" | "body" | "mission";
};

export default function AboutFloatingItems({ variant }: AboutFloatingItemsProps) {
  if (variant === "hero") {
    return (
      <div className="floating-items-container">
        <img
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item about-hero-bean-left visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item about-hero-bean-right visible"
          style={{ display: 'block' }}
        />
      </div>
    );
  }

  if (variant === "body") {
    return (
      <div className="floating-items-container">
        <img
          src="/notebook-coffee-plant.svg"
          alt="Coffee plant decoration"
          className="floating-item about-body-plant-left visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item about-body-bean-right visible"
          style={{ display: 'block' }}
        />
      </div>
    );
  }

  // Mission variant (dark section)
  return (
    <div className="floating-items-container">
      <img
        src="/notebook-footer-flower-dark.svg"
        alt="Flower decoration"
        className="floating-item about-mission-flower visible"
        style={{ display: 'block' }}
      />
      <img
        src="/notebook-footer-coffe-bean-left-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item about-mission-bean-left visible"
        style={{ display: 'block' }}
      />
      <img
        src="/notebook-footer-coffe-bean-right-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item about-mission-bean-right visible"
        style={{ display: 'block' }}
      />
    </div>
  );
}
