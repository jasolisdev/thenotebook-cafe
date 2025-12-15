export default function RefundsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 space-y-8 md:pt-40" style={{ color: 'var(--cafe-brown)' }}>
      <h1 className="font-serif text-4xl mb-4" style={{ color: 'var(--cafe-black)' }}>Refund & Cancellation Policy</h1>
      <p className="text-sm uppercase tracking-[0.18em]" style={{ color: 'rgba(var(--cafe-brown-rgb),0.65)' }}>
        Last updated: {new Date().getFullYear()}
      </p>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>In-store purchases</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We aim to make it right on the spot. If your drink or food isn’t as expected, please let us know immediately so we can remake it or offer a refund at the café’s discretion.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Online orders</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          If you placed an online order (pickup/delivery) and there’s an issue (incorrect items, missing items, quality concerns), contact us as soon as possible with your order details. We’ll work to resolve with a remake, credit, or refund where appropriate.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>How to request a refund</h2>
        <ul className="list-disc pl-5 space-y-2 text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          <li>Visit us in person or email <a href="mailto:hello@notebook.cafe" className="underline" style={{ color: 'var(--cafe-tan)' }}>hello@notebook.cafe</a>.</li>
          <li>Include order details (date, time, items) and what went wrong.</li>
          <li>For online orders, include your order number and platform.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Processing</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          Approved refunds are processed to the original payment method. Timing depends on your bank or provider.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Questions</h2>
        <p className="text-base font-light" style={{ color: 'rgba(var(--cafe-brown-rgb),0.82)' }}>
          We want every experience to be great. If something’s off, let us know and we’ll make it right:{" "}
          <a href="mailto:hello@notebook.cafe" className="underline" style={{ color: 'var(--cafe-tan)' }}>
            hello@notebook.cafe
          </a>.
        </p>
      </section>
    </main>
  );
}
