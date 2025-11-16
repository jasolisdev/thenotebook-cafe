import { client } from "@/sanity/lib/client";
import SiteHeader from "../components/SiteHeader";
import MenuContent from "../components/MenuContent";
import ScrollReveal from "../components/ScrollReveal";
import FloatingItems from "../components/FloatingItems";
import SiteFooter from "../components/SiteFooter";
import AnnouncementBanner from "../components/AnnouncementBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | The Notebook Café",
  description: "Explore our menu of specialty coffee, fresh meals, and delicious desserts.",
};

async function getData() {
  const [menuItems, settings] = await Promise.all([
    client.fetch(`*[_type=="menuItem"] | order(section asc, sortOrder asc, name asc) {
      name,
      description,
      price,
      section,
      category,
      sortOrder,
      "imageUrl": image.asset->url
    }`),
    client.fetch(
      `*[_type=="settings"][0]{ social{ instagram, spotify } }`,
    ),
  ]);
  return { menuItems, settings };
}

export default async function MenuPage() {
  const { menuItems, settings } = await getData();

  return (
    <main className="page-dark">
      <ScrollReveal />
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Fixed dark nav */}
      <SiteHeader
        instagramUrl={settings?.social?.instagram}
        spotifyUrl={settings?.social?.spotify}
      />

      {/* Menu Section - Cream Background */}
      <section className="section-cream py-20 min-h-screen relative">
        <FloatingItems />
        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 pt-4 scroll-reveal">
            <h1 className="text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-tight text-[#2a1f16] mb-4">
              MENU
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#5a4a38] max-w-[600px] mx-auto mb-8">
              Crafted with intention. Brewed with rhythm. Explore our signature drinks, matcha blends, and handcrafted pastries—made fresh, every day.
            </p>

            {/* Coffee Hero Image */}
            <div className="max-w-[800px] mx-auto mb-12 scroll-reveal">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=400&fit=crop"
                  alt="Artisan espresso being poured"
                  className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Menu Content with Tabs */}
          <MenuContent items={menuItems} />
        </div>
      </section>

      {/* Divider - Wavy transition to dark footer */}
      <div className="divider-cream">
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
