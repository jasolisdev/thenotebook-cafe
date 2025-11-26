/**
 * Contact Page - The Notebook Café
 *
 * Contact information and form for customer inquiries
 */
import { client } from "@/sanity/lib/client";
import ScrollReveal from "../components/layout/ScrollReveal";
import SiteFooter from "../components/layout/SiteFooter";
import ContactForm from "../components/features/ContactForm";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import Image from "next/image";

async function getData() {
  const [settings, home] = await Promise.all([
    client.fetch(
      `*[_type=="settings"][0]{
        businessName,
        address,
        phone,
        email,
        hours,
        social{ instagram, spotify }
      }`
    ),
    client.fetch(`*[_type=="homePage"][0]{
      vibeCopy
    }`),
  ]);
  return { settings, home };
}

export default async function ContactPage() {
  const { settings, home } = await getData();

  return (
    <main className="site-layout" suppressHydrationWarning>
      <ScrollReveal />

      {/* Hero Section - Dark */}
      <section className="section-dark py-20 sm:py-24 lg:py-28 relative">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 scroll-reveal">
            <h1 className="text-[32px] min-[375px]:text-[38px] sm:text-[48px] md:text-[56px] font-bold tracking-tight mb-4 text-light">
              GET IN TOUCH
            </h1>
            <p className="text-[15px] sm:text-[17px] leading-relaxed text-light-muted max-w-[600px] mx-auto">
              Have questions about our coffee, space, or upcoming events? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Divider - Wavy transition to cream */}
      <div className="divider-cream" style={{ transform: "scaleY(-1)" }}>
        <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
      </div>

      {/* Contact Info Section - Cream */}
      <section className="section-cream py-16 sm:py-20 relative">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 relative z-10">

          {/* Contact Info - Simple Flat Layout */}
          <div className="mb-12 sm:mb-16 scroll-reveal text-center">

            {/* Address */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <MapPin className="w-5 h-5" style={{ color: "rgba(164,131,116,0.9)" }} />
                <h3 className="text-[16px] sm:text-[18px] font-semibold tracking-wide uppercase" style={{ color: "rgba(164,131,116,0.9)" }}>
                  Location
                </h3>
              </div>
              <p className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "#2a1f16" }}>
                3512 9TH ST, RIVERSIDE CA 92501
              </p>
            </div>

            {/* Phone */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Phone className="w-5 h-5" style={{ color: "rgba(164,131,116,0.9)" }} />
                <h3 className="text-[16px] sm:text-[18px] font-semibold tracking-wide uppercase" style={{ color: "rgba(164,131,116,0.9)" }}>
                  Phone
                </h3>
              </div>
              <p className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "#2a1f16" }}>
                <a href="tel:+19518230004" className="hover:underline">
                  (951) 823-0004
                </a>
              </p>
            </div>

            {/* Hours */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="w-5 h-5" style={{ color: "rgba(164,131,116,0.9)" }} />
                <h3 className="text-[16px] sm:text-[18px] font-semibold tracking-wide uppercase" style={{ color: "rgba(164,131,116,0.9)" }}>
                  Business Hours
                </h3>
              </div>
              <div className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "#2a1f16" }}>
                <p>Monday - Thursday: 06:30am – 04:00pm</p>
                <p>Friday - Saturday: 06:30am – 06:00pm</p>
                <p>Sunday: 06:30am – 04:00pm</p>
              </div>
            </div>

          </div>

          {/* Social Links */}
          <div className="text-center mb-12 sm:mb-16 scroll-reveal">
            <p className="text-[13px] sm:text-[14px] mb-4" style={{ color: "rgba(164,131,116,0.9)" }}>
              Follow us for updates
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={settings?.social?.instagram || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="TikTok"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Divider - Wavy transition back to dark */}
      <div className="divider-cream">
        <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
      </div>

      {/* Footer */}
      <SiteFooter vibeCopy={home?.vibeCopy} />
    </main>
  );
}
