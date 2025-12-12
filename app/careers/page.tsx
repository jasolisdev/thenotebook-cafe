/**
 * Careers Page - The Notebook Café
 *
 * Join our team page featuring culture, open positions, hiring process, and application form.
 */
"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Reveal from "../components/ui/Reveal";
import RevealText from "../components/ui/RevealText";
import FadeInSection from "../components/ui/FadeInSection";
import ParallaxHero from "../components/features/ParallaxHero";
import { Coffee, Heart, TrendingUp, CheckCircle, Upload, Briefcase, Clock, ChefHat } from "lucide-react";
import "../styles/pages/careers.css";
import "../styles/components/application-form.css";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    console.log("Form submitted", formData);

    // Reset validation errors
    const errors: string[] = [];

    // Validate required fields
    if (!formData.firstName.trim()) {
      errors.push("First Name is required");
    }
    if (!formData.lastName.trim()) {
      errors.push("Last Name is required");
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

    console.log("Validation errors:", errors);

    // If there are validation errors, show them and don't submit
    if (errors.length > 0) {
      setValidationErrors(errors);
      // Scroll to beginning of form (accounting for navbar height)
      setTimeout(() => {
        const formElement = document.querySelector('form');
        if (formElement) {
          const formTop = formElement.getBoundingClientRect().top + window.scrollY;
          const offset = 180; // Navbar height + some spacing
          window.scrollTo({ top: formTop - offset, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Clear validation errors
    setValidationErrors([]);
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
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
            {/* Main Headline - Instant reveal */}
            <RevealText delay="0ms">
              <h1 className="font-serif text-[56px] md:text-[86px] leading-[0.95]" style={{ color: 'var(--cafe-cream)' }}>
                Join The Team<br />
                <span className="italic" style={{ color: 'var(--cafe-tan)' }}>Build The Culture</span>
              </h1>
            </RevealText>

            {/* Body Content - 400ms delay */}
            <FadeInSection delay="400ms">
              <p className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: 'rgba(var(--cafe-cream-rgb), 0.82)' }}>
                We're looking for baristas, creatives, and morning people who want to shape Riverside&apos;s coffee scene.
              </p>
            </FadeInSection>
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
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Culture Values Section */}
      <section
        data-section="Culture Values"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: 'var(--cafe-olive)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <Reveal delay={200}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(237, 231, 216, 0.2)' }}>
                  <Heart size={28} style={{ color: 'var(--cafe-cream)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-cream)' }}>
                  Family Vibes
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(237, 231, 216, 0.9)' }}>
                  Locally-owned by a husband-wife team. This is our dream, and we want to grow it with people who're passionate about what we do.
                </p>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(237, 231, 216, 0.2)' }}>
                  <Coffee size={28} style={{ color: 'var(--cafe-cream)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-cream)' }}>
                  Craft-Focused
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(237, 231, 216, 0.9)' }}>
                  From espresso to acai bowls, we take pride in every detail. Learn barista skills, food prep, and the art of hospitality.
                </p>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(237, 231, 216, 0.2)' }}>
                  <TrendingUp size={28} style={{ color: 'var(--cafe-cream)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl" style={{ color: 'var(--cafe-cream)' }}>
                  Room to Grow
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'rgba(237, 231, 216, 0.9)' }}>
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
                  If you vibe with our mission and love great coffee, we want to hear from you. Fill out the form below.
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
                  We'll set up a casual conversation—think of it as getting to know each other over coffee.
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
                  We know waiting is tough, so we move fast. We'll keep you in the loop every step of the way.
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
            className="editorial-form-container"
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

            {/* Row 1: Name & DOB */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <input
                type="text"
                placeholder="Full Name *"
                className="input-field"
                value={`${formData.firstName} ${formData.lastName}`}
                onChange={(e) => {
                  const names = e.target.value.split(' ');
                  setFormData({
                    ...formData,
                    firstName: names[0] || '',
                    lastName: names.slice(1).join(' ') || ''
                  });
                }}
              />
              <input
                type="text"
                placeholder="Date of Birth *"
                className="input-field"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
              />
            </div>

            {/* Row 2: Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
              <input
                type="email"
                placeholder="Email *"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number *"
                className="input-field"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Checkbox Section: Positions */}
            <label className="form-group-label">Position(s) Interested In *</label>
            <div className="checkbox-grid">
              {['Barista', 'Shift Lead', 'Kitchen Prep'].map((opt) => (
                <label key={opt} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={formData.positions.includes(opt.toLowerCase().replace(' ', '-'))}
                    onChange={() => handlePositionToggle(opt.toLowerCase().replace(' ', '-'))}
                  />
                  {opt}
                </label>
              ))}
            </div>

            {/* Checkbox Section: Employment Type */}
            <label className="form-group-label">Employment Type *</label>
            <div className="checkbox-grid">
              {['Full-time', 'Part-time', 'Weekends Only', 'Flexible'].map((opt) => (
                <label key={opt} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={formData.employmentType === opt.toLowerCase().replace(/ /g, '-')}
                    onChange={() => setFormData({ ...formData, employmentType: opt.toLowerCase().replace(/ /g, '-') })}
                  />
                  {opt}
                </label>
              ))}
            </div>

            {/* Checkbox Section: Availability */}
            <label className="form-group-label">Days Available (Closed Sundays) *</label>
            <div className="checkbox-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((opt) => (
                <label key={opt} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={formData.daysAvailable.includes(opt.toLowerCase())}
                    onChange={() => handleDayToggle(opt.toLowerCase())}
                  />
                  {opt}
                </label>
              ))}
            </div>

            {/* Row 3: Start Date & Hours */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <div>
                <label className="form-group-label" style={{ marginTop: '10px' }}>When Can You Start? *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="MM/DD/YYYY"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="form-group-label" style={{ marginTop: '10px' }}>Hours Per Week Desired *</label>
                <div className="checkbox-grid" style={{ gridTemplateColumns: '1fr', gap: '5px' }}>
                  {['0-16 Hours', '16-20 Hours', '20-35 Hours', '35-40 Hours'].map((opt) => (
                    <label key={opt} className="checkbox-label" style={{ fontSize: '0.9rem' }}>
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={formData.hoursPerWeek === opt.toLowerCase().replace(/ /g, '-')}
                        onChange={() => setFormData({ ...formData, hoursPerWeek: opt.toLowerCase().replace(/ /g, '-') })}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Textarea */}
            <label className="form-group-label">Why Us? *</label>
            <textarea
              className="input-field"
              placeholder="Tell us why you're a good fit..."
              style={{ minHeight: '80px', resize: 'vertical' }}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>

            {/* File Upload */}
            <label className="form-group-label">Resume *</label>
            <div className="file-upload-zone" onClick={() => document.getElementById('resume-input')?.click()}>
              <Upload size={24} style={{ color: 'var(--cafe-tan)' }} />
              <p style={{ margin: '10px 0 0', fontSize: '0.9rem' }}>
                {resumeFile ? resumeFile.name : 'Click to upload resume'}
              </p>
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>PDF, DOC, or DOCX (Max 5MB)</span>
              <input
                id="resume-input"
                type="file"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === "success"}
              className="btn-primary"
              style={{ marginTop: '30px' }}
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
