/**
 * AboutEcosystem.tsx — The ecosystem model explainer section
 *
 * Position: After AboutValues.
 * Purpose: Reframes the organisation's identity — PSL is not a training company.
 *          This is a critical positioning statement that differentiates ProNurtureSphere
 *          from competitors who offer only one part of the solution.
 *
 * Design: Deep green background (bg-brand-dark) for authority and visual contrast
 *         after the light-background sections above it. White text, gold accents.
 *
 * The 4 pillars (Training → Mentorship → Deployment → Leadership) are shown as
 * a connected horizontal flow — the arrow between each pillar visually communicates
 * that these are stages in a system, not isolated services.
 *
 * Below the pillars: a unifying statement in gold — the system insight.
 */

interface Pillar {
  stage: string;
  outcome: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    stage: "Training",
    outcome: "Competence",
    description: "Structured clinical education and CPD through PSL Learning Academy",
  },
  {
    stage: "Mentorship",
    outcome: "Confidence",
    description: "Cohort-based mentorship that turns knowledge into practice-ready skill",
  },
  {
    stage: "Deployment",
    outcome: "Experience",
    description: "Verified staffing and workforce placement into the right roles",
  },
  {
    stage: "Leadership",
    outcome: "Sustainability",
    description: "Advanced pathways that build the next generation of healthcare leaders",
  },
];

const AboutEcosystem = () => {
  return (
    <section
      className="bg-brand-dark py-20 lg:py-28 relative overflow-hidden"
      aria-label="ProNurtureSphere healthcare ecosystem model"
    >
      {/* Subtle dot grid — consistent texture pattern used on dark sections */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Gold glow — draws focus toward the centre of the section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-5">
            The Ecosystem Model
          </p>
          {/* Headline is a direct positioning reframe — deliberately bold */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
            We Are Not a Training Company.{" "}
            <br className="hidden md:block" />
            We Are a Healthcare Ecosystem Builder.
          </h2>
          <p className="text-white/65 text-lg max-w-3xl mx-auto leading-relaxed">
            Most organisations pick one part of the problem — a course, a job board, a staffing
            agency. ProNurtureSphere integrates all four into a single connected system that
            transforms a newly trained professional into a sustainable healthcare leader.
          </p>
        </div>

        {/* ── 4 Pillars — connected flow ──────────────────────────────────── */}
        {/*
         * On desktop: horizontal row with arrow connectors between pillars.
         * On mobile: vertical stack (arrows hidden to avoid clutter).
         * Each pillar card shows the stage name, outcome, and a brief description.
         */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {pillars.map((pillar, index) => (
            <div key={pillar.stage} className="flex flex-col lg:flex-row items-stretch flex-1">

              {/* Pillar card */}
              <div className="
                flex-1 bg-white/10 rounded-2xl p-6 lg:p-8
                border border-white/10
                hover:bg-white/15 hover:border-white/20
                transition-all duration-300
                flex flex-col
                mb-4 lg:mb-0
              ">

                {/* Step number */}
                <span className="text-brand-gold/50 text-xs font-bold uppercase tracking-widest mb-3">
                  Step {index + 1}
                </span>

                {/* Stage name — large, bold */}
                <h3 className="text-white font-bold text-xl mb-1">{pillar.stage}</h3>

                {/* Arrow + outcome — shows the transformation */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-brand-gold font-bold text-sm">{pillar.outcome}</span>
                </div>

                {/* Description */}
                <p className="text-white/55 text-sm leading-relaxed flex-1">
                  {pillar.description}
                </p>
              </div>

              {/* Connector arrow between pillars (desktop only, not after last pillar) */}
              {index < pillars.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center px-3 flex-shrink-0"
                  aria-hidden="true"
                >
                  <svg
                    className="w-6 h-6 text-brand-gold/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── System Insight Statement ─────────────────────────────────────── */}
        {/* The gold bar at the bottom unifies all 4 pillars into one conclusion */}
        <div className="mt-12 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl px-8 py-6 text-center">
          <p className="text-brand-gold font-bold text-base md:text-lg">
            PSL integrates all four stages into one connected system —
            from first training to lifelong career sustainability.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutEcosystem;
