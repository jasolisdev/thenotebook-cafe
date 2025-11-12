// app/page.tsx
import { client } from "@/sanity/lib/client";
import HeroLamp from "./components/HeroLamp";
import SiteHeader from "./components/SiteHeader";
import NewsletterForm from "./components/NewsLetterForm";
import {
  Coffee,
  Music2,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

async function getData() {
  const [home, settings] = await Promise.all([
    client.fetch(`*[_type=="homePage"][0]{
      heroHeadline, heroTagline, statusLine, ctaText, ctaUrl,
      whatToExpectBullets, vibeCopy
    }`),
    client.fetch(
      `*[_type=="settings"][0]{ social{ instagram }, address, hours }`,
    ),
  ]);
  return { home, settings };
}

export default async function HomePage() {
  const { home, settings } = await getData();

  return (
    <main className="page-dark">
      {/* Fixed dark nav */}
      <div className="nav-glass-wrap">
        <div className="nav-glass">
          <SiteHeader instagramUrl={settings?.social?.instagram} />
        </div>
      </div>

      {/* HERO */}
      <HeroLamp
        headline={home?.heroHeadline || "The Notebook Café"}
        sub={home?.statusLine || "☕ Coming Soon ☕"}
        tagline={home?.heroTagline || "Coffee. Culture. House Music."}
        badge="Opening Fall 2025"
        ctaText={home?.ctaText || "Follow us on Instagram"}
        ctaHref={home?.ctaUrl || (settings?.social?.instagram ?? "#")}
      />

      {/* Divider - ENHANCED */}
      <div className="my-14 mx-auto max-w-[760px] px-5">
        <div className="about-divider" />
      </div>

      {/* Highlights list - ENHANCED */}
      <section className="mx-auto max-w-[800px] px-6 text-center mb-20">
        <div className="home-section-label mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.08)] border border-[rgba(201,154,88,0.2)] text-[11px] uppercase tracking-[2px] ink-cream">
            What to Expect
          </span>
        </div>

        <ul className="inline-block text-left space-y-6 text-[17px] leading-8 ink-cream">
          {(
            home?.whatToExpectBullets ?? [
              "Specialty espresso, roasted right",
              "House music energy, daytime into night",
              "Stay, study, create — Riverside",
            ]
          ).map((t: string, i: number) => (
            <li key={i} className="home-highlight-item">
              <span className="home-highlight-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="4" />
                </svg>
              </span>
              <span className="ink-cream">{t}</span>
            </li>
          ))}
        </ul>

        {home?.vibeCopy && (
          <p className="home-vibe-copy text-[15.5px] leading-8 mt-10 ink-cream-dim max-w-[64ch] mx-auto">
            {home.vibeCopy}
          </p>
        )}
      </section>

      {/* CARD GRID - 1 col on mobile, 2 cols on tablet+ */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-6 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* CARD: Craft */}
          <div className="home-info-card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                OUR CRAFT.
              </h3>
              <div className="home-card-icon">
                <Coffee className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[14.5px] sm:text-[15px] leading-7 ink-cream-dim">
              Specialty espresso, ethically sourced, and meticulously prepared
              beverages.
            </p>
          </div>

          {/* CARD: Vibe */}
          <div className="home-info-card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                THE VIBE.
              </h3>
              <div className="home-card-icon">
                <Music2 className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[14.5px] sm:text-[15px] leading-7 ink-cream-dim">
              Ambient house music, creative energy, and a welcoming space for
              thinkers & makers.
            </p>
          </div>

          {/* CARD: Location */}
          <div className="home-info-card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                LOCATION.
              </h3>
              <div className="home-card-icon">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[14.5px] sm:text-[15px] leading-7 ink-cream-dim mb-4">
              {settings?.address || "Riverside, CA"} • Opening 2026
            </p>
            <div className="home-social-links flex gap-4 mt-auto">
              <a
                href={settings?.social?.instagram || "#"}
                target="_blank"
                rel="noreferrer"
                className="home-social-icon"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="home-social-icon" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="home-social-icon" aria-label="Twitter / X">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* CARD: Hours */}
          <div className="home-info-card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-wide ink-cream">
                HOURS.
              </h3>
              <div className="home-card-icon">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <p className="text-[14.5px] sm:text-[15px] leading-7 ink-cream-dim">
              {settings?.hours?.weekday || "Mon–Fri: 7 AM – 9 PM"}
              <br />
              {settings?.hours?.weekend || "Sat–Sun: 8 AM – 10 PM"}
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter - ENHANCED */}
      {/* Newsletter - Connected to Sanity */}
      <section className="home-newsletter mx-auto max-w-[720px] px-6 mb-32">
        <div className="home-newsletter-card text-center">
          <h3 className="text-[22px] sm:text-[24px] font-semibold tracking-wide ink-cream mb-2">
            Stay in the Loop
          </h3>
          <p className="text-[14px] ink-cream-dim mb-6">
            Get updates on our opening and for future events.
          </p>

          <NewsletterForm source="homepage" />
        </div>
      </section>

      {/* Footer - ENHANCED */}
      <footer className="home-footer text-center text-[13px] leading-6 py-12 px-5">
        <div className="max-w-[600px] mx-auto">
          <div className="text-[11px] uppercase tracking-widest mb-2 opacity-60">
            The Notebook Café
          </div>
          <div className="ink-cream-dim">
            © {new Date().getFullYear()} The Notebook Café LLC — Riverside, CA
          </div>
        </div>
      </footer>
    </main>
  );
}
