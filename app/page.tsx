// app/page.tsx
import { client } from "@/sanity/lib/client";
import SiteHeader from "./components/SiteHeader";
import NewsletterForm from "./components/NewsLetterForm";
import ScrollReveal from "./components/ScrollReveal";
import HomeFloatingItems from "./components/HomeFloatingItems";
// import AnnouncementBanner from "./components/AnnouncementBanner";
import SiteFooter from "./components/SiteFooter";
import Link from "next/link";
import {
  Coffee,
  Music2,
  MapPin,
  Clock,
} from "lucide-react";
import { SiInstagram, SiSpotify } from "react-icons/si";

async function getData() {
  const [home, settings] = await Promise.all([
    client.fetch(`*[_type=="homePage"][0]{
      heroHeadline, heroTagline, statusLine, ctaText, ctaUrl,
      whatToExpectBullets, vibeCopy
    }`),
    client.fetch(
      `*[_type=="settings"][0]{ social{ instagram, spotify }, address, hours }`,
    ),
  ]);
  return { home, settings };
}

export default async function HomePage() {
  const { home, settings } = await getData();

  return (
    <main className="page-dark">
      <ScrollReveal />
      {/* Announcement Banner - COMMENTED OUT FOR TESTING */}
      {/* <AnnouncementBanner /> */}

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
            <img
              src="/logo.png"
              alt="The Notebook Café"
              className="hero-logo"
            />
          </div>

          {/* Tagline */}
          <p className="hero-tagline">
            Where Every Sip Tells a Story
          </p>


          {/* Descriptive Text */}
          <p className="hero-description">
            A curated space where specialty coffee meets vibrant culture and soulful house music rhythms
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
              <svg className="hero-cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <div className="divider-cream" style={{ transform: 'scaleY(-1)' }}>
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* CREAM SECTION */}
      <section className="section-cream relative">
        <HomeFloatingItems variant="welcome" />
        {/* Welcome Header */}
        <div className="mx-auto max-w-[900px] px-4 text-center mb-12 pt-8 sm:px-6 sm:mb-20 sm:pt-16 scroll-reveal relative z-10">
          <h2 className="text-[16px] min-[375px]:text-[20px] sm:text-[24px] md:text-[28px] font-medium text-[rgba(201,154,88,0.9)] tracking-wide mb-3 sm:mb-4">
            WELCOME TO THE NOTEBOOK CAFÉ
          </h2>
          <h1 className="text-[16px] min-[375px]:text-[18px] sm:text-[36px] md:text-[44px] font-bold tracking-tight text-[#2a1f16] mb-4 sm:mb-6">
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
              <div key={i} className="welcome-highlight-card scroll-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="welcome-highlight-icon-wrapper">
                  {/* Coffee Cup with Steam - Index 0 */}
                  {i === 0 && (
                    <div className="welcome-icon-coffee">
                      <svg className="coffee-cup" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <div className="steam steam-1"></div>
                      <div className="steam steam-2"></div>
                      <div className="steam steam-3"></div>
                    </div>
                  )}

                  {/* Music Notes - Index 1 */}
                  {i === 1 && (
                    <div className="welcome-icon-music">
                      <svg className="music-note music-note-1" width="20" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                      <svg className="music-note music-note-2" width="16" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                    </div>
                  )}

                  {/* Notebook with Pen - Index 2 */}
                  {i === 2 && (
                    <svg className="welcome-icon-notebook" width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="3" width="13" height="18" rx="1" stroke="currentColor" strokeWidth="2" />
                      <line x1="4" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="2" />
                      <line x1="7" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="7" y1="14" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path className="notebook-pen" d="M15 15L20 10L21 11L16 16L15 15Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p className="welcome-highlight-text">{t}</p>
              </div>
            ))}
          </div>

          {/* Vibe Copy */}
          {home?.vibeCopy && (
            <div className="welcome-vibe-section">
              <div className="welcome-quote-mark">"</div>
              <p className="welcome-vibe-text scroll-reveal">
                {home.vibeCopy}
              </p>
              <div className="welcome-quote-mark welcome-quote-mark-end">"</div>
            </div>
          )}

          {/* Menu Button */}
          <div className="welcome-cta-section scroll-reveal">
            <Link href="/menu" className="welcome-cta-button">
              <span>EXPLORE OUR MENU</span>
              <svg className="welcome-cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* HEAR THE VIBE Section */}
      <section className="section-cream pb-20 relative">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 scroll-reveal relative z-10">
          {/* Section Label */}
          <div className="welcome-section-label mb-8">
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">Hear the Vibe</span>
            <div className="welcome-divider-line"></div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#2a1f16] max-w-[700px] mx-auto mb-10">
              Ambient house, soul, and groove—setting the perfect backdrop for focus and creation. Tune in to our curated playlist before the doors open.
            </p>

            {/* Spotify Playlist Embed */}
            <div className="max-w-[700px] mx-auto">
              <div className="rounded-2xl overflow-hidden border-2 border-[rgba(201,154,88,0.2)] shadow-xl bg-gradient-to-br from-[rgba(201,154,88,0.08)] to-transparent p-3">
                <div className="rounded-xl overflow-hidden shadow-inner">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/58qhSWWn3g1QeCKoVFoAJk?utm_source=generator&theme=0"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN NOTES Section */}
      <section className="section-cream pb-20 relative">
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
              A quiet canvas for creativity. We're building with warm wood laminates, calming olive green accents, and minimalist beige tones—a refined retreat from the hustle, built for long stays and deep focus.
            </p>

            {/* Coffee Mood Board */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[800px] mx-auto">
              <div className="rounded-lg aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop"
                  alt="Specialty coffee with latte art"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop"
                  alt="Cozy coffee shop interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop"
                  alt="Coffee on minimalist table"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider - Wavy transition back to dark */}
      <div className="divider-cream">
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* CARD GRID - 1 col on mobile, 2 cols on tablet+ */}
      <section className="section-dark py-32 relative">
        <HomeFloatingItems variant="cards" />
        <div className="mx-auto max-w-[1120px] px-5 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* CARD: Craft */}
            <div className="home-info-card scroll-reveal" style={{ animationDelay: '0s' }}>
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
            <div className="home-info-card scroll-reveal" style={{ animationDelay: '0.1s' }}>
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
                thinkers & makers.
              </p>
            </div>

            {/* CARD: Location */}
            <div className="home-info-card scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <h3 className="text-[16px] min-[375px]:text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                  LOCATION.
                </h3>
                <div className="home-card-icon">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <p className="text-[13.5px] min-[375px]:text-[14.5px] sm:text-[15px] leading-6 sm:leading-7 ink-cream-dim">
                3512 9th St, Riverside CA 92501
                <br />
                (951) 823-0004 • Opening Early 2026
              </p>
            </div>

            {/* CARD: Hours */}
            <div className="home-info-card scroll-reveal" style={{ animationDelay: '0.3s' }}>
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

      {/* Newsletter - ENHANCED */}
      {/* Newsletter - Connected to Sanity */}
      <section className="home-newsletter mx-auto max-w-[720px] px-4 sm:px-6 mb-20 sm:mb-32 scroll-reveal relative z-10">
        <div className="home-newsletter-card text-center">
          <h3 className="text-[16px] min-[375px]:text-[18px] sm:text-[20px] md:text-[22px] font-semibold mb-3">
            FOR CREATIVES & COFFEE LOVERS
          </h3>
          <p className="text-[13.5px] min-[375px]:text-[14.5px] sm:text-[15px] leading-6 sm:leading-7 ink-cream-dim mb-5 sm:mb-6">
            Join our community for opening announcements, exclusive pre-launch events, and first look at what we're brewing.
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
