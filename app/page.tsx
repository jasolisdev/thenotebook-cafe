/**
 * Homepage - The Notebook Café
 *
 * Redesigned homepage featuring new hero, sanctuary section, vibe carousel, and newsletter.
 */
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import NewsletterForm from "./components/features/NewsLetterForm";
import SiteFooter from "./components/layout/SiteFooter";
import Reveal from "./components/ui/Reveal";
import HeroButtons from "./components/ui/HeroButtons";
import StoryLink from "./components/ui/StoryLink";
import { Coffee, Music, Sparkles, Mail, Wifi, PlugZap, Armchair } from "lucide-react";
import AtmosphereStrip from "./components/AtmosphereStrip";

const vibeImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"
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
    <main className="overflow-hidden" style={{ backgroundColor: '#FAF9F6', color: '#4A3B32' }}>
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center px-6 pt-0 md:pt-32 pb-[120px]"
        style={{ backgroundColor: '#F4F1EA' }}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto hero-content">
          <Reveal>
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="The Notebook Café"
                width={210}
                height={210}
                className="w-auto md:h-32 lg:h-36"
                style={{ height: "106px" }}
                priority
              />
            </div>
          </Reveal>
          <Reveal>
            <span className="inline-block text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium" style={{ color: '#A48D78' }}>Est. Riverside 2024</span>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8" style={{ color: '#2C2420' }}>
              Where Every Cup <br />
              <span className="italic" style={{ color: '#A48D78' }}>Tells a Story</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
              Come for the coffee, stay for the vibe.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <HeroButtons />
          </Reveal>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-1/4 left-10 md:left-20 opacity-20 pointer-events-none" style={{ animation: 'float 8s ease-in-out infinite' }}>
          <Coffee size={48} className="text-cafe-tan" />
        </div>
        <div className="absolute bottom-1/4 right-10 md:right-20 opacity-20 pointer-events-none" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Music size={40} className="text-cafe-tan" />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-20 px-6" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 overflow-visible">
          {vibeImages.slice(0, 3).map((src, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div
                className={`image-card gallery-spread-initial gallery-spread-animate ${
                  idx === 0 ? "transform-01" : idx === 1 ? "transform-02" : "transform-03"
                } gallery-animated-${idx}`}
              >
                <Image
                  src={src}
                  alt={`Notebook atmosphere ${idx + 1}`}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  priority={idx === 0}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Introduction / Sanctuary Section */}
      <section className="pt-0 pb-16 md:py-32 px-6" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative group hidden md:block">
              <div className="absolute -inset-4 rounded-sm transform rotate-3 transition-transform group-hover:rotate-6" style={{ border: '1px solid rgba(164, 141, 120, 0.3)' }}></div>
              <Image
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000"
                alt="Cafe Interior"
                width={1000}
                height={800}
                className="relative rounded-sm shadow-xl grayscale-[20%] contrast-[1.1] w-full h-[500px] object-cover"
              />
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl" style={{ color: '#2C2420' }}>Not Just a Coffee Shop. <br /><span className="italic" style={{ color: '#A48D78' }}>A Sanctuary.</span></h2>
            </Reveal>

            <Reveal delay={300}>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#EDE7D8' }}>
                    <Coffee size={20} style={{ color: '#4A3B32' }} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1" style={{ color: '#2C2420' }}>Craft Espresso</h4>
                    <p className="font-light" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>Roasted locally, extracted with precision. We respect the bean.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#EDE7D8' }}>
                    <Music size={20} style={{ color: '#4A3B32' }} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1" style={{ color: '#2C2420' }}>Curated Sound</h4>
                    <p className="font-light" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>Deep house, soul, and lo-fi grooves. No Top 40 here.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#EDE7D8' }}>
                    <Sparkles size={20} style={{ color: '#4A3B32' }} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1" style={{ color: '#2C2420' }}>Creative Community</h4>
                    <p className="font-light" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>A space designed for you to stay, study, and create.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <StoryLink />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Atmosphere  */}
      <section className="py-24 overflow-visible" style={{ backgroundColor: '#2C2420', color: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 mb-10 notched-mobile">
          <Reveal>
            <h2 className="font-serif text-4xl mb-4" style={{ color: '#FFFFFF' }}>The Atmosphere</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg md:text-xl font-light max-w-5xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
              A calm, warm space designed for focus, comfort and creativity.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-6 md:pb-8">
            <div className="flex items-center gap-3 justify-start rounded-sm px-4 py-3">
              <span
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <Wifi size={20} className="text-white" />
              </span>
              <span className="uppercase tracking-widest text-xs font-semibold" style={{ color: '#FFFFFF' }}>Fast &amp; stable Wi-Fi</span>
            </div>
            <div className="flex items-center gap-3 justify-start rounded-sm px-4 py-3">
              <span
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <PlugZap size={20} className="text-white" />
              </span>
              <span className="uppercase tracking-widest text-xs font-semibold" style={{ color: '#FFFFFF' }}>Plenty of outlets</span>
            </div>
            <div className="flex items-center gap-3 justify-start rounded-sm px-4 py-3">
              <span
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <Armchair size={20} className="text-white" />
              </span>
              <span className="uppercase tracking-widest text-xs font-semibold" style={{ color: '#FFFFFF' }}>Cozy seating</span>
            </div>
            <div className="flex items-center gap-3 justify-start rounded-sm px-4 py-3">
              <span
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <Music size={20} className="text-white" />
              </span>
              <span className="uppercase tracking-widest text-xs font-semibold" style={{ color: '#FFFFFF' }}>Ambient house music</span>
            </div>
          </div>
        </div>

        <AtmosphereStrip images={vibeImages} />
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <Mail className="mx-auto mb-6" size={32} style={{ color: '#A48D78' }} />
            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: '#2C2420' }}>Join the Inner Circle</h2>
            <p className="mb-8 font-light" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>Be the first to know about our grand opening, special tastings, and secret menu items.</p>

            <NewsletterForm source="homepage" />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
