/**
 * Story Page - The Notebook Café
 *
 * Redesigned about page featuring the café's story, values, and mission.
 */
import { client } from "@/sanity/lib/client";
import SiteFooter from "../components/layout/SiteFooter";
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
      <div className="relative py-24 md:py-28 px-6" style={{ backgroundColor: '#F4F1EA' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl mb-6" style={{ color: '#2C2420' }}>Our Story</h1>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#A48D78' }}></div>
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
                  <span className="font-serif text-3xl leading-none text-white">2024</span>
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

      {/* What We're Building - Full Width Section */}
      <section
        data-section="What We're Building"
        className="py-20 w-full"
        style={{ backgroundColor: "#FAF9F6", color: "#2C2420" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-12" style={{ color: "#2C2420" }}>
            {about?.valuesHeading || "What We're Building"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 text-left">
            {bullets.map((val: string, i: number) => {
              const Icon = bulletIcons[i % bulletIcons.length];
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="flex gap-3 items-start">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(164, 141, 120, 0.1)",
                        border: "1px solid rgba(164, 141, 120, 0.25)",
                        color: "#A48D78",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <p className="text-lg md:text-xl font-light" style={{ color: "rgba(44, 36, 32, 0.8)" }}>
                      {val}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={300}>
            <div
              className="mt-16 p-8 rounded-lg relative"
              style={{ border: "1px solid rgba(164, 141, 120, 0.3)" }}
            >
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-4"
                style={{ backgroundColor: "#FAF9F6", color: "#A48D78" }}
              >
                <Music size={32} />
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed" style={{ color: "#2C2420" }}>
                "Riverside is growing. We're here to fuel the creativity of this city."
              </blockquote>
              <footer
                className="mt-4 text-sm font-bold tracking-widest uppercase"
                style={{ color: "#A48D78" }}
              >
                — The Founders
              </footer>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
