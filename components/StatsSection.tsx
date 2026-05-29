/**
 * StatsSection.tsx — Large-number impact statistics
 *
 * Position: After Testimonials — reinforces the social proof with hard numbers.
 * Purpose: Large, bold numbers command attention and communicate scale.
 *          This section is distinct from SocialProofBar — it's more dramatic,
 *          full-width, with a dark green background for visual impact.
 *
 * Design decisions:
 * - Deep green background + white text — high contrast, authoritative
 * - Very large type (text-6xl/text-7xl) for maximum visual impact
 * - Gold accent on numbers — warm, premium contrast against deep green
 * - 4 stats that tell a coherent story about platform scale and reliability
 * - Subtle background pattern adds depth without distraction
 *
 * Per CLAUDE.md: "Stats and numbers (shifts filled, professionals registered,
 * hospitals served)" are key social proof elements.
 */

/** Stat item data structure */
interface StatItem {
  value: string;       // The big number/metric
  label: string;       // Short descriptor
  sublabel?: string;   // Optional additional context
}

const stats: StatItem[] = [
  {
    value: "500+",
    label: "Healthcare Professionals",
    sublabel: "Verified on platform",
  },
  {
    value: "50+",
    label: "Partner Facilities",
    sublabel: "Hospitals, clinics & agencies",
  },
  {
    value: "10,000+",
    label: "Shifts Managed",
    sublabel: "Across Nigeria",
  },
  {
    value: "98%",
    label: "Compliance Rate",
    sublabel: "Regulatory adherence",
  },
];

const StatsSection = () => {
  return (
    <section
      className="relative bg-brand-dark py-20 lg:py-28 overflow-hidden"
      aria-label="Platform impact statistics"
    >
      {/* Background decoration — subtle grid for texture, same as hero */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
            By the Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Built for Scale. Designed for Nigeria.
          </h2>
        </div>

        {/* Stats grid — 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                text-center
                ${
                  /* Vertical dividers between stats on desktop */
                  index < stats.length - 1
                    ? "lg:border-r lg:border-white/10"
                    : ""
                }
                px-4
              `}
            >
              {/* The big number — gold color for maximum impact on dark background */}
              <div
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-gold leading-none mb-3"
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </div>

              {/* Label */}
              <p className="text-white text-base sm:text-lg font-semibold mb-1">
                {stat.label}
              </p>

              {/* Sublabel — lighter weight, lower hierarchy */}
              {stat.sublabel && (
                <p className="text-white/50 text-sm">
                  {stat.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
