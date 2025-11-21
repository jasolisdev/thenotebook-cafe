
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
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        inputMode="email"
        autoComplete="email"
        className="flex-1 rounded-xl bg-transparent border border-[rgba(255,255,255,.15)]
                   px-4 py-3 text-[15px] ink-cream placeholder-[rgba(255,255,255,.35)]
                   focus:outline-none focus:border-[rgba(255,255,255,.35)]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl px-6 py-3 bg-[rgba(255,255,255,.08)]
                   border border-[rgba(255,255,255,.18)]
                   ink-cream text-[15px] font-medium
                   hover:bg-[rgba(255,255,255,.15)] transition-colors
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>

      {msg && (
        <div
          role="status"
          className={`text-sm ${status === "success" || status === "duplicate"
              ? "ink-cream"
              : "ink-cream-dim"
            }`}
        >
          {msg}
        </div>
      )}
    </form>
  );
}
