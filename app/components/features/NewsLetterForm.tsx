
"use client";

import { useState } from "react";

export default function NewsletterForm({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();

      if (data.ok && data.duplicate) {
        setStatus("duplicate");
        setMsg("You’re already on the list — thank you!");
      } else if (data.ok) {
        setStatus("success");
        setMsg("Thanks! You’re subscribed.");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Could not subscribe right now. Please try again later.");
    }
  }

  return (
    <div>
      <style jsx>{`
        input::placeholder {
          color: #CBB9A4;
        }
      `}</style>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          inputMode="email"
          autoComplete="email"
          className="flex-1 px-6 py-4 rounded-full border outline-none transition-all duration-200 placeholder-cafe-beige bg-white"
          style={{
            borderColor: '#CBB9A4',
            color: '#2C2420',
            boxShadow: '0 8px 28px rgba(44, 36, 32, 0.06)'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#A48D78';
            e.currentTarget.style.boxShadow = '0 10px 32px rgba(164, 141, 120, 0.22)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#CBB9A4';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(44, 36, 32, 0.06)';
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-4 rounded-sm uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold bg-cafe-black text-cafe-white transition-all duration-300 disabled:opacity-50 hover:bg-cafe-brown hover:shadow-lg hover:-translate-y-0.5 overflow-hidden whitespace-nowrap shrink-0"
        >
          <span className="relative z-10">
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </span>
          <div className="absolute inset-0 bg-cafe-tan opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </button>
      </form>

      {msg && (
        <div
          role="status"
          className={`text-sm mt-4 ${status === "success" || status === "duplicate"
              ? "text-green-700"
              : "text-red-700"
            }`}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
