/**
 * AboutPSLArms.tsx — Six Arms of Operation section
 *
 * Position: After AboutTeam.
 * Purpose: Defines the full scope of the PSL organisation — 6 distinct service arms,
 *          each one a distinct business/programme unit. This section answers:
 *          "How exactly does ProNurtureSphere deliver on the ecosystem promise?"
 *
 * Design: Off-white (#f5f5f0) background. 6 cards in a 2×3 responsive grid
 *         (1 → 2 → 3 columns). Each card uses a distinct arm colour accent on
 *         the top border to differentiate the six arms visually while maintaining
 *         brand cohesion. The deep-green icon + gold icon design is consistent
 *         with values and features cards across the site.
 *
 * The arm descriptions are intentionally concise — each is a programme summary,
 * not a sales pitch. The About page earns credibility through breadth and depth,
 * not conversion pressure.
 */

import type { ReactNode } from "react";

interface PSLArm {
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  icon: ReactNode;
}

const arms: PSLArm[] = [
  {
    name: "PSL Learning Academy",
    tagline: "Education & Professional Development",
    description:
      "Accredited CPD programmes, clinical skills training, onboarding pathways, and structured learning for healthcare professionals at every career stage.",
    accentColor: "border-t-brand-dark",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    name: "PSL Workforce Solutions",
    tagline: "Staffing & Global Deployment",
    description:
      "Verified healthcare staffing for hospitals and clinics across Nigeria — locum placements, permanent recruitment, and international workforce deployment pathways.",
    accentColor: "border-t-brand-green",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "PSL Homecare & Wellness",
    tagline: "Community & Domiciliary Care",
    description:
      "Professional homecare services for the elderly, post-surgical recovery, chronic disease management, and community wellness delivered to patients in their homes.",
    accentColor: "border-t-brand-gold",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "PSL Clinical Services",
    tagline: "Healthcare Delivery Programmes",
    description:
      "Direct healthcare delivery through clinical outreach, occupational health programmes, primary care support, and population health initiatives in underserved communities.",
    accentColor: "border-t-brand-dark",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    name: "PSL Global Health Consulting",
    tagline: "Health Systems Strengthening",
    description:
      "Strategic consulting for health systems, NGOs, and government bodies — workforce planning, policy alignment, programme evaluation, and capacity building.",
    accentColor: "border-t-brand-green",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "PSL Foundation",
    tagline: "Outreach, Scholarships & Humanitarian Programmes",
    description:
      "The charitable arm of PSL — funding scholarships for healthcare students, humanitarian health outreach, and community wellness programmes for the most vulnerable.",
    accentColor: "border-t-brand-gold",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const AboutPSLArms = () => {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="ProNurtureSphere six arms of operation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Our Operations
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            Our Six Arms of Operation.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            Six interconnected service divisions — each one focused on a different
            dimension of the healthcare workforce ecosystem.
          </p>
        </div>

        {/* ── 2×3 Grid ────────────────────────────────────────────────────── */}
        {/*
         * 1 column on mobile → 2 on tablet → 3 on desktop.
         * Top border accent colour differentiates each arm visually while
         * remaining within the brand palette.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {arms.map((arm) => (
            <article
              key={arm.name}
              className={`
                bg-white rounded-2xl p-6
                border border-brand-dark/5 border-t-4 ${arm.accentColor}
                hover:shadow-md hover:border-brand-dark/10
                transition-all duration-300
                flex flex-col
              `}
            >
              {/* Icon container */}
              <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center mb-4 flex-shrink-0">
                {arm.icon}
              </div>

              {/* Arm name */}
              <h3 className="text-brand-dark font-bold text-base mb-1">
                {arm.name}
              </h3>

              {/* Tagline — programme category */}
              <p className="text-brand-green text-xs font-semibold uppercase tracking-wide mb-3">
                {arm.tagline}
              </p>

              {/* Description */}
              <p className="text-brand-dark/60 text-sm leading-relaxed flex-1">
                {arm.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPSLArms;
