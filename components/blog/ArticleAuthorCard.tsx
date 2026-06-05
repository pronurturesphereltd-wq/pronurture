/**
 * ArticleAuthorCard.tsx — Author bio card below the article body
 *
 * Establishes the credibility of the content by putting a face and name
 * to the writing. Even a minimal bio ("ProNurtureSphere Team") with a
 * consistent avatar treatment signals that a real organisation produced
 * this content — important for building trust with first-time readers.
 *
 * Placed directly after the article body, before related posts, so the
 * reader who finished the article immediately understands who wrote it
 * and why it should be trusted.
 *
 * Design: White card inside bg-brand-light section — layered depth effect
 * consistent with FeaturesSection and BlogGrid card patterns.
 *
 * TODO: Accept author props from Sanity GROQ query.
 *       The Sanity `author` collection schema already supports name, bio,
 *       role, photo, and social links.
 */

import Link from "next/link";

const ArticleAuthorCard = () => {
  return (
    <section
      className="py-10 lg:py-12"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="About the author"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-5">
          Written By
        </p>

        {/* Author card */}
        <div className="
          bg-white rounded-2xl
          border border-brand-dark/5
          p-6 sm:p-8
          flex flex-col sm:flex-row
          items-start sm:items-center
          gap-5
        ">

          {/* ── Avatar ─────────────────────────────────────────────────────── */}
          {/*
           * Deep green circle with gold initials — matches the initials-avatar
           * pattern used in TestimonialsSection for consistency.
           * Replace with real <img> when author headshots are available.
           */}
          <div className="
            w-16 h-16 rounded-full
            bg-brand-dark
            flex items-center justify-center
            flex-shrink-0
            shadow-md
          ">
            <span className="text-brand-gold font-bold text-xl">PT</span>
          </div>

          {/* ── Author info ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-brand-dark text-lg leading-tight">
              ProNurtureSphere Team
            </p>
            <p className="text-brand-green text-sm font-medium mt-0.5 mb-2">
              Research &amp; Editorial
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              The ProNurtureSphere editorial team brings together clinicians,
              HR practitioners, and healthcare technology specialists to produce
              practical, evidence-based content for Nigeria&apos;s healthcare workforce.
            </p>
          </div>

          {/* ── View all articles link ────────────────────────────────────── */}
          <div className="sm:flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/blog"
              className="
                inline-flex items-center justify-center gap-1.5
                text-brand-dark font-semibold text-sm
                border border-brand-dark/20
                px-4 py-2 rounded-full
                hover:bg-brand-dark hover:text-white hover:border-brand-dark
                transition-all duration-200
                cursor-pointer
                whitespace-nowrap
              "
            >
              All Articles
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArticleAuthorCard;
