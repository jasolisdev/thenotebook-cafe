"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the page to trigger middleware check
        router.refresh();
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f0e9] px-6 py-20">
      <div className="max-w-[500px] w-full mx-auto">
        {/* Lock Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(201,154,88,0.15)] border-2 border-[rgba(201,154,88,0.3)] mb-6">
            <svg
              className="w-10 h-10 text-[rgba(201,154,88,0.8)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#2a1f16] mb-3">
            THE NOTEBOOK CAFÉ
          </h1>
          <p className="text-[15px] text-[#6b5a48] mb-2">
            We&apos;re currently under development
          </p>
          <p className="text-[14px] text-[#8a7a68]">
            Enter password to preview the site
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-6 py-4 bg-white border-2 border-[rgba(201,154,88,0.3)] text-[#2a1f16] placeholder:text-[#b5a598] focus:outline-none focus:border-[rgba(201,154,88,0.6)] transition-all text-[15px]"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="text-center text-[14px] text-red-600 bg-red-50 border border-red-200 py-2.5 px-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full px-8 py-4 bg-[#2a1f16] text-white text-[14px] font-bold uppercase tracking-widest transition-all hover:bg-[#1a140f] disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            {isLoading ? "VERIFYING..." : "ENTER SITE"}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-[12px] text-[#8a7a68]">
            Coming Fall 2025 • Riverside, CA
          </p>
        </div>
      </div>
    </main>
  );
}
