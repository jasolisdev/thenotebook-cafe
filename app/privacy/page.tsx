import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 space-y-8 md:pt-40" style={{ color: 'var(--cafe-brown)' }}>
      <h1 className="font-serif text-4xl mb-4" style={{ color: 'var(--cafe-black)' }}>Privacy Policy</h1>
      <p className="text-sm uppercase tracking-[0.18em]" style={{ color: 'rgba(var(--cafe-brown-rgb),0.65)' }}>
        Last updated: {new Date().getFullYear()}
      </p>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Overview & collection</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          This Privacy Policy explains how The Notebook Café ("we," "us," "our") collects, uses, and shares information when you visit our website or interact with us online.
        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We collect information you provide directly (like job applications or contact forms) and automatic data (like IP addresses and essential cookies) to keep our site running smoothly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>How we use information</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use your information to respond to your messages, improve site performance, and maintain security. We do not sell or rent your personal information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Cookies & sharing</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use essential cookies to operate the site. Optional analytics cookies help us understand performance but only load if you accept them. You can manage this choice in the footer.
        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We share limited data with trusted service providers (like hosting and email services) who are bound by confidentiality. We do not sell personal information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Your rights & choices</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          You can manage your cookie preferences anytime via the "Cookie Preferences" link in the footer. We honor Global Privacy Control (GPC) signals from your browser.
        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          To request access, correction, or deletion of personal information you submitted, please contact us.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Security & updates</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use reasonable safeguards to protect information, though no system is completely secure. Our site is not directed to children under 13.
        </p>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We may update this policy periodically. Continued use of the site means you accept the updated policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Contact</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          Questions about privacy? Email{" "}
          <a href="mailto:thenotebookcafellc@gmail.com" className="underline" style={{ color: 'var(--cafe-tan)' }}>
            thenotebookcafellc@gmail.com
          </a>.
        </p>
      </section>
    </main>
  );
}
