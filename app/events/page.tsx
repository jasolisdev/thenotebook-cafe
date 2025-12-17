/**
 * Events Page - The Notebook Café
 *
 * Redesigned to match the cohesive aesthetic of home, story, and careers pages.
 * Features editorial event listings with alternating backgrounds and floating decorative elements.
 */
import Reveal from "../components/ui/Reveal";
import ParallaxHero from "../components/features/ParallaxHero";
import { Clock, Users, Instagram, Calendar, Heart } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { SEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO.pages.events.title,
  description: SEO.pages.events.description,
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: SEO.pages.events.title,
    description: SEO.pages.events.description,
    url: `${SEO.siteUrl}/events`,
  },
};

const EVENTS = [
  {
    id: "e1",
    title: "Festival of Lights @ Mission Inn",
    date: "Dec 1-31",
    time: "5:00 PM",
    description: "Iconic Riverside tradition with nightly lights, live music, vendors, and photo moments.",
    type: "festival",
    image: "/events/mission-inn-festival-of-lights-entrance.jpg",
    icon: Calendar,
  },
  {
    id: "e2",
    title: "Merry Artswalk: Winter Market",
    date: "Dec 4 & Dec 18",
    time: "5:00–10:00 PM",
    description: "Riverside Arts Council's Merry Artswalk with extended hours, makers, live sets, and warm drinks downtown.",
    type: "community",
    image: "/events/merry-artwalk.jpg",
    imageFit: "contain",
    imageAspect: "aspect-[3/4]",
    link: "https://riversideartscouncil.com/merry-artswalk-1",
    icon: Users,
  },
  {
    id: "e3",
    title: "Reindeer Run (5K/10K/15K/Half)",
    date: "Dec 21",
    time: "7:30 AM",
    description: "Riverside road race at Ryan Bonaminio Park with holiday costumes, medals, and post-run treats.",
    type: "fitness",
    image: "/events/reindeer-run.jpg",
    imageFit: "contain",
    link: "https://www.abetterworldrunning.com/riverside-12-21-25-riverside",
    icon: Users,
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cafe-mist)' }}>
      {/* Hero Section */}
      <ParallaxHero
        className="parallax-hero--compact"
        contentClassName="parallax-hero__content--compact"
        backgroundImage="/menu/tnc-menu-banner.webp"
      >
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 px-6">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar size={28} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
              <span className="font-bold tracking-[0.2em] uppercase text-sm" style={{ color: 'var(--cafe-tan)' }}>
                Upcoming Events
              </span>
              <Calendar size={28} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-serif text-hero md:text-hero-lg" style={{ color: 'var(--cafe-cream)' }}>
              Cozy Holiday<br />
              <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Nights</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-cream-rgb), 0.82)' }}>
              Mark your calendar for intimate gatherings, creative workshops, and seasonal celebrations happening around Riverside this December.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex items-center justify-center gap-6 pt-6">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgba(var(--cafe-cream-rgb), 0.78)' }}>
                <Calendar size={18} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                <span>December 2025</span>
              </div>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(var(--cafe-cream-rgb), 0.5)' }}></span>
              <span className="text-sm font-medium" style={{ color: 'rgba(var(--cafe-cream-rgb), 0.78)' }}>
                Free Entry
              </span>
            </div>
          </Reveal>
        </div>
      </ParallaxHero>

      <section
        data-section="Events Listing"
        className="relative py-24 md:py-32"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 md:mb-18">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.24em] font-semibold block mb-4" style={{ color: 'var(--cafe-tan)' }}>
                December Lineup
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95]" style={{ color: 'var(--cafe-black)' }}>
                Gatherings, Markets, Runs, & More
              </h2>
            </Reveal>
          </div>

          <div className="flex flex-col gap-10">
            {EVENTS.map((event, index) => {
              const [month, ...restOfDate] = event.date.split(" ");
              const dayPart = restOfDate.join(" ");
              return (
                <Reveal key={event.id} delay={index * 120}>
                  <article
                    className="group relative overflow-hidden rounded-3xl border flex flex-col lg:grid lg:grid-cols-5"
                    style={{
                      borderColor: 'rgba(var(--cafe-tan-rgb), 0.2)',
                      background: 'linear-gradient(135deg, rgba(250,249,246,0.95), rgba(244,241,234,0.92))',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ backgroundColor: 'var(--cafe-tan)' }} aria-hidden />
                    <div className="absolute -bottom-12 -right-10 w-48 h-48 rounded-full blur-3xl opacity-25" style={{ backgroundColor: 'rgba(var(--cafe-brown-rgb),0.5)' }} aria-hidden />

                    <div className="relative lg:col-span-2 aspect-[4/5] md:aspect-[5/6] lg:aspect-auto min-h-[320px] overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className={`${event.imageFit === "contain" ? "object-contain bg-white" : "object-cover"} transition-transform duration-700 ease-out hover:scale-105`}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/60" />
                      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-3">
                        <span
                          className="px-3 py-2 rounded-md text-[11px] uppercase tracking-[0.2em] font-semibold"
                          style={{
                            backgroundColor: 'rgba(var(--cafe-cream-rgb), 0.9)',
                            color: 'var(--cafe-black)',
                            border: '1px solid rgba(var(--cafe-brown-rgb), 0.1)'
                          }}
                        >
                          {event.type}
                        </span>
                        <span
                          className="px-3 py-2 rounded-md text-[11px] uppercase tracking-[0.2em] font-bold"
                          style={{
                            backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.95)',
                            color: 'white',
                            border: '1px solid rgba(var(--cafe-tan-rgb), 0.3)'
                          }}
                        >
                          {month} {dayPart}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-sm font-medium text-white/90">
                        <span className="flex items-center gap-2">
                          <Clock size={16} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.6} />
                          <span>{event.time}</span>
                        </span>
                        {event.link && (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 underline-offset-4 hover:underline transition"
                            style={{ color: 'var(--cafe-cream)' }}
                          >
                            Details <span aria-hidden>→</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="relative lg:col-span-3 p-6 md:p-8 lg:p-10 flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.14)',
                            border: '1px solid rgba(var(--cafe-tan-rgb), 0.25)'
                          }}
                        >
                          <span className="font-serif text-xl" style={{ color: 'var(--cafe-black)' }}>
                            {month}
                            <br />
                            <span className="text-2xl font-bold" style={{ color: 'var(--cafe-tan)' }}>{dayPart}</span>
                          </span>
                        </div>
                        <div className="flex-1 space-y-4">
                          <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                            {event.title}
                          </h3>
                          <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.82)' }}>
                            {event.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span
                          className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-semibold"
                          style={{
                            backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.12)',
                            color: 'var(--cafe-tan)',
                            border: '1px solid rgba(var(--cafe-tan-rgb), 0.3)'
                          }}
                        >
                          {event.type}
                        </span>
                        <span
                          className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-semibold"
                          style={{
                            backgroundColor: 'rgba(var(--cafe-brown-rgb), 0.06)',
                            color: 'var(--cafe-brown)',
                            border: '1px solid rgba(var(--cafe-brown-rgb), 0.12)'
                          }}
                        >
                          {event.time}
                        </span>
                        {event.link && (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2 transition-colors"
                            style={{
                              backgroundColor: 'rgba(var(--cafe-black-rgb), 0.86)',
                              color: 'white',
                              border: '1px solid rgba(var(--cafe-black-rgb), 0.15)'
                            }}
                          >
                            Details
                            <span aria-hidden>→</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stay Updated - Instagram CTA */}
      <section
        data-section="Stay Updated"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-black)', color: 'var(--cafe-white)' }}
      >
        <div className="section-deco" style={{ top: '12%', left: '10%', animationDuration: '11s', filter: 'invert(1) opacity(0.15)' }} aria-hidden="true">
          <Instagram strokeWidth={1.4} />
        </div>
        <div className="section-deco" style={{ bottom: '10%', right: '12%', animationDuration: '12s', animationDelay: '0.6s', filter: 'invert(1) opacity(0.15)' }} aria-hidden="true">
          <Heart strokeWidth={1.4} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="w-16 h-[2px] mx-auto mb-8" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8"
              style={{ color: 'var(--cafe-white)' }}
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
              style={{ color: 'rgba(var(--cafe-cream-rgb), 0.8)' }}
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
                backgroundColor: 'var(--cafe-white)',
                color: 'var(--cafe-black)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                borderRadius: '4px'
              }}
            >
              <Instagram size={20} strokeWidth={2} />
              <span>@thenotebookcafellc</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
