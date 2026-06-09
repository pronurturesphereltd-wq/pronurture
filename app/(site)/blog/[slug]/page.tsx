/**
 * app/(site)/blog/[slug]/page.tsx — Individual blog post page (route: /blog/[slug])
 *
 * Server Component that fetches the specific post, 3 related posts, and approved
 * reader comments from Sanity using the slug from the dynamic route segment.
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
  commentsQuery,
} from '@/sanity/lib/queries'
import type { SanityPostFull, SanityPost, BlogComment } from '@/sanity/lib/types'

import ArticleHero from '@/components/blog/ArticleHero'
import ArticleBody from '@/components/blog/ArticleBody'
import ArticleAuthorCard from '@/components/blog/ArticleAuthorCard'
import ReactionButtons from '@/components/blog/ReactionButtons'
import CommentSection from '@/components/blog/CommentSection'
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

  // Fetch post, related posts, and approved comments concurrently.
  // commentsQuery uses stega: false — comment text must not contain stega characters.
  const [postResult, relatedResult, commentsResult] = await Promise.all([
    sanityFetch({ query: postBySlugQuery, params: { slug } }),
    sanityFetch({ query: relatedPostsQuery, params: { currentSlug: slug } }),
    sanityFetch({ query: commentsQuery, params: { slug }, stega: false }),
  ])
  // Cast from unknown — sanityFetch type param is the GROQ string, not the result type
  const post = postResult.data as SanityPostFull | null
  const related = relatedResult.data as SanityPost[]
  const comments = commentsResult.data as BlogComment[]

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

      {/* 4. Reaction buttons — thumbs up/down engagement; sits in a centered wrapper
           matching the article column width so it aligns with the body text */}
      <div className="bg-white py-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReactionButtons
            postId={post._id}
            initialLikes={post.likes ?? 0}
            initialDislikes={post.dislikes ?? 0}
          />
        </div>
      </div>

      {/* 5. Comments — approved reader comments + submission form */}
      <CommentSection postSlug={slug} initialComments={comments} />

      {/* 6. Related posts — 3 most recent posts excluding this one */}
      <ArticleRelatedPosts posts={related} />

      {/* 7. Newsletter CTA — retains readers not yet ready to join waitlist */}
      <BlogNewsletterCTA />
    </>
  )
}
