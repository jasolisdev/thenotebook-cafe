import { client } from "@/sanity/lib/client";
import SiteHeader from "../components/SiteHeader";
import MenuContent from "../components/MenuContent";
import ScrollReveal from "../components/ScrollReveal";
import FloatingItems from "../components/FloatingItems";
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
      `*[_type=="settings"][0]{ social{ instagram } }`,
    ),
  ]);
  return { menuItems, settings };
}

export default async function MenuPage() {
  const { menuItems, settings } = await getData();

  return (
    <main className="page-dark">
      <ScrollReveal />
      {/* Fixed dark nav */}
      <div className="nav-glass-wrap">
        <div className="nav-glass">
          <SiteHeader instagramUrl={settings?.social?.instagram} />
        </div>
      </div>

      {/* Hero Spacer */}
      <div className="h-32"></div>

      {/* Menu Section - Cream Background */}
      <section className="section-cream py-20 min-h-screen relative">
        <FloatingItems />
        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 pt-12 scroll-reveal">
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
        <img src="/notebook-divider-cream.svg" alt="" />
      </div>

      {/* Footer */}
      <footer className="section-dark text-center text-[13px] leading-6 py-12 px-5">
        <div className="max-w-[600px] mx-auto">
          <div className="text-[11px] uppercase tracking-widest mb-2 opacity-60 ink-cream">
            The Notebook Café
          </div>
          <div className="ink-cream-dim">
            © {new Date().getFullYear()} The Notebook Café LLC — Riverside, CA
          </div>
        </div>
      </footer>
    </main>
  );
}
