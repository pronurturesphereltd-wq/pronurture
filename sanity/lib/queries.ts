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
    likes,
    dislikes,
    "author": author->{ name, role },
    mainImage { asset->{ _id, url }, alt }
  }
`

/** Approved reader comments for a post — ordered oldest first */
export const commentsQuery = groq`
  *[_type == "comment" && post->slug.current == $slug && approved == true]
  | order(_createdAt asc) {
    _id,
    name,
    body,
    _createdAt
  }
`

/** All post slugs — used by generateStaticParams for static generation at build time */
export const allPostSlugsQuery = groq`
  *[_type == "post"]{ "slug": slug.current }
`

/** Site-wide settings singleton — fetched in (site)/layout.tsx for Navbar + Footer,
 *  and in homepage page.tsx for waitlistCount */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    email,
    phone,
    socialLinks,
    copyrightText,
    footerTagline,
    waitlistCount,
    logo { asset->{ _id, url }, alt },
    logoMono { asset->{ _id, url }, alt }
  }
`

/** Homepage singleton — fetched in app/(site)/page.tsx to populate hero, stats, testimonials, services */
export const homePageQuery = groq`
  *[_id == "homePage"][0] {
    hero {
      headline,
      subheadline,
      ctaText,
      ctaLink,
      image { asset->{ _id, url }, alt },
      heroVideo { asset->{ url } }
    },
    "stats": stats[] { _key, value, label },
    "featuredServices": featuredServices[]-> { _id, title, slug, shortDescription }
  }
`

/** Three most recent posts — homepage blog preview section */
export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0..2] {
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

/** Employers page singleton — fetched in app/(site)/employers/page.tsx */
export const employersPageQuery = groq`
  *[_id == "employersPage"][0] {
    hero {
      headline,
      subheadline,
      ctaText,
      ctaLink,
      image { asset->{ _id, url }, alt }
    },
    "features": features[] { _key, title, subtitle, description },
    cta { headline, body, buttonText, buttonLink }
  }
`

/** Professionals page singleton — fetched in app/(site)/professionals/page.tsx */
export const professionalsPageQuery = groq`
  *[_id == "professionalsPage"][0] {
    hero {
      headline,
      subheadline,
      ctaText,
      ctaLink,
      image { asset->{ _id, url }, alt }
    },
    "features": features[] { _key, title, subtitle, description },
    cta { headline, body, buttonText, buttonLink }
  }
`

/** All partner documents ordered alphabetically — homepage PartnersMarquee */
export const partnersQuery = groq`
  *[_type == "partner"] | order(name asc) {
    _id,
    name,
    logo { asset->{ url } }
  }
`

/** About page singleton — fetched in app/(site)/about/page.tsx */
export const aboutPageQuery = groq`
  *[_id == "aboutPage"][0] {
    "mission": mission { body, vision },
    "values": values[] { _key, title, description },
    "team": team[] { _key, name, role, bio, linkedin, "image": image { asset->{ _id, url }, alt } },
    "story": story { headline, body, "image": image { asset->{ _id, url }, alt } }
  }
`
