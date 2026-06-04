/**
 * AboutTeam.tsx — Leadership section
 *
 * Position: After AboutWhoWeServe.
 * Purpose: Establishes human credibility. The founder card is the centrepiece —
 *          visitors to an About page want to know who is behind the organisation.
 *          The 6 director role cards show institutional depth and org structure
 *          without naming placeholders (names will be added when team is confirmed).
 *
 * Design: White background. Founder card is large and prominent — full bio,
 *         placeholder avatar image, founder tag. Director cards are smaller,
 *         role-only cards that signal organisational maturity without needing names.
 *
 * TODO: Replace placeholder avatar with real founder photograph before launch.
 *       Add director names when the leadership team is confirmed.
 */

import Image from "next/image";

interface DirectorRole {
  title: string;
  department: string;
  icon: React.ReactNode;
}

const directorRoles: DirectorRole[] = [
  {
    title: "Director of Clinical Services",
    department: "Clinical",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Director of Education & Training",
    department: "Education",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: "Director of Workforce & Staffing Solutions",
    department: "Workforce",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Director of Operations & Compliance",
    department: "Operations",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Director of Partnerships & Global Development",
    department: "Partnerships",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Director of Homecare & Wellness Services",
    department: "Homecare",
    icon: (
      <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

const AboutTeam = () => {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="ProNurtureSphere leadership team"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Our Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
            The People Behind ProNurtureSphere.
          </h2>
        </div>

        {/* ── Founder Card ────────────────────────────────────────────────── */}
        {/*
         * Full-width on mobile, two-column on desktop.
         * Left: deep green panel with avatar placeholder and founding tag.
         * Right: name, title, and full bio paragraph.
         * The founder card is intentionally larger than director cards — founders
         * carry the most institutional trust weight on an About page.
         */}
        <div
          className="
            rounded-3xl overflow-hidden
            border border-brand-dark/10 shadow-xl
            grid grid-cols-1 lg:grid-cols-5
            mb-16
          "
        >
          {/* Left: Avatar panel — deep green, 2 columns on desktop */}
          <div className="
            lg:col-span-2
            bg-brand-dark
            p-8 lg:p-12
            flex flex-col items-center justify-center
            relative overflow-hidden
          ">

            {/* Dot grid decoration */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
              aria-hidden="true"
            />

            {/* Avatar placeholder */}
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-brand-gold/40 shadow-lg mb-5">
              <Image
                src="https://placehold.co/160x160/103613/c09e5a?text=IA"
                alt="Iziegbe Asemota, Founder and CEO of ProNurtureSphere"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Founder badge */}
            <span className="relative inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full px-4 py-1.5 text-brand-gold text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
              Founder & CEO
            </span>
          </div>

          {/* Right: Bio content — 3 columns on desktop */}
          <div
            className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center"
            style={{ backgroundColor: "#f5f5f0" }}
          >

            {/* Name */}
            <h3 className="text-brand-dark font-bold text-2xl lg:text-3xl mb-1">
              Iziegbe Asemota
            </h3>

            {/* Title */}
            <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-6">
              Founder & CEO, ProNurtureSphere by Sphere Limited
            </p>

            {/* Bio */}
            <p className="text-brand-dark/70 text-base leading-relaxed">
              Iziegbe Asemota founded ProNurtureSphere with a clear conviction —
              that Nigeria&apos;s healthcare workforce crisis cannot be solved by training alone.
              It requires a complete ecosystem: structured education, ethical deployment,
              continuous mentorship, and technology that connects it all.
              ProNurtureSphere is that ecosystem.
            </p>

            {/* Gold divider */}
            <div className="mt-6 w-12 h-1 rounded-full bg-brand-gold" aria-hidden="true" />
          </div>
        </div>

        {/* ── Director Role Cards ──────────────────────────────────────────── */}
        {/*
         * 6 leadership roles shown without names — names will be added post-launch.
         * Cards signal organisational depth and breadth across all 6 PSL arms.
         * 2 columns on mobile → 3 on desktop.
         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {directorRoles.map((role) => (
            <div
              key={role.title}
              className="
                bg-white rounded-2xl p-6
                border border-brand-dark/5
                hover:border-brand-dark/15 hover:shadow-md
                transition-all duration-300
                flex items-start gap-4
              "
            >
              {/* Icon container */}
              <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center flex-shrink-0">
                {role.icon}
              </div>

              {/* Role info */}
              <div className="flex-1 min-w-0">
                {/* Department eyebrow */}
                <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-1">
                  {role.department}
                </p>
                {/* Title */}
                <h4 className="text-brand-dark font-semibold text-sm leading-snug">
                  {role.title}
                </h4>
                {/* Coming soon tag */}
                <p className="text-brand-dark/40 text-xs mt-1.5">
                  Announcement coming soon
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutTeam;
