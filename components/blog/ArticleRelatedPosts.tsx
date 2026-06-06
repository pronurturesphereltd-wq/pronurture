/**
 * ArticleRelatedPosts.tsx — Related articles section below the blog post
 *
 * Receives 3 posts from the relatedPostsQuery in Sanity (the 3 most recent
 * posts excluding the current one). Renders them in the same card style as
 * BlogGrid for visual consistency across all blog surfaces.
 *
 * If fewer than 3 related posts exist (e.g. early in a blog's life), the grid
 * renders however many are available — the flex layout adapts gracefully.
 */

import Image from 'next/image'
import Link from 'next/link'
import type { SanityPost } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import BlogImagePlaceholder from './BlogImagePlaceholder'

interface ArticleRelatedPostsProps {
  posts: SanityPost[]
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}


const ArticleRelatedPosts = ({ posts }: ArticleRelatedPostsProps) => {
  if (posts.length === 0) return null

  return (
    <section
      className="py-14 lg:py-20"
      style={{ backgroundColor: '#f5f5f0' }}
      aria-label="Related articles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-2">
              Keep Reading
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
              Related Articles
            </h2>
          </div>
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

        {/* Related post cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((post) => (
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
                    sizes="(min-width: 1024px) 33vw, 100vw"
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
                <div className="flex items-center gap-2 text-brand-dark/40 text-xs mb-3">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>

                <h3 className="
                  text-brand-dark font-bold text-base leading-snug
                  mb-3
                  group-hover:text-brand-green
                  transition-colors duration-200
                ">
                  {post.title}
                </h3>

                <p className="text-brand-dark/60 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                  {post.excerpt ?? ''}
                </p>

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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ArticleRelatedPosts
