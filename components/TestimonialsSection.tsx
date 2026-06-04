/**
 * TestimonialsSection.tsx — Social proof testimonials
 *
 * Position: After AudienceSection.
 * Purpose: Social proof from real users is one of the most powerful trust signals
 *          on a marketing site. Per CLAUDE.md Section 12: "People buy from businesses
 *          that other people trust."
 *
 * Design decisions:
 * - White background — clean, premium feel for quotes
 * - 3 cards representing different user types:
 *   1. Hospital Administrator (Employer persona — Dr. Adaeze type)
 *   2. Doctor (Professional persona — Dr. Amarachi type)
 *   3. Nurse (broadens professional audience)
 * - Large quotation mark SVG decoration adds visual interest
 * - Star ratings increase perceived quality
 * - Role + organisation adds credibility/specificity
 * - Cards use subtle shadow on hover for interactive feel
 *
 * Note: These are placeholder testimonials — replace with real quotes
 * once the beta launch is complete and verified testimonials are collected.
 */

/** Testimonial data structure */
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organisation: string;
  initials: string;       // Used in avatar placeholder
  avatarBg: string;       // Tailwind class for avatar background color
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Before ProNurtureSphere, filling an emergency locum shift meant 2 hours of WhatsApp messages and phone calls. Now it takes 15 minutes. The credential verification feature alone has removed so much risk from our hiring process.",
    name: "Dr. Chidinma Eze",
    role: "Medical Director",
    organisation: "Sterling Health Hospital, Lagos",
    initials: "CE",
    avatarBg: "bg-brand-dark",
  },
  {
    quote:
      "I've worked locum shifts through three different platforms and ProNurtureSphere is the first one that actually paid on time, every time. The CPD modules are also the most relevant I've found for the Nigerian clinical context.",
    name: "Dr. Emeka Okonkwo",
    role: "General Practitioner",
    organisation: "Locum Professional, Abuja",
    initials: "EO",
    avatarBg: "bg-brand-green",
  },
  {
    quote:
      "The payroll integration saves my HR team an entire day of reconciliation every month. Timesheets feed directly into payroll — no more manual data entry, no more disputes. This is exactly what Nigerian hospitals needed.",
    name: "Nurse Funmilayo Adeyemi",
    role: "Head of Nursing Services",
    organisation: "Meridian Maternity Centre, Port Harcourt",
    initials: "FA",
    avatarBg: "bg-brand-gold",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="Customer testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonials
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-4">
            Trusted by Healthcare Teams{" "}
            <span className="text-brand-green">Across Nigeria.</span>
          </h2>

          <p className="text-brand-dark/60 text-lg">
            From Lagos to Port Harcourt — here&apos;s what healthcare professionals
            and administrators say about ProNurtureSphere.
          </p>
        </div>

        {/* ── Testimonial Cards ───────────────────────────────────────────── */}
        {/* 1-column mobile → 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="
                group
                bg-brand-light rounded-2xl p-8
                border border-brand-dark/5
                hover:shadow-lg hover:border-brand-green/20
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Star rating — visual quality signal */}
              <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-brand-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Large quotation mark decoration */}
              <svg
                className="w-8 h-8 text-brand-green/20 mb-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote text — the actual testimonial content */}
              <blockquote className="text-brand-dark/75 leading-relaxed text-base flex-1 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution — name, role, organisation */}
              <div className="flex items-center gap-4 pt-4 border-t border-brand-dark/10">
                {/* Avatar placeholder — initials-based until profile photos are available */}
                <div
                  className={`
                    ${testimonial.avatarBg} text-white
                    w-12 h-12 rounded-full
                    flex items-center justify-center
                    text-sm font-bold flex-shrink-0
                  `}
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>

                <div>
                  <p className="font-bold text-brand-dark text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-brand-dark/55 text-xs">
                    {testimonial.role}
                  </p>
                  <p className="text-brand-green text-xs font-medium">
                    {testimonial.organisation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
