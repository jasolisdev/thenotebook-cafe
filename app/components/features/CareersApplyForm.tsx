"use client";

import { FormEvent, useRef, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const formatPhoneInput = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const parts = [];
  if (digits.length > 0) parts.push(`(${digits.slice(0, 3)}`);
  if (digits.length >= 4) parts[0] = `(${digits.slice(0, 3)})`;
  if (digits.length >= 4) parts.push(` ${digits.slice(3, 6)}`);
  if (digits.length >= 7) parts.push(`-${digits.slice(6)}`);
  return parts.join("").trim();
};

export default function CareersApplyForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [applicationFile, setApplicationFile] = useState<File | null>(null);
  const [submitStatus, setSubmitStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [resumeError, setResumeError] = useState<string>("");
  const [applicationError, setApplicationError] = useState<string>("");
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const applicationInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];
    if (resumeError) errors.push(resumeError);
    if (applicationError) errors.push(applicationError);
    if (!formData.firstName.trim()) errors.push("First Name is required");
    if (!formData.lastName.trim()) errors.push("Last Name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone Number is required");
    if (!formData.message.trim()) errors.push("Why Us? is required");
    if (!resumeFile) errors.push("Resume is required");
    if (!applicationFile) errors.push("Completed application is required");

    if (errors.length > 0) {
      setValidationErrors(errors);
      setSubmitError("");
      setTimeout(() => {
        const formElement = document.querySelector("form");
        if (formElement) {
          const formTop = formElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: formTop - 180, behavior: "smooth" });
        }
      }, 100);
      return;
    }

    setValidationErrors([]);
    setSubmitError("");
    setSubmitStatus("idle");

    try {
      const payload = new FormData();
      payload.append("firstName", formData.firstName);
      payload.append("lastName", formData.lastName);
      payload.append("email", formData.email);
      payload.append("message", formData.message);
      payload.append("phone", formData.phone);
      payload.append("role", "Barista Cashier");
      if (resumeFile) payload.append("resume", resumeFile);
      if (applicationFile) payload.append("application", applicationFile);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: payload,
      });

      const responseData = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (response.ok && responseData?.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setResumeFile(null);
        setApplicationFile(null);
        setResumeError("");
        setApplicationError("");
        if (resumeInputRef.current) {
          resumeInputRef.current.value = "";
        }
        if (applicationInputRef.current) {
          applicationInputRef.current.value = "";
        }
      } else {
        setSubmitStatus("error");
        setSubmitError(responseData?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="editorial-form-container">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-1">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-cafe-black">Application Sent!</h3>
          <p className="text-cafe-brown/80 max-w-xs text-sm">
            Thanks for applying. We&apos;ll review your resume and reach out soon.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setSubmitStatus("idle")}
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="editorial-form-container">
      {validationErrors.length > 0 && (
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "2px solid rgba(239, 68, 68, 0.3)",
          }}
        >
          <h3 className="font-serif text-lg mb-3" style={{ color: "#ef4444" }}>
            Please fix the following errors:
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-sm" style={{ color: "#ef4444" }}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="quick-apply-grid">
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name *"
          className="input-field"
          value={formData.firstName}
          disabled
          aria-label="First Name"
          autoComplete="given-name"
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name *"
          className="input-field"
          value={formData.lastName}
          disabled
          aria-label="Last Name"
          autoComplete="family-name"
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      <div className="quick-apply-grid quick-apply-grid--spaced">
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone Number *"
          className="input-field"
          value={formData.phone}
          inputMode="tel"
          disabled
          aria-label="Phone Number"
          autoComplete="tel"
          onChange={(e) => setFormData({ ...formData, phone: formatPhoneInput(e.target.value) })}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email *"
          className="input-field"
          value={formData.email}
          disabled
          aria-label="Email"
          autoComplete="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <label className="form-group-label" htmlFor="message">Why Us? *</label>
      <textarea
        id="message"
        name="message"
        className="input-field"
        placeholder="Tell us why you're a good fit..."
        style={{ minHeight: "80px", resize: "vertical" }}
        value={formData.message}
        disabled
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <span className="form-group-label" id="resume-label">
        Resume *
      </span>
      <div className="file-upload-zone opacity-50 cursor-not-allowed" aria-labelledby="resume-label">
        <p style={{ margin: "0 0 8px", fontSize: "0.9rem" }}>
          {resumeFile ? resumeFile.name : "Uploads Paused"}
        </p>
        <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>PDF, DOC, or DOCX (Max 5MB)</span>
      </div>

      <p className="text-xs text-cafe-brown/70 mb-6">
        <strong>Required:</strong> Please{" "}
        <a
          href="/tnc-application-template.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-cafe-brown/40 underline-offset-4 hover:text-cafe-brown font-bold"
        >
          download our application template
        </a>
        , complete it, and upload the finished file below. This is now mandatory for all applicants.
      </p>

      <span className="form-group-label" id="application-label">
        Completed Application *
      </span>
      <div className="file-upload-zone opacity-50 cursor-not-allowed" aria-labelledby="application-label">
        <p style={{ margin: "0 0 8px", fontSize: "0.9rem" }}>
          {applicationFile ? applicationFile.name : "Uploads Paused"}
        </p>
        <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>PDF, DOC, or DOCX (Max 5MB)</span>
      </div>

      <button type="button" disabled className="btn-primary opacity-50 cursor-not-allowed">
        Applications Closed
      </button>

      {submitStatus === "error" && (
        <p className="text-center font-medium" style={{ color: "#ef4444" }}>
          {submitError || "Something went wrong. Please try again or email us directly."}
        </p>
      )}
    </form>
  );
}
