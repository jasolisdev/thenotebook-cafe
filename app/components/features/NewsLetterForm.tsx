
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
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          inputMode="email"
          autoComplete="email"
          className="flex-1 px-6 py-4 outline-none transition-colors placeholder-cafe-beige"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBB9A4',
            color: '#2C2420'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#A48D78'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#CBB9A4'}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-4 uppercase tracking-widest text-xs font-semibold transition-colors disabled:opacity-50"
          style={{
            backgroundColor: status === "loading" ? '#2C2420' : '#2C2420',
            color: '#FFFFFF'
          }}
          onMouseEnter={(e) => !status || status === "idle" ? e.currentTarget.style.backgroundColor = '#A48D78' : null}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2C2420'}
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
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
