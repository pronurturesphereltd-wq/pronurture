/**
 * EmployersHowItWorks.tsx — 3-step onboarding process for healthcare employers
 *
 * Position: After EmployersFeatures.
 * Purpose: Directly counters Dr. Adaeze's implementation fear barrier
 *          (CLAUDE.md Section 3: "Barriers: Implementation cost, staff adoption concerns").
 *          By reducing onboarding to 3 named steps, we signal "this is simple"
 *          before the objection can form.
 *
 * id="how-it-works" anchors this section from the hero secondary CTA
 * ("See How It Works" → scrolls here).
 *
 * Design: Off-white (brand-light) background. Large step numbers in brand-dark
 *         containers with gold text create strong visual hierarchy and scannability.
 */

import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Create your facility profile and post your first shift",
    description:
      "Set up your hospital or clinic in minutes. Add your departments, staffing requirements, and post your first open shift. No technical training required — your HR team can be live the same day.",
  },
  {
    number: "02",
    title: "Browse verified, CPD-trained professionals and hire with confidence",
    description:
      "Review applications from qualified professionals whose credentials have already been checked. See licence status, CPD completion, and work history at a glance — then accept and confirm with one click.",
  },
  {
    number: "03",
    title: "Manage your whole team — shifts, payroll, compliance — from one dashboard",
    description:
      "Once your team is onboard, all workforce operations live in one place. Attendance is tracked automatically, timesheets flow into payroll, and compliance alerts keep you ahead of regulatory requirements.",
  },
];

const EmployersHowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-brand-light py-20 lg:py-28"
      aria-label="How ProNurtureSphere works for healthcare employers"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Getting Started
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-6">
            Up and Running in 3 Simple Steps.
          </h2>
          <p className="text-brand-dark/60 text-lg">
            No lengthy implementation project. No IT department required.
            Most facilities post their first shift within an hour of signing up.
          </p>
        </div>

        {/* ── Step Cards ──────────────────────────────────────────────────── */}
        {/* 1-column mobile → 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left">

              {/* Step number — large, brand-dark container with gold text for prominence */}
              <div className="
                inline-flex items-center justify-center
                w-16 h-16 rounded-2xl mb-6
                bg-brand-dark text-brand-gold
                text-2xl font-bold
                shadow-lg
              ">
                {step.number}
              </div>

              <h3 className="text-lg font-bold text-brand-dark mb-3 leading-snug">
                {step.title}
              </h3>

              <p className="text-brand-dark/60 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
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
            "
          >
            Start Your Facility Profile →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmployersHowItWorks;
