/**
 * Story Page - The Notebook Café
 *
 * Redesigned about page featuring the café's story, values, and mission.
 */
import { client } from "@/sanity/lib/client";
import Reveal from "../components/ui/Reveal";
import Image from "next/image";
import { Coffee, Music, Heart, MapPin, Sparkles, BookOpen } from "lucide-react";

type PortableChild = { text?: string };
type PortableBlock = { _type?: string; children?: PortableChild[] };

/** Fetch "aboutPage" + "settings" + "homePage" from Sanity */
async function getAboutData() {
  const [about, settings, home] = await Promise.all([
    client.fetch(`*[_type=="aboutPage"][0]{
      title, body, valuesHeading, valuesBullets, missionHeading, founderNote
    }`),
    client.fetch(`*[_type=="settings"][0]{
      social{ instagram, spotify }
    }`),
    client.fetch(`*[_type=="homePage"][0]{
      vibeCopy
    }`),
  ]);
  return { about, settings, home };
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
  const { about, settings, home } = await getAboutData();

  const bullets = about?.valuesBullets ?? [
    "A café that plays house, soul, and groove — not top 40 radio.",
    "A space you can actually sit in. Stay, settle, think, create.",
    "Coffee treated with respect — from beans to texture.",
    "A Riverside original — for locals and creatives alike.",
  ];

  const bulletIcons = [Music, Sparkles, Coffee, BookOpen];

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="relative pt-28 pb-28 md:pt-32 md:pb-32 px-6 text-center overflow-hidden" style={{ backgroundColor: '#2C2420', color: '#FAF9F6' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute right-0 top-0 w-96 h-96 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: '#A48D78' }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <Reveal>
            <span
              className="font-bold tracking-[0.2em] uppercase text-sm block"
              style={{ color: '#A48D78' }}
            >
              The Story
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-[64px] md:text-[86px] leading-[0.9]" style={{ color: '#FAF9F6' }}>
              Our Riverside Origin
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
              style={{ color: 'rgba(203, 185, 164, 0.85)' }}
            >
              A café built for writers, designers, and night thinkers—where house music meets hand-crafted coffee.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* Story Text */}
        <div>
          <Reveal>
            {about?.body ? (
              <PT body={about.body} />
            ) : (
              <div className="prose prose-xl mx-auto font-light" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
                <p className="text-lg md:text-xl first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
                  It started with a simple observation: Riverside needed a place that felt different.
                  Not a quick stop for caffeine, but a destination. A place where the music wasn't an afterthought,
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

        {/* Two Column Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal delay={100}>
            <div className="p-8 shadow-sm h-full" style={{ backgroundColor: '#FFFFFF', borderTop: '4px solid #A48D78' }}>
              <h3 className="font-serif text-2xl md:text-3xl mb-4" style={{ color: '#2C2420' }}>The Coffee</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                We partner with sustainable, direct-trade roasters who care about the farmers as much as the bean.
                Our espresso is dialed in every morning, ensuring the perfect extraction ratio.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="p-8 shadow-sm h-full" style={{ backgroundColor: '#FFFFFF', borderTop: '4px solid #2C2420' }}>
              <h3 className="font-serif text-2xl md:text-3xl mb-4" style={{ color: '#2C2420' }}>The Music</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                You won't hear Top 40 hits here. We curate daily playlists of deep house, neo-soul, and lo-fi beats
                that provide the perfect backdrop for focus and flow.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Commitments & Craft */}
        <section
          data-section="Commitments & Craft"
          className="py-12 md:py-16"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-2 md:px-0">
            <Reveal delay={100}>
              <div className="order-2 md:order-1 relative">
                <div className="aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src="/unsplash/placeholder-interior-shop.png"
                    alt="Cafe interior"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>
                <div
                  className="absolute -bottom-6 right-4 md:right-0 bg-[#A48D78] text-cafe-white px-6 py-4 rounded-md shadow-xl flex flex-col items-center"
                  style={{ minWidth: "160px" }}
                >
                  <span className="font-serif text-3xl leading-none text-white">2025</span>
                  <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.9)" }}>
                    Established
                  </span>
                </div>
              </div>
            </Reveal>
            <div className="order-1 md:order-2 space-y-12">
              <Reveal delay={150}>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-cafe-black mb-4 flex items-center gap-3">
                    <MapPin style={{ color: "#A48D78" }} /> Our Riverside Commitment
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(44, 36, 32, 0.75)" }}>
                    Located at University Ave & Orange St, we are positioned to be a hub for students and creatives. We believe in the potential of this city.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={230}>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-cafe-black mb-4 flex items-center gap-3">
                    <Heart style={{ color: "#A48D78" }} /> The Craft &amp; The Rhythm
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(44, 36, 32, 0.75)" }}>
                    From ethical sourcing to our state-of-the-art equipment, we treat every step of the brewing process with respect. It is not just coffee; it is a ritual.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* What We're Building - Sneak Peek Gallery */}
      <section
        data-section="What We're Building"
        className="py-20 w-full overflow-hidden"
        style={{ backgroundColor: "#F4F1EA", color: "#2C2420" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ color: "#2C2420" }}>
                {about?.valuesHeading || "What We're Building"}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg md:text-xl font-light max-w-2xl mx-auto" style={{ color: "rgba(44,36,32,0.7)" }}>
                A behind-the-scenes look at how we're crafting Riverside's creative coffee hub.
              </p>
            </Reveal>
          </div>

          {/* Bento Grid Gallery */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-12">
            {/* Large Feature - Equipment */}
            <Reveal delay={150} className="col-span-12 md:col-span-7 relative group">
              <div className="relative aspect-[16/10] md:aspect-[16/11] rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/unsplash/placeholder-interior-shop.png"
                  alt="Espresso machine setup"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {/* Sticky Note Caption */}
                <div
                  className="absolute bottom-6 left-6 bg-[#FFF9C4] p-4 shadow-xl transform -rotate-2 max-w-xs"
                  style={{ fontFamily: "var(--font-handwritten)" }}
                >
                  <p className="text-lg md:text-xl text-gray-800 leading-snug">
                    Our espresso station coming together. Italian machine, Riverside soul ☕
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Timeline Card */}
            <Reveal delay={200} className="col-span-12 md:col-span-5 relative">
              <div
                className="h-full p-8 rounded-2xl shadow-lg flex flex-col justify-center"
                style={{ backgroundColor: "#2C2420", color: "#FAF9F6" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles style={{ color: "#A48D78" }} size={28} />
                  <h3 className="font-serif text-3xl" style={{ color: "#FAF9F6" }}>Opening 2026</h3>
                </div>
                <div className="space-y-4 text-base md:text-lg" style={{ color: "rgba(250, 249, 246, 0.85)" }}>
                  <p className="flex items-start gap-2">
                    <span className="text-cafe-tan font-bold">→</span>
                    Construction wrapping this winter
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cafe-tan font-bold">→</span>
                    First pours early spring
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-cafe-tan font-bold">→</span>
                    Live music by summer
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Small Image - Detail Shot */}
            <Reveal delay={250} className="col-span-6 md:col-span-4 relative group">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/unsplash/tnc-placeholder-philosophy-1.png"
                  alt="Coffee detail"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
                {/* Small sticky note */}
                <div
                  className="absolute top-4 right-4 bg-[#FFCCBC] p-3 shadow-lg transform rotate-3 text-sm"
                  style={{ fontFamily: "var(--font-handwritten)" }}
                >
                  <p className="text-gray-800">Dialing in perfection ✨</p>
                </div>
              </div>
            </Reveal>

            {/* Quote Card */}
            <Reveal delay={280} className="col-span-6 md:col-span-4 relative">
              <div
                className="h-full p-6 rounded-2xl shadow-lg flex items-center justify-center text-center"
                style={{ backgroundColor: "#FFFFFF", border: "2px solid #A48D78" }}
              >
                <div>
                  <Music style={{ color: "#A48D78", margin: "0 auto 12px" }} size={32} />
                  <p className="font-serif text-xl md:text-2xl italic leading-snug" style={{ color: "#2C2420" }}>
                    "House music + hand-crafted coffee = our vibe"
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Medium Image - Space/Seating */}
            <Reveal delay={310} className="col-span-12 md:col-span-4 relative group">
              <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/unsplash/tnc-placeholder-philosophy-2.png"
                  alt="Cafe seating area"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 25vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                {/* Sticky note */}
                <div
                  className="absolute bottom-4 left-4 bg-[#C5E1A5] p-3 shadow-lg transform -rotate-1 max-w-[200px]"
                  style={{ fontFamily: "var(--font-handwritten)" }}
                >
                  <p className="text-base text-gray-800">
                    Cozy corners for the creatives 📝
                  </p>
                </div>
              </div>
            </Reveal>

            {/* The Promise Card */}
            <Reveal delay={340} className="col-span-12 md:col-span-8 relative">
              <div
                className="h-full p-8 md:p-10 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: "#A48D78",
                  backgroundImage: "linear-gradient(135deg, #A48D78 0%, #8B7355 100%)"
                }}
              >
                <h3 className="font-serif text-3xl md:text-4xl mb-6 text-white">
                  Our Promise to Riverside
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-white/90">
                  <div className="flex gap-3">
                    <Coffee className="flex-shrink-0 mt-1" size={20} />
                    <p className="text-base md:text-lg">Ethical sourcing, perfect pours, every time</p>
                  </div>
                  <div className="flex gap-3">
                    <Music className="flex-shrink-0 mt-1" size={20} />
                    <p className="text-base md:text-lg">Curated soundscapes for focus and flow</p>
                  </div>
                  <div className="flex gap-3">
                    <BookOpen className="flex-shrink-0 mt-1" size={20} />
                    <p className="text-base md:text-lg">A space that welcomes you to linger</p>
                  </div>
                  <div className="flex gap-3">
                    <Heart className="flex-shrink-0 mt-1" size={20} />
                    <p className="text-base md:text-lg">Local artists, rotating features, community first</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom CTA */}
          <Reveal delay={400}>
            <div className="text-center">
              <p className="text-lg md:text-xl mb-6" style={{ color: "rgba(44,36,32,0.75)" }}>
                Want to follow the journey?
              </p>
              <a
                href="#newsletter"
                className="inline-block px-8 py-3 rounded-full font-medium text-white transition-all hover:scale-105"
                style={{ backgroundColor: "#2C2420" }}
              >
                Join Our Newsletter
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OPTION 2: Three Promises - Alternative Design */}
      <section
        data-section="Three Promises Alternative"
        className="py-24 w-full"
        style={{ backgroundColor: "#2C2420", color: "#FAF9F6" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl mb-6" style={{ color: "#FAF9F6" }}>
                Our Three Promises
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto" style={{ color: "rgba(164, 141, 120, 0.9)" }}>
                What you can expect from us, every single visit.
              </p>
            </Reveal>
          </div>

          {/* Promise 1: The Coffee */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal delay={150} className="order-2 md:order-1">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-1.png"
                    alt="Exceptional coffee"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2C2420]/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#A48D78" }}>
                      <Coffee className="text-white" size={32} />
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200} className="order-1 md:order-2">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase" style={{ backgroundColor: "rgba(164, 141, 120, 0.15)", color: "#A48D78" }}>
                    Promise 01
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#FAF9F6" }}>
                    The Coffee Will Be Exceptional
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(250, 249, 246, 0.75)" }}>
                    We source directly from farmers who care about sustainability. Every morning, we dial in our espresso twice—once before opening, once mid-shift. Your latte isn't just a drink; it's a commitment to craft.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Single-origin beans
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Twice-daily dial-ins
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Perfect extraction
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Promise 2: The Vibe */}
          <div className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal delay={250}>
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase" style={{ backgroundColor: "rgba(164, 141, 120, 0.15)", color: "#A48D78" }}>
                    Promise 02
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#FAF9F6" }}>
                    The Vibe Will Be Curated
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(250, 249, 246, 0.75)" }}>
                    No generic playlists. We hand-pick every track—deep house, neo-soul, lo-fi beats—to create an atmosphere that helps you focus, create, or just vibe. Plus, rotating art from local Riverside creatives on our walls.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Curated playlists
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Local artist features
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Creative energy
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/unsplash/placeholder-interior-shop.png"
                    alt="Curated atmosphere"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#2C2420]/60 to-transparent"></div>
                  <div className="absolute bottom-8 right-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#A48D78" }}>
                      <Music className="text-white" size={32} />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Promise 3: You'll Want to Stay */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal delay={350} className="order-2 md:order-1">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-2.png"
                    alt="Comfortable seating"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2C2420]/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#A48D78" }}>
                      <Heart className="text-white" size={32} />
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={400} className="order-1 md:order-2">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase" style={{ backgroundColor: "rgba(164, 141, 120, 0.15)", color: "#A48D78" }}>
                    Promise 03
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#FAF9F6" }}>
                    You'll Want to Stay
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(250, 249, 246, 0.75)" }}>
                    Comfortable seating, plenty of outlets, fast WiFi, and natural light. Whether you're here for 20 minutes or 2 hours, you're welcome. We built this space for thinkers, makers, and anyone who needs a place to just *be*.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      All-day seating
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Power + WiFi
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)", color: "#CBB9A4" }}>
                      Natural light
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom Quote */}
          <Reveal delay={450}>
            <div className="text-center pt-12 border-t" style={{ borderColor: "rgba(164, 141, 120, 0.2)" }}>
              <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed max-w-3xl mx-auto" style={{ color: "#A48D78" }}>
                "We're not just opening a coffee shop. We're creating a third place—somewhere between home and work where creativity happens."
              </blockquote>
              <footer className="mt-6 text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(250, 249, 246, 0.6)" }}>
                — The Founders
              </footer>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OPTION 1: Visual Timeline - Documentary Journey */}
      <section
        data-section="Visual Timeline Alternative"
        className="py-24 w-full relative overflow-hidden"
        style={{ backgroundColor: "#EDE7D8" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl mb-6" style={{ color: "#2C2420" }}>
                The Journey to Opening
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto" style={{ color: "rgba(44, 36, 32, 0.7)" }}>
                From concept to first pour—follow along as we build Riverside's creative coffee hub.
              </p>
            </Reveal>
          </div>

          {/* Progress Bar */}
          <Reveal delay={150}>
            <div className="mb-20 max-w-4xl mx-auto">
              <div className="relative h-2 rounded-full" style={{ backgroundColor: "rgba(44, 36, 32, 0.1)" }}>
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                  style={{
                    width: "75%",
                    background: "linear-gradient(90deg, #A48D78 0%, #8B7355 100%)"
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-4 text-sm font-medium" style={{ color: "#A48D78" }}>
                <span>Concept</span>
                <span className="font-bold">75% Complete</span>
                <span>Grand Opening</span>
              </div>
            </div>
          </Reveal>

          {/* Timeline Items */}
          <div className="space-y-16">
            {/* Timeline 1: Fall 2024 - The Concept */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Reveal delay={200}>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-1.png"
                    alt="Concept planning"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  {/* Handwritten overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p
                      className="text-white text-2xl md:text-3xl leading-tight"
                      style={{ fontFamily: "var(--font-handwritten)" }}
                    >
                      Where it all started ✨
                    </p>
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: "#A48D78", color: "white" }}>
                    Fall 2024
                  </div>
                </div>
              </Reveal>
              <Reveal delay={250}>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: "#2C2420" }}>
                    The Concept
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: "rgba(44, 36, 32, 0.75)" }}>
                    Late-night conversations about what Riverside was missing. A space for creators, students, and thinkers. Coffee that respects the craft. Music that sets the mood.
                  </p>
                  <div className="flex items-center gap-2" style={{ color: "#A48D78" }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#A48D78" }}></div>
                    <span className="text-sm font-medium uppercase tracking-wider">Completed</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Timeline 2: Winter 2025 - Building Out */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Reveal delay={300} className="md:order-2">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/unsplash/placeholder-interior-shop.png"
                    alt="Construction phase"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p
                      className="text-white text-2xl md:text-3xl leading-tight"
                      style={{ fontFamily: "var(--font-handwritten)" }}
                    >
                      Walls going up, dreams taking shape 🔨
                    </p>
                  </div>
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: "#A48D78", color: "white" }}>
                    Winter 2025
                  </div>
                </div>
              </Reveal>
              <Reveal delay={350} className="md:order-1">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: "#2C2420" }}>
                    The Build
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: "rgba(44, 36, 32, 0.75)" }}>
                    Construction is in full swing. Custom seating, acoustics designed for focus, lighting that shifts from morning to evening. Every detail matters.
                  </p>
                  <div className="flex items-center gap-2" style={{ color: "#A48D78" }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#A48D78" }}></div>
                    <span className="text-sm font-medium uppercase tracking-wider">In Progress</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Timeline 3: Spring 2026 - First Pour */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Reveal delay={400}>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/unsplash/tnc-placeholder-philosophy-2.png"
                    alt="First pour"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p
                      className="text-white text-2xl md:text-3xl leading-tight"
                      style={{ fontFamily: "var(--font-handwritten)" }}
                    >
                      The first perfect pour ☕
                    </p>
                  </div>
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: "rgba(164, 141, 120, 0.3)", color: "white", border: "2px solid white" }}>
                    Spring 2026
                  </div>
                </div>
              </Reveal>
              <Reveal delay={450}>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: "#2C2420" }}>
                    Grand Opening
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: "rgba(44, 36, 32, 0.75)" }}>
                    Doors open. Music plays. The first espresso shots pull perfectly. This is what we've been working toward—a space that feels like home.
                  </p>
                  <div className="flex items-center gap-2" style={{ color: "rgba(44, 36, 32, 0.4)" }}>
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: "rgba(44, 36, 32, 0.3)" }}></div>
                    <span className="text-sm font-medium uppercase tracking-wider">Coming Soon</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom CTA */}
          <Reveal delay={500}>
            <div className="text-center mt-20 p-10 rounded-2xl" style={{ backgroundColor: "rgba(164, 141, 120, 0.1)" }}>
              <h4 className="font-serif text-2xl md:text-3xl mb-4" style={{ color: "#2C2420" }}>
                Want to follow along?
              </h4>
              <p className="text-lg mb-6" style={{ color: "rgba(44, 36, 32, 0.7)" }}>
                We'll share construction updates, behind-the-scenes moments, and opening announcements.
              </p>
              <a
                href="#newsletter"
                className="inline-block px-8 py-3 rounded-full font-medium text-white transition-all hover:scale-105"
                style={{ backgroundColor: "#2C2420" }}
              >
                Join Our Newsletter
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OPTION 4: Opening Countdown - Urgency & Anticipation */}
      <section
        data-section="Opening Countdown Alternative"
        className="py-24 w-full relative overflow-hidden"
        style={{ backgroundColor: "#FAF9F6" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-6" style={{ backgroundColor: "#A48D78", color: "white" }}>
                Opening 2026
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-5xl md:text-7xl mb-6" style={{ color: "#2C2420" }}>
                The Countdown Is On
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto" style={{ color: "rgba(44, 36, 32, 0.65)" }}>
                Every day brings us closer. Here's what's happening right now.
              </p>
            </Reveal>
          </div>

          {/* Countdown Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Reveal delay={200}>
              <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: "#2C2420", color: "#FAF9F6" }}>
                <div className="font-serif text-5xl md:text-6xl mb-2" style={{ color: "#A48D78" }}>
                  ~4
                </div>
                <div className="text-sm uppercase tracking-widest" style={{ color: "rgba(250, 249, 246, 0.7)" }}>
                  Months to Opening
                </div>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: "#A48D78", color: "#FAF9F6" }}>
                <div className="font-serif text-5xl md:text-6xl mb-2" style={{ color: "#FAF9F6" }}>
                  75%
                </div>
                <div className="text-sm uppercase tracking-widest" style={{ color: "rgba(250, 249, 246, 0.9)" }}>
                  Construction Complete
                </div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: "#2C2420", color: "#FAF9F6" }}>
                <div className="font-serif text-5xl md:text-6xl mb-2" style={{ color: "#A48D78" }}>
                  1st
                </div>
                <div className="text-sm uppercase tracking-widest" style={{ color: "rgba(250, 249, 246, 0.7)" }}>
                  Café in Riverside
                </div>
              </div>
            </Reveal>
          </div>

          {/* This Month Spotlight */}
          <Reveal delay={350}>
            <div
              className="p-10 md:p-12 rounded-3xl shadow-xl mb-16 relative overflow-hidden"
              style={{ backgroundColor: "#EDE7D8" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ backgroundColor: "#A48D78" }}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles style={{ color: "#A48D78" }} size={32} />
                  <h3 className="font-serif text-3xl md:text-4xl" style={{ color: "#2C2420" }}>
                    What's Happening This Month
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-lg mb-2" style={{ color: "#2C2420" }}>🔨 Construction Updates</h4>
                    <p style={{ color: "rgba(44, 36, 32, 0.7)" }}>
                      Installing custom seating, finalizing the espresso bar layout, and adding acoustic panels for perfect sound.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-2" style={{ color: "#2C2420" }}>☕ Equipment Arrivals</h4>
                    <p style={{ color: "rgba(44, 36, 32, 0.7)" }}>
                      Our La Marzocco espresso machine ships next week. Custom grinders and brew equipment are on order.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-2" style={{ color: "#2C2420" }}>🎵 Playlist Curation</h4>
                    <p style={{ color: "rgba(44, 36, 32, 0.7)" }}>
                      Building our opening month playlists—deep house, neo-soul, and lo-fi beats that set the perfect vibe.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-2" style={{ color: "#2C2420" }}>🤝 Local Partnerships</h4>
                    <p style={{ color: "rgba(44, 36, 32, 0.7)" }}>
                      Connecting with Riverside bakers, artists, and roasters to build a truly local experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Hero Image */}
          <Reveal delay={400}>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-12">
              <Image
                src="/unsplash/placeholder-interior-shop.png"
                alt="Cafe under construction"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="text-3xl md:text-5xl font-serif leading-tight mb-4">
                  "Every detail, every decision—it all leads to creating a space worth spending time in."
                </p>
                <p className="text-lg" style={{ color: "rgba(250, 249, 246, 0.8)" }}>
                  — The Founders
                </p>
              </div>
            </div>
          </Reveal>

          {/* Join CTA */}
          <Reveal delay={450}>
            <div className="text-center p-12 rounded-3xl relative overflow-hidden" style={{ backgroundColor: "#2C2420", color: "#FAF9F6" }}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: "#A48D78" }}></div>
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-3xl md:text-4xl mb-4">
                  Be Part of the Journey
                </h3>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: "rgba(250, 249, 246, 0.75)" }}>
                  Get exclusive construction updates, opening announcements, and be the first to know when we pour our first cup.
                </p>
                <a
                  href="#newsletter"
                  className="inline-block px-10 py-4 rounded-full font-medium transition-all hover:scale-105 text-lg"
                  style={{ backgroundColor: "#A48D78", color: "white" }}
                >
                  Join the Waitlist
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
