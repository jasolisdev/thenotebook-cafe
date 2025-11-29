/**
 * Contact Page - The Notebook Café
 *
 * Redesigned contact page with new layout and design.
 */
import { client } from "@/sanity/lib/client";
import SiteFooter from "../components/layout/SiteFooter";
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
      <div className="py-24 md:py-32 px-6 text-center" style={{ backgroundColor: '#F4F1EA' }}>
        <h1 className="font-serif text-5xl md:text-7xl mb-6" style={{ color: '#2C2420' }}>Visit Us</h1>
        <p className="font-light max-w-xl mx-auto text-lg" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
          Stop by for a cup, stay for the vibe.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
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
            <div className="p-10 shadow-sm rounded-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(203, 185, 164, 0.2)' }}>
              <div className="flex items-center gap-3 mb-8" style={{ color: '#A48D78' }}>
                <Clock size={24} />
                <h3 className="uppercase tracking-widest font-bold text-sm">Business Hours</h3>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-baseline pb-4" style={{ borderBottom: '1px solid #F4F1EA' }}>
                  <span className="font-medium" style={{ color: '#4A3B32' }}>Mon - Thu</span>
                  <span className="font-serif text-xl" style={{ color: '#2C2420' }}>06:30am – 04:00pm</span>
                </div>
                <div className="flex justify-between items-baseline pb-4" style={{ borderBottom: '1px solid #F4F1EA' }}>
                  <span className="font-medium" style={{ color: '#4A3B32' }}>Fri - Sat</span>
                  <span className="font-serif text-xl" style={{ color: '#2C2420' }}>06:30am – 06:00pm</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium" style={{ color: '#4A3B32' }}>Sun</span>
                  <span className="font-serif text-xl" style={{ color: '#2C2420' }}>06:30am – 04:00pm</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Map Image */}
        <Reveal delay={400}>
          <div className="mt-20 w-full h-[400px] rounded-sm overflow-hidden relative group" style={{ backgroundColor: '#F4F1EA' }}>
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
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
