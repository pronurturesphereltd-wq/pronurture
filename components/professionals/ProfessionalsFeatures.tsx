/**
 * ProfessionalsFeatures.tsx — Platform feature cards for healthcare professionals
 *
 * Position: After ProfessionalsTransformation.
 * Purpose: Presents 6 core platform features benefit-first for the professional persona.
 *          Per CLAUDE.md Section 12: visual hierarchy demands benefit titles be the
 *          dominant element — users care about outcomes first, features second.
 *
 * Anchored at id="features" — connects to any internal anchor navigation.
 *
 * Design: White background. Brand-dark/gold icon containers.
 *         brand-light card backgrounds inside the white section create subtle depth —
 *         the same layering pattern from EmployersFeatures and FeaturesSection.
 *
 * Target persona: Dr. Amarachi — show me what I get, not just what it does.
 */

interface Feature {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Find Shifts That Fit Your Life",
    category: "Locum Shift Marketplace",
    description:
      "Browse verified locum shifts by specialty, date, location, and rate. Apply in minutes and get confirmation fast — no phone calls, no middlemen, no wasted journeys.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Get Paid Without the Chase",
    category: "Fast, Reliable Payments",
    description:
      "Employers commit to payment terms before you start. Your timesheets are logged automatically and your rate is agreed upfront — payment follows on schedule, every time.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    title: "CPD That Actually Counts",
    category: "Accredited CPD Courses",
    description:
      "Complete MDCN/NMCN-recognised CPD modules designed for Nigerian clinical practice. Track your credits, download certificates, and stay licence-ready — affordably.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Build Your Professional Profile",
    category: "Verified Digital Profile",
    description:
      "Create a verified digital profile that showcases your credentials, employment history, and CPD achievements — a professional identity employers can trust at a glance.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Track Your Licences & Renewals",
    category: "Credential Tracking",
    description:
      "Get automatic reminders before your practising licence, indemnity, or specialist certificates expire. Never get caught off guard by a renewal deadline again.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.869V15.13a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Learn From Nigeria's Best Clinicians",
    category: "Webinars & Live Events",
    description:
      "Join live clinical webinars and on-demand events from respected Nigerian healthcare practitioners — practical learning that improves patient care and earns CPD credits.",
  },
];

const ProfessionalsFeatures = () => {
  return (
    <section
      id="features"
      className="bg-white py-20 lg:py-28"
      aria-label="ProNurtureSphere platform features for healthcare professionals"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            Everything You Need to Grow Your Career.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            One platform for shifts, payments, CPD, and career development — built for
            Nigerian healthcare professionals.
          </p>
        </div>

        {/* ── Feature Cards Grid ──────────────────────────────────────────── */}
        {/* 3-column on desktop, 2-column on tablet, 1-column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-brand-light rounded-2xl p-7 border border-brand-dark/5 hover:border-brand-dark/15 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon container — brand-dark/gold combination consistent across all feature sections */}
              <div className="w-11 h-11 rounded-xl bg-brand-dark flex items-center justify-center mb-5 text-brand-gold group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Category — small secondary context below the icon */}
              <p className="text-brand-green text-xs font-semibold uppercase tracking-wider mb-2">
                {feature.category}
              </p>

              {/* Benefit title — bold, outcome-focused, the dominant text element in the card */}
              <h3 className="text-brand-dark font-bold text-lg leading-snug mb-3">
                {feature.title}
              </h3>

              {/* Description — specific, ends with a concrete outcome per CLAUDE.md coding standards */}
              <p className="text-brand-dark/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsFeatures;
