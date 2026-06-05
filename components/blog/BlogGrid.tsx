/**
 * BlogGrid.tsx — Responsive 3-column grid of blog post cards
 *
 * Accepts an activeCategory prop and renders only the matching posts.
 * "All" shows every post; any other value filters by exact category match.
 *
 * Animation: The grid wrapper uses key={activeCategory} so React remounts
 * the div on every filter change, re-triggering the `animate-fade-in` CSS
 * animation defined in globals.css for a subtle fade + slide-up on swap.
 *
 * Layout: 1-column (mobile) → 2-column (md/tablet) → 3-column (lg/desktop)
 *
 * Each card anatomy (top to bottom):
 *   1. Thumbnail image with category tag overlay
 *   2. Date + read time meta
 *   3. Article title (H3)
 *   4. Excerpt (line-clamp-3 for consistent card height)
 *   5. "Read More →" link
 *
 * TODO: Replace static `blogPosts` array with a live GROQ query from Sanity CMS
 *       once articles are published in the Sanity Studio.
 */

import Link from "next/link";

/** Structured blog post data — replace with Sanity query results when available */
interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;       // Human-readable display date
  dateTime: string;   // ISO 8601 for <time> element accessibility
  readTime: string;
  imageAlt: string;
}

interface BlogGridProps {
  /** Category to filter by — "All" disables filtering and shows every post */
  activeCategory: string;
}

/** All blog post data — filtered at render time based on activeCategory prop */
const blogPosts: BlogPost[] = [
  {
    slug: "mdcn-nmcn-licence-renewal-2026-cpd-checklist",
    category: "For Professionals",
    title: "MDCN & NMCN Licence Renewal 2026: The Complete CPD Checklist",
    excerpt:
      "Everything you need to know about CPD points, deadlines, and renewal requirements for the year ahead.",
    date: "May 28, 2026",
    dateTime: "2026-05-28",
    readTime: "7 min read",
    imageAlt: "Nigerian doctor reviewing CPD checklist on tablet",
  },
  {
    slug: "japa-or-stay-locum-work-nigerian-doctor-middle-path",
    category: "For Professionals",
    title: "Japa or Stay? Locum Work as a Nigerian Doctor's Middle Path",
    excerpt:
      "Exploring how flexible locum shifts offer income and growth without leaving the country.",
    date: "May 25, 2026",
    dateTime: "2026-05-25",
    readTime: "6 min read",
    imageAlt: "Nigerian doctor considering career options",
  },
  {
    slug: "how-to-spot-fake-locum-listing-protect-your-time",
    category: "For Professionals",
    title: "How to Spot a Fake Locum Listing (and Protect Your Time)",
    excerpt:
      "Red flags every Nigerian healthcare professional should know before applying.",
    date: "May 22, 2026",
    dateTime: "2026-05-22",
    readTime: "5 min read",
    imageAlt: "Warning signs on a job board illustration",
  },
  {
    slug: "real-cost-empty-shift-manual-rostering-bleeding-budget",
    category: "For Employers",
    title: "The Real Cost of an Empty Shift: Why Manual Rostering Is Bleeding Your Budget",
    excerpt:
      "A breakdown of the hidden costs of WhatsApp and spreadsheet scheduling.",
    date: "May 20, 2026",
    dateTime: "2026-05-20",
    readTime: "6 min read",
    imageAlt: "Hospital administrator looking at spreadsheet on laptop",
  },
  {
    slug: "credential-verification-nigerian-healthcare-compliance-guide",
    category: "For Employers",
    title: "Credential Verification in Nigerian Healthcare: A Compliance Guide",
    excerpt:
      "How to verify MDCN/NMCN registration and protect your facility from risk.",
    date: "May 18, 2026",
    dateTime: "2026-05-18",
    readTime: "9 min read",
    imageAlt: "Digital credential verification interface on a computer screen",
  },
  {
    slug: "retention-over-recruitment-keep-staff-japa-era",
    category: "For Employers",
    title: "Retention Over Recruitment: How to Keep Staff in a Japa Era",
    excerpt:
      "Practical strategies to reduce turnover and build a loyal clinical team.",
    date: "May 15, 2026",
    dateTime: "2026-05-15",
    readTime: "7 min read",
    imageAlt: "Healthcare team meeting in a Nigerian hospital",
  },
  {
    slug: "affordable-ways-nigerian-nurses-meet-mcpdp-requirements",
    category: "CPD & Compliance",
    title: "5 Affordable Ways Nigerian Nurses Can Meet MCPDP Requirements",
    excerpt:
      "Budget-friendly routes to staying licensed and current in 2026.",
    date: "May 12, 2026",
    dateTime: "2026-05-12",
    readTime: "5 min read",
    imageAlt: "Nigerian nurse completing an online CPD course",
  },
  {
    slug: "building-professional-profile-gets-you-hired-faster",
    category: "For Professionals",
    title: "Building a Professional Profile That Gets You Hired Faster",
    excerpt:
      "How a verified digital profile helps you stand out to employers.",
    date: "May 9, 2026",
    dateTime: "2026-05-09",
    readTime: "6 min read",
    imageAlt: "Healthcare professional setting up a digital profile on a phone",
  },
  {
    slug: "nigeria-needs-healthcare-workforce-ecosystem-not-just-more-schools",
    category: "Industry Insights",
    title: "Why Nigeria Needs a Healthcare Workforce Ecosystem, Not Just More Schools",
    excerpt:
      "Training alone won't fix the crisis. Here's the case for an integrated approach.",
    date: "May 5, 2026",
    dateTime: "2026-05-05",
    readTime: "10 min read",
    imageAlt: "Aerial view of a Nigerian teaching hospital campus",
  },
];

/** All blog category tags use the same gold/20 pill style throughout the blog */
const categoryTagClass = "bg-brand-gold/20 text-brand-dark";

const BlogGrid = ({ activeCategory }: BlogGridProps) => {
  /** Filter posts — "All" bypasses the filter entirely */
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  /** Section label reflects the active filter for context */
  const sectionLabel = activeCategory === "All" ? "All Articles" : activeCategory;

  return (
    <section
      className="py-12 lg:py-16"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Blog article grid"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label + live article count */}
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-brand-green text-xs font-semibold uppercase tracking-widest">
            {sectionLabel}
          </p>
          <span className="text-brand-dark/40 text-sm">
            {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {/* ── Empty state — shown when no posts match the selected category ── */}
        {filteredPosts.length === 0 && (
          <div
            key={`empty-${activeCategory}`}
            className="animate-fade-in flex flex-col items-center justify-center py-20 text-center"
            role="status"
          >
            {/* Decorative icon */}
            <div className="w-14 h-14 rounded-full bg-brand-dark/8 flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7 text-brand-dark/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-brand-dark font-semibold text-base mb-1">
              No articles in this category yet
            </p>
            <p className="text-brand-dark/50 text-sm max-w-xs leading-relaxed">
              We&apos;re working on new{" "}
              <span className="font-medium text-brand-dark/70">{activeCategory}</span>{" "}
              content. Check back soon — or browse all articles in the meantime.
            </p>
          </div>
        )}

        {/* ── Article Grid ────────────────────────────────────────────────────
         * key={activeCategory} causes React to remount the div on every filter
         * change, which re-triggers the animate-fade-in CSS animation for a
         * clean fade + slide-up effect on each category switch.
         */}
        {filteredPosts.length > 0 && (
          <div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 animate-fade-in"
          >
            {filteredPosts.map((post) => (
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
                {/* ── Card Image + Category Overlay ────────────────────── */}
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

                  {/* Category tag — gold/20 pill on image top-left */}
                  <div className="absolute top-4 left-4">
                    <span className={`
                      inline-block
                      text-xs font-semibold
                      px-3 py-1 rounded-full
                      ${categoryTagClass}
                    `}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* ── Card Body ────────────────────────────────────────── */}
                <div className="p-6 flex flex-col flex-1">

                  {/* Meta: date + read time */}
                  <div className="flex items-center gap-2 text-brand-dark/40 text-xs mb-3">
                    <time dateTime={post.dateTime}>{post.date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Article title — H3 in the section hierarchy */}
                  <h3 className="
                    text-brand-dark font-bold text-base leading-snug
                    mb-3
                    group-hover:text-brand-green
                    transition-colors duration-200
                  ">
                    {post.title}
                  </h3>

                  {/* Excerpt — clamp at 3 lines to keep all cards the same height */}
                  <p className="text-brand-dark/60 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Read More link — pinned to card bottom by flex-1 on excerpt */}
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
        )}

      </div>
    </section>
  );
};

export default BlogGrid;
