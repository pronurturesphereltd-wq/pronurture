/**
 * AudienceSection.tsx — Dual-audience split section
 *
 * Position: After FeaturesSection.
 * Purpose: Explicitly addresses both buyer personas — speaks directly to each
 *          audience in their own voice so every visitor self-identifies and
 *          navigates to the right deeper page.
 *
 * Left column (professionals): brand-dark bg — warm, opportunity-focused
 * Right column (employers): brand-green bg — formal, compliance-driven
 * Both columns stack vertically on mobile.
 */

import Link from "next/link"

const AudienceSection = () => {
  return (
    <section
      className="w-full overflow-hidden"
      aria-label="Who ProNurtureSphere is for"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT — For Healthcare Professionals ─────────────────────────── */}
        <div className="bg-brand-dark text-white px-8 py-20 lg:py-28 lg:px-16 xl:px-24">
          <div className="max-w-lg mx-auto lg:mx-0">

            <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">
              For Healthcare Professionals
            </p>

            <h3 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
              Your career. Built for where you&apos;re going.
            </h3>

            <p className="text-white/70 text-base leading-relaxed mb-8">
              From nurses and midwives to doctors, pharmacists, physiotherapists,
              lab scientists, and allied health professionals — PSL is built for
              every registered clinical professional in Nigeria.
            </p>

            <ul className="space-y-4 mb-10" role="list">
              {[
                "Find verified clinical jobs with salary shown on every listing",
                "Apply in one tap using your saved professional profile",
                "Track your MDCN/NMCN CPD points in real time — no more guessing",
                "Complete accredited CPD on your phone, offline if needed",
                "Store and share all certificates and credentials in one digital wallet",
                "Browse locum shifts at verified facilities near you",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <svg
                    className="text-brand-gold w-5 h-5 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/professionals"
              className="
                inline-flex items-center justify-center
                px-8 py-4 rounded-full
                bg-brand-gold text-brand-dark
                text-base font-bold
                cursor-pointer transition-all duration-200
                hover:bg-white hover:text-brand-dark hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
              "
            >
              See everything PSL offers professionals →
            </Link>
          </div>
        </div>

        {/* ── RIGHT — For Healthcare Facilities ───────────────────────────── */}
        <div className="bg-brand-green text-white px-8 py-20 lg:py-28 lg:px-16 xl:px-24">
          <div className="max-w-lg mx-auto lg:mx-0">

            <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-70">
              For Healthcare Facilities
            </p>

            <h3 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
              Fill your vacancies faster. Keep your team compliant.
            </h3>

            <p className="text-white/75 text-base leading-relaxed mb-8">
              Hospitals, clinics, and primary health centres — PSL gives you a
              verified candidate pool, a CPD compliance dashboard, and the workforce
              tools to run your facility without the paper chaos.
            </p>

            <ul className="space-y-4 mb-10" role="list">
              {[
                "Post vacancies and reach MDCN/NMCN-verified candidates directly",
                "Every candidate's licence and credentials confirmed before they reach your inbox",
                "Track CPD compliance for your entire team in one dashboard",
                "Digital staff records — instantly ready for any inspection",
                "Fill urgent gaps with verified locum professionals in hours",
                "Named support contact on WhatsApp — a real person, not a ticket system",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <svg
                    className="text-white w-5 h-5 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/employers"
              className="
                inline-flex items-center justify-center
                px-8 py-4 rounded-full
                bg-white text-brand-dark
                text-base font-bold
                cursor-pointer transition-all duration-200
                hover:bg-brand-light hover:text-brand-dark hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
              "
            >
              See everything PSL offers employers →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AudienceSection
