/* eslint-disable @next/next/no-img-element */
/**
 * Story Page - The Notebook Café
 *
 * About page featuring the café's story, values, and mission.
 */
import { client } from "@/sanity/lib/client";
import ScrollReveal from "../components/layout/ScrollReveal";
import AboutFloatingItems from "../components/decorative/AboutFloatingItems";
import SiteFooter from "../components/layout/SiteFooter";
import { CoffeeIcon, EqIcon, NoteIcon } from "../components/ui/Icons";

type PortableChild = { text?: string };
type PortableBlock = { _type?: string; children?: PortableChild[] };

/** Fetch "aboutPage" + "settings" from Sanity */
async function getAboutData() {
  const [about, settings] = await Promise.all([
    client.fetch(`*[_type=="aboutPage"][0]{
      title, body, valuesHeading, valuesBullets, missionHeading, founderNote
    }`),
    client.fetch(`*[_type=="settings"][0]{
      social{ instagram, spotify }
    }`),
  ]);
  return { about, settings };
}

/** Very small portable text renderer */
function PT({ body }: { body: PortableBlock[] }) {
  if (!body) return null;
  return (
    <div className="space-y-4 leading-7 text-[15px]" style={{ color: 'var(--coffee-bean)' }}>
      {body.map((b: PortableBlock, i: number) =>
        b._type === "block" ? (
          <p key={i}>{b.children?.map((c: PortableChild) => c.text || "").join("")}</p>
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
    <main className="site-layout">
      <ScrollReveal />

      {/* HERO SECTION - DARK */}
      <section className="about-hero text-center px-5 pt-[60px] pb-10 relative">
        <AboutFloatingItems variant="hero" />
        <h1 className="scroll-reveal text-[38px] sm:text-[48px] md:text-[60px] font-medium uppercase tracking-[1.5px] mb-6" style={{ animationDelay: '0.1s', color: 'rgba(164,131,116,0.9)' }}>
          Our Story
        </h1>
        <p className="scroll-reveal about-hero-subtitle mt-5 max-w-[68ch] mx-auto text-[16px] sm:text-[17px] leading-relaxed" style={{ animationDelay: '0.3s', color: 'var(--ink-cream-dim)' }}>
          The Notebook Café is a house-music-driven coffee space rooted in
          Riverside — where music meets craft.
        </p>
      </section>

      {/* Wavy divider - transition to cream */}
      <div className="divider-cream" style={{ transform: 'scaleY(-1)' }}>
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* CREAM SECTION - Body Copy */}
      <section className="section-cream pt-16 sm:pt-20 pb-16 sm:pb-20 px-5 relative">
        <AboutFloatingItems variant="body" />
        <div className="scroll-reveal about-body-card mx-auto max-w-[72ch]" style={{ animationDelay: '0.1s', color: '#2a1f16' }}>
          {about?.body ? (
            <PT body={about.body} />
          ) : (
            <p className="text-[15.5px] leading-relaxed" style={{ color: '#2a1f16' }}>
              We&apos;re building a place to slow down, create, meet up, and feel
              inspired — like your favorite listening room and your favorite
              espresso bar had a kid.
            </p>
          )}
        </div>
      </section>

      {/* OUR RIVERSIDE COMMITMENT Section */}
      <section className="section-cream px-5 pb-16 sm:pb-20">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal welcome-section-label mb-8" style={{ animationDelay: '0.1s' }}>
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">Our Riverside Commitment</span>
            <div className="welcome-divider-line"></div>
          </div>

          <div className="scroll-reveal mx-auto max-w-[700px] text-center" style={{ animationDelay: '0.2s' }}>
            <p className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: '#2a1f16' }}>
              We chose the vibrant intersection of University Ave and Orange St because it sits at the cross-section of culture, commerce, and creativity. The Notebook Cafe is built to be a true community anchor for students, creatives, and locals—a peaceful hub to find your flow.
            </p>
          </div>
        </div>
      </section>

      {/* THE CRAFT & THE RHYTHM Section */}
      <section className="section-cream px-5 pb-16 sm:pb-20">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal welcome-section-label mb-8" style={{ animationDelay: '0.1s' }}>
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">The Craft & The Rhythm</span>
            <div className="welcome-divider-line"></div>
          </div>

          <div className="scroll-reveal mx-auto max-w-[700px] text-center" style={{ animationDelay: '0.2s' }}>
            <p className="text-[15px] sm:text-[16px] leading-relaxed mb-4" style={{ color: '#2a1f16' }}>
              Our mission extends beyond the cup. We ensure our specialty espresso is ethically sourced and roasted right, prepared on state-of-the-art equipment for consistent, perfect texture. We treat every step of the brewing process with respect.
            </p>
            <p className="text-[13px] italic" style={{ color: 'var(--taupe)' }}>
              Coffee roaster: [TBD - need info from BIL]
            </p>
          </div>
        </div>
      </section>

      {/* CREAM SECTION - Values */}
      <section className="section-cream px-5 pb-16 sm:pb-20">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal welcome-section-label mb-8" style={{ animationDelay: '0.1s' }}>
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text">{about?.valuesHeading || "What we're building"}</span>
            <div className="welcome-divider-line"></div>
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
                <div className="text-[15px] leading-relaxed" style={{ color: '#2a1f16' }}>{t}</div>
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
      <section className="section-dark px-5 py-20 sm:py-24 lg:py-28 relative">
        <AboutFloatingItems variant="mission" />
        <div className="mx-auto max-w-[820px]">
          <div className="scroll-reveal welcome-section-label mb-8" style={{ animationDelay: '0.1s' }}>
            <div className="welcome-divider-line"></div>
            <span className="welcome-label-text text-light">{about?.missionHeading || "Why we&apos;re doing this"}</span>
            <div className="welcome-divider-line"></div>
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
