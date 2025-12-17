/**
 * Homepage - The Notebook Café
 *
 * Redesigned homepage featuring new hero, sanctuary section, vibe carousel, and newsletter.
 */
import "@/app/styles/pages/home.css";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/ui/Reveal";
import StoryLink from "@/app/components/ui/StoryLink";
import { Coffee, Music, Wifi, PlugZap, Armchair, Sparkles } from "lucide-react";
import AtmosphereStrip from "@/app/components/AtmosphereStrip";
import SignaturePoursGrid from "@/app/components/SignaturePoursGrid";
import NewsletterSubscribe from "@/app/components/ui/NewsletterSubscribe";
import LocalBusinessJsonLd from "@/app/components/seo/LocalBusinessJsonLd";
import type { Metadata } from "next";
import { SEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO.pages.home.title,
  description: SEO.pages.home.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SEO.pages.home.title,
    description: SEO.pages.home.description,
    url: '/',
  },
};

const vibeImages = [
  "/unsplash/tnc-placeholder-3.png",
  "/unsplash/tnc-placeholder-4.png",
  "/unsplash/tnc-placeholder-5.png",
  "/unsplash/tnc-placeholder-6.png"
];

const signaturePours = [
  {
    name: "Iced Brown Sugar Oat",
    description: "Caramelized brown sugar layered with velvety oat milk and slow-steeped espresso.",
    image: "/unsplash/tnc-placeholder-featured-1.png"
  },
  {
    name: "Matcha Cloud",
    description: "Ceremonial grade matcha poured over cold foam for a soft, cloudlike finish.",
    image: "/unsplash/tnc-placeholder-featured-2.png"
  },
  {
    name: "Classic Cold Brew",
    description: "18-hour brew for a chocolatey, low-acid sip served over crystal-clear ice.",
    image: "/unsplash/tnc-placeholder-featured-3.png"
  },
  {
    name: "Espresso Tonic",
    description: "Bright espresso lifted by artisanal tonic, citrus oils, and a crack of ice.",
    image: "/unsplash/tnc-placeholder-featured-4.png"
  }
];

const atmosphereFeatures = [
  {
    title: "Fast Reliable Wi-Fi",
    description: "Great speeds for heavy workflows.",
    icon: Wifi
  },
  {
    title: "Power Everywhere",
    description: "Outlets at every single seat.",
    icon: PlugZap
  },
  {
    title: "Warm Ambience",
    description: "2700K lighting for eye comfort.",
    icon: Armchair
  },
  {
    title: "Acoustics",
    description: "Sound-treated for conversation.",
    icon: Music
  }
];

export default function HomePage() {
  return (
    <main className="home-page overflow-hidden relative">
      <LocalBusinessJsonLd />
      <div className="home-fixed-background" aria-hidden="true" />
      {/* Hero Section - Editorial Minimalist */}
      <section
        className="editorial-hero"
      >
        {/* Subtle Coffee Texture Background */}
        <div className="editorial-hero-bg" aria-hidden="true" />

        {/* Content */}
        <div
          className="editorial-hero-content"
        >
          <p className="hero-eyebrow">EST. RIVERSIDE 2026</p>

          <div className="flex justify-center mb-6">
            <Image
              src="/tnc-navbar-logo-v2.png"
              alt="The Notebook Café Logo"
              width={350}
              height={350}
              className="w-48 h-auto md:w-72 md:h-auto opacity-90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
            />
          </div>

          <h1 className="hero-headline">
            <span className="hero-headline-top">Where Every Cup</span>
            <br />
            <span className="hero-headline-bottom">Tells a Story</span>
          </h1>

          <p className="hero-tagline">COME FOR THE COFFEE, STAY FOR THE VIBE.</p>

        </div>
      </section>

      {/* Signature Pours */}
      <section
        data-section="Signature Pours"
        className="relative py-24 overflow-hidden signature-pours-section"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <span className="text-cafe-tan text-xs uppercase tracking-[0.25em] font-semibold">
                Signature Pours
              </span>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 text-cafe-black">
                Crafted With Care
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-4 text-lg md:text-xl font-normal text-cafe-brown">
                Small-batch recipes we obsess over—balanced, nuanced, and poured with a steady hand.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <SignaturePoursGrid pours={signaturePours} />
          </div>

          <div className="text-center mt-16 pb-16">
            <Reveal delay={200}>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.25em] font-semibold border-2 border-cafe-black rounded-sm transition-all duration-300 hover:bg-cafe-black hover:text-cafe-white hover:-translate-y-0.5 hover:shadow-lg shadow-[0_4px_12px_rgba(44,36,32,0.08)]"
              >
                View Our Menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
        <div />
      </section>


      {/* Low Lights Section */}
      <section
        data-section="Low Lights"
        className="relative overflow-visible py-24 md:py-32 px-6"
      >
        <div className="section-deco" style={{ top: '8%', left: '6%', animationDuration: '12s', animationDelay: '0.4s' }} aria-hidden="true">
          <Music strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '12%', right: '8%', animationDuration: '11s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>
        <div className="section-deco-mobile" style={{ top: '10%', left: '10%' }} aria-hidden="true">
          <Music strokeWidth={1.4} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-cafe-black">
                Low lights,<br />
                good sound,<br />
                <span className="italic text-cafe-tan">better coffee.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px] bg-cafe-black" />
            </Reveal>
            <Reveal delay={250}>
              <p className="text-lg md:text-xl font-normal leading-relaxed max-w-xl text-cafe-brown">
                We designed The Notebook Café as a sanctuary for the creatives, the writers, and the dreamers of Riverside. It is not just about the caffeine—it is about the headspace.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <StoryLink />
            </Reveal>
          </div>

          <div className="relative">
            <Reveal delay={200} effect="slide">
              <div className="grid grid-cols-2 gap-4 relative">
                <Image
                  src="/unsplash/tnc-placeholder-1.png"
                  alt="Barista Pouring"
                  width={900}
                  height={1200}
                  className="w-full h-full object-cover rounded-sm translate-y-12 shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  priority
                />
                <Image
                  src="/unsplash/tnc-placeholder-2.png"
                  alt="Cafe Corner"
                  width={900}
                  height={1200}
                  className="w-full h-full object-cover rounded-sm shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Trinity */}
      <section
        data-section="The Trinity"
        className="py-20 md:py-24 relative overflow-hidden trinity-slab"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3">
            <Reveal>
              <div className="p-10 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full">
                  <Coffee size={26} className="couch-bounce" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-3">Craft Espresso</h3>
                <p className="text-base md:text-lg font-light leading-relaxed">
                  Roasted locally, extracted with precision. We respect the bean and the process.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative p-10 text-center">
                {/* Desktop: Vertical gradient dividers */}
                <span
                  className="trinity-divider-v hidden md:block absolute inset-y-6 left-0 w-px"
                />
                <span
                  className="trinity-divider-v hidden md:block absolute inset-y-6 right-0 w-px"
                />
                {/* Mobile: Horizontal gradient dividers */}
                <span
                  className="trinity-divider-h md:hidden block absolute top-0 inset-x-10 h-px"
                />
                <span
                  className="trinity-divider-h md:hidden block absolute bottom-0 inset-x-10 h-px"
                />
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full">
                  <Music size={26} className="couch-bounce" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-3">Curated Sound</h3>
                <p className="text-base md:text-lg font-light leading-relaxed">
                  Deep house, soul, and lo-fi grooves tuned to keep you in flow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="p-10 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full">
                  <Armchair size={26} className="couch-bounce" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-3">Creative Comfort</h3>
                <p className="text-base md:text-lg font-light leading-relaxed">
                  Cozy seating, warm light, plenty of outlets—stay as long as you need.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Atmosphere */}
      <section
        data-section="Atmosphere"
        className="relative pt-24 md:pt-32 pb-[calc(6rem+20px)] md:pb-[calc(8rem+20px)] px-6 overflow-visible"
      >
        <div className="section-deco" style={{ top: '10%', left: '8%', animationDuration: '11s' }} aria-hidden="true">
          <Wifi strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '8%', right: '12%', animationDuration: '12s', animationDelay: '0.8s' }} aria-hidden="true">
          <PlugZap strokeWidth={1.4} />
        </div>
        <div className="section-deco-mobile" style={{ top: '12%', left: '10%' }} aria-hidden="true">
          <Wifi strokeWidth={1.4} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Features (order-2 on mobile) */}
          <div className="order-2 lg:order-1">
            <Reveal delay={200}>
              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                {atmosphereFeatures.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-cafe-tan/10 text-cafe-tan"
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="font-serif text-xl md:text-2xl mb-1 text-cafe-black">{item.title}</div>
                        <p className="text-base md:text-lg text-cafe-brown/70">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Column - Heading (order-1 on mobile) */}
          <div className="space-y-6 order-1 lg:order-2 text-right items-end lg:pl-10">
            <Reveal delay={120}>
	              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-cafe-black">
	                <span className="italic text-cafe-brown">More than just coffee.</span><br />
	                <span className="italic text-cafe-tan">It&apos;s a feeling</span>
	              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px] ml-auto bg-cafe-black" />
            </Reveal>
            <Reveal delay={250}>
	              <p className="text-lg md:text-xl font-normal leading-relaxed max-w-xl text-cafe-brown">
	                We designed The Notebook Café to be an extension of your living room. Whether you&apos;re catching up with friends, diving into deep work, or just soaking in the playlist.
	              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Atmosphere Images */}
      <section
        data-section="Atmosphere Images"
        className="overflow-visible relative pb-24 md:pb-28"
      >
        <div className="section-deco" style={{ top: '6%', left: '10%', animationDuration: '13s' }} aria-hidden="true">
          <Sparkles strokeWidth={1.6} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '6%', right: '10%', animationDuration: '10s', animationDelay: '0.5s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>
        <div className="section-deco-mobile" style={{ top: '8%', right: '12%' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>
        <AtmosphereStrip images={vibeImages} />
      </section>


      {/* Stay in the Loop - Instagram CTA */}
      <section
        data-section="Stay in the Loop"
        className="relative py-20 md:py-24 overflow-hidden"
      >
        <div className="section-deco" style={{ top: '12%', left: '10%', animationDuration: '11s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', right: '12%', animationDuration: '12s', animationDelay: '0.6s' }} aria-hidden="true">
          <Music strokeWidth={1.4} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="w-16 h-[2px] mx-auto mb-6 bg-cafe-tan" />
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-cafe-cream"
            >
              <span className="font-normal">Stay in the</span>{" "}
              <span className="italic text-cafe-white font-semibold">
                Loop
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-2xl mx-auto text-cafe-cream/95"
            >
              We open our doors in 2026. Be the first to know about our soft launch events and exclusive tastings.
            </p>
          </Reveal>

          {/* Email Subscription Form */}
          <Reveal delay={250}>
            <div className="max-w-2xl mx-auto mb-8">
              <NewsletterSubscribe />
            </div>
          </Reveal>

          {/* Social & Location */}
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-xs md:text-sm uppercase tracking-[0.2em] opacity-70 text-cafe-cream">
              <a
                href="https://instagram.com/thenotebookcafellc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 hover:text-cafe-tan transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                thenotebookcafellc
              </a>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Riverside, CA
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
