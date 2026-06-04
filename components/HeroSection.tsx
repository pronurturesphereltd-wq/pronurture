/**
 * HeroSection.tsx — Homepage above-the-fold hero
 *
 * Design: Clean, light, professional layout inspired by florence.co.uk.
 * Background is off-white (#f5f5f0) — airy and premium, not heavy.
 * Deep green (#103613) appears only as accent: badge, image panel, buttons.
 *
 * This answers 3 questions in under 3 seconds (per CLAUDE.md design rules):
 *   1. What is this? → Nigeria's digital healthcare workforce platform
 *   2. Who is it for? → Hospitals, clinics, and healthcare professionals
 *   3. Why should I care? → Smarter staffing, faster hiring, better operations
 *
 * Layout decisions:
 * - h-screen overflow-hidden — strictly viewport-height, nothing bleeds out
 * - pt-24 offsets fixed navbar (~80px); flex items-center centres in visible area
 * - Two-column grid: text left, image panel right (lg+)
 * - Right panel capped at max-h-[60vh] so it never pushes layout
 * - Trust badges moved below the fold to keep above-fold content compact
 */

import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="
        bg-brand-light
        h-screen overflow-hidden
        pt-24
        flex items-center
      "
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

          {/* ── Left: Text Content ──────────────────────────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Badge — pill establishes Nigerian healthcare context */}
            <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-dark animate-pulse" aria-hidden="true" />
              <span className="text-brand-dark text-sm font-semibold">
                Built for Nigerian Healthcare
              </span>
            </div>

            {/* H1 — smaller size so all 3 lines fit above the fold */}
            <h1 className="
              text-2xl md:text-3xl lg:text-4xl
              font-bold text-brand-dark
              leading-tight tracking-tight
              mb-3
            ">
              Smarter Staffing.{" "}
              <br className="hidden sm:block" />
              Faster Hiring.{" "}
              <br className="hidden sm:block" />
              Better Healthcare Operations.
            </h1>

            {/* Subheadline — muted gray, smaller to conserve vertical space */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
              From digital rostering and payroll to verified locum staffing and
              CPD management — ProNurtureSphere gives Nigerian healthcare organisations
              one platform to manage their entire workforce.
            </p>

            {/* ── CTA Buttons ─────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

              {/* Primary CTA */}
              <Link
                href="/waitlist"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-full
                  bg-brand-dark text-white
                  text-sm font-bold
                  cursor-pointer transition-all duration-200
                  hover:bg-brand-green hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 focus:ring-offset-brand-light
                  shadow-md
                "
              >
                Join the Waitlist
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

              {/* Secondary CTA */}
              <Link
                href="#features"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-full
                  border-2 border-brand-dark text-brand-dark
                  text-sm font-semibold
                  cursor-pointer transition-all duration-200
                  hover:bg-brand-dark hover:text-white hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 focus:ring-offset-brand-light
                "
              >
                See How It Works
              </Link>
            </div>

          </div>

          {/* ── Right: Image Panel (desktop only) ───────────────────────────── */}
          {/*
           * Capped at max-h-[60vh] so the card never exceeds 60% of viewport height.
           * overflow-hidden on the outer wrapper clips any internal overflow.
           */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="
              relative w-full max-w-lg
              bg-brand-dark rounded-3xl
              p-5
              shadow-2xl
              overflow-hidden
              max-h-[60vh]
            ">

              {/* Subtle dot grid decoration */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
              />

              {/* Soft gold glow */}
              <div
                className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Platform screenshot */}
              <div className="relative rounded-xl overflow-hidden shadow-xl mb-3">
                <img
                  src="https://placehold.co/560x300/1a5c1a/ffffff?text=ProNurtureSphere+Platform"
                  alt="ProNurtureSphere workforce management platform dashboard"
                  className="w-full h-auto block"
                />
              </div>

              {/* Floating notification card */}
              <div className="relative bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-brand-dark font-bold text-sm leading-tight">Shift Filled Successfully</p>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">Dr. Adaeze verified — Lagos General Hospital</p>
                </div>
                <span className="flex-shrink-0 inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Mobile-only image */}
          <div className="lg:hidden flex justify-center">
            <div className="relative w-full max-w-sm bg-brand-dark rounded-2xl p-4 shadow-xl overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
                aria-hidden="true"
              />
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="https://placehold.co/400x220/1a5c1a/ffffff?text=ProNurtureSphere+Platform"
                  alt="ProNurtureSphere workforce management platform dashboard"
                  className="w-full h-auto block rounded-lg"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
