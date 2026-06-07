/**
 * EmployersHero.tsx — Hero section for the For Healthcare Employers page
 *
 * Off-white (brand-light) background, two-column layout: text left, dashboard visual right.
 *
 * Per CLAUDE.md hero rules — answers 3 questions in under 3 seconds:
 *   1. What is this? → A workforce management platform
 *   2. Who is it for? → Nigerian hospitals, clinics, health organisations
 *   3. Why should I care? → One platform for hiring, compliance, and workforce growth
 *
 * The "98% Compliance Rate" stat card overlay immediately signals ROI to
 * Dr. Adaeze (CLAUDE.md Section 3) who is data-driven and compliance-focused.
 *
 * h-screen + pt-24 ensures the full hero fits above the fold with the fixed Navbar.
 */

import Link from "next/link";
import type { HomepageHero } from "@/sanity/lib/types";

const FALLBACK_HEADLINE    = "Build a Stronger Healthcare Team. Starting Today.";
const FALLBACK_SUBHEADLINE = "ProNurtureSphere gives Nigerian hospitals, clinics, and health organisations one platform to hire verified professionals, manage CPD compliance, and develop your workforce — from first placement to continuous growth.";
const FALLBACK_CTA_TEXT    = "Get Early Access";
const FALLBACK_CTA_LINK    = "/waitlist";

interface EmployersHeroProps {
  /** Hero content from Sanity — falls back to hardcoded if null */
  hero?: HomepageHero | null;
}

const EmployersHero = ({ hero }: EmployersHeroProps) => {
  const headline    = hero?.headline    ?? FALLBACK_HEADLINE;
  const subheadline = hero?.subheadline ?? FALLBACK_SUBHEADLINE;
  const ctaText     = hero?.ctaText     ?? FALLBACK_CTA_TEXT;
  const ctaLink     = hero?.ctaLink     ?? FALLBACK_CTA_LINK;

  return (
    <section
      className="h-screen overflow-hidden pt-24 flex items-center"
      style={{ backgroundColor: '#f5f5f0' }}
      aria-label="For Healthcare Employers hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

          {/* ── Left: Text Content ──────────────────────────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Badge — establishes audience specificity from the first glance */}
            <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-dark" aria-hidden="true" />
              <span className="text-brand-dark text-sm font-semibold">
                For Healthcare Facilities
              </span>
            </div>

            {/* H1 — from Sanity or fallback */}
            <h1 className="
              text-2xl md:text-3xl lg:text-4xl
              font-bold text-brand-dark
              leading-tight tracking-tight
              mb-4
            ">
              {headline}
            </h1>

            {/* Subheadline — from Sanity or fallback */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* ── CTA Buttons ─────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

              {/* Primary CTA — links to the Sanity ctaLink (defaults to /waitlist) */}
              <Link
                href={ctaLink}
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
                {ctaText}
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

              {/* Secondary CTA — outlined, links to the how-it-works anchor */}
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
                See How It Works
              </Link>
            </div>
          </div>

          {/* ── Right: Dashboard Visual (desktop only) ───────────────────── */}
          {/*
           * Green panel + dashboard screenshot mirrors the homepage hero pattern.
           * The stat card overlay with "98% Compliance Rate" speaks directly
           * to compliance-focused administrators.
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

              {/* Dot grid decoration */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
              />

              {/* Gold glow */}
              <div
                className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Dashboard screenshot placeholder */}
              <div className="relative rounded-xl overflow-hidden shadow-xl mb-3">
                <img
                  src="https://placehold.co/560x300/103613/ffffff?text=Employer+Dashboard"
                  alt="ProNurtureSphere employer dashboard showing workforce overview"
                  className="w-full h-auto block"
                />
              </div>

              {/* Stat card overlay — "98% Compliance Rate" is the headline ROI signal */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-brand-dark font-bold text-sm leading-tight">98% Compliance Rate</p>
                  <p className="text-gray-500 text-xs mt-0.5">Across all verified staff on platform</p>
                </div>
                {/* Stat callout — large number for immediate visual impact */}
                <span className="flex-shrink-0 text-2xl font-bold text-brand-dark">98%</span>
              </div>
            </div>
          </div>

          {/* ── Mobile Dashboard Visual ─────────────────────────────────────── */}
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
                  src="https://placehold.co/400x220/103613/ffffff?text=Employer+Dashboard"
                  alt="ProNurtureSphere employer dashboard"
                  className="w-full h-auto block rounded-lg"
                />
              </div>
              {/* Compact stat card for mobile */}
              <div className="relative bg-white rounded-xl p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-dark font-bold text-xs">98% Compliance Rate</p>
                  <p className="text-gray-500 text-xs">Across verified staff</p>
                </div>
                <span className="ml-auto text-xl font-bold text-brand-dark">98%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EmployersHero;
