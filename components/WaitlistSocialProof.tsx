/**
 * WaitlistSocialProof.tsx
 *
 * Three-part section on the homepage:
 *
 * PART 1 — Waitlist counter banner (bg-brand-dark)
 *   Live count from siteSettings.waitlistCount. Updated by editors in Sanity Studio.
 *
 * PART 2 — 2×3 stat grid (bg-brand-light)
 *   Six sourced statistics about Nigeria's healthcare workforce crisis.
 *   Mix of published data (MDCN, WHO) and PSL's own May 2026 field survey
 *   (40 professionals, 13 states).
 *
 * PART 3 — Survey quotes block (bg-brand-light, continuation)
 *   Three verbatim quotes from the PSL Clinical Workforce Survey.
 *   Attributed by role and state only — no names used.
 *
 * @param waitlistCount - Number from siteSettings; falls back to 0
 */

import Link from 'next/link'

const STATS = [
  {
    id:     'nurses',
    value:  '72,000+',
    label:  'Nigerian nurses with lapsed licences annually',
    source: 'Source: MDCN Annual Report',
  },
  {
    id:     'ratio',
    value:  '1 : 8,000',
    label:  "Doctor-to-patient ratio vs WHO's 1:600 target",
    source: 'Source: WHO Health Workforce Data',
  },
  {
    id:     'mobile-cpd',
    value:  '87%',
    label:  'of clinical professionals would complete CPD entirely on mobile if quality is right',
    source: 'Source: PSL Field Survey, May 2026 — 40 professionals across 13 states',
  },
  {
    id:     'misleading-jobs',
    value:  '52.5%',
    label:  'have taken a job that turned out significantly different from the listing',
    source: 'Source: PSL Field Survey, May 2026',
  },
  {
    id:     'cpd-tracking',
    value:  '62.5%',
    label:  'are behind, uncertain of, or not tracking CPD requirements',
    source: 'Source: PSL Field Survey, May 2026',
  },
  {
    id:     'open-to-jobs',
    value:  '97.5%',
    label:  'are open to new job opportunities',
    source: 'Source: PSL Field Survey, May 2026',
  },
]

const QUOTES = [
  {
    id:          'quote-1',
    text:        'The single biggest thing missing is somewhere I can find jobs with the salary shown before I waste time applying.',
    attribution: 'Registered nurse, 4 years experience, Edo State',
  },
  {
    id:          'quote-2',
    text:        'Poor knowledge on how to go about professional development in the best, cheapest possible way — despite the will to do it.',
    attribution: 'Nurse-midwife, 7 years experience, Lagos',
  },
  {
    id:          'quote-3',
    text:        'Filling a vacancy takes months. By the time we find someone through WhatsApp and references, the person we wanted has already taken another role.',
    attribution: 'Medical Director, private hospital, Edo State',
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

          <p className="text-brand-gold/70 text-sm font-semibold uppercase tracking-widest mb-6">
            Join the Movement
          </p>

          <p
            className="text-7xl sm:text-8xl lg:text-9xl font-bold text-brand-gold leading-none mb-4"
            aria-label={`${waitlistCount} plus`}
          >
            {waitlistCount}+
          </p>

          <p className="text-white/80 text-xl sm:text-2xl font-medium mb-3">
            healthcare professionals already on the waitlist
          </p>

          <p className="text-white/50 text-base mb-10">
            Join them — early access is free
          </p>

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

      {/* ── PART 2 + 3: Stats grid and survey quotes ─────────────────────── */}
      <section
        className="bg-brand-light py-20 lg:py-28"
        aria-label="Nigeria healthcare workforce statistics and survey findings"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Stats section header ─────────────────────────────────────── */}
          <div className="text-center mb-14">
            <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
              The Data
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight max-w-3xl mx-auto">
              Nigeria&apos;s healthcare workforce crisis is real — and measurable.{' '}
              <span className="text-brand-green block mt-1 text-2xl sm:text-3xl font-medium">
                These are not projections. They are current conditions.
              </span>
            </h2>
          </div>

          {/* ── 2×3 stat grid ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {STATS.map((stat) => (
              <div
                key={stat.id}
                className="
                  bg-white rounded-2xl p-8
                  border border-brand-dark/5
                  shadow-sm
                  text-center
                "
              >
                {/* Large stat value */}
                <p className="text-5xl sm:text-6xl font-bold text-brand-dark leading-none mb-3">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-brand-dark/70 text-base leading-relaxed mb-3">
                  {stat.label}
                </p>

                {/* Source attribution — small and muted */}
                <p className="text-brand-dark/35 text-xs leading-snug">
                  {stat.source}
                </p>
              </div>
            ))}
          </div>

          {/* ── PART 3: Survey quotes block ───────────────────────────────── */}
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-3">
                What Nigerian healthcare professionals told us.
              </h3>
              <p className="text-brand-dark/50 text-sm">
                Verbatim quotes from PSL Clinical Workforce Survey, May 2026.
                Attributed by role and state only — no names used.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {QUOTES.map((quote) => (
                <div
                  key={quote.id}
                  className="
                    bg-brand-light rounded-xl p-6
                    border border-brand-dark/5
                    border-l-4 border-l-brand-gold
                  "
                >
                  {/* Italic quote text */}
                  <p className="text-brand-dark/80 text-base italic leading-relaxed mb-4">
                    &ldquo;{quote.text}&rdquo;
                  </p>

                  {/* Attribution — muted, role + state only */}
                  <p className="text-brand-dark/45 text-sm">
                    — {quote.attribution}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default WaitlistSocialProof
