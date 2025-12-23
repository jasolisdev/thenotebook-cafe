/**
 * Careers Page - The Notebook Café
 *
 * Join our team page featuring culture, open positions, and hiring process.
 */
import Reveal from "../components/ui/Reveal";
import RevealText from "../components/ui/RevealText";
import FadeInSection from "../components/ui/FadeInSection";
import { CheckCircle, Mail, ExternalLink } from "lucide-react";
import "../styles/pages/careers.css";
import "../styles/components/application-form.css";
import type { Metadata } from "next";
import { SEO } from "@/lib/seo";
import CareersApplyForm from "@/app/components/features/CareersApplyForm";
import JobPosition from "@/app/components/features/JobPosition";

export const metadata: Metadata = {
  title: SEO.pages.careers.title,
  description: SEO.pages.careers.description,
  alternates: {
    canonical: "/careers",
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
          <RevealText delay="0ms">
            <h1 className="font-serif text-4xl md:text-6xl text-cafe-cream mb-4">
              Careers
            </h1>
          </RevealText>
          <FadeInSection delay="200ms">
            <p className="font-serif italic text-lg md:text-2xl text-cafe-cream/90 drop-shadow-sm">
              Join The Team, Build The Culture.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Culture Section */}
      <section
        data-section="Our Culture"
        className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Not Your Typical Coffee Shop
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2
                className="font-dm-serif font-bold text-5xl sm:text-6xl mb-8 leading-none"
                style={{ color: "var(--color-cafe-black)" }}
              >
                A{" "}
                <span
                  className="italic"
                  style={{ color: "var(--color-cafe-tan)" }}
                >
                  Different
                </span>{" "}
                Kind of Café
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p
                className="text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto"
                style={{ color: "rgba(74, 59, 50, 0.82)" }}
              >
                We&apos;re locally-owned, family-oriented, and all about
                creating a space where people actually want to spend time. Think
                lofi house music, specialty coffee, fresh acai bowls, and a team
                that genuinely cares about the craft.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section
        data-section="Join Our Team"
        className="pt-12 pb-24 md:pt-16 md:pb-32 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Position Status
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-dm-serif font-bold text-4xl md:text-6xl lg:text-7xl mb-8 leading-none"
                style={{ color: "var(--color-cafe-black)" }}
              >
                Join Our{" "}
                <span
                  className="italic"
                  style={{ color: "var(--color-cafe-tan)" }}
                >
                  Team
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-10">
              <Reveal delay={200}>
                <JobPosition
                  title="Barista Cashier"
                  status="Hiring Paused"
                  payRange="$17–$22/hr"
                  type="Full-time / Part-time"
                  location="In person"
                  overview="Join our vibrant café team as a Barista Cashier. You'll greet guests, prepare drinks and café items, handle transactions, and help keep the space welcoming, clean, and running smoothly."
                  responsibilities={[
                    "Greet customers warmly and take orders with professionalism",
                    "Prepare coffee beverages and food items to recipe and quality standards",
                    "Operate Clover POS and process sales accurately",
                    "Handle cash and card transactions with strong retail math",
                    "Maintain cleanliness and food safety in prep and guest areas",
                    "Move efficiently during rushes while maintaining hospitality",
                    "Restock supplies and support basic food prep as needed",
                  ]}
                  qualifications={[
                    "Prior barista experience or coffee knowledge preferred",
                    "POS experience (Clover, Aloha, Micros, etc.) is a plus",
                    "Strong customer service and communication skills",
                    "Comfortable multitasking in a fast-paced environment",
                    "Knowledge of food safety and food handling practices",
                    "Reliable work ethic and solid time management",
                    "Must have a California food handler card",
                  ]}
                  benefits={["Employee discount", "Paid sick time"]}
                />
              </Reveal>
            </div>
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
            <h2
              className="font-dm-serif font-bold text-4xl md:text-5xl text-center mb-16"
              style={{ color: "var(--color-cafe-black)" }}
            >
              What We{" "}
              <span
                className="italic"
                style={{ color: "var(--color-cafe-tan)" }}
              >
                Offer
              </span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle
                  size={24}
                  style={{ color: "var(--color-cafe-tan)", flexShrink: 0 }}
                  strokeWidth={1.5}
                />
                <div>
                  <h3
                    className="font-serif text-xl mb-2"
                    style={{ color: "var(--color-cafe-black)" }}
                  >
                    Employee Training
                  </h3>
                  <p
                    className="font-normal"
                    style={{ color: "rgba(74, 59, 50, 0.85)" }}
                  >
                    Comprehensive training in barista skills, food prep,
                    customer service, and café operations.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle
                  size={24}
                  style={{ color: "var(--color-cafe-tan)", flexShrink: 0 }}
                  strokeWidth={1.5}
                />
                <div>
                  <h3
                    className="font-serif text-xl mb-2"
                    style={{ color: "var(--color-cafe-black)" }}
                  >
                    Flexible Scheduling
                  </h3>
                  <p
                    className="font-normal"
                    style={{ color: "rgba(74, 59, 50, 0.85)" }}
                  >
                    We work with your schedule. Students, parents, side
                    hustlers—we get it.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle
                  size={24}
                  style={{ color: "var(--color-cafe-tan)", flexShrink: 0 }}
                  strokeWidth={1.5}
                />
                <div>
                  <h3
                    className="font-serif text-xl mb-2"
                    style={{ color: "var(--color-cafe-black)" }}
                  >
                    Career Development
                  </h3>
                  <p
                    className="font-normal"
                    style={{ color: "rgba(74, 59, 50, 0.85)" }}
                  >
                    Start as a barista, grow into a shift lead or manager. We
                    promote from within.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="flex gap-4 p-6 rounded-2xl">
                <CheckCircle
                  size={24}
                  style={{ color: "var(--color-cafe-tan)", flexShrink: 0 }}
                  strokeWidth={1.5}
                />
                <div>
                  <h3
                    className="font-serif text-xl mb-2"
                    style={{ color: "var(--color-cafe-black)" }}
                  >
                    Great Vibes Daily
                  </h3>
                  <p
                    className="font-normal"
                    style={{ color: "rgba(74, 59, 50, 0.85)" }}
                  >
                    Work to a curated lofi house soundtrack in a beautiful space
                    with a supportive team.
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
              <h2
                className="font-dm-serif font-bold text-4xl md:text-6xl lg:text-7xl mb-8 leading-none"
                style={{ color: "var(--color-cafe-black)" }}
              >
                How We{" "}
                <span
                  className="italic"
                  style={{ color: "var(--color-cafe-tan)" }}
                >
                  Hire
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1: Apply */}
            <Reveal delay={150}>
              <div className="text-center space-y-4">
                <div
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "var(--color-cafe-tan)",
                    color: "white",
                  }}
                >
                  <span className="font-serif text-3xl">1</span>
                </div>
                <h3
                  className="font-serif text-2xl md:text-3xl"
                  style={{ color: "var(--color-cafe-black)" }}
                >
                  Apply
                </h3>
                <p
                  className="font-normal leading-relaxed"
                  style={{ color: "rgba(74, 59, 50, 0.85)" }}
                >
                  If you vibe with our mission and love great coffee, we want to
                  hear from you. Email your resume (or apply on Indeed).
                </p>
              </div>
            </Reveal>

            {/* Step 2: Connect */}
            <Reveal delay={250}>
              <div className="text-center space-y-4">
                <div
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "var(--color-cafe-tan)",
                    color: "white",
                  }}
                >
                  <span className="font-serif text-3xl">2</span>
                </div>
                <h3
                  className="font-serif text-2xl md:text-3xl"
                  style={{ color: "var(--color-cafe-black)" }}
                >
                  Connect
                </h3>
                <p
                  className="font-normal leading-relaxed"
                  style={{ color: "rgba(74, 59, 50, 0.85)" }}
                >
                  We&apos;ll set up a casual conversation—think of it as getting
                  to know each other over coffee.
                </p>
              </div>
            </Reveal>

            {/* Step 3: Decision */}
            <Reveal delay={350}>
              <div className="text-center space-y-4">
                <div
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "var(--color-cafe-tan)",
                    color: "white",
                  }}
                >
                  <span className="font-serif text-3xl">3</span>
                </div>
                <h3
                  className="font-serif text-2xl md:text-3xl"
                  style={{ color: "var(--color-cafe-black)" }}
                >
                  Decision
                </h3>
                <p
                  className="font-normal leading-relaxed"
                  style={{ color: "rgba(74, 59, 50, 0.85)" }}
                >
                  We know waiting is tough, so we move fast. We&apos;ll keep you
                  in the loop every step of the way.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Email Application (form hidden for now) */}
      <section
        id="apply"
        data-section="Apply"
        className="py-24 md:py-32 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Status Update
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-dm-serif font-bold text-4xl md:text-6xl lg:text-7xl mb-8 leading-none"
                style={{ color: "var(--color-cafe-black)" }}
              >
                Application{" "}
                <span
                  className="italic"
                  style={{ color: "var(--color-cafe-tan)" }}
                >
                  Update
                </span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <div className="max-w-2xl mx-auto bg-amber-50/50 border border-amber-100 rounded-2xl p-6 md:p-8">
                <p className="text-lg text-cafe-brown font-medium">
                  We are currently reviewing applications and are not accepting
                  new submissions at this time.
                </p>
                <p className="text-cafe-brown/70 mt-2">
                  Please check back later for future opportunities!
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div
              className="p-6 sm:p-8 md:p-12 rounded-3xl shadow-[0_14px_40px_rgba(44,36,32,0.08)] opacity-60 pointer-events-none select-none grayscale-[0.5]"
              style={{
                backgroundColor: "rgba(250, 249, 246, 0.85)",
                border: "2px solid rgba(164, 141, 120, 0.14)",
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-start">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(164, 141, 120, 0.12)" }}
                    >
                      <Mail
                        size={20}
                        style={{ color: "var(--color-cafe-tan)" }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className="text-xs uppercase tracking-[0.2em] font-bold"
                      style={{ color: "var(--color-cafe-tan)" }}
                    >
                      Careers
                    </span>
                  </div>

                  <p
                    className="text-base md:text-lg font-normal leading-relaxed"
                    style={{ color: "rgba(74, 59, 50, 0.85)" }}
                  >
                    Send your resume and a quick note. We&rsquo;ll reply to
                    qualified candidates within 3–5 business days. We&rsquo;re
                    always looking for friendly souls to join our morning
                    rituals.
                  </p>

                  <ul className="space-y-4">
                    {[
                      "Contact details + role interest",
                      "Availability",
                      "Resume + Job Application",
                    ].map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <CheckCircle
                          size={18}
                          strokeWidth={1.6}
                          aria-hidden="true"
                          className="mt-[2px] flex-shrink-0"
                          style={{ color: "rgba(74, 59, 50, 0.55)" }}
                        />
                        <span
                          className="font-normal text-sm sm:text-base"
                          style={{ color: "rgba(74, 59, 50, 0.82)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Mail
                        size={18}
                        strokeWidth={1.8}
                        style={{ color: "var(--color-cafe-tan)" }}
                      />
                      <span
                        className="text-xs uppercase tracking-[0.2em] font-bold"
                        style={{ color: "rgba(74, 59, 50, 0.7)" }}
                      >
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
                      backgroundColor: "rgba(250, 249, 246, 0.55)",
                      color: "rgba(44, 36, 32, 0.9)",
                      textDecoration: "none",
                      border: "1.5px solid rgba(44, 36, 32, 0.35)",
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
