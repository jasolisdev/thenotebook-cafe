"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 bg-cafe-tan/5 rounded-2xl border border-cafe-tan/10 animate-in fade-in duration-500">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-cafe-black">Message Sent!</h3>
        <p className="text-cafe-brown/80 max-w-xs">
          Thank you for reaching out. We&apos;ll get back to you as soon as the coffee finishes brewing (usually within 24 hours).
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4">
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-cafe-tan">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-cafe-tan/30 py-3 focus:border-cafe-tan focus:outline-none transition-colors placeholder:text-cafe-brown/30 text-cafe-black"
            placeholder="Jane Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-cafe-tan">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-cafe-tan/30 py-3 focus:border-cafe-tan focus:outline-none transition-colors placeholder:text-cafe-brown/30 text-cafe-black"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs uppercase tracking-wider font-bold text-cafe-tan">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-cafe-tan/30 py-3 focus:border-cafe-tan focus:outline-none transition-colors text-cafe-black appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a topic...</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Events & Reservations">Events & Reservations</option>
          <option value="Careers">Careers</option>
          <option value="Feedback">Feedback</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs uppercase tracking-wider font-bold text-cafe-tan">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-cafe-tan/30 py-3 focus:border-cafe-tan focus:outline-none transition-colors placeholder:text-cafe-brown/30 text-cafe-black resize-none"
          placeholder="How can we help you today?"
        />
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={status === "loading"} 
          fullWidth
          variant="primary"
          className="md:w-auto"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </div>
      
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2">
          Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}
