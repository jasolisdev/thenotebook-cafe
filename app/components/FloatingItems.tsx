"use client";

export default function FloatingItems() {
  return (
    <div className="floating-items-container">
      <img
        src="/notebook-cup-of-coffee.svg"
        alt="Coffee decoration"
        className="floating-item floating-cup visible"
        style={{ display: 'block' }}
      />
      <img
        src="/notebook-coffeebean-up-left.svg"
        alt="Coffee bean decoration"
        className="floating-item floating-bean-left visible"
        style={{ display: 'block' }}
      />
      <img
        src="/notebook-coffeebean-up-right.svg"
        alt="Coffee bean decoration"
        className="floating-item floating-bean-right visible"
        style={{ display: 'block' }}
      />
    </div>
  );
}
