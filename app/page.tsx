import { client } from "@/sanity/lib/client";
import Image from "next/image";
import PaperHeader from "./components/PaperHeader";

async function getData() {
  const [home, settings] = await Promise.all([
    client.fetch(`*[_type=="homePage"][0]{
      heroHeadline, heroTagline, statusLine, ctaText, ctaUrl,
      whatToExpectBullets, vibeCopy,
      heroImage{asset->{url}, alt}
    }`),
    client.fetch(`*[_type=="settings"][0]{ social{ instagram } }`),
  ]);
  return { home, settings };
}

export default async function HomePage() {
  const { home, settings } = await getData();

  return (
    <main className="page-desk">
      <section className="sheet">
        <div className="sheet__inner">
          {/* Top band header (logo + nav + burger) */}
          <PaperHeader instagramUrl={settings?.social?.instagram} />

          {/* Content */}
          <div className="mx-auto max-w-[760px] text-center">
            <div className="flex justify-center mb-6">
              {home?.heroImage?.asset?.url ? (
                <Image
                  src={home.heroImage.asset.url}
                  alt={home.heroImage.alt || "The Notebook Café"}
                  width={480}
                  height={480}
                  className="w-[260px] sm:w-[320px] md:w-[360px] h-auto"
                  priority
                />
              ) : (
                <h1 className="text-[36px] font-semibold text-[var(--ink)]">
                  The Notebook Café
                </h1>
              )}
            </div>

            <p className="text-[18px] opacity-80 text-[var(--ink)]">
              {home?.heroTagline || "Coffee. Culture. House Music."}
            </p>

            <h2 className="text-[32px] sm:text-[36px] mt-3 font-medium opacity-90 text-[var(--ink)]">
              {home?.statusLine || "☕ Coming Soon ☕"}
            </h2>

            {home?.ctaText && home?.ctaUrl && (
              <a
                href={home.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 rounded-full text-[15px] font-medium px-5 py-2.5
                           bg-[var(--button-bg)] border border-[var(--button-border)]
                           shadow-[var(--sheet-shadow)]
                           hover:bg-[var(--button-hover-bg)] transition-colors text-[var(--ink)]"
              >
                {home.ctaText}
              </a>
            )}

            <div className="h-px w-24 mx-auto my-8 bg-[var(--rule)]" />

            <ul className="mx-auto text-left max-w-[52ch] space-y-3 text-[16px] leading-7 text-[var(--ink)]">
              {(
                home?.whatToExpectBullets ?? [
                  "Specialty espresso, roasted right",
                  "House music energy, daytime into night",
                  "Stay, study, create — Riverside",
                ]
              ).map((t: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="mt-[10px] h-2 w-2 rounded-full"
                    style={{
                      background: "var(--accent-color-1)",
                      boxShadow: "0 0 8px rgba(182,138,58,.3)",
                    }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {home?.vibeCopy && (
              <p className="mx-auto max-w-[60ch] text-[15px] leading-7 mt-6 opacity-70 text-[var(--ink)]">
                {home.vibeCopy}
              </p>
            )}

            <footer className="text-center text-[13px] leading-6 mt-12 opacity-70 text-[var(--ink)]">
              © {new Date().getFullYear()} The Notebook Café LLC — Riverside,
              CA
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
