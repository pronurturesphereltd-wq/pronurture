/**
 * AboutValues.tsx — Brand values grid section
 *
 * Position: After AboutStory.
 * Purpose: Makes the organisation's character concrete and scannable.
 *          Values are not decoration — they signal to both audiences what
 *          they can expect from the people and systems behind ProNurtureSphere.
 *          Compliance-conscious employers and trust-seeking professionals
 *          both read values sections closely.
 *
 * Design: Off-white background (#f5f5f0). 7 cards in a responsive grid
 *         (1 → 2 → 3 columns). Each card has a brand-dark icon container
 *         with a gold SVG icon, plus bold title and supporting description.
 *
 * Icon choice: Each icon is selected to visually reinforce the value name,
 *              not just decorate. The gold icon on dark green creates the
 *              same high-contrast visual signature used across feature cards.
 */

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const values: Value[] = [
  {
    title: "Compassion",
    description:
      "Care rooted in empathy, dignity, and deep respect for human life — at every touchpoint, for every person we serve.",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description:
      "Evidence-based practice, clinical competence, and the pursuit of international standards in every programme we deliver.",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description:
      "Ethical practice, full transparency, and unwavering regulatory compliance — in our operations and in every professional we place.",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Nurturing Leadership",
    description:
      "We develop people, not just professionals — building confidence, character, and capacity for leadership at every stage of a healthcare career.",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "Forward-thinking healthcare solutions that integrate education, technology, and practice to solve problems that traditional systems cannot.",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Equity & Inclusion",
    description:
      "Access to healthcare education should not depend on geography, income, or background. We design for the many, not just the privileged few.",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description:
      "Strategic partnerships — with hospitals, universities, regulators, and communities — that multiply our reach and deepen our impact.",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const AboutValues = () => {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="ProNurtureSphere brand values"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Our Values
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            What We Stand For.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            Seven principles that guide every decision, every programme, and every
            relationship we build.
          </p>
        </div>

        {/* ── Values Grid ─────────────────────────────────────────────────── */}
        {/*
         * 1 column on mobile → 2 on tablet → 3 on desktop (with 7th card centred).
         * Each card: icon container + title + description. Consistent with
         * the FeaturesSection and EmployersFeatures card pattern.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <article
              key={value.title}
              className="
                bg-white rounded-2xl p-6
                border border-brand-dark/5
                hover:border-brand-dark/15 hover:shadow-md
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Icon container — brand-dark bg with gold icon for consistent visual signature */}
              <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center mb-4 flex-shrink-0">
                {value.icon}
              </div>

              {/* Value title */}
              <h3 className="text-brand-dark font-bold text-base mb-2">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-brand-dark/60 text-sm leading-relaxed flex-1">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
