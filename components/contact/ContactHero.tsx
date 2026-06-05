/**
 * ContactHero.tsx — Compact hero for the /contact page
 *
 * Design intent:
 *   - Compact (~40vh) — the form and contact details directly below are the
 *     real destination. A full-screen hero here would delay the visitor.
 *   - bg-brand-light matches other light-background heroes (waitlist, about).
 *   - pt-28 clears the fixed Navbar (80px mobile / up to 112px desktop).
 *   - No CTA buttons — the whole page is a contact funnel; a separate CTA
 *     would compete with the form card just below.
 *   - Decorative brand-colour rule is the same motif used in BlogHero,
 *     WaitlistForm, and other non-hero pages — creates visual continuity.
 */

const ContactHero = () => {
  return (
    <section
      className="pt-28 pb-12"
      style={{ backgroundColor: "#f5f5f0", minHeight: "40vh" }}
      aria-label="Contact ProNurtureSphere"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">

          {/* Badge — sets the page tone before the H1 */}
          <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-gold" aria-hidden="true" />
            <span className="text-brand-dark text-sm font-semibold tracking-wide">
              Get in Touch
            </span>
          </div>

          {/* H1 — one per page per visual hierarchy rules */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight tracking-tight mb-5">
            Let&apos;s Talk About Your Healthcare Workforce.
          </h1>

          {/* Subheadline — names all three visitor types so each feels welcome */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
            Whether you&apos;re a healthcare professional, a facility, or a partner
            organisation — we&apos;d love to hear from you.
          </p>

          {/* Decorative brand-colour rule — dark + gold + green trio */}
          <div className="flex items-center gap-1.5 mt-8" aria-hidden="true">
            <span className="inline-block w-10 h-1 rounded-full bg-brand-dark" />
            <span className="inline-block w-4 h-1 rounded-full bg-brand-gold" />
            <span className="inline-block w-4 h-1 rounded-full bg-brand-green" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;
