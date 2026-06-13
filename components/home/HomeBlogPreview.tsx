'use client'

/**
 * HomeBlogPreview.tsx — Recent blog posts preview strip
 *
 * Displays up to 3 posts from Sanity's recentPostsQuery.
 * Image priority: Sanity mainImage via urlFor() → BlogImagePlaceholder
 * (a deterministic brand-gradient fallback derived from the post's title hash,
 * which stays consistent across listing, featured, and related post surfaces).
 *
 * Cards lift on hover (Framer whileHover) and stagger-reveal on scroll
 * (index * 0.1s delay). Both interactions use spring physics.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import BlogImagePlaceholder from '@/components/blog/BlogImagePlaceholder'
import { urlFor } from '@/sanity/lib/image'
import type { SanityPost } from '@/sanity/lib/types'

const CATEGORY_LABELS: Record<string, string> = {
  'for-professionals': 'For Professionals',
  'for-employers':     'For Employers',
  'industry-insights': 'Industry Insights',
  'cpd-compliance':    'CPD & Compliance',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface HomeBlogPreviewProps {
  posts: SanityPost[]
}

export default function HomeBlogPreview({ posts }: HomeBlogPreviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  if (posts.length === 0) return null

  return (
    <section
      className="bg-white"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-label="Recent blog posts"
    >
      <div className="container-site">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <h2
            className="font-bold text-brand-dark"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: 'var(--ls-heading)',
            }}
          >
            Resources &amp; Insights
          </h2>
          <Button label="View all articles" href="/blog" variant="text-link" />
        </div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 58,
                delay: i * 0.1,
              }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
              }}
            >
              <Link href={`/blog/${post.slug.current}`} className="block h-full no-underline">
                {/* Image area */}
                <div style={{ height: '192px', position: 'relative', overflow: 'hidden' }}>
                  {post.mainImage?.asset?.url ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(192).url()}
                      alt={post.mainImage.alt ?? post.title}
                      fill
                      sizes="(min-width: 1024px) 350px, 100vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <BlogImagePlaceholder
                      title={post.title}
                      className="w-full h-full"
                    />
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col gap-2 p-6">
                  {/* Category pill + date */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {post.category && (
                      <span
                        className="bg-brand-offwhite text-brand-dark font-medium"
                        style={{ fontSize: '13px', borderRadius: '100px', padding: '4px 12px' }}
                      >
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </span>
                    )}
                    <span className="text-brand-gray" style={{ fontSize: '13px' }}>
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  {/* Title — 2-line clamp */}
                  <h3
                    className="font-bold text-brand-dark line-clamp-2"
                    style={{ fontSize: '20px', lineHeight: 1.3 }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt — 3-line clamp */}
                  {post.excerpt && (
                    <p
                      className="text-brand-gray line-clamp-3"
                      style={{ fontSize: '15px', lineHeight: 'var(--lh-body)' }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  {/* Read more */}
                  <div
                    className="flex items-center gap-2 text-brand-dark font-medium mt-2"
                    style={{ fontSize: '15px' }}
                  >
                    Read More
                    <ArrowRight size={15} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
