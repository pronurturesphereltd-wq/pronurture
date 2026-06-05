/**
 * app/blog/[slug]/page.tsx — Individual blog post page (route: /blog/[slug])
 *
 * This is a dynamic route that renders the same template for every slug.
 * All content is currently hardcoded placeholder — the template is ready
 * to be wired to real Sanity CMS data.
 *
 * ── Section order ─────────────────────────────────────────────────────────
 *
 * ABOVE THE FOLD
 * 1. ArticleHero        — Breadcrumb, category tag, H1, author meta, featured image
 *
 * ARTICLE CONTENT
 * 2. ArticleBody        — Full prose with H2s, paragraphs, blockquote, bullet list
 * 3. ArticleAuthorCard  — Author name, bio, avatar, "All Articles" link
 *
 * RETENTION
 * 4. ArticleRelatedPosts — 3 related article cards in the blog card style
 * 5. BlogNewsletterCTA  — Newsletter email capture (reused from /blog listing)
 *
 * ── How to wire Sanity data (when ready) ──────────────────────────────────
 *
 * 1. Add a GROQ query in sanity/lib/queries.ts:
 *    export const postBySlugQuery = groq`
 *      *[_type == "post" && slug.current == $slug][0] {
 *        title, category, body, publishedAt, readTime,
 *        "author": author->{ name, role, bio, image },
 *        mainImage
 *      }
 *    `
 *
 * 2. Fetch in this page (it's a Server Component):
 *    const post = await client.fetch(postBySlugQuery, { slug: resolvedSlug })
 *    if (!post) notFound()  // from next/navigation — shows 404 page
 *
 * 3. Pass post fields as props to ArticleHero, ArticleBody, ArticleAuthorCard.
 *    Use @portabletext/react to render the Sanity Portable Text body field.
 *
 * 4. For generateStaticParams: fetch all slugs from Sanity and return them
 *    for static generation at build time (better performance + SEO).
 *
 * ── Next.js 15 params note ────────────────────────────────────────────────
 * In Next.js 15, route segment params are Promises. The page must be async
 * and must await params before accessing its properties.
 *
 * ── SEO note ─────────────────────────────────────────────────────────────
 * generateMetadata is defined to produce per-article SEO titles and descriptions.
 * Currently uses placeholder values — update to use real Sanity data.
 */

import ArticleHero from "@/components/blog/ArticleHero";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleAuthorCard from "@/components/blog/ArticleAuthorCard";
import ArticleRelatedPosts from "@/components/blog/ArticleRelatedPosts";
import BlogNewsletterCTA from "@/components/blog/BlogNewsletterCTA";

/** Next.js 15: params is a Promise — must be typed accordingly */
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * generateMetadata — per-article SEO metadata
 *
 * TODO: Fetch real title and description from Sanity using the slug
 *       and return dynamic values for each article.
 */
export async function generateMetadata({ params }: BlogPostPageProps) {
  // Await params to satisfy Next.js 15 async params requirement
  const { slug } = await params;

  // TODO: Fetch real article metadata from Sanity:
  // const post = await client.fetch(postBySlugQuery, { slug })
  // if (!post) return {}

  return {
    title: `Nigeria's Doctor Shortage by the Numbers — ProNurtureSphere`,
    description:
      "With a doctor-to-patient ratio of roughly 1:3,500 — far below the WHO's recommended 1:600 — Nigerian facilities face mounting pressure. Here's what the data reveals and how to respond.",
    // Suppress TS unused warning on slug until Sanity is wired
    ...(slug && {}),
  };
}

/**
 * BlogPostPage — The individual article page component
 *
 * Renders the same placeholder template for any slug.
 * The slug is received from the dynamic route segment but currently unused —
 * the same article template renders for every path under /blog/[slug].
 *
 * TODO: Use the slug to fetch and render the specific article from Sanity.
 *       If the slug does not match any post, call notFound() from next/navigation.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await params — required in Next.js 15 for dynamic route segments
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug } = await params;

  // TODO: const post = await client.fetch(postBySlugQuery, { slug })
  // TODO: if (!post) notFound()

  return (
    <>
      {/* 1. Article hero — breadcrumb, H1, author meta, featured image */}
      <ArticleHero />

      {/* 2. Article body — full prose with H2s, blockquote, bullet list */}
      <ArticleBody />

      {/* 3. Author bio — credibility signal immediately after article */}
      <ArticleAuthorCard />

      {/* 4. Related posts — 3 cards to keep engaged readers on-site */}
      <ArticleRelatedPosts />

      {/* 5. Newsletter CTA — retains readers not yet ready to join waitlist */}
      <BlogNewsletterCTA />
    </>
  );
}
