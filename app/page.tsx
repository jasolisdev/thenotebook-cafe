/* eslint-disable @next/next/no-img-element */
// app/page.tsx
import { client } from "@/sanity/lib/client";
import SiteHeader from "./components/SiteHeader";
import NewsletterForm from "./components/NewsLetterForm";
import ScrollReveal from "./components/ScrollReveal";
import HomeFloatingItems from "./components/HomeFloatingItems";
import SiteFooter from "./components/SiteFooter";
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
import CoffeeDifferenceSection from "./components/CoffeeDifferenceSection";
import AtmosphereCarousel from "./components/AtmosphereCarousel";
import Image from "next/image";

const mosaicItems = [
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    span2: true,
  },
  {
    src: "https://images.unsplash.com/photo-1459257868276-5e65389e2722?w=800&auto=format&fit=crop&q=80",
  }, // coffee bar
  {
    src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80",
  }, // outdoor seating
];

const atmosphereImages = [
  {
    src: "https://plus.unsplash.com/premium_photo-1677607237294-b041e4b57391?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Cafe interior atmosphere"
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1677607236617-aecfe677388f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Cafe seating area"
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1677607237201-64668c2266ab?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <main className="page-dark" suppressHydrationWarning>
      <ScrollReveal />

      {/* Fixed dark nav */}
      <SiteHeader
        instagramUrl={settings?.social?.instagram}
        spotifyUrl={settings?.social?.spotify}
      />

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
          <p className="hero-tagline">Where Every Sip Tells a Story</p>

          {/* Descriptive Text */}
          <p className="hero-description">
            A curated space where specialty coffee meets vibrant culture and
            soulful house music rhythms
          </p>

          {/* Primary CTA */}
          <div className="hero-cta-wrapper">
            <a
              href={home?.ctaUrl || (settings?.social?.instagram ?? "#")}
              target="_blank"
              rel="noreferrer"
              className="hero-cta-button"
            >
              <span>Follow Our Journey</span>
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

          {/* Secondary Badge */}
          <div className="hero-badge">
            <span className="hero-badge-icon">✦</span>
            <span>Opening Early Q1 2026</span>
            <span className="hero-badge-icon">✦</span>
          </div>
        </div>
      </section>

      {/* Divider - Wavy transition to cream */}
      <div className="divider-cream" style={{ transform: "scaleY(-1)" }}>
        <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
      </div>

      {/* CREAM SECTION */}
      <section className="section-cream relative pb-0">
        <HomeFloatingItems variant="welcome" />
        {/* Welcome Header */}
        <div className="mx-auto max-w-[900px] px-4 text-center mb-12 sm:px-6 sm:mb-16 scroll-reveal relative z-10">
          <h2
            className="text-[16px] min-[375px]:text-[20px] sm:text-[24px] md:text-[28px] font-medium tracking-wide mb-3 sm:mb-4"
            style={{ color: "rgba(164,131,116,0.9)" }}
          >
            WELCOME TO THE NOTEBOOK CAFÉ
          </h2>
          <h1
            className="text-[16px] min-[375px]:text-[18px] sm:text-[32px] md:text-[38px] font-bold tracking-tight mb-4 sm:mb-6"
            style={{ color: "#2a1f16" }}
          >
            COME FOR THE COFFEE, STAY FOR THE VIBE
          </h1>
        </div>

        {/* What to Expect */}
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 scroll-reveal relative z-10">
          {/* Section Label */}
          <div className="welcome-section-label">
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">What to Expect</span>
            <div className="welcome-divider-line"></div>
          </div>

          {/* Highlights Grid */}
          <div className="welcome-highlights-grid">
            {(
              home?.whatToExpectBullets ?? [
                "Specialty espresso, roasted right",
                "House music energy, daytime into night",
                "Stay, study, create — Riverside",
              ]
            ).map((t: string, i: number) => (
              <div
                key={i}
                className="welcome-highlight-card scroll-reveal"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="welcome-highlight-icon-wrapper">
                  {/* Coffee Cup with Steam - Index 0 */}
                  {i === 0 && (
                    <div className="welcome-icon-coffee">
                      <svg
                        className="coffee-cup"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="steam steam-1"></div>
                      <div className="steam steam-2"></div>
                      <div className="steam steam-3"></div>
                    </div>
                  )}

                  {/* Music Notes - Index 1 */}
                  {i === 1 && (
                    <div className="welcome-icon-music">
                      <svg
                        className="music-note music-note-1"
                        width="20"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                      <svg
                        className="music-note music-note-2"
                        width="16"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                    </div>
                  )}

                  {/* Notebook with Pen - Index 2 */}
                  {i === 2 && (
                    <svg
                      className="welcome-icon-notebook"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="4"
                        y="3"
                        width="13"
                        height="18"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="4"
                        y1="7"
                        x2="17"
                        y2="7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="7"
                        y1="11"
                        x2="14"
                        y2="11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="7"
                        y1="14"
                        x2="12"
                        y2="14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        className="notebook-pen"
                        d="M15 15L20 10L21 11L16 16L15 15Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <p className="welcome-highlight-text">{t}</p>
              </div>
            ))}
          </div>

          {/* CARD GALLERY */}
          <div className="mt-12 sm:mt-16 pb-0">
            <div className="test-container">
              <div className="main-hero">
                <div className="flex-h hero-gallery test-hero-gallery">
                  <div className="image-card transform-01 scroll-reveal">
                    <img
                      src="https://images.unsplash.com/photo-1612737144187-d51c1483225a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWVzdGhldGljJTIwY29mZmUlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D"
                      loading="lazy"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      srcSet="https://images.unsplash.com/photo-1612737144187-d51c1483225a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWVzdGhldGljJTIwY29mZmUlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D 900w"
                      alt="Aesthetic coffee drink"
                    />
                  </div>
                  <div className="image-card transform-02 scroll-reveal">
                    <img
                      src="https://images.unsplash.com/photo-1683882490013-5b94462881a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWVzdGhldGljJTIwY29mZmUlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D"
                      loading="lazy"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      srcSet="https://images.unsplash.com/photo-1683882490013-5b94462881a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWVzdGhldGljJTIwY29mZmUlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D 900w"
                      alt="Coffee bar aesthetic"
                    />
                  </div>
                  <div className="image-card transform-03 scroll-reveal">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1681711648620-9fa368907a86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmUlMjBjdXB8ZW58MHx8MHx8fDA%3D"
                      loading="lazy"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      srcSet="https://plus.unsplash.com/premium_photo-1681711648620-9fa368907a86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmUlMjBjdXB8ZW58MHx8MHx8fDA%3D 900w"
                      alt="Coffee cup close-up"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Vibe Copy */}
          {home?.vibeCopy && (
            <div className="welcome-vibe-section mt-40 sm:mt-24 lg:mt-28 pb-0">
              <div className="welcome-quote-mark">&quot;</div>
              <p className="welcome-vibe-text scroll-reveal">
                {home.vibeCopy}
              </p>
              <div className="welcome-quote-mark welcome-quote-mark-end">&quot;</div>
            </div>
          )}

          {/* What Makes Our Coffee Different */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <CoffeeDifferenceSection />
          </div>

          <div className="mt-10 sm:mt-12 flex justify-center pb-8 sm:pb-12">
            <a href="/menu" className="view-menu-button">
              <span>View Our Menu</span>
              <svg className="view-menu-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* HEAR THE VIBE Section */}
      <section className="section-cream py-16 sm:py-20 relative">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 scroll-reveal relative z-10">
          {/* Section Label */}
          <div className="welcome-section-label mb-8">
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">Hear the Vibe</span>
            <div className="welcome-divider-line"></div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <p
              className="text-[15px] sm:text-[16px] leading-relaxed max-w-[700px] mx-auto mb-10"
              style={{ color: "#2a1f16" }}
            >
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
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="Open Spotify"
              >
                <SiSpotify className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="Open Apple Music"
              >
                <SiApplemusic className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="Open SoundCloud"
              >
                <SiSoundcloud className="w-5 h-5" />
              </a>
            </div>
            <p
              className="text-[13px] sm:text-[14px] mt-6 mb-4"
              style={{ color: "rgba(164,131,116,0.9)" }}
            >
              Your soundtrack to focus, flow, and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* DESIGN NOTES / ATMOSPHERE Section */}
      <section className="section-cream py-16 sm:py-20 relative">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 scroll-reveal relative z-10">
          {/* Section Label */}
          <div className="welcome-section-label mb-8">
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">The Atmosphere</span>
            <div className="welcome-divider-line"></div>
          </div>

          {/* Content */}
          <div className="text-center mb-10">
            <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#2a1f16] max-w-[700px] mx-auto mb-10">
              A quiet canvas for creativity. We&apos;re building with warm wood
              laminates, calming olive green accents, and minimalist beige
              tones—a refined retreat from the hustle, built for long stays and
              deep focus.
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
      />
    </main>
  );
}
