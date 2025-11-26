"use client";

import { useState } from "react";

/**
 * ContactForm Component
 *
 * Form for customer inquiries with name, email, subject, and message fields.
 * Matches the home page aesthetic with clean styling.
 *
 * @component
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      // TODO: Implement actual form submission to API endpoint
      // For now, simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMsg("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMsg("");
      }, 5000);
    } catch {
      setStatus("error");
      setMsg("Could not send your message right now. Please try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full rounded-xl bg-white border border-[rgba(164,141,120,0.25)]
                     px-4 py-3 text-[15px] focus:outline-none focus:border-[rgba(164,141,120,0.5)]
                     transition-colors"
          style={{ color: "#2a1f16" }}
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          inputMode="email"
          autoComplete="email"
          className="w-full rounded-xl bg-white border border-[rgba(164,141,120,0.25)]
                     px-4 py-3 text-[15px] focus:outline-none focus:border-[rgba(164,141,120,0.5)]
                     transition-colors"
          style={{ color: "#2a1f16" }}
        />
      </div>

      {/* Subject Input */}
      <div>
        <label htmlFor="subject" className="sr-only">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full rounded-xl bg-white border border-[rgba(164,141,120,0.25)]
                     px-4 py-3 text-[15px] focus:outline-none focus:border-[rgba(164,141,120,0.5)]
                     transition-colors"
          style={{ color: "#2a1f16" }}
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows={6}
          className="w-full rounded-xl bg-white border border-[rgba(164,141,120,0.25)]
                     px-4 py-3 text-[15px] focus:outline-none focus:border-[rgba(164,141,120,0.5)]
                     transition-colors resize-none"
          style={{ color: "#2a1f16" }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl px-6 py-3 bg-[rgba(164,141,120,1)] text-[#0f0c0a]
                   text-[15px] font-semibold tracking-wide uppercase
                   hover:bg-[rgba(180,138,78,1)] transition-all
                   disabled:opacity-60 disabled:cursor-not-allowed
                   hover:shadow-lg"
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>

      {/* Status Message */}
      {msg && (
        <div
          role="status"
          className={`text-sm text-center py-2 rounded-lg ${
            status === "success"
              ? "bg-[rgba(164,141,120,0.1)] text-[rgba(42,31,22,0.9)]"
              : "bg-[rgba(200,100,100,0.1)] text-[rgba(150,50,50,0.9)]"
          }`}
        >
          {msg}
        </div>
      )}
    </form>
  );
}
