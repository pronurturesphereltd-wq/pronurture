/**
 * EmployersFeatures.tsx — Platform feature showcase for healthcare employers
 *
 * Position: After EmployersTransformation — the detailed "what you get" section.
 * Purpose: Translates each platform capability into a benefit-led value proposition
 *          for the Dr. Adaeze employer persona (CLAUDE.md Section 3).
 *
 * Key principle: Every card title is a benefit (outcome) first, not a feature name.
 * The feature category is shown smaller beneath the title for context.
 *
 * ₦ currency and Nigerian regulatory context (PAYE, pension, MDCN/NMCN, HEFAMAA)
 * are explicit throughout — per CLAUDE.md "locally grounded" brand value.
 *
 * Design: White background alternates with the deep green transformation section.
 * id="features" provides an anchor target from the hero secondary CTA.
 */

import Link from "next/link";

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Fill Shifts in Minutes, Not Hours",
    subtitle: "Shift Posting & Booking",
    description:
      "Post a vacancy, set your requirements, and receive applications from pre-verified professionals immediately. No phone calls. No WhatsApp groups. No gaps on your roster.",
    icon: (
      // Calendar icon — represents shift scheduling
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    title: "Only Hire Who You Can Trust",
    subtitle: "Credential Verification",
    description:
      "Every professional's MDCN/NMCN registration, licence status, and CPD certificates are verified and auto-updated with expiry alerts. Know exactly who you're hiring — before they set foot in your facility.",
    icon: (
      // Shield check icon — represents verification and compliance
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Payroll That Runs Itself",
    subtitle: "Payroll Management",
    description:
      "Timesheet data flows directly into ₦ payroll calculations with built-in Nigerian PAYE tax and pension contributions. Approve once, pay everyone. No more month-end reconciliation marathons.",
    icon: (
      // Naira symbol icon — represents Nigerian payroll
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M8 9h8M10 6v12M14 6v12" />
      </svg>
    ),
  },
  {
    title: "Know Who's Working, Always",
    subtitle: "Attendance & Timesheets",
    description:
      "Digital clock-in/out from any device with real-time attendance visibility for supervisors. Automated timesheets eliminate paper disputes and feed directly into payroll — no data re-entry.",
    icon: (
      // Clock icon — represents attendance tracking
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Keep Your Team Compliant",
    subtitle: "CPD Training",
    description:
      "Assign accredited CPD modules to your staff and track completion automatically. Know which team members need licence renewals before a regulatory inspection catches you off guard.",
    icon: (
      // Graduation cap icon — represents CPD and professional development
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "See Your Workforce Clearly",
    subtitle: "Workforce Analytics",
    description:
      "Real-time dashboards showing staffing gaps, shift fill rates, compliance scores, and cost-per-hire. Make data-driven decisions to plan ahead, reduce agency spend, and retain your best staff.",
    icon: (
      // Bar chart icon — represents analytics and data-driven management
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

const EmployersFeatures = () => {
  return (
    <section
      id="features"
      className="bg-white py-20 lg:py-28"
      aria-label="Platform features for healthcare employers"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            The Platform
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-6">
            Everything Your Facility Needs in One Place.
          </h2>
          <p className="text-brand-dark/60 text-lg leading-relaxed">
            Six core capabilities — working together so you don&apos;t have to.
            Designed specifically for Nigerian healthcare operations.
          </p>
        </div>

        {/* ── Feature Cards Grid ──────────────────────────────────────────── */}
        {/* 1-column mobile → 2-column tablet → 3-column desktop (2×3 layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                group
                bg-brand-light rounded-2xl p-8
                border border-brand-dark/5
                hover:border-brand-dark/20 hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 ease-out
              "
            >
              {/* Icon — dark green container, gold icon for brand consistency */}
              <div className="
                inline-flex items-center justify-center
                w-12 h-12 rounded-xl mb-5
                bg-brand-dark text-brand-gold
                group-hover:scale-110
                transition-transform duration-300
              ">
                {feature.icon}
              </div>

              {/* Benefit title — the outcome, not the feature name */}
              <h3 className="text-base font-bold text-brand-dark mb-1 leading-snug">
                {feature.title}
              </h3>

              {/* Feature category — smaller, secondary context label */}
              <p className="text-brand-green text-xs font-semibold mb-3 uppercase tracking-wide">
                {feature.subtitle}
              </p>

              <p className="text-brand-dark/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <div className="text-center mt-14">
          <p className="text-brand-dark/50 text-base mb-6">
            All six capabilities in one subscription. No per-module pricing.
          </p>
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
            Get Early Access →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmployersFeatures;
