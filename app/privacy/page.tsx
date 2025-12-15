import Reveal from '../components/ui/Reveal';
import '../styles/pages/legal.css';

const PrivacyPage = () => (
  <div style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto' }} className="legal-content">
    <Reveal>
      <h1>Privacy Policy</h1>
      <p style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', opacity: 0.6, marginBottom: '40px' }}>
        Last Updated: {new Date().getFullYear()}
      </p>

      <div style={{ marginBottom: '60px' }}>
        <h2>Overview & Collection</h2>
        <p>
          This Privacy Policy explains how The Notebook Café (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) collects, uses, and shares information when you visit our website or interact with us online.
        </p>
        <p>
          We collect information you provide directly (like job applications or contact forms) and automatic data (like IP addresses and essential cookies) to keep our site running smoothly.
        </p>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2>How We Use Information</h2>
        <p>
          We use your information to respond to your messages, improve site performance, and maintain security. We do not sell or rent your personal information.
        </p>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2>Cookies & Sharing</h2>
        <p>
          We use essential cookies to operate the site. Optional analytics cookies help us understand performance but only load if you accept them. You can manage this choice in the footer.
        </p>
        <p>
          We share limited data with trusted service providers (like hosting and email services) who are bound by confidentiality. We do not sell personal information.
        </p>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2>Your Rights & Choices</h2>
        <p>
          You can manage your cookie preferences anytime via the &quot;Cookie Preferences&quot; link in the footer. We honor Global Privacy Control (GPC) signals from your browser.
        </p>
        <p>
          To request access, correction, or deletion of personal information you submitted, please contact us.
        </p>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2>Security & Updates</h2>
        <p>
          We use reasonable safeguards to protect information, though no system is completely secure. Our site is not directed to children under 13.
        </p>
        <p>
          We may update this policy periodically. Continued use of the site means you accept the updated policy.
        </p>
      </div>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--cafe-tan)' }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
          Questions about privacy? Email{' '}
          <a href="mailto:hello@notebook.cafe" style={{ color: 'var(--cafe-black)', textDecoration: 'underline' }}>
            hello@notebook.cafe
          </a>.
        </p>
      </div>
    </Reveal>
  </div>
);

export default PrivacyPage;
