/* eslint-disable @next/next/no-img-element */
"use client";

import { CSSProperties, ReactNode } from "react";
import "../../styles/components/parallax-hero.css";

type ParallaxHeroProps = {
  backgroundImage: string;
  headline?: string;
  subheadline?: string;
  children: ReactNode;
  contentClassName?: string;
};

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function ParallaxHero({
  backgroundImage,
  headline,
  subheadline,
  contentClassName,
  children,
}: ParallaxHeroProps) {
  const baseFocusPercent = 32; // keeps the main subject higher in view on mobile

  const style = {
    "--parallax-hero-image": `url(${backgroundImage})`,
    backgroundPosition: `center ${baseFocusPercent}%`,
  } as CSSProperties;

  return (
    <section className="parallax-hero" style={style} data-section="Hero">
      <div className="parallax-hero__overlay" aria-hidden />

      <div className={cx("parallax-hero__content", contentClassName)}>
        {headline && <p className="parallax-hero__headline">{headline}</p>}
        {subheadline && <p className="parallax-hero__subheadline">{subheadline}</p>}
        {children}
      </div>
    </section>
  );
}
