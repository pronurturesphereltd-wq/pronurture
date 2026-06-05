/**
 * BlogFeaturedPost.tsx — Full-width featured article card
 *
 * The editorial centrepiece of the blog listing page. One high-priority article
 * gets premium horizontal real estate before the 3-column grid — this tells
 * visitors "this piece is important" and drives click-through on the most
 * strategically valuable content.
 *
 * Layout: Two-column on desktop (image left, text right), stacked on mobile.
 * Background: White card on bg-brand-light section — creates a layered depth effect.
 *
 * The featured article is about Nigeria's doctor shortage because:
 * - It's the highest-stakes "Industry Insights" framing
 * - Appeals to both personas (employers: hiring urgency; professionals: context)
 * - Demonstrates PSL's thought leadership credibility from the first scroll
 */

import Link from "next/link";

/** Slug for the featured article — update when the Sanity blog post is published */
const FEATURED_SLUG = "nigeria-doctor-shortage-numbers";

const BlogFeaturedPost = () => {
  return (
    <section
      className="py-10 lg:py-14"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Featured article"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-5">
          Featured Article
        </p>

        {/* Featured card — white background to pop against off-white section */}
        <article className="
          bg-white rounded-3xl overflow-hidden
          border border-brand-dark/5
          shadow-sm hover:shadow-xl
          transition-all duration-300
          group
        ">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── Left: Image ──────────────────────────────────────────────── */}
            <div className="relative overflow-hidden h-64 lg:h-auto lg:min-h-[380px]">
              <img
                src="https://placehold.co/600x400/103613/ffffff?text=Featured"
                alt="Illustration representing Nigeria's healthcare workforce data"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gold overlay badge — marks this as a featured pick */}
              <div className="absolute top-5 left-5">
                <span className="
                  inline-flex items-center gap-1.5
                  bg-brand-gold text-brand-dark
                  text-xs font-bold uppercase tracking-wide
                  px-3 py-1.5 rounded-full shadow-md
                ">
                  {/* Star icon */}
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              </div>
            </div>

            {/* ── Right: Content ────────────────────────────────────────────── */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">

              {/* Category tag — gold/20 pill per CLAUDE.md spec */}
              <div className="mb-4">
                <span className="
                  inline-block
                  bg-brand-gold/20 text-brand-dark
                  text-xs font-semibold
                  px-3 py-1 rounded-full
                ">
                  Industry Insights
                </span>
              </div>

              {/* Article title — H2 since this is a section heading, not the page H1 */}
              <h2 className="
                text-2xl md:text-3xl font-bold
                text-brand-dark leading-snug
                mb-4
                group-hover:text-brand-green transition-colors duration-200
              ">
                Nigeria&apos;s Doctor Shortage by the Numbers — and What It Means
                for Your Facility
              </h2>

              {/* Excerpt — gives enough context to earn the click */}
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                With a doctor-to-patient ratio of roughly 1:3,500 — far below the
                WHO&apos;s recommended 1:600 — Nigerian facilities face mounting
                pressure. Here&apos;s what the data reveals and how to respond.
              </p>

              {/* Meta: date + read time */}
              <div className="flex items-center gap-3 text-brand-dark/45 text-sm mb-8">
                <time dateTime="2026-06-02">June 2, 2026</time>
                <span aria-hidden="true">·</span>
                <span>8 min read</span>
              </div>

              {/* Read Article CTA — styled as an arrow link, not a button */}
              <Link
                href={`/blog/${FEATURED_SLUG}`}
                className="
                  inline-flex items-center gap-2
                  text-brand-dark font-bold text-base
                  cursor-pointer hover:text-brand-green
                  transition-colors duration-200
                  group/link
                "
                aria-label="Read featured article: Nigeria's Doctor Shortage by the Numbers"
              >
                Read Article
                <svg
                  className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-200"
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
        </article>
      </div>
    </section>
  );
};

export default BlogFeaturedPost;
