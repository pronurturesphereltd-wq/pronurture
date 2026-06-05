/**
 * ArticleRelatedPosts.tsx — Related articles section below the blog post
 *
 * Purpose: Reduces the "dead end" bounce that happens when a reader
 * finishes an article and has no clear next step. Related posts keep
 * engaged readers on-site and expose them to more PSL content — which
 * builds trust and warms them toward the platform signup.
 *
 * Card style: Identical to BlogGrid.tsx — same HTML structure, same
 * Tailwind classes, same hover effects — for visual consistency across
 * all blog surfaces. Described in DOCS.md as the canonical blog card pattern.
 *
 * Layout: 1-column (mobile) → 3-column (md+) — 3 cards is the right
 * number: enough variety to find relevance, few enough to not overwhelm
 * a reader who is already at the end of a long article.
 *
 * Content: 3 placeholder articles chosen to cross-promote to both
 * buyer personas. Replace with Sanity GROQ query for tag-matched articles
 * once real content is published.
 *
 * TODO: Accept relatedPosts as a prop from the parent page (populated by
 *       a Sanity GROQ query that fetches articles with overlapping tags).
 */

import Link from "next/link";

/** Related post card data — matches the BlogPost interface in BlogGrid.tsx */
interface RelatedPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  dateTime: string;
  readTime: string;
  imageAlt: string;
}

/** Three articles chosen for topical relevance to the doctor-shortage feature */
const relatedPosts: RelatedPost[] = [
  {
    slug: "retention-over-recruitment-keep-staff-japa-era",
    category: "For Employers",
    title: "Retention Over Recruitment: How to Keep Staff in a Japa Era",
    excerpt:
      "Practical strategies to reduce turnover and build a loyal clinical team in Nigeria's current healthcare environment.",
    date: "May 15, 2026",
    dateTime: "2026-05-15",
    readTime: "7 min read",
    imageAlt: "Healthcare team meeting in a Nigerian hospital",
  },
  {
    slug: "real-cost-empty-shift-manual-rostering-bleeding-budget",
    category: "For Employers",
    title: "The Real Cost of an Empty Shift: Why Manual Rostering Is Bleeding Your Budget",
    excerpt:
      "A breakdown of the hidden costs of WhatsApp and spreadsheet scheduling for Nigerian healthcare facilities.",
    date: "May 20, 2026",
    dateTime: "2026-05-20",
    readTime: "6 min read",
    imageAlt: "Hospital administrator looking at spreadsheet on laptop",
  },
  {
    slug: "nigeria-needs-healthcare-workforce-ecosystem-not-just-more-schools",
    category: "Industry Insights",
    title: "Why Nigeria Needs a Healthcare Workforce Ecosystem, Not Just More Schools",
    excerpt:
      "Training alone won't fix the crisis. Here's the case for an integrated, technology-enabled approach.",
    date: "May 5, 2026",
    dateTime: "2026-05-05",
    readTime: "10 min read",
    imageAlt: "Aerial view of a Nigerian teaching hospital campus",
  },
];

/** Gold/20 pill — matches the unified category tag style used on all blog pages */
const categoryTagClass = "bg-brand-gold/20 text-brand-dark";

const ArticleRelatedPosts = () => {
  return (
    <section
      className="py-14 lg:py-20"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Related articles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-2">
              Keep Reading
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
              Related Articles
            </h2>
          </div>

          {/* "View all" — subtle escape path for high-engagement readers */}
          <Link
            href="/blog"
            className="
              text-brand-dark font-semibold text-sm
              border-b-2 border-brand-gold pb-0.5
              hover:text-brand-green hover:border-brand-green
              transition-colors duration-200
              whitespace-nowrap flex-shrink-0
            "
          >
            View All →
          </Link>
        </div>

        {/* ── Related post cards — 1-col mobile, 3-col md+ ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {relatedPosts.map((post) => (
            <article
              key={post.slug}
              className="
                group
                bg-white rounded-2xl overflow-hidden
                border border-brand-dark/5
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
                flex flex-col
              "
            >
              {/* ── Card image + category overlay ───────────────────────── */}
              <div className="relative overflow-hidden">
                <img
                  src={`https://placehold.co/400x240/103613/ffffff?text=${encodeURIComponent(post.category)}`}
                  alt={post.imageAlt}
                  className="
                    w-full h-48 object-cover
                    group-hover:scale-105
                    transition-transform duration-500
                  "
                />
                <div className="absolute top-4 left-4">
                  <span className={`
                    inline-block text-xs font-semibold
                    px-3 py-1 rounded-full
                    ${categoryTagClass}
                  `}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* ── Card body ─────────────────────────────────────────────── */}
              <div className="p-6 flex flex-col flex-1">

                {/* Meta */}
                <div className="flex items-center gap-2 text-brand-dark/40 text-xs mb-3">
                  <time dateTime={post.dateTime}>{post.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="
                  text-brand-dark font-bold text-base leading-snug
                  mb-3
                  group-hover:text-brand-green
                  transition-colors duration-200
                ">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-brand-dark/60 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="
                    inline-flex items-center gap-1.5
                    text-brand-dark font-semibold text-sm
                    cursor-pointer hover:text-brand-green
                    transition-colors duration-200
                    group/link
                  "
                  aria-label={`Read more: ${post.title}`}
                >
                  Read More
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
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
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArticleRelatedPosts;
