
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
      <form onSubmit={onSubmit} className="newsletter-form-wrapper">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          inputMode="email"
          autoComplete="email"
          className="newsletter-input"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="newsletter-submit-btn"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {msg && (
        <div
          role="status"
          className={`text-sm mt-3 ${status === "success" || status === "duplicate"
              ? "text-green-700"
              : "text-red-700"
            }`}
        >
          {msg}
        </div>
      )}

      <p className="newsletter-privacy mt-4">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
}
