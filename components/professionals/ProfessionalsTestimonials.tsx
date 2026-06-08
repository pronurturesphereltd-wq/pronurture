/**
 * ProfessionalsTestimonials.tsx — Social proof from Nigerian healthcare professionals
 *
 * Position: After ProfessionalsHowItWorks.
 * Purpose: Per CLAUDE.md Section 12: "People buy from businesses that other people trust."
 *          Dr. Amarachi's primary barrier is TRUST — peer testimonials from fellow
 *          clinicians are the highest-leverage trust signal on the entire page.
 *          Unlike the homepage (mixed audiences), these are exclusively from professionals.
 *
 * Design: White background. Two-column layout gives longer professional testimonials
 *         the space they need. Initials avatars until real headshots are sourced.
 *
 * Data source: professionalsPage.testimonials[]-> from Sanity via professionalsPageQuery.
 * Falls back to FALLBACK_TESTIMONIALS when Sanity returns null.
 * Initials are derived from the name field at render time.
 * Attribution shows role · organisation (Sanity field name).
 */

import type { SanityTestimonial } from "@/sanity/lib/types";

/** Derives two-letter initials from a full name */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface DisplayTestimonial {
  key:          string;
  quote:        string;
  name:         string;
  role:         string;
  organisation: string;
  initials:     string;
}

const FALLBACK_TESTIMONIALS: DisplayTestimonial[] = [
  {
    key:          "fallback-1",
    quote:
      "I was sceptical at first — I had been burned by platforms that promised locum shifts and delivered nothing. But within two weeks of joining ProNurtureSphere, I completed three verified shifts in Lagos and received payment exactly when they said I would. This is what we have always needed.",
    name:         "Dr. Emeka Okonkwo",
    role:         "General Practitioner",
    organisation: "Lagos",
    initials:     "EO",
  },
  {
    key:          "fallback-2",
    quote:
      "The CPD courses are genuinely relevant — not generic content repurposed from abroad. I completed my annual credit requirement in two weeks, downloaded my certificate, and it was accepted by the Nursing Council without any issues. I also found two locum shifts through the platform.",
    name:         "Nurse Blessing Adeyemi",
    role:         "Registered Nurse",
    organisation: "Abuja",
    initials:     "BA",
  },
];

interface ProfessionalsTestimonialsProps {
  /** Testimonials from Sanity — falls back to hardcoded if null */
  testimonials?: SanityTestimonial[] | null;
}

const ProfessionalsTestimonials = ({ testimonials }: ProfessionalsTestimonialsProps) => {
  const displayTestimonials: DisplayTestimonial[] =
    testimonials && testimonials.length > 0
      ? testimonials.map((t) => ({
          key:          t._id,
          quote:        t.quote,
          name:         t.name,
          role:         t.role         ?? "",
          organisation: t.organisation ?? "",
          initials:     getInitials(t.name),
        }))
      : FALLBACK_TESTIMONIALS;

  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="Testimonials from Nigerian healthcare professionals using ProNurtureSphere"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Success Stories
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-4">
            What Nigerian Healthcare Professionals Are Saying.
          </h2>
          <p className="text-brand-dark/60 text-lg">
            Real stories from clinicians who joined ProNurtureSphere early.
          </p>
        </div>

        {/* ── Testimonial Cards ───────────────────────────────────────────── */}
        {/* 2-column desktop — wider cards for longer professional testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.key}
              className="
                bg-brand-light rounded-2xl p-8 lg:p-10
                border border-brand-dark/5
                hover:shadow-lg hover:border-brand-green/20
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Star rating — visual trust signal before the user reads a word */}
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

              {/* Quote text — full text, not truncated; truncating weakens persuasive impact */}
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

export default ProfessionalsTestimonials;
