/**
 * Careers Page - The Notebook Café
 *
 * Join our team page featuring culture, open positions, hiring process, and application form.
 */
"use client";

import { useState, FormEvent } from "react";
import Reveal from "../components/ui/Reveal";
import ParallaxHero from "../components/features/ParallaxHero";
import { Coffee, Heart, TrendingUp, CheckCircle, Upload, Briefcase, Clock, ChefHat } from "lucide-react";
import "../styles/pages/careers.css";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthdate: "",
    positions: [] as string[],
    employmentType: "",
    daysAvailable: [] as string[],
    startDate: "",
    hoursPerWeek: "",
    commitmentLength: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [supplementalFile, setSupplementalFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handlePositionToggle = (position: string) => {
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.includes(position)
        ? prev.positions.filter(p => p !== position)
        : [...prev.positions, position]
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => {
      const newDays = prev.daysAvailable.includes(day)
        ? prev.daysAvailable.filter(d => d !== day)
        : [...prev.daysAvailable, day];

      return {
        ...prev,
        daysAvailable: newDays
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset validation errors
    const errors: string[] = [];

    // Validate required fields
    if (!formData.fullName.trim()) {
      errors.push("Full Name is required");
    }
    if (!formData.email.trim()) {
      errors.push("Email is required");
    }
    if (!formData.phone.trim()) {
      errors.push("Phone Number is required");
    }
    if (!formData.birthdate) {
      errors.push("Date of Birth is required");
    }
    if (formData.positions.length === 0) {
      errors.push("At least one Position must be selected");
    }
    if (!formData.employmentType) {
      errors.push("Employment Type is required");
    }
    if (formData.daysAvailable.length === 0) {
      errors.push("At least one day of Work Availability must be selected");
    }
    if (!formData.startDate) {
      errors.push("Start Date is required");
    }
    if (!formData.hoursPerWeek) {
      errors.push("Hours Per Week is required");
    }
    if (!formData.commitmentLength) {
      errors.push("Commitment Length is required");
    }

    // If there are validation errors, show them and don't submit
    if (errors.length > 0) {
      setValidationErrors(errors);
      // Scroll to top of form to show errors
      window.scrollTo({ top: document.querySelector('form')?.offsetTop, behavior: 'smooth' });
      return;
    }

    // Clear validation errors
    setValidationErrors([]);
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("birthdate", formData.birthdate);
      data.append("positions", JSON.stringify(formData.positions));
      data.append("employmentType", formData.employmentType);
      data.append("daysAvailable", JSON.stringify(formData.daysAvailable));
      data.append("startDate", formData.startDate);
      data.append("hoursPerWeek", formData.hoursPerWeek);
      data.append("commitmentLength", formData.commitmentLength);
      data.append("message", formData.message);
      if (resumeFile) {
        data.append("resume", resumeFile);
      }
      if (supplementalFile) {
        data.append("supplementalApplication", supplementalFile);
      }

      const response = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Redirect to thank you page after 1.5 seconds
        setTimeout(() => {
          window.location.href = "/careers/thank-you";
        }, 1500);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Application error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--cafe-mist)' }}>
      {/* Hero Section */}
      <div className="careers-hero-wrapper">
        <ParallaxHero
          backgroundImage="/careers/tnc-career-hero-bg.png"
          focusPercent={150}
          overlayVariant="light"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <Reveal>
              <span className="font-bold tracking-[0.2em] uppercase text-sm block" style={{ color: 'var(--cafe-tan)' }}>
                Join Our Team
              </span>
            </Reveal>

            <Reveal delay={200}>
              <h1 className="font-serif text-[56px] md:text-[86px] leading-[0.9]" style={{ color: 'var(--cafe-cream)' }}>
                Be Part of<br />
                <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Something Special</span>
              </h1>
            </Reveal>

            <Reveal delay={400}>
              <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-cream-rgb), 0.82)' }}>
                Help us build Riverside&apos;s first truly genuine coffee community hub. We&apos;re looking for passionate, driven people who love great coffee and warm vibes.
              </p>
            </Reveal>
          </div>
        </ParallaxHero>
      </div>

      {/* Culture Section */}
      <section
        data-section="Our Culture"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Not Your Typical Coffee Shop
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-5xl sm:text-6xl mb-8 leading-none" style={{ color: 'var(--cafe-black)' }}>
                A <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Different</span> Kind of Café
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(74, 59, 50, 0.82)' }}>
                We&apos;re locally-owned, family-oriented, and all about creating a space where people actually want to spend time. Think lofi house music, specialty coffee, fresh acai bowls, and a team that genuinely cares about the craft.
              </p>            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-16">
            <Reveal delay={200}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                  <Heart size={28} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>
                  Family Vibes
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  Locally-owned by a husband-wife team. This is our dream, and we want to grow it with people who&apos;re passionate about what we do.
                </p>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                  <Coffee size={28} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>
                  Craft-Focused
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  From espresso to acai bowls, we take pride in every detail. Learn barista skills, food prep, and the art of hospitality.
                </p>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                  <TrendingUp size={28} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>
                  Room to Grow
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  This is a new café with big ambitions. Grow with us—leadership opportunities, skill development, and career advancement.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section
        data-section="Perks & Benefits"
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-center mb-16" style={{ color: 'var(--cafe-black)' }}>
              What We <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Offer</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <div className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(244, 241, 234, 0.5)' }}>
                <CheckCircle size={24} style={{ color: 'var(--cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--cafe-black)' }}>Employee Training</h3>
                  <p className="font-light" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    Comprehensive training in barista skills, food prep, customer service, and café operations.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(244, 241, 234, 0.5)' }}>
                <CheckCircle size={24} style={{ color: 'var(--cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--cafe-black)' }}>Flexible Scheduling</h3>
                  <p className="font-light" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    We work with your schedule. Students, parents, side hustlers—we get it.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(244, 241, 234, 0.5)' }}>
                <CheckCircle size={24} style={{ color: 'var(--cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--cafe-black)' }}>Career Development</h3>
                  <p className="font-light" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    Start as a barista, grow into a shift lead or manager. We promote from within.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(244, 241, 234, 0.5)' }}>
                <CheckCircle size={24} style={{ color: 'var(--cafe-tan)', flexShrink: 0 }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ color: 'var(--cafe-black)' }}>Great Vibes Daily</h3>
                  <p className="font-light" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                    Work to a curated lofi house soundtrack in a beautiful space with a supportive team.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section
        data-section="Open Positions"
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                We&apos;re Hiring
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-5xl sm:text-6xl mb-6 leading-none" style={{ color: 'var(--cafe-black)' }}>
                Open <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Positions</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Barista */}
            <Reveal delay={150}>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--cafe-white)', border: '2px solid rgba(164, 141, 120, 0.15)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <Coffee size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Barista</h3>
                </div>
                <p className="font-light leading-relaxed mb-4" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  Craft exceptional espresso drinks, serve customers with warmth and care, and maintain our high quality standards. Learn latte art, dialing in espresso, and the science behind great coffee.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Espresso Skills
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Customer Service
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Latte Art
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Opening Shift Lead */}
            <Reveal delay={230}>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--cafe-white)', border: '2px solid rgba(164, 141, 120, 0.15)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <Clock size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Opening Shift Lead</h3>
                </div>
                <p className="font-light leading-relaxed mb-4" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  Open the café, prep for service, and lead the morning team. Responsible for setting up equipment, managing opening duties, and ensuring everything runs smoothly during morning rush.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Leadership
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Opening Procedures
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Team Management
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Closing Shift Lead */}
            <Reveal delay={310}>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--cafe-white)', border: '2px solid rgba(164, 141, 120, 0.15)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <Briefcase size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Closing Shift Lead</h3>
                </div>
                <p className="font-light leading-relaxed mb-4" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  Close the café, clean and reset for the next day, and lead the evening team. Ensure all closing checklists are completed and the space is ready for tomorrow&apos;s service.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Leadership
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Closing Procedures
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Quality Control
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Kitchen Prep/Barista */}
            <Reveal delay={390}>
              <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--cafe-white)', border: '2px solid rgba(164, 141, 120, 0.15)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(164, 141, 120, 0.12)' }}>
                    <ChefHat size={22} style={{ color: 'var(--cafe-tan)' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-black)' }}>Kitchen Prep / Barista</h3>
                </div>
                <p className="font-light leading-relaxed mb-4" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  Prepare fresh acai bowls, sandwiches, and pastries while cross-training on the coffee bar. Perfect for someone who loves both food and coffee, and wants to learn multiple skills.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Food Prep
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Barista Training
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(164, 141, 120, 0.1)', color: 'var(--cafe-brown)' }}>
                    Multi-Tasking
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section
        data-section="Hiring Process"
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <Reveal>
              <span className="text-cafe-tan font-bold tracking-widest uppercase text-xs mb-4 block">
                Our Process
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif text-5xl sm:text-6xl mb-6 leading-none" style={{ color: 'var(--cafe-black)' }}>
                How We <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Hire</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1: Apply */}
            <Reveal delay={150}>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--cafe-tan)', color: 'white' }}>
                  <span className="font-serif text-3xl">1</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--cafe-black)' }}>
                  Apply
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  If you vibe with our mission and love great coffee, we want to hear from you. Fill out the form below and show us who you are.
                </p>
              </div>
            </Reveal>

            {/* Step 2: Connect */}
            <Reveal delay={250}>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--cafe-tan)', color: 'white' }}>
                  <span className="font-serif text-3xl">2</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--cafe-black)' }}>
                  Connect
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  We&apos;ll set up a casual conversation—think of it as getting to know each other over coffee. You&apos;ll learn about our café, our culture, and the role. We&apos;ll learn about you, your goals, and what you bring to the table.
                </p>
              </div>
            </Reveal>

            {/* Step 3: Decision */}
            <Reveal delay={350}>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--cafe-tan)', color: 'white' }}>
                  <span className="font-serif text-3xl">3</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--cafe-black)' }}>
                  Decision
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                  We know waiting is tough, so we move fast. Whether it&apos;s a yes or not quite right now, we&apos;ll keep you in the loop every step of the way.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        data-section="Application Form"
        className="py-24 md:py-32 relative"
        style={{ backgroundColor: 'var(--cafe-mist)' }}
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: 'var(--cafe-black)' }}>
                Ready to <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Apply?</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg font-light" style={{ color: 'rgba(74, 59, 50, 0.82)' }}>
                We&apos;re excited to meet you! Fill out the form below and we&apos;ll be in touch soon.
              </p>
            </Reveal>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 rounded-3xl space-y-6"
            style={{ backgroundColor: 'var(--cafe-white)', border: '2px solid rgba(164, 141, 120, 0.2)' }}
          >
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div
                className="p-5 rounded-lg"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '2px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                <h3 className="font-serif text-lg mb-3" style={{ color: '#ef4444' }}>
                  Please fix the following errors:
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm" style={{ color: '#ef4444' }}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Full Name <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--cafe-mist)',
                  border: '1px solid rgba(164, 141, 120, 0.2)',
                  color: 'var(--cafe-black)'
                }}
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Email <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--cafe-mist)',
                  border: '1px solid rgba(164, 141, 120, 0.2)',
                  color: 'var(--cafe-black)'
                }}
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Phone Number <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--cafe-mist)',
                  border: '1px solid rgba(164, 141, 120, 0.2)',
                  color: 'var(--cafe-black)'
                }}
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Birthdate */}
            <div>
              <label htmlFor="birthdate" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Date of Birth <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <input
                type="date"
                id="birthdate"
                required
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--cafe-mist)',
                  border: '1px solid rgba(164, 141, 120, 0.2)',
                  color: 'var(--cafe-black)'
                }}
              />
            </div>

            {/* Position(s) Interested In */}
            <div>
              <label className="block mb-3 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Position(s) Interested In <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <div className="space-y-3">
                {[
                  { value: "barista", label: "Barista" },
                  { value: "opening-lead", label: "Opening Shift Lead" },
                  { value: "closing-lead", label: "Closing Shift Lead" },
                  { value: "kitchen-prep", label: "Kitchen Prep / Barista" },
                ].map((position) => (
                  <label
                    key={position.value}
                    className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                    style={{
                      backgroundColor: formData.positions.includes(position.value)
                        ? 'rgba(164, 141, 120, 0.15)'
                        : 'rgba(244, 241, 234, 0.5)',
                      border: `2px solid ${formData.positions.includes(position.value) ? 'var(--cafe-tan)' : 'transparent'}`
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.positions.includes(position.value)}
                      onChange={() => handlePositionToggle(position.value)}
                      className="w-5 h-5"
                    />
                    <span className="font-medium" style={{ color: 'var(--cafe-black)' }}>
                      {position.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block mb-3 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Employment Type <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "full-time", label: "Full-time" },
                  { value: "part-time", label: "Part-time" },
                  { value: "weekends", label: "Weekends Only" },
                  { value: "flexible", label: "Flexible" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                    style={{
                      backgroundColor: formData.employmentType === option.value
                        ? 'rgba(164, 141, 120, 0.15)'
                        : 'rgba(244, 241, 234, 0.5)',
                      border: `2px solid ${formData.employmentType === option.value ? 'var(--cafe-tan)' : 'transparent'}`
                    }}
                  >
                    <input
                      type="radio"
                      name="employmentType"
                      value={option.value}
                      checked={formData.employmentType === option.value}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      className="w-5 h-5"
                    />
                    <span className="font-medium" style={{ color: 'var(--cafe-black)' }}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Availability - Days */}
            <div>
              <label className="block mb-3 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Work Availability <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <p className="text-sm mb-3" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                Select all days you&apos;re available. Saturday availability may be required (we&apos;re closed Sundays).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { value: "monday", label: "Monday" },
                  { value: "tuesday", label: "Tuesday" },
                  { value: "wednesday", label: "Wednesday" },
                  { value: "thursday", label: "Thursday" },
                  { value: "friday", label: "Friday" },
                  { value: "saturday", label: "Saturday" },
                ].map((day) => (
                  <label
                    key={day.value}
                    className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                    style={{
                      backgroundColor: formData.daysAvailable.includes(day.value)
                        ? 'rgba(164, 141, 120, 0.15)'
                        : 'rgba(244, 241, 234, 0.5)',
                      border: `2px solid ${formData.daysAvailable.includes(day.value) ? 'var(--cafe-tan)' : 'transparent'}`
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.daysAvailable.includes(day.value)}
                      onChange={() => handleDayToggle(day.value)}
                      className="w-5 h-5"
                    />
                    <span className="font-medium" style={{ color: 'var(--cafe-black)' }}>
                      {day.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* When Can You Start */}
            <div>
              <label htmlFor="startDate" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                When Can You Start? <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <input
                type="date"
                id="startDate"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--cafe-mist)',
                  border: '1px solid rgba(164, 141, 120, 0.2)',
                  color: 'var(--cafe-black)'
                }}
              />
            </div>

            {/* Hours Per Week */}
            <div>
              <label className="block mb-3 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Hours Per Week Desired <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "0-16", label: "0-16 Hours" },
                  { value: "16-20", label: "16-20 Hours" },
                  { value: "20-35", label: "20-35 Hours" },
                  { value: "35-40", label: "35-40 Hours" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                    style={{
                      backgroundColor: formData.hoursPerWeek === option.value
                        ? 'rgba(164, 141, 120, 0.15)'
                        : 'rgba(244, 241, 234, 0.5)',
                      border: `2px solid ${formData.hoursPerWeek === option.value ? 'var(--cafe-tan)' : 'transparent'}`
                    }}
                  >
                    <input
                      type="radio"
                      name="hoursPerWeek"
                      value={option.value}
                      checked={formData.hoursPerWeek === option.value}
                      onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                      className="w-5 h-5"
                    />
                    <span className="font-medium" style={{ color: 'var(--cafe-black)' }}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Commitment Length */}
            <div>
              <label className="block mb-3 font-medium" style={{ color: 'var(--cafe-black)' }}>
                How Long Do You Plan to Work Here? <span style={{ color: 'var(--cafe-tan)' }}>*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: "3-6-months", label: "3-6 months", sublabel: "Seasonal/Short-term" },
                  { value: "6-12-months", label: "6-12 months", sublabel: "" },
                  { value: "1-2-years", label: "1-2 years", sublabel: "" },
                  { value: "2plus-years", label: "2+ years", sublabel: "Long-term/Career" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all"
                    style={{
                      backgroundColor: formData.commitmentLength === option.value
                        ? 'rgba(164, 141, 120, 0.15)'
                        : 'rgba(244, 241, 234, 0.5)',
                      border: `2px solid ${formData.commitmentLength === option.value ? 'var(--cafe-tan)' : 'transparent'}`
                    }}
                  >
                    <input
                      type="radio"
                      name="commitmentLength"
                      value={option.value}
                      checked={formData.commitmentLength === option.value}
                      onChange={(e) => setFormData({ ...formData, commitmentLength: e.target.value })}
                      className="w-5 h-5"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium" style={{ color: 'var(--cafe-black)' }}>
                        {option.label}
                      </span>
                      {option.sublabel && (
                        <span className="text-xs" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                          {option.sublabel}
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Why The Notebook Café? <span className="text-sm font-normal" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>(Optional)</span>
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 resize-none"
                style={{
                  backgroundColor: 'var(--cafe-mist)',
                  border: '1px solid rgba(164, 141, 120, 0.2)',
                  color: 'var(--cafe-black)'
                }}
                placeholder="Tell us about yourself and why you want to work here..."
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Resume <span className="text-sm font-normal" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>(Optional)</span>
              </label>
              <div
                className="relative p-8 rounded-lg border-2 border-dashed text-center cursor-pointer transition-all hover:border-cafe-tan"
                style={{
                  borderColor: resumeFile ? 'var(--cafe-tan)' : 'rgba(164, 141, 120, 0.3)',
                  backgroundColor: resumeFile ? 'rgba(164, 141, 120, 0.05)' : 'var(--cafe-mist)'
                }}
              >
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload size={32} className="mx-auto mb-3" style={{ color: 'var(--cafe-tan)' }} />
                <p className="font-medium mb-1" style={{ color: 'var(--cafe-black)' }}>
                  {resumeFile ? resumeFile.name : "Click to upload resume"}
                </p>
                <p className="text-sm" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                  PDF, DOC, or DOCX (Max 5MB)
                </p>
              </div>
            </div>

            {/* Optional Supplemental Application PDF */}
            <div>
              <label htmlFor="supplemental" className="block mb-2 font-medium" style={{ color: 'var(--cafe-black)' }}>
                Supplemental Application <span className="text-sm font-normal" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>(Optional)</span>
              </label>
              <p className="text-sm mb-3" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                If you have additional information to provide, you may upload a completed application form (PDF only).{' '}
                <a
                  href="/application-template.html"
                  target="_blank"
                  className="font-medium underline"
                  style={{ color: 'var(--cafe-tan)' }}
                >
                  Download our application template here
                </a>
                {' '}(open in browser, fill out, and print to PDF).
              </p>
              <div
                className="relative p-8 rounded-lg border-2 border-dashed text-center cursor-pointer transition-all hover:border-cafe-tan"
                style={{
                  borderColor: supplementalFile ? 'var(--cafe-tan)' : 'rgba(164, 141, 120, 0.3)',
                  backgroundColor: supplementalFile ? 'rgba(164, 141, 120, 0.05)' : 'var(--cafe-mist)'
                }}
              >
                <input
                  type="file"
                  id="supplemental"
                  accept=".pdf"
                  onChange={(e) => setSupplementalFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload size={28} className="mx-auto mb-3" style={{ color: 'var(--cafe-tan)' }} />
                <p className="font-medium mb-1" style={{ color: 'var(--cafe-black)' }}>
                  {supplementalFile ? supplementalFile.name : "Click to upload supplemental application"}
                </p>
                <p className="text-sm" style={{ color: 'rgba(74, 59, 50, 0.6)' }}>
                  PDF only (Max 5MB)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === "success"}
              className="w-full py-4 rounded-lg font-serif text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--cafe-tan)',
                color: 'white',
                border: 'none'
              }}
            >
              {isSubmitting ? "Submitting..." : submitStatus === "success" ? "Application Sent! Redirecting..." : "Submit Application"}
            </button>

            {submitStatus === "error" && (
              <p className="text-center font-medium" style={{ color: '#ef4444' }}>
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
