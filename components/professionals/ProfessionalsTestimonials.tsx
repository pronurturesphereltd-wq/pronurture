/**
 * ProfessionalsTestimonials.tsx — Social proof from Nigerian healthcare professionals
 *
 * Position: After ProfessionalsHowItWorks.
 * Purpose: Per CLAUDE.md Section 12: "People buy from businesses that other people trust."
 *          Dr. Amarachi's primary barrier is TRUST — peer testimonials from fellow
 *          clinicians are the highest-leverage trust signal on the entire page.
 *          Unlike the homepage (mixed audiences), these are exclusively from professionals.
 *
 * Design: White background. Two placeholder testimonials — one doctor, one nurse.
 *         Initials avatars are intentional design until real headshots are sourced.
 *         Two-column layout gives longer professional testimonials the space they need.
 *
 * IMPORTANT: Replace placeholder quotes with verified quotes from real beta users
 *            before public launch. The Sanity testimonial schema is ready for real content.
 */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
  avatarBg: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I was sceptical at first — I had been burned by platforms that promised locum shifts and delivered nothing. But within two weeks of joining ProNurtureSphere, I completed three verified shifts in Lagos and received payment exactly when they said I would. This is what we have always needed.",
    name: "Dr. Emeka Okonkwo",
    role: "General Practitioner",
    location: "Lagos",
    initials: "EO",
    avatarBg: "bg-brand-dark",
    rating: 5,
  },
  {
    quote:
      "The CPD courses are genuinely relevant — not generic content repurposed from abroad. I completed my annual credit requirement in two weeks, downloaded my certificate, and it was accepted by the Nursing Council without any issues. I also found two locum shifts through the platform. Highly recommend.",
    name: "Nurse Amaka Chukwu",
    role: "Registered Nurse",
    location: "Abuja",
    initials: "AC",
    avatarBg: "bg-brand-green",
    rating: 5,
  },
];

const ProfessionalsTestimonials = () => {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="Testimonials from Nigerian healthcare professionals using ProNurtureSphere"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Success Stories
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            What Nigerian Healthcare Professionals Are Saying.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            Real stories from clinicians who joined ProNurtureSphere early.
          </p>
        </div>

        {/* ── Testimonial Cards ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="
                flex flex-col
                bg-brand-light rounded-2xl p-8
                border border-brand-dark/5
                hover:border-brand-green/20 hover:shadow-lg
                transition-all duration-300
              "
            >
              {/* Star rating — visual trust signal before the user reads a word */}
              <div className="flex gap-1 mb-5" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-brand-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Large decorative quotation mark — not truncated, testimonials persuade by being read in full */}
              <div className="mb-4 opacity-20" aria-hidden="true">
                <svg className="w-10 h-10 text-brand-dark" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote — full text displayed, not truncated; truncating weakens the persuasive impact */}
              <blockquote className="flex-1 text-brand-dark/75 text-base leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Separator */}
              <div className="border-t border-brand-dark/10 pt-5 flex items-center gap-4">
                {/* Initials avatar — professional and intentional until real headshots are sourced */}
                <div
                  className={`w-12 h-12 rounded-full ${testimonial.avatarBg} flex items-center justify-center flex-shrink-0`}
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-sm">{testimonial.initials}</span>
                </div>

                {/* Attribution */}
                <div>
                  <p className="text-brand-dark font-bold text-sm">{testimonial.name}</p>
                  <p className="text-brand-dark/60 text-xs mt-0.5">
                    {testimonial.role} &middot; {testimonial.location}
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

export default ProfessionalsTestimonials;
