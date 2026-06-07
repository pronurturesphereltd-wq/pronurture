/**
 * EmployersFeatures.tsx — Platform feature showcase for healthcare employers
 *
 * Position: After EmployersTransformation — the detailed "what you get" section.
 * Purpose: Translates each platform capability into a benefit-led value proposition
 *          for the Dr. Adaeze employer persona (CLAUDE.md Section 3).
 *
 * Key principle: Every card title is a benefit (outcome) first, not a feature name.
 * The feature category (subtitle) is shown smaller beneath the title for context.
 *
 * Data source: employersPage.features[] from Sanity via employersPageQuery.
 * Falls back to FALLBACK_FEATURES when Sanity returns null.
 *
 * Icons are NOT stored in Sanity — SVGs live in ICON_BY_FEATURE_KEY keyed by
 * the Sanity _key values set in the seed script (feat-1 through feat-6).
 * This avoids storing raw SVG markup in the CMS while keeping icons editable in code.
 *
 * Design: White background alternates with the deep green transformation section.
 * id="features" provides an anchor target from the hero secondary CTA.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import type { EmployerFeature } from "@/sanity/lib/types";

// ---------------------------------------------------------------------------
// Icon map — keyed by the _key values set in scripts/seed-employers-page.ts
// ---------------------------------------------------------------------------
const ICON_BY_FEATURE_KEY: Record<string, ReactNode> = {
  "feat-1": (
    // Calendar — shift posting and booking
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  "feat-2": (
    // Shield check — credential verification and trust
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  "feat-3": (
    // Banknote / ₦ — Nigerian payroll management
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M8 9h8M10 6v12M14 6v12" />
    </svg>
  ),
  "feat-4": (
    // Graduation cap — CPD and professional training
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  "feat-5": (
    // Document / clipboard — compliance audit reports
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  "feat-6": (
    // Bar chart — real-time workforce analytics dashboard
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
};

// Shown for any feature whose _key isn't in ICON_BY_FEATURE_KEY
const DEFAULT_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ---------------------------------------------------------------------------
// Hardcoded fallback — shown when Sanity returns null / empty
// _key values mirror the seed script so icons resolve correctly
// ---------------------------------------------------------------------------
const FALLBACK_FEATURES: EmployerFeature[] = [
  {
    _key:        "feat-1",
    title:       "Fill Shifts in Minutes, Not Hours",
    subtitle:    "Shift Posting & Booking",
    description: "Post a vacancy, set your requirements, and receive applications from pre-verified professionals immediately. No phone calls. No WhatsApp groups. No gaps on your roster.",
  },
  {
    _key:        "feat-2",
    title:       "Only Hire Who You Can Trust",
    subtitle:    "Credential Verification",
    description: "Every professional's MDCN/NMCN registration, licence status, and CPD certificates are verified and auto-updated with expiry alerts. Know exactly who you're hiring — before they set foot in your facility.",
  },
  {
    _key:        "feat-3",
    title:       "Payroll That Runs Itself",
    subtitle:    "Payroll Management",
    description: "Timesheet data flows directly into ₦ payroll calculations with built-in Nigerian PAYE tax and pension contributions. Approve once, pay everyone. No more month-end reconciliation marathons.",
  },
  {
    _key:        "feat-4",
    title:       "Keep Your Team Compliant",
    subtitle:    "CPD & Training",
    description: "Assign accredited CPD modules to your staff and track completion automatically. Know which team members need licence renewals before a regulatory inspection catches you off guard.",
  },
  {
    _key:        "feat-5",
    title:       "Always Inspection-Ready",
    subtitle:    "Compliance Reporting",
    description: "Generate NHIA and MDCN-ready audit reports at the click of a button. Stop scrambling every time an inspector arrives.",
  },
  {
    _key:        "feat-6",
    title:       "See Your Workforce Clearly",
    subtitle:    "Workforce Analytics",
    description: "Real-time dashboards showing staffing gaps, shift fill rates, compliance scores, and cost-per-hire. Make data-driven decisions to plan ahead, reduce agency spend, and retain your best staff.",
  },
];

interface EmployersFeaturesProps {
  /** Platform features from Sanity — falls back to hardcoded if null */
  features?: EmployerFeature[] | null;
}

const EmployersFeatures = ({ features }: EmployersFeaturesProps) => {
  const displayFeatures =
    features && features.length > 0 ? features : FALLBACK_FEATURES;

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
          {displayFeatures.map((feature) => (
            <div
              key={feature._key}
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
                {ICON_BY_FEATURE_KEY[feature._key] ?? DEFAULT_ICON}
              </div>

              {/* Benefit title — the outcome, not the feature name */}
              <h3 className="text-base font-bold text-brand-dark mb-1 leading-snug">
                {feature.title}
              </h3>

              {/* Feature category — smaller, secondary context label */}
              {feature.subtitle && (
                <p className="text-brand-green text-xs font-semibold mb-3 uppercase tracking-wide">
                  {feature.subtitle}
                </p>
              )}

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
