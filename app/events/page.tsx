/**
 * Events Page - The Notebook Café
 *
 * Displays upcoming events, grand opening information, and newsletter signup.
 */
import Image from "next/image";
import SiteFooter from "../components/layout/SiteFooter";
import ScrollReveal from "../components/layout/ScrollReveal";
import NewsletterForm from "../components/features/NewsLetterForm";
import EventsFloatingItems from "../components/decorative/EventsFloatingItems";
import { Calendar, Clock, MapPin, Music2, Ticket } from "lucide-react";
import { client } from "@/sanity/lib/client";

async function getSettings() {
  const settings = await client.fetch(
    `*[_type=="settings"][0]{ social{ instagram, spotify }, address }`,
  );
  return settings;
}

export default async function EventsPage() {
  const settings = await getSettings();

  return (
    <>
      <main className="site-layout">
        <ScrollReveal />

        {/* HERO SECTION */}
        <section className="events-hero relative section-dark">
          <EventsFloatingItems variant="hero" />
          <div className="events-hero-content mx-auto max-w-[900px] px-4 sm:px-6 text-center relative z-10">
            {/* Badge */}
            <div className="events-badge scroll-reveal">
              <span className="events-badge-icon">✦</span>
              <span>GRAND OPENING EVENT</span>
              <span className="events-badge-icon">✦</span>
            </div>

            {/* Title */}
            <h1 className="events-title scroll-reveal" style={{ animationDelay: '0.1s' }}>
              HOUSE VIBES:<br />OPENING NIGHT
            </h1>

            {/* Tagline */}
            <p className="events-tagline scroll-reveal" style={{ animationDelay: '0.2s' }}>
              Celebrate with us as we launch The Notebook Café with an unforgettable night of house music, specialty coffee cocktails, and creative energy.
            </p>

            {/* Event Details Grid */}
            <div className="events-details-grid scroll-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="events-detail-item">
                <Calendar className="events-detail-icon" />
                <div>
                  <div className="events-detail-label">Date</div>
                  <div className="events-detail-value">March 15, 2026</div>
                </div>
              </div>

              <div className="events-detail-item">
                <Clock className="events-detail-icon" />
                <div>
                  <div className="events-detail-label">Time</div>
                  <div className="events-detail-value">7 PM – 12 AM</div>
                </div>
              </div>

              <div className="events-detail-item">
                <MapPin className="events-detail-icon" />
                <div>
                  <div className="events-detail-label">Location</div>
                  <div className="events-detail-value">3512 9th St, Riverside</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider - Wavy transition to cream */}
        <div className="divider-cream" style={{ transform: 'scaleY(-1)' }}>
          <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
        </div>

        {/* CREAM SECTION - DJ & Event Details */}
        <section className="section-cream relative">
          <EventsFloatingItems variant="cream" />
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
            {/* DJ Hero Image */}
            <div className="text-center mb-12 scroll-reveal">
              <div className="events-dj-image relative">
                <Image
                  src="/unsplash/event-hero.jpg"
                  alt="DJ performing at event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1000px) 100vw, 1000px"
                  priority={false}
                />
              </div>
            </div>

            {/* Lineup Section */}
            <div className="mb-16 scroll-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="events-section-label">
                <div className="events-divider-line"></div>
                <span className="events-label-text">Tonight&apos;s Lineup</span>
                <div className="events-divider-line"></div>
              </div>

              <div className="events-dj-card">
                <div className="events-dj-card-header">
                  <Music2 className="events-dj-icon" />
                  <div>
                    <h3 className="events-dj-name">DJ SOLIS</h3>
                    <p className="events-dj-genre">Deep House • Afro House • Soulful Grooves</p>
                  </div>
                </div>
            <p className="events-dj-bio">
              Riverside&apos;s own house music curator, DJ Solis brings a signature blend of deep basslines, soulful vocals, and Afro-inspired rhythms. Known for creating immersive sonic journeys that move both body and mind, Solis has been featured at underground venues across Southern California. Tonight, he sets the tone for The Notebook Café&apos;s creative vision.
            </p>
              </div>
            </div>

            {/* What to Expect */}
            <div className="mb-16 scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="events-section-label">
                <div className="events-divider-line"></div>
                <span className="events-label-text">What to Expect</span>
                <div className="events-divider-line"></div>
              </div>

              <div className="events-highlights-grid">
                <div className="events-highlight-card">
                  <div className="events-highlight-icon-wrapper">
                    <Music2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="events-highlight-title">Live DJ Set</h4>
                    <p className="events-highlight-text">5 hours of curated house music across deep, soulful, and Afro house genres</p>
                  </div>
                </div>

                <div className="events-highlight-card">
                  <div className="events-highlight-icon-wrapper">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 10V8C17 6.89543 16.1046 6 15 6H5C3.89543 6 3 6.89543 3 8V10M17 10V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V10M17 10H18C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14H17M3 18H17" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="events-highlight-title">Signature Coffee Cocktails</h4>
                    <p className="events-highlight-text">Espresso martinis, cold brew creations, and specialty mocktails</p>
                  </div>
                </div>

                <div className="events-highlight-card">
                  <div className="events-highlight-icon-wrapper">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="events-highlight-title">Late Night Menu</h4>
                    <p className="events-highlight-text">Small bites, pastries, and desserts available all night</p>
                  </div>
                </div>

                <div className="events-highlight-card">
                  <div className="events-highlight-icon-wrapper">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 3v4M8 3v4M2 11h20" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="events-highlight-title">Artist Showcase</h4>
                    <p className="events-highlight-text">Local creatives displaying work throughout the café</p>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Access Card */}
            <div className="mb-16 scroll-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="events-vip-card">
                <div className="events-vip-badge">
                  <Ticket className="w-5 h-5" />
                  <span>VIP ACCESS</span>
                </div>

                <h3 className="events-vip-title">Join the List for Free Entry</h3>
                <p className="events-vip-description">
                  Sign up now and get complimentary entry to our grand opening event, plus early access to the café at 6 PM for a pre-party meet & greet with DJ Solis. Limited to first 100 sign-ups.
                </p>

                <div className="events-vip-perks">
                  <div className="events-vip-perk">✓ Skip the line entry</div>
                  <div className="events-vip-perk">✓ Complimentary welcome drink</div>
                  <div className="events-vip-perk">✓ Exclusive merch giveaway</div>
                  <div className="events-vip-perk">✓ First 100 only</div>
                </div>

                {/* Newsletter Form for VIP Sign-ups */}
                <div className="events-vip-form">
                  <NewsletterForm source="events-vip" />
                </div>

                <p className="events-vip-note">
                  *By signing up, you&apos;ll also receive updates about future events, new menu items, and café news.
                </p>
              </div>
            </div>

            {/* DJ Photo Gallery */}
            <div className="mb-16 scroll-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="events-section-label">
                <div className="events-divider-line"></div>
                <span className="events-label-text">Event Vibes</span>
                <div className="events-divider-line"></div>
              </div>

              <div className="events-gallery">
                {[
                  {
                    src: "/unsplash/event-1.jpg",
                    alt: "DJ mixing at turntables",
                  },
                  {
                    src: "/unsplash/event-2.jpg",
                    alt: "Crowd enjoying music",
                  },
                  {
                    src: "/unsplash/event-3.jpg",
                    alt: "DJ performing with lights",
                  },
                ].map((item) => (
                  <div className="events-gallery-item relative" key={item.src}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="events-gallery-image object-cover"
                      sizes="(max-width: 900px) 50vw, 300px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider - Wavy transition back to dark */}
        <div className="divider-cream">
          <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
        </div>

        {/* Footer */}
        <SiteFooter showFloatingItems={false} />
      </main>
    </>
  );
}
