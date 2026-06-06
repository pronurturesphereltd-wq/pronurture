/**
 * BlogGrid.tsx — Responsive 3-column grid of blog post cards
 *
 * Accepts an activeCategory prop and renders only matching posts.
 * "All" shows every post; any other value filters by exact category match.
 * Because the Sanity `post` schema has no categories field, all fetched posts
 * appear under "All" — category-specific filters will show the empty state
 * until categories are added to the schema.
 *
 * Animation: key={activeCategory} causes React to remount the grid div on
 * every filter change, re-triggering the animate-fade-in CSS animation.
 *
 * Layout: 1-column (mobile) → 2-column (md) → 3-column (lg)
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { SanityPost } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import BlogImagePlaceholder from './BlogImagePlaceholder'

interface BlogGridProps {
  posts: SanityPost[]
  activeCategory: string
}

/** Format ISO datetime to human-readable date matching the existing UI style */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}


/** Maps the display label used in BLOG_CATEGORIES to the slug value stored in Sanity */
const CATEGORY_SLUG: Record<string, string> = {
  'For Professionals': 'for-professionals',
  'For Employers':     'for-employers',
  'Industry Insights': 'industry-insights',
  'CPD & Compliance':  'cpd-compliance',
}

const BlogGrid = ({ posts, activeCategory }: BlogGridProps) => {
  /** Filter posts — "All" bypasses filtering entirely */
  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === CATEGORY_SLUG[activeCategory])

  const sectionLabel =
    activeCategory === 'All' ? 'All Articles' : activeCategory

  return (
    <section
      className="py-12 lg:py-16"
      style={{ backgroundColor: '#f5f5f0' }}
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
            {filteredPosts.length}{' '}
            {filteredPosts.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div
            key={`empty-${activeCategory}`}
            className="animate-fade-in flex flex-col items-center justify-center py-20 text-center"
            role="status"
          >
            <div className="w-14 h-14 rounded-full bg-brand-dark/8 flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7 text-brand-dark/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <p className="text-brand-dark font-semibold text-base mb-1">
              No articles in this category yet
            </p>
            <p className="text-brand-dark/50 text-sm max-w-xs leading-relaxed">
              We&apos;re working on new{' '}
              <span className="font-medium text-brand-dark/70">
                {activeCategory}
              </span>{' '}
              content. Check back soon — or browse all articles in the meantime.
            </p>
          </div>
        )}

        {/* Article grid */}
        {filteredPosts.length > 0 && (
          <div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 animate-fade-in"
          >
            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="
                  group
                  bg-white rounded-2xl overflow-hidden
                  border border-brand-dark/5
                  hover:shadow-xl hover:-translate-y-1
                  transition-all duration-300
                  flex flex-col
                "
              >
                {/* Card image — real Sanity image when available, gradient placeholder otherwise */}
                <div className="relative overflow-hidden h-48">
                  {post.mainImage?.asset ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).auto('format').url()}
                      alt={post.mainImage.alt ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <BlogImagePlaceholder
                      title={post.title}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">

                  {/* Meta: date */}
                  <div className="flex items-center gap-2 text-brand-dark/40 text-xs mb-3">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>

                  {/* Title — H3 in section hierarchy */}
                  <h3 className="
                    text-brand-dark font-bold text-base leading-snug
                    mb-3
                    group-hover:text-brand-green
                    transition-colors duration-200
                  ">
                    {post.title}
                  </h3>

                  {/* Excerpt — clamp at 3 lines for consistent card height */}
                  <p className="text-brand-dark/60 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                    {post.excerpt ?? ''}
                  </p>

                  {/* Read More link */}
                  <Link
                    href={`/blog/${post.slug.current}`}
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>

                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default BlogGrid
