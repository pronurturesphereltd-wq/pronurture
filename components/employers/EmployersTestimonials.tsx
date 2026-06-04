/**
 * EmployersTestimonials.tsx — Social proof for the healthcare employers page
 *
 * Position: After EmployersHowItWorks.
 * Purpose: Audience-specific social proof for the employer persona exclusively.
 *          Unlike the homepage testimonials (which mix both audiences),
 *          these quotes come from hospital administrators and HR directors —
 *          exactly who Dr. Adaeze (CLAUDE.md Section 3) sees as peers.
 *
 * Per CLAUDE.md Section 12: "People buy from businesses that other people trust."
 * Specificity in testimonials (role + named facility + city) increases credibility.
 *
 * Design: White background alternates with the off-white how-it-works section.
 * 2-column layout gives each testimonial more visual space than 3-column.
 *
 * Note: Placeholder testimonials — replace with verified quotes post-beta.
 */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organisation: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We went from managing locum staff through five different WhatsApp groups to one clean dashboard in under a week. The credential verification alone has saved us from two potentially serious regulatory incidents. I genuinely can't imagine going back.",
    name: "Dr. Ngozi Anyanwu",
    role: "Medical Director",
    organisation: "Bright Future Specialist Hospital, Abuja",
    initials: "NA",
  },
  {
    quote:
      "Our HR team spent the first three days of every month reconciling timesheets and chasing payroll data. Now it's done automatically. The compliance tracking has also made our inspection preparation almost effortless. This is exactly what Nigerian hospital management needed.",
    name: "Mrs. Adaeze Obiechina",
    role: "Chief HR Officer",
    organisation: "Crestview Diagnostics & Maternity, Lagos",
    initials: "AO",
  },
];

const EmployersTestimonials = () => {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="Testimonials from healthcare administrators"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-4">
            What Healthcare Administrators Are Saying.
          </h2>
          <p className="text-brand-dark/60 text-lg">
            From hospital administrators to HR directors — here&apos;s how
            ProNurtureSphere is changing daily operations across Nigeria.
          </p>
        </div>

        {/* ── Testimonial Cards ───────────────────────────────────────────── */}
        {/* 2-column desktop — wider cards for longer employer testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="
                bg-brand-light rounded-2xl p-8 lg:p-10
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

              {/* Quotation mark decoration */}
              <svg
                className="w-8 h-8 text-brand-green/20 mb-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote text */}
              <blockquote className="text-brand-dark/75 leading-relaxed text-base flex-1 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution — name, role, organisation */}
              <div className="flex items-center gap-4 pt-4 border-t border-brand-dark/10">
                {/* Avatar — initials-based until real photos are available */}
                <div
                  className="bg-brand-dark text-white w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-brand-dark text-sm">{testimonial.name}</p>
                  <p className="text-brand-dark/55 text-xs">{testimonial.role}</p>
                  <p className="text-brand-green text-xs font-medium">{testimonial.organisation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployersTestimonials;
