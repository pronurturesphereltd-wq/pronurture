/**
 * SocialProofBar.tsx — Key statistics bar
 *
 * Position: Immediately after the hero section.
 * Purpose: Instantly establishes credibility for visitors who just read the hero.
 * Pattern: "Logo bar" equivalent for a pre-launch platform — uses key metrics
 *          instead of client logos since the product hasn't launched yet.
 *
 * Design decisions:
 * - Off-white (#f5f5f0) background — creates visual separation from deep green hero
 *   without a harsh contrast jump
 * - 4 stats in a single row (grid on mobile → row on desktop)
 * - Gold dividers between stats on desktop create a premium feel
 * - Numbers are large and bold for immediate scannability
 * - Short labels below each number add context
 *
 * Per CLAUDE.md Section 12: Social proof is one of the highest-leverage elements
 * on the homepage. People buy from businesses that other people trust.
 */

/** Type for a single statistic entry */
interface Stat {
  value: string;   // The big number/metric (e.g. "500+")
  label: string;   // The descriptive label below the number
}

const stats: Stat[] = [
  {
    value: "500+",
    label: "Healthcare Professionals",
  },
  {
    value: "50+",
    label: "Partner Facilities",
  },
  {
    value: "10,000+",
    label: "Shifts Managed",
  },
  {
    value: "98%",
    label: "Compliance Rate",
  },
];

const SocialProofBar = () => {
  return (
    <section
      className="bg-brand-light py-10 sm:py-14"
      aria-label="Platform statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Optional micro-label above stats — contextualises the numbers */}
        <p className="text-center text-brand-dark/50 text-xs font-semibold uppercase tracking-widest mb-8">
          Platform Impact
        </p>

        {/* Stats grid: 2-column on mobile, 4-column on tablet+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                flex flex-col items-center text-center
                ${/* Vertical divider between stats — only on md+ screens, not after last */
                  index < stats.length - 1
                    ? "md:border-r md:border-brand-dark/10"
                    : ""
                }
                px-4
              `}
            >
              {/* The big number — visual anchor for each stat */}
              <span className="text-4xl sm:text-5xl font-bold text-brand-dark leading-none mb-2">
                {stat.value}
              </span>

              {/* Descriptive label — smaller and lighter for hierarchy */}
              <span className="text-brand-dark/60 text-sm font-medium leading-tight max-w-[120px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
