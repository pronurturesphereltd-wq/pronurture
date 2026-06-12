/**
 * WaitlistSection.tsx — Final CTA section
 *
 * Position: Last section before Footer — the final conversion opportunity.
 * Purpose: High-intent visitors who scrolled the full page get a clear, dual-audience
 *          CTA that routes each persona directly to the waitlist with their role pre-set.
 *
 * Design: Deep green background, gold + outline buttons side by side.
 * No email form — CTAs route to /waitlist where the full form lives.
 */

import Link from "next/link"

const WaitlistSection = () => {
  return (
    <section
      className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden"
      aria-label="Join the ProNurtureSphere waitlist"
    >
      {/* Background dot grid — visual consistency with hero */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Gold glow — draws the eye toward the CTAs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-5">
          Early Access
        </p>

        {/* Two-line headline — addresses both personas */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
          Your career deserves more than a WhatsApp group.
        </h2>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-gold leading-tight mb-8">
          Your team deserves better than a spreadsheet.
        </h2>

        <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Join free. No credit card required. Early access members get priority
          onboarding and early adopter pricing when we go live.
        </p>

        {/* ── Dual CTA row ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          {/* Primary — professional */}
          <Link
            href="/waitlist?role=professional"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-full
              bg-brand-gold text-brand-dark
              text-base font-bold
              cursor-pointer transition-all duration-200
              hover:bg-white hover:text-brand-dark hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-dark
              shadow-lg shadow-brand-gold/20
            "
          >
            I&apos;m a healthcare professional →
          </Link>

          {/* Outline — employer */}
          <Link
            href="/waitlist?role=employer"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-full
              border-2 border-white/40 text-white
              text-base font-bold
              cursor-pointer transition-all duration-200
              hover:border-white hover:bg-white/10 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-dark
            "
          >
            I manage a clinical team →
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/50 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free early access
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Priority onboarding
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Early adopter pricing
          </span>
        </div>

      </div>
    </section>
  )
}

export default WaitlistSection
