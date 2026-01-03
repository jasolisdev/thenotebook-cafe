"use client";

import { useState } from "react";
import {
  CheckCircle,
  MapPin,
  DollarSign,
  Briefcase,
  Gift,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface JobPositionProps {
  title: string;
  status: string;
  payRange: string;
  type: string;
  location: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
}

export default function JobPosition({
  title,
  status,
  payRange,
  type,
  location,
  overview,
  responsibilities,
  qualifications,
  benefits
}: JobPositionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyClick = () => {
    // Scroll to the apply section
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isHiringPaused = status === "Hiring Paused";

  return (
    <div
      className="rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10"
      style={{
        backgroundColor: 'rgba(237, 231, 216, 0.35)',
        border: '2px solid rgba(164, 141, 120, 0.25)',
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
        <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight" style={{ color: 'var(--color-cafe-black)' }}>
          {title}
        </h4>
        <span
          className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase font-semibold whitespace-nowrap self-start"
          style={{
            color: 'var(--color-cafe-tan)',
            backgroundColor: 'rgba(250, 249, 246, 0.8)',
            border: '1.5px solid rgba(164, 141, 120, 0.3)',
          }}
        >
          {type}
        </span>
      </div>

      {/* Overview */}
      <p
        className="font-normal text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8"
        style={{ color: 'rgba(74, 59, 50, 0.85)' }}
      >
        {overview}
      </p>

      {/* Requirements Header */}
      <h5 className="font-serif text-lg sm:text-xl mb-3 sm:mb-4" style={{ color: 'var(--color-cafe-black)' }}>
        Requirements:
      </h5>

      {/* Key Qualifications (show first 4) */}
      <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
        {qualifications.slice(0, 4).map((item, idx) => (
          <li key={idx} className="flex gap-2.5 sm:gap-3 items-start">
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
              style={{ backgroundColor: 'var(--color-cafe-tan)' }}
            />
            <span className="font-normal text-sm sm:text-base leading-snug" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Apply Now Button */}
      <button
        onClick={handleApplyClick}
        disabled={isHiringPaused}
        className={`w-full py-4 sm:py-5 rounded-full font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase text-xs sm:text-sm transition-all duration-300 ${
          isHiringPaused
            ? 'cursor-not-allowed opacity-60'
            : 'hover:scale-[1.02] hover:shadow-lg'
        }`}
        style={{
          backgroundColor: isHiringPaused ? 'rgba(74, 59, 50, 0.3)' : 'var(--color-cafe-tan)',
          color: isHiringPaused ? 'rgba(74, 59, 50, 0.5)' : 'white',
        }}
      >
        {isHiringPaused ? 'Hiring Paused' : 'Apply Now'}
      </button>

      {/* View Details Dropdown Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 mt-5 sm:mt-6 text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest font-bold transition-colors duration-300 hover:opacity-70"
        style={{ color: 'var(--color-cafe-tan)' }}
      >
        {isOpen ? "Hide Details" : "View Details"}
        {isOpen ? <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px]" /> : <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" />}
      </button>

      {/* Expandable Details Section */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="pt-6 sm:pt-8 space-y-6 sm:space-y-8">
            {/* Quick Facts and Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div
                className="p-5 sm:p-7 rounded-xl sm:rounded-2xl"
                style={{ backgroundColor: 'rgba(237, 228, 218, 0.4)', border: '1px solid rgba(164, 141, 120, 0.2)' }}
              >
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold font-inter mb-4 sm:mb-5" style={{ color: 'rgba(74, 59, 50, 0.7)' }}>
                  Quick Facts
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-3">
                    <DollarSign size={18} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.65)' }} />
                    <span className="font-normal text-base sm:text-lg leading-snug" style={{ color: 'rgba(74, 59, 50, 0.9)' }}>Pay: {payRange}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase size={18} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.65)' }} />
                    <span className="font-normal text-base sm:text-lg leading-snug" style={{ color: 'rgba(74, 59, 50, 0.9)' }}>Type: {type}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={18} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.65)' }} />
                    <span className="font-normal text-base sm:text-lg leading-snug" style={{ color: 'rgba(74, 59, 50, 0.9)' }}>Location: {location}</span>
                  </li>
                </ul>
              </div>

              <div
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
                style={{ backgroundColor: 'rgba(250, 249, 246, 0.6)', border: '1px solid rgba(164, 141, 120, 0.18)' }}
              >
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold font-inter mb-3 sm:mb-4" style={{ color: 'rgba(74, 59, 50, 0.65)' }}>
                  Benefits
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 sm:gap-3">
                      <Gift size={14} strokeWidth={1.6} aria-hidden="true" className="sm:w-4 sm:h-4" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                      <span className="font-normal text-sm sm:text-base" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Responsibilities and Full Qualifications */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-3 sm:space-y-4">
                <h5 className="font-serif text-lg sm:text-xl" style={{ color: 'var(--color-cafe-black)' }}>Responsibilities</h5>
                <ul className="space-y-2 sm:space-y-3">
                  {responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-2 sm:gap-3 items-start">
                      <CheckCircle size={14} strokeWidth={1.6} aria-hidden="true" className="mt-[2px] flex-shrink-0 sm:w-4 sm:h-4" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                      <span className="font-normal text-sm sm:text-base leading-snug" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h5 className="font-serif text-lg sm:text-xl" style={{ color: 'var(--color-cafe-black)' }}>All Qualifications</h5>
                <ul className="space-y-2 sm:space-y-3">
                  {qualifications.map((item, idx) => (
                    <li key={idx} className="flex gap-2 sm:gap-3 items-start">
                      <CheckCircle size={14} strokeWidth={1.6} aria-hidden="true" className="mt-[2px] flex-shrink-0 sm:w-4 sm:h-4" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                      <span className="font-normal text-sm sm:text-base leading-snug" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
