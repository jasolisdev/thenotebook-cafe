/**
 * Careers Page - The Notebook Café
 *
 * Join our team page featuring culture, open positions, and hiring process.
 */
import Reveal from "../components/ui/Reveal";
import RevealText from "../components/ui/RevealText";
import FadeInSection from "../components/ui/FadeInSection";
import { Coffee, Heart, TrendingUp, CheckCircle, Mail, ExternalLink, MapPin, DollarSign, Briefcase, Gift } from "lucide-react";
import "../styles/pages/careers.css";
import "../styles/components/application-form.css";
import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import CareersApplyForm from "@/app/components/features/CareersApplyForm";

export const metadata: Metadata = {
  title: SEO.pages.careers.title,
  description: SEO.pages.careers.description,
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: SEO.pages.careers.title,
    description: SEO.pages.careers.description,
    url: `${SEO.siteUrl}/careers`,
    images: [
      {
        url: SEO.pages.careers.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO.siteName} Careers — Riverside, CA`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.pages.careers.title,
    description: SEO.pages.careers.description,
    images: [SEO.pages.careers.ogImage],
  },
};

const INDEED_JOB_URL =
  "https://www.indeed.com/viewjob?cmp=The-Notebook-Cafe&t=Barista&jk=b440eb90eb5586f1&q=The+Notebook+Cafe&xpse=SoAZ67I3pQVIuMSJ1p0LbzkdCdPP&xfps=bc612584-8ce8-4f71-b66d-2e539b85c724&xkcb=SoDf67M3pQVJD4gNUz0KbzkdCdPP&vjs=3";

export default function CareersPage() {
  return (
    <main className="careers-page min-h-screen relative">
      <div className="careers-fixed-background" aria-hidden="true" />
      {/* Hero Section */}
      <section
        className="relative min-h-[32vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden pt-[var(--site-header-height,80px)]"
        data-section="Hero"
        style={{
          backgroundImage: 'url(/menu/tnc-menu-banner.webp)',
          backgroundColor: 'var(--color-cafe-black)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 32%',
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden="true" />
        <div className="relative z-10 text-left md:text-center px-6 w-full max-w-7xl mx-auto">
          <RevealText delay="0ms">
            <h1 className="font-serif text-4xl md:text-6xl text-cafe-cream mb-4">
              Careers
            </h1>
          </RevealText>
          <FadeInSection delay="200ms">
            <p className="text-lg md:text-xl text-cafe-cream/90">
              Join The Team, Build The Culture.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Culture Section */}
      <section
        data-section="Our Culture"
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Not Your Typical Coffee Shop
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-5xl sm:text-6xl mb-8 leading-none" style={{ color: 'var(--color-cafe-black)' }}>
                A <span className="italic" style={{ color: 'var(--color-cafe-tan)' }}>Different</span> Kind of Café
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(74, 59, 50, 0.82)' }}>
                We&apos;re locally-owned, family-oriented, and all about creating a space where people actually want to spend time. Think lofi house music, specialty coffee, fresh acai bowls, and a team that genuinely cares about the craft.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section data-section="Join Our Team" className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                We&apos;re Hiring
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 leading-none" style={{ color: 'var(--color-cafe-black)' }}>
                Join Our <span className="italic" style={{ color: 'var(--color-cafe-tan)' }}>Team</span>
              </h2>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-10">
              <Reveal delay={200}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-serif text-2xl md:text-3xl leading-tight" style={{ color: 'var(--color-cafe-black)' }}>
                      Barista Cashier
                    </h4>
                    <span
                      className="px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase font-semibold whitespace-nowrap"
                      style={{
                        border: '1.5px solid rgba(44, 36, 32, 0.55)',
                        color: 'rgba(44, 36, 32, 0.85)',
                        backgroundColor: 'rgba(250, 249, 246, 0.45)',
                      }}
                    >
                      Now Hiring
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div
                      className="p-5 rounded-2xl"
                      style={{ backgroundColor: 'rgba(250, 249, 246, 0.6)', border: '1px solid rgba(164, 141, 120, 0.18)' }}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(74, 59, 50, 0.65)' }}>
                        Quick Facts
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <DollarSign size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                          <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Pay: $17–$22/hr</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Briefcase size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                          <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Type: Full-time / Part-time</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MapPin size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                          <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Location: In person</span>
                        </li>
                      </ul>
                    </div>

                    <div
                      className="p-5 rounded-2xl"
                      style={{ backgroundColor: 'rgba(250, 249, 246, 0.6)', border: '1px solid rgba(164, 141, 120, 0.18)' }}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(74, 59, 50, 0.65)' }}>
                        Benefits
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                          <Gift size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                          <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Employee discount</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                          <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Paid sick time</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-7 pt-2">
                    <div className="space-y-3">
	                      <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>Overview</h5>
	                      <p className="font-normal leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
	                        Join our vibrant café team as a Barista Cashier. You&apos;ll greet guests, prepare drinks and café items, handle transactions, and help keep the space welcoming, clean, and running smoothly.
	                      </p>
	                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>Responsibilities</h5>
                        <ul className="space-y-2">
                          {[
                            "Greet customers warmly and take orders with professionalism",
                            "Prepare coffee beverages and food items to recipe and quality standards",
                            "Operate Clover POS and process sales accurately",
                            "Handle cash and card transactions with strong retail math",
                            "Maintain cleanliness and food safety in prep and guest areas",
                            "Move efficiently during rushes while maintaining hospitality",
                            "Restock supplies and support basic food prep as needed",
                          ].map((item) => (
                            <li key={item} className="flex gap-3 items-start">
                              <CheckCircle size={16} strokeWidth={1.6} aria-hidden="true" className="mt-[2px] flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                              <span className="font-normal text-sm sm:text-base" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>Qualifications</h5>
                        <ul className="space-y-2">
                          {[
                            "Prior barista experience or coffee knowledge preferred",
                            "POS experience (Clover, Aloha, Micros, etc.) is a plus",
                            "Strong customer service and communication skills",
                            "Comfortable multitasking in a fast-paced environment",
                            "Knowledge of food safety and food handling practices",
                            "Reliable work ethic and solid time management",
                            "Must have a California food handler card",
                          ].map((item) => (
                            <li key={item} className="flex gap-3 items-start">
                              <CheckCircle size={16} strokeWidth={1.6} aria-hidden="true" className="mt-[2px] flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                              <span className="font-normal text-sm sm:text-base" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Values Section */}
      <section
        data-section="Culture Values"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-cafe-olive)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <Reveal delay={200}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(237, 231, 216, 0.2)' }}>
                  <Heart size={28} style={{ color: 'var(--color-cafe-cream)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-cream)' }}>
                  Family Vibes
                </h3>
                <p className="font-normal leading-relaxed" style={{ color: 'rgba(237, 231, 216, 0.9)' }}>
                  Locally-owned by a husband-wife team. This is our dream, and we want to grow it with people who&apos;re passionate about what we do.
                </p>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(237, 231, 216, 0.2)' }}>
                  <Coffee size={28} style={{ color: 'var(--color-cafe-cream)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-cream)' }}>
                  Craft-Focused
                </h3>
                <p className="font-normal leading-relaxed" style={{ color: 'rgba(237, 231, 216, 0.9)' }}>
                  From espresso to acai bowls, we take pride in every detail. Learn barista skills, food prep, and the art of hospitality.
                </p>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(237, 231, 216, 0.2)' }}>
                  <TrendingUp size={28} style={{ color: 'var(--color-cafe-cream)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-cream)' }}>
                  Room to Grow
                </h3>
                <p className="font-normal leading-relaxed" style={{ color: 'rgba(237, 231, 216, 0.9)' }}>
                  This is a new café with big ambitions. Grow with us—leadership opportunities, skill development, and career advancement.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section
        data-section="Perks & Benefits"
        className="py-24 md:py-32 relative"
      >
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-center mb-16" style={{ color: 'var(--color-cafe-black)' }}>
              What We <span className="italic" style={{ color: 'var(--color-cafe-tan)' }}>Offer</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle size={24} style={{ color: 'var(--color-cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--color-cafe-black)' }}>Employee Training</h3>
                  <p className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    Comprehensive training in barista skills, food prep, customer service, and café operations.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle size={24} style={{ color: 'var(--color-cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--color-cafe-black)' }}>Flexible Scheduling</h3>
                  <p className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    We work with your schedule. Students, parents, side hustlers—we get it.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle size={24} style={{ color: 'var(--color-cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--color-cafe-black)' }}>Career Development</h3>
                  <p className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    Start as a barista, grow into a shift lead or manager. We promote from within.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle size={24} style={{ color: 'var(--color-cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--color-cafe-black)' }}>Great Vibes Daily</h3>
                  <p className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    Work to a curated lofi house soundtrack in a beautiful space with a supportive team.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section
        data-section="Hiring Process"
        className="py-24 md:py-32 relative"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Our Process
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 leading-none" style={{ color: 'var(--color-cafe-black)' }}>
                How We <span className="italic" style={{ color: 'var(--color-cafe-tan)' }}>Hire</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1: Apply */}
            <Reveal delay={150}>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-cafe-tan)', color: 'white' }}>
                  <span className="font-serif text-3xl">1</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--color-cafe-black)' }}>
                  Apply
                </h3>
                <p className="font-normal leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  If you vibe with our mission and love great coffee, we want to hear from you. Email your resume (or apply on Indeed) and the role you&apos;re applying for.
                </p>
              </div>
            </Reveal>

            {/* Step 2: Connect */}
            <Reveal delay={250}>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-cafe-tan)', color: 'white' }}>
                  <span className="font-serif text-3xl">2</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--color-cafe-black)' }}>
                  Connect
                </h3>
                <p className="font-normal leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  We&apos;ll set up a casual conversation—think of it as getting to know each other over coffee.
                </p>
              </div>
            </Reveal>

            {/* Step 3: Decision */}
            <Reveal delay={350}>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-cafe-tan)', color: 'white' }}>
                  <span className="font-serif text-3xl">3</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--color-cafe-black)' }}>
                  Decision
                </h3>
                <p className="font-normal leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  We know waiting is tough, so we move fast. We&apos;ll keep you in the loop every step of the way.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Email Application (form hidden for now) */}
      <section id="apply" data-section="Apply" className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Get Started
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-8 leading-none" style={{ color: 'var(--color-cafe-black)' }}>
                Send Your <span className="italic" style={{ color: 'var(--color-cafe-tan)' }}>Resume</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div
              className="p-6 sm:p-8 md:p-12 rounded-3xl shadow-[0_14px_40px_rgba(44,36,32,0.08)]"
              style={{
                backgroundColor: 'rgba(250, 249, 246, 0.85)',
                border: '2px solid rgba(164, 141, 120, 0.14)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-start">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}
                    >
                      <Mail size={20} style={{ color: 'var(--color-cafe-tan)' }} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--color-cafe-tan)' }}>
                      Careers
                    </span>
                  </div>

                  <p className="text-base md:text-lg font-normal leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    Send your resume and a quick note. We&apos;ll reply to qualified candidates within 3–5 business days.
                  </p>

                  <ul className="space-y-4">
                    {[
                      "Contact details + role interest",
                      "Availability",
                      "Resume + optional application",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <CheckCircle
                          size={18}
                          strokeWidth={1.6}
                          aria-hidden="true"
                          className="mt-[2px] flex-shrink-0"
                          style={{ color: 'rgba(74, 59, 50, 0.55)' }}
                        />
                        <span className="font-normal text-sm sm:text-base" style={{ color: 'rgba(74, 59, 50, 0.82)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Mail size={18} strokeWidth={1.8} style={{ color: 'var(--color-cafe-tan)' }} />
                      <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                        Quick Apply
                      </span>
                    </div>
                    <CareersApplyForm />
                  </div>

                  <a
                    href={INDEED_JOB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 px-6 sm:px-10 py-4 rounded-full font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-xs sm:text-sm transition-transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'rgba(250, 249, 246, 0.55)',
                      color: 'rgba(44, 36, 32, 0.9)',
                      textDecoration: 'none',
                      border: '1.5px solid rgba(44, 36, 32, 0.35)',
                    }}
                  >
                    <ExternalLink size={18} strokeWidth={1.8} />
                    Apply on Indeed
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
