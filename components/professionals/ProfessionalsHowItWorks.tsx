/**
 * ProfessionalsHowItWorks.tsx — 3-step onboarding process for healthcare professionals
 *
 * Position: After ProfessionalsFeatures.
 * Purpose: Reduces signup anxiety by showing the process is simple — 3 clear steps.
 *          Per CLAUDE.md Section 3, Dr. Amarachi's barriers include "trust issues" and
 *          "bad UX" — a transparent, numbered process directly counters both.
 *          The concrete timeframes ("less than 10 minutes", "one tap") add credibility.
 *
 * Anchor: id="how-it-works" — the hero secondary CTA "See Available Shifts" scrolls here.
 *
 * Design: Off-white (brand-light) background via inline style.
 *         Large brand-dark numbered containers with gold step numbers for visual structure.
 *         Same step indicator pattern as EmployersHowItWorks for site-wide consistency.
 */

import Link from "next/link";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Create your verified professional profile",
    description:
      "Sign up, upload your credentials (MDCN/NMCN licence, certificates), and our verification team confirms your profile in under 48 hours. Takes less than 10 minutes to set up.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Browse and apply for locum shifts near you",
    description:
      "Filter by specialty, location, date, and rate. Read the full shift brief, see the verified employer profile, and apply in one tap. No CV needed — your profile speaks for you.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Complete shifts, earn CPD credits, get paid on time",
    description:
      "Log your hours on the app, collect CPD credits automatically, and receive payment on the agreed schedule. Your professional record grows with every shift completed.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const ProfessionalsHowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="How to get started on ProNurtureSphere as a healthcare professional"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Getting Started
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            Start Earning in 3 Simple Steps.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            From signup to your first paid shift — the whole process takes less than a day.
          </p>
        </div>

        {/* ── Steps Grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center">

              {/* Step number + icon container — large and prominent for visual structure */}
              {/* The eye naturally reads 01 → 02 → 03 left-to-right */}
              <div className="
                relative w-20 h-20 rounded-2xl
                bg-brand-dark
                flex flex-col items-center justify-center
                mb-6 shadow-lg flex-shrink-0
              ">
                {/* Step number — gold on deep green = highest contrast in the palette */}
                <span className="text-brand-gold font-bold text-xl leading-none mb-1">
                  {step.number}
                </span>
                {/* Icon below the number — reinforces the step concept visually */}
                <span className="text-white/50">
                  {step.icon}
                </span>

                {/* Connector line between steps — desktop only */}
                {/* Placed on the right edge of steps 1 and 2 to show sequential journey */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-full w-full h-0.5 bg-brand-dark/15"
                    style={{ transform: "translateY(-50%)" }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Step title */}
              <h3 className="text-brand-dark font-bold text-lg leading-snug mb-3">
                {step.title}
              </h3>

              {/* Step description — concrete timeframes and actions, not vague promises */}
              <p className="text-brand-dark/60 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <div className="text-center mt-14">
          <Link
            href="/waitlist"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-full
              bg-brand-dark text-white
              text-base font-bold
              cursor-pointer transition-all duration-200
              hover:bg-brand-green hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2
              shadow-md
            "
          >
            Create Your Profile Today
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsHowItWorks;
