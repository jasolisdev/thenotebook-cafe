import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-dark">
      <section className="mx-auto max-w-[760px] text-center py-24 px-6">
        <div className="uppercase tracking-widest text-[11px] ink-cream-dim">
          404 — Lost Page
        </div>
        <h1 className="text-[28px] sm:text-[34px] font-semibold mt-2 ink-cream">
          This page fell out of the notebook.
        </h1>
        <p className="mt-3 ink-cream-dim">
          The URL might be wrong or the page isn’t published yet.
        </p>
        <Link href="/" className="btn-pill mt-6 inline-block">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
