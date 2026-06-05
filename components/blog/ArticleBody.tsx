/**
 * ArticleBody.tsx — Prose content section for individual blog post pages
 *
 * Renders the article body with full typographic hierarchy:
 *   - Intro paragraph: sets context and earns the read
 *   - H2 subheadings: divide the article into scannable sections
 *   - Body paragraphs: text-lg leading-relaxed text-gray-700 for readability
 *   - Blockquote: pull-quote treatment for key insights
 *   - Bullet list: structured, scannable takeaways
 *   - Closing paragraph: summary and forward-looking call to action
 *
 * Column width: max-w-3xl mx-auto — 60-65 characters per line, the optimal
 * reading measure for long-form prose. Narrower than most page containers
 * because line length directly impacts reading comfort.
 *
 * Background: White — clean, high-contrast for reading. Matches the visual
 * pattern used in TestimonialsSection and ProblemSection card backgrounds.
 *
 * Content theme: Nigerian healthcare workforce — specifically the doctor
 * shortage crisis and what facility managers can do about it. Real-feeling
 * placeholder content that matches the featured article title.
 *
 * TODO: Replace hardcoded JSX prose with Sanity Portable Text renderer
 *       (e.g. @portabletext/react) once blog articles are written in Sanity Studio.
 */

const ArticleBody = () => {
  return (
    <section
      className="bg-white py-14 lg:py-20"
      aria-label="Article content"
    >
      {/* Centred reading column — max-w-3xl enforces a comfortable line length */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Intro paragraph — hook; earns the rest of the read ──────────── */}
        <p className="text-lg leading-relaxed text-gray-700 mb-8 font-medium">
          Nigeria trains thousands of doctors every year. Yet for every two that
          graduate, at least one leaves within five years — for the UK, Canada,
          the United States, or the Gulf states. The result is a healthcare
          infrastructure under sustained, structural pressure. For the facility
          managers left managing the gap, understanding the numbers is the first
          step toward responding to them.
        </p>

        {/* ── Section 1 ───────────────────────────────────────────────────── */}
        <h2 className="
          text-2xl md:text-3xl font-bold
          text-brand-dark leading-snug
          mt-12 mb-5
        ">
          The Numbers Behind the Crisis
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-5">
          Nigeria&apos;s doctor-to-patient ratio currently sits at approximately
          1:3,500 — compared to the World Health Organisation&apos;s recommended
          minimum of 1:600. The Medical and Dental Council of Nigeria (MDCN)
          estimates that there are roughly 74,000 registered physicians in the
          country, but the effective clinical workforce is significantly smaller
          once you account for those working in administration, diaspora, or
          with lapsed licences.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-5">
          The nursing shortage is equally acute. The Nursing and Midwifery Council
          of Nigeria (NMCN) reports that over 72,000 registered nurses allow their
          annual practising licences to lapse each year — not because they have
          left nursing, but because CPD requirements are difficult, expensive, and
          poorly communicated. The workforce exists on paper; it is simply not
          fully activated in practice.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8">
          The economic consequence is visible in every public hospital and every
          private facility that has tried to hire a specialist in the last twelve
          months. Vacancy rates for critical roles — anaesthetists, intensivists,
          radiologists — now routinely exceed 40% in secondary care centres outside
          Lagos and Abuja.
        </p>

        {/* ── Section 2 ───────────────────────────────────────────────────── */}
        <h2 className="
          text-2xl md:text-3xl font-bold
          text-brand-dark leading-snug
          mt-12 mb-5
        ">
          What This Means for Your Facility
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-5">
          For hospital administrators and medical directors, the shortage
          manifests in three compounding problems. First, permanent recruitment
          cycles lengthen — what used to take four weeks now takes four months.
          Second, locum dependency increases, but without a reliable marketplace,
          sourcing verified locum staff means WhatsApp broadcasts and
          word-of-mouth referrals. Third, the professionals who do stay are
          overworked, burning out faster, and increasingly receptive to the
          same emigration pathway their colleagues took before them.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8">
          The facilities that navigate this environment most effectively are not
          the ones with the largest budgets. They are the ones that have shifted
          from reactive staffing — filling today&apos;s gap — to proactive workforce
          management — knowing next month&apos;s risk before it becomes a crisis.
        </p>

        {/* ── Pull quote — isolates the most shareable insight ────────────── */}
        {/*
         * blockquote is the correct semantic element for a cited insight.
         * Border-left in brand-gold + bg-brand-light creates the pull-quote
         * visual treatment without custom CSS.
         */}
        <blockquote className="
          my-10 pl-6
          border-l-4 border-brand-gold
          bg-brand-light
          rounded-r-xl
          py-5 pr-5
        ">
          <p className="text-lg md:text-xl font-semibold text-brand-dark leading-snug italic">
            &ldquo;The facilities that survive the shortage aren&apos;t the ones
            with more money — they&apos;re the ones with better data. Knowing your
            vacancy risk thirty days out changes everything about how you
            staff.&rdquo;
          </p>
          <footer className="mt-3 text-sm text-brand-dark/55 not-italic">
            — ProNurtureSphere Research Team, 2026
          </footer>
        </blockquote>

        {/* ── Section 3 ───────────────────────────────────────────────────── */}
        <h2 className="
          text-2xl md:text-3xl font-bold
          text-brand-dark leading-snug
          mt-12 mb-5
        ">
          Data-Driven Strategies for Facility Managers
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6">
          Responding to the shortage requires moving beyond ad-hoc solutions.
          Here are five evidence-backed strategies that leading Nigerian
          facilities are implementing right now:
        </p>

        {/* ── Bullet list — structured takeaways ──────────────────────────── */}
        <ul className="space-y-4 mb-8 ml-1" role="list">
          {[
            {
              title: "Build a verified locum pool before you need it.",
              body:
                "Pre-screen and credential-verify a cohort of locum professionals during low-demand periods. When a gap opens, you activate — you don't recruit.",
            },
            {
              title: "Track CPD expiry dates for your entire workforce.",
              body:
                "A nurse with a lapsed NMCN licence is a compliance liability, not just a staffing inconvenience. Automated credential tracking prevents a regulatory problem disguised as an HR problem.",
            },
            {
              title: "Measure your vacancy-fill rate, not just headcount.",
              body:
                "Headcount tells you how many staff you have. Fill rate tells you how many of your open shifts are actually covered. The gap between them is your real workforce risk.",
            },
            {
              title: "Invest in retention before you need to recruit.",
              body:
                "Research consistently shows that CPD access and scheduling flexibility are the top two retention factors for Nigerian clinical staff — both addressable with the right platform.",
            },
            {
              title: "Digitalise your rostering to reduce dependency on individuals.",
              body:
                "When scheduling lives on one person&apos;s WhatsApp, that person&apos;s absence is a crisis. When it lives in a shared system, it is just a handover.",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              {/* Gold bullet dot — brand accent, not a generic grey disc */}
              <span
                className="mt-2 w-2 h-2 rounded-full bg-brand-gold flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <span className="font-semibold text-brand-dark">
                  {item.title}
                </span>{" "}
                <span className="text-base leading-relaxed text-gray-600">
                  {item.body}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* ── Section 4 ───────────────────────────────────────────────────── */}
        <h2 className="
          text-2xl md:text-3xl font-bold
          text-brand-dark leading-snug
          mt-12 mb-5
        ">
          The Role of Technology
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-5">
          None of these strategies require technology — but technology makes all
          of them significantly faster and more reliable. A spreadsheet can track
          CPD expiry dates; a digital platform can alert you automatically 90 days
          before expiry. A WhatsApp group can broadcast a shift vacancy; a verified
          marketplace can connect you to a credentialed locum in under an hour.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-5">
          The distinction matters because Nigerian healthcare has historically
          been underserved by technology designed for its specific context:
          ₦-denominated payroll, MDCN/NMCN verification workflows, PAYE and
          pension deductions, low-bandwidth mobile access. Generic HR software
          built for Western markets does not solve these problems cleanly.
          Nigeria-specific solutions do.
        </p>

        {/* ── Closing paragraph ────────────────────────────────────────────── */}
        <p className="text-base md:text-lg leading-relaxed text-gray-700 mt-8 mb-2 border-t border-brand-dark/10 pt-8">
          The doctor shortage is a structural problem. It will not be resolved
          in a single policy cycle or a single hiring season. But the facilities
          that build data-driven, digitally supported workforce management
          practices today will be better insulated from its worst effects —
          and better positioned to attract and retain the professionals who
          do choose to stay. That&apos;s not optimism. That&apos;s operations.
        </p>

        {/* ── Article tags ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-brand-dark/10">
          <span className="text-xs text-brand-dark/50 font-medium mr-1">Tags:</span>
          {["Workforce Data", "Facility Management", "Nigeria Healthcare", "Staffing"].map((tag) => (
            <span
              key={tag}
              className="
                inline-block text-xs
                bg-brand-light text-brand-dark/70
                px-3 py-1 rounded-full
                border border-brand-dark/10
              "
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArticleBody;
