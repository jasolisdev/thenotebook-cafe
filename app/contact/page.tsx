/**
 * Contact Page - The Notebook Café
 *
 * Warm, welcoming contact page matching the site's overall aesthetic.
 * Features business hours, location map, contact info, and social links.
 */
import Reveal from "@/app/components/ui/Reveal";
import RevealText from "@/app/components/ui/RevealText";
import FadeInSection from "@/app/components/ui/FadeInSection";
import ParallaxHero from "@/app/components/features/ParallaxHero";
import ContactForm from "@/app/components/features/ContactForm";
import { MapPin, Clock, Phone, Mail, Coffee } from "lucide-react";
import "../styles/pages/contact.css";

export default function ContactPage() {
  return (
    <main className="contact-page min-h-screen relative">
      <div className="contact-fixed-background" aria-hidden="true" />
      {/* Hero Section */}
      <ParallaxHero backgroundImage="/contact/tnc-contact-hero-bg.png" focusPercent={150} overlayVariant="light">
        <div className="max-w-4xl mx-auto relative z-10 space-y-6 px-6 text-center">
          {/* Eyebrow - Instant reveal */}
          <RevealText delay="0ms">
            <span className="contact-hero-kicker font-bold tracking-[0.2em] uppercase text-sm block">
              Get in Touch
            </span>
          </RevealText>

          {/* Main Headline - 200ms delay */}
          <RevealText delay="200ms">
            <h1 className="contact-hero-title font-serif text-5xl md:text-7xl lg:text-8xl">
              Visit Us<br />
              <span className="contact-hero-title-accent italic">In Riverside</span>
            </h1>
          </RevealText>

          {/* Body Content - 400ms delay */}
          <FadeInSection delay="400ms">
            <p className="contact-hero-subtitle text-xl md:text-2xl max-w-2xl mx-auto font-normal leading-relaxed">
              Come write your next chapter with us. Walk in, call ahead, or plan your next creative session here.
            </p>
          </FadeInSection>
        </div>
      </ParallaxHero>

      {/* Contact Information & Form - Two Column Layout */}
      <section
        data-section="Contact Info"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div className="section-deco contact-info-deco contact-info-deco--phone" aria-hidden="true">
          <Phone strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark contact-info-deco contact-info-deco--clock" aria-hidden="true">
          <Clock strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-24">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Get in Touch
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-section-title font-serif text-4xl md:text-6xl lg:text-7xl mb-6 leading-none">
                How to <span className="contact-section-title-accent italic">Reach Us</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="contact-divider contact-divider--black w-24 h-[2px] mx-auto" />
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column: Contact Info */}
            <div className="space-y-16">
              {/* Location */}
              <Reveal delay={200}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                      <MapPin size={22} className="contact-icon" strokeWidth={1.5} />
                    </div>
                    <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold">
                      Location
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-4 text-cafe-black">
                      Our Riverside Home
                    </h3>
                    <address className="not-italic font-serif text-xl md:text-2xl leading-relaxed text-cafe-black/80">
                      3512 9th St,<br />
                      Riverside, CA 92501
                    </address>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=The+Notebook+Cafe%2C+3512+9th+St%2C+Riverside%2C+CA+92501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-directions-link inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold transition-all duration-400 group pt-2"
                  >
                    <span>Get Directions</span>
                    <span className="transition-transform duration-400 group-hover:translate-x-2">→</span>
                  </a>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal delay={300}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                      <Clock size={22} className="contact-icon" strokeWidth={1.5} />
                    </div>
                    <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold">
                      Hours
                    </span>
                  </div>

                  <div className="space-y-4 max-w-md">
                    <div className="flex justify-between items-baseline border-b border-cafe-tan/20 pb-2">
                      <span className="text-cafe-brown/70 font-medium">Monday – Saturday</span>
                      <span className="font-serif text-xl text-cafe-black">7am — 6pm</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-cafe-tan/20 pb-2">
                      <span className="text-cafe-brown/70 font-medium">Sunday</span>
                      <span className="font-serif text-xl text-cafe-black italic">Closed</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Contact Methods */}
              <Reveal delay={400}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                      <Phone size={22} className="contact-icon" strokeWidth={1.5} />
                    </div>
                    <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold">
                      Contact
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-cafe-brown/60 mb-1">Phone</p>
                      <a href="tel:+19518230004" className="font-serif text-2xl text-cafe-black hover:text-cafe-tan transition-colors">
                        (951) 823-0004
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-cafe-brown/60 mb-1">Email</p>
                      <a href="mailto:thenotebookcafellc@gmail.com" className="font-serif text-xl text-cafe-black hover:text-cafe-tan transition-colors">
                        thenotebookcafellc@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Contact Form */}
            <Reveal delay={500}>
              <div className="bg-white/60 p-8 md:p-12 rounded-3xl border border-white/50 shadow-xl shadow-cafe-black/5 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Mail size={120} />
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-serif text-3xl md:text-4xl mb-2 text-cafe-black">
                    Send a Message
                  </h3>
                  <p className="text-cafe-brown/70 mb-8 font-light">
                    Have a question or just want to say hello? Drop us a note below.
                  </p>
                  
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map Section - Centered Map */}
      <section
        data-section="Map"
        className="py-24 md:py-32 relative overflow-hidden bg-cafe-tan/5"
      >
        <div className="section-deco contact-map-deco contact-map-deco--pin" aria-hidden="true">
          <MapPin strokeWidth={1.4} />
        </div>
        <div className="section-deco section-deco-dark contact-map-deco contact-map-deco--coffee" aria-hidden="true">
          <Coffee strokeWidth={1.4} />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="relative">
              <div
                className="contact-map-frame relative w-full h-[420px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <iframe
                  src="https://www.google.com/maps?q=The+Notebook+Cafe%2C+3512+9th+St%2C+Riverside%2C+CA+92501&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Notebook Café on Google Maps"
                ></iframe>
              </div>

              {/* Decorative Badge */}
              <div className="contact-map-badge absolute bottom-4 right-4 sm:-bottom-6 sm:-right-6 shadow-2xl">
                <p className="text-2xl md:text-3xl leading-tight font-normal">Come</p>
                <p className="text-2xl md:text-3xl leading-tight font-normal">Visit Us</p>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] mt-2 opacity-90 font-bold">
                  Open Mon–Sat
                </p>
              </div>
            </div>

            {/* Closing Quote */}
            <Reveal delay={410}>
              <div className="contact-quote mt-24 p-8 sm:p-10 md:p-12 rounded-2xl text-center">
                <Coffee size={32} className="mx-auto mb-6 contact-quote__icon" />
                <blockquote
                  className="contact-quote__text font-serif text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed mb-4"
                >
                  &ldquo;We can&apos;t wait to meet you. Come as you are.&rdquo;
                </blockquote>
                <footer className="contact-quote__footer text-xs uppercase tracking-[0.2em] font-bold">
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