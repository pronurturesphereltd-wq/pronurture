/**
 * BlogPreviewSection.tsx — Blog/Resources preview cards
 *
 * Position: After StatsSection.
 * Purpose: Demonstrates thought leadership and provides SEO value.
 *          Blog content builds trust with both employer and professional personas
 *          before they're ready to sign up — it's the "educate before selling" tactic.
 *
 * Design decisions:
 * - Off-white (#f5f5f0) background — soft contrast after the dark stats section
 * - 3 placeholder blog cards covering topics relevant to both personas
 * - Each card has: category tag, image, title, excerpt, date, "Read More" link
 * - Category tags help visitors self-identify (Employers vs Professionals)
 * - "Read More" uses brand-dark/green for internal link styling
 * - Cards have hover lift effect for interactive feel
 *
 * Note: These are placeholder articles — replace content with real Sanity CMS
 * data once blog posts are written. The schema is already configured in Sanity.
 */

import Link from "next/link";
import Image from "next/image";

/** Category tag styling map — keeps tag colors consistent with persona mapping */
const categoryStyles: Record<string, string> = {
  "For Employers": "bg-brand-dark text-white",
  "For Professionals": "bg-brand-green text-white",
  "Industry Insights": "bg-brand-gold text-brand-dark",
};

/** Blog post preview data structure */
interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imagePlaceholder: string;  // placehold.co URL with brand colors
  imageAlt: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "how-to-fill-locum-shifts-faster-nigeria",
    category: "For Employers",
    title: "How Nigerian Hospitals Can Fill Locum Shifts 5x Faster",
    excerpt:
      "Staff shortages don't wait for convenient times. Here's how leading Nigerian facilities are using digital rostering to eliminate staffing gaps — without WhatsApp chaos.",
    date: "May 20, 2026",
    readTime: "5 min read",
    imagePlaceholder: "https://placehold.co/400x250/103613/ffffff?text=Blog+Post",
    imageAlt: "Hospital administrator reviewing digital staffing dashboard",
  },
  {
    slug: "mdcn-cpd-requirements-nigerian-doctors-2026",
    category: "For Professionals",
    title: "MDCN CPD Requirements for 2026: What Every Nigerian Doctor Needs to Know",
    excerpt:
      "The Medical and Dental Council of Nigeria has updated its CPD requirements. Here's a plain-language breakdown of what you need to complete before your next licence renewal.",
    date: "May 15, 2026",
    readTime: "7 min read",
    imagePlaceholder: "https://placehold.co/400x250/103613/ffffff?text=Blog+Post",
    imageAlt: "Nigerian doctor reviewing CPD certificate on tablet",
  },
  {
    slug: "nigerian-healthcare-workforce-crisis-2026",
    category: "Industry Insights",
    title: "Nigeria's Healthcare Workforce Crisis: Data, Causes, and the Path Forward",
    excerpt:
      "With 1 doctor per 2,500 patients and 40% of trained nurses working abroad, Nigeria faces a workforce crisis. Here's what the data shows and what digital tools can — and can't — fix.",
    date: "May 8, 2026",
    readTime: "9 min read",
    imagePlaceholder: "https://placehold.co/400x250/103613/ffffff?text=Blog+Post",
    imageAlt: "Data visualization showing Nigerian healthcare workforce statistics",
  },
];

const BlogPreviewSection = () => {
  return (
    <section
      className="bg-brand-light py-20 lg:py-28"
      aria-label="Blog and resources"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-3">
              Resources & Insights
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
              Resources &amp; Insights
            </h2>
          </div>

          {/* "View all" link — subtle, doesn't compete with article CTAs */}
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
            View All Articles →
          </Link>
        </div>

        {/* ── Blog Cards Grid ──────────────────────────────────────────────── */}
        {/* 1-column mobile → 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="
                group
                bg-brand-white rounded-2xl overflow-hidden
                border border-brand-dark/5
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* Card image */}
              <div className="relative overflow-hidden">
                <Image
                  src={post.imagePlaceholder}
                  alt={post.imageAlt}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category tag — overlaid on the image bottom-left */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`
                      inline-block px-3 py-1 rounded-full text-xs font-bold
                      ${categoryStyles[post.category] ?? "bg-brand-dark text-white"}
                    `}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                {/* Meta: date + read time */}
                <div className="flex items-center gap-3 text-brand-dark/45 text-xs mb-3">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Article title — H3 in visual hierarchy */}
                <h3 className="text-brand-dark font-bold text-lg leading-snug mb-3 group-hover:text-brand-green transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Excerpt — truncated for card view */}
                <p className="text-brand-dark/60 text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="
                    inline-flex items-center gap-1.5
                    text-brand-dark font-semibold text-sm
                    cursor-pointer hover:text-brand-green
                    transition-all duration-200
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

export default BlogPreviewSection;
