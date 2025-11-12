// app/about/page.tsx
import { client } from "@/sanity/lib/client";
import SiteHeader from "../components/SiteHeader";
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
    <div className="space-y-4 leading-7 text-[15px] ink-cream-dim">
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
      {/* Fixed dark nav */}
      <div className="nav-glass-wrap">
        <div className="nav-glass">
          <SiteHeader instagramUrl={settings?.social?.instagram} />
        </div>
      </div>

      {/* Hero (text only) - ENHANCED */}
      <section className="about-hero text-center px-5 pt-[120px] pb-16">
        <div className="about-hero-badge">Our Story</div>
        <h1 className="about-hero-title text-[38px] sm:text-[48px] md:text-[60px] font-semibold ink-cream">
        </h1>
        <p className="about-hero-subtitle mt-5 ink-cream-dim max-w-[68ch] mx-auto text-[16px] sm:text-[17px] leading-relaxed">
          The Notebook Café is a house-music-driven coffee space rooted in
          Riverside — where music meets craft.
        </p>
      </section>

      {/* Body copy - ENHANCED */}
      <section className="px-5 pb-14">
        <div className="about-body-card mx-auto max-w-[72ch]">
          {about?.body ? (
            <PT body={about.body} />
          ) : (
            <p className="ink-cream-dim text-[15.5px] leading-relaxed">
              We're building a place to slow down, create, meet up, and feel
              inspired — like your favorite listening room and your favorite
              espresso bar had a kid.
            </p>
          )}
        </div>
      </section>

      {/* Values - ENHANCED */}
      <section className="px-5 pb-10">
        <div className="mx-auto max-w-[880px]">
          <div className="about-section-label text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.08)] border border-[rgba(201,154,88,0.2)] text-[11px] uppercase tracking-[2px] ink-cream">
              {about?.valuesHeading || "What we're building"}
            </span>
          </div>

          <div className="about-values-grid grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {bullets.map((t: string, i: number) => (
              <div
                key={i}
                className="about-value-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="about-value-icon">
                  {i === 0 ? <CoffeeIcon /> : i === 1 ? <EqIcon /> : <NoteIcon />}
                </div>
                <div className="ink-cream text-[15px] leading-relaxed">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider - ENHANCED */}
      <div className="my-14 mx-auto max-w-[760px] px-5">
        <div className="about-divider" />
      </div>

      {/* Mission / founder note - ENHANCED */}
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-[820px]">
          <div className="about-section-label text-center mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.08)] border border-[rgba(201,154,88,0.2)] text-[11px] uppercase tracking-[2px] ink-cream">
              {about?.missionHeading || "Why we're doing this"}
            </span>
          </div>

          <div className="about-mission-card">
            <div className="about-mission-accent" />
            <p className="whitespace-pre-line ink-cream text-[16px] leading-[1.8] relative z-10">
              {about?.founderNote ||
                `We're building a spot where people who care about taste — in coffee, in music, in atmosphere — can actually hang.

A space that feels like Riverside, made for locals, creatives, and anyone who loves good energy.`}
            </p>
          </div>
        </div>
      </section>

      {/* Footer - ENHANCED */}
      <footer className="about-footer text-center text-[13px] leading-6 py-12 px-5">
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
