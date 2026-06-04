/**
 * AboutLifecycle.tsx — The Professional Lifecycle Model section
 *
 * Position: After AboutEcosystem.
 * Purpose: Makes the ecosystem model tangible by showing it as a lived journey
 *          with 7 named stages. This converts abstract concept (ecosystem) into
 *          a concrete narrative the professional persona can place themselves in.
 *
 * Design: White background for contrast after the deep green Ecosystem section.
 *         7 stages displayed as a vertical timeline on mobile, and a
 *         horizontal stepped flow on desktop.
 *
 * Each stage has:
 *   - A step number (visually prominent, brand-dark)
 *   - Stage name (bold)
 *   - Subtitle/description (supporting detail)
 *
 * The vertical connector line on mobile creates the "journey" metaphor visually.
 * On desktop, stages are shown in a 2-column alternating layout for visual interest.
 */

interface LifecycleStage {
  number: number;
  stage: string;
  subtitle: string;
  description: string;
}

const stages: LifecycleStage[] = [
  {
    number: 1,
    stage: "Awareness",
    subtitle: "Career Guidance & Community Outreach",
    description:
      "Reaching students, graduates, and early-career professionals with clarity on pathways, licensing, and opportunities in Nigerian healthcare.",
  },
  {
    number: 2,
    stage: "Training",
    subtitle: "PSL Learning Academy Programmes",
    description:
      "Accredited clinical and professional development programmes — CPD courses, skills training, and structured onboarding for healthcare roles.",
  },
  {
    number: 3,
    stage: "Mentorship",
    subtitle: "Structured Mentorship Cohorts",
    description:
      "Cohort-based mentorship pairing early-career professionals with experienced practitioners — turning knowledge into confident clinical practice.",
  },
  {
    number: 4,
    stage: "Certification & Competence",
    subtitle: "Clinical Readiness Validation",
    description:
      "Rigorous credential verification, licence tracking, and competence assessments that confirm a professional is deployment-ready.",
  },
  {
    number: 5,
    stage: "Deployment",
    subtitle: "Staffing & Workforce Placement",
    description:
      "Connecting verified professionals with hospitals, clinics, and agencies — through locum shifts, permanent placements, and international pathways.",
  },
  {
    number: 6,
    stage: "Practice Support",
    subtitle: "Continuous Education & Supervision",
    description:
      "Ongoing CPD, supervision, peer networks, and clinical support that keep practising professionals current, compliant, and connected.",
  },
  {
    number: 7,
    stage: "Leadership Development",
    subtitle: "Advanced Leadership & Consultancy Pathways",
    description:
      "Executive health leadership programmes, mentorship roles, and consultancy tracks that build the senior workforce Africa needs.",
  },
];

const AboutLifecycle = () => {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="ProNurtureSphere professional lifecycle model"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            The Journey
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            The Professional Lifecycle Model.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            From first awareness to leadership — we walk with healthcare professionals
            at every stage of their career.
          </p>
        </div>

        {/* ── Lifecycle Stages — vertical timeline (mobile) / grid (desktop) ─ */}
        <div className="relative">

          {/* Vertical connector line on mobile */}
          <div
            className="
              absolute left-6 top-0 bottom-0 w-0.5 bg-brand-dark/10
              block lg:hidden
            "
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {stages.map((item) => (
              <article
                key={item.stage}
                className="
                  relative flex gap-5 lg:gap-6
                  bg-white lg:bg-brand-light/60 rounded-2xl
                  p-4 lg:p-6
                  border border-brand-dark/0 lg:border-brand-dark/5
                  hover:border-brand-dark/10 hover:shadow-md
                  transition-all duration-300
                "
              >
                {/* Step number circle — visually anchors each stage in the sequence */}
                <div className="
                  flex-shrink-0
                  w-12 h-12
                  rounded-full bg-brand-dark
                  flex items-center justify-center
                  shadow-md
                  relative z-10
                ">
                  <span className="text-brand-gold font-bold text-sm">
                    {String(item.number).padStart(2, "0")}
                  </span>
                </div>

                {/* Stage content */}
                <div className="flex-1 min-w-0 pt-1">

                  {/* Stage name */}
                  <h3 className="text-brand-dark font-bold text-base leading-snug mb-1">
                    {item.stage}
                  </h3>

                  {/* Subtitle — eyebrow-style programme name */}
                  <p className="text-brand-green text-xs font-semibold uppercase tracking-wide mb-2">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-brand-dark/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Journey Closure Statement ────────────────────────────────────── */}
        {/* Reminds the reader that this is not 7 separate products but one journey */}
        <div
          className="mt-14 rounded-2xl px-8 py-6 text-center border border-brand-dark/10"
          style={{ backgroundColor: "#f5f5f0" }}
        >
          <p className="text-brand-dark font-semibold text-base md:text-lg">
            Seven stages. One integrated system. A lifetime of career support.
          </p>
          <p className="text-brand-dark/55 text-sm mt-2">
            No professional enters at Stage 1 and leaves at Stage 2. ProNurtureSphere
            is designed to grow with you — for the full duration of your career.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutLifecycle;
