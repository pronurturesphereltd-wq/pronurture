/**
 * BlogHero.tsx — Hero section for the Blog / Resources page
 *
 * This is a content listing page — the hero is intentionally compact (~50vh).
 * Heavy hero sections compete with the content grid below; a lean hero lets
 * visitors reach the articles faster, which is what they came for.
 *
 * Per CLAUDE.md hero rules — answers 3 questions in 3 seconds:
 *   1. What is this? → A resource hub for Nigerian healthcare workforce content
 *   2. Who is it for? → Healthcare professionals and employers in Nigeria
 *   3. Why should I care? → Practical, actionable guides and industry analysis
 *
 * Layout: Text-centred, no right-column image — article cards below are the visual.
 * Background: bg-brand-light (#f5f5f0) — consistent with other page heroes.
 * No CTA buttons — this page's CTA is reading and subscribing (handled in sections below).
 */

const BlogHero = () => {
  return (
    <section
      className="pt-28 pb-14 flex items-center"
      style={{ backgroundColor: "#f5f5f0", minHeight: "50vh" }}
      aria-label="Blog and resources hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge — names the section type for instant orientation */}
          <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-6">
            <span
              className="inline-block w-2 h-2 rounded-full bg-brand-gold"
              aria-hidden="true"
            />
            <span className="text-brand-dark text-sm font-semibold tracking-wide">
              Resources &amp; Insights
            </span>
          </div>

          {/* H1 — single most dominant element on the page */}
          <h1 className="
            text-3xl md:text-4xl lg:text-5xl
            font-bold text-brand-dark
            leading-tight tracking-tight
            mb-5
          ">
            Insights for Nigeria&apos;s Healthcare Workforce.
          </h1>

          {/* Subheadline — clarifies scope and speaks to both personas */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Practical guides, industry analysis, and career resources for
            healthcare professionals and the facilities that employ them.
          </p>

          {/* Decorative bottom rule — brand colour trio for visual punctuation */}
          <div className="flex items-center justify-center gap-1.5 mt-8" aria-hidden="true">
            <span className="inline-block w-8 h-1 rounded-full bg-brand-dark" />
            <span className="inline-block w-3 h-1 rounded-full bg-brand-gold" />
            <span className="inline-block w-3 h-1 rounded-full bg-brand-green" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogHero;
