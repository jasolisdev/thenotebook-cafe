/**
 * Story Page - The Notebook Café
 *
 * Redesigned about page featuring the café's story, values, and mission.
 */
import { client } from "@/sanity/lib/client";
import SiteFooter from "../components/layout/SiteFooter";
import Reveal from "../components/ui/Reveal";

type PortableChild = { text?: string };
type PortableBlock = { _type?: string; children?: PortableChild[] };

/** Fetch "aboutPage" + "settings" + "homePage" from Sanity */
async function getAboutData() {
  const [about, settings, home] = await Promise.all([
    client.fetch(`*[_type=="aboutPage"][0]{
      title, body, valuesHeading, valuesBullets, missionHeading, founderNote
    }`),
    client.fetch(`*[_type=="settings"][0]{
      social{ instagram, spotify }
    }`),
    client.fetch(`*[_type=="homePage"][0]{
      vibeCopy
    }`),
  ]);
  return { about, settings, home };
}

/** Very small portable text renderer */
function PT({ body }: { body: PortableBlock[] }) {
  if (!body) return null;
  return (
    <div className="prose prose-lg mx-auto text-cafe-brown/80 font-light">
      {body.map((b: PortableBlock, i: number) =>
        b._type === "block" ? (
          <p key={i} className={i === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:text-cafe-black first-letter:mr-3 first-letter:float-left" : "mt-6"}>
            {b.children?.map((c: PortableChild) => c.text || "").join("")}
          </p>
        ) : null,
      )}
    </div>
  );
}

export default async function StoryPage() {
  const { about, settings, home } = await getAboutData();

  const bullets = about?.valuesBullets ?? [
    "A café that plays house, soul, and groove — not top 40 radio.",
    "A space you can actually sit in. Stay, settle, think, create.",
    "Coffee treated with respect — from beans to texture.",
    "A Riverside original — for locals and creatives alike.",
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="relative py-24 md:py-32 px-6" style={{ backgroundColor: '#F4F1EA' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl mb-8" style={{ color: '#2C2420' }}>Our Story</h1>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#A48D78' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        {/* Story Text */}
        <Reveal>
          {about?.body ? (
            <PT body={about.body} />
          ) : (
            <div className="prose prose-lg mx-auto font-light" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
                It started with a simple observation: Riverside needed a place that felt different.
                Not a quick stop for caffeine, but a destination. A place where the music wasn't an afterthought,
                where the chairs were actually comfortable, and where the coffee was treated with the reverence it deserves.
              </p>
              <p className="mt-6" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
                The Notebook Café was born from a love of two things: <strong className="font-medium" style={{ color: '#2C2420' }}>specialty coffee</strong> and <strong className="font-medium" style={{ color: '#2C2420' }}>creative solitude</strong>.
                We wanted to build a space for the writers, the designers, the students, and the dreamers.
              </p>
            </div>
          )}
        </Reveal>

        {/* Two Column Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal delay={100}>
            <div className="p-8 shadow-sm h-full" style={{ backgroundColor: '#FFFFFF', borderTop: '4px solid #A48D78' }}>
              <h3 className="font-serif text-2xl mb-4" style={{ color: '#2C2420' }}>The Coffee</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                We partner with sustainable, direct-trade roasters who care about the farmers as much as the bean.
                Our espresso is dialed in every morning, ensuring the perfect extraction ratio.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="p-8 shadow-sm h-full" style={{ backgroundColor: '#FFFFFF', borderTop: '4px solid #2C2420' }}>
              <h3 className="font-serif text-2xl mb-4" style={{ color: '#2C2420' }}>The Music</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                You won't hear Top 40 hits here. We curate daily playlists of deep house, neo-soul, and lo-fi beats
                that provide the perfect backdrop for focus and flow.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Riverside Commitment */}
        <Reveal delay={100}>
          <div className="prose prose-lg mx-auto font-light" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
            <h3 className="font-serif text-2xl mb-4" style={{ color: '#2C2420' }}>Our Riverside Commitment</h3>
            <p style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
              We chose the vibrant intersection of University Ave and Orange St because it sits at the cross-section of culture, commerce, and creativity. The Notebook Cafe is built to be a true community anchor for students, creatives, and locals—a peaceful hub to find your flow.
            </p>
          </div>
        </Reveal>

        {/* The Craft & The Rhythm */}
        <Reveal delay={150}>
          <div className="prose prose-lg mx-auto font-light" style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
            <h3 className="font-serif text-2xl mb-4" style={{ color: '#2C2420' }}>The Craft & The Rhythm</h3>
            <p style={{ color: 'rgba(74, 59, 50, 0.8)' }}>
              Our mission extends beyond the cup. We ensure our specialty espresso is ethically sourced and roasted right, prepared on state-of-the-art equipment for consistent, perfect texture. We treat every step of the brewing process with respect.
            </p>
          </div>
        </Reveal>

        {/* Values Grid */}
        {bullets.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl mb-8 text-center" style={{ color: '#2C2420' }}>{about?.valuesHeading || "What We're Building"}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bullets.map((bullet: string, i: number) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="p-6 rounded-sm" style={{ backgroundColor: '#F4F1EA' }}>
                    <p style={{ color: 'rgba(74, 59, 50, 0.8)' }}>{bullet}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Quote Section */}
        <Reveal delay={300}>
          <div className="p-10 md:p-16 text-center relative overflow-hidden rounded-sm" style={{ backgroundColor: '#2C2420', color: '#FFFFFF' }}>
            <div className="relative z-10">
              <h3 className="font-serif text-3xl mb-6" style={{ color: '#FFFFFF' }}>
                {about?.founderNote || '"Riverside is growing. We\'re here to fuel the creativity of this city."'}
              </h3>
              <p className="font-sans uppercase tracking-widest text-xs" style={{ color: '#CBB9A4' }}>— The Founders</p>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
