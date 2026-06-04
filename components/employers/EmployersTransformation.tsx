/**
 * EmployersTransformation.tsx — Before/After transformation section
 *
 * Position: After EmployersPainPoints — the pivot from problem to solution.
 * Purpose: Shows exactly what changes when a facility adopts ProNurtureSphere.
 *          "Before → After" is one of the most persuasive copy structures in
 *          B2B marketing because it quantifies the gap between pain and relief.
 *
 * Design: Deep green background (bg-brand-dark), white text.
 * The colour shift from off-white → deep green signals we've entered the "answer"
 * phase of the page narrative. Gold icons and hover effects maintain warmth.
 *
 * Per CLAUDE.md: "Deep Green = trust, authority, health (primary brand)"
 */

import Link from "next/link";

interface Transformation {
  before: string;
  after: string;
  description: string;
  icon: React.ReactNode;
}

const transformations: Transformation[] = [
  {
    before: "Reactive staffing",
    after: "Proactive workforce control",
    description:
      "Instead of scrambling to fill last-minute gaps, you build a bench of pre-verified professionals you can deploy instantly. Shift coverage becomes a system, not a crisis.",
    icon: (
      // Trending up icon — represents moving from reactive to planned
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    before: "Unverified hires",
    after: "Credentialed, CPD-trained professionals only",
    description:
      "Every professional on the platform has been verified — MDCN/NMCN registration checked, licences validated, CPD records current. You see credential status before you make an offer.",
    icon: (
      // Shield check icon — represents verified trust
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    before: "Manual admin chaos",
    after: "One dashboard for everything",
    description:
      "Shift scheduling, attendance, timesheets, payroll, compliance, and CPD — all in one place. Your HR team gets hours back every week to focus on what actually matters.",
    icon: (
      // Grid icon — represents a unified, organised dashboard
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

const EmployersTransformation = () => {
  return (
    <section
      className="relative bg-brand-dark py-20 lg:py-28 overflow-hidden"
      aria-label="How ProNurtureSphere transforms healthcare facility operations"
    >
      {/* Background dot grid — consistent with hero visual language across the site */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
            The Transformation
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            What Changes When You Use ProNurtureSphere.
          </h2>
        </div>

        {/* ── Transformation Columns ──────────────────────────────────────── */}
        {/* 1-column mobile → 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {transformations.map((item) => (
            <div
              key={item.before}
              className="
                group
                bg-white/5 border border-white/10
                rounded-2xl p-8
                hover:bg-white/10 hover:border-brand-gold/30
                transition-all duration-300
              "
            >
              {/* Icon — gold on hover reinforces positive transformation */}
              <div className="
                inline-flex items-center justify-center
                w-12 h-12 rounded-xl mb-6
                bg-brand-gold/20 text-brand-gold
                group-hover:bg-brand-gold group-hover:text-brand-dark
                transition-colors duration-300
              ">
                {item.icon}
              </div>

              {/* Before state — strikethrough signals "leaving this behind" */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white/40 text-sm line-through">{item.before}</span>
                <svg
                  className="w-4 h-4 text-brand-gold flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>

              {/* After state — the aspirational benefit headline */}
              <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                {item.after}
              </h3>

              <p className="text-white/60 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <div className="text-center">
          <Link
            href="/waitlist"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-full
              bg-brand-gold text-brand-dark
              text-base font-bold
              cursor-pointer transition-all duration-200
              hover:bg-white hover:text-brand-dark hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-dark
              shadow-lg shadow-brand-gold/20
            "
          >
            Get Early Access
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

export default EmployersTransformation;
