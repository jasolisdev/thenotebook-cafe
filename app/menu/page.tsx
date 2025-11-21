/**
 * Menu Page - The Notebook Café
 *
 * Displays the full menu with tab navigation for drinks, meals, and desserts.
 */
import { client } from "@/sanity/lib/client";
import SiteHeader from "../components/layout/SiteHeader";
import MenuContent from "../components/features/MenuContent";
import ScrollReveal from "../components/layout/ScrollReveal";
import FloatingItems from "../components/decorative/FloatingItems";
import Image from "next/image";
import SiteFooter from "../components/layout/SiteFooter";
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
    <main className="site-layout">
      <ScrollReveal />

      {/* Site Header */}
      <SiteHeader
        instagramUrl={settings?.social?.instagram}
        spotifyUrl={settings?.social?.spotify}
      />

      {/* Menu Section - Cream Background */}
      <section className="section-cream pt-[76px] sm:pt-[92px] lg:pt-[108px] pb-16 sm:pb-20 relative" style={{ minHeight: '200vh' }}>
        <FloatingItems />
        <div className="mx-auto max-w-[1200px] px-0 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 pt-4 scroll-reveal">
            <h1 className="text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-tight text-[#2a1f16] mb-4">
              MENU
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#5a4a38] max-w-[600px] mx-auto">
              Crafted with intention. Brewed with rhythm. Explore our signature drinks, matcha blends, and handcrafted pastries—made fresh, every day.
            </p>
          </div>

          {/* Menu Content with Tabs */}
          <MenuContent items={menuItems} />
        </div>
      </section>

      {/* Divider - Wavy transition to dark footer */}
      <div className="divider-cream">
        <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
