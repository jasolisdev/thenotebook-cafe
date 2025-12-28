/**
 * @fileoverview Homepage - Main landing page
 * @module pages/home
 *
 * @description
 * Main landing page for The Notebook Café featuring hero section,
 * menu preview, atmosphere showcase, brand philosophy, community highlights,
 * and newsletter signup.
 *
 * Key features:
 * - Full-screen hero with brand messaging and CTA
 * - Menu preview section with quick access to full menu
 * - Low Lights experience section with dual imagery and brand story
 * - The Trinity section (Craft Espresso, Curated Sound, Creative Comfort)
 * - Atmosphere showcase with sticky text and scrolling gallery (WiFi, outlets, curated soundtrack, creator-friendly space)
 * - Newsletter subscription section
 *
 * @route /
 * @access public
 *
 * @example
 * Route: https://thenotebookcafellc.com/
 * Displays: Hero → Menu Preview → Low Lights → Trinity → Atmosphere → Newsletter
 *
 * @see {@link app/components/features/HeroSection.tsx} for hero implementation
 * @see {@link app/components/features/MenuSection.tsx} for menu preview
 * @see {@link app/components/features/NewsletterSection.tsx} for newsletter signup
 */
import "@/app/styles/pages/home.css";
import Image from "next/image";
import Reveal from "@/app/components/ui/Reveal";
import StoryLink from "@/app/components/ui/StoryLink";
import {
  Coffee,
  Music,
  Armchair,
  Sparkles,
  Wifi,
  Zap,
  BookOpen,
} from "lucide-react";
import MenuSection from "@/app/components/features/MenuSection";
import HeroSection from "@/app/components/features/HeroSection";
import NewsletterSection from "@/app/components/features/NewsletterSection";
import LocalBusinessJsonLd from "@/app/components/seo/LocalBusinessJsonLd";
import type { Metadata } from "next";
import { SEO } from "@/app/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.pages.home.title,
  description: SEO.pages.home.description,
  alternates: {
    canonical: SEO.siteUrl,
  },
  openGraph: {
    title: SEO.pages.home.title,
    description: SEO.pages.home.description,
    url: SEO.siteUrl,
    images: [
      {
        url: SEO.pages.home.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO.siteName} — Riverside, CA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.pages.home.title,
    description: SEO.pages.home.description,
    images: [SEO.pages.home.ogImage],
  },
};

const vibeImages = [
  "/home/tnc-home-vibeImage-1.png",
  "/home/tnc-home-vibeImage-2.png",
  "/home/tnc-home-vibeImage-3.png",
  "/home/tnc-home-vibeImage-4.png",
];

const imageCaptions = [
  { title: "The Space", subtitle: "Designed for dreamers." },
  { title: "The Craft", subtitle: "Small batch, always fresh." },
  { title: "The Vibe", subtitle: "Curated soundscapes." },
  { title: "The Community", subtitle: "Riverside's living room." },
];

export default function HomePage() {
  return (
    <main className="home-page relative">
      <LocalBusinessJsonLd />
      <div className="home-fixed-background" aria-hidden="true" />

      {/* Hero Section */}
      <HeroSection />

      {/* Signature Pours */}
      {/* 
      <section
        data-section="Signature Pours"
        className="relative pt-24 pb-12 overflow-hidden signature-pours-section"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <span className="text-cafe-tan text-md uppercase tracking-[0.25em] font-semibold">
                Our Signature Pours
              </span>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <SignaturePoursGrid pours={signaturePours} />
          </div>
        </div>
        <div />
      </section>
      */}

      {/* Menu Section */}
      <MenuSection />

      {/* Low Lights Section */}
      <section
        data-section="Low Lights"
        className="relative overflow-visible pt-12 pb-24"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
          <div className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-24 before:w-px before:bg-cafe-tan/40">
            <Reveal>
              <span className="text-cafe-tan uppercase tracking-[0.25em] text-xs font-semibold block mb-4 font-inter">
                The Experience
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-dm-serif font-bold text-4xl md:text-5xl leading-[1.05] text-cafe-black">
                Low lights,
                <br />
                good sound,
                <br />
                <span className="italic text-cafe-tan">better coffee.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="w-24 h-[2px] bg-cafe-black mt-8" />
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-8 text-lg md:text-xl font-normal leading-relaxed max-w-xl text-cafe-brown">
                We designed The Notebook Café as a sanctuary for the creatives,
                the writers, and the dreamers of Riverside. It is not just about
                the caffeine—it is about the headspace.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8">
                <StoryLink />
              </div>
            </Reveal>
          </div>

          <div className="relative pb-6 md:pb-10">
            <div className="grid grid-cols-2 gap-2 md:gap-3 relative">
              <Reveal>
                <div className="h-full">
                  <Image
                    src="/home/tnc-home-lowLights.png"
                    alt="Barista pouring coffee at The Notebook Café in Riverside, CA"
                    width={900}
                    height={1200}
                    className="w-full h-full object-cover rounded-md translate-y-12 shadow-lg grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="h-full">
                  <Image
                    src="/home/tnc-home-lowLights-2.jpg"
                    alt="Cozy corner seating at The Notebook Café in Riverside, CA"
                    width={900}
                    height={1200}
                    className="w-full h-full object-cover rounded-md shadow-lg grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="home-fixed-background-alt" aria-hidden="true"></div>
      </section>
      {/* The Trinity */}
      <section
        data-section="The Trinity"
        className="hidden md:block py-24 md:py-28 relative overflow-hidden trinity-slab trinity-slab-light"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-y-16 md:gap-y-0">
            <Reveal>
              <div className="p-10 text-center">
                <div
                  className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full trinity-icon"
                  style={{
                    backgroundColor: "var(--cafe-white)",
                    color: "var(--cafe-tan)",
                    border: "1px solid rgba(var(--cafe-tan-rgb), 0.35)",
                  }}
                >
                  <Coffee
                    size={26}
                    className="couch-bounce"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3">Craft Espresso</h3>
                <p className="text-base md:text-lg font-light leading-relaxed text-cafe-brown/70">
                  Roasted locally, extracted with precision. We respect the bean
                  and the process.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative p-10 text-center">
                <div
                  className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
                  style={{
                    backgroundColor: "var(--cafe-white)",
                    color: "var(--cafe-tan)",
                    border: "1px solid rgba(var(--cafe-tan-rgb), 0.35)",
                  }}
                >
                  <Music
                    size={26}
                    className="couch-bounce"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3">Curated Sound</h3>
                <p className="text-base md:text-lg font-light leading-relaxed text-cafe-brown/70">
                  Deep house, soul, and lo-fi grooves tuned to keep you in flow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="p-10 text-center">
                <div
                  className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
                  style={{
                    backgroundColor: "var(--cafe-white)",
                    color: "var(--cafe-tan)",
                    border: "1px solid rgba(var(--cafe-tan-rgb), 0.35)",
                  }}
                >
                  <Armchair size={26} className="couch-bounce" />
                </div>
                <h3 className="font-serif text-2xl mb-3">Creative Comfort</h3>
                <p className="text-base md:text-lg font-light leading-relaxed text-cafe-brown/70">
                  Cozy seating, warm light, plenty of outlets—stay as long as
                  you need.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Atmosphere Images */}
      <section
        data-section="Atmosphere Images"
        className="overflow-visible relative py-24 md:py-32"
      >
        <div
          className="section-deco"
          style={{ top: "6%", left: "10%", animationDuration: "13s" }}
          aria-hidden="true"
        >
          <Sparkles strokeWidth={1.6} />
        </div>
        <div
          className="section-deco section-deco-dark"
          style={{
            bottom: "6%",
            right: "10%",
            animationDuration: "10s",
            animationDelay: "0.5s",
          }}
          aria-hidden="true"
        >
          <Coffee strokeWidth={1.4} />
        </div>
        <div
          className="section-deco-mobile"
          style={{ top: "8%", right: "12%" }}
          aria-hidden="true"
        >
          <Coffee strokeWidth={1.4} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:items-start">
            {/* Left Column: Sticky Text */}
            <div className="lg:sticky lg:top-32 h-fit lg:self-start relative pl-4 before:absolute before:left-0 before:top-2 before:h-24 before:w-px before:bg-cafe-tan/40">
              <Reveal>
                <span className="text-cafe-tan uppercase tracking-[0.25em] text-xs font-semibold block mb-4 font-inter">
                  The Atmosphere
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-dm-serif font-bold text-4xl md:text-5xl leading-[1.05] text-cafe-black">
                  It&apos;s not just Coffee <br />
                  <span className="italic text-cafe-tan block mt-2">
                    It&apos;s a feeling
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 text-lg md:text-xl text-cafe-brown/80 max-w-md leading-relaxed">
                  We believe in the power of a quiet moment. Our space is
                  designed as a sanctuary from the noise, a place where the
                  Wi-Fi is strong, but the community is stronger.
                </p>
              </Reveal>

              {/* Features Grid */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <Reveal delay={250}>
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(var(--cafe-tan-rgb),0.12)] flex items-center justify-center group-hover:bg-cafe-tan/20 transition-colors duration-300">
                      <Wifi
                        size={22}
                        className="text-cafe-tan"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="text-cafe-black font-semibold text-sm tracking-wide mb-0.5">
                        Strong WiFi
                      </h4>
                      <p className="text-cafe-brown/70 text-sm leading-relaxed">
                        Always on, always fast
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(var(--cafe-tan-rgb),0.12)] flex items-center justify-center group-hover:bg-cafe-tan/20 transition-colors duration-300">
                      <Zap
                        size={22}
                        className="text-cafe-tan"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="text-cafe-black font-semibold text-sm tracking-wide mb-0.5">
                        Plenty of Outlets
                      </h4>
                      <p className="text-cafe-brown/70 text-sm leading-relaxed">
                        Every table, every seat
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={350}>
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(var(--cafe-tan-rgb),0.12)] flex items-center justify-center group-hover:bg-cafe-tan/20 transition-colors duration-300">
                      <Music
                        size={22}
                        className="text-cafe-tan"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="text-cafe-black font-semibold text-sm tracking-wide mb-0.5">
                        Curated Soundtrack
                      </h4>
                      <p className="text-cafe-brown/70 text-sm leading-relaxed">
                        Lo-fi beats & deep house
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={400}>
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(var(--cafe-tan-rgb),0.12)] flex items-center justify-center group-hover:bg-cafe-tan/20 transition-colors duration-300">
                      <BookOpen
                        size={22}
                        className="text-cafe-tan"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="text-cafe-black font-semibold text-sm tracking-wide mb-0.5">
                        Designed for Creators
                      </h4>
                      <p className="text-cafe-brown/70 text-sm leading-relaxed">
                        Notebooks welcome, ideas flow
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Column: Scrolling Images */}
            <div className="space-y-12">
              {vibeImages.map((src, i) => (
                <Reveal key={i} delay={100}>
                  <div className="group relative overflow-hidden rounded-[2rem] shadow-2xl w-full aspect-[3/4]">
                    <Image
                      src={src}
                      alt={`The Notebook Café atmosphere in Riverside, CA — photo ${i + 1}`}
                      fill
                      className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-20">
                      <div className="bg-cafe-mist/10 backdrop-blur-[2px] px-6 py-4">
                        <h3 className="font-serif text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                          {imageCaptions[i]?.title || "The Café"}
                        </h3>
                        <p className="font-sans text-sm text-white/90 mt-2 font-medium tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                          {imageCaptions[i]?.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
