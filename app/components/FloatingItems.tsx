"use client";
"use client";
import Image from "next/image";

export default function FloatingItems() {
  return (
    <div className="floating-items-container">
      <Image
        src="/notebook-cup-of-coffee.svg"
        alt="Coffee decoration"
        className="floating-item floating-cup visible"
        width={200}
        height={200}
        priority={false}
      />
      <Image
        src="/notebook-coffeebean-up-left.svg"
        alt="Coffee bean decoration"
        className="floating-item floating-bean-left visible"
        width={200}
        height={200}
        priority={false}
      />
      <Image
        src="/notebook-coffeebean-up-right.svg"
        alt="Coffee bean decoration"
        className="floating-item floating-bean-right visible"
        width={200}
        height={200}
        priority={false}
      />
    </div>
  );
}
