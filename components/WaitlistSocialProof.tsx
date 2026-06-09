/**
 * WaitlistSocialProof.tsx
 *
 * Two-part section that replaces TestimonialsSection on the homepage.
 *
 * PART 1 — Waitlist counter banner (bg-brand-dark)
 *   Shows the live waitlist number from siteSettings.waitlistCount, formatted
 *   with a "+" suffix (e.g. "247+"). Editors update the number in Sanity Studio.
 *   Includes a direct CTA to /waitlist.
 *
 * PART 2 — Problem statistics grid (bg-brand-light)
 *   Three hard-hitting statistics about Nigeria's healthcare workforce crisis.
 *   These are factual, sourced figures — they create urgency without fabricated
 *   social proof.
 *
 * @param waitlistCount - Number from siteSettings; falls back to 0
 */

import Link from 'next/link'

const PROBLEM_STATS = [
  {
    id:    'nurses',
    value: '72,000+',
    label: 'Nigerian nurses with lapsed licences annually',
  },
  {
    id:    'ratio',
    value: '1 : 8,000',
    label: "Doctor-to-patient ratio vs WHO's 1:600 recommendation",
  },
  {
    id:    'fees',
    value: '₦3M+',
    label: 'Average monthly locum agency fees per mid-size hospital',
  },
]

interface WaitlistSocialProofProps {
  /** Current waitlist count from siteSettings — updated manually in Sanity Studio */
  waitlistCount?: number
}

const WaitlistSocialProof = ({ waitlistCount = 0 }: WaitlistSocialProofProps) => {
  return (
    <>
      {/* ── PART 1: Waitlist counter banner ─────────────────────────────── */}
      <section
        className="bg-brand-dark py-20 lg:py-28"
        aria-label="Waitlist counter"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <p className="text-brand-gold/70 text-sm font-semibold uppercase tracking-widest mb-6">
            Join the Movement
          </p>

          {/* Large counter — brand-gold for maximum visual pop on dark green */}
          <p
            className="text-7xl sm:text-8xl lg:text-9xl font-bold text-brand-gold leading-none mb-4"
            aria-label={`${waitlistCount} plus`}
          >
            {waitlistCount}+
          </p>

          {/* Descriptor */}
          <p className="text-white/80 text-xl sm:text-2xl font-medium mb-3">
            healthcare professionals already on the waitlist
          </p>

          {/* Supporting line */}
          <p className="text-white/50 text-base mb-10">
            Join them — early access is free
          </p>

          {/* CTA */}
          <Link
            href="/waitlist"
            className="
              inline-flex items-center gap-2
              bg-brand-gold text-brand-dark
              px-8 py-4 rounded-lg
              text-base font-bold
              hover:bg-white hover:text-brand-dark
              transition-colors duration-200
              cursor-pointer
            "
          >
            Get Early Access
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── PART 2: Problem statistics grid ─────────────────────────────── */}
      <section
        className="bg-brand-light py-20 lg:py-28"
        aria-label="Nigeria healthcare workforce statistics"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section eyebrow */}
          <div className="text-center mb-14">
            <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
              The Problem We&apos;re Solving
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight max-w-2xl mx-auto">
              Nigeria&apos;s healthcare workforce crisis is{' '}
              <span className="text-brand-green">measurable</span>
            </h2>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROBLEM_STATS.map((stat) => (
              <div
                key={stat.id}
                className="
                  bg-white rounded-2xl p-10
                  border border-brand-dark/5
                  shadow-sm
                  text-center
                "
              >
                {/* Large stat number */}
                <p className="text-5xl sm:text-6xl font-bold text-brand-dark leading-none mb-4">
                  {stat.value}
                </p>

                {/* Descriptor */}
                <p className="text-brand-dark/60 text-base leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Attribution footnote */}
          <p className="text-center text-brand-dark/35 text-xs mt-10">
            Sources: MDCN annual reports, WHO health workforce data, field research
          </p>
        </div>
      </section>
    </>
  )
}

export default WaitlistSocialProof
