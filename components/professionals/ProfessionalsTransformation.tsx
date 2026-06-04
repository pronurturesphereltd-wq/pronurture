/**
 * ProfessionalsTransformation.tsx — Before/After pivot section for healthcare professionals
 *
 * Position: After ProfessionalsPainPoints.
 * Purpose: The narrative pivot from problem to solution using Before → After framing.
 *          Deep green background signals we have entered the "answer" phase.
 *          Strikethrough on "Before" text visually separates the bad old state from
 *          the good new state — a proven direct-response copywriting pattern.
 *
 * Target persona: Dr. Amarachi — responds to concrete promises, not vague claims.
 * Each transformation is specific and measurable, not generic marketing language.
 *
 * Design: bg-brand-dark (deep green), white text, gold accents.
 *         Per CLAUDE.md Section 12: deep green = trust, authority, health.
 *         Dot grid decoration consistent with StatsSection and WaitlistSection.
 */

import Link from "next/link";

interface Transformation {
  icon: React.ReactNode;
  before: string;
  after: string;
  description: string;
}

const transformations: Transformation[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    before: "Chasing payments",
    after: "Get paid on time, every time",
    description:
      "Employers on ProNurtureSphere are verified and commit to platform payment terms. Your earnings are tracked automatically — no more chasing, no more excuses.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    before: "Expensive, irrelevant CPD",
    after: "Accredited courses built for Nigerian clinicians",
    description:
      "Every CPD module is designed for the Nigerian clinical environment, accredited by relevant professional bodies, and affordable — or free for early access members.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    before: "Fake job listings",
    after: "Verified employers only, no wasted applications",
    description:
      "Every employer facility goes through a verification process before listing shifts. You only see real opportunities from real organisations — no bait-and-switch, no ghost listings.",
  },
];

const ProfessionalsTransformation = () => {
  return (
    <section
      className="relative bg-brand-dark py-20 lg:py-28 overflow-hidden"
      aria-label="How ProNurtureSphere transforms the healthcare professional experience"
    >
      {/* Dot grid — ties this section visually to StatsSection and WaitlistSection */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Gold glow — top-right for visual interest and warmth */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Your New Reality
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            What Changes When You Join ProNurtureSphere.
          </h2>
        </div>

        {/* ── Transformation Columns ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item) => (
            <div
              key={item.before}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all duration-300"
            >
              {/* Icon — gold on deep green for maximum visibility */}
              <div className="w-12 h-12 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center mb-6">
                {item.icon}
              </div>

              {/* Before — strikethrough signals "leaving this behind" */}
              <p className="text-white/40 text-sm line-through mb-2">
                {item.before}
              </p>

              {/* Arrow — reinforces forward directional movement from old state to new */}
              <div className="mb-2" aria-hidden="true">
                <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* After — white, bold, the concrete promise */}
              <h3 className="text-white font-bold text-lg leading-snug mb-3">
                {item.after}
              </h3>

              {/* Description — specific and verifiable, not vague marketing */}
              <p className="text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA — gold on deep green = maximum contrast primary action ── */}
        <div className="text-center mt-14">
          <Link
            href="/waitlist"
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
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsTransformation;
