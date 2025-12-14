/**
 * Story Page - The Notebook Café
 *
 * Redesigned about page featuring the café's story, values, and mission.
 */
import { client } from "@/sanity/lib/client";
import Reveal from "../components/ui/Reveal";
import RevealText from "../components/ui/RevealText";
import FadeInSection from "../components/ui/FadeInSection";
import Image from "next/image";
import ParallaxHero from "../components/features/ParallaxHero";
import { Coffee, Music, Heart, MapPin, Sparkles, BookOpen, Users, Home as HomeIcon, Award } from "lucide-react";

type PortableChild = { text?: string };
type PortableBlock = { _type?: string; children?: PortableChild[] };

/** Fetch "aboutPage" from Sanity */
async function getAboutData() {
  const about = await client.fetch(`*[_type=="aboutPage"][0]{
    title, body, valuesHeading, valuesBullets, missionHeading, founderNote
  }`);
  return { about };
}

/** Very small portable text renderer */
function PT({ body }: { body: PortableBlock[] }) {
  if (!body) return null;
  return (
    <div className="max-w-4xl mx-auto font-light">
      {body.map((b: PortableBlock, i: number) =>
        b._type === "block" ? (
          <p key={i} className={i === 0 ? "text-base md:text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-cafe-black first-letter:mr-3 first-letter:float-left" : "text-base md:text-lg leading-relaxed mt-6"} style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
            {b.children?.map((c: PortableChild) => c.text || "").join("")}
          </p>
        ) : null,
      )}
    </div>
  );
}

export default async function StoryPage() {
  const { about } = await getAboutData();

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cafe-mist)' }}>
      {/* Hero Section (from prototype) */}
      <ParallaxHero backgroundImage="/story/tnc-story-hero-bg.png" overlayVariant="light">
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 px-6 text-center">
          {/* Eyebrow - Instant reveal */}
          <RevealText delay="0ms">
            <span className="font-bold tracking-[0.2em] uppercase text-sm block" style={{ color: 'var(--cafe-tan)' }}>
              Our Story
            </span>
          </RevealText>

          {/* Main Headline - 200ms delay */}
          <RevealText delay="200ms">
            <h1 className="font-serif text-[64px] md:text-[86px] leading-[0.9]" style={{ color: 'var(--cafe-cream)' }}>
              Built by Locals,<br />
              <span className="italic" style={{ color: 'var(--cafe-tan)' }}>For Locals</span>
            </h1>
          </RevealText>

          {/* Body Content - 400ms delay */}
          <FadeInSection delay="400ms">
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-cream-rgb), 0.82)' }}>
              The story of a husband-wife dream to create Riverside&apos;s first truly genuine coffee community hub.
            </p>
          </FadeInSection>
        </div>
      </ParallaxHero>

      {/* Main Content */}
      <section
        data-section="Story Main Content"
        className="max-w-6xl mx-auto px-6 py-20 space-y-20"
      >
        {/* Cafe Name with Coffee Cup Decoration */}
        <div className="text-center mb-16">
          <Reveal>
            <h2
              className="font-serif text-4xl md:text-5xl mb-6"
              style={{ color: '#2C2420' }}
            >
              The Notebook Café
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 md:w-20 h-[2px]" style={{ backgroundColor: 'rgba(164, 141, 120, 0.3)' }}></div>
              <Coffee size={24} style={{ color: '#A48D78' }} strokeWidth={1.5} />
              <div className="w-12 md:w-20 h-[2px]" style={{ backgroundColor: 'rgba(164, 141, 120, 0.3)' }}></div>
            </div>
          </Reveal>
        </div>

        {/* Story Text */}
        <div>
          <Reveal>
            {about?.body ? (
              <PT body={about.body} />
            ) : (
              <div className="prose prose-xl mx-auto font-light" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
                <p className="text-lg md:text-xl first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
                  It started with a simple observation: Riverside needed a place that felt different.
                  Not a quick stop for caffeine, but a destination. A place where the music wasn&apos;t an afterthought,
                  where the chairs were actually comfortable, and where the coffee was treated with the reverence it deserves.
                </p>
                <p className="text-lg md:text-xl mt-6" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
                  The Notebook Café was born from a love of two things: <strong className="font-medium" style={{ color: '#2C2420' }}>specialty coffee</strong> and <strong className="font-medium" style={{ color: '#2C2420' }}>creative solitude</strong>.
                  We wanted to build a space for the writers, the designers, the students, and the dreamers.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>


      {/* The Origin Story - Two Column Layout */}
      <section
        data-section="The Origin"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="section-deco" style={{ top: '10%', left: '8%', animationDuration: '13s' }} aria-hidden="true">
          <BookOpen strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '12%', right: '10%', animationDuration: '11s', animationDelay: '0.6s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image - Left Side */}
            <div className="relative">
              <Reveal>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-1.png"
                    alt="Our origin story"
                    fill
                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: 'linear-gradient(135deg, rgba(44, 36, 32, 0.5) 0%, transparent 60%)' }}
                  ></div>
                </div>
              </Reveal>

              <Reveal delay={150} replay={false}>
                <div
                  className="absolute -bottom-6 -right-6 shadow-2xl"
                  style={{
                    backgroundColor: 'var(--cafe-tan)',
                    color: 'var(--cafe-white)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    border: '1px solid rgba(255,255,255,0.32)',
                    fontFamily: 'var(--font-serif)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.12)',
                    letterSpacing: '0.02em'
                  }}
                >
                  <p className="text-xl md:text-2xl leading-tight">Built by</p>
                  <p className="text-xl md:text-2xl leading-tight">Dreamers</p>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] mt-2 opacity-90">
                    For Dreamers
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Content - Right Side */}
            <div className="space-y-6">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                  Our Story
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-serif text-5xl sm:text-6xl mb-8 leading-none" style={{ color: 'var(--cafe-black)' }}>
                  How It <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Began</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="w-24 h-[2px]" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}>
                  Riverside needed a place that felt different. Not a quick stop for caffeine, but a <strong style={{ color: 'var(--cafe-black)', fontWeight: 600 }}>destination</strong>. Somewhere the music wasn&apos;t an afterthought, the chairs were actually comfortable, and the coffee was treated with reverence.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}>
                  A space born from a love of <strong style={{ color: 'var(--cafe-black)', fontWeight: 600 }}>specialty coffee</strong> and <strong style={{ color: 'var(--cafe-black)', fontWeight: 600 }}>creative solitude</strong>. For writers, designers, students, and dreamers. A third place—somewhere between home and work where ideas take root.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}>
                  From single-origin Mexican beans to custom-designed furniture, every detail intentional. This isn&apos;t a corporate playbook—it&apos;s a husband-wife team building their <em className="italic" style={{ color: 'var(--cafe-tan)' }}>first business together</em>, pouring everything into creating something genuinely special.
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
        style={{ backgroundColor: 'var(--cafe-mist)' }}
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
            <div className="relative">
              <Reveal>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/unsplash/placeholder-interior-shop.png"
                    alt="Riverside location"
                    fill
                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: 'linear-gradient(135deg, rgba(44, 36, 32, 0.5) 0%, transparent 60%)' }}
                  ></div>
                </div>
              </Reveal>

              <Reveal delay={150} replay={false}>
                <div
                  className="absolute -bottom-6 -right-6 shadow-2xl"
                  style={{
                    backgroundColor: 'var(--cafe-tan)',
                    color: 'var(--cafe-white)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    border: '1px solid rgba(255,255,255,0.32)',
                    fontFamily: 'var(--font-serif)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.12)',
                    letterSpacing: '0.02em'
                  }}
                >
                  <p className="text-xl md:text-2xl leading-tight">2025</p>
                  <p className="text-xl md:text-2xl leading-tight">Establised</p>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] mt-2 opacity-90">
                    Heart of Riverside
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <Reveal>
                <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                  Our Riverside Home
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-serif text-5xl sm:text-6xl mb-8 leading-none" style={{ color: 'var(--cafe-black)' }}>
                  Why <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Here?</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <div className="w-24 h-[2px]" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}>
                  Positioned near the art district and University Drive nightlife, we&apos;re at the intersection where Riverside&apos;s diverse communities meet. Remote workers, art enthusiasts, students, pre-club crews—everyone belongs here.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}>
                  We believe in Riverside&apos;s potential. This city deserves a coffee shop that reflects its creative spirit, its diversity, its energy. We&apos;re not just opening a café—we&apos;re investing in our community&apos;s future.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div className="flex gap-10 border-t border-cafe-beige pt-8">
                  <div>
                    <h4 className="font-serif text-2xl mb-1" style={{ color: 'var(--cafe-black)' }}>
                      2026
                    </h4>
                    <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--cafe-brown)' }}>
                      Grand Opening
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl mb-1" style={{ color: 'var(--cafe-black)' }}>
                      100%
                    </h4>
                    <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--cafe-brown)' }}>
                      Local Owned
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Editorial Grid */}
      <section
        data-section="What Sets Us Apart"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
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
              <h2 className="font-serif text-5xl sm:text-6xl mb-6 leading-none" style={{ color: 'var(--cafe-black)' }}>
                What Makes Us <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Unique</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px]" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
            </Reveal>
          </div>

          {/* Grid of Differentiators */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-20">
            {/* 1. Mexican Coffee */}
            <Reveal delay={200}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.12)' }}>
                    <Coffee size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Origin
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  Single-Origin Mexican Coffee
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
                <p className="text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.85)' }}>
                  Direct-trade Chiapas and Oaxaca lots, roasted to honor sweetness and terroir. Every cup carries a cultural story and a transparent supply chain.
                </p>
              </div>
            </Reveal>

            {/* 2. Custom Design */}
            <Reveal delay={260}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.12)' }}>
                    <Users size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Design
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  100% Custom-Designed Space
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
                <p className="text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.85)' }}>
                  Built-by-hand furniture, lighting, and layout designed by our founder. Nothing off-the-shelf—only intentional pieces that invite you to linger.
                </p>
              </div>
            </Reveal>

            {/* 3. Soundscapes */}
            <Reveal delay={320}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.12)' }}>
                    <Music size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Atmosphere
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  Curated Soundscapes
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
                <p className="text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.85)' }}>
                  Deep house, neo-soul, and lo-fi playlists scored for focus and calm. No generic radio, just sound that matches the craft in your cup.
                </p>
              </div>
            </Reveal>

            {/* 4. Community */}
            <Reveal delay={380}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.12)' }}>
                    <Heart size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Hospitality
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  Community First
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
                <p className="text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.85)' }}>
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
        style={{ backgroundColor: 'var(--cafe-mist)' }}
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
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--cafe-tan)' }}>
                The People Behind the Pour
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-6xl mt-4" style={{ color: 'var(--cafe-black)' }}>
                Meet the <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Founders</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-16">
            {/* Founder 1 - Coffee Visionary */}
            <Reveal delay={200}>
              <div
                className="relative rounded-3xl overflow-hidden p-8 md:p-10 lg:p-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(237, 230, 216, 0.4) 0%, rgba(244, 241, 234, 0.6) 100%)',
                  border: '2px solid rgba(var(--cafe-tan-rgb), 0.25)'
                }}
              >
                {/* Ornate corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: 'var(--cafe-tan)' }}></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: 'var(--cafe-tan)' }}></div>

                <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-center relative z-10">
                  {/* Portrait Frame */}
                  <div className="relative w-full max-w-[280px] lg:max-w-none mx-auto lg:mx-0">
                    {/* Industrial grid border */}
                    <div
                      className="absolute -inset-3 rounded-2xl opacity-30 pointer-events-none"
                      style={{
                        background: `
                          repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(var(--cafe-tan-rgb), 0.15) 8px, rgba(var(--cafe-tan-rgb), 0.15) 9px),
                          repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(var(--cafe-tan-rgb), 0.15) 8px, rgba(var(--cafe-tan-rgb), 0.15) 9px)
                        `
                      }}
                    ></div>

                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50">
                      <Image
                        src="/unsplash/tnc-placeholder-philosophy-1.png"
                        alt="Founder - Coffee Expert"
                        fill
                        className="object-cover grayscale-[30%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        sizes="(min-width: 1024px) 320px, 280px"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: 'var(--cafe-black)' }}>
                        The Coffee Visionary
                      </h3>
                      <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--cafe-tan)' }}>
                        Founder & Head of Coffee
                      </p>
                    </div>

                    <div className="w-20 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>

                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.85)' }}>
                      With years of experience in specialty coffee and a deep connection to Mexican coffee culture, they bring expertise in sourcing, roasting, and extraction science. Every dial-in, every pour—it&apos;s personal.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <div
                        className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.2)',
                          color: 'var(--cafe-brown)',
                          border: '1px solid rgba(var(--cafe-tan-rgb), 0.3)'
                        }}
                      >
                        Q Grader Certified
                      </div>
                      <div
                        className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.2)',
                          color: 'var(--cafe-brown)',
                          border: '1px solid rgba(var(--cafe-tan-rgb), 0.3)'
                        }}
                      >
                        Direct Trade Advocate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Founder 2 - Creative Architect */}
            <Reveal delay={300}>
              <div
                className="relative rounded-3xl overflow-hidden p-8 md:p-10 lg:p-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(244, 241, 234, 0.6) 0%, rgba(237, 230, 216, 0.4) 100%)',
                  border: '2px solid rgba(var(--cafe-tan-rgb), 0.25)'
                }}
              >
                {/* Ornate corner decorations */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-3xl" style={{ borderColor: 'var(--cafe-tan)' }}></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 rounded-bl-3xl" style={{ borderColor: 'var(--cafe-tan)' }}></div>

                <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-center relative z-10">
                  {/* Content - comes first on desktop for alternating layout */}
                  <div className="space-y-5 order-2 lg:order-1">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: 'var(--cafe-black)' }}>
                        The Creative Architect
                      </h3>
                      <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--cafe-tan)' }}>
                        Founder & Design Director
                      </p>
                    </div>

                    <div className="w-20 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>

                    <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.85)' }}>
                      A designer with an eye for detail and a passion for creating spaces that inspire. Every bench, table, and light fixture in The Notebook Café is custom-designed—no catalog orders, just intentional craft.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <div
                        className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.2)',
                          color: 'var(--cafe-brown)',
                          border: '1px solid rgba(var(--cafe-tan-rgb), 0.3)'
                        }}
                      >
                        Interior Design
                      </div>
                      <div
                        className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.2)',
                          color: 'var(--cafe-brown)',
                          border: '1px solid rgba(var(--cafe-tan-rgb), 0.3)'
                        }}
                      >
                        Furniture Maker
                      </div>
                    </div>
                  </div>

                  {/* Portrait Frame */}
                  <div className="relative w-full max-w-[280px] lg:max-w-none mx-auto lg:mx-0 order-1 lg:order-2">
                    {/* Industrial grid border */}
                    <div
                      className="absolute -inset-3 rounded-2xl opacity-30 pointer-events-none"
                      style={{
                        background: `
                          repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(var(--cafe-tan-rgb), 0.15) 8px, rgba(var(--cafe-tan-rgb), 0.15) 9px),
                          repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(var(--cafe-tan-rgb), 0.15) 8px, rgba(var(--cafe-tan-rgb), 0.15) 9px)
                        `
                      }}
                    ></div>

                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50">
                      <Image
                        src="/unsplash/tnc-placeholder-philosophy-2.png"
                        alt="Founder - Designer"
                        fill
                        className="object-cover grayscale-[30%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        sizes="(min-width: 1024px) 320px, 280px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Together Section - Founders Quote */}
          <Reveal delay={400}>
            <div className="mt-20 p-10 md:p-16 rounded-2xl relative" style={{ border: '2px solid rgba(var(--cafe-tan-rgb), 0.3)' }}>
              {/* Icon with Lines */}
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="flex-1 h-[1px]" style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.3)' }}></div>
                <Music size={32} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                <div className="flex-1 h-[1px]" style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.3)' }}></div>
              </div>

              {/* Quote */}
              <blockquote className="text-center">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed mb-6 max-w-4xl mx-auto" style={{ color: 'var(--cafe-black)' }}>
                  &ldquo;This is more than a business venture—it&apos;s our first shared creative project, a culmination of our individual passions converging into something we hope Riverside will love as much as we do.&rdquo;
                </p>
                <footer className="text-sm uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--cafe-tan)' }}>
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
