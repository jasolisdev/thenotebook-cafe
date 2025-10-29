import { client } from "@/sanity/lib/client";
import SiteHeader from "../components/SiteHeader";

/** Fetch "aboutPage" + "settings" from Sanity */
async function getAboutData() {
  const [about, settings] = await Promise.all([
    client.fetch(`*[_type == "aboutPage"][0]{
      title,
      body,
      valuesHeading,
      valuesBullets,
      missionHeading,
      founderNote
    }`),
    client.fetch(`*[_type == "settings"][0]{
      social { instagram }
    }`),
  ]);

  return { about, settings };
}

/** Minimal renderer for Sanity Portable Text blocks */
function AboutBody({ body }: { body: any[] }) {
  if (!body) return null;
  return (
    <div className="space-y-6 text-neutral-300 text-base leading-relaxed">
      {body.map((block, i) => {
        if (block._type === "block") {
          return (
            <p
              key={i}
              className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light"
            >
              {block.children?.map((child: any) => child.text).join("")}
            </p>
          );
        }

        if (block._type === "image") {
          return (
            <div
              key={i}
              className="w-full rounded-xl bg-neutral-800/40 border border-neutral-700/40 text-neutral-500 text-xs italic py-16 text-center"
            >
              Image coming soon
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default async function AboutPage() {
  const { about, settings } = await getAboutData();

  return (
    <main className="relative min-h-screen text-neutral-100 flex flex-col">
      {/* --- Background --- */}
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

      {/* --- Header / Navbar --- */}
      <SiteHeader instagramUrl={settings?.social?.instagram} />

      {/* --- Page Content --- */}
      <div className="flex-1 w-full max-w-[800px] mx-auto px-5 sm:px-8 md:px-10 pb-24 sm:pb-32 flex flex-col gap-16 text-center">
        {/* Title / Intro Heading */}
        <section className="text-center pt-8 sm:pt-12">
          <div className="text-[0.7rem] text-neutral-500 tracking-wide uppercase font-medium">
            The Notebook Café
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl text-neutral-100 font-semibold tracking-tight mt-1">
            {about?.title || "Our Story"}
          </h1>
        </section>

        {/* Story / Origin block */}
        <section className="text-left mx-auto max-w-[60ch] space-y-6">
          {about?.body ? (
            <AboutBody body={about.body} />
          ) : (
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              The Notebook Café is a house-music-driven coffee space rooted in
              Riverside. We're building a place to slow down, create, meet up,
              and feel inspired — like your favorite listening room and your
              favorite espresso bar had a kid.
            </p>
          )}
        </section>

        {/* Values / What we're building */}
        <section className="text-left mx-auto max-w-[60ch] space-y-6">
          <div className="text-[0.7rem] uppercase tracking-widest text-[rgba(182,138,58,0.8)] font-medium">
            {about?.valuesHeading || "What we’re building"}
          </div>

          <ul className="space-y-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            {(
              about?.valuesBullets || [
                "A café that plays house, soul, and groove — not top 40 radio.",
                "A space you can actually sit in. Stay, settle, think, create.",
                "Coffee treated with respect — from beans to texture.",
                "A Riverside original — for locals and creatives alike.",
              ]
            ).map((text: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[rgba(182,138,58,0.6)] shadow-[0_0_8px_rgba(182,138,58,0.8)]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Mission / Founder note card */}
        <section className="mx-auto max-w-[60ch] w-full">
          <div className="rounded-xl border border-[rgba(182,138,58,0.3)] bg-[rgba(20,20,20,0.6)] px-5 sm:px-8 py-6 sm:py-8 text-left shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
            <div className="text-[0.65rem] uppercase tracking-wider text-[rgba(182,138,58,0.8)] font-medium mb-3">
              {about?.missionHeading || "Why we’re doing this"}
            </div>

            <p className="text-neutral-200 text-sm leading-relaxed font-light whitespace-pre-line">
              {about?.founderNote ||
                `We’re building a spot where people who care about taste — in coffee,
in music, in atmosphere — can actually hang.

A space that feels like Riverside, made for locals, creatives, and anyone who loves good energy.`}
            </p>
          </div>
        </section>

        {/* Links / CTA cluster */}
        <section className="text-center text-[0.8rem] text-neutral-500 flex flex-col items-center gap-3">
          <a
            href="/"
            className="text-neutral-400 hover:text-neutral-200 underline underline-offset-4"
          >
            ← Back to home
          </a>

          {settings?.social?.instagram && (
            <a
              href={settings.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 underline underline-offset-4"
            >
              Follow us on Instagram
            </a>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-[0.7rem] leading-relaxed text-neutral-600 px-6 py-8">
        <div className="text-neutral-400 font-medium">
          © {new Date().getFullYear()} The Notebook Café LLC — Riverside, CA
        </div>
      </footer>
    </main>
  );
}
