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
import MenuSection from "@/app/components/features/MenuSection";
import HeroSection from "@/app/components/features/HeroSection";
import NewsletterSection from "@/app/components/features/NewsletterSection";
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

      <HeroSection />

      {/* Menu Section */}
      <MenuSection />

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
                  alt="Barista pouring coffee at The Notebook Café in Riverside, CA"
                  width={900}
                  height={1200}
                  className="w-full h-full object-cover rounded-sm translate-y-12 shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  priority
                />
                <Image
                  src="/unsplash/tnc-placeholder-2.png"
                  alt="Cozy corner seating at The Notebook Café in Riverside, CA"
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
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

    </main>
  );
}
