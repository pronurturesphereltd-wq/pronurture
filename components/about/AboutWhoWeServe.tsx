/**
 * AboutWhoWeServe.tsx — Who ProNurtureSphere serves section
 *
 * Position: After AboutLifecycle.
 * Purpose: Makes the audience of the platform explicit so each visitor can
 *          quickly identify themselves. Three distinct audiences are served
 *          by the PSL ecosystem — professionals, institutions, and communities.
 *
 * Design: Off-white (#f5f5f0) background. Three equal columns on desktop,
 *         stacked on mobile. Each column has:
 *           - An icon container (brand-dark bg, gold icon)
 *           - Column title (bold, brand-dark)
 *           - Audience list (bullet-style, clean typography)
 *
 * The three-column split mirrors the AudienceSection pattern on the homepage
 * but is more narrative and descriptive — this is an About page, not a conversion page.
 */

interface AudienceGroup {
  title: string;
  audiences: string[];
  icon: React.ReactNode;
}

const groups: AudienceGroup[] = [
  {
    title: "Healthcare Professionals",
    audiences: [
      "Medical doctors",
      "Nurses and midwives",
      "Pharmacists",
      "Physiotherapists",
      "Medical laboratory scientists",
      "Radiographers",
      "Dentists",
      "Allied health workers",
      "Caregivers",
      "Healthcare students",
    ],
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Healthcare Institutions",
    audiences: [
      "Private and public hospitals",
      "Maternity and specialist clinics",
      "Diagnostics and imaging centres",
      "Staffing and nursing agencies",
      "NGOs and global health organisations",
      "Universities and nursing schools",
      "Medical training institutes",
    ],
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Communities",
    audiences: [
      "Elderly and aged care recipients",
      "Patients with chronic conditions",
      "Underserved and rural communities",
      "Post-surgical recovery patients",
      "Mental health support communities",
      "Health literacy programme participants",
    ],
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const AboutWhoWeServe = () => {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Who ProNurtureSphere serves"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Our Audience
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-5">
            Who We Serve.
          </h2>
          <p className="text-brand-dark/60 text-lg max-w-2xl mx-auto">
            Three interconnected groups — each one essential to a stronger, more
            resilient Nigerian healthcare system.
          </p>
        </div>

        {/* ── Three-Column Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div
              key={group.title}
              className="
                bg-white rounded-2xl p-8
                border border-brand-dark/5
                hover:border-brand-dark/15 hover:shadow-md
                transition-all duration-300
              "
            >
              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-brand-dark flex items-center justify-center mb-5">
                {group.icon}
              </div>

              {/* Column title */}
              <h3 className="text-brand-dark font-bold text-lg mb-5">
                {group.title}
              </h3>

              {/* Audience list */}
              <ul className="space-y-2.5" role="list">
                {group.audiences.map((audience) => (
                  <li
                    key={audience}
                    className="flex items-start gap-2.5 text-brand-dark/65 text-sm leading-snug"
                  >
                    {/* Green checkmark bullet */}
                    <svg
                      className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhoWeServe;
