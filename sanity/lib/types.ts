/**
 * sanity/lib/types.ts
 *
 * Shared TypeScript types for Sanity data used across blog components.
 * These mirror the fields returned by the GROQ queries in queries.ts.
 *
 * body is typed as unknown[] here; components that render it cast it to the
 * exact PortableText value type at the usage site (see ArticleBody.tsx).
 */

export interface SanityAuthor {
  name: string
  role?: string
}

/** Dereferenced Sanity image asset — returned by `mainImage { asset->, alt }` in GROQ */
export interface SanityImage {
  asset: {
    _id: string
    url: string
  }
  alt?: string
}

export interface SanityPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  category?: string
  author: SanityAuthor | null
  mainImage?: SanityImage | null
}

/** Full post — includes Portable Text body, used on the [slug] page */
export interface SanityPostFull extends SanityPost {
  body?: unknown[]
}
