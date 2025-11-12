// app/components/HeroLamp.tsx
export default function HeroLamp({
  headline = "The Notebook Café",
  sub = "☕ Coming Soon ☕",
  tagline = "Coffee. Culture. House Music.",
  badge = "Opening Fall 2025",
  ctaText = "Follow us on Instagram",
  ctaHref = "#",
}: {
  headline?: string;
  sub?: string;
  tagline?: string;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section className="hero hero-gradient">
      <div className="hero-copy">
        <h1 className="text-[34px] leading-[1.05] sm:text-[44px] md:text-[54px] font-semibold ink-cream drop-shadow-[0_4px_18px_rgba(0,0,0,.45)]">
          {headline}
        </h1>

        <div className="mt-3 text-[22px] md:text-[26px] font-medium ink-cream-dim">
          {sub}
        </div>
        <div className="mt-2 text-[16px] md:text-[17px] ink-cream-dim">
          {tagline}
        </div>

        {badge ? <div className="mt-6 badge-gold">{badge}</div> : null}

        <div className="mt-6">
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            className="btn-pill"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
