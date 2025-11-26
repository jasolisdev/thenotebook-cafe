
/**
 * Homepage - The Notebook Café
 *
 * Main landing page featuring hero section, welcome content, card gallery,
 * atmosphere carousel, info cards, and newsletter signup.
 */
import { client } from "@/sanity/lib/client";
import NewsletterForm from "./components/features/NewsLetterForm";
import ScrollReveal from "./components/layout/ScrollReveal";
import HomeFloatingItems from "./components/decorative/HomeFloatingItems";
import SiteFooter from "./components/layout/SiteFooter";
import {
  Coffee,
  Music2,
  MapPin,
  Clock,
  Wifi,
  PlugZap,
  Armchair,
} from "lucide-react";
import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
} from "react-icons/si";
import CoffeeDifferenceSection from "./components/features/CoffeeDifferenceSection";
import AtmosphereCarousel from "./components/features/AtmosphereCarousel";
import HeroGallery from "./components/features/HeroGallery";
import WhatToExpectSection from "./components/features/WhatToExpectSection";
import Image from "next/image";

const mosaicItems = [
  {
    src: "/unsplash/coffee-shop-counter.jpg",
  },
  {
    src: "/unsplash/coffee-shop-interior.jpg",
    span2: true,
  },
  {
    src: "/unsplash/coffee-shop-atmosphere.jpg",
  }, // coffee bar
  {
    src: "/unsplash/coffee-shop-people.jpg",
  },
  {
    src: "/unsplash/coffee-shop-vintage.jpg",
  },
  {
    src: "/unsplash/espresso-pour.jpg",
  }, // outdoor seating
];

const atmosphereImages = [
  {
    src: "/unsplash/aesthetic-coffee-1.jpg",
    alt: "Cafe interior atmosphere"
  },
  {
    src: "/unsplash/aesthetic-coffee-2.jpg",
    alt: "Cafe seating area"
  },
  {
    src: "/unsplash/coffee-shop-interior.jpg",
    alt: "Cafe workspace ambiance"
  },
];

async function getData() {
  const [home, settings] = await Promise.all([
    client.fetch(`*[_type=="homePage"][0]{
      heroHeadline, heroTagline, statusLine, ctaText, ctaUrl,
      whatToExpectBullets, vibeCopy
    }`),
    client.fetch(
      `*[_type=="settings"][0]{ social{ instagram, spotify }, address, hours }`
    ),
  ]);
  return { home, settings };
}

export default async function HomePage() {
  const { home, settings } = await getData();

  return (
    <main className="site-layout" suppressHydrationWarning>
      <ScrollReveal />

      {/* HERO WRAPPER */}
      <section className="section-hero">
        {/* HERO */}
        <section className="hero hero-gradient relative">
          <HomeFloatingItems variant="hero" />
        <div className="hero-copy relative z-10">
          {/* Screen reader only title for SEO */}
          <h1 className="sr-only">
            {home?.heroHeadline || "The Notebook Café"}
          </h1>

          {/* Logo */}
          <div className="hero-logo-wrapper">
            <Image
              src="/logo.png"
              alt="The Notebook Café"
              className="hero-logo"
              width={320}
              height={100}
              priority
            />
          </div>

          {/* Tagline */}
          <p className="hero-tagline">Where Every Cup Tells a Story</p>

          {/* Descriptive Text */}
          <p className="hero-description">
            A new vibe is brewing...
            <span className="coffee-cup">
              ☕
              <span className="coffee-steam">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          </p>

          {/* Primary CTA */}
          <div className="hero-cta-wrapper">
            <a
              href={home?.ctaUrl || (settings?.social?.instagram ?? "#")}
              target="_blank"
              rel="noreferrer"
              className="hero-cta-button"
            >
              <span>FOLLOW FOR UPDATES</span>
              <svg
                className="hero-cta-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M1 8h14M9 2l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
        </section>
      </section>

      {/* Divider - Wavy transition to cream */}
      <div className="divider-cream" style={{ transform: "scaleY(-1)" }}>
        <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
      </div>

      {/* WELCOME SECTION - CREAM */}
      <section className="section-cream relative py-16 sm:py-20">
        <HomeFloatingItems variant="welcome" />
        {/* Welcome Header */}
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 scroll-reveal relative z-10">
          <h2 className="welcome-section-label">
            WELCOME TO THE NOTEBOOK CAFÉ
          </h2>
          <h1 className="welcome-section-description">
            COME FOR THE COFFEE, STAY FOR THE VIBE
          </h1>
        </div>
      </section>

      {/* FEATURED DRINKS SECTION */}
      <section className="section-featured">
        <div className="featured-card scroll-reveal">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop"
            alt="Featured specialty drink"
            width={1000}
            height={750}
            className="w-full h-auto"
          />
        </div>
        <div className="flex justify-center">
          <a href="/menu" className="featured-menu-button">
            <span>View Our Menu</span>
            <svg
              className="featured-menu-arrow"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* WHAT TO EXPECT SECTION */}
      <WhatToExpectSection />

      {/* OUR COMMITMENT SECTION */}
      <section className="section-cream relative pt-0 pb-16 sm:pb-20">
        <CoffeeDifferenceSection />
      </section>

      {/* HEAR THE VIBE Section */}
      <section className="section-cream py-16 sm:py-20 relative">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 scroll-reveal relative z-10">
          {/* Section Label */}
          <div className="section-label">
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">Hear the Vibe</span>
            <div className="welcome-divider-line"></div>
          </div>

          {/* Content */}
          <div className="section-label-description">
            <p className="text-[15px] sm:text-[16px] leading-relaxed max-w-[700px] mx-auto mb-10 text-[var(--desert-rock)]">
              Ambient house, soul, and groove—setting the perfect backdrop for
              focus and creation. Tune in to our curated playlist before the
              doors open.
            </p>
            <div className="music-visualizer mx-auto mb-6">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <a
                href={settings?.social?.spotify || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,141,120,0.15)] text-[rgba(164,141,120,0.9)] hover:bg-[rgba(164,141,120,0.25)] hover:text-[rgba(164,141,120,1)] transition"
                aria-label="Open Spotify"
              >
                <SiSpotify className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,141,120,0.15)] text-[rgba(164,141,120,0.9)] hover:bg-[rgba(164,141,120,0.25)] hover:text-[rgba(164,141,120,1)] transition"
                aria-label="Open Apple Music"
              >
                <SiApplemusic className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,141,120,0.15)] text-[rgba(164,141,120,0.9)] hover:bg-[rgba(164,141,120,0.25)] hover:text-[rgba(164,141,120,1)] transition"
                aria-label="Open SoundCloud"
              >
                <SiSoundcloud className="w-5 h-5" />
              </a>
            </div>
            <p className="text-[13px] sm:text-[14px] mt-6 mb-4 text-[var(--desert-rock)] opacity-90">
              Your soundtrack to focus, flow, and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* DESIGN NOTES / ATMOSPHERE Section */}
      <section className="section-cream py-16 sm:py-20 relative">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 scroll-reveal relative z-10">
          {/* Section Label */}
          <div className="section-label">
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">The Atmosphere</span>
            <div className="welcome-divider-line"></div>
          </div>

          {/* Content */}
          <div className="section-label-description mb-10">
            <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--desert-rock)] max-w-[700px] mx-auto mb-10">
              A calm, warm space designed for focus, comfort, and creativity.
            </p>

            {/* Amenities mini grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-[720px] mx-auto text-left">
              {[
                { label: "Fast & stable Wi-Fi", Icon: Wifi },
                { label: "Plenty of outlets", Icon: PlugZap },
                { label: "Cozy seating for long stays", Icon: Armchair },
                { label: "Ambient house & soul music", Icon: Music2 },
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className="flex items-center justify-start gap-2 text-[13.5px] sm:text-[14px] text-[rgba(42,31,22,0.9)]"
                >
                  <item.Icon
                    className="w-5 h-5 amenity-icon"
                    style={{
                      animationDelay: `${idx * 0.1}s`,
                      color: "var(--warm-roast)",
                    }}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Interior carousel - Horizontal scroll with overlap */}
            <AtmosphereCarousel images={atmosphereImages} />
          </div>
        </div>
      </section>


      {/* Divider - Wavy transition back to dark */}
      <div className="divider-cream">
        <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
      </div>

      {/* CARD GRID - 1 col on mobile, 2 cols on tablet+ */}
      <section className="section-dark py-20 sm:py-24 lg:py-28 relative">
        <HomeFloatingItems variant="cards" />
        <div className="mx-auto max-w-[1120px] px-5 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* CARD: Craft */}
            <div
              className="home-info-card scroll-reveal"
              style={{ animationDelay: "0s" }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <h3 className="text-[16px] min-[375px]:text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                  OUR CRAFT.
                </h3>
                <div className="home-card-icon">
                  <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-[13.5px] min-[375px]:text-[14.5px] sm:text-[15px] leading-6 sm:leading-7 ink-cream-dim">
                Specialty espresso, ethically sourced, and meticulously prepared
                beverages.
              </p>
            </div>

            {/* CARD: Vibe */}
            <div
              className="home-info-card scroll-reveal"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <h3 className="text-[16px] min-[375px]:text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                  THE VIBE.
                </h3>
                <div className="home-card-icon">
                  <Music2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-[13.5px] min-[375px]:text-[14.5px] sm:text-[15px] leading-6 sm:leading-7 ink-cream-dim">
                Ambient house music, creative energy, and a welcoming space for
                thinkers &amp; makers.
              </p>
            </div>

            {/* CARD: Location */}
            <div
              className="home-info-card scroll-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <h3 className="text-[16px] min-[375px]:text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                  LOCATION.
                </h3>
                <div className="home-card-icon">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-[13.5px] min-[375px]:text-[14.5px] sm:text-[15px] leading-6 sm:leading-7 ink-cream-dim">
                Corner of University Ave &amp; Orange St
                <br />
                Riverside, CA • Opening Early 2026
              </p>
            </div>

            {/* CARD: Hours */}
            <div
              className="home-info-card scroll-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <h3 className="text-[16px] min-[375px]:text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                  HOURS.
                </h3>
                <div className="home-card-icon">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-[13.5px] min-[375px]:text-[14.5px] sm:text-[15px] leading-6 sm:leading-7 ink-cream-dim">
                {settings?.hours?.weekday || "Mon–Fri: 7 AM – 9 PM"}
                <br />
                {settings?.hours?.weekend || "Sat–Sun: 8 AM – 10 PM"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Connected to Sanity */}
      <section className="home-newsletter mx-auto max-w-[720px] px-4 sm:px-6 mb-20 sm:mb-24 scroll-reveal relative z-10">
        <div className="home-newsletter-card text-center">
          <h3 className="text-[18px] min-[375px]:text-[20px] sm:text-[24px] font-semibold tracking-wide ink-cream mb-3">
            FOR CREATIVES &amp; COFFEE LOVERS
          </h3>
          <p className="text-[13px] min-[375px]:text-[14px] sm:text-[15px] ink-cream-dim mb-5 sm:mb-6 leading-relaxed">
            Join our community for opening announcements, exclusive pre-launch
            events, and first look at what we&apos;re brewing.
          </p>

          <NewsletterForm source="homepage" />
        </div>
      </section>

      {/* Footer */}
      <SiteFooter
        showFloatingItems={true}
        FloatingItemsComponent={HomeFloatingItems}
        vibeCopy={home?.vibeCopy}
      />
    </main>
  );
}
