// app/about/page.tsx
import { client } from "@/sanity/lib/client";
import SiteHeader from "../components/SiteHeader";
import ScrollReveal from "../components/ScrollReveal";
import AboutFloatingItems from "../components/AboutFloatingItems";
import SiteFooter from "../components/SiteFooter";
import AnnouncementBanner from "../components/AnnouncementBanner";
import { CoffeeIcon, EqIcon, NoteIcon } from "../components/Icons";

/** Fetch "aboutPage" + "settings" from Sanity */
async function getAboutData() {
  const [about, settings] = await Promise.all([
    client.fetch(`*[_type=="aboutPage"][0]{
      title, body, valuesHeading, valuesBullets, missionHeading, founderNote
    }`),
    client.fetch(`*[_type=="settings"][0]{
      social{ instagram }
    }`),
  ]);
  return { about, settings };
}

/** Very small portable text renderer */
function PT({ body }: { body: any[] }) {
  if (!body) return null;
  return (
    <div className="space-y-4 leading-7 text-[15px] text-[#2a1f16]">
      {body.map((b: any, i: number) =>
        b._type === "block" ? (
          <p key={i}>{b.children?.map((c: any) => c.text).join("")}</p>
        ) : null,
      )}
    </div>
  );
}

export default async function AboutPage() {
  const { about, settings } = await getAboutData();

  const bullets = about?.valuesBullets ?? [
    "A café that plays house, soul, and groove — not top 40 radio.",
    "A space you can actually sit in. Stay, settle, think, create.",
    "Coffee treated with respect — from beans to texture.",
    "A Riverside original — for locals and creatives alike.",
  ];

  return (
    <main className="page-dark">
      <ScrollReveal />
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Fixed dark nav */}
      <div className="nav-glass-wrap">
        <div className="nav-glass">
          <SiteHeader instagramUrl={settings?.social?.instagram} />
        </div>
      </div>

      {/* HERO SECTION - DARK */}
      <section className="about-hero text-center px-5 pt-[60px] pb-10 relative">
        <AboutFloatingItems variant="hero" />
        <h1 className="scroll-reveal text-[38px] sm:text-[48px] md:text-[60px] font-medium uppercase tracking-[1.5px] mb-6" style={{ animationDelay: '0.1s', color: 'rgba(201, 154, 88, 0.9)' }}>
          Our Story
        </h1>
        <p className="scroll-reveal about-hero-subtitle mt-5 ink-cream-dim max-w-[68ch] mx-auto text-[16px] sm:text-[17px] leading-relaxed" style={{ animationDelay: '0.3s' }}>
          The Notebook Café is a house-music-driven coffee space rooted in
          Riverside — where music meets craft.
        </p>
      </section>

      {/* Wavy divider - transition to cream */}
      <div className="divider-cream" style={{ transform: 'scaleY(-1)' }}>
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* CREAM SECTION - Body Copy */}
      <section className="section-cream pt-8 pb-16 px-5 relative">
        <AboutFloatingItems variant="body" />
        <div className="scroll-reveal about-body-card mx-auto max-w-[72ch]" style={{ animationDelay: '0.1s' }}>
          {about?.body ? (
            <PT body={about.body} />
          ) : (
            <p className="text-[#2a1f16] text-[15.5px] leading-relaxed">
              We're building a place to slow down, create, meet up, and feel
              inspired — like your favorite listening room and your favorite
              espresso bar had a kid.
            </p>
          )}
        </div>
      </section>

      {/* CREAM SECTION - Values */}
      <section className="section-cream px-5 pb-20">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal about-section-label text-center mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.15)] border border-[rgba(201,154,88,0.25)] text-[11px] uppercase tracking-[2px] text-[rgba(201,154,88,0.95)]">
              {about?.valuesHeading || "What we're building"}
            </span>
          </div>

          <div className="about-values-grid grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {bullets.map((t: string, i: number) => (
              <div
                key={i}
                className="scroll-reveal about-value-card"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="about-value-icon">
                  {i === 0 ? <CoffeeIcon /> : i === 1 ? <EqIcon /> : <NoteIcon />}
                </div>
                <div className="text-[#2a1f16] text-[15px] leading-relaxed">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wavy divider - back to dark */}
      <div className="divider-cream">
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* DARK SECTION - Mission */}
      <section className="section-dark px-5 py-20 relative">
        <AboutFloatingItems variant="mission" />
        <div className="mx-auto max-w-[820px]">
          <div className="scroll-reveal about-section-label text-center mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.08)] border border-[rgba(201,154,88,0.2)] text-[11px] uppercase tracking-[2px] ink-cream">
              {about?.missionHeading || "Why we're doing this"}
            </span>
          </div>

          <div className="scroll-reveal about-mission-card" style={{ animationDelay: '0.2s' }}>
            <div className="about-mission-accent" />
            <p className="whitespace-pre-line ink-cream text-[16px] leading-[1.8] relative z-10">
              {about?.founderNote ||
                `We're building a spot where people who care about taste — in coffee, in music, in atmosphere — can actually hang.

A space that feels like Riverside, made for locals, creatives, and anyone who loves good energy.`}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
