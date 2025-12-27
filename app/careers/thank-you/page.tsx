/**
 * @fileoverview Careers application confirmation page
 * @module pages/careers/thank-you
 *
 * @description
 * Success confirmation page displayed after submitting a job application.
 * Provides next steps information and navigation back to homepage.
 *
 * Key features:
 * - Success icon with animation
 * - Confirmation message with application status
 * - Next steps timeline (3-5 business days)
 * - Navigation back to homepage
 * - Contact information for follow-up questions
 *
 * @route /careers/thank-you
 * @access public
 *
 * @example
 * Route: /careers/thank-you
 * Accessed after: Successful job application submission
 *
 * @see {@link app/careers/page.tsx} for careers page with application form
 * @see {@link app/components/features/CareersApplyForm.tsx} for form component
 */
import type { Metadata } from 'next';
import Link from "next/link";
import Reveal from "@/app/components/ui/Reveal";
import { CheckCircle, Home, Mail } from "lucide-react";
import { SEO } from "@/app/lib/constants/seo";
import "@/app/styles/pages/careers.css";

export const metadata: Metadata = {
  title: 'Application Received | The Notebook Café',
  description: 'Thank you for applying to join The Notebook Café team! We\'ve received your application and will review it within 3-5 business days.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Application Received | The Notebook Café',
    description: 'Thank you for applying to join The Notebook Café team! We\'ve received your application and will review it within 3-5 business days.',
    url: `${SEO.siteUrl}/careers/thank-you`,
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
