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

  return (
    <div className="space-y-6 border-b border-[#a48d78]/20 pb-10 last:border-0 last:pb-0">
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-2">
          <h4 className="font-serif text-2xl md:text-3xl leading-tight transition-colors duration-300 group-hover:text-[var(--color-cafe-tan)]" style={{ color: 'var(--color-cafe-black)' }}>
            {title}
          </h4>
          <span
            className="inline-block px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase font-semibold whitespace-nowrap"
            style={{
              border: '1.5px solid rgba(74, 59, 50, 0.35)',
              color: 'rgba(74, 59, 50, 0.65)',
              backgroundColor: 'rgba(250, 249, 246, 0.45)',
            }}
          >
            {status}
          </span>
        </div>

        <button
          className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold self-start sm:self-center transition-transform duration-300"
          style={{ color: 'var(--color-cafe-tan)' }}
        >
          {isOpen ? "Hide Details" : "View Details"}
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* CSS Grid accordion - animates height from 0 to auto */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: 'rgba(250, 249, 246, 0.6)', border: '1px solid rgba(164, 141, 120, 0.18)' }}
            >
              <p className="text-xs uppercase tracking-[0.2em] font-bold font-inter" style={{ color: 'rgba(74, 59, 50, 0.65)' }}>
                Quick Facts
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <DollarSign size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                  <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Pay: {payRange}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Briefcase size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                  <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Type: {type}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                  <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>Location: {location}</span>
                </li>
              </ul>
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: 'rgba(250, 249, 246, 0.6)', border: '1px solid rgba(164, 141, 120, 0.18)' }}
            >
              <p className="text-xs uppercase tracking-[0.2em] font-bold font-inter" style={{ color: 'rgba(74, 59, 50, 0.65)' }}>
                Benefits
              </p>
              <ul className="mt-4 space-y-2">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Gift size={16} strokeWidth={1.6} aria-hidden="true" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                    <span className="font-normal" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-7 pt-6">
            <div className="space-y-3">
              <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>Overview</h5>
              <p className="font-normal leading-relaxed" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>
                {overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3">
                <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>Responsibilities</h5>
                <ul className="space-y-2">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <CheckCircle size={16} strokeWidth={1.6} aria-hidden="true" className="mt-[2px] flex-shrink-0" style={{ color: 'rgba(74, 59, 50, 0.55)' }} />
                      <span className="font-normal text-sm sm:text-base" style={{ color: 'rgba(74, 59, 50, 0.85)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-serif text-xl" style={{ color: 'var(--color-cafe-black)' }}>Qualifications</h5>
                <ul className="space-y-2">
                  {qualifications.map((item) => (
                    <li key={item} className="flex gap-3 items-start">
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
