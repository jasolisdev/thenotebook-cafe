/**
 * @fileoverview Contact page with form submission
 * @module pages/contact
 *
 * @description
 * Contact page featuring form submission with email notification,
 * business information sidebar, and FAQ structured data for local SEO.
 *
 * Key features:
 * - Hero banner with contact heading
 * - Contact form with name, email, subject, message fields
 * - Client-side and server-side validation
 * - Email notification via Resend API (sent to business owner)
 * - CSRF protection and rate limiting (3 requests per minute)
 * - Input sanitization for XSS prevention
 * - Success/error state handling with user feedback
 * - Business information sidebar (hours, location, phone, email)
 * - FAQ structured data (FAQJsonLd) for rich snippets
 * - Local business structured data (LocalBusinessJsonLd)
 *
 * @route /contact
 * @access public
 *
 * @example
 * Route: /contact
 * Flow: Fill Form → Validate → Submit → Email Sent → Confirmation Message
 *
 * @see {@link app/components/features/ContactForm.tsx} for form component
 * @see {@link app/api/contact/route.ts} for API endpoint with security
 * @see {@link app/components/seo/FAQJsonLd.tsx} for FAQ structured data
 */
import Reveal from "@/app/components/ui/Reveal";
import RevealText from "@/app/components/ui/RevealText";
import FadeInSection from "@/app/components/ui/FadeInSection";
import ContactForm from "@/app/components/features/ContactForm";
import { MapPin, Clock, Phone, Mail, Coffee, ArrowUpRight } from "lucide-react";
import "@/app/styles/pages/contact.css";
import type { Metadata } from "next";
import { SEO } from "@/app/lib/constants/seo";
import FAQJsonLd from "@/app/components/seo/FAQJsonLd";
import LocalBusinessJsonLd from "@/app/components/seo/LocalBusinessJsonLd";
import { BUSINESS_INFO } from "@/app/lib/constants/business";

export const metadata: Metadata = {
  title: SEO.pages.contact.title,
  description: SEO.pages.contact.description,
  alternates: {
    canonical: `${SEO.siteUrl}/contact`,
  },
  openGraph: {
    title: SEO.pages.contact.title,
    description: SEO.pages.contact.description,
    url: `${SEO.siteUrl}/contact`,
    images: [
      {
        url: SEO.pages.contact.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO.siteName} Contact — Riverside, CA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.pages.contact.title,
    description: SEO.pages.contact.description,
    images: [SEO.pages.contact.ogImage],
  },
};

// FAQ data for local SEO
const contactFAQs = [
  {
    question: "What are The Notebook Café hours?",
    answer: `We're open Monday through Friday from 7am to 6pm, and Saturday through Sunday from 7am to 3pm.`,
  },
  {
    question: "Where is The Notebook Café located?",
    answer: `We're located at ${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zip}, near the art district and University Drive nightlife area in Riverside, California.`,
  },
  {
    question: "Do you have Wi-Fi for remote work?",
    answer:
      "Yes! We offer fast, reliable Wi-Fi perfect for remote work and studying. Every seat has a power outlet, and we have warm 2700K lighting for eye comfort during extended sessions.",
  },
  {
    question: "Can I host an event at The Notebook Café?",
    answer: `We love hosting community events, live music, and open mics. Contact us at ${BUSINESS_INFO.email} or call ${BUSINESS_INFO.phoneDisplay} to discuss your event ideas.`,
  },
  {
    question:
      "What makes The Notebook Café different from other coffee shops in Riverside?",
    answer:
      "We focus on three pillars: exceptional specialty coffee, curated house music, and a sanctuary-like atmosphere designed for deep work and creativity. Plus, we treat our community like family—this is Riverside's living room.",
  },
];

export default function ContactPage() {
  return (
    <main className="contact-page min-h-screen relative">
      <FAQJsonLd items={contactFAQs} />
      <LocalBusinessJsonLd />
      <div className="contact-fixed-background" aria-hidden="true" />
      {/* Hero Section */}
      <section
        className="relative min-h-[32vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden pt-[var(--site-header-height,80px)]"
        data-section="Hero"
        style={{
          backgroundImage: "url(/menu/tnc-menu-banner.webp)",
          backgroundColor: "var(--color-cafe-black)",
          backgroundSize: "cover",
          backgroundPosition: "center 32%",
        }}
      >
        <div
          className="absolute inset-0 bg-black/40 z-[1]"
          aria-hidden="true"
        />
        <div className="relative z-10 text-left md:text-center px-6 w-full max-w-7xl mx-auto">
          <h1 className="font-dm-serif font-bold text-4xl md:text-6xl text-cafe-cream mb-4">
            <RevealText delay="0ms">
              Get in Touch
            </RevealText>
          </h1>
          <FadeInSection delay="200ms">
            <p className="font-serif italic text-lg md:text-2xl text-cafe-cream/90 drop-shadow-sm">
              We&apos;re Just Around the Corner.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Information & Form - Two Column Layout */}
      <section
        data-section="Contact Info"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div
          className="section-deco contact-info-deco contact-info-deco--phone"
          aria-hidden="true"
        >
          <Phone strokeWidth={1.4} />
        </div>
        <div
          className="section-deco section-deco-dark contact-info-deco contact-info-deco--clock"
          aria-hidden="true"
        >
          <Clock strokeWidth={1.4} />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-24">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block font-inter">
                Get in Touch
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-section-title font-dm-serif font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-none">
                How to{" "}
                <span className="contact-section-title-accent italic">
                  Reach Us
                </span>
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
                <div className="space-y-6 flex flex-col items-start text-left">
                  <div className="flex items-center justify-start gap-3">
                    <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                      <MapPin
                        size={22}
                        className="contact-icon"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold font-inter">
                      Location
                    </span>
                  </div>

                  <div>
                    <p className="text-sm md:text-base text-cafe-brown/70 mb-3">
                      Visit our Riverside cafe for specialty coffee and a
                      welcoming space to work or relax.
                    </p>
                    <address className="not-italic font-serif text-xl md:text-2xl leading-relaxed text-cafe-black/80">
                      3512 9th St,
                      <br />
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
                    <ArrowUpRight
                      size={16}
                      className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </a>
                </div>
              </Reveal>

              {/* Hours */}
              <Reveal delay={300}>
                <div className="space-y-6 flex flex-col items-start text-left">
                  <div className="flex items-center justify-start gap-3">
                    <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                      <Clock
                        size={22}
                        className="contact-icon"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold font-inter">
                      Hours
                    </span>
                  </div>

                  <div className="space-y-4 w-full max-w-md">
                    <div className="flex justify-between items-baseline border-b border-cafe-tan/20 pb-2">
                      <span className="font-serif text-cafe-brown/70 font-medium">
                        Monday – Friday
                      </span>
                      <span className="font-serif text-cafe-black">
                        <span className="text-2xl">7</span><span className="text-sm">am</span> — <span className="text-2xl">6</span><span className="text-sm">pm</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-cafe-tan/20 pb-2">
                      <span className="font-serif text-cafe-brown/70 font-medium">
                        Saturday – Sunday
                      </span>
                      <span className="font-serif text-cafe-black">
                        <span className="text-2xl">7</span><span className="text-sm">am</span> — <span className="text-2xl">3</span><span className="text-sm">pm</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Contact Methods */}
              <Reveal delay={400}>
                <div className="space-y-6 flex flex-col items-start text-left">
                  <div className="flex items-center justify-start gap-3">
                    <div className="contact-icon-badge w-12 h-12 rounded-full flex items-center justify-center">
                      <Phone
                        size={22}
                        className="contact-icon"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="contact-eyebrow text-xs uppercase tracking-[0.2em] font-bold font-inter">
                      Contact
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-cafe-brown/60 mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:+19518230004"
                        className="font-serif text-2xl text-cafe-black hover:text-cafe-tan transition-colors"
                      >
                        (951) 823-0004
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-cafe-brown/60 mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:thenotebookcafellc@gmail.com"
                        className="font-serif text-xl text-cafe-black hover:text-cafe-tan transition-colors"
                      >
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
                    Have a question or just want to say hello? Drop us a note
                    below.
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
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div
          className="section-deco contact-map-deco contact-map-deco--pin"
          aria-hidden="true"
        >
          <MapPin strokeWidth={1.4} />
        </div>
        <div
          className="section-deco section-deco-dark contact-map-deco contact-map-deco--coffee"
          aria-hidden="true"
        >
          <Coffee strokeWidth={1.4} />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="relative">
              <div className="contact-map-frame relative w-full h-[420px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
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
              <div className="contact-map-badge absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 shadow-2xl">
                <p className="text-2xl md:text-3xl leading-tight font-normal">
                  Come
                </p>
                <p className="text-2xl md:text-3xl leading-tight font-normal">
                  Visit Us
                </p>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] mt-2 opacity-90 font-bold">
                  Open 7 Days
                </p>
              </div>
            </div>

            {/* Closing Quote */}
            <Reveal delay={410}>
              <div className="contact-quote mt-24 p-8 sm:p-10 md:p-12 rounded-2xl text-center">
                <Coffee
                  size={32}
                  className="mx-auto mb-6 contact-quote__icon"
                />
                <blockquote className="contact-quote__text font-serif text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed mb-4">
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
