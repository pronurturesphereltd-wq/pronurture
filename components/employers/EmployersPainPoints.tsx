/**
 * EmployersPainPoints.tsx — Empathy section for healthcare employer pain points
 *
 * Position: Immediately after the hero — the empathy hook.
 * Purpose: Resonate with Dr. Adaeze's real daily frustrations (CLAUDE.md Section 3).
 *          Empathy precedes solution; this earns the right to present the platform.
 *          Copy is transformation-focused, NOT feature-focused.
 *
 * Design: Off-white (brand-light) background alternates with the white hero.
 * Red-tinted icon backgrounds signal "this is a pain" — distinct from the
 * green/gold used in solution sections.
 */

interface PainPoint {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const painPoints: PainPoint[] = [
  {
    title: "You're managing shifts on WhatsApp and still getting gaps",
    description:
      "Every Friday your roster is a maze of group chats, missed calls, and last-minute cancellations. You've tried everything — and you're still scrambling to cover shifts the night before.",
    icon: (
      // Chat bubble icon — represents WhatsApp/messaging chaos
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    ),
  },
  {
    title: "You can't verify if your locum staff are actually qualified",
    description:
      "You've hired someone who looked credible on paper — then discovered their licence had lapsed six months ago. One bad hire can expose your facility to serious regulatory and patient-safety risk.",
    icon: (
      // Warning triangle icon — represents the risk of unverified hires
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Payroll, compliance, and training live in three different places",
    description:
      "Your HR team juggles Excel sheets, a payroll vendor, a manual CPD register, and a filing cabinet. Every month-end is a week of data reconciliation — and errors still slip through.",
    icon: (
      // Stacked layers icon — represents fragmented, disconnected tools
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const EmployersPainPoints = () => {
  return (
    <section
      className="bg-brand-light py-20 lg:py-28"
      aria-label="Common staffing challenges for healthcare facilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            Sound Familiar?
          </h2>
          <p className="text-brand-dark/60 text-lg leading-relaxed">
            These aren&apos;t just frustrations — they&apos;re costly inefficiencies
            that affect patient care, staff morale, and your facility&apos;s bottom line.
          </p>
        </div>

        {/* ── Pain Point Cards ────────────────────────────────────────────── */}
        {/* 1-column mobile → 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="
                bg-white rounded-2xl p-8
                border border-brand-dark/5
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* Red-tinted icon — signals pain (not solution) to the reader */}
              <div className="
                inline-flex items-center justify-center
                w-12 h-12 rounded-xl mb-6
                bg-red-50 text-red-500
              ">
                {point.icon}
              </div>

              <h3 className="text-base font-bold text-brand-dark mb-3 leading-snug">
                {point.title}
              </h3>

              <p className="text-brand-dark/60 leading-relaxed text-sm">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition teaser — bridges empathy into the solution sections below */}
        <p className="text-center text-brand-dark/50 text-base mt-12">
          ProNurtureSphere was built specifically to solve every one of these problems.
        </p>
      </div>
    </section>
  );
};

export default EmployersPainPoints;
