/**
 * Events Page - The Notebook Café
 *
 * Redesigned to match the cohesive aesthetic of home, story, and careers pages.
 * Features editorial event listings with alternating backgrounds and floating decorative elements.
 */
import Reveal from "../components/ui/Reveal";
import NewsletterForm from "../components/features/NewsLetterForm";
import { Clock, Users, Instagram, Calendar, Coffee, Music, Sparkles, Heart } from "lucide-react";
import Image from "next/image";

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
      <section
        data-section="Events Hero"
        className="relative pt-28 pb-28 md:pt-32 md:pb-32 overflow-hidden text-center px-6"
        style={{ background: 'var(--hero-gradient-espresso)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'var(--hero-espresso-overlay)',
            opacity: 0.78,
            mixBlendMode: 'screen'
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
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
            <h1 className="font-serif text-[56px] md:text-[86px] leading-[0.9]" style={{ color: 'var(--cafe-cream)' }}>
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
      </section>

      {/* Events Listing - Editorial Grid with Alternating Backgrounds */}
      {EVENTS.map((event, index) => {
        const Icon = event.icon;
        const isEven = index % 2 === 0;
        const [month, ...restOfDate] = event.date.split(" ");
        const dayPart = restOfDate.join(" ");

        return (
          <section
            key={event.id}
            data-section={`Event ${index + 1}`}
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ backgroundColor: 'var(--cafe-mist)' }}
          >
            {/* Floating Decorative Icons */}
            <div
              className="section-deco"
              style={{
                top: '10%',
                left: isEven ? '8%' : 'auto',
                right: isEven ? 'auto' : '8%',
                animationDuration: '12s',
                animationDelay: `${index * 0.3}s`
              }}
              aria-hidden="true"
            >
              <Coffee strokeWidth={1.4} />
            </div>
            <div
              className="section-deco section-deco-dark"
              style={{
                bottom: '10%',
                right: isEven ? '10%' : 'auto',
                left: isEven ? 'auto' : '10%',
                animationDuration: '11s',
                animationDelay: `${index * 0.5}s`
              }}
              aria-hidden="true"
            >
              <Sparkles strokeWidth={1.6} />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Event Details */}
                <Reveal>
                  <div className={isEven ? "" : "lg:order-2"}>
                    {/* Date Badge */}
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className="w-14 h-14 rounded-sm flex items-center justify-center"
                        style={{
                          backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.12)',
                          border: '1px solid rgba(var(--cafe-tan-rgb), 0.25)'
                        }}
                      >
                        <Icon size={24} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div
                          className="text-xs uppercase tracking-[0.25em] font-bold mb-1"
                          style={{ color: 'rgba(var(--cafe-brown-rgb), 0.6)' }}
                        >
                          {month}
                        </div>
                        <div
                          className="font-serif text-4xl"
                          style={{ color: 'var(--cafe-black)' }}
                        >
                          {dayPart}
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-8">
                      <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
                      <h2
                        className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6"
                        style={{ color: 'var(--cafe-black)' }}
                      >
                        {event.title}
                      </h2>
                      <p
                        className="text-xl md:text-2xl font-light leading-relaxed max-w-lg"
                        style={{ color: 'rgba(var(--cafe-brown-rgb), 0.8)' }}
                      >
                        {event.description}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Clock size={18} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'rgba(var(--cafe-brown-rgb), 0.7)' }}
                        >
                          {event.time}
                        </span>
                      </div>
                      <span
                        className="px-3 py-1 rounded-sm text-xs uppercase tracking-wider font-bold"
                        style={{
                          backgroundColor: 'rgba(var(--cafe-tan-rgb), 0.1)',
                          color: 'var(--cafe-tan)',
                          border: '1px solid rgba(var(--cafe-tan-rgb), 0.25)'
                        }}
                      >
                        {event.type}
                      </span>
                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium underline-offset-4 hover:underline transition-all"
                          style={{ color: 'var(--cafe-tan)' }}
                        >
                          More info →
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>

                {/* Event Image */}
                <Reveal delay={150}>
                  <div className={isEven ? "" : "lg:order-1"}>
                    <div
                      className={`relative w-full overflow-hidden rounded-2xl ${
                        event.imageFit === "contain"
                          ? event.imageAspect ?? "aspect-[16/9]"
                          : "aspect-[4/5]"
                      }`}
                      style={{
                        border: '1px solid rgba(var(--cafe-tan-rgb), 0.15)',
                        boxShadow: '0 10px 30px rgba(var(--cafe-black-rgb), 0.08)',
                      }}
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className={`grayscale-[20%] hover:grayscale-0 transition-all duration-700 ${
                          event.imageFit === "contain" ? "object-contain bg-transparent" : "object-cover"
                        }`}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

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

      {/* Newsletter Section */}
      <section
        data-section="Newsletter"
        className="relative py-24 md:py-32 px-6 overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="section-deco" style={{ top: '10%', left: '12%', animationDuration: '11s' }} aria-hidden="true">
          <Calendar strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', right: '14%', animationDuration: '12s', animationDelay: '0.7s' }} aria-hidden="true">
          <Music strokeWidth={1.4} />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Editorial Heading */}
            <Reveal>
              <div className="space-y-6">
                <div className="w-12 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>
                <h3
                  className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95]"
                  style={{ color: 'var(--cafe-black)' }}
                >
                  Join Our{" "}
                  <span className="italic" style={{ color: 'var(--cafe-tan)' }}>
                    Community
                  </span>
                </h3>
                <p
                  className="text-lg md:text-xl font-light leading-relaxed"
                  style={{ color: 'rgba(var(--cafe-brown-rgb), 0.8)' }}
                >
                  Event invites, seasonal menu previews, and opening announcements delivered to your inbox.
                </p>
              </div>
            </Reveal>

            {/* Right - Newsletter Form */}
            <Reveal delay={150}>
              <div
                className="relative p-10 md:p-12 bg-white/80 backdrop-blur shadow-lg"
                style={{
                  border: '1px solid rgba(var(--cafe-tan-rgb), 0.18)',
                  borderRadius: '18px'
                }}
              >
                <div className="space-y-3">
                  <NewsletterForm source="events-page" />
                  <p className="text-xs text-center font-light" style={{ color: 'rgba(var(--cafe-brown-rgb), 0.55)' }}>
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
