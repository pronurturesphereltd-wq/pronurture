/**
 * AboutHero.tsx — Hero section for the About page
 *
 * This is a story page, not a conversion page — no CTA buttons.
 * The goal is to establish identity and mission from the very first second.
 *
 * Per CLAUDE.md hero rules — answers 3 questions in 3 seconds:
 *   1. What is this? → A story about why ProNurtureSphere exists
 *   2. Who is it for? → Anyone who wants to understand the organisation
 *   3. Why should I care? → The mission to build Africa's healthcare workforce
 *
 * Layout: Two-column — text left, placeholder image right (desktop).
 * Background: bg-brand-light (#f5f5f0) via inline style for reliable rendering.
 * h-screen + pt-24 ensures full hero fits above the fold with the fixed Navbar.
 */

import Image from "next/image";

const AboutHero = () => {
  return (
    <section
      className="min-h-screen overflow-hidden pt-24 pb-12 flex items-center"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="About ProNurtureSphere hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text Content ──────────────────────────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Badge — names the page for instant orientation */}
            <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-green" aria-hidden="true" />
              <span className="text-brand-dark text-sm font-semibold tracking-wide">
                About ProNurtureSphere
              </span>
            </div>

            {/* H1 — single most dominant element; mission-first framing */}
            <h1 className="
              text-3xl md:text-4xl lg:text-5xl
              font-bold text-brand-dark
              leading-tight tracking-tight
              mb-6
            ">
              Building the Healthcare{" "}
              <br className="hidden sm:block" />
              Workforce Africa{" "}
              <br className="hidden sm:block" />
              Deserves.
            </h1>

            {/* Subheadline — the full brand positioning statement */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              ProNurtureSphere by Sphere Limited exists at the intersection of education,
              technology, and healthcare delivery — nurturing, equipping, deploying, and
              sustaining competent healthcare professionals across Nigeria and beyond.
            </p>

            {/* Decorative divider — visual breathing space before the scroll cue */}
            <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
              <div className="w-12 h-1 rounded-full bg-brand-dark" aria-hidden="true" />
              <div className="w-4 h-1 rounded-full bg-brand-gold" aria-hidden="true" />
              <div className="w-2 h-1 rounded-full bg-brand-green" aria-hidden="true" />
            </div>
          </div>

          {/* ── Right: Visual Panel (desktop) ──────────────────────────────── */}
          {/*
           * Deep green container frames the placeholder photograph.
           * The "Since 2024" badge anchors the brand timeline visually.
           */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="
              relative w-full max-w-lg
              bg-brand-dark rounded-3xl
              p-5 shadow-2xl overflow-hidden
              max-h-[70vh]
            ">

              {/* Dot grid texture */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
                aria-hidden="true"
              />

              {/* Gold glow accent */}
              <div
                className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Hero photograph placeholder */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-4">
                <Image
                  src="https://placehold.co/560x340/103613/ffffff?text=Nigerian+Healthcare+Professionals"
                  alt="Nigerian healthcare professionals in a clinical setting — doctors, nurses, and allied health workers"
                  width={560}
                  height={340}
                  className="w-full h-auto block"
                  priority
                />
              </div>

              {/* "Since 2024" founding badge */}
              <div className="relative bg-white rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  {/* Heart/pulse icon — health sector visual identity */}
                  <svg
                    className="w-5 h-5 text-brand-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-brand-dark font-bold text-sm leading-tight">ProNurtureSphere by Sphere Ltd</p>
                  <p className="text-gray-500 text-xs mt-0.5">Nurturing healthcare workforce excellence</p>
                </div>
                <span className="flex-shrink-0 text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded-full">
                  Est. 2024
                </span>
              </div>
            </div>
          </div>

          {/* ── Mobile Visual Panel ─────────────────────────────────────────── */}
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
              <div className="relative rounded-xl overflow-hidden mb-3">
                <Image
                  src="https://placehold.co/400x240/103613/ffffff?text=Healthcare+Professionals"
                  alt="Nigerian healthcare professionals"
                  width={400}
                  height={240}
                  className="w-full h-auto block rounded-xl"
                />
              </div>
              <div className="relative bg-white rounded-xl p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-dark font-bold text-xs">ProNurtureSphere by Sphere Ltd</p>
                  <p className="text-gray-500 text-xs">Nurturing healthcare excellence</p>
                </div>
                <span className="ml-auto text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                  Est. 2024
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;
