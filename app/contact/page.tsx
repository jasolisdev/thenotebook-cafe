/**
 * Contact Page - The Notebook Café
 *
 * Editorial Noir aesthetic - High-fashion editorial meets coffee culture.
 * Split-screen layouts, dramatic negative space, magazine sophistication.
 */
import { client } from "@/sanity/lib/client";
import Reveal from "../components/ui/Reveal";
import { MapPin, Clock, Phone, Instagram, Mail } from "lucide-react";
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
    <main className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Editorial Split-Screen Hero */}
      <section
        data-section="Contact Hero"
        className="relative min-h-screen grid lg:grid-cols-2"
      >
        {/* Left - Image Panel (Dark) */}
        <div className="relative min-h-[60vh] lg:min-h-screen bg-black overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200"
            alt="The Notebook Café Interior"
            fill
            className="object-cover opacity-75"
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
                  "Come write your next chapter with us"
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right - Content Panel (Light) */}
        <div className="relative bg-white flex items-center p-10 md:p-16 lg:p-24">
          <div className="w-full max-w-xl">
            <Reveal>
              <div className="mb-12">
                <span
                  className="text-xs uppercase tracking-[0.3em] font-bold mb-6 block"
                  style={{ color: '#A48D78' }}
                >
                  Visit
                </span>
                <h1
                  className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-8"
                  style={{ color: '#2C2420' }}
                >
                  Get in{" "}
                  <span className="italic" style={{ color: '#A48D78' }}>
                    Touch
                  </span>
                </h1>
                <p
                  className="text-xl md:text-2xl font-light leading-relaxed"
                  style={{ color: 'rgba(74, 59, 50, 0.7)' }}
                >
                  Walk in, call ahead, or plan your next creative session here.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-8">
                {/* Location */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin size={20} style={{ color: '#A48D78' }} strokeWidth={1.5} />
                    <h3
                      className="text-xs uppercase tracking-[0.25em] font-bold"
                      style={{ color: '#A48D78' }}
                    >
                      Location
                    </h3>
                  </div>
                  <address className="not-italic font-serif text-2xl md:text-3xl leading-tight mb-3" style={{ color: '#2C2420' }}>
                    3512 9th St,<br />
                    Riverside, CA 92501
                  </address>
                  <a
                    href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm uppercase tracking-wider font-medium transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: '#2C2420', borderBottom: '1px solid #2C2420' }}
                  >
                    Get Directions →
                  </a>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ backgroundColor: 'rgba(164, 141, 120, 0.2)' }}></div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Phone size={20} style={{ color: '#A48D78' }} strokeWidth={1.5} />
                    <h3
                      className="text-xs uppercase tracking-[0.25em] font-bold"
                      style={{ color: '#A48D78' }}
                    >
                      Phone
                    </h3>
                  </div>
                  <a
                    href="tel:+19518230004"
                    className="font-serif text-2xl md:text-3xl transition-colors duration-300 hover:opacity-70"
                    style={{ color: '#2C2420' }}
                  >
                    (951) 823-0004
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hours Section - High Contrast */}
      <section
        data-section="Business Hours"
        className="relative py-32 md:py-40 px-6"
        style={{ backgroundColor: '#2C2420', color: '#FFFFFF' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Editorial Heading */}
            <Reveal>
              <div>
                <div className="w-16 h-[3px] mb-8" style={{ backgroundColor: '#A48D78' }}></div>
                <h2
                  className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8"
                  style={{ color: '#FFFFFF' }}
                >
                  When We're{" "}
                  <span className="italic" style={{ color: '#A48D78' }}>
                    Open
                  </span>
                </h2>
                <p
                  className="text-xl md:text-2xl font-light leading-relaxed max-w-md"
                  style={{ color: 'rgba(203, 185, 164, 0.8)' }}
                >
                  Your creative sanctuary awaits. Drop by for morning focus or afternoon inspiration.
                </p>
              </div>
            </Reveal>

            {/* Right - Hours Table */}
            <Reveal delay={150}>
              <div className="space-y-6">
                <div className="flex justify-between items-baseline pb-6 border-b" style={{ borderColor: 'rgba(164, 141, 120, 0.2)' }}>
                  <span
                    className="text-sm uppercase tracking-[0.25em] font-bold"
                    style={{ color: 'rgba(203, 185, 164, 0.7)' }}
                  >
                    Monday – Thursday
                  </span>
                  <span className="font-serif text-3xl" style={{ color: '#A48D78' }}>
                    6:30am – 4:00pm
                  </span>
                </div>

                <div className="flex justify-between items-baseline pb-6 border-b" style={{ borderColor: 'rgba(164, 141, 120, 0.2)' }}>
                  <span
                    className="text-sm uppercase tracking-[0.25em] font-bold"
                    style={{ color: 'rgba(203, 185, 164, 0.7)' }}
                  >
                    Friday – Saturday
                  </span>
                  <span className="font-serif text-3xl" style={{ color: '#A48D78' }}>
                    6:30am – 6:00pm
                  </span>
                </div>

                <div className="flex justify-between items-baseline pb-6">
                  <span
                    className="text-sm uppercase tracking-[0.25em] font-bold"
                    style={{ color: 'rgba(203, 185, 164, 0.7)' }}
                  >
                    Sunday
                  </span>
                  <span className="font-serif text-3xl italic" style={{ color: 'rgba(203, 185, 164, 0.4)' }}>
                    Closed
                  </span>
                </div>

                {/* Note */}
                <div className="pt-6">
                  <p className="text-sm font-light" style={{ color: 'rgba(203, 185, 164, 0.6)' }}>
                    Extended hours Friday & Saturday for late-afternoon sessions and evening gatherings.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location Section - Editorial Typography */}
      <section
        data-section="Location"
        className="relative py-32 md:py-40"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Address Display */}
            <Reveal>
              <div>
                <div className="mb-10">
                  <span
                    className="text-xs uppercase tracking-[0.3em] font-bold mb-8 block"
                    style={{ color: '#A48D78' }}
                  >
                    Find Us
                  </span>
                  <h2
                    className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-10"
                    style={{ color: '#2C2420' }}
                  >
                    We're in{" "}
                    <span className="italic" style={{ color: '#A48D78' }}>
                      Riverside
                    </span>
                  </h2>
                </div>

                <address className="not-italic mb-8">
                  <div className="font-serif text-4xl md:text-5xl leading-tight mb-4" style={{ color: '#2C2420' }}>
                    3512 9th Street
                  </div>
                  <div className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                    Riverside, CA 92501
                  </div>
                </address>

                <div className="flex flex-col gap-4 pt-8 border-t" style={{ borderColor: 'rgba(164, 141, 120, 0.2)' }}>
                  <a
                    href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] font-bold transition-all duration-300"
                    style={{ color: '#2C2420' }}
                  >
                    <MapPin size={18} strokeWidth={2} style={{ color: '#A48D78' }} />
                    <span className="border-b border-current">Get Directions</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right - Embedded Map */}
            <Reveal delay={150}>
              <div
                className="relative w-full h-[500px] rounded-sm overflow-hidden"
                style={{
                  border: '1px solid rgba(164, 141, 120, 0.15)',
                  boxShadow: '0 4px 20px rgba(44, 36, 32, 0.08)'
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.8572847108916!2d-117.37523!3d33.98167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcae4b5d3f3f3f%3A0x1234567890abcdef!2s3512%209th%20St%2C%20Riverside%2C%20CA%2092501!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Notebook Café Location"
                ></iframe>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Social & Email - Minimal Footer Section */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: '#FAF9F6' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-12"
              style={{ color: '#2C2420' }}
            >
              Connect <span className="italic" style={{ color: '#A48D78' }}>Online</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              {/* Instagram */}
              <a
                href="https://instagram.com/thenotebookcafellc"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)' }}
                >
                  <Instagram size={28} style={{ color: '#A48D78' }} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <div className="text-xs uppercase tracking-[0.25em] font-bold mb-1" style={{ color: 'rgba(74, 59, 50, 0.5)' }}>
                    Instagram
                  </div>
                  <div className="font-serif text-xl" style={{ color: '#2C2420' }}>
                    @thenotebookcafellc
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@thenotebookcafe.com"
                className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)' }}
                >
                  <Mail size={28} style={{ color: '#A48D78' }} strokeWidth={1.5} />
                </div>
                <div className="text-center">
                  <div className="text-xs uppercase tracking-[0.25em] font-bold mb-1" style={{ color: 'rgba(74, 59, 50, 0.5)' }}>
                    Email
                  </div>
                  <div className="font-serif text-xl" style={{ color: '#2C2420' }}>
                    hello@thenotebookcafe.com
                  </div>
                </div>
              </a>
            </div>
          </Reveal>

          {/* Closing Note */}
          <Reveal delay={200}>
            <div className="mt-20">
              <div className="w-12 h-[2px] mx-auto mb-8" style={{ backgroundColor: 'rgba(164, 141, 120, 0.3)' }}></div>
              <p
                className="font-serif text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'rgba(74, 59, 50, 0.7)' }}
              >
                "We can't wait to meet you. Come as you are."
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
