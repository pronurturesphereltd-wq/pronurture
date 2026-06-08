/**
 * AboutValues.tsx — Brand values grid section
 *
 * Position: After AboutStory.
 * Purpose: Makes the organisation's character concrete and scannable.
 *          Values are not decoration — they signal to both audiences what
 *          they can expect from the people and systems behind ProNurtureSphere.
 *          Compliance-conscious employers and trust-seeking professionals
 *          both read values sections closely.
 *
 * Design: Off-white background (#f5f5f0). 7 cards in a responsive grid
 *         (1 → 2 → 3 columns). Each card has a brand-dark icon container
 *         with a gold SVG icon, plus bold title and supporting description.
 *
 * Icons are NOT stored in Sanity — SVGs live in ICON_BY_VALUE_KEY keyed by
 * the Sanity _key values set in the seed script (val-1 through val-7).
 * This avoids storing raw SVG markup in the CMS while keeping icons editable in code.
 *
 * Data source: aboutPage.values[] via aboutPageQuery.
 * Falls back to FALLBACK_VALUES when Sanity returns null.
 */

import type { ReactNode } from "react";
import type { AboutValue } from "@/sanity/lib/types";

// ---------------------------------------------------------------------------
// Icon map — keyed by the _key values set in scripts/seed-about-page.ts
// ---------------------------------------------------------------------------
const ICON_BY_VALUE_KEY: Record<string, ReactNode> = {
  "val-1": (
    // Map pin — Built for Nigeria (locally grounded)
    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "val-2": (
    // Shield check — Trust Through Verification
    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "val-3": (
    // User badge — Professional Dignity
    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  ),
  "val-4": (
    // Eye — Transparency
    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  "val-5": (
    // Trending up — Continuous Growth
    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  "val-6": (
    // Cog — System Thinking
    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "val-7": (
    // Heart pulse — Patient-Centred Outcomes
    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

// Fallback icon for any _key not in ICON_BY_VALUE_KEY
const DEFAULT_ICON = (
  <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
  </svg>
);

// ---------------------------------------------------------------------------
// Fallback values — mirrors the seeded data so icons resolve via ICON_BY_VALUE_KEY
// Shown when Sanity returns null / empty
// ---------------------------------------------------------------------------
const FALLBACK_VALUES: AboutValue[] = [
  {
    _key: "val-1",
    title: "Built for Nigeria",
    description:
      "Every feature is designed around Nigerian healthcare realities — MDCN regulations, NHIS requirements, PAYE structures, and the locum economy.",
  },
  {
    _key: "val-2",
    title: "Trust Through Verification",
    description:
      "We do not cut corners on credentials. Every professional is verified before they can accept a single shift.",
  },
  {
    _key: "val-3",
    title: "Professional Dignity",
    description:
      "Healthcare workers deserve reliable pay, clear contracts, and career development — not WhatsApp negotiations and delayed invoices.",
  },
  {
    _key: "val-4",
    title: "Transparency",
    description:
      "Facilities see exactly who they are hiring. Professionals see exactly what they will earn. No surprises.",
  },
  {
    _key: "val-5",
    title: "Continuous Growth",
    description:
      "CPD is not a checkbox. We integrate learning into the workflow so professionals grow without disrupting their practice.",
  },
  {
    _key: "val-6",
    title: "System Thinking",
    description:
      "We solve root causes, not symptoms. Staffing, payroll, compliance, and training are one system — not four separate problems.",
  },
  {
    _key: "val-7",
    title: "Patient-Centred Outcomes",
    description:
      "Every product decision traces back to one question: does this lead to better patient care in Nigeria?",
  },
];

interface AboutValuesProps {
  /** Core values from Sanity — falls back to hardcoded if null */
  values?: AboutValue[] | null;
}

const AboutValues = ({ values }: AboutValuesProps) => {
  const displayValues = values && values.length > 0 ? values : FALLBACK_VALUES;

  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="ProNurtureSphere brand values"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Our Values
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            What We Stand For.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            Seven principles that guide every decision, every programme, and every
            relationship we build.
          </p>
        </div>

        {/* ── Values Grid ─────────────────────────────────────────────────── */}
        {/*
         * 1 column on mobile → 2 on tablet → 3 on desktop (with 7th card centred).
         * Each card: icon container + title + description. Consistent with
         * the FeaturesSection and EmployersFeatures card pattern.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayValues.map((value) => (
            <article
              key={value._key}
              className="
                bg-white rounded-2xl p-6
                border border-brand-dark/5
                hover:border-brand-dark/15 hover:shadow-md
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Icon container — brand-dark bg with gold icon for consistent visual signature */}
              <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center mb-4 flex-shrink-0">
                {ICON_BY_VALUE_KEY[value._key] ?? DEFAULT_ICON}
              </div>

              {/* Value title */}
              <h3 className="text-brand-dark font-bold text-base mb-2">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-brand-dark/60 text-sm leading-relaxed flex-1">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
