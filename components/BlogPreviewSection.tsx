/**
 * BlogPreviewSection.tsx — Blog/Resources preview cards
 *
 * Position: After StatsSection.
 * Purpose: Demonstrates thought leadership and provides SEO value.
 *          Blog content builds trust with both personas before they sign up.
 *
 * Data source: 3 most recent Sanity posts (recentPostsQuery) fetched in page.tsx.
 * Falls back to hardcoded placeholder posts when Sanity returns null or empty.
 *
 * Image handling:
 * - If post.mainImage exists → next/image via urlFor() at 400×250
 * - If null → BlogImagePlaceholder (deterministic brand gradient from title hash)
 *
 * Category slug → display label mapping converts Sanity's snake_case slugs
 * (e.g. "for-employers") to the badge text shown on cards.
 */

import Link from "next/link"
import Image from "next/image"
import type { SanityPost, SanityImage } from "@/sanity/lib/types"
import { urlFor } from "@/sanity/lib/image"
import BlogImagePlaceholder from "@/components/blog/BlogImagePlaceholder"

/** Normalised display shape — shared by Sanity posts and hardcoded fallbacks */
interface BlogDisplayPost {
  id:           string
  slug:         string
  categorySlug?: string
  title:        string
  excerpt?:     string
  date:         string
  mainImage?:   SanityImage | null
  imageAlt:     string
}

/** Sanity category slug → human-readable badge label */
const CATEGORY_LABEL: Record<string, string> = {
  'for-employers':     'For Employers',
  'for-professionals': 'For Professionals',
  'industry-insights': 'Industry Insights',
  'cpd-compliance':    'CPD & Compliance',
}

/** Badge label → Tailwind classes for colour-coded persona tags */
const CATEGORY_STYLE: Record<string, string> = {
  'For Employers':     'bg-brand-dark text-white',
  'For Professionals': 'bg-brand-green text-white',
  'Industry Insights': 'bg-brand-gold text-brand-dark',
  'CPD & Compliance':  'bg-brand-green text-white',
}

/** Formats an ISO date string to "8 May 2026" */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}

/** Hardcoded fallback posts — shown when Sanity returns nothing */
const FALLBACK_POSTS: BlogDisplayPost[] = [
  {
    id:           'fallback-1',
    slug:         'how-to-fill-locum-shifts-faster-nigeria',
    categorySlug: 'for-employers',
    title:        'How Nigerian Hospitals Can Fill Locum Shifts 5x Faster',
    excerpt:      "Staff shortages don't wait for convenient times. Here's how leading Nigerian facilities are using digital rostering to eliminate staffing gaps — without WhatsApp chaos.",
    date:         'May 20, 2026',
    mainImage:    null,
    imageAlt:     'Hospital administrator reviewing digital staffing dashboard',
  },
  {
    id:           'fallback-2',
    slug:         'mdcn-cpd-requirements-nigerian-doctors-2026',
    categorySlug: 'for-professionals',
    title:        'MDCN CPD Requirements for 2026: What Every Nigerian Doctor Needs to Know',
    excerpt:      "The Medical and Dental Council of Nigeria has updated its CPD requirements. Here's a plain-language breakdown of what you need to complete before your next licence renewal.",
    date:         'May 15, 2026',
    mainImage:    null,
    imageAlt:     'Nigerian doctor reviewing CPD certificate on tablet',
  },
  {
    id:           'fallback-3',
    slug:         'nigerian-healthcare-workforce-crisis-2026',
    categorySlug: 'industry-insights',
    title:        "Nigeria's Healthcare Workforce Crisis: Data, Causes, and the Path Forward",
    excerpt:      "With 1 doctor per 2,500 patients and 40% of trained nurses working abroad, Nigeria faces a workforce crisis. Here's what the data shows and what digital tools can — and can't — fix.",
    date:         'May 8, 2026',
    mainImage:    null,
    imageAlt:     'Data visualization showing Nigerian healthcare workforce statistics',
  },
]

interface BlogPreviewSectionProps {
  /** Three most recent Sanity posts — null falls back to hardcoded placeholders */
  posts?: SanityPost[] | null
}

const BlogPreviewSection = ({ posts }: BlogPreviewSectionProps) => {
  const displayPosts: BlogDisplayPost[] =
    posts && posts.length > 0
      ? posts.map((p) => ({
          id:           p._id,
          slug:         p.slug.current,
          categorySlug: p.category,
          title:        p.title,
          excerpt:      p.excerpt,
          date:         p.publishedAt ? formatDate(p.publishedAt) : '',
          mainImage:    p.mainImage,
          imageAlt:     p.mainImage?.alt ?? p.title,
        }))
      : FALLBACK_POSTS

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPosts.map((post) => {
            const categoryLabel = CATEGORY_LABEL[post.categorySlug ?? ''] ?? 'Industry Insights'
            const categoryClass = CATEGORY_STYLE[categoryLabel] ?? 'bg-brand-dark text-white'

            return (
              <article
                key={post.id}
                className="
                  group
                  bg-white rounded-2xl overflow-hidden
                  border border-brand-dark/5
                  hover:shadow-xl hover:-translate-y-1
                  transition-all duration-300
                "
              >
                {/* Card image — Sanity image or branded gradient placeholder */}
                <div className="relative overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(400).height(250).auto("format").url()}
                      alt={post.imageAlt}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <BlogImagePlaceholder
                      title={post.title}
                      className="w-full h-48"
                    />
                  )}

                  {/* Category tag — overlaid top-left */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryClass}`}>
                      {categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-3 text-brand-dark/45 text-xs mb-3">
                    <time dateTime={post.date}>{post.date}</time>
                  </div>

                  {/* Article title — H3 in visual hierarchy */}
                  <h3 className="text-brand-dark font-bold text-lg leading-snug mb-3 group-hover:text-brand-green transition-colors duration-200">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlogPreviewSection
