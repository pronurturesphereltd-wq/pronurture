/**
 * FeaturesSection.tsx — Platform features grid
 *
 * Position: After ProblemSection — this is the "solution reveal."
 * Purpose: Shows the 6 core platform capabilities that solve the problems above.
 *          Each card maps to a pain point identified in CLAUDE.md Section 5.
 *
 * Design decisions:
 * - id="features" so the "See How It Works" CTA from the hero can anchor-link here
 * - Off-white (#f5f5f0) background alternates with the white problem section
 * - 6 cards in a 2-column mobile, 3-column desktop grid (2x3 on desktop)
 * - Each card has: icon (brand dark bg, gold icon), title, description
 * - Cards use brand-dark on hover to maintain brand consistency
 * - Generous padding inside cards and white card backgrounds for premium feel
 *
 * Per CLAUDE.md Section 12: Visual hierarchy — H2 for section, H3 for card titles.
 */

/** Feature card data structure */
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Shift Posting & Booking",
    description:
      "Post shifts in minutes. Verified professionals apply, accept, and confirm — no phone calls, no WhatsApp chaos. Real-time visibility of who's working, where, and when.",
    icon: (
      // Calendar icon — represents scheduling
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    title: "Credential Verification",
    description:
      "Automated tracking of professional licences, MDCN/NMCN registration, and CPD certificates — with expiry alerts. Hire with confidence, stay compliant, and protect your facility.",
    icon: (
      // Shield check icon — represents verification and trust
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Payroll Management",
    description:
      "Timesheet data flows directly into payroll calculations — with support for ₦ currency, Nigerian PAYE tax, and pension contributions. No more manual reconciliation at month-end.",
    icon: (
      // Naira/coins icon — represents payroll
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M8 9h8M10 6v12M14 6v12" />
      </svg>
    ),
  },
  {
    title: "Attendance & Timesheets",
    description:
      "Digital clock-in/out, automated timesheet generation, and supervisor approvals — all on mobile. Eliminate paper timesheets and payroll disputes instantly.",
    icon: (
      // Clock icon — represents attendance tracking
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "CPD Training",
    description:
      "Short, accredited training modules for clinical and non-clinical staff. Track CPD hours against licence renewal requirements and generate compliance certificates automatically.",
    icon: (
      // Graduation cap icon — represents education and CPD
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Workforce Analytics",
    description:
      "Real-time dashboards showing staffing gaps, shift fill rates, compliance scores, and cost-per-hire. Data-driven insights to plan ahead, reduce agency spend, and improve retention.",
    icon: (
      // Bar chart icon — represents analytics and reporting
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="features" // Anchor target for "See How It Works" CTA in HeroSection
      className="bg-brand-light py-20 lg:py-28"
      aria-label="Platform features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            The Solution
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-6">
            One Platform.{" "}
            <span className="text-brand-green">Every Workforce Need.</span>
          </h2>

          <p className="text-brand-dark/65 text-lg leading-relaxed">
            ProNurtureSphere replaces the fragmented tools with a single, connected system
            designed specifically for Nigerian healthcare operations — from first
            shift post to payslip.
          </p>
        </div>

        {/* ── Feature Cards Grid ──────────────────────────────────────────── */}
        {/* 1-column mobile → 2-column tablet → 3-column desktop (2x3 grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                group
                bg-white rounded-2xl p-8
                border border-brand-dark/5
                hover:border-brand-dark/20 hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 ease-out
              "
            >
              {/* Icon — dark green container with gold icon for brand alignment */}
              <div className="
                inline-flex items-center justify-center
                w-12 h-12 rounded-xl mb-6
                bg-brand-dark text-brand-gold
                group-hover:scale-110
                transition-transform duration-300
              ">
                {feature.icon}
              </div>

              {/* Feature title — H3 in visual hierarchy */}
              <h3 className="text-lg font-bold text-brand-dark mb-3">
                {feature.title}
              </h3>

              {/* Feature description — scannable, benefit-focused copy */}
              <p className="text-brand-dark/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA — moves interested users toward conversion ─────── */}
        <div className="text-center mt-14">
          <p className="text-brand-dark/55 text-base mb-6">
            Everything you need to run a modern healthcare facility — available from day one.
          </p>
          <a
            href="/waitlist"
            className="
              inline-flex items-center justify-center
              px-8 py-4 rounded-full
              bg-brand-dark text-white
              text-base font-bold
              cursor-pointer transition-all duration-200
              hover:bg-brand-green hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2
            "
          >
            Get Early Access →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
