/**
 * Story Page - The Notebook Café
 *
 * Redesigned about page featuring the café's story, values, and mission.
 */
import Reveal from "@/app/components/ui/Reveal";
import RevealText from "@/app/components/ui/RevealText";
import FadeInSection from "@/app/components/ui/FadeInSection";
import Image from "next/image";
import ParallaxHero from "@/app/components/features/ParallaxHero";
import { Coffee, Music, Heart, MapPin, Sparkles, BookOpen, Users, Home as HomeIcon, Award } from "lucide-react";
import "../styles/pages/story.css";
import type { Metadata } from "next";
import { SEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO.pages.story.title,
  description: SEO.pages.story.description,
  alternates: {
    canonical: '/story',
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
      {/* Hero Section (from prototype) */}
      <ParallaxHero
        className="parallax-hero--compact"
        contentClassName="parallax-hero__content--compact tnc-hero__content"
        backgroundImage="/menu/tnc-menu-banner.webp"
        backgroundFit="fitHeight"
        backgroundFitDesktop="cover"
        backgroundColor="var(--cafe-black)"
        parallax={false}
        overlayVariant="solid"
        focusPercent={32}
      >
        <div className="tnc-hero__inner relative z-10">
          <RevealText delay="0ms">
            <h1 className="tnc-hero__title font-serif">
              Our Story
            </h1>
          </RevealText>

          <FadeInSection delay="200ms">
            <p className="tnc-hero__subtitle">
              Built by Riverside Locals, For Riverside.
            </p>
          </FadeInSection>
        </div>
      </ParallaxHero>

      {/* The Origin Story - Two Column Layout */}
      <section
        data-section="The Origin"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div className="section-deco" style={{ top: '10%', left: '8%', animationDuration: '13s' }} aria-hidden="true">
          <BookOpen strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '12%', right: '10%', animationDuration: '11s', animationDelay: '0.6s' }} aria-hidden="true">
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
            <div className="space-y-6 order-1 lg:order-2 text-right lg:text-left">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                  Our Story
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="story-section-title font-serif text-5xl sm:text-6xl mb-8 leading-none">
                  How It <span className="story-section-title-accent italic">Began</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="story-divider story-divider--black w-24 h-[2px] ml-auto lg:ml-0" />
              </Reveal>
              <Reveal delay={200}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  Riverside needed a place that felt different. Not a quick stop for caffeine, but a <strong className="story-strong">destination</strong>. Somewhere the music wasn&apos;t an afterthought, the chairs were actually comfortable, and the coffee was treated with reverence.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  A space born from a love of <strong className="story-strong">specialty coffee</strong> and <strong className="story-strong">creative solitude</strong>. For writers, designers, students, and dreamers. A third place—somewhere between home and work where ideas take root.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  From single-origin Mexican beans to custom-designed furniture, every detail intentional. This isn&apos;t a corporate playbook—it&apos;s a husband-wife team building their <em className="story-em-accent italic">first business together</em>, pouring everything into creating something genuinely special.
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
        <div className="section-deco" style={{ top: '8%', right: '10%', animationDuration: '11s' }} aria-hidden="true">
          <MapPin strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', left: '8%', animationDuration: '12s', animationDelay: '0.4s' }} aria-hidden="true">
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
                  <div
                    className="story-image-overlay absolute inset-0 opacity-30"
                  />
                </div>
              </Reveal>

              <Reveal delay={150} replay={false}>
                <div className="story-established-badge absolute -bottom-6 -right-6 shadow-2xl">
                  <p className="text-xl md:text-2xl leading-tight">2025</p>
                  <p className="text-xl md:text-2xl leading-tight">Established</p>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] mt-2 opacity-90">
                    Heart of Riverside
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-1">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                  Our Riverside Home
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="story-section-title font-serif text-5xl sm:text-6xl mb-8 leading-none">
                  Why <span className="story-section-title-accent italic">Here?</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="story-divider story-divider--black w-24 h-[2px]" />
              </Reveal>
              <Reveal delay={200}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  Positioned near the art district and University Drive nightlife, we&apos;re at the intersection where Riverside&apos;s diverse communities meet. Remote workers, art enthusiasts, students, pre-club crews—everyone belongs here.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="story-body text-lg md:text-xl font-normal leading-relaxed">
                  We believe in Riverside&apos;s potential. This city deserves a coffee shop that reflects its creative spirit, its diversity, its energy. We&apos;re not just opening a café—we&apos;re investing in our community&apos;s future.
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
        <div className="section-deco" style={{ top: '6%', right: '12%', animationDuration: '13s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', left: '6%', animationDuration: '10s', transform: 'rotate(-10deg)' }} aria-hidden="true">
          <Sparkles strokeWidth={1.6} />
        </div>
        <div className="section-deco-mobile" style={{ top: '6%', right: '10%' }} aria-hidden="true">
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

            <div className="order-1 lg:order-2 space-y-6 text-right items-end lg:pl-10 relative">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                  Our Philosophy
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cafe-black mb-8 leading-none">
                  Crafted for <br />
                  <span className="story-section-title-accent italic">Creatives</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="story-divider story-divider--black w-24 h-[2px] ml-auto" />
              </Reveal>
              <Reveal delay={200}>
                <p className="text-xl md:text-2xl text-cafe-brown mb-6 font-normal leading-relaxed">
                  We believe that great ideas start with great coffee. Whether you&apos;re sketching your next masterpiece, writing the next great novel, or just enjoying a moment of silence.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="text-xl md:text-2xl text-cafe-brown mb-10 font-normal leading-relaxed">
                  Our beans are ethically sourced, roasted in small batches, and brewed with precision to fuel your inspiration.
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
        <div className="section-deco" style={{ top: '8%', right: '10%', animationDuration: '13s' }} aria-hidden="true">
          <Sparkles strokeWidth={1.6} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', left: '12%', animationDuration: '11s', animationDelay: '0.7s' }} aria-hidden="true">
          <Award strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="mb-24">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                The Difference
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="story-section-title font-serif text-5xl sm:text-6xl mb-6 leading-none">
                What Makes Us <span className="story-section-title-accent italic">Unique</span>
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
                  <Coffee size={20} className="text-cafe-tan" strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-cafe-tan">
                    Origin
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  Single-Origin Mexican Coffee
                </h3>
                <p className="text-lg font-normal leading-relaxed text-cafe-brown">
                  Direct-trade Chiapas and Oaxaca lots, roasted to honor sweetness and terroir. Every cup carries a cultural story and a transparent supply chain.
                </p>
              </div>
            </Reveal>

            {/* 2. Custom Design */}
            <Reveal delay={260}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-cafe-tan" strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-cafe-tan">
                    Design
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  100% Custom-Designed Space
                </h3>
                <p className="text-lg font-normal leading-relaxed text-cafe-brown">
                  Built-by-hand furniture, lighting, and layout designed by our founder. Nothing off-the-shelf—only intentional pieces that invite you to linger.
                </p>
              </div>
            </Reveal>

            {/* 3. Soundscapes */}
            <Reveal delay={320}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Music size={20} className="text-cafe-tan" strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-cafe-tan">
                    Atmosphere
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  Curated Soundscapes
                </h3>
                <p className="text-lg font-normal leading-relaxed text-cafe-brown">
                  Deep house, neo-soul, and lo-fi playlists scored for focus and calm. No generic radio, just sound that matches the craft in your cup.
                </p>
              </div>
            </Reveal>

            {/* 4. Community */}
            <Reveal delay={380}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Heart size={20} className="text-cafe-tan" strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-cafe-tan">
                    Hospitality
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-cafe-black">
                  Community First
                </h3>
                <p className="text-lg font-normal leading-relaxed text-cafe-brown">
                  Riverside&apos;s living room—stay as long as you like. Students, creatives, neighbors: everyone is welcome, always.
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
        <div className="section-deco" style={{ top: '10%', left: '10%', animationDuration: '12s' }} aria-hidden="true">
          <Heart strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '8%', right: '12%', animationDuration: '11s', animationDelay: '0.5s' }} aria-hidden="true">
          <Users strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <span className="story-eyebrow text-xs uppercase tracking-[0.25em] font-semibold">
                The People Behind the Pour
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="story-section-title font-serif text-4xl md:text-6xl mt-4">
                Meet the <span className="story-section-title-accent italic">Founders & Owners</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-20 lg:gap-32">
            {/* Michael & Julia - Founders & Owners */}
            <Reveal delay={200}>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image */}
                <div className="relative order-2 lg:order-1">
                  <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
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
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="story-card-title font-serif text-3xl md:text-4xl mb-2">
                      Michael & Julia
                    </h3>
                    <p className="story-eyebrow text-xs uppercase tracking-[0.25em] font-semibold text-cafe-tan">
                      Founders & Owners
                    </p>
                  </div>

                  <div className="story-divider story-divider--tan w-16 h-[2px]" />

                  <p className="story-card-body text-lg font-normal leading-relaxed text-cafe-brown">
                    A husband-wife team with a shared vision: to create a coffee shop that Riverside deserves. Michael brings expertise in specialty coffee, sourcing, and extraction science, while Julia designs every intentional detail—from custom furniture to the lighting that sets the mood. Together, they&apos;re building more than a business; they&apos;re crafting a community sanctuary.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-4 py-2 bg-cafe-tan/10 text-cafe-tan text-xs uppercase tracking-wider font-semibold rounded-sm">
                      Q Grader Certified
                    </span>
                    <span className="px-4 py-2 bg-cafe-tan/10 text-cafe-tan text-xs uppercase tracking-wider font-semibold rounded-sm">
                      Direct Trade Advocate
                    </span>
                    <span className="px-4 py-2 bg-cafe-tan/10 text-cafe-tan text-xs uppercase tracking-wider font-semibold rounded-sm">
                      Interior Design
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Together Section - Founders Quote */}
          <Reveal delay={400}>
            <div className="mt-24 md:mt-32 p-10 md:p-16 rounded-2xl text-center bg-cafe-tan/10 border border-cafe-tan/20">
              <Coffee size={32} className="mx-auto mb-6 text-cafe-tan" />
              <blockquote className="max-w-4xl mx-auto">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-cafe-brown/80 mb-6">
                  &ldquo;This is more than a business venture—it&apos;s our first shared creative project, a culmination of our individual passions converging into something we hope Riverside will love as much as we do.&rdquo;
                </p>
                <footer className="text-sm uppercase tracking-[0.25em] font-semibold text-cafe-tan">
                  — The Founders
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
