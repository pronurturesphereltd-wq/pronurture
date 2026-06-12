/**
 * app/(site)/page.tsx — Homepage (route: /)
 *
 * This is the entry point for all visitors to the ProNurtureSphere website.
 * It assembles all homepage sections in the correct conversion-optimised order:
 *
 * 1. HeroSection           — Grabs attention, dual-audience value prop, two CTAs
 * 2. SocialProofBar        — Establishes credibility immediately after the hero
 * 3. ProblemSection        — Names the system failure for each persona
 * 4. FeaturesSection       — Presents the solution (id="features" anchor target)
 * 5. AudienceSection       — Speaks directly to each persona, self-segmentation UX
 * 6. HowItWorks            — Two parallel 3-step onboarding flows
 * 7. WaitlistSocialProof   — Waitlist counter + 6-stat grid + survey quotes
 * 8. StatsSection          — Reinforces scale and reliability with hard numbers
 * 9. BlogPreviewSection    — Thought leadership, SEO value, educates hesitant visitors
 * 10. WaitlistSection      — Final conversion opportunity — dual CTA, no form
 *
 * Data is fetched from Sanity in parallel and threaded down as props.
 * Every component falls back to hardcoded content if Sanity returns null,
 * so the page renders correctly even before the CMS is fully populated.
 *
 * ISR revalidate: 3600s — CMS changes propagate within one hour.
 */

export const revalidate = 60

export const metadata = {
  title: "ProNurtureSphere — Jobs, CPD & Workforce Management for Nigerian Healthcare",
  description:
    "Find verified clinical jobs with salary shown, earn MDCN/NMCN-aligned CPD, or post vacancies and manage your clinical team. Nigeria's healthcare workforce platform.",
}

import { sanityFetch } from "@/sanity/lib/live"
import { homePageQuery, recentPostsQuery, siteSettingsQuery } from "@/sanity/lib/queries"
import type { HomePageData, SanityPost, SiteSettings } from "@/sanity/lib/types"
import HeroSection from "@/components/HeroSection"
import SocialProofBar from "@/components/SocialProofBar"
import ProblemSection from "@/components/ProblemSection"
import FeaturesSection from "@/components/FeaturesSection"
import AudienceSection from "@/components/AudienceSection"
import HowItWorks from "@/components/HowItWorks"
import WaitlistSocialProof from "@/components/WaitlistSocialProof"
import StatsSection from "@/components/StatsSection"
import BlogPreviewSection from "@/components/BlogPreviewSection"
import WaitlistSection from "@/components/WaitlistSection"

export default async function Page() {
  // Fetch homepage singleton, 3 most recent blog posts, and site settings in parallel.
  // siteSettings provides waitlistCount for WaitlistSocialProof.
  // sanityFetch returns { data: unknown } — cast to known types after fetching.
  const [homeResult, postsResult, settingsResult] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: recentPostsQuery }),
    sanityFetch({ query: siteSettingsQuery }),
  ])
  const homePage = homeResult.data as HomePageData | null
  const recentPosts = postsResult.data as SanityPost[]
  const siteSettings = settingsResult.data as SiteSettings | null

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

      {/* 6. How It Works — two parallel 3-step flows, one per persona */}
      <HowItWorks />

      {/* Thin brand-light divider — prevents visual bleed between brand-green and brand-dark */}
      <div className="h-2 bg-brand-light" />

      {/* 7. Waitlist counter + problem statistics + survey quotes */}
      <WaitlistSocialProof waitlistCount={siteSettings?.waitlistCount ?? 0} />

      {/* 8. Stats — reinforce scale with large, impactful numbers */}
      <StatsSection stats={homePage?.stats} />

      {/* 9. Blog preview — thought leadership, educates hesitant visitors */}
      <BlogPreviewSection posts={recentPosts} />

      {/* 10. Waitlist — final, high-visibility conversion CTA */}
      <WaitlistSection />
    </>
  )
}
