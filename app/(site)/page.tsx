/**
 * app/(site)/page.tsx — Homepage (route: /)
 *
 * This is the entry point for all visitors to the ProNurtureSphere website.
 * It assembles all homepage sections in the correct conversion-optimised order:
 *
 * 1. HeroSection       — Grabs attention, communicates value proposition, drives CTAs
 * 2. SocialProofBar    — Establishes credibility immediately after the hero
 * 3. ProblemSection    — Agitates pain points — creates empathy and urgency
 * 4. FeaturesSection   — Presents the solution (id="features" anchor target)
 * 5. AudienceSection   — Speaks directly to each persona, self-segmentation UX
 * 6. TestimonialsSection — Social proof from real users
 * 7. StatsSection      — Reinforces scale and reliability with hard numbers
 * 8. BlogPreviewSection — Thought leadership, SEO value, educates hesitant visitors
 * 9. WaitlistSection   — Final conversion opportunity for all visitors
 *
 * Data is fetched from Sanity in parallel and threaded down as props.
 * Every component falls back to hardcoded content if Sanity returns null,
 * so the page renders correctly even before the CMS is fully populated.
 *
 * ISR revalidate: 3600s — CMS changes propagate within one hour.
 */

export const revalidate = 60

export const metadata = {
  title: "Smarter Staffing for Nigerian Healthcare",
  description:
    "ProNurtureSphere helps Nigerian hospitals and clinics post shifts, verify credentials, manage rosters, and handle payroll — from one platform.",
}

import { sanityFetch } from "@/sanity/lib/live"
import { homePageQuery, recentPostsQuery } from "@/sanity/lib/queries"
import type { HomePageData, SanityPost } from "@/sanity/lib/types"
import HeroSection from "@/components/HeroSection"
import SocialProofBar from "@/components/SocialProofBar"
import ProblemSection from "@/components/ProblemSection"
import FeaturesSection from "@/components/FeaturesSection"
import AudienceSection from "@/components/AudienceSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import StatsSection from "@/components/StatsSection"
import BlogPreviewSection from "@/components/BlogPreviewSection"
import WaitlistSection from "@/components/WaitlistSection"

export default async function Page() {
  // Fetch homepage singleton and 3 most recent blog posts in parallel.
  // sanityFetch returns { data: unknown } — cast to known types after fetching.
  const [homeResult, postsResult] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: recentPostsQuery }),
  ])
  const homePage = homeResult.data as HomePageData | null
  const recentPosts = postsResult.data as SanityPost[]

  return (
    <>
      {/* 1. Hero — above the fold, answers: What? Who? Why? */}
      <HeroSection hero={homePage?.hero} />

      {/* 2. Social proof bar — quick trust signals after the hero */}
      <SocialProofBar stats={homePage?.stats} />

      {/* 3. Problem — agitate the pain before presenting the solution */}
      <ProblemSection />

      {/* 4. Features — the solution reveal, anchored via #features */}
      <FeaturesSection featuredServices={homePage?.featuredServices} />

      {/* 5. Audience split — self-segmentation for employers and professionals */}
      <AudienceSection />

      {/* 6. Testimonials — social proof from real healthcare teams */}
      <TestimonialsSection testimonials={homePage?.testimonials} />

      {/* 7. Stats — reinforce scale with large, impactful numbers */}
      <StatsSection stats={homePage?.stats} />

      {/* 8. Blog preview — thought leadership, educates hesitant visitors */}
      <BlogPreviewSection posts={recentPosts} />

      {/* 9. Waitlist — final, high-visibility conversion CTA */}
      <WaitlistSection />
    </>
  )
}
