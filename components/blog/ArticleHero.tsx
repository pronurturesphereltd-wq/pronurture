/**
 * ArticleHero.tsx — Hero section for individual blog post pages (/blog/[slug])
 *
 * Receives real post data from the Sanity fetch in blog/[slug]/page.tsx.
 * Answers 3 questions in 3 seconds: what is it, who wrote it, when.
 *
 * Layout: Centred text column (max-w-4xl) + full-width featured image below.
 * Background: bg-brand-light (#f5f5f0) — consistent with all other page heroes.
 */

import Image from 'next/image'
import Link from 'next/link'
import type { SanityPostFull } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import BlogImagePlaceholder from './BlogImagePlaceholder'

interface ArticleHeroProps {
  post: SanityPostFull
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Derives author initials for the avatar (e.g. "ProNurtureSphere Team" → "PT") */
function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const ArticleHero = ({ post }: ArticleHeroProps) => {
  const authorName = post.author?.name ?? 'ProNurtureSphere Team'

  return (
    <section
      className="pt-28 pb-0"
      style={{ backgroundColor: '#f5f5f0' }}
      aria-label="Article header"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-brand-dark/50">
            <li>
              <Link href="/" className="hover:text-brand-dark transition-colors duration-200">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link href="/blog" className="hover:text-brand-dark transition-colors duration-200">
                Resources &amp; Insights
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-brand-dark font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="
          text-3xl md:text-4xl lg:text-5xl
          font-bold text-brand-dark
          leading-tight tracking-tight
          mb-6
        ">
          {post.title}
        </h1>

        {/* Article meta: author · date */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-brand-dark/55 mb-10">

          <div className="flex items-center gap-2">
            <div className="
              w-8 h-8 rounded-full
              bg-brand-dark
              flex items-center justify-center
              flex-shrink-0
            ">
              <span className="text-brand-gold text-xs font-bold">
                {getInitials(authorName)}
              </span>
            </div>
            <span className="font-medium text-brand-dark">{authorName}</span>
          </div>

          <span aria-hidden="true" className="hidden sm:inline">·</span>

          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>

          <span aria-hidden="true">·</span>

          <span className="flex items-center gap-1 text-brand-green font-medium">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </span>
        </div>

      </div>

      {/* Full-width image — real Sanity image when available, gradient placeholder otherwise */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 lg:h-[500px]">
          {post.mainImage?.asset ? (
            <Image
              src={urlFor(post.mainImage).width(1200).auto('format').url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          ) : (
            <BlogImagePlaceholder
              title={post.title}
              className="w-full h-full"
            />
          )}
        </div>
      </div>

    </section>
  )
}

export default ArticleHero
