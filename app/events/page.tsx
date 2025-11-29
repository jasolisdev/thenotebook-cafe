/**
 * Events Page - The Notebook Café
 *
 * Redesigned events page with new card layout and date badges.
 */
import SiteFooter from "../components/layout/SiteFooter";
import Reveal from "../components/ui/Reveal";
import { Music, Coffee } from "lucide-react";
import { client } from "@/sanity/lib/client";

// Sample events data - replace with Sanity CMS when schema is created
const EVENTS = [
  { id: '1', date: 'Oct 12', time: '7:00 PM', title: 'Sunday Deep House Sessions', description: 'Resident DJ Marcus spinning vinyl only. Deep, soulful grooves.', type: 'music' },
  { id: '2', date: 'Oct 15', time: '6:00 PM', title: 'Writers\' Block: Open Mic', description: 'Poetry, short stories, and acoustic sets. Sign up at the door.', type: 'community' },
  { id: '3', date: 'Oct 20', time: '10:00 AM', title: 'Latte Art Throwdown', description: 'Local baristas compete. Free entry for spectators.', type: 'community' },
];

async function getData() {
  const settings = await client.fetch(
    `*[_type=="settings"][0]{ social{ instagram, spotify }, address }`,
  );
  return { settings };
}

export default async function EventsPage() {
  const { settings } = await getData();

  return (
    <main className="min-h-screen pb-20" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="py-24 md:py-32 px-6 text-center relative overflow-hidden" style={{ backgroundColor: '#2C2420', color: '#FFFFFF' }}>
        <div className="relative z-10">
          <span className="uppercase tracking-[0.2em] text-xs font-bold" style={{ color: '#A48D78' }}>Community</span>
          <h1 className="font-serif text-5xl md:text-7xl mt-4 mb-6" style={{ color: '#FFFFFF' }}>Upcoming Events</h1>
          <p className="font-light max-w-xl mx-auto" style={{ color: '#CBB9A4' }}>
            Join us for music, art, and community gatherings.
          </p>
        </div>
        {/* Background abstract shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)' }}></div>
      </div>

      {/* Events List */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20 space-y-6">
        {EVENTS.map((event, index) => (
          <Reveal key={event.id} delay={index * 150}>
            <div className="p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start group transition-colors" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(203, 185, 164, 0.2)' }}>
              {/* Date Badge */}
              <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-sm transition-colors" style={{ backgroundColor: '#F4F1EA', color: '#2C2420' }}>
                <span className="text-xs uppercase font-bold tracking-widest">{event.date.split(' ')[0]}</span>
                <span className="font-serif text-2xl">{event.date.split(' ')[1]}</span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h3 className="font-serif text-2xl" style={{ color: '#2C2420' }}>{event.title}</h3>
                  <span className="hidden md:inline" style={{ color: '#CBB9A4' }}>•</span>
                  <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#A48D78' }}>{event.time}</span>
                </div>
                <p className="font-light mb-4" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>{event.description}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(44, 36, 32, 0.6)' }}>
                  {event.type === 'music' && <Music size={14} />}
                  {event.type === 'community' && <Coffee size={14} />}
                  <span>{event.type}</span>
                </div>
              </div>

              <div className="shrink-0">
                <button className="px-6 py-3 text-xs uppercase tracking-widest transition-colors rounded-sm" style={{ border: '1px solid #CBB9A4', backgroundColor: 'transparent', color: '#4A3B32' }}>
                  RSVP
                </button>
              </div>
            </div>
          </Reveal>
        ))}

        <div className="text-center pt-12">
          <p className="text-sm italic" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>More events announced weekly. Follow our Instagram for updates.</p>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
