/**
 * StatsSection.tsx — Large-number impact statistics
 *
 * Position: After Testimonials — reinforces the social proof with hard numbers.
 * Purpose: Large, bold numbers command attention and communicate scale.
 *          Distinct from SocialProofBar — more dramatic, dark green background.
 *
 * Data source: Sanity homePage.stats[] — same data as SocialProofBar, different
 * visual treatment. Falls back to FALLBACK_STATS (which include sublabels for
 * richer context) when Sanity returns null.
 *
 * Design decisions:
 * - Deep green background + white text — high contrast, authoritative
 * - Very large type (text-6xl/text-7xl) for maximum visual impact
 * - Gold accent on numbers — warm, premium contrast against deep green
 * - Subtle background pattern adds depth without distraction
 *
 * Per CLAUDE.md: "Stats and numbers (shifts filled, professionals registered,
 * hospitals served)" are key social proof elements.
 */

import type { HomepageStat } from "@/sanity/lib/types"

/** Extends HomepageStat with an optional sublabel for richer display context */
interface StatDisplay extends HomepageStat {
  sublabel?: string
}

/** Fallback stats — include sublabels that give richer context in this darker section */
const FALLBACK_STATS: StatDisplay[] = [
  { _key: 'stat-1', value: "500+",    label: "Healthcare Professionals", sublabel: "Verified on platform" },
  { _key: 'stat-2', value: "50+",     label: "Partner Facilities",       sublabel: "Hospitals, clinics & agencies" },
  { _key: 'stat-3', value: "10,000+", label: "Shifts Managed",           sublabel: "Across Nigeria" },
  { _key: 'stat-4', value: "98%",     label: "Compliance Rate",          sublabel: "Regulatory adherence" },
]

interface StatsSectionProps {
  /** Stats from Sanity homePage.stats — falls back to FALLBACK_STATS if null or empty */
  stats?: HomepageStat[] | null
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  // Sanity stats don't carry sublabels; sublabel renders as nothing when undefined
  const displayStats: StatDisplay[] = (stats && stats.length > 0) ? stats : FALLBACK_STATS

  return (
    <section
      className="relative bg-brand-dark py-20 lg:py-28 overflow-hidden"
      aria-label="Platform impact statistics"
    >
      {/* Background decoration — subtle grid for texture */}
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
          {displayStats.map((stat, index) => (
            <div
              key={stat._key}
              className={`
                text-center
                ${index < displayStats.length - 1
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

              {/* Sublabel — present in fallback data, absent in Sanity stats */}
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
  )
}

export default StatsSection
