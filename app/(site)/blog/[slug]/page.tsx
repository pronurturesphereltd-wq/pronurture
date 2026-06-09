/**
 * app/(site)/blog/[slug]/page.tsx — Individual blog post page (route: /blog/[slug])
 *
 * Server Component that fetches the specific post and 3 related posts from
 * Sanity using the slug from the dynamic route segment.
 *
 * generateStaticParams: fetches all post slugs from Sanity at build time so
 * Next.js can pre-render each post as a static page for maximum performance.
 *
 * generateMetadata: produces per-article SEO title and description from the
 * real Sanity data, replacing the earlier placeholder values.
 *
 * notFound() is called when no post matches the slug — shows the 404 page.
 *
 * revalidate = 3600: ISR refreshes each post page at most once per hour so
 * edits in Sanity Studio appear on the live site within an hour.
 *
 * Next.js 15 note: params is a Promise — must be awaited before access.
 */

import { notFound } from 'next/navigation'
import { serverClient } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'
import {
  postBySlugQuery,
  allPostSlugsQuery,
  relatedPostsQuery,
} from '@/sanity/lib/queries'
import type { SanityPostFull, SanityPost } from '@/sanity/lib/types'

import ArticleHero from '@/components/blog/ArticleHero'
import ArticleBody from '@/components/blog/ArticleBody'
import ArticleAuthorCard from '@/components/blog/ArticleAuthorCard'
import ArticleRelatedPosts from '@/components/blog/ArticleRelatedPosts'
import BlogNewsletterCTA from '@/components/blog/BlogNewsletterCTA'

export const revalidate = 3600

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

/** Pre-render a static page for every slug in Sanity at build time.
 *  Uses serverClient directly — stega encoding must be off so slug strings
 *  are clean URL segments, not stega-encoded values. */
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await serverClient.fetch(allPostSlugsQuery)
  return slugs.map(({ slug }) => ({ slug }))
}

/** Per-article SEO metadata from real Sanity data.
 *  stega: false prevents invisible stega characters from appearing in
 *  <title> and <meta description> tags. */
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  // Cast from unknown — sanityFetch type param is the GROQ string, not the result type
  const post = (await sanityFetch({ query: postBySlugQuery, params: { slug }, stega: false })).data as SanityPostFull | null
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? '',
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  // Fetch post and related posts concurrently via sanityFetch for Visual Editing support.
  // Cast from unknown — sanityFetch type param is the GROQ string, not the result type.
  const [postResult, relatedResult] = await Promise.all([
    sanityFetch({ query: postBySlugQuery, params: { slug } }),
    sanityFetch({ query: relatedPostsQuery, params: { currentSlug: slug } }),
  ])
  const post = postResult.data as SanityPostFull | null
  const related = relatedResult.data as SanityPost[]

  // Show 404 if no post matches the slug
  if (!post) notFound()

  return (
    <>
      {/* 1. Article hero — breadcrumb, H1, author meta, featured image */}
      <ArticleHero post={post} />

      {/* 2. Article body — Portable Text from Sanity */}
      <ArticleBody body={post.body ?? []} />

      {/* 3. Author bio — credibility signal immediately after article */}
      <ArticleAuthorCard author={post.author} />

      {/* 4. Related posts — 3 most recent posts excluding this one */}
      <ArticleRelatedPosts posts={related} />

      {/* 5. Newsletter CTA — retains readers not yet ready to join waitlist */}
      <BlogNewsletterCTA />
    </>
  )
}
