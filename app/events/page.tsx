import Reveal from "../components/ui/Reveal";
import { Clock, Music, Coffee, User } from "lucide-react";

const EVENTS = [
  {
    id: "e1",
    title: "Sunday Deep House Sessions",
    date: "Oct 12",
    time: "7:00 PM",
    description: "Resident DJ Marcus spinning vinyl only. Deep, soulful grooves.",
    type: "music",
  },
  {
    id: "e2",
    title: "Writers' Block: Open Mic",
    date: "Oct 15",
    time: "6:00 PM",
    description: "Poetry, short stories, and acoustic sets. Sign up at the door.",
    type: "community",
  },
  {
    id: "e3",
    title: "Latte Art Throwdown",
    date: "Oct 20",
    time: "10:00 AM",
    description: "Local baristas compete. Free entry for spectators.",
    type: "community",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF9F6" }}>
      {/* Hero */}
      <section
        data-section="Events Hero"
        className="relative pt-28 pb-28 md:pt-32 md:pb-32 overflow-hidden text-center px-6"
        style={{ backgroundColor: "#2C2420", color: "#FAF9F6" }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute right-0 top-0 w-96 h-96 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: "#A48D78" }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <Reveal>
            <span
              className="font-bold tracking-[0.2em] uppercase text-sm block"
              style={{ color: "#A48D78" }}
            >
              Events
            </span>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="font-serif text-[64px] md:text-[86px] leading-[0.9]" style={{ color: "#FAF9F6" }}>
              Nights To Remember
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: "rgba(203, 185, 164, 0.85)" }}>
              Deep house sets, open mics, and café takeovers—bookmark what resonates and meet your people.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Events List */}
      <section
        data-section="Events List"
        className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-8">
          {EVENTS.map((event, index) => (
            <Reveal key={event.id} delay={index * 120}>
              <div
                className="bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow"
                style={{ border: "1px solid rgba(203, 185, 164, 0.25)" }}
              >
                <div
                  className="p-6 md:w-48 flex flex-col items-center justify-center text-center shrink-0"
                  style={{ backgroundColor: "rgba(203, 185, 164, 0.72)" }}
                >
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#2C2420" }}>
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="font-serif text-4xl" style={{ color: "#2C2420" }}>
                    {event.date.split(" ")[1]}
                  </span>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center" style={{ color: "#4A3B32" }}>
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-2" style={{ color: "rgba(74, 59, 50, 0.6)" }}>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {event.time}
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-wider font-bold" style={{ color: "#A48D78" }}>
                      {event.type === "music" ? (
                        <Music size={14} />
                      ) : event.type === "coffee" ? (
                        <Coffee size={14} />
                      ) : (
                        <User size={14} />
                      )}
                      {event.type}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mb-3" style={{ color: "#2C2420" }}>
                    {event.title}
                  </h3>
                  <p className="mb-6" style={{ color: "rgba(44, 36, 32, 0.7)" }}>
                    {event.description}
                  </p>

                  <div>
                    <button
                      className="px-6 py-2 text-xs font-bold tracking-widest uppercase transition-colors rounded-sm"
                      style={{
                        border: "1px solid #2C2420",
                        color: "#2C2420",
                      }}
                    >
                      RSVP
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-16 text-cafe-brown/60 text-sm">
          More events announced weekly. Follow our Instagram for updates.
        </div>
      </section>
    </main>
  );
}
