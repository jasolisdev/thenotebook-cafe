"use client";

type FloatingItemsProps = {
  variant: "welcome" | "footer" | "hero" | "cards";
};

export default function HomeFloatingItems({ variant }: FloatingItemsProps) {
  if (variant === "welcome") {
    return (
      <div className="floating-items-container">
        <img
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item home-bean-up-left visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item home-bean-bottom-right visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-plant.svg"
          alt="Coffee plant decoration"
          className="floating-item home-coffee-plant visible"
          style={{ display: 'block' }}
        />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className="floating-items-container">
        <img
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item hero-bean-left visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item hero-bean-right visible"
          style={{ display: 'block' }}
        />
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className="floating-items-container">
        <img
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-top-left visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-top-right visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-bean-up-left.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-bottom-left visible"
          style={{ display: 'block' }}
        />
        <img
          src="/notebook-coffee-bean-bottom-right.svg"
          alt="Coffee bean decoration"
          className="floating-item cards-bean-bottom-right visible"
          style={{ display: 'block' }}
        />
      </div>
    );
  }

  // Footer variant
  return (
    <div className="floating-items-container">
      <img
        src="/notebook-footer-flower-dark.svg"
        alt="Flower decoration"
        className="floating-item footer-flower-dark visible"
        style={{ display: 'block' }}
      />
      <img
        src="/notebook-footer-coffe-bean-left-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item footer-bean-left-dark visible"
        style={{ display: 'block' }}
      />
      <img
        src="/notebook-footer-coffe-bean-right-dark.svg"
        alt="Coffee bean decoration"
        className="floating-item footer-bean-right-dark visible"
        style={{ display: 'block' }}
      />
    </div>
  );
}
