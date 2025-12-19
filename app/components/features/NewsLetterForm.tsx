
"use client";

import { useState } from "react";

export default function NewsletterForm({ source = "homepage", inline = false }: { source?: string; inline?: boolean }) {
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
        setMsg("You're already on the list — thank you!");
      } else if (data.ok) {
        setStatus("success");
        setMsg("Thanks! You're subscribed.");
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

  // Inline footer style - minimalist line design
  if (inline) {
    return (
      <div>
        <form onSubmit={onSubmit} className="flex gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            inputMode="email"
            autoComplete="email"
            className="flex-1 bg-transparent border-0 border-b outline-none px-0 py-2 text-sm transition-all"
            style={{
              borderColor: 'rgba(var(--coffee-100-rgb), 0.3)',
              color: 'var(--color-coffee-50)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(var(--coffee-100-rgb), 0.6)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(var(--coffee-100-rgb), 0.3)';
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 text-xs uppercase font-bold tracking-wider transition-all hover:opacity-80"
            style={{
              backgroundColor: 'var(--color-coffee-50)',
              color: 'var(--color-coffee-900)',
            }}
          >
            {status === "loading" ? "..." : "Join"}
          </button>
        </form>

        {msg && (
          <div
            role="status"
            className="text-xs mt-2"
            style={{
              color:
                status === "success" || status === "duplicate"
                  ? "var(--color-cafe-mist)"
                  : "rgb(248 113 113)",
            }}
          >
            {msg}
          </div>
        )}
      </div>
    );
  }

  // Default homepage style
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          inputMode="email"
          autoComplete="email"
          className="flex-1 px-6 py-4 rounded-md border outline-none transition-all duration-200 placeholder:text-cafe-beige bg-white"
          style={{
            borderColor: "var(--color-cafe-beige)",
            color: "var(--color-cafe-black)",
            boxShadow: "0 8px 28px rgba(var(--cafe-black-rgb), 0.06)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-cafe-tan)";
            e.currentTarget.style.boxShadow = "0 10px 32px rgba(var(--cafe-tan-rgb), 0.22)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--color-cafe-beige)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(var(--cafe-black-rgb), 0.06)";
          }}
        />
	        <button
	          type="submit"
	          disabled={status === "loading"}
	          className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-4 rounded-sm uppercase tracking-[0.2em] text-2xs sm:text-xs font-semibold bg-cafe-black text-cafe-white transition-all duration-300 disabled:opacity-50 hover:bg-cafe-brown hover:shadow-lg hover:-translate-y-0.5 overflow-hidden whitespace-nowrap shrink-0"
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
