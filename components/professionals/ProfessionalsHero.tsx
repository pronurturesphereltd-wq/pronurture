/**
 * ProfessionalsHero.tsx — Hero section for the For Healthcare Professionals page
 *
 * Off-white (#f5f5f0) background applied via inline style for guaranteed rendering.
 * Two-column layout: text left, platform visual right.
 *
 * Per CLAUDE.md hero rules — answers 3 questions in under 3 seconds:
 *   1. What is this?       → A platform for healthcare professionals in Nigeria
 *   2. Who is it for?      → Doctors, nurses, pharmacists, allied health professionals
 *   3. Why should I care?  → Verified shifts, on-time pay, accredited CPD in one place
 *
 * Target persona: Dr. Amarachi Bello (CLAUDE.md Section 3)
 * Tone: Warm, opportunity-focused, encouraging — NOT formal/corporate.
 * "500+ Verified Professionals" stat card signals safety-in-numbers and community trust.
 *
 * h-screen + pt-24 ensures full hero fits above the fold with the fixed Navbar.
 */

import Link from "next/link";

const ProfessionalsHero = () => {
  return (
    <section
      className="h-screen overflow-hidden pt-24 flex items-center"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="For Healthcare Professionals hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

          {/* ── Left: Text Content ──────────────────────────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Badge — immediately identifies the audience from the first glance */}
            <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-green animate-pulse" aria-hidden="true" />
              <span className="text-brand-dark text-sm font-semibold">
                For Healthcare Professionals
              </span>
            </div>

            {/* H1 — opportunity-focused, warm tone for Dr. Amarachi persona */}
            <h1 className="
              text-2xl md:text-3xl lg:text-4xl
              font-bold text-brand-dark
              leading-tight tracking-tight
              mb-4
            ">
              Your Skills Are in Demand.{" "}
              <br className="hidden sm:block" />
              We Make Sure You{" "}
              <br className="hidden sm:block" />
              Get Paid for Them.
            </h1>

            {/* Subheadline — names all professional types to maximise relatability */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              ProNurtureSphere connects Nigerian doctors, nurses, pharmacists, and allied
              health professionals with verified employers, flexible locum shifts, and
              accredited CPD — all in one place.
            </p>

            {/* ── CTA Buttons ─────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

              {/* Primary CTA — bg-brand-dark per brief spec */}
              <Link
                href="/waitlist"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-full
                  bg-brand-dark text-white
                  text-sm font-bold
                  cursor-pointer transition-all duration-200
                  hover:bg-brand-green hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2
                  shadow-md
                "
              >
                Get Early Access
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

              {/* Secondary CTA — links to how-it-works anchor on same page */}
              <Link
                href="#how-it-works"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-full
                  border-2 border-brand-dark text-brand-dark
                  text-sm font-semibold
                  cursor-pointer transition-all duration-200
                  hover:bg-brand-dark hover:text-white hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2
                "
              >
                See Available Shifts
              </Link>
            </div>
          </div>

          {/* ── Right: Platform Visual (desktop only) ────────────────────── */}
          {/*
           * Green panel + dashboard screenshot mirrors homepage and employers hero pattern.
           * "500+ Verified Professionals" stat card counters Dr. Amarachi's trust barrier:
           * other clinicians already joined, so the platform is credible and active.
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

              {/* Platform screenshot placeholder */}
              <div className="relative rounded-xl overflow-hidden shadow-xl mb-3">
                <img
                  src="https://placehold.co/560x300/103613/ffffff?text=Professionals+Dashboard"
                  alt="ProNurtureSphere professionals dashboard showing available locum shifts and CPD courses"
                  className="w-full h-auto block"
                />
              </div>

              {/* Stat card — social proof that professionals already trust the platform */}
              <div className="relative bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-brand-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-brand-dark font-bold text-sm leading-tight">500+ Verified Professionals</p>
                  <p className="text-gray-500 text-xs mt-0.5">Already on ProNurtureSphere</p>
                </div>
                <span className="flex-shrink-0 inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                  Growing
                </span>
              </div>
            </div>
          </div>

          {/* ── Mobile Platform Visual ─────────────────────────────────────── */}
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
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img
                  src="https://placehold.co/400x220/103613/ffffff?text=Professionals+Dashboard"
                  alt="ProNurtureSphere professionals dashboard"
                  className="w-full h-auto block rounded-lg"
                />
              </div>
              {/* Compact stat card for mobile */}
              <div className="relative bg-white rounded-xl p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-dark font-bold text-xs">500+ Verified Professionals</p>
                  <p className="text-gray-500 text-xs">Already on platform</p>
                </div>
                <span className="ml-auto text-sm font-bold text-brand-dark">500+</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfessionalsHero;
