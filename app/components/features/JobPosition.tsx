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
      className="rounded-[2rem] p-8 md:p-10"
      style={{
        backgroundColor: 'rgba(237, 231, 216, 0.35)',
        border: '2px solid rgba(164, 141, 120, 0.25)',
      }}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <h4 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: 'var(--color-cafe-black)' }}>
          {title}
        </h4>
        <span
          className="inline-block px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase font-semibold whitespace-nowrap ml-4"
          style={{
            color: 'var(--color-cafe-tan)',
            backgroundColor: 'rgba(250, 249, 246, 0.8)',
            border: '1.5px solid rgba(164, 141, 120, 0.3)',
          }}
        >
          {type}
        </span>
      </div>

      {/* Pay Range */}
      <div className="flex items-center gap-3 mb-6">
        <Briefcase size={20} strokeWidth={1.5} style={{ color: 'var(--color-cafe-brown)' }} />
        <span className="font-normal text-lg" style={{ color: 'var(--color-cafe-brown)' }}>
          {type}
        </span>
        <DollarSign size={20} strokeWidth={1.5} style={{ color: 'var(--color-cafe-brown)' }} className="ml-4" />
        <span className="font-normal text-lg" style={{ color: 'var(--color-cafe-brown)' }}>
          {payRange}
        </span>
      </div>

      {/* Overview */}
      <p
        className="font-normal text-base md:text-lg leading-relaxed mb-8"
        style={{ color: 'rgba(74, 59, 50, 0.85)' }}
      >
        {overview}
      </p>

      {/* Requirements Header */}
      <h5 className="font-serif text-xl mb-4" style={{ color: 'var(--color-cafe-black)' }}>
        Requirements:
      </h5>

      {/* Key Qualifications (show first 4) */}
      <ul className="space-y-3 mb-8">
        {qualifications.slice(0, 4).map((item, idx) => (
          <li key={idx} className="flex gap-3 items-start">
            <div
              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: 'var(--color-cafe-tan)' }}
            />
            <span className="font-normal text-base" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Apply Now Button */}
      <button
        onClick={handleApplyClick}
        disabled={isHiringPaused}
        className={`w-full py-5 rounded-full font-semibold tracking-[0.14em] uppercase text-sm transition-all duration-300 ${
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
        className="w-full flex items-center justify-center gap-2 mt-6 text-sm uppercase tracking-widest font-bold transition-colors duration-300 hover:opacity-70"
        style={{ color: 'var(--color-cafe-tan)' }}
      >
        {isOpen ? "Hide Details" : "View Details"}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
          <div className="pt-8 space-y-8">
            {/* Quick Facts and Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-2xl"
                style={{ backgroundColor: 'rgba(250, 249, 246, 0.6)', border: '1px solid rgba(164, 141, 120, 0.18)' }}
              >
                <p className="text-xs uppercase tracking-[0.2em] font-bold font-inter mb-4" style={{ color: 'rgba(74, 59, 50, 0.65)' }}>
                  Quick Facts
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <DollarSign size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                    <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Pay: {payRange}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Briefcase size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                    <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Type: {type}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                    <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Location: {location}</span>
                  </li>
                </ul>
              </div>

              <div
                className="p-6 rounded-2xl"
                style={{ backgroundColor: 'rgba(250, 249, 246, 0.6)', border: '1px solid rgba(164, 141, 120, 0.18)' }}
              >
                <p className="text-xs uppercase tracking-[0.2em] font-bold font-inter mb-4" style={{ color: 'rgba(74, 59, 50, 0.65)' }}>
                  Benefits
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Gift size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                      <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Responsibilities and Full Qualifications */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>Responsibilities</h5>
                <ul className="space-y-3">
                  {responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <CheckCircle size={16} strokeWidth={1.6} aria-hidden="true" className="mt-[2px] flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                      <span className="font-normal text-sm sm:text-base" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>All Qualifications</h5>
                <ul className="space-y-3">
                  {qualifications.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <CheckCircle size={16} strokeWidth={1.6} aria-hidden="true" className="mt-[2px] flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                      <span className="font-normal text-sm sm:text-base" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{item}</span>
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
