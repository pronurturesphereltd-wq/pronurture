/**
 * BlogFilteredContent.tsx — Client wrapper for interactive blog filtering
 *
 * Owns the activeCategory state and passes it down to BlogFilters (pill UI)
 * and BlogGrid (filtered post grid). Isolated as a client component so that
 * app/(site)/blog/page.tsx can stay a Server Component — preserving SSR and
 * the `export const metadata` SEO config that requires it.
 *
 * Receives posts fetched server-side and passes them as props to BlogGrid.
 * Passing serializable data from Server → Client component is valid in Next.js.
 */

'use client'

import { useState } from 'react'
import BlogFilters from './BlogFilters'
import BlogGrid from './BlogGrid'
import type { SanityPost } from '@/sanity/lib/types'

export const BLOG_CATEGORIES = [
  'All',
  'For Professionals',
  'For Employers',
  'Industry Insights',
  'CPD & Compliance',
] as const

interface BlogFilteredContentProps {
  posts: SanityPost[]
}

const BlogFilteredContent = ({ posts }: BlogFilteredContentProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  return (
    <>
      <BlogFilters
        activeCategory={activeCategory}
        onFilterChange={setActiveCategory}
      />
      <BlogGrid posts={posts} activeCategory={activeCategory} />
    </>
  )
}

export default BlogFilteredContent
