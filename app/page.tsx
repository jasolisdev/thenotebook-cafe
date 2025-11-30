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
import { Coffee, Music, Mail, Wifi, PlugZap, Armchair } from "lucide-react";
import AtmosphereStrip from "./components/AtmosphereStrip";
import SignaturePoursGrid from "./components/SignaturePoursGrid";

const vibeImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"
];

const signaturePours = [
  {
    name: "Iced Brown Sugar Oat",
    description: "Caramelized brown sugar layered with velvety oat milk and slow-steeped espresso.",
    image: "/unsplash/hero-iced-coffee-1.png"
  },
  {
    name: "Matcha Cloud",
    description: "Ceremonial grade matcha poured over cold foam for a soft, cloudlike finish.",
    image: "/unsplash/hero-iced-coffee-1.png"
  },
  {
    name: "Classic Cold Brew",
    description: "18-hour brew for a chocolatey, low-acid sip served over crystal-clear ice.",
    image: "/unsplash/hero-iced-coffee-1.png"
  },
  {
    name: "Espresso Tonic",
    description: "Bright espresso lifted by artisanal tonic, citrus oils, and a crack of ice.",
    image: "/unsplash/hero-iced-coffee-1.png"
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
    <main className="overflow-hidden" style={{ backgroundColor: 'var(--cafe-white)', color: 'var(--cafe-brown)' }}>
      {/* Hero Section */}
      <section
        data-section="Hero"
        className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 md:pt-32 pb-[120px]"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
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
            <span className="inline-block text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium" style={{ color: 'var(--cafe-tan)' }}>Est. Riverside 2024</span>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8" style={{ color: 'var(--cafe-black)' }}>
              Where Every Cup <br />
              <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Tells a Story</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.8)' }}>
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

      {/* Signature Pours */}
      <section
        data-section="Signature Pours"
        className="py-24 px-6"
        style={{ backgroundColor: 'var(--cafe-white)' }}
      >
        <div className="max-w-6xl mx-auto">
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
                className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.25em] font-semibold border border-cafe-black rounded-sm transition-all duration-300 hover:bg-cafe-black hover:text-cafe-white"
              >
                View Our Menu
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Low Lights Section */}
      <section
        data-section="Low Lights"
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--cafe-white)' }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
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
            <div className="w-24 h-px bg-cafe-brown/30"></div>
          </div>

          <Reveal delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://fastly.picsum.photos/id/317/600/800.jpg?hmac=FUG5I3XLdVPHF10ynppPLQNZrA-9AKByLVsLLdeEC5k"
                alt="Barista Pouring"
                width={900}
                height={1200}
                className="w-full h-full object-cover rounded-sm translate-y-12 shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                priority
              />
              <Image
                src="https://fastly.picsum.photos/id/454/600/800.jpg?hmac=U5_LTgKSxoPXiJNXT9S1wwsIHNEEc6BuJG0CqBvt4BI"
                alt="Cafe Corner"
                width={900}
                height={1200}
                className="w-full h-full object-cover rounded-sm shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Trinity */}
      <section
        data-section="The Trinity"
        className="py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="hidden md:block mb-10 w-full h-px"
            style={{ background: 'linear-gradient(90deg, rgba(var(--cafe-brown-rgb),0) 0%, rgba(var(--cafe-brown-rgb),0.35) 50%, rgba(var(--cafe-brown-rgb),0) 100%)' }}
          ></div>
          <div className="grid md:grid-cols-3">
            <Reveal>
              <div className="p-10 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: 'var(--cafe-white)', color: 'var(--cafe-tan)', border: '1px solid rgba(var(--cafe-tan-rgb), 0.35)' }}>
                  <Coffee size={28} />
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
                  <Music size={26} />
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
                  <Armchair size={26} />
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
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--cafe-white)' }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
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
          <div className="space-y-8 order-1 lg:order-2">
            <Reveal>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]" style={{ color: 'var(--cafe-black)' }}>
                The Atmosphere,<br />
                Designed for<br />
                <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Focus</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px]" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.78)' }}>
                A sanctuary with warm lighting, deep playlists, and Wi-Fi that never drops. Settle in for an hour or stay all day.
              </p>
            </Reveal>
            <div className="w-24 h-px" style={{ backgroundColor: 'rgba(var(--cafe-brown-rgb), 0.3)' }}></div>
          </div>
        </div>
      </section>

      {/* Atmosphere Images */}
      <section
        data-section="Atmosphere Images"
        className="overflow-visible"
        style={{ backgroundColor: 'var(--cafe-black)' }}
      >
        <AtmosphereStrip images={vibeImages} />
      </section>

      {/* Newsletter */}
      <section
        data-section="Newsletter"
        className="py-24 px-6"
        style={{ backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.1)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <Mail className="mx-auto mb-6" size={32} style={{ color: 'var(--cafe-tan)' }} />
            <h2 className="font-serif text-3xl md:text-4xl mb-4" style={{ color: 'var(--cafe-black)' }}>Join the Inner Circle</h2>
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
