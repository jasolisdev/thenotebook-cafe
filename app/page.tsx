/**
 * Homepage - The Notebook Café
 *
 * Redesigned homepage featuring new hero, sanctuary section, vibe carousel, and newsletter.
 */
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Reveal from "./components/ui/Reveal";
import HeroButtons from "./components/ui/HeroButtons";
import KenBurnsHero from "./components/features/KenBurnsHero";
import HeroHeart from "./components/ui/HeroHeart";
import StoryLink from "./components/ui/StoryLink";
import StoryBlobs from "./components/ui/StoryBlobs";
import AtmosphereBlob from "./components/ui/AtmosphereBlob";
import PhilosophyBlob from "./components/ui/PhilosophyBlob";
import { Coffee, Music, Wifi, PlugZap, Armchair, Sparkles } from "lucide-react";
import AtmosphereStrip from "./components/AtmosphereStrip";
import SignaturePoursGrid from "./components/SignaturePoursGrid";

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
    title: "Fiber Optic Wi-Fi",
    description: "Gigabit speeds for heavy workflows.",
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
    <main className="overflow-hidden" style={{ backgroundColor: 'var(--cafe-mist)', color: 'var(--cafe-brown)' }}>
      {/* Hero Section */}
      <KenBurnsHero
        backgroundImage="/home/tnc-home-hero-bg.png"
        contentClassName="home-hero-shell"
      >
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <Reveal>
              <div className="home-hero-pill">
                Est. Riverside 2026
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="home-hero-title">
                Where Every Cup <span className="home-hero-title-accent">Tells a Story</span>
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="home-hero-subtitle">
                Come For The Coffee, <br className="hero-subtitle-break" />
                Stay For The Vibe.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="home-hero-cta">
                <HeroButtons />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="home-hero-visual-wrap">
            <div className="home-hero-visual">
              <div className="hero-latte-wrapper">
                <div className="relative animate-float">
                  <div className="hero-latte-image">
                    <Image
                      src="/unsplash/tnc-hero-cup-v2.png"
                      alt="Signature latte art"
                      width={460}
                      height={460}
                      className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] object-cover rounded-full border-[12px] relative z-10"
                      style={{ borderColor: "rgba(var(--cafe-cream-rgb), 0.96)" }}
                      priority
                    />
                  </div>

                  <div className="hero-latte-card">
                    <span className="hero-latte-pill">Signature</span>
                    <span className="font-display font-bold text-sm text-cafe-brown">Latte</span>
                    <div className="flex gap-[4px] mt-1 text-cafe-tan text-[12px]">
                      <span aria-hidden>★</span>
                      <span aria-hidden>★</span>
                      <span aria-hidden>★</span>
                      <span aria-hidden>★</span>
                    </div>
                  </div>

                  <HeroHeart />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </KenBurnsHero>

      {/* Signature Pours */}
      <section
        data-section="Signature Pours"
        className="relative py-24 px-6 overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        {/* Subtle Floating Decorations */}
        <div className="absolute top-20 right-10 md:right-20 opacity-[0.05] pointer-events-none signature-float" style={{ animation: 'floatGentle 10s ease-in-out infinite' }}>
          <Coffee size={64} className="text-cafe-tan" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-32 left-10 md:left-24 opacity-[0.05] pointer-events-none signature-float" style={{ animation: 'floatGentle 12s ease-in-out infinite 2s' }}>
          <Coffee size={52} className="text-cafe-tan" strokeWidth={1.5} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--cafe-tan)' }}>
                Signature Pours
              </span>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-serif text-4xl md:text-5xl mt-4" style={{ color: 'var(--cafe-black)' }}>
                Crafted With Care
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-4 text-base md:text-lg font-light" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.75)' }}>
                Small-batch recipes we obsess over—balanced, nuanced, and poured with a steady hand.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <SignaturePoursGrid pours={signaturePours} />
          </div>

          <div className="text-center mt-16">
            <Reveal delay={200}>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.25em] font-semibold border-2 border-cafe-black rounded-sm transition-all duration-300 hover:bg-cafe-black hover:text-cafe-white hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  boxShadow: '0 4px 12px rgba(44, 36, 32, 0.08)',
                }}
              >
                View Our Menu
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
        <div />
      </section>

      {/* Our Philosophy */}
      <section
        data-section="Our Philosophy"
        className="py-24 relative overflow-visible"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <PhilosophyBlob />
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
                    alt="Cafe bar espresso"
                    width={900}
                    height={900}
                    className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl -mt-6 md:mt-12"
                  />
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-2.png"
                    alt="Cafe pastry display"
                    width={900}
                    height={900}
                    className="w-full aspect-[3/4] object-cover rounded-2xl shadow-xl mt-10 md:mt-0"
                  />
                </div>
              </Reveal>
              <Reveal delay={150} replay={false}>
                <div className="absolute -bottom-6 -left-6 bg-cafe-black text-cafe-cream p-5 md:p-6 rounded-tr-3xl shadow-2xl max-w-[180px] md:max-w-[220px]">
                  <p className="font-serif text-2xl md:text-2xl mb-1">Grand Opening</p>
                  <div className="text-xs md:text-xs text-cafe-tan mb-2">Coming Soon 2025</div>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-widest opacity-60">
                    Save the date
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2 space-y-6 text-right items-end lg:pl-10 relative">
              <div className="philosophy-blob hidden lg:block" aria-hidden="true"></div>
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                  Our Philosophy
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-serif text-5xl sm:text-6xl text-cafe-black mb-8 leading-none">
                  Crafted for <br />
                  <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Creatives</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="w-24 h-[2px] ml-auto" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg text-cafe-brown/80 mb-6 font-light leading-relaxed">
                  We believe that great ideas start with great coffee. Whether you're sketching your next masterpiece, writing the next great novel, or just enjoying a moment of silence.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="text-lg text-cafe-brown/80 mb-10 font-light leading-relaxed">
                  Our beans are ethically sourced, roasted in small batches, and brewed with precision to fuel your inspiration.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div className="flex gap-10 justify-end border-t border-cafe-beige pt-8">
                  <div>
                    <h4 className="font-serif text-2xl text-cafe-black mb-1">
                      100%
                    </h4>
                    <p className="text-xs text-cafe-brown uppercase tracking-wider">
                      Organic Beans
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-cafe-black mb-1">
                      Daily
                    </h4>
                    <p className="text-xs text-cafe-brown uppercase tracking-wider">
                      Fresh Pastries
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Low Lights Section */}
      <section
        data-section="Low Lights"
        className="relative overflow-visible py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <StoryBlobs />
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
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]" style={{ color: 'var(--cafe-black)' }}>
                Low lights,<br />
                good sound,<br />
                <span className="italic" style={{ color: 'var(--cafe-tan)' }}>better coffee.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px]" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.78)' }}>
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
        <div className="section-deco" style={{ top: '12%', right: '16%', animationDuration: '10s' }} aria-hidden="true">
          <Sparkles strokeWidth={1.6} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '6%', left: '10%', animationDuration: '12s', animationDelay: '0.6s' }} aria-hidden="true">
          <Armchair strokeWidth={1.4} />
        </div>
        <div className="section-deco-mobile" style={{ top: '8%', right: '12%' }} aria-hidden="true">
          <Sparkles strokeWidth={1.6} />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3">
            <Reveal>
              <div className="p-10 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full trinity-icon" style={{ backgroundColor: 'var(--cafe-white)', color: 'var(--cafe-tan)', border: '1px solid rgba(var(--cafe-tan-rgb), 0.35)' }}>
                  <svg viewBox="0 0 24 24" className="trinity-cup" aria-hidden="true" focusable="false">
                    <path
                      d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="trinity-steam-line trinity-steam-line-1" aria-hidden="true"></div>
                  <div className="trinity-steam-line trinity-steam-line-2" aria-hidden="true"></div>
                  <div className="trinity-steam-line trinity-steam-line-3" aria-hidden="true"></div>
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: 'var(--cafe-black)' }}>Craft Espresso</h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-black-rgb), 0.7)' }}>
                  Roasted locally, extracted with precision. We respect the bean and the process.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative p-10 text-center">
                {/* Desktop: Vertical gradient dividers */}
                <span
                  className="hidden md:block absolute inset-y-6 left-0 w-px"
                  style={{ background: 'linear-gradient(180deg, rgba(var(--cafe-brown-rgb),0) 0%, rgba(var(--cafe-brown-rgb),0.35) 50%, rgba(var(--cafe-brown-rgb),0) 100%)' }}
                ></span>
                <span
                  className="hidden md:block absolute inset-y-6 right-0 w-px"
                  style={{ background: 'linear-gradient(180deg, rgba(var(--cafe-brown-rgb),0) 0%, rgba(var(--cafe-brown-rgb),0.35) 50%, rgba(var(--cafe-brown-rgb),0) 100%)' }}
                ></span>
                {/* Mobile: Horizontal gradient dividers */}
                <span
                  className="md:hidden block absolute top-0 inset-x-10 h-px"
                  style={{ background: 'linear-gradient(90deg, rgba(var(--cafe-brown-rgb),0) 0%, rgba(var(--cafe-brown-rgb),0.35) 50%, rgba(var(--cafe-brown-rgb),0) 100%)' }}
                ></span>
                <span
                  className="md:hidden block absolute bottom-0 inset-x-10 h-px"
                  style={{ background: 'linear-gradient(90deg, rgba(var(--cafe-brown-rgb),0) 0%, rgba(var(--cafe-brown-rgb),0.35) 50%, rgba(var(--cafe-brown-rgb),0) 100%)' }}
                ></span>
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: 'var(--cafe-white)', color: 'var(--cafe-tan)', border: '1px solid rgba(var(--cafe-tan-rgb), 0.35)' }}>
                  <div className="music-visualizer" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: 'var(--cafe-black)' }}>Curated Sound</h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-black-rgb), 0.7)' }}>
                  Deep house, soul, and lo-fi grooves tuned to keep you in flow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="p-10 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: 'var(--cafe-white)', color: 'var(--cafe-tan)', border: '1px solid rgba(var(--cafe-tan-rgb), 0.35)' }}>
                  <Armchair size={26} className="couch-bounce" />
                </div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: 'var(--cafe-black)' }}>Creative Comfort</h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-black-rgb), 0.7)' }}>
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
        className="relative pt-24 md:pt-32 pb-[calc(6rem+20px)] md:pb-[calc(8rem+20px)] px-6 overflow-visible mb-16 md:mb-24"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <AtmosphereBlob />
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
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.1)', color: 'var(--cafe-tan)' }}
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="font-serif text-xl mb-1" style={{ color: 'var(--cafe-black)' }}>{item.title}</div>
                        <p className="text-sm md:text-base" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.7)' }}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Column - Heading (order-1 on mobile) */}
          <div className="space-y-6 order-1 lg:order-2 text-right items-end lg:pl-10">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                The Atmosphere
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]" style={{ color: 'var(--cafe-black)' }}>
                <span className="italic" style={{ color: 'var(--cafe-brown)' }}>Designed for</span><br />
                <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Focus</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px] ml-auto" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.78)' }}>
                A sanctuary with warm lighting, deep playlists, and Wi-Fi that never drops. Settle in for an hour or stay all day.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Atmosphere Images */}
      <section
        data-section="Atmosphere Images"
        className="overflow-visible relative pb-24 md:pb-28"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
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
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="section-deco" style={{ top: '12%', left: '10%', animationDuration: '11s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', right: '12%', animationDuration: '12s', animationDelay: '0.6s' }} aria-hidden="true">
          <Music strokeWidth={1.4} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="w-16 h-[2px] mx-auto mb-8" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8"
              style={{ color: 'var(--cafe-black)' }}
            >
              Stay in the{" "}
              <span className="italic" style={{ color: 'var(--cafe-tan)' }}>
                Loop
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
              style={{ color: 'rgba(var(--cafe-brown-rgb), 0.8)' }}
            >
              New events announced weekly. Follow us for updates, behind-the-scenes moments, and spontaneous gatherings.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <a
              href="https://instagram.com/thenotebookcafellc"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 text-xs md:text-sm uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                backgroundColor: 'var(--cafe-black)',
                color: 'var(--cafe-white)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                borderRadius: '4px'
              }}
            >
              <Coffee size={20} strokeWidth={2} />
              <span>@thenotebookcafellc</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
