/**
 * ProfessionalsPainPoints.tsx — Empathy section for healthcare professionals
 *
 * Position: After ProfessionalsHero.
 * Purpose: Validates Dr. Amarachi's real frustrations BEFORE presenting any solution.
 *          Empathy earns trust — trust enables conversion.
 *          Per CLAUDE.md Section 3 persona pains: "Fake job listings, expensive CPD,
 *          unreliable employers, poor platform UX."
 *
 * Design: Off-white (brand-light) background via inline style.
 *         Amber icon backgrounds signal "problem/broken" state (same pattern as
 *         ProblemSection on the homepage).
 *
 * This section bridges into ProfessionalsTransformation which presents the solution.
 */

interface PainCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const painCards: PainCard[] = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "You're chasing employers who don't respond or pay late",
    description:
      "You did the work, you showed up, but getting paid is a whole other battle. Delayed payments and unresponsive employers are draining your energy and your bank account.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    title: "Your CPD is expensive, hard to find, and not always relevant",
    description:
      "Licence renewal deadlines are real, but the courses are costly, difficult to access, and rarely designed for the Nigerian clinical environment you work in every day.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "You don't know if the job posting is real or a waste of your time",
    description:
      "You've applied to positions that never existed, or turned up for a shift only to find the rate had changed. Fake listings and bait-and-switch postings waste your time and kill your confidence.",
  },
];

const ProfessionalsPainPoints = () => {
  return (
    <section
      className="pt-20 pb-8 lg:pt-28 lg:pb-8"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Common pain points faced by Nigerian healthcare professionals"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            We Hear You
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            We Know the Struggle.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            Nigerian healthcare professionals are among the most skilled in the world.
            You deserve a platform that treats you that way.
          </p>
        </div>

        {/* ── Pain Point Cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-7 border border-brand-dark/5 hover:border-brand-dark/15 hover:shadow-md transition-all duration-300"
            >
              {/* Icon — amber/warning signals the pain/broken state */}
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                {card.icon}
              </div>

              {/* Pain title — bold, empathy-led, uses "you" language */}
              <h3 className="text-brand-dark font-bold text-lg leading-snug mb-3">
                {card.title}
              </h3>

              {/* Description — validates the emotional experience, not just the practical problem */}
              <p className="text-brand-dark/60 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Transition teaser — bridges into ProfessionalsTransformation ── */}
        <p className="text-center mt-12 text-brand-dark/70 text-base max-w-2xl mx-auto">
          ProNurtureSphere was built specifically to fix every one of these problems —
          by clinicians who lived them.
        </p>
      </div>
    </section>
  );
};

export default ProfessionalsPainPoints;
