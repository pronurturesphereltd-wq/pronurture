/**
 * ArticleHero.tsx — Hero section for individual blog post pages (/blog/[slug])
 *
 * Sits above the fold and establishes the article's identity in 3 seconds:
 *   1. What is this?   → Category tag identifies the content type
 *   2. Who is it for?  → The H1 title signals the audience segment
 *   3. Why should I care? → Date, read time, and author set expectations
 *
 * Layout: Centred text column (max-w-4xl) + full-width featured image below.
 * Background: bg-brand-light (#f5f5f0) — consistent with all other page heroes.
 * No CTA buttons in the hero — the article body IS the CTA on a content page.
 *
 * TODO: Accept article props (title, category, date, readTime, imageUrl, imageAlt)
 *       from the Sanity GROQ query once real content is published.
 *       Current content is hardcoded placeholder matching the featured article.
 */

import Link from "next/link";

const ArticleHero = () => {
  return (
    <section
      className="pt-28 pb-0"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Article header"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Breadcrumb nav — gives context and a back-path ──────────────── */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-brand-dark/50">
            <li>
              <Link
                href="/"
                className="hover:text-brand-dark transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-brand-dark transition-colors duration-200"
              >
                Resources &amp; Insights
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-brand-dark font-medium truncate max-w-[200px] sm:max-w-xs">
              Nigeria&apos;s Doctor Shortage
            </li>
          </ol>
        </nav>

        {/* ── Category tag ─────────────────────────────────────────────────── */}
        <div className="mb-5">
          <span className="
            inline-block
            bg-brand-gold/20 text-brand-dark
            text-xs font-semibold
            px-3 py-1 rounded-full
          ">
            Industry Insights
          </span>
        </div>

        {/* ── H1 — most dominant element; one per page ─────────────────────── */}
        <h1 className="
          text-3xl md:text-4xl lg:text-5xl
          font-bold text-brand-dark
          leading-tight tracking-tight
          mb-6
        ">
          Nigeria&apos;s Doctor Shortage by the Numbers — and What It Means
          for Your Facility
        </h1>

        {/* ── Article meta row: author · date · read time ──────────────────── */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-brand-dark/55 mb-10">

          {/* Author avatar + name */}
          <div className="flex items-center gap-2">
            {/* Initials avatar — placeholder until real author photo is available */}
            <div className="
              w-8 h-8 rounded-full
              bg-brand-dark
              flex items-center justify-center
              flex-shrink-0
            ">
              <span className="text-brand-gold text-xs font-bold">PT</span>
            </div>
            <span className="font-medium text-brand-dark">ProNurtureSphere Team</span>
          </div>

          <span aria-hidden="true" className="hidden sm:inline">·</span>

          {/* Publication date */}
          <time dateTime="2026-06-02">June 2, 2026</time>

          <span aria-hidden="true">·</span>

          {/* Estimated read time */}
          <span>8 min read</span>

          <span aria-hidden="true">·</span>

          {/* Share cue — visual only for now */}
          <span className="flex items-center gap-1 text-brand-green font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </span>
        </div>

      </div>

      {/* ── Full-width Featured Image ─────────────────────────────────────── */}
      {/*
       * Image sits outside the max-w-4xl column so it bleeds edge-to-edge
       * on the page. This is an intentional editorial layout pattern for
       * articles — the headline is narrow and focused; the image is expansive.
       * The max-w-6xl container prevents extreme stretching on ultra-wide screens.
       */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://placehold.co/1200x500/103613/ffffff?text=Article"
            alt="Representation of Nigeria's healthcare workforce data and statistics"
            className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
          />
        </div>
      </div>

    </section>
  );
};

export default ArticleHero;
