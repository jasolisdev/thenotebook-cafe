import { client } from "@/sanity/lib/client";
import Image from "next/image";
import PaperHeader from "../components/PaperHeader";

/** Fetch "aboutPage" + "settings" from Sanity */
async function getAboutData() {
  const [about, settings] = await Promise.all([
    client.fetch(`*[_type=="aboutPage"][0]{
      title, body, valuesHeading, valuesBullets, missionHeading, founderNote
    }`),
    client.fetch(`*[_type=="settings"][0]{ social{ instagram } }`),
  ]);
  return { about, settings };
}

/** super-light portable text -> paragraphs */
function PT({ body }: { body: any[] }) {
  if (!body) return null;
  return (
    <div className="space-y-4 leading-7 text-[15px] text-[var(--ink)]">
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

  return (
    <main className="page-desk">
      <section className="sheet">
        <div className="sheet__inner">
          <PaperHeader instagramUrl={settings?.social?.instagram} />

          <header className="mt-2 mb-8 text-center">
            <div className="uppercase tracking-widest text-[11px] muted">
              The Notebook Café
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-semibold mt-1 text-[var(--ink)]">
              {about?.title || "Our Story"}
            </h1>

            {/* ✅ Added centered logo (same as homepage) */}
            <div className="flex justify-center mt-4 mb-6">
              <Image
                src="/logo.png"
                alt="The Notebook Café"
                width={480}
                height={480}
                className="w-[180px] sm:w-[220px] md:w-[260px] h-auto"
                priority
              />
            </div>
          </header>

          <section className="mx-auto max-w-[60ch] space-y-8">
            {about?.body ? (
              <PT body={about.body} />
            ) : (
              <p className="text-[var(--ink)]">
                The Notebook Café is a house-music-driven coffee space rooted in
                Riverside. We’re building a place to slow down, create, meet up,
                and feel inspired — like your favorite listening room and your
                favorite espresso bar had a kid.
              </p>
            )}

            <div>
              <div
                className="uppercase tracking-widest text-[11px] mb-3"
                style={{ color: "var(--accent-color-1)" }}
              >
                {about?.valuesHeading || "What we’re building"}
              </div>
              <ul className="space-y-3 text-[15px] leading-7 text-[var(--ink)]">
                {(
                  about?.valuesBullets || [
                    "A café that plays house, soul, and groove — not top 40 radio.",
                    "A space you can actually sit in. Stay, settle, think, create.",
                    "Coffee treated with respect — from beans to texture.",
                    "A Riverside original — for locals and creatives alike.",
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
            </div>

            <div
              className="rounded-xl px-6 py-6"
              style={{
                border: "1px solid var(--button-border)",
                background: "var(--button-bg)",
                boxShadow: "var(--sheet-shadow)",
              }}
            >
              <div
                className="uppercase tracking-widest text-[11px] mb-2"
                style={{ color: "var(--accent-color-1)" }}
              >
                {about?.missionHeading || "Why we’re doing this"}
              </div>
              <p className="whitespace-pre-line text-[15px] leading-7 text-[var(--ink)]">
                {about?.founderNote ||
                  `We’re building a spot where people who care about taste — in coffee,
in music, in atmosphere — can actually hang.

A space that feels like Riverside, made for locals, creatives, and anyone who loves good energy.`}
              </p>
            </div>
          </section>

          <footer className="text-center text-[13px] leading-6 mt-14">
            <div className="muted font-medium">
              © {new Date().getFullYear()} The Notebook Café LLC — Riverside,
              CA
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
