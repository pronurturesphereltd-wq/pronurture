/**
 * app/(site)/blog/page.tsx — Blog / Resources page (route: /blog)
 *
 * Server Component — fetches all posts from Sanity at request time.
 * Posts are passed as props to child components:
 *   - BlogFeaturedPost receives posts[0] (most recent) as the featured article
 *   - BlogFilteredContent receives all posts for the filterable grid
 *
 * revalidate = 3600 means Next.js will ISR-refresh this page at most once
 * per hour after a request, keeping content fresh without rebuilding.
 *
 * Section order:
 * 1. BlogHero              — Compact page identity, H1, subheadline (~50vh)
 * 2. BlogFeaturedPost      — Most recent post as full-width editorial card
 * 3. BlogFilteredContent   — Category filter pills + article grid (client)
 * 4. BlogNewsletterCTA     — Email newsletter signup
 */

import BlogHero from '@/components/blog/BlogHero'
import BlogFeaturedPost from '@/components/blog/BlogFeaturedPost'
import BlogFilteredContent from '@/components/blog/BlogFilteredContent'
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA'
import { serverClient } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import type { SanityPost } from '@/sanity/lib/types'

export const revalidate = 60

export const metadata = {
  title: 'Resources & Insights',
  description:
    'Practical guides, policy analysis, and career resources for Nigerian healthcare professionals and the hospitals and clinics that employ them.',
}

export default async function BlogPage() {
  const posts: SanityPost[] = await serverClient.fetch(postsQuery)

  return (
    <>
      {/* 1. Hero — compact orientation section (~50vh) */}
      <BlogHero />

      {/* 2. Featured post — most recent article as full-width editorial card */}
      <BlogFeaturedPost post={posts[0] ?? null} />

      {/* 3. Filters + grid — client component, manages category state */}
      <BlogFilteredContent posts={posts} />

      {/* 4. Newsletter CTA — retains readers who aren't ready to sign up yet */}
      <BlogNewsletterCTA />
    </>
  )
}
