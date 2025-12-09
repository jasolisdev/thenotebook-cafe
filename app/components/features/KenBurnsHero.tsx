"use client";

import { ReactNode, useEffect, useState } from "react";
import "../../styles/components/kenburns-hero.css";

type KenBurnsHeroProps = {
  backgroundImage?: string;
  headline?: string;
  subheadline?: string;
  children: ReactNode;
  contentClassName?: string;
};

export default function KenBurnsHero({
  backgroundImage,
  headline,
  subheadline,
  contentClassName,
  children,
}: KenBurnsHeroProps) {
  const hasImage = Boolean(backgroundImage);
  const [isHidden, setIsHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    const onScroll = () => {
      const threshold = window.innerWidth < 768 ? 520 : 500;
      const y = window.scrollY || window.pageYOffset;
      setIsHidden(y > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", onChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const cx = (...classes: (string | false | null | undefined)[]) =>
    classes.filter(Boolean).join(" ");

  return (
    <section
      data-section="Hero"
      className={cx(
        "kb-hero",
        !hasImage && "kb-hero--no-image",
        isHidden && "kb-hero--hidden",
        prefersReducedMotion && "kb-hero--reduce-motion",
      )}
    >
      {hasImage && (
        <div
          className="kb-hero__image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden
        />
      )}

      <div className={cx("kb-hero__content", contentClassName)}>
        {headline && <p className="kb-hero__headline">{headline}</p>}
        {subheadline && <p className="kb-hero__subheadline">{subheadline}</p>}
        {children}
      </div>
    </section>
  );
}
