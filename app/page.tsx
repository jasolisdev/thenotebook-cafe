/**
 * Homepage - The Notebook Café
 *
 * Redesigned homepage featuring new hero, sanctuary section, vibe carousel, and newsletter.
 */
import "./styles/pages/home.css";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./components/ui/Reveal";
import RevealText from "./components/ui/RevealText";
import FadeInSection from "./components/ui/FadeInSection";
import HeroButtons from "./components/ui/HeroButtons";
import KenBurnsHero from "./components/features/KenBurnsHero";
import HeroHeart from "./components/ui/HeroHeart";
import StoryLink from "./components/ui/StoryLink";
import { Coffee, Music, Wifi, PlugZap, Armchair, Sparkles, BookOpen, Heart, Users } from "lucide-react";
import AtmosphereStrip from "./components/AtmosphereStrip";
import SignaturePoursGrid from "./components/SignaturePoursGrid";
import NewsletterSubscribe from "./components/ui/NewsletterSubscribe";

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

export default async function HomePage() {
  return (
    <main className="overflow-hidden" style={{ color: 'var(--cafe-brown)' }}>
      {/* Hero Section - Editorial Minimalist */}
      <section
        className="editorial-hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Coffee Texture Background */}
        <div className="editorial-hero-bg" aria-hidden="true" />

        {/* Content */}
        <div
          className="editorial-hero-content"
        >
          {/* Eyebrow - Instant reveal (0ms) */}
          <RevealText delay="0ms">
            <p
              className="hero-eyebrow"
            >
              EST. RIVERSIDE 2026
            </p>
          </RevealText>

          {/* Main Headline - 200ms delay */}
          <RevealText delay="200ms">
            <h1
              className="hero-headline"
            >
              <span className="hero-headline-top">Where Every Cup</span>
              <br />
              <span className="hero-headline-bottom">Tells a Story</span>
            </h1>
          </RevealText>

          {/* Body Content - 400ms delay (waits for headline) */}
          <FadeInSection delay="400ms">
            <p
              className="hero-tagline"
            >
              COME FOR THE COFFEE, STAY FOR THE VIBE.
            </p>
          </FadeInSection>

          {/* Brewing Soon + Social Proof */}
          <FadeInSection delay="520ms">
            <div className="hero-brewing-soon">
              <div className="hero-brewing-pill" aria-label="Brewing Soon">
                <span>Brewing Soon</span>
                <span className="hero-brewing-cup" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" y1="1" x2="6" y2="4" className="hero-steam" style={{ animationDelay: '0s' }} />
                    <line x1="10" y1="1" x2="10" y2="4" className="hero-steam" style={{ animationDelay: '0.5s' }} />
                    <line x1="14" y1="1" x2="14" y2="4" className="hero-steam" style={{ animationDelay: '1s' }} />
                  </svg>
                </span>
              </div>

              <div className="hero-social-proof" aria-label="Future Local Favorite">
                <div className="hero-avatar-row" aria-hidden="true">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="hero-avatar">
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 20}`}
                        alt=""
                        fill
                        className="object-cover opacity-90"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <div className="hero-social-copy">
                  <span className="hero-social-title">Future Local Favorite</span>
                  <span className="hero-social-subtitle">Coming to Riverside 2026</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Signature Pours */}
      <section
        data-section="Signature Pours"
        className="relative py-24 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--cafe-tan)' }}>
                Signature Pours
              </span>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mt-4" style={{ color: 'var(--cafe-black)' }}>
                Crafted With Care
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p className="mt-4 text-xl md:text-2xl font-light" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.75)' }}>
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
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                  Our Philosophy
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cafe-black mb-8 leading-none">
                  Crafted for <br />
                  <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Creatives</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="w-24 h-[2px] ml-auto" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-xl md:text-2xl text-cafe-brown/80 mb-6 font-light leading-relaxed">
                  We believe that great ideas start with great coffee. Whether you&apos;re sketching your next masterpiece, writing the next great novel, or just enjoying a moment of silence.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="text-xl md:text-2xl text-cafe-brown/80 mb-10 font-light leading-relaxed">
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
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]" style={{ color: 'var(--cafe-black)' }}>
                Low lights,<br />
                good sound,<br />
                <span className="italic" style={{ color: 'var(--cafe-tan)' }}>better coffee.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px]" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-xl" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.78)' }}>
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
                <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-black-rgb), 0.7)' }}>
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
                <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-black-rgb), 0.7)' }}>
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
                <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-black-rgb), 0.7)' }}>
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
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.1)', color: 'var(--cafe-tan)' }}
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="font-serif text-xl mb-1" style={{ color: 'var(--cafe-black)' }}>{item.title}</div>
                        <p className="text-base md:text-lg" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.7)' }}>{item.description}</p>
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
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]" style={{ color: 'var(--cafe-black)' }}>
                <span className="italic" style={{ color: 'var(--cafe-brown)' }}>Designed for</span><br />
                <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Focus</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px] ml-auto" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-xl" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.78)' }}>
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

      {/* More Than Coffee - Two Column Layout */}
      <section
        data-section="More Than Coffee"
        className="more-than-coffee-section py-32 px-6 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Column - Text Content */}
          <div className="space-y-12">
            <Reveal>
              <div>
                <h2 className="font-serif text-4xl md:text-6xl text-cafe-black mb-6">
                  More than just coffee.{' '}
                  <br />
                  <span className="italic text-cafe-tan">It&apos;s a feeling.</span>
                </h2>
                <p className="text-cafe-brown/70 text-lg leading-relaxed">
                  We designed The Notebook Café to be an extension of your living room. Whether you&apos;re catching up with friends, diving into deep work, or just soaking in the playlist.
                </p>
              </div>
            </Reveal>

            {/* Feature List */}
            <div className="space-y-8">
              <Reveal delay={150}>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-cafe-tan/20 rounded-full text-cafe-tan">
                    <Music size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-cafe-black">
                      Curated Soundscapes
                    </h4>
                    <p className="text-cafe-brown/60 text-sm">
                      Vinyl sessions every morning and lo-fi beats for your focus hours.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-cafe-tan/20 rounded-full text-cafe-brown">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-cafe-black">
                      Creative Community
                    </h4>
                    <p className="text-cafe-brown/60 text-sm">
                      A space where artists, writers, and dreamers collide.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-cafe-brown/10 rounded-full text-cafe-black">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-cafe-black">
                      Direct Trade Beans
                    </h4>
                    <p className="text-cafe-brown/60 text-sm">
                      Sourced ethically from small farms in Mexico and beyond.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column - Overlapping Images */}
          <div className="relative h-[600px] w-full">
            <Reveal delay={100}>
              <div className="absolute top-10 left-10 w-3/4 h-3/4 z-20 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80"
                  alt="Cafe Interior"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(min-width: 768px) 50vw, 75vw"
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 z-10 overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
                  alt="Coffee Details"
                  fill
                  className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                  sizes="(min-width: 768px) 33vw, 67vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Test Section 1 */}
      <section
        data-section="test-section-1"
        className="relative py-32 overflow-hidden"
      />

      {/* Test Section 2 */}
      <section
        data-section="test-section-2"
        className="relative py-32 overflow-hidden"
      />

      {/* Test Section 3 */}
      <section
        data-section="test-section-3"
        className="relative py-32 overflow-hidden"
      />

      {/* Test Section 4 */}
      <section
        data-section="test-section-4"
        className="relative py-32 overflow-hidden"
      />

      {/* Test Section 5 */}
      <section
        data-section="test-section-5"
        className="relative py-32 overflow-hidden"
      />

      {/* Test Section 6 */}
      <section
        data-section="test-section-6"
        className="relative py-32 overflow-hidden"
      />

      {/* Stay in the Loop - Instagram CTA */}
      <section
        data-section="Stay in the Loop"
        className="relative py-24 md:py-32 overflow-hidden"
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
              className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
              style={{ color: 'var(--cafe-cream)' }}
            >
              <span style={{ fontWeight: 400 }}>Stay in the</span>{" "}
              <span className="italic" style={{ color: 'var(--cafe-white)', fontWeight: 600 }}>
                Loop
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
              style={{ color: 'rgba(237, 231, 216, 0.98)' }}
            >
              We open our doors in 2026. Be the first to know about our soft launch events and exclusive tastings.
            </p>
          </Reveal>

          {/* Email Subscription Form */}
          <Reveal delay={250}>
            <div className="max-w-3xl mx-auto mb-16">
              <NewsletterSubscribe />
            </div>
          </Reveal>

          {/* Social & Location */}
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs md:text-sm uppercase tracking-[0.2em] opacity-70" style={{ color: 'var(--cafe-cream)' }}>
              <a
                href="https://instagram.com/thenotebookcafellc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 hover:text-cafe-tan transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @thenotebookcafellc
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
