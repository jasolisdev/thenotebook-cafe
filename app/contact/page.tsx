/**
 * Contact Page - The Notebook Café
 *
 * Redesigned contact page with new layout and design.
 */
import { client } from "@/sanity/lib/client";
import Reveal from "../components/ui/Reveal";
import { MapPin, Clock, Phone } from "lucide-react";
import Image from "next/image";

async function getData() {
  const settings = await client.fetch(
    `*[_type=="settings"][0]{
      businessName,
      address,
      phone,
      email,
      hours,
      social{ instagram, spotify }
    }`
  );
  return { settings };
}

export default async function ContactPage() {
  const { settings } = await getData();

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <section
        data-section="Contact Hero"
        className="relative pt-28 pb-28 md:pt-32 md:pb-32 px-6 text-center overflow-hidden"
        style={{ backgroundColor: '#2C2420', color: '#FAF9F6' }}
      >
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
              Contact
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-[64px] md:text-[86px] leading-[0.9]" style={{ color: '#FAF9F6' }}>Visit Us</h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="font-light max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'rgba(203, 185, 164, 0.85)' }}>
              Come write your next chapter with us—walk in, call ahead, or plan your next meetup here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section
        data-section="Contact Details"
        className="max-w-4xl mx-auto px-6 py-20"
      >
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column - Location & Phone */}
          <Reveal>
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-4" style={{ color: '#A48D78' }}>
                  <MapPin size={24} />
                  <h3 className="uppercase tracking-widest font-bold text-sm">Location</h3>
                </div>
                <address className="not-italic font-serif text-3xl leading-snug" style={{ color: '#2C2420' }}>
                  3512 9th St,<br />
                  Riverside, CA 92501
                </address>
                <a
                  href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 pb-1 text-sm uppercase tracking-wider transition-colors"
                  style={{ color: '#A48D78', borderBottom: '1px solid #A48D78' }}
                >
                  Get Directions
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4" style={{ color: '#A48D78' }}>
                  <Phone size={24} />
                  <h3 className="uppercase tracking-widest font-bold text-sm">Phone</h3>
                </div>
                <p className="font-serif text-2xl" style={{ color: '#2C2420' }}>
                  (951) 823-0004
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column - Hours */}
          <Reveal delay={200}>
            <div className="relative p-10 shadow-lg rounded-sm overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderTop: '4px solid #A48D78' }}>
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5" style={{
                background: 'radial-gradient(circle at top right, #A48D78 0%, transparent 70%)'
              }}></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(164, 141, 120, 0.1)',
                      border: '1px solid rgba(164, 141, 120, 0.25)'
                    }}
                  >
                    <Clock size={20} style={{ color: '#A48D78' }} />
                  </div>
                  <h3 className="font-serif text-2xl" style={{ color: '#2C2420' }}>Business Hours</h3>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center py-3 px-4 rounded">
                    <span className="font-semibold tracking-wide text-sm uppercase" style={{ color: '#4A3B32' }}>Mon - Thu</span>
                    <span className="font-serif text-lg" style={{ color: '#A48D78' }}>6:30am – 4:00pm</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded">
                    <span className="font-semibold tracking-wide text-sm uppercase" style={{ color: '#4A3B32' }}>Fri - Sat</span>
                    <span className="font-serif text-lg" style={{ color: '#A48D78' }}>6:30am – 6:00pm</span>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded">
                    <span className="font-semibold tracking-wide text-sm uppercase" style={{ color: '#4A3B32' }}>Sunday</span>
                    <span className="font-serif text-lg italic" style={{ color: 'rgba(74, 59, 50, 0.5)' }}>Closed</span>
                  </div>
                </div>

                {/* Decorative footer accent */}
                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(164, 141, 120, 0.15)' }}>
                  <p className="text-xs text-center uppercase tracking-widest" style={{ color: 'rgba(74, 59, 50, 0.5)' }}>
                    Open Mon - Sat
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Map Image */}
        <Reveal delay={400}>
          <section
            data-section="Map"
            className="mt-20 w-full h-[400px] rounded-sm overflow-hidden relative group"
            style={{ backgroundColor: '#F4F1EA' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"
              alt="Cafe Location"
              fill
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <a
                href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 uppercase tracking-widest text-xs font-bold rounded-sm shadow-lg transition-colors"
                style={{ backgroundColor: '#FFFFFF', color: '#2C2420' }}
              >
                View on Map
              </a>
            </div>
          </section>
        </Reveal>
      </section>

      {/* Footer */}
    </main>
  );
}
