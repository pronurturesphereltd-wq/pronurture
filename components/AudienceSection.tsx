/**
 * AudienceSection.tsx — Dual-audience split section
 *
 * Position: After FeaturesSection.
 * Purpose: Explicitly addresses both buyer personas from CLAUDE.md Section 3 —
 *          speaks directly to each audience in their own voice.
 *
 * Design decisions:
 * - Full-width two-column split — each column owns one audience completely
 * - Left (Employers): brand-dark (#103613) — formal, authoritative, trust-building
 * - Right (Professionals): brand-green (#7a853e) — approachable, energetic, opportunity-focused
 * - Each column has 4 benefit bullets, a persona-specific CTA
 * - Columns stack vertically on mobile (both full-width)
 * - This section is critical UX: it helps each visitor self-identify and navigate deeper
 *
 * Per CLAUDE.md Persona 1 (Dr. Adaeze): ROI-focused, formal, compliance-driven
 * Per CLAUDE.md Persona 2 (Dr. Amarachi): Warm, opportunity-focused, mobile-first
 */

import Link from "next/link";

/** Benefit bullet for each column */
interface BenefitItem {
  text: string;
}

/** Column data structure */
interface AudienceColumn {
  eyebrow: string;           // Small label above heading
  heading: string;           // H3 heading
  subheading: string;        // Supporting paragraph
  benefits: BenefitItem[];   // 4 bullet points
  ctaText: string;           // CTA button label
  ctaHref: string;           // CTA destination
  bgClass: string;           // Tailwind background class
  textClass: string;         // Main text color class
  subtextClass: string;      // Secondary text color class
  ctaClass: string;          // CTA button classes
  checkClass: string;        // Checkmark icon color
}

const columns: AudienceColumn[] = [
  {
    eyebrow: "For Healthcare Facilities",
    heading: "Run Your Facility with Precision",
    subheading:
      "Stop firefighting staffing gaps. ProNurture gives administrators real-time control over rosters, verified locum access, automated compliance, and payroll — in one dashboard.",
    benefits: [
      { text: "Post shifts and fill gaps in under 30 minutes" },
      { text: "Hire only verified, credentialed professionals" },
      { text: "Automate PAYE payroll and pension deductions" },
      { text: "Generate compliance reports for NHIA and regulators" },
    ],
    ctaText: "Explore Employer Features",
    ctaHref: "/employers",
    bgClass: "bg-brand-dark",
    textClass: "text-white",
    subtextClass: "text-white/70",
    ctaClass: "bg-brand-gold text-brand-dark hover:bg-brand-dark hover:text-white",
    checkClass: "text-brand-gold",
  },
  {
    eyebrow: "For Healthcare Professionals",
    heading: "Find Shifts. Earn More. Grow Faster.",
    subheading:
      "Whether you&apos;re a doctor, nurse, pharmacist, or allied health professional — ProNurture connects you with verified employers, flexible locum shifts, and accredited CPD courses.",
    benefits: [
      { text: "Browse verified locum shifts near you" },
      { text: "Get paid quickly — no payment delays" },
      { text: "Complete accredited CPD to renew your licence" },
      { text: "Build a verified digital professional profile" },
    ],
    ctaText: "Find Locum Shifts",
    ctaHref: "/professionals",
    bgClass: "bg-brand-green",
    textClass: "text-white",
    subtextClass: "text-white/75",
    ctaClass: "bg-white text-brand-dark hover:bg-brand-light hover:text-brand-dark",
    checkClass: "text-white",
  },
];

const AudienceSection = () => {
  return (
    <section
      className="w-full"
      aria-label="Who ProNurture is for"
    >
      {/* Full-width two-column grid — no container constraints intentionally */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {columns.map((col) => (
          <div
            key={col.eyebrow}
            className={`${col.bgClass} ${col.textClass} px-8 py-20 lg:py-28 lg:px-16 xl:px-24`}
          >
            <div className="max-w-lg mx-auto lg:mx-0">

              {/* Eyebrow label — identifies which audience this speaks to */}
              <p className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70`}>
                {col.eyebrow}
              </p>

              {/* H3 — strong benefit-led headline for each persona */}
              <h3 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
                {col.heading}
              </h3>

              {/* Supporting paragraph — sets context before the bullets */}
              <p
                className={`${col.subtextClass} text-base leading-relaxed mb-8`}
                // Note: &apos; handled in JSX directly below
              >
                {col.eyebrow === "For Healthcare Professionals"
                  ? "Whether you're a doctor, nurse, pharmacist, or allied health professional — ProNurture connects you with verified employers, flexible locum shifts, and accredited CPD courses."
                  : col.subheading}
              </p>

              {/* Benefit bullets — 4 specific, concrete outcomes */}
              <ul className="space-y-4 mb-10" role="list">
                {col.benefits.map((benefit) => (
                  <li key={benefit.text} className="flex items-start gap-3">
                    {/* Checkmark icon */}
                    <svg
                      className={`${col.checkClass} w-5 h-5 mt-0.5 flex-shrink-0`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base leading-relaxed">
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA — persona-specific call to action */}
              <Link
                href={col.ctaHref}
                className={`
                  inline-flex items-center justify-center
                  px-8 py-4 rounded-full
                  ${col.ctaClass}
                  text-base font-bold
                  cursor-pointer transition-all duration-200
                  hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                `}
              >
                {col.ctaText}
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
        ))}
      </div>
    </section>
  );
};

export default AudienceSection;
