export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-8" style={{ color: 'var(--cafe-brown)' }}>
      <h1 className="font-serif text-4xl mb-4" style={{ color: 'var(--cafe-black)' }}>Privacy Policy</h1>
      <p className="text-sm uppercase tracking-[0.18em]" style={{ color: 'rgba(var(--cafe-brown-rgb),0.65)' }}>
        Last updated: {new Date().getFullYear()}
      </p>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Overview</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          This Privacy Policy explains how The Notebook Café (“we,” “us,” “our”) collects, uses, and shares information when you visit our website or interact with us online. By using this site, you consent to the practices described here.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Information we collect</h2>
        <ul className="list-disc pl-5 space-y-2 text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          <li><strong style={{ color: 'var(--cafe-black)' }}>Information you provide:</strong> contact form messages, career submissions, or other details you choose to share.</li>
          <li><strong style={{ color: 'var(--cafe-black)' }}>Automatic data:</strong> device/browser details, IP address, pages visited, and referring URLs to understand site performance.</li>
          <li><strong style={{ color: 'var(--cafe-black)' }}>Cookies & similar tech:</strong> essential cookies to run the site and optional analytics cookies (only if you consent).</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>How we use information</h2>
        <ul className="list-disc pl-5 space-y-2 text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          <li>Responding to your messages or inquiries.</li>
          <li>Improving site performance, content, and accessibility.</li>
          <li>Maintaining security and preventing misuse.</li>
        </ul>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We do not sell or rent your personal information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Cookies & analytics</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          Essential cookies keep the site running. Optional analytics cookies (such as Vercel Web Analytics) only load if you select “Accept” in our cookie banner. You can change your choice anytime using the “Cookies” link in the footer or your browser settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Sharing with service providers</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use trusted vendors for hosting, analytics (if enabled), email delivery, and security. They may process limited data on our behalf and are bound by confidentiality and data protection terms. We do not sell personal information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Do not sell or share my personal information</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We do not sell personal information. If you prefer to opt out of any data sharing that could be considered “sale,” “sharing,” or “targeted advertising” under U.S. state laws, you can:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          <li>Set the Global Privacy Control (GPC) signal in your browser—if detected, we will honor it.</li>
          <li>Use the “Cookies” link in the footer to decline analytics cookies.</li>
          <li>Email us at{" "}
            <a href="mailto:hello@notebook.cafe" className="underline" style={{ color: 'var(--cafe-tan)' }}>
              hello@notebook.cafe
            </a>{" "}
            to request an opt-out.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Data retention</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          Analytics data is kept only as long as necessary to monitor site performance. Form submissions are retained as long as needed to respond and meet legal obligations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Your choices & rights</h2>
        <ul className="list-disc pl-5 space-y-2 text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          <li>Manage cookies any time via the “Cookies” link in the footer or your browser settings.</li>
          <li>Request access, correction, or deletion of personal information you submitted by contacting us.</li>
          <li>Use browser-level privacy controls such as GPC to signal opt-out preferences.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Security</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We use reasonable safeguards to protect information. No system is completely secure, and transmission is at your own risk.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Children</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          Our site is not directed to children under 13. If you believe a child provided us personal information, please contact us so we can delete it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Changes</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We may update this policy from time to time. The “Last updated” date reflects the latest version. Continued use of the site means you accept the updated policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Contact</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          Questions about privacy or requests? Email{" "}
          <a href="mailto:hello@notebook.cafe" className="underline" style={{ color: 'var(--cafe-tan)' }}>
            hello@notebook.cafe
          </a>.
        </p>
      </section>
    </main>
  );
}
