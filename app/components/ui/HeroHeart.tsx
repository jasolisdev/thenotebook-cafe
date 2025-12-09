"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function HeroHeart() {
  const [liked, setLiked] = useState(false);
  const [popping, setPopping] = useState(false);

  const handleClick = () => {
    setLiked((prev) => !prev);
    setPopping(true);
    window.setTimeout(() => setPopping(false), 520);
  };

  const className = [
    "hero-heart-button",
    liked ? "is-liked" : "",
    popping ? "is-popping" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      aria-label={liked ? "Remove favorite" : "Add to favorites"}
      aria-pressed={liked}
      className={className}
      onClick={handleClick}
    >
      <span className="hero-heart-burst" aria-hidden />
      <Heart
        className="heart-icon"
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}
