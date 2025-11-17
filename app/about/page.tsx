// app/about/page.tsx
import { client } from "@/sanity/lib/client";
import SiteHeader from "../components/SiteHeader";
import ScrollReveal from "../components/ScrollReveal";
import AboutFloatingItems from "../components/AboutFloatingItems";
import SiteFooter from "../components/SiteFooter";
// import AnnouncementBanner from "../components/AnnouncementBanner";
import Image from "next/image";

/** Fetch settings from Sanity */
async function getAboutData() {
  const settings = await client.fetch(`*[_type=="settings"][0]{
    social{ instagram, spotify }
  }`);
  return { settings };
}

export default async function AboutPage() {
  const { settings } = await getAboutData();

  return (
    <main className="page-dark">
      <ScrollReveal />
      {/* Announcement Banner - COMMENTED OUT FOR TESTING */}
      {/* <AnnouncementBanner /> */}

      {/* Fixed dark nav */}
      <SiteHeader
        instagramUrl={settings?.social?.instagram}
        spotifyUrl={settings?.social?.spotify}
      />

      {/* HERO SECTION - DARK */}
      <section className="about-hero text-center px-5 pt-[60px] pb-10 relative">
        <AboutFloatingItems variant="hero" />
        <h1 className="scroll-reveal text-[38px] sm:text-[48px] md:text-[60px] font-medium uppercase tracking-[1.5px] mb-6" style={{ animationDelay: '0.1s', color: 'rgba(201, 154, 88, 0.9)' }}>
          Our Story
        </h1>
        <p className="scroll-reveal about-hero-subtitle mt-5 ink-cream-dim max-w-[68ch] mx-auto text-[16px] sm:text-[17px] leading-relaxed" style={{ animationDelay: '0.3s' }}>
          The Notebook Café is a house-music–driven coffee space rooted in Riverside — where craft, culture, and atmosphere meet. We're building a place to slow down, connect, and feel inspired.
        </p>
      </section>

      {/* Wavy divider - transition to cream */}
      <div className="divider-cream" style={{ transform: 'scaleY(-1)' }}>
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* CREAM SECTION - Image 1 */}
      <section className="section-cream pt-12 pb-8 px-5 relative">
        <AboutFloatingItems variant="body" />
        <div className="scroll-reveal mx-auto max-w-[900px]" style={{ animationDelay: '0.1s' }}>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522204502582-0ecf9f1e2014"
              alt="Moody warm coffee shop interior with soft lighting"
              width={900}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* OUR RIVERSIDE COMMITMENT Section */}
      <section className="section-cream px-5 pb-12">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal about-section-label text-center mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.15)] border border-[rgba(201,154,88,0.25)] text-[11px] uppercase tracking-[2px] text-[rgba(201,154,88,0.95)]">
              Our Riverside Commitment
            </span>
          </div>

          <div className="scroll-reveal mx-auto max-w-[700px] text-center" style={{ animationDelay: '0.2s' }}>
            <p className="text-[#2a1f16] text-[15px] sm:text-[16px] leading-relaxed">
              We chose the intersection of University Ave and Orange St because it sits at the cross-section of culture, creativity, and community. Our goal is to be a calm anchor in downtown Riverside — a place where students, creatives, and locals find their flow.
            </p>
          </div>
        </div>
      </section>

      {/* Image 2 - Downtown Street */}
      <section className="section-cream px-5 pb-12 relative">
        <div className="scroll-reveal mx-auto max-w-[900px]" style={{ animationDelay: '0.1s' }}>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
              alt="Downtown street at golden hour with warm tones"
              width={900}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* THE CRAFT & THE RHYTHM Section */}
      <section className="section-cream px-5 pb-12">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal about-section-label text-center mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.15)] border border-[rgba(201,154,88,0.25)] text-[11px] uppercase tracking-[2px] text-[rgba(201,154,88,0.95)]">
              The Craft & The Rhythm
            </span>
          </div>

          <div className="scroll-reveal mx-auto max-w-[700px] text-center space-y-4" style={{ animationDelay: '0.2s' }}>
            <p className="text-[#2a1f16] text-[15px] sm:text-[16px] leading-relaxed">
              From ethically sourced beans to precise brewing, we treat every detail with care. Our espresso is crafted on state-of-the-art equipment to bring out depth, texture, and consistency.
            </p>
            <p className="text-[#2a1f16] text-[15px] sm:text-[16px] leading-relaxed">
              The same intention shapes our atmosphere: warm lighting, low-end house music, and a room tuned for conversation and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING Section */}
      <section className="section-cream px-5 pb-12">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal about-section-label text-center mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.15)] border border-[rgba(201,154,88,0.25)] text-[11px] uppercase tracking-[2px] text-[rgba(201,154,88,0.95)]">
              What We're Building
            </span>
          </div>

          <div className="scroll-reveal mx-auto max-w-[700px] text-center space-y-4" style={{ animationDelay: '0.2s' }}>
            <p className="text-[#2a1f16] text-[15px] sm:text-[16px] leading-relaxed">
              A café that feels like your favorite listening room and your favorite espresso bar had a kid.
            </p>
            <p className="text-[#2a1f16] text-[15px] sm:text-[16px] leading-relaxed">
              A space to sit, think, settle, and create.
            </p>
            <p className="text-[#2a1f16] text-[15px] sm:text-[16px] leading-relaxed">
              A Riverside original — made for locals and creatives who love good energy, good music, and good coffee.
            </p>
          </div>
        </div>
      </section>

      {/* Image 3 - Espresso Shot */}
      <section className="section-cream px-5 pb-16 relative">
        <div className="scroll-reveal mx-auto max-w-[900px]" style={{ animationDelay: '0.1s' }}>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348"
              alt="Close-up of espresso shot pouring from portafilter"
              width={900}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDERS Section */}
      <section className="section-cream px-5 pb-16">
        <div className="mx-auto max-w-[880px]">
          <div className="scroll-reveal about-section-label text-center mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-[rgba(201,154,88,0.15)] border border-[rgba(201,154,88,0.25)] text-[11px] uppercase tracking-[2px] text-[rgba(201,154,88,0.95)]">
              Meet the Founders
            </span>
          </div>

          {/* Barista Image */}
          <div className="scroll-reveal mx-auto max-w-[700px] mb-8" style={{ animationDelay: '0.15s' }}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
                alt="Barista preparing espresso behind the counter"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="scroll-reveal mx-auto max-w-[700px] text-center" style={{ animationDelay: '0.2s' }}>
            <p className="text-[#2a1f16] text-[15px] sm:text-[16px] leading-relaxed">
              The Notebook Café was created by family — built from a shared love of great espresso, warm spaces, and the soulful rhythm of house music. We wanted to bring Riverside a café that feels personal, intentional, and rooted in real craft.
            </p>
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
              Why We're Doing This
            </span>
          </div>

          <div className="scroll-reveal about-mission-card" style={{ animationDelay: '0.2s' }}>
            <div className="about-mission-accent" />
            <p className="whitespace-pre-line ink-cream text-[16px] leading-[1.8] relative z-10">
              We're building a spot where people who care about taste — in coffee, in music, in atmosphere — can actually hang.

A space that feels like Riverside, made for locals, creatives, and anyone who loves good energy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
