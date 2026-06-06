/**
 * ArticleAuthorCard.tsx — Author bio card below the article body
 *
 * Receives the `author` object fetched from Sanity. Falls back to generic
 * "ProNurtureSphere Team" copy when no author is linked to the post.
 *
 * Design: White card inside bg-brand-light section — layered depth effect
 * consistent with FeaturesSection and BlogGrid card patterns.
 */

import Link from 'next/link'
import type { SanityAuthor } from '@/sanity/lib/types'

interface ArticleAuthorCardProps {
  author: SanityAuthor | null
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const ArticleAuthorCard = ({ author }: ArticleAuthorCardProps) => {
  const name = author?.name ?? 'ProNurtureSphere Team'
  const role = author?.role ?? 'Research & Editorial'

  return (
    <section
      className="py-10 lg:py-12"
      style={{ backgroundColor: '#f5f5f0' }}
      aria-label="About the author"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-5">
          Written By
        </p>

        <div className="
          bg-white rounded-2xl
          border border-brand-dark/5
          p-6 sm:p-8
          flex flex-col sm:flex-row
          items-start sm:items-center
          gap-5
        ">

          {/* Avatar — initials until real headshots are available */}
          <div className="
            w-16 h-16 rounded-full
            bg-brand-dark
            flex items-center justify-center
            flex-shrink-0
            shadow-md
          ">
            <span className="text-brand-gold font-bold text-xl">
              {getInitials(name)}
            </span>
          </div>

          {/* Author info */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-brand-dark text-lg leading-tight">
              {name}
            </p>
            <p className="text-brand-green text-sm font-medium mt-0.5 mb-2">
              {role}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              The ProNurtureSphere editorial team brings together clinicians,
              HR practitioners, and healthcare technology specialists to produce
              practical, evidence-based content for Nigeria&apos;s healthcare workforce.
            </p>
          </div>

          {/* View all articles link */}
          <div className="sm:flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/blog"
              className="
                inline-flex items-center justify-center gap-1.5
                text-brand-dark font-semibold text-sm
                border border-brand-dark/20
                px-4 py-2 rounded-full
                hover:bg-brand-dark hover:text-white hover:border-brand-dark
                transition-all duration-200
                cursor-pointer
                whitespace-nowrap
              "
            >
              All Articles
              <svg
                className="w-3.5 h-3.5"
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
      </div>
    </section>
  )
}

export default ArticleAuthorCard
