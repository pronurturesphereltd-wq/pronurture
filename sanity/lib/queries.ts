/**
 * sanity/lib/queries.ts
 *
 * All GROQ queries used by the blog. Using the `groq` tag from next-sanity
 * enables syntax highlighting in editors and ensures correct string handling.
 */

import { groq } from 'next-sanity'

/** All published posts ordered newest-first — blog listing page */
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    "author": author->{ name },
    mainImage { asset->{ _id, url }, alt }
  }
`

/** Single post by slug — blog post page */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    body,
    "author": author->{ name, role },
    mainImage { asset->{ _id, url }, alt }
  }
`

/** All post slugs — used by generateStaticParams for static generation at build time */
export const allPostSlugsQuery = groq`
  *[_type == "post"]{ "slug": slug.current }
`

/** Three most recent posts excluding the current one — related posts section */
export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    "author": author->{ name },
    mainImage { asset->{ _id, url }, alt }
  }
`
