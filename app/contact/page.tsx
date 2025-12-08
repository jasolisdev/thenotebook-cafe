/**
 * Contact Page - The Notebook Café
 *
 * Warm, welcoming contact page matching the site's overall aesthetic.
 * Features business hours, location map, contact info, and social links.
 */
import Reveal from "../components/ui/Reveal";
import { MapPin, Clock, Phone, Instagram, Mail, Coffee } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cafe-mist)' }}>
      {/* Hero Section */}
      <section
        data-section="Contact Hero"
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
      </section>

      {/* Contact Information Grid */}
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
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left Column - Hours & Address */}
            <div className="space-y-16">
              {/* Business Hours */}
              <Reveal>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Clock size={20} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                    <h2 className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                      Hours
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline pb-4 border-b" style={{ borderColor: 'rgba(164, 141, 120, 0.15)' }}>
                      <span className="text-sm uppercase tracking-wider font-medium" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                        Monday – Saturday
                      </span>
                      <span className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--cafe-tan)' }}>
                        7am — 6pm
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pb-4 border-b" style={{ borderColor: 'rgba(164, 141, 120, 0.15)' }}>
                      <span className="text-sm uppercase tracking-wider font-medium" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                        Sunday
                      </span>
                      <span className="font-serif text-2xl md:text-3xl italic" style={{ color: 'rgba(203, 185, 164, 0.5)' }}>
                        Closed
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-light mt-4" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                    Closed Sundays for rest and reset. See you Monday.
                  </p>
                </div>
              </Reveal>

              {/* Address */}
              <Reveal delay={150}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin size={20} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                    <h2 className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                      Location
                    </h2>
                  </div>
                  <address className="not-italic font-serif text-3xl md:text-4xl leading-tight mb-4" style={{ color: 'var(--cafe-black)' }}>
                    3512 9th St,<br />
                    Riverside, CA 92501
                  </address>
                  <a
                    href="https://maps.google.com/?q=3512+9th+St,+Riverside,+CA+92501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium transition-all duration-300 group"
                    style={{ color: 'var(--cafe-black)', borderBottom: '1px solid var(--cafe-black)' }}
                  >
                    <span>Get Directions</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column - Phone & Email */}
            <div className="space-y-16">
              {/* Phone */}
              <Reveal delay={200}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Phone size={20} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                    <h2 className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                      Phone
                    </h2>
                  </div>
                  <a
                    href="tel:+19518230004"
                    className="font-serif text-3xl md:text-4xl transition-colors duration-300 hover:opacity-70 block"
                    style={{ color: 'var(--cafe-black)' }}
                  >
                    (951) 823-0004
                  </a>
                  <p className="text-sm font-light mt-3" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                    Call us anytime during business hours
                  </p>
                </div>
              </Reveal>

              {/* Email */}
              <Reveal delay={250}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Mail size={20} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                    <h2 className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: 'var(--cafe-tan)' }}>
                      Email
                    </h2>
                  </div>
                  <a
                    href="mailto:hello@thenotebookcafe.com"
                    className="font-serif text-2xl md:text-3xl transition-colors duration-300 hover:opacity-70 block"
                    style={{ color: 'var(--cafe-black)' }}
                  >
                    hello@thenotebookcafe.com
                  </a>
                  <p className="text-sm font-light mt-3" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        data-section="Map"
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="section-deco" style={{ top: '8%', left: '10%', animationDuration: '12s' }} aria-hidden="true">
          <MapPin strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '8%', right: '10%', animationDuration: '11s', animationDelay: '0.6s' }} aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Find Us
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-5xl sm:text-6xl mb-6 leading-none" style={{ color: 'var(--cafe-black)' }}>
                We're in <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Riverside</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(74, 59, 50, 0.82)' }}>
                Located near the art district and University Drive. Drop by anytime during business hours.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div
              className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(164, 141, 120, 0.2)',
                boxShadow: '0 8px 30px rgba(44, 36, 32, 0.12)'
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
      </section>

      {/* Connect Online */}
      <section
        data-section="Connect Online"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="section-deco" style={{ top: '10%', right: '12%', animationDuration: '11s' }} aria-hidden="true">
          <Instagram strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark" style={{ bottom: '10%', left: '10%', animationDuration: '12s', animationDelay: '0.7s' }} aria-hidden="true">
          <Mail strokeWidth={1.4} />
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Stay Connected
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-5xl sm:text-6xl mb-6 leading-none" style={{ color: 'var(--cafe-black)' }}>
                Connect <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Online</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(74, 59, 50, 0.82)' }}>
                Follow us for updates, behind-the-scenes moments, and community events.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Instagram */}
            <Reveal delay={200}>
              <a
                href="https://instagram.com/thenotebookcafellc"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 md:p-10 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: 'rgba(244, 241, 234, 0.5)',
                  border: '2px solid rgba(164, 141, 120, 0.15)'
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(164, 141, 120, 0.15)' }}
                  >
                    <Instagram size={32} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] font-bold mb-2" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                      Instagram
                    </div>
                    <div className="font-serif text-2xl md:text-3xl mb-2" style={{ color: 'var(--cafe-black)' }}>
                      @thenotebookcafellc
                    </div>
                    <p className="text-sm font-light" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                      Daily updates, menu specials, and community vibes
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* Email */}
            <Reveal delay={280}>
              <a
                href="mailto:hello@thenotebookcafe.com"
                className="group block p-8 md:p-10 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: 'rgba(244, 241, 234, 0.5)',
                  border: '2px solid rgba(164, 141, 120, 0.15)'
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(164, 141, 120, 0.15)' }}
                  >
                    <Mail size={32} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] font-bold mb-2" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                      Email
                    </div>
                    <div className="font-serif text-xl md:text-2xl mb-2" style={{ color: 'var(--cafe-black)' }}>
                      hello@thenotebookcafe.com
                    </div>
                    <p className="text-sm font-light" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                      Questions, feedback, or partnership inquiries
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Closing Quote */}
          <Reveal delay={360}>
            <div className="mt-20 text-center">
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
