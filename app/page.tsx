import { client } from "@/sanity/lib/client";
import SiteHeader from "./components/SiteHeader";
import Image from "next/image";

/**
 * Fetch homepage + settings data from Sanity
 */
async function getData() {
  const [home, settings] = await Promise.all([
    client.fetch(`*[_type == "homePage"][0]{
      heroHeadline,
      heroTagline,
      statusLine,
      ctaText,
      ctaUrl,
      whatToExpectBullets,
      vibeCopy,
      heroImage{
        asset->{ url },
        alt
      }
    }`),
    client.fetch(`*[_type == "settings"][0]{
      social { instagram },
      announcementBanner { isActive, text }
    }`),
  ]);

  return { home, settings };
}

export default async function HomePage() {
  const { home, settings } = await getData();

  return (
    <main className="relative min-h-screen text-neutral-100 flex flex-col">
      {/* --- Background gradient layers (dark / brass / olive vibe) --- */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "#0f0f0f",
          backgroundImage: `
            radial-gradient(circle at 40% 30%, rgba(182,138,58,0.18) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(32,36,29,0.6) 0%, rgba(15,15,15,0) 70%)
          `,
        }}
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.9)",
        }}
      />

      {/* --- Header / Nav --- */}
      <SiteHeader instagramUrl={settings?.social?.instagram} />

      {/* --- Announcement banner --- */}
      {settings?.announcementBanner?.isActive &&
        settings?.announcementBanner?.text && (
          <div className="w-full flex justify-center px-5 sm:px-8 md:px-10 pb-2">
            <div className="text-[0.7rem] leading-tight text-neutral-200 bg-[rgba(28,28,28,0.8)] border border-[rgba(120,120,120,0.4)] px-4 py-1 rounded-full backdrop-blur-sm text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {settings.announcementBanner.text}
            </div>
          </div>
        )}

      {/* --- Hero Content --- */}
      <div className="flex-1 flex flex-col items-center text-center px-5 sm:px-8 md:px-10 pb-24 sm:pb-32 pt-8 sm:pt-12 max-w-[680px] w-full mx-auto">
        <section className="w-full flex flex-col items-center gap-6">
          <div className="space-y-4">
            {/* --- Logo from Sanity or fallback headline text --- */}
            {home?.heroImage?.asset?.url ? (
              <div className="flex justify-center">
                <Image
                  src={home.heroImage.asset.url}
                  alt={
                    home.heroImage.alt ||
                    home.heroHeadline ||
                    "The Notebook Café"
                  }
                  width={600}
                  height={600}
                  className={`
                    object-contain
                    drop-shadow-[0_0_15px_rgba(182,138,58,0.3)]
                    transition-all duration-300
                    w-[180px] max-h-[180px]
                    sm:w-[220px] sm:max-h-[220px]
                    md:w-[240px] md:max-h-[240px]
                    lg:w-[260px] lg:max-h-[260px]
                  `}
                  priority
                />
              </div>
            ) : (
              <h1 className="font-semibold text-white tracking-tight text-[2rem] leading-[1.15] sm:text-[2.5rem] md:text-[3rem]">
                {home?.heroHeadline || "The Notebook Café"}
              </h1>
            )}

            {/* --- Tagline --- */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-[32ch] mx-auto">
              {home?.heroTagline || "Coffee. Culture. House Music."}
            </p>

            {/* --- Status line ("☕ Coming Soon ☕") --- */}
            <div className="text-[1.5rem] text-neutral-400 font-light tracking-wide">
              {home?.statusLine ? (
                home.statusLine
              ) : (
                <>
                  <span className="text-neutral-200">☕</span> Coming Soon{" "}
                  <span className="text-neutral-200">☕</span>
                </>
              )}
            </div>
          </div>

          {/* CTA Button */}
          {home?.ctaText && home?.ctaUrl && (
            <a
              href={home.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full text-sm font-medium px-5 py-2.5
                         bg-[rgba(20,20,20,0.6)]
                         text-neutral-200
                         border border-[rgba(182,138,58,0.4)]
                         shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                         hover:bg-[rgba(30,30,30,0.75)]
                         hover:border-[rgba(182,138,58,0.6)]
                         hover:text-white
                         transition-colors duration-150"
            >
              {home.ctaText}
            </a>
          )}
        </section>

        {/* Divider */}
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-neutral-600/40 to-transparent my-10" />

        {/* Highlights / Bullets */}
        <section className="w-full space-y-6 text-neutral-300">
          <ul className="text-sm sm:text-base space-y-3 font-light">
            {(
              home?.whatToExpectBullets ?? [
                "Specialty espresso, roasted right",
                "House music energy, daytime into night",
                "Stay, study, create — Riverside",
              ]
            ).map((item: string, i: number) => (
              <li
                key={i}
                className="flex items-start justify-center gap-2 text-neutral-300"
              >
                {/* gold glow bullet */}
                <span className="mt-[0.4rem] h-1.5 w-1.5 rounded-full bg-[rgba(182,138,58,0.6)] shadow-[0_0_8px_rgba(182,138,58,0.8)]" />
                <span className="max-w-[40ch] text-left leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {home?.vibeCopy && (
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-[46ch] mx-auto font-light whitespace-pre-line">
              {home.vibeCopy}
            </p>
          )}
        </section>
      </div>

      {/* --- Footer --- */}
      <footer className="w-full text-center text-[0.7rem] leading-relaxed text-neutral-600 px-5 sm:px-8 md:px-10 pb-10">
        <div className="text-neutral-400 font-medium">
          The Notebook Café LLC — Riverside, CA
        </div>

        {settings?.social?.instagram && (
          <a
            href={settings.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-200 underline underline-offset-4 block mt-1"
          >
            Follow us on Instagram
          </a>
        )}

        <div className="text-neutral-600 mt-4">
          © {new Date().getFullYear()} The Notebook Café LLC. All rights
          reserved.
        </div>
      </footer>
    </main>
  );
}
