/**
 * ProblemSection.tsx — "The Problem" section
 *
 * Position: After the social proof bar.
 * Purpose: Agitate the pain points that ProNurtureSphere solves.
 *          Good marketing acknowledges the problem before presenting the solution.
 *          This creates empathy and makes the solution feel necessary, not optional.
 *
 * Design decisions:
 * - White background — clean contrast after the off-white stats bar
 * - Strong H2 leads with an emotionally resonant statement
 * - Supporting paragraph adds context and statistics
 * - 3 problem cards, each representing a distinct pain point from CLAUDE.md personas:
 *   1. Manual processes (spreadsheets, WhatsApp) — affects employers
 *   2. Unverified staff — affects employers (risk) and professionals (trust)
 *   3. Disconnected payroll/CPD — affects both personas
 * - Each card uses a distinctive icon for quick visual scanning
 * - Red/warning icon tones communicate "this is broken" before solution is shown
 *
 * Per CLAUDE.md Section 12: Section headings (H2) = second visual hierarchy level.
 */

/** Problem card data structure */
interface ProblemCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const problems: ProblemCard[] = [
  {
    title: "Manual & Fragmented Processes",
    description:
      "Nigerian hospitals rely on WhatsApp groups, paper rosters, and spreadsheets to manage staff schedules. One shift change means 10 messages, 3 phone calls, and still a chance of a gap. There's no single source of truth.",
    icon: (
      // Document/warning icon — represents messy paperwork and fragmented data
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path d="M12 8v4l2 2" />
      </svg>
    ),
  },
  {
    title: "Unverified Locum Staff",
    description:
      "Hospitals hire locum doctors and nurses without reliable credential verification. Expired licences, fake certificates, and untracked continuing education put patients and facilities at serious risk.",
    icon: (
      // Shield with X icon — represents the security/verification gap
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
    ),
  },
  {
    title: "Disconnected Payroll & CPD",
    description:
      "Timesheets don't talk to payroll. CPD completions aren't tracked against licence renewals. HR, finance, and training operate in silos — leading to errors, missed renewals, and compliance failures.",
    icon: (
      // Broken link/chain icon — represents disconnected systems
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
      </svg>
    ),
  },
];

const ProblemSection = () => {
  return (
    <section
      className="bg-white py-12"
      aria-label="The problem with healthcare staffing in Nigeria"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto mt-8">
          {/* Section label — small, uppercase, brand green */}
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-3">
            The Problem
          </p>

          {/*
           * H2 — emotionally loaded headline that names the pain directly.
           * "Understaffed and Overworked" resonates with both employer and professional personas.
           */}
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-4">
            Nigerian Healthcare is{" "}
            <span className="text-brand-green">Understaffed</span> and{" "}
            <span className="text-brand-green">Overworked.</span>
          </h2>

          <p className="text-brand-dark/65 text-base leading-relaxed mb-8">
            Nigeria&apos;s healthcare sector faces a workforce crisis — and it&apos;s
            being managed with tools that weren&apos;t built for it. WhatsApp
            groups, Excel sheets, and manual rosters can&apos;t keep up with the
            demands of a modern healthcare facility.
          </p>
        </div>

        {/* ── Problem Cards ──────────────────────────────────────────────── */}
        {/* 1-column mobile → 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="
                group
                bg-brand-light rounded-2xl p-5
                border border-brand-dark/5
                hover:border-brand-green/30 hover:shadow-lg
                transition-all duration-300
              "
            >
              {/* Icon container — warm amber tint signals "problem" */}
              <div className="
                inline-flex items-center justify-center
                w-10 h-10 rounded-xl mb-4
                bg-amber-50 text-amber-600
                border border-amber-100
                group-hover:bg-brand-dark group-hover:text-brand-gold
                transition-all duration-300
              ">
                {problem.icon}
              </div>

              {/* Problem title — H3 level in visual hierarchy */}
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                {problem.title}
              </h3>

              {/* Problem description — adds context and specificity */}
              <p className="text-brand-dark/65 leading-relaxed text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Transition teaser ──────────────────────────────────────────── */}
        {/* Sets up the solution reveal in FeaturesSection below */}
        <p className="text-center mt-4 text-brand-dark/50 text-sm italic">
          ProNurtureSphere was built specifically to solve every one of these problems.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
