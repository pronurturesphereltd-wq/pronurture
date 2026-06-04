/**
 * AboutStory.tsx — The origin story of ProNurtureSphere
 *
 * Position: After AboutMission.
 * Purpose: Answers the fundamental question every visitor to an About page asks:
 *          "Why does this organisation exist?" Narrative text earns trust in a way
 *          that feature bullets cannot. Story = credibility.
 *
 * Design: White background for maximum readability. Pull quote breaks the prose
 *         rhythm and anchors the central insight of the story visually.
 *         Two-column layout on desktop (text + pull quote block) for visual density.
 *
 * The story is written for a dual audience — both employers who need assurance
 * of institutional credibility, and professionals who need to feel understood.
 */

const AboutStory = () => {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="The story behind ProNurtureSphere"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
            Why We Built ProNurtureSphere.
          </h2>
        </div>

        {/* ── Story Content — two-column on desktop ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left: narrative prose — 3 columns on desktop */}
          <div className="lg:col-span-3 space-y-6 text-brand-dark/70 text-base md:text-lg leading-relaxed">

            <p>
              Nigeria&apos;s healthcare system faces a persistent challenge — a growing gap between
              the demand for skilled, practice-ready professionals and the supply of continuously
              upskilled, certified, career-ready practitioners who can meet it.
            </p>

            <p>
              Healthcare employers — hospitals, clinics, maternity homes, diagnostics centres —
              struggle daily to find staff with up-to-date competencies. They rely on WhatsApp
              groups, paper rosters, and word-of-mouth to fill critical roles. Compliance is
              reactive. Quality assurance is inconsistent.
            </p>

            <p>
              At the same time, healthcare workers — doctors, nurses, pharmacists, allied health
              professionals — lack accessible, structured, affordable pathways for professional
              growth. The CPD system is fragmented. Licences lapse. Career progression is opaque.
              Exploitation by unverified employers is common.
            </p>

            <p>
              ProNurtureSphere by Sphere Limited was founded to close that gap — not with
              a single tool, but with a complete ecosystem. We believe the workforce crisis
              is not a staffing problem. It is a systems problem. And systems problems require
              systems solutions.
            </p>

            <p>
              The ProNurtureSphere Platform is how we deliver that solution at scale —
              connecting training, verification, deployment, mentorship, and continuous
              education into one integrated digital infrastructure for Nigeria&apos;s
              healthcare workforce.
            </p>
          </div>

          {/* Right: pull quote + insight block — 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-8">

            {/* Pull quote — the single most important insight on the page */}
            <blockquote
              className="
                relative bg-brand-dark rounded-3xl p-8
                border-l-4 border-brand-gold
                overflow-hidden
              "
              aria-label="Key insight from the founding team"
            >
              {/* Decorative large quotation mark */}
              <div
                className="absolute top-4 right-6 text-white/5 font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: "8rem" }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <p className="relative text-white text-xl md:text-2xl font-semibold leading-snug italic">
                &ldquo;Healthcare professionals are trained but not nurtured into sustainable excellence.&rdquo;
              </p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-brand-gold text-sm font-semibold">The founding insight</p>
                <p className="text-white/50 text-xs mt-1">ProNurtureSphere by Sphere Limited</p>
              </div>
            </blockquote>

            {/* Supporting stat cards — give the story institutional weight */}
            <div className="grid grid-cols-2 gap-4">

              <div
                className="rounded-2xl p-5 border border-brand-dark/10"
                style={{ backgroundColor: "#f5f5f0" }}
              >
                <p className="text-3xl font-bold text-brand-dark mb-1">72k+</p>
                <p className="text-brand-dark/60 text-xs leading-snug">
                  Registered nurses in Nigeria with lapsed licences annually
                </p>
              </div>

              <div
                className="rounded-2xl p-5 border border-brand-dark/10"
                style={{ backgroundColor: "#f5f5f0" }}
              >
                <p className="text-3xl font-bold text-brand-dark mb-1">1:8k</p>
                <p className="text-brand-dark/60 text-xs leading-snug">
                  Doctor-to-patient ratio in Nigeria vs 1:600 WHO recommendation
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
