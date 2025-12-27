"use client";

import { useState } from "react";

/**
 * Newsletter Subscription Form Component
 *
 * Email subscription form for the "Stay in the Loop" section
 */
export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [borderColor, setBorderColor] = useState("rgba(237, 231, 216, 0.3)");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-loop" }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; duplicate?: boolean; error?: string }
        | null;

      if (data?.ok && data.duplicate) {
        setStatus("duplicate");
        setMsg("You're already subscribed — thank you!");
        return;
      }
      if (data?.ok) {
        setStatus("success");
        setMsg("Thanks! You're subscribed.");
        setEmail("");
        return;
      }

      setStatus("error");
      setMsg(data?.error || "Could not subscribe right now. Please try again.");
    } catch {
      setStatus("error");
      setMsg("Could not subscribe right now. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
        <input
          type="email"
          id="newsletter-email-loop"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          inputMode="email"
          autoComplete="email"
          aria-label="Email address"
          className="flex-1 px-6 py-4 text-base border-2 rounded-sm focus:outline-none transition-all duration-300"
          style={{
            borderColor: borderColor,
            color: "var(--color-cafe-cream)",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            boxShadow:
              borderColor === "var(--color-cafe-tan)"
                ? "0 0 0 3px rgba(164, 141, 120, 0.15)"
                : "none",
          }}
          onFocus={() => setBorderColor("var(--color-cafe-tan)")}
          onBlur={() => setBorderColor("rgba(237, 231, 216, 0.25)")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold border-2 border-cafe-cream rounded-sm text-cafe-cream transition-all duration-300 hover:bg-cafe-cream hover:text-cafe-olive hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </form>

      {msg && (
        <div
          role="status"
          className="mt-3 text-sm"
          style={{
            color:
              status === "success" || status === "duplicate"
                ? "var(--color-cafe-mist)"
                : "rgb(254 202 202)",
          }}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
