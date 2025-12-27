/**
 * @fileoverview Privacy Policy page
 * @module pages/privacy
 *
 * @description
 * Legal page displaying The Notebook Café's privacy policy.
 * Explains data collection, usage, cookies, and user rights.
 *
 * Key features:
 * - Privacy policy sections (Overview, Data Usage, Cookies)
 * - Last updated timestamp
 * - Noindex robots meta (not indexed by search engines)
 * - Minimal layout with readable typography
 *
 * @route /privacy
 * @access public
 *
 * @example
 * Route: /privacy
 * Displays: Privacy policy content
 */
import type { Metadata } from 'next';
import { SEO } from '@/app/lib/constants/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Notebook Café',
  description: 'Privacy policy for The Notebook Café. Learn how we collect, use, and protect your personal information. Explains cookies, analytics, and your privacy rights.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | The Notebook Café',
    description: 'Privacy policy for The Notebook Café. Learn how we collect, use, and protect your personal information. Explains cookies, analytics, and your privacy rights.',
    url: `${SEO.siteUrl}/privacy`,
    images: [{
      url: SEO.ogImage,
      width: 1200,
      height: 630,
      alt: 'The Notebook Café',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [SEO.twitterImage],
  },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 space-y-8 md:pt-40" style={{ color: 'var(--color-cafe-brown)' }}>
      <h1 className="font-serif text-4xl mb-4" style={{ color: 'var(--color-cafe-black)' }}>Privacy Policy</h1>
      <p className="text-sm uppercase tracking-[0.18em]" style={{ color: 'rgba(var(--cafe-brown-rgb),0.65)' }}>
        Last updated: {new Date().getFullYear()}
      </p>

      <section className="space-y-4">
	        <h2 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-black)' }}>Overview & collection</h2>
	        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
	          This Privacy Policy explains how The Notebook Café (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) collects, uses, and shares information when you visit our website or interact with us online.
	        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We collect information you provide directly (like job applications or contact forms) and automatic data (like IP addresses and essential cookies) to keep our site running smoothly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-black)' }}>How we use information</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use your information to respond to your messages, improve site performance, and maintain security. We do not sell or rent your personal information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-black)' }}>Cookies & analytics</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use essential cookies to operate the site. Optional analytics cookies help us understand performance but only load if you accept them. You can manage this choice in the footer.
        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          When you accept analytics cookies, we use <strong>Google Analytics 4</strong> and <strong>Vercel Analytics</strong> to understand how visitors use our site. These tools collect anonymized data about page views, device type, and general location. Google Analytics operates under Google&apos;s{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-cafe-tan)' }}>
            Privacy Policy
          </a>. You can opt out of Google Analytics using the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--color-cafe-tan)' }}>
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-black)' }}>Data sharing</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We share limited data with trusted service providers (like hosting and email services) who are bound by confidentiality. We do not sell personal information.
        </p>
      </section>

      <section className="space-y-4">
	        <h2 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-black)' }}>Your rights & choices</h2>
	        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
	          You can manage your cookie preferences anytime via the &quot;Cookie Preferences&quot; link in the footer. We honor Global Privacy Control (GPC) signals from your browser.
	        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          To request access, correction, or deletion of personal information you submitted, please contact us.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-black)' }}>Security & updates</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use reasonable safeguards to protect information, though no system is completely secure. Our site is not directed to children under 13.
        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We may update this policy periodically. Continued use of the site means you accept the updated policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--color-cafe-black)' }}>Contact</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          Questions about privacy? Email{" "}
          <a href="mailto:thenotebookcafellc@gmail.com" className="underline" style={{ color: 'var(--color-cafe-tan-dark)' }}>
            thenotebookcafellc@gmail.com
          </a>.
        </p>
      </section>
    </main>
  );
}
