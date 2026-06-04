/**
 * AboutCTA.tsx — Final call to action for the About page
 *
 * Position: Last section before the site-wide Footer.
 * Purpose: Converts readers who have engaged with the full About page story
 *          into action-takers. Unlike the professionals/employers CTAs which
 *          capture email, this is a dual-audience CTA: both audiences (employers
 *          and professionals) land on this page. Two buttons serve both.
 *
 * Design: Deep green background (bg-brand-dark) — consistent visual rhythm
 *         with WaitlistSection, EmployersCTA, ProfessionalsCTA across the site.
 *         Primary CTA: gold "Get Early Access" → /waitlist
 *         Secondary CTA: outlined white "Contact Us" → /contact
 *
 * This is a Server Component — no form state needed.
 * The story page has already done the persuasion work; the CTA just provides the door.
 */

import Link from "next/link";

const AboutCTA = () => {
  return (
    <section
      className="bg-brand-dark py-20 lg:py-24 relative overflow-hidden"
      aria-label="Join the ProNurtureSphere movement"
    >
      {/* Dot grid decoration — consistent with all dark CTA sections */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Gold glow — draws the eye to the central CTA */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Section label */}
        <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-6">
          Join the Movement
        </p>

        {/* Headline — inclusive, movement-framing language; this is an About page, not a sales page */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Join the Movement to Strengthen{" "}
          <br className="hidden md:block" />
          Nigerian Healthcare.
        </h2>

        {/* Subtext — explicitly names both audiences so each visitor feels addressed */}
        <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you are a healthcare professional looking to grow your career,
          a facility seeking verified staff, or a partner organisation — there is
          a place for you in the ProNurtureSphere ecosystem.
        </p>

        {/* ── Dual CTA Buttons ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          {/* Primary CTA — gold, routes to waitlist signup */}
          <Link
            href="/waitlist"
            className="
              inline-flex items-center justify-center gap-2
              px-8 py-4 rounded-full
              bg-brand-gold text-brand-dark
              text-base font-bold
              cursor-pointer transition-all duration-200
              hover:bg-white hover:text-brand-dark hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-dark
              shadow-lg shadow-brand-gold/20
            "
          >
            Get Early Access
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {/* Secondary CTA — outlined white, routes to contact page */}
          <Link
            href="/contact"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-full
              border-2 border-white/40 text-white
              text-base font-semibold
              cursor-pointer transition-all duration-200
              hover:bg-white hover:text-brand-dark hover:border-white hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-dark
            "
          >
            Contact Us
          </Link>
        </div>

        {/* Reassurance tagline below the buttons */}
        <p className="mt-8 text-white/35 text-sm">
          Early access is free. No credit card required. Nigeria-first.
        </p>

      </div>
    </section>
  );
};

export default AboutCTA;
