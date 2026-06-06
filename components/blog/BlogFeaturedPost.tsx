/**
 * BlogFeaturedPost.tsx — Full-width featured article card
 *
 * The editorial centrepiece of the blog listing page. The most recent Sanity
 * post gets premium horizontal real estate before the 3-column grid.
 *
 * Layout: Two-column on desktop (image left, text right), stacked on mobile.
 * Accepts a single `post` prop from the server-side fetch in blog/page.tsx.
 * Renders nothing if no posts exist yet (e.g. during initial setup).
 */

import Image from 'next/image'
import Link from 'next/link'
import type { SanityPost } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import BlogImagePlaceholder from './BlogImagePlaceholder'

interface BlogFeaturedPostProps {
  post: SanityPost | null
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const BlogFeaturedPost = ({ post }: BlogFeaturedPostProps) => {
  if (!post) return null

  return (
    <section
      className="py-10 lg:py-14"
      style={{ backgroundColor: '#f5f5f0' }}
      aria-label="Featured article"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-5">
          Featured Article
        </p>

        <article className="
          bg-white rounded-3xl overflow-hidden
          border border-brand-dark/5
          shadow-sm hover:shadow-xl
          transition-all duration-300
          group
        ">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image — real Sanity image when available, gradient placeholder otherwise */}
            <div className="relative overflow-hidden h-64 lg:h-auto lg:min-h-[380px]">
              {post.mainImage?.asset ? (
                <Image
                  src={urlFor(post.mainImage).width(900).auto('format').url()}
                  alt={post.mainImage.alt ?? post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              ) : (
                <BlogImagePlaceholder
                  title={post.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute top-5 left-5">
                <span className="
                  inline-flex items-center gap-1.5
                  bg-brand-gold text-brand-dark
                  text-xs font-bold uppercase tracking-wide
                  px-3 py-1.5 rounded-full shadow-md
                ">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">

              <h2 className="
                text-2xl md:text-3xl font-bold
                text-brand-dark leading-snug
                mb-4
                group-hover:text-brand-green transition-colors duration-200
              ">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-3 text-brand-dark/45 text-sm mb-8">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>

              <Link
                href={`/blog/${post.slug.current}`}
                className="
                  inline-flex items-center gap-2
                  text-brand-dark font-bold text-base
                  cursor-pointer hover:text-brand-green
                  transition-colors duration-200
                  group/link
                "
                aria-label={`Read featured article: ${post.title}`}
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
  )
}

export default BlogFeaturedPost
