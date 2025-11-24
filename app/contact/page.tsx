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
import { SiSpotify, SiInstagram, SiFacebook } from "react-icons/si";
import Image from "next/image";

async function getData() {
  const settings = await client.fetch(
    `*[_type=="settings"][0]{
      businessName,
      address,
      phone,
      email,
      hours,
      social{ instagram, spotify }
    }`
  );
  return { settings };
}

export default async function ContactPage() {
  const { settings } = await getData();

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

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16">

            {/* Address Card */}
            <div className="contact-info-card scroll-reveal" style={{ animationDelay: "0s" }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-wide" style={{ color: "#2a1f16" }}>
                  LOCATION
                </h3>
                <div className="contact-card-icon">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "rgba(42,31,22,0.8)" }}>
                {settings?.address || "3512 9TH ST, RIVERSIDE CA 92501"}
              </p>
            </div>

            {/* Phone Card */}
            <div className="contact-info-card scroll-reveal" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-wide" style={{ color: "#2a1f16" }}>
                  PHONE
                </h3>
                <div className="contact-card-icon">
                  <Phone className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "rgba(42,31,22,0.8)" }}>
                <a href={`tel:${settings?.phone || "(951) 823-0004"}`} className="hover:underline">
                  {settings?.phone || "(951) 823-0004"}
                </a>
              </p>
            </div>

            {/* Hours Card */}
            <div className="contact-info-card scroll-reveal" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-wide" style={{ color: "#2a1f16" }}>
                  HOURS
                </h3>
                <div className="contact-card-icon">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "rgba(42,31,22,0.8)" }}>
                {settings?.hours?.weekday || "Mon–Fri: 7 AM – 9 PM"}
                <br />
                {settings?.hours?.weekend || "Sat–Sun: 8 AM – 10 PM"}
              </p>
            </div>

            {/* Email Card */}
            <div className="contact-info-card scroll-reveal" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-wide" style={{ color: "#2a1f16" }}>
                  EMAIL
                </h3>
                <div className="contact-card-icon">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "rgba(42,31,22,0.8)" }}>
                <a href={`mailto:${settings?.email || "hello@thenotebookcafe.com"}`} className="hover:underline">
                  {settings?.email || "hello@thenotebookcafe.com"}
                </a>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mb-12 sm:mb-16 scroll-reveal">
            <p className="text-[13px] sm:text-[14px] mb-4" style={{ color: "rgba(164,131,116,0.9)" }}>
              Follow us for updates
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={settings?.social?.spotify || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="Spotify"
              >
                <SiSpotify className="w-5 h-5" />
              </a>
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
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(164,131,116,0.15)] text-[rgba(164,131,116,0.9)] hover:bg-[rgba(164,131,116,0.25)] hover:text-[rgba(164,131,116,1)] transition"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mx-auto max-w-[720px] scroll-reveal">
            <div className="contact-form-card">
              <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-wide mb-2 text-center" style={{ color: "#2a1f16" }}>
                CONNECT WITH US
              </h2>
              <p className="text-[14px] sm:text-[15px] mb-6 text-center" style={{ color: "rgba(42,31,22,0.7)" }}>
                Send us a message and we'll get back to you soon.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Divider - Wavy transition back to dark */}
      <div className="divider-cream">
        <Image src="/notebook-divider-cream.svg" alt="" width={1440} height={120} />
      </div>

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
