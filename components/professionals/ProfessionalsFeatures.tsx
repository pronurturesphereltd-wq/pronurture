/**
 * ProfessionalsFeatures.tsx — Platform feature cards for healthcare professionals
 *
 * Position: After ProfessionalsTransformation.
 * Purpose: Presents 6 core platform features benefit-first for the professional persona.
 *          Per CLAUDE.md Section 12: visual hierarchy demands benefit titles be the
 *          dominant element — users care about outcomes first, features second.
 *
 * Data source: professionalsPage.features[] from Sanity via professionalsPageQuery.
 * Falls back to FALLBACK_FEATURES when Sanity returns null.
 *
 * Icons are NOT stored in Sanity — SVGs live in ICON_BY_FEATURE_KEY keyed by
 * the Sanity _key values set in the seed script (pfeat-1 through pfeat-6).
 * This avoids storing raw SVG markup in the CMS while keeping icons editable in code.
 *
 * Anchored at id="features" — connects to any internal anchor navigation.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import type { ProfessionalFeature } from "@/sanity/lib/types";

// ---------------------------------------------------------------------------
// Icon map — keyed by the _key values set in scripts/seed-professionals-page.ts
// ---------------------------------------------------------------------------
const ICON_BY_FEATURE_KEY: Record<string, ReactNode> = {
  "pfeat-1": (
    // Calendar — shift matching and booking
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  "pfeat-2": (
    // Wallet / payment — fast and reliable payments
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "pfeat-3": (
    // User / profile — digital professional identity
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  "pfeat-4": (
    // Graduation cap — CPD and licence renewal
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  "pfeat-5": (
    // Bar chart — earnings dashboard
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  "pfeat-6": (
    // Star — ratings and reviews
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
const FALLBACK_FEATURES: ProfessionalFeature[] = [
  {
    _key:        "pfeat-1",
    title:       "Find Verified Shifts",
    subtitle:    "Locum & Shift Matching",
    description: "Browse and book verified locum shifts at hospitals and clinics near you. No agencies, no delays.",
  },
  {
    _key:        "pfeat-2",
    title:       "Get Paid Quickly",
    subtitle:    "Fast & Reliable Payments",
    description: "Timesheets are approved digitally and payments processed automatically — no chasing invoices.",
  },
  {
    _key:        "pfeat-3",
    title:       "Build Your Profile",
    subtitle:    "Digital Professional Identity",
    description: "Upload your credentials once. MDCN, NMCN, and PCN verifications stay live so employers can trust you instantly.",
  },
  {
    _key:        "pfeat-4",
    title:       "Complete Accredited CPD",
    subtitle:    "CPD & Licence Renewal",
    description: "Access short, accredited modules that count toward your licence renewal — completed on your phone, at your own pace.",
  },
  {
    _key:        "pfeat-5",
    title:       "Track Your Earnings",
    subtitle:    "Earnings Dashboard",
    description: "See all your shifts, hours, and payments in one dashboard. Download payslips and tax summaries anytime.",
  },
  {
    _key:        "pfeat-6",
    title:       "Grow Your Reputation",
    subtitle:    "Ratings & Reviews",
    description: "Build a verified track record with employer ratings that make you the first choice for future shifts.",
  },
];

interface ProfessionalsFeaturesProps {
  /** Platform features from Sanity — falls back to hardcoded if null */
  features?: ProfessionalFeature[] | null;
}

const ProfessionalsFeatures = ({ features }: ProfessionalsFeaturesProps) => {
  const displayFeatures =
    features && features.length > 0 ? features : FALLBACK_FEATURES;

  return (
    <section
      id="features"
      className="bg-white py-20 lg:py-28"
      aria-label="ProNurtureSphere platform features for healthcare professionals"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-6">
            Everything You Need to Grow Your Career.
          </h2>
          <p className="text-brand-dark/60 text-lg leading-relaxed">
            One platform for shifts, payments, CPD, and career development — built for
            Nigerian healthcare professionals.
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
            All features included. No per-module pricing. Free to join during early access.
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

export default ProfessionalsFeatures;
