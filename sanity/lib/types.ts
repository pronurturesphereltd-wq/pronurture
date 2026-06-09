/**
 * sanity/lib/types.ts
 *
 * Shared TypeScript types for Sanity data used across blog components.
 * These mirror the fields returned by the GROQ queries in queries.ts.
 *
 * body is typed as unknown[] here; components that render it cast it to the
 * exact PortableText value type at the usage site (see ArticleBody.tsx).
 */

/** siteSettings singleton — returned by siteSettingsQuery */
export interface SiteSettings {
  siteName: string
  tagline?: string
  email?: string
  phone?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
  copyrightText?: string
  footerTagline?: string
  logo?: SanityImage | null
  logoMono?: SanityImage | null
}

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

/** Full post — includes Portable Text body, likes/dislikes, used on the [slug] page */
export interface SanityPostFull extends SanityPost {
  body?: unknown[]
  likes?: number
  dislikes?: number
}

/** Approved reader comment — returned by commentsQuery */
export interface BlogComment {
  _id: string
  name: string
  body: string
  _createdAt: string
}

/** Hero section fields from the homePage singleton */
export interface HomepageHero {
  headline?:    string
  subheadline?: string
  ctaText?:     string
  ctaLink?:     string
  image?:       SanityImage | null
  heroVideo?: {
    asset?: {
      url: string
    }
  } | null
}

/** One stat entry from homePage.stats[] */
export interface HomepageStat {
  _key:  string
  value: string
  label: string
}

/** Dereferenced testimonial from homePage.testimonials[]-> */
export interface SanityTestimonial {
  _id:           string
  quote:         string
  name:          string
  role?:         string
  organisation?: string
}

/** Dereferenced service document from homePage.featuredServices[]-> */
export interface SanityService {
  _id:               string
  title:             string
  slug?:             { current: string }
  shortDescription?: string
}

/** homePage singleton shape — returned by homePageQuery */
export interface HomePageData {
  hero?:             HomepageHero   | null
  stats?:            HomepageStat[] | null
  testimonials?:     SanityTestimonial[] | null
  featuredServices?: SanityService[] | null
}

/** Feature item from employersPage.features[] — inline object with _key */
export interface EmployerFeature {
  _key:         string
  title:        string
  subtitle?:    string
  description?: string
}

/** CTA section from employersPage.cta */
export interface EmployerCTA {
  headline?:   string
  body?:       string
  buttonText?: string
  buttonLink?: string
}

/** employersPage singleton shape — returned by employersPageQuery */
export interface EmployersPageData {
  hero?:         HomepageHero        | null
  features?:     EmployerFeature[]   | null
  testimonials?: SanityTestimonial[] | null
  cta?:          EmployerCTA         | null
}

/** Feature item from professionalsPage.features[] — inline object with _key */
export interface ProfessionalFeature {
  _key:         string
  title:        string
  subtitle?:    string
  description?: string
}

/** CTA section from professionalsPage.cta */
export interface ProfessionalCTA {
  headline?:   string
  body?:       string
  buttonText?: string
  buttonLink?: string
}

/** professionalsPage singleton shape — returned by professionalsPageQuery */
export interface ProfessionalsPageData {
  hero?:         HomepageHero           | null
  features?:     ProfessionalFeature[]  | null
  testimonials?: SanityTestimonial[]    | null
  cta?:          ProfessionalCTA        | null
}

/** One value item from aboutPage.values[] */
export interface AboutValue {
  _key:         string
  title:        string
  description?: string
}

/** One team member from aboutPage.team[] */
export interface AboutTeamMember {
  _key:      string
  name:      string
  role?:     string
  bio?:      string
  linkedin?: string
  image?:    SanityImage | null
}

/** Story section data from aboutPage.story */
export interface AboutStoryData {
  headline?: string
  body?:     unknown[]
  image?:    SanityImage | null
}

/** Mission section data from aboutPage.mission */
export interface AboutMissionData {
  body?:   unknown[]
  vision?: string
}

/** aboutPage singleton shape — returned by aboutPageQuery */
export interface AboutPageData {
  mission?: AboutMissionData  | null
  values?:  AboutValue[]      | null
  team?:    AboutTeamMember[] | null
  story?:   AboutStoryData    | null
}
