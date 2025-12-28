/**
 * @fileoverview Story page - Brand narrative and mission
 * @module pages/story
 *
 * @description
 * Brand story page featuring the café's origin, philosophy, values, location,
 * and founders. Tells the complete narrative of The Notebook Café's mission
 * and what makes it unique in Riverside's coffee scene.
 *
 * Key features:
 * - Hero banner with tagline
 * - Origin story section (How It Began) with dual imagery
 * - Why Riverside section with location context and stats
 * - Philosophy section (Crafted for Creatives) with product imagery
 * - What Sets Us Apart grid (Mexican coffee, custom design, soundscapes, community)
 * - Meet the Founders profiles (Michael & Julia)
 * - Founders quote blockquote
 *
 * @route /story
 * @access public
 *
 * @example
 * Route: /story
 * Displays: Hero → Origin → Why Riverside → Philosophy → Differentiators → Founders → Quote
 *
 * @see {@link app/components/ui/Reveal.tsx} for reveal animations
 * @see {@link app/components/ui/RevealText.tsx} for text animations
 * @see {@link app/components/ui/FadeInSection.tsx} for section fades
 */
import Reveal from "@/app/components/ui/Reveal";
import RevealText from "@/app/components/ui/RevealText";
import FadeInSection from "@/app/components/ui/FadeInSection";
import Image from "next/image";
import {
  Coffee,
  Music,
  Heart,
  MapPin,
  Sparkles,
  BookOpen,
  Users,
  Home as HomeIcon,
  Award,
} from "lucide-react";
import "@/app/styles/pages/story.css";
import type { Metadata } from "next";
import { SEO } from "@/app/lib/constants/seo";

export const metadata: Metadata = {
  title: SEO.pages.story.title,
  description: SEO.pages.story.description,
  alternates: {
    canonical: `${SEO.siteUrl}/story`,
  },
  openGraph: {
    title: SEO.pages.story.title,
    description: SEO.pages.story.description,
    url: `${SEO.siteUrl}/story`,
    images: [
      {
        url: SEO.pages.story.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO.siteName} — Our Story in Riverside, CA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.pages.story.title,
    description: SEO.pages.story.description,
    images: [SEO.pages.story.ogImage],
  },
};

export default function StoryPage() {
  return (
    <main className="story-page min-h-screen relative">
      <div className="story-fixed-background" aria-hidden="true" />
      {/* Hero Section */}
      <section
        className="relative min-h-[32vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden pt-[var(--site-header-height,80px)]"
        data-section="Hero"
        style={{
          backgroundImage: "url(/menu/tnc-menu-banner.webp)",
          backgroundColor: "var(--color-cafe-black)",
          backgroundSize: "cover",
          backgroundPosition: "center 32%",
        }}
      >
        <div
          className="absolute inset-0 bg-black/40 z-[1]"
          aria-hidden="true"
        />
        <div className="relative z-10 text-left md:text-center px-6 w-full max-w-7xl mx-auto">
          <h1 className="font-dm-serif font-bold text-4xl md:text-6xl text-cafe-cream mb-4">
            <RevealText delay="0ms">
              Our Story
            </RevealText>
          </h1>
          <FadeInSection delay="200ms">
            <p className="font-serif italic text-lg md:text-2xl text-cafe-cream/90 drop-shadow-sm">
              Every great story starts with a blank page and a cup of coffee
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* The Origin Story - Two Column Layout */}
      <section
        data-section="The Origin"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div
          className="section-deco"
          style={{ top: "10%", left: "8%", animationDuration: "13s" }}
          aria-hidden="true"
        >
          <BookOpen strokeWidth={1.4} />
        </div>
        <div
          className="section-deco section-deco-dark"
          style={{
            bottom: "12%",
            right: "10%",
            animationDuration: "11s",
            animationDelay: "0.6s",
          }}
          aria-hidden="true"
        >
          <Coffee strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <Reveal>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-1.png"
                    alt="The Notebook Café founders preparing specialty coffee in their Riverside, CA coffee shop"
                    fill
                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="story-image-overlay absolute inset-0 opacity-30" />
                </div>
              </Reveal>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2 lg:text-right">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block font-inter">
                  Our Story
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="story-section-title font-dm-serif font-bold text-5xl sm:text-6xl mb-8 leading-none">
                  How It{" "}
                  <span className="story-section-title-accent italic">
                    Began
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="story-divider story-divider--black w-24 h-[2px] lg:ml-auto" />
              </Reveal>
              <Reveal delay={200}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  Riverside needed a place that felt different. Not a quick stop
                  for caffeine, but a{" "}
                  <strong className="story-strong">destination</strong>.
                  Somewhere the music wasn&apos;t an afterthought, the chairs
                  were actually comfortable, and the coffee was treated with
                  reverence.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  A space born from a love of{" "}
                  <strong className="story-strong">specialty coffee</strong> and{" "}
                  <strong className="story-strong">creative solitude</strong>.
                  For writers, designers, students, and dreamers. A third
                  place—somewhere between home and work where ideas take root.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  From single-origin Mexican beans to custom-designed furniture,
                  every detail intentional. This isn&apos;t a corporate
                  playbook—it&apos;s a husband-wife team building their{" "}
                  <em className="story-em-accent italic">
                    first business together
                  </em>
                  , pouring everything into creating something genuinely
                  special.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Riverside - Location & Community */}
      <section
        data-section="Why Riverside"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div
          className="section-deco"
          style={{ top: "8%", right: "10%", animationDuration: "11s" }}
          aria-hidden="true"
        >
          <MapPin strokeWidth={1.4} />
        </div>
        <div
          className="section-deco section-deco-dark"
          style={{
            bottom: "10%",
            left: "8%",
            animationDuration: "12s",
            animationDelay: "0.4s",
          }}
          aria-hidden="true"
        >
          <HomeIcon strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-2">
              <Reveal>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/unsplash/placeholder-interior-shop.png"
                    alt="The Notebook Café storefront in Riverside art district with warm lighting and modern design"
                    fill
                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="story-image-overlay absolute inset-0 opacity-30" />
                </div>
              </Reveal>

              <Reveal delay={150} replay={false}>
                <div className="story-established-badge absolute -bottom-6 -right-6 shadow-2xl">
                  <p className="text-xl md:text-2xl leading-tight">2025</p>
                  <p className="text-xl md:text-2xl leading-tight">
                    Established
                  </p>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] mt-2 opacity-90">
                    Heart of Riverside
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-1">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block font-inter">
                  Our Riverside Home
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="story-section-title font-dm-serif font-bold text-5xl sm:text-6xl mb-8 leading-none">
                  Why{" "}
                  <span className="story-section-title-accent italic">
                    Here?
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="story-divider story-divider--black w-24 h-[2px]" />
              </Reveal>
              <Reveal delay={200}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  Riverside sits at a cultural crossroads—near the art district,
                  close to University Drive&apos;s nightlife, accessible to everyone.
                  Remote workers, artists, students, night-owls: the city&apos;s
                  diverse communities naturally converge here. We wanted to be
                  where the energy already flows.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  But more than that, we believed Riverside deserved better. A
                  café that reflects the city&apos;s creative spirit and recognizes
                  its potential. This isn&apos;t just a business for us—it&apos;s an
                  investment in our community.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div className="flex gap-10 border-t border-cafe-beige pt-8">
                  <div>
                    <h4 className="story-stat-title font-serif text-2xl mb-1">
                      2026
                    </h4>
                    <p className="story-stat-label text-xs uppercase tracking-wider">
                      Grand Opening
                    </p>
                  </div>
                  <div>
                    <h4 className="story-stat-title font-serif text-2xl mb-1">
                      100%
                    </h4>
                    <p className="story-stat-label text-xs uppercase tracking-wider">
                      Local Owned
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy (from Home) */}
      <section
        data-section="Our Philosophy"
        className="py-24 relative overflow-visible"
      >
        <div
          className="section-deco"
          style={{ top: "6%", right: "12%", animationDuration: "13s" }}
          aria-hidden="true"
        >
          <Coffee strokeWidth={1.4} />
        </div>
        <div
          className="section-deco section-deco-dark"
          style={{
            bottom: "10%",
            left: "6%",
            animationDuration: "10s",
            transform: "rotate(-10deg)",
          }}
          aria-hidden="true"
        >
          <Sparkles strokeWidth={1.6} />
        </div>
        <div
          className="section-deco-mobile"
          style={{ top: "6%", right: "10%" }}
          aria-hidden="true"
        >
          <Coffee strokeWidth={1.4} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <Reveal>
                <div className="grid grid-cols-2 gap-4">
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-1.png"
                    alt="Professional espresso machine and coffee bar at specialty coffee shop in Riverside, CA"
                    width={900}
                    height={900}
                    className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl -mt-6 md:mt-12"
                  />
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-2.png"
                    alt="Fresh pastries and acai bowls at The Notebook Café in Riverside, California"
                    width={900}
                    height={900}
                    className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl mt-10 md:mt-0"
                  />
                </div>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2 space-y-6 lg:text-right items-start lg:items-end lg:pl-10 relative">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block font-inter">
                  Our Philosophy
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-dm-serif font-bold text-5xl md:text-6xl lg:text-7xl text-cafe-black mb-8 leading-none">
                  Crafted for <br />
                  <span className="story-section-title-accent italic">
                    Creatives
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="story-divider story-divider--black w-24 h-[2px] lg:ml-auto" />
              </Reveal>
              <Reveal delay={200}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed mb-6">
                  We sourced ethically, roast in small batches, and brew with
                  precision. Every cup carries not just flavor but a story:
                  direct-trade relationships from Chiapas and Oaxaca, terroir
                  honored in every extraction.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed mb-10">
                  But coffee alone doesn&apos;t fuel creativity. That&apos;s why we
                  designed every detail—from custom furniture to curated
                  soundscapes—to support focus and inspiration. This space was
                  built to help ideas flourish.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Editorial Grid */}
      <section
        data-section="What Sets Us Apart"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div
          className="section-deco"
          style={{ top: "8%", right: "10%", animationDuration: "13s" }}
          aria-hidden="true"
        >
          <Sparkles strokeWidth={1.6} />
        </div>
        <div
          className="section-deco section-deco-dark"
          style={{
            bottom: "10%",
            left: "12%",
            animationDuration: "11s",
            animationDelay: "0.7s",
          }}
          aria-hidden="true"
        >
          <Award strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="mb-24">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block font-inter">
                The Difference
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="story-section-title font-dm-serif font-bold text-5xl sm:text-6xl mb-6 leading-none">
                What Makes Us{" "}
                <span className="story-section-title-accent italic">
                  Unique
                </span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="story-divider story-divider--black w-24 h-[2px]" />
            </Reveal>
          </div>

          {/* Grid of Differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 lg:gap-x-24">
            {/* 1. Mexican Coffee */}
            <Reveal delay={200}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                    <Coffee
                      size={22}
                      className="contact-icon"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold font-inter">
                    Origin
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  Single-Origin Mexican Coffee
                </h3>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  We partner directly with farmers in Chiapas and Oaxaca,
                  building relationships that outlast trends. You taste that
                  commitment in every cup: complexity, terroir, and a supply
                  chain you can trace back to the source.
                </p>
              </div>
            </Reveal>

            {/* 2. Custom Design */}
            <Reveal delay={260}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                    <Users
                      size={22}
                      className="contact-icon"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold font-inter">
                    Design
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  100% Custom-Designed Space
                </h3>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  From the tables to the shelving, nothing came off a showroom
                  floor. Our founder designed this space specifically for how
                  people actually work and create here—seating angles, light
                  placement, sightlines. The room itself becomes part of your
                  focus.
                </p>
              </div>
            </Reveal>

            {/* 3. Soundscapes */}
            <Reveal delay={320}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                    <Music
                      size={22}
                      className="contact-icon"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold font-inter">
                    Atmosphere
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  Curated Soundscapes
                </h3>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  Deep house, neo-soul, lo-fi—we engineer your sonic landscape.
                  Music isn&apos;t background here. It&apos;s calibrated to keep you
                  grounded without demanding attention, so your mind stays where
                  you want it.
                </p>
              </div>
            </Reveal>

            {/* 4. Community */}
            <Reveal delay={380}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                    <Heart
                      size={22}
                      className="contact-icon"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold font-inter">
                    Hospitality
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  Community First
                </h3>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  Riverside&apos;s living room. Nurse one coffee for three hours or
                  make it your office—there&apos;s no time limit, no judgment.
                  Students, creatives, nomads, neighbors: you belong here as
                  long as you need to.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Meet the Founders - Personal Profiles */}
      <section
        data-section="Meet the Founders"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div
          className="section-deco"
          style={{ top: "10%", left: "10%", animationDuration: "12s" }}
          aria-hidden="true"
        >
          <Heart strokeWidth={1.4} />
        </div>
        <div
          className="section-deco section-deco-dark"
          style={{
            bottom: "8%",
            right: "12%",
            animationDuration: "11s",
            animationDelay: "0.5s",
          }}
          aria-hidden="true"
        >
          <Users strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <span className="story-eyebrow text-xs uppercase tracking-[0.25em] font-semibold font-inter">
                The People Behind the Pour
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="story-section-title font-dm-serif font-bold text-4xl md:text-6xl mt-4">
                Meet the{" "}
                <span className="story-section-title-accent italic">
                  Founders & Owners
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-20 lg:gap-32">
            {/* Michael & Julia - Founders & Owners */}
            <Reveal delay={200}>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image */}
                <div className="relative order-1 lg:order-1">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/story/tnc-founder-v1.webp"
                      alt="Michael & Julia - Founders & Owners"
                      fill
                      className="object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 order-2 lg:order-2">
                  <div>
                    <h3 className="story-card-title font-serif text-3xl md:text-4xl mb-2">
                      Michael & Julia
                    </h3>
                    <p className="story-eyebrow text-xs uppercase tracking-[0.25em] font-semibold text-cafe-tan font-inter">
                      Founders & Owners
                    </p>
                  </div>

                  <div className="story-divider story-divider--tan w-16 h-[2px]" />

                  <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                    A husband-wife team with a shared vision: to create a coffee
                    shop that Riverside deserves. Michael brings expertise in
                    specialty coffee, sourcing, and extraction science, while
                    Julia designs every intentional detail—from custom furniture
                    to the lighting that sets the mood. Together, they&apos;re
                    building more than a business; they&apos;re crafting a
                    community sanctuary.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Together Section - Founders Quote */}

          <Reveal delay={400}>
            <div className="contact-quote mt-24 p-8 sm:p-10 md:p-12 rounded-2xl text-center">
              <Coffee size={32} className="mx-auto mb-6 contact-quote__icon" />

              <blockquote className="contact-quote__text font-serif text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed mb-4">
                &quot;We wanted to create a space where the first sip of morning
                coffee feels like opening a new chapter. Every day at The
                Notebook Cafe is a story worth telling.&quot;
              </blockquote>

              <footer className="contact-quote__footer text-xs uppercase tracking-[0.2em] font-bold">
                — The Founders
              </footer>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
