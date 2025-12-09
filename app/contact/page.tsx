/**
 * Contact Page - The Notebook Café
 *
 * Warm, welcoming contact page matching the site's overall aesthetic.
 * Features business hours, location map, contact info, and social links.
 */
import Reveal from "../components/ui/Reveal";
import ParallaxHero from "../components/features/ParallaxHero";
import { MapPin, Clock, Phone, Instagram, Mail, Coffee } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cafe-mist)' }}>
      {/* Hero Section */}
      <ParallaxHero backgroundImage="/contact/tnc-contact-hero-bg.png">
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 px-6 text-center">
          <Reveal>
            <span className="font-bold tracking-[0.2em] uppercase text-sm block" style={{ color: 'var(--cafe-tan)' }}>
              Get in Touch
            </span>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="font-serif text-[64px] md:text-[86px] leading-[0.9]" style={{ color: 'var(--cafe-cream)' }}>
              Visit Us<br />
              <span className="italic" style={{ color: 'var(--cafe-tan)' }}>In Riverside</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-cream-rgb), 0.82)' }}>
              Come write your next chapter with us. Walk in, call ahead, or plan your next creative session here.
            </p>
          </Reveal>
        </div>
      </ParallaxHero>

      {/* Contact Information - Clean Grid Layout */}
      <section
        data-section="Contact Info"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="section-deco" style={{ top: '10%', right: '12%', animationDuration: '11s' }} aria-hidden="true">
          <Phone strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', left: '8%', animationDuration: '12s', animationDelay: '0.5s' }} aria-hidden="true">
          <Clock strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-24">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Get in Touch
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl mb-6 leading-none" style={{ color: 'var(--cafe-black)' }}>
                How to <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Reach Us</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="w-24 h-[2px] mx-auto" style={{ backgroundColor: 'var(--cafe-black)' }}></div>
            </Reveal>
          </div>

          {/* Contact Grid - 2x2 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {/* 1. Business Hours */}
            <Reveal delay={200}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <Clock size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Hours
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  When We're Open
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline pb-3 border-b" style={{ borderColor: 'rgba(164, 141, 120, 0.15)' }}>
                    <span className="text-sm uppercase tracking-wider font-medium" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                      Monday – Saturday
                    </span>
                    <span className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--cafe-tan)' }}>
                      7am — 6pm
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pb-3 border-b" style={{ borderColor: 'rgba(164, 141, 120, 0.15)' }}>
                    <span className="text-sm uppercase tracking-wider font-medium" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                      Sunday
                    </span>
                    <span className="font-serif text-2xl md:text-3xl italic" style={{ color: 'rgba(203, 185, 164, 0.5)' }}>
                      Closed
                    </span>
                  </div>
                </div>

                <p className="text-base font-light leading-relaxed pt-2" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                  Closed Sundays for rest and reset. See you Monday morning!
                </p>
              </div>
            </Reveal>

            {/* 2. Location */}
            <Reveal delay={260}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <MapPin size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Location
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  Our Riverside Home
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>

                <address className="not-italic font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  3512 9th St,<br />
                  Riverside, CA 92501
                </address>

                <p className="text-base font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                  Near the art district and University Drive. Easy street parking available.
                </p>

                <a
                  href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold transition-all duration-400 group pt-2"
                  style={{ color: 'var(--cafe-tan)' }}
                >
                  <MapPin size={16} strokeWidth={2} />
                  <span>Get Directions</span>
                  <span className="transition-transform duration-400 group-hover:translate-x-2">→</span>
                </a>
              </div>
            </Reveal>

            {/* 3. Phone */}
            <Reveal delay={320}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <Phone size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Phone
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  Call Us Anytime
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>

                <a
                  href="tel:+19518230004"
                  className="font-serif text-3xl md:text-4xl block transition-colors duration-300 hover:opacity-70"
                  style={{ color: 'var(--cafe-black)' }}
                >
                  (951) 823-0004
                </a>

                <p className="text-base font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                  Give us a ring during business hours. We're happy to answer questions, take orders, or just chat about coffee.
                </p>
              </div>
            </Reveal>

            {/* 4. Email */}
            <Reveal delay={380}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <Mail size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                    Email
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--cafe-black)' }}>
                  Send a Message
                </h3>
                <div className="w-16 h-[2px]" style={{ backgroundColor: 'var(--cafe-tan)' }}></div>

                <a
                  href="mailto:hello@thenotebookcafe.com"
                  className="font-serif text-2xl md:text-3xl block transition-colors duration-300 hover:opacity-70"
                  style={{ color: 'var(--cafe-black)' }}
                >
                  hello@thenotebookcafe.com
                </a>

                <p className="text-base font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                  Questions, feedback, or partnership inquiries welcome. We'll get back to you within 24 hours.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Section - Centered Map */}
      <section
        data-section="Map"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="section-deco" style={{ top: '8%', left: '10%', animationDuration: '12s' }} aria-hidden="true">
          <MapPin strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '8%', right: '10%', animationDuration: '11s', animationDelay: '0.6s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="relative">
              <div
                className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  border: '2px solid rgba(164, 141, 120, 0.2)',
                  boxShadow: '0 8px 30px rgba(44, 36, 32, 0.15)'
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

              {/* Decorative Badge */}
              <div
                className="absolute -bottom-6 -right-6 shadow-2xl"
                style={{
                  backgroundColor: 'var(--cafe-tan)',
                  color: 'var(--cafe-white)',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.5rem',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.15)'
                }}
              >
                <p className="text-2xl md:text-3xl leading-tight font-normal">Come</p>
                <p className="text-2xl md:text-3xl leading-tight font-normal">Visit Us</p>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] mt-2 opacity-90 font-bold">
                  Open Mon–Sat
                </p>
              </div>
            </div>

            {/* Closing Quote */}
            <Reveal delay={410}>
              <div className="mt-24 p-10 md:p-12 rounded-2xl text-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.08)', border: '1px solid rgba(164, 141, 120, 0.2)' }}>
                <Coffee size={32} className="mx-auto mb-6" style={{ color: 'var(--cafe-tan)' }} />
                <blockquote
                  className="font-serif text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed mb-4"
                  style={{ color: 'rgba(74, 59, 50, 0.8)' }}
                >
                  "We can't wait to meet you. Come as you are."
                </blockquote>
                <footer className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                  — The Notebook Café Team
                </footer>
              </div>
            </Reveal>

          </Reveal>
        </div>
      </section>
    </main>
  );
}
