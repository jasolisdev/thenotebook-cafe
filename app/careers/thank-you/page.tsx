/**
 * Careers Thank You Page - The Notebook Café
 *
 * Confirmation page after successful job application submission.
 */
import Link from "next/link";
import Reveal from "../../components/ui/Reveal";
import { CheckCircle, Home, Mail } from "lucide-react";
import "../../styles/pages/careers.css";

export default function ThankYouPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 careers-thank-you-page"
      style={{ backgroundColor: 'var(--color-cafe-mist)' }}
    >
      <div className="max-w-2xl w-full text-center">
        <Reveal>
          <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center" style={{ backgroundColor: 'var(--color-cafe-tan)' }}>
            <CheckCircle size={48} className="text-white" strokeWidth={1.5} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-serif text-5xl md:text-6xl mb-6" style={{ color: 'var(--color-cafe-black)' }}>
            Application <span className="italic" style={{ color: 'var(--color-cafe-tan)' }}>Received!</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-8" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
            Thanks for applying to join our team! We&apos;ve received your application and will review it carefully.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="p-8 rounded-2xl mb-8" style={{ backgroundColor: 'var(--color-cafe-white)', border: '2px solid rgba(164, 141, 120, 0.2)' }}>
            <Mail size={32} className="mx-auto mb-4" style={{ color: 'var(--color-cafe-tan)' }} />
            <h2 className="font-serif text-2xl mb-3" style={{ color: 'var(--color-cafe-black)' }}>
              What Happens Next?
            </h2>
            <p className="font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
              We&apos;ll review all applications and reach out to qualified candidates within <strong>3-5 business days</strong>.
              Keep an eye on your email (and check your spam folder, just in case).
            </p>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-serif text-lg transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--color-cafe-tan)',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              <Home size={20} />
              Back to Homepage
            </Link>

            <p className="text-sm font-light" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
              Questions? Email us at{" "}
              <a href="mailto:thenotebookcafellc@gmail.com" className="underline" style={{ color: 'var(--color-cafe-tan)' }}>
                thenotebookcafellc@gmail.com
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
