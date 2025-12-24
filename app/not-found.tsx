/**
 * @fileoverview Custom 404 error page
 * @module pages/not-found
 *
 * @description
 * Custom 404 error page displayed when a route is not found.
 * Provides helpful navigation options to guide users back to main content.
 *
 * Key features:
 * - Large 404 display with branded styling
 * - Helpful error message explaining the situation
 * - Primary CTA to homepage
 * - Secondary CTA to menu page
 * - Mobile-responsive layout
 *
 * @route /404 (or any non-existent route)
 * @access public
 *
 * @example
 * Displayed when: User navigates to non-existent route
 * Provides: Navigation to homepage or menu
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cafe-mist px-6 py-20">
      <div className="max-w-[900px] mx-auto text-center">
        {/* Large 404 */}
        <h1 className="text-[140px] sm:text-[200px] md:text-[280px] font-black leading-none tracking-tighter text-cafe-black mb-6">
          404
        </h1>

        {/* Page Not Found Heading */}
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold tracking-wider uppercase text-cafe-black mb-6">
          PAGE NOT FOUND
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed text-cafe-brown/80 max-w-[640px] mx-auto mb-12">
          We couldn&apos;t find the page you&apos;re looking for. The URL might be incorrect,
          or the page may have been moved. Head back to our homepage or explore our
          carefully crafted menu to find what you&apos;re craving.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Go to Homepage - Filled Button */}
          <Link
            href="/"
            className="w-full sm:w-auto px-10 py-4 rounded-none bg-cafe-black text-cafe-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all hover:bg-cafe-black/90 hover:transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            GO TO HOMEPAGE
          </Link>

          {/* View Menu - Outline Button */}
          <Link
            href="/menu"
            className="w-full sm:w-auto px-10 py-4 rounded-none bg-transparent border-2 border-cafe-black text-cafe-black text-xs sm:text-sm font-bold uppercase tracking-widest transition-all hover:bg-cafe-black hover:text-cafe-white hover:transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            VIEW MENU
          </Link>
        </div>
      </div>
    </main>
  );
}
