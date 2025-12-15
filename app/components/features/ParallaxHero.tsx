"use client";

import { CSSProperties, ReactNode } from "react";
import "../../styles/components/parallax-hero.css";

type ParallaxHeroProps = {
  className?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  headline?: string;
  subheadline?: string;
  children: ReactNode;
  contentClassName?: string;
  focusPercent?: number; // Vertical focus point (0-100, default 32)
  overlayVariant?: "default" | "light" | "lighter"; // Overlay darkness (default: "default")
};

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function ParallaxHero({
  className,
  backgroundImage,
  backgroundColor,
  headline,
  subheadline,
  contentClassName,
  children,
  focusPercent = 32, // Default keeps the main subject higher in view on mobile
  overlayVariant = "default",
}: ParallaxHeroProps) {
  const style = {
    "--parallax-hero-image": backgroundImage ? `url(${backgroundImage})` : "none",
    ...(backgroundColor ? { "--parallax-hero-color": backgroundColor } : null),
    backgroundPosition: `center ${focusPercent}%`,
  } as CSSProperties;

  const overlayClass = cx(
    "parallax-hero__overlay",
    overlayVariant !== "default" && `parallax-hero__overlay--${overlayVariant}`
  );

  return (
    <section className={cx("parallax-hero", className)} style={style} data-section="Hero">
      <div className={overlayClass} aria-hidden />

      <div className={cx("parallax-hero__content", contentClassName)}>
        {headline && <p className="parallax-hero__headline">{headline}</p>}
        {subheadline && <p className="parallax-hero__subheadline">{subheadline}</p>}
        {children}
      </div>
    </section>
  );
}
