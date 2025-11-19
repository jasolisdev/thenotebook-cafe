import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f0e9] px-6 py-20">
      <div className="max-w-[900px] mx-auto text-center">
        {/* Large 404 */}
        <h1 className="text-[140px] sm:text-[200px] md:text-[280px] font-black leading-none tracking-tighter text-[#2a1f16] mb-6">
          404
        </h1>

        {/* Page Not Found Heading */}
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold tracking-wider uppercase text-[#2a1f16] mb-6">
          PAGE NOT FOUND
        </h2>

        {/* Description */}
        <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[#6b5a48] max-w-[640px] mx-auto mb-12">
          We couldn&apos;t find the page you&apos;re looking for. The URL might be incorrect,
          or the page may have been moved. Head back to our homepage or explore our
          carefully crafted menu to find what you&apos;re craving.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Go to Homepage - Filled Button */}
          <Link
            href="/"
            className="w-full sm:w-auto px-10 py-4 rounded-none bg-[#2a1f16] text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-widest transition-all hover:bg-[#1a140f] hover:transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            GO TO HOMEPAGE
          </Link>

          {/* View Menu - Outline Button */}
          <Link
            href="/menu"
            className="w-full sm:w-auto px-10 py-4 rounded-none bg-transparent border-2 border-[#2a1f16] text-[#2a1f16] text-[13px] sm:text-[14px] font-bold uppercase tracking-widest transition-all hover:bg-[#2a1f16] hover:text-white hover:transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            VIEW MENU
          </Link>
        </div>
      </div>
    </main>
  );
}
