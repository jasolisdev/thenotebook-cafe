/**
 * Events Page - The Notebook Café
 *
 * Editorial Noir aesthetic - High-fashion editorial meets coffee culture.
 * Split-screen layouts, dramatic negative space, magazine sophistication.
 */
import Reveal from "../components/ui/Reveal";
import NewsletterForm from "../components/features/NewsLetterForm";
import { Clock, Music, Coffee, Users, Instagram, Calendar } from "lucide-react";
import Image from "next/image";

const EVENTS = [
  {
    id: "e1",
    title: "Holiday Jazz & Mulled Cider",
    date: "Dec 8",
    time: "7:00 PM",
    description: "Live trio with brushed drums, brass, and cozy cider on the bar.",
    type: "music",
    icon: Music,
  },
  {
    id: "e2",
    title: "Gingerbread Latte Throwdown",
    date: "Dec 12",
    time: "5:30 PM",
    description: "Baristas face off with spiced latte art. Free samples for the crowd.",
    type: "coffee",
    icon: Coffee,
  },
  {
    id: "e3",
    title: "Gift Wrap & Write Night",
    date: "Dec 18",
    time: "6:00 PM",
    description: "Bring gifts; we supply paper, ribbons, cards, and quiet carols.",
    type: "community",
    icon: Users,
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Editorial Split-Screen Hero - Text First */}
      <section
        data-section="Events Hero"
        className="relative min-h-screen grid lg:grid-cols-2"
      >
        {/* Left - Content Panel (Light) - First on mobile */}
        <div className="relative bg-white flex items-center p-10 md:p-16 lg:p-24">
          <div className="w-full max-w-xl">
            <Reveal>
              <div className="mb-12">
                <span
                  className="text-xs uppercase tracking-[0.3em] font-bold mb-6 block"
                  style={{ color: '#A48D78' }}
                >
                  Upcoming
                </span>
                <h1
                  className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-8"
                  style={{ color: '#2C2420' }}
                >
                  Cozy Holiday{" "}
                  <span className="italic" style={{ color: '#A48D78' }}>
                    Nights
                  </span>
                </h1>
                <p
                  className="text-xl md:text-2xl font-light leading-relaxed"
                  style={{ color: 'rgba(74, 59, 50, 0.7)' }}
                >
                  Mark your calendar for intimate gatherings, creative workshops, and seasonal celebrations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex items-center gap-8 pt-8 border-t" style={{ borderColor: 'rgba(164, 141, 120, 0.2)' }}>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                  <Calendar size={18} style={{ color: '#A48D78' }} strokeWidth={1.5} />
                  <span>December 2025</span>
                </div>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(74, 59, 50, 0.3)' }}></span>
                <span className="text-sm font-medium" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                  Free Entry
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right - Image Panel (Dark) */}
        <div className="relative min-h-[60vh] lg:min-h-screen bg-black overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200"
            alt="Live music and coffee atmosphere"
            fill
            className="object-cover opacity-70"
            priority
          />

          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />

          {/* Floating text overlay - Editorial style */}
          <div className="absolute inset-0 flex items-end p-10 md:p-16 lg:p-20">
            <Reveal>
              <div className="text-white">
                <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: '#A48D78' }}></div>
                <p className="font-serif text-2xl md:text-3xl italic leading-relaxed max-w-md">
                  "Mulled spices, candlelight jazz, and winter workshops"
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Events - Editorial List Layout */}
      <section
        data-section="Events List"
        className="relative"
      >
        {EVENTS.map((event, index) => {
          const Icon = event.icon;
          const isDark = index % 2 === 1;

          return (
            <div
              key={event.id}
              className="relative py-24 md:py-32"
              style={{ backgroundColor: isDark ? '#2C2420' : '#FFFFFF' }}
            >
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Left - Event Details */}
                  <Reveal>
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      {/* Date Badge */}
                      <div className="flex items-center gap-4 mb-8">
                        <div
                          className="w-14 h-14 rounded-sm flex items-center justify-center"
                          style={{
                            backgroundColor: isDark ? 'rgba(164, 141, 120, 0.15)' : 'rgba(164, 141, 120, 0.08)',
                          }}
                        >
                          <Icon size={24} style={{ color: '#A48D78' }} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div
                            className="text-xs uppercase tracking-[0.25em] font-bold mb-1"
                            style={{ color: isDark ? 'rgba(203, 185, 164, 0.6)' : 'rgba(74, 59, 50, 0.5)' }}
                          >
                            {event.date.split(" ")[0]}
                          </div>
                          <div
                            className="font-serif text-4xl"
                            style={{ color: isDark ? '#FFFFFF' : '#2C2420' }}
                          >
                            {event.date.split(" ")[1]}
                          </div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="mb-8">
                        <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: '#A48D78' }}></div>
                        <h2
                          className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6"
                          style={{ color: isDark ? '#FFFFFF' : '#2C2420' }}
                        >
                          {event.title}
                        </h2>
                        <p
                          className="text-xl md:text-2xl font-light leading-relaxed max-w-lg"
                          style={{ color: isDark ? 'rgba(203, 185, 164, 0.8)' : 'rgba(74, 59, 50, 0.7)' }}
                        >
                          {event.description}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock size={18} style={{ color: '#A48D78' }} strokeWidth={1.5} />
                          <span
                            className="text-sm font-medium"
                            style={{ color: isDark ? 'rgba(203, 185, 164, 0.7)' : 'rgba(74, 59, 50, 0.6)' }}
                          >
                            {event.time}
                          </span>
                        </div>
                        <span
                          className="px-3 py-1 rounded-sm text-xs uppercase tracking-wider font-bold"
                          style={{
                            backgroundColor: isDark ? 'rgba(164, 141, 120, 0.15)' : 'rgba(164, 141, 120, 0.08)',
                            color: '#A48D78'
                          }}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </Reveal>

                  {/* Right - Image */}
                  <Reveal delay={150}>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <div
                        className="relative w-full aspect-[4/5] overflow-hidden"
                        style={{
                          border: `1px solid ${isDark ? 'rgba(164, 141, 120, 0.2)' : 'rgba(164, 141, 120, 0.15)'}`,
                          boxShadow: isDark ? 'none' : '0 4px 20px rgba(44, 36, 32, 0.08)'
                        }}
                      >
                        <Image
                          src={`https://images.unsplash.com/photo-${
                            index === 0 ? '1514525253161-7a46d19cd819' :
                            index === 1 ? '1495474472287-4d71bcdd2085' :
                            '1544378730-56c8f96d5e7a'
                          }?auto=format&fit=crop&q=80&w=800`}
                          alt={event.title}
                          fill
                          className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Stay Updated - High Contrast CTA */}
      <section
        className="relative py-32 md:py-40"
        style={{ backgroundColor: '#2C2420', color: '#FFFFFF' }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="w-16 h-[2px] mx-auto mb-8" style={{ backgroundColor: '#A48D78' }}></div>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8"
              style={{ color: '#FFFFFF' }}
            >
              Stay in the{" "}
              <span className="italic" style={{ color: '#A48D78' }}>
                Loop
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto"
              style={{ color: 'rgba(203, 185, 164, 0.8)' }}
            >
              New events announced weekly. Follow us for updates, behind-the-scenes moments, and spontaneous gatherings.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <a
              href="https://instagram.com/thenotebookcafellc"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-12 py-4 md:py-5 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#2C2420',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Instagram size={18} className="md:hidden" strokeWidth={2} />
              <Instagram size={20} className="hidden md:block" strokeWidth={2} />
              <span className="truncate">@thenotebookcafellc</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 shrink-0">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Newsletter Section - Light Footer */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: '#FAF9F6' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Editorial Heading */}
            <Reveal>
              <div>
                <div className="w-12 h-[2px] mb-8" style={{ backgroundColor: '#A48D78' }}></div>
                <h3
                  className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6"
                  style={{ color: '#2C2420' }}
                >
                  Join Our{" "}
                  <span className="italic" style={{ color: '#A48D78' }}>
                    Community
                  </span>
                </h3>
                <p
                  className="text-lg md:text-xl font-light leading-relaxed"
                  style={{ color: 'rgba(74, 59, 50, 0.7)' }}
                >
                  Event invites, seasonal menu previews, and opening announcements delivered to your inbox.
                </p>
              </div>
            </Reveal>

            {/* Right - Newsletter Form */}
            <Reveal delay={150}>
              <div
                className="p-10 md:p-12 bg-white"
                style={{
                  border: '1px solid rgba(164, 141, 120, 0.15)',
                  boxShadow: '0 4px 20px rgba(44, 36, 32, 0.06)'
                }}
              >
                <NewsletterForm source="events-page" />
                <p className="mt-6 text-xs text-center font-light" style={{ color: 'rgba(74, 59, 50, 0.5)' }}>
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
