/**
 * ProblemSection.tsx — "The Problem" section
 *
 * Dual-audience problem statement: speaks directly to clinical professionals
 * and facility managers in separate cards, naming the system failure each
 * experiences — not a personal failing.
 *
 * Design: two full-width cards side by side — brand-dark (left) and brand-green (right),
 * both with white text. No icons — the copy does the work.
 */

const ProblemSection = () => {
  return (
    <section
      className="bg-white py-16 lg:py-24"
      aria-label="The system problem PSL solves"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-3">
            The Problem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
            The system wasn&apos;t built for either of you.
          </h2>
        </div>

        {/* ── Two-card grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT — Clinical professional */}
          <div className="bg-brand-dark rounded-2xl p-8 lg:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">
              If you&apos;re a clinical professional
            </h3>
            <p className="text-white/80 leading-relaxed">
              You&apos;ve applied through WhatsApp groups and heard nothing back.
              You&apos;ve turned up to an interview and found the salary is half
              what was implied. You know your NMCN renewal is coming but you&apos;re
              not sure what CPD you&apos;ve done or what counts. That&apos;s not a
              you problem. That&apos;s a system problem.
            </p>
          </div>

          {/* RIGHT — Facility manager */}
          <div className="bg-brand-green rounded-2xl p-8 lg:p-10 text-white">
            <h3 className="text-xl font-bold mb-4">
              If you manage a clinical team
            </h3>
            <p className="text-white/80 leading-relaxed">
              You&apos;re filling vacancies through walk-ins and WhatsApp. It takes
              months. Your staff manage their own CPD with no facility-level tracking.
              If a regulator arrived tomorrow, finding every credential would take a
              day — or more. That&apos;s not a staffing problem. That&apos;s a tools
              problem.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProblemSection
