/**
 * HowItWorks.tsx — Two parallel 3-step onboarding flows
 *
 * Position: Between AudienceSection and WaitlistSocialProof.
 * Purpose: Reduce friction by showing how simple it is to get started,
 *          for both personas simultaneously. Steps are numbered 01–03 in
 *          brand-gold to create visual rhythm and scannable progress.
 *
 * Design: brand-light background. Two columns — professionals left,
 *         employers right — with a vertical divider on desktop.
 */

import Link from "next/link"

interface Step {
  number: string
  heading: string
  body: string
}

interface Column {
  heading: string
  steps: Step[]
  ctaText: string
  ctaHref: string
}

const COLUMNS: Column[] = [
  {
    heading: "For healthcare professionals",
    steps: [
      {
        number:  "01",
        heading: "Create your free profile",
        body:    "Add your qualifications, MDCN or NMCN registration, specialty, and preferred locations. Takes under 10 minutes.",
      },
      {
        number:  "02",
        heading: "Browse jobs, shifts, and CPD",
        body:    "See verified jobs with salary shown, filtered to your specialty and state. Browse locum shifts. Access your CPD tracker.",
      },
      {
        number:  "03",
        heading: "Apply, learn, and grow",
        body:    "Apply in one tap. Study CPD offline. Share credentials with employers instantly. Your career, managed.",
      },
    ],
    ctaText: "Get free access →",
    ctaHref: "/waitlist?role=professional",
  },
  {
    heading: "For healthcare facilities",
    steps: [
      {
        number:  "01",
        heading: "Create your facility profile",
        body:    "Set up your hospital or clinic in minutes. Add departments, staffing requirements. No IT team required.",
      },
      {
        number:  "02",
        heading: "Post vacancies and access verified candidates",
        body:    "Every applicant's MDCN/NMCN registration confirmed before they reach you. Review credentials at a glance.",
      },
      {
        number:  "03",
        heading: "Manage shifts, CPD, and records — in one place",
        body:    "Your whole workforce in one dashboard. Compliance alerts, digital records, locum requests. Inspection-ready, always.",
      },
    ],
    ctaText: "Post your first vacancy free →",
    ctaHref: "/waitlist?role=employer",
  },
]

const HowItWorks = () => {
  return (
    <section
      className="bg-brand-light py-20 lg:py-28"
      aria-label="How ProNurtureSphere works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight mb-4">
            Simple to get started.
          </h2>
          <p className="text-brand-dark/60 text-base leading-relaxed">
            Whether you&apos;re a professional or a facility manager, you&apos;re
            up and running in minutes.
          </p>
        </div>

        {/* ── Two-column step flows ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 lg:divide-x lg:divide-brand-dark/10">
          {COLUMNS.map((col) => (
            <div
              key={col.heading}
              className="lg:px-12 first:lg:pl-0 last:lg:pr-0"
            >
              {/* Column heading */}
              <h3 className="text-lg font-bold text-brand-dark mb-8 pb-4 border-b border-brand-dark/10">
                {col.heading}
              </h3>

              {/* Steps */}
              <ol className="space-y-8 mb-10">
                {col.steps.map((step) => (
                  <li key={step.number} className="flex gap-5">
                    {/* Step number — large, brand-gold, acts as visual anchor */}
                    <span
                      className="text-3xl font-bold text-brand-gold leading-none flex-shrink-0 w-10 pt-0.5"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>

                    <div>
                      <h4 className="text-base font-bold text-brand-dark mb-1">
                        {step.heading}
                      </h4>
                      <p className="text-brand-dark/60 text-sm leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Column CTA */}
              <Link
                href={col.ctaHref}
                className="
                  inline-flex items-center justify-center
                  px-7 py-3.5 rounded-full
                  bg-brand-dark text-white
                  text-sm font-bold
                  cursor-pointer transition-all duration-200
                  hover:bg-brand-green hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 focus:ring-offset-brand-light
                  shadow-sm
                "
              >
                {col.ctaText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks
