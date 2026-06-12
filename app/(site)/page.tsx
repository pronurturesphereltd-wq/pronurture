/**
 * app/(site)/page.tsx — Homepage (route: /)
 *
 * Section order (conversion-optimised):
 *
 * 1. HeroSection           — Dual-audience value prop, two CTAs
 * 2. SocialProofBar        — Quick trust signals after the hero
 * 3. ProblemSection        — Names the system failure for each persona
 * 4. AudienceSection       — Speaks directly to each persona, self-segmentation UX
 * 5. HowItWorks            — Two parallel 3-step onboarding flows
 * 6. WaitlistSocialProof   — Waitlist counter + 6-stat grid + survey quotes
 * 7. BlogPreviewSection    — Thought leadership, SEO value, educates hesitant visitors
 * 8. WaitlistSection       — Final conversion opportunity — dual CTA, no form
 *
 * Data is fetched from Sanity in parallel and threaded down as props.
 * Every component falls back to hardcoded content if Sanity returns null.
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
import AudienceSection from "@/components/AudienceSection"
import HowItWorks from "@/components/HowItWorks"
import WaitlistSocialProof from "@/components/WaitlistSocialProof"
import BlogPreviewSection from "@/components/BlogPreviewSection"
import WaitlistSection from "@/components/WaitlistSection"

export default async function Page() {
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
      {/* 1. Hero — above the fold, dual-audience value prop */}
      <HeroSection hero={homePage?.hero} />

      {/* 2. Social proof bar — quick trust signals after the hero */}
      <SocialProofBar stats={homePage?.stats} />

      {/* 3. Problem — names the system failure for each persona */}
      <ProblemSection />

      {/* 4. Audience split — self-segmentation for professionals and employers */}
      <AudienceSection />

      {/* 5. How It Works — two parallel 3-step flows, one per persona */}
      <HowItWorks />

      {/* Thin divider — prevents visual bleed between HowItWorks and WaitlistSocialProof */}
      <div className="h-2 bg-brand-light" />

      {/* 6. Waitlist counter + sourced stats + verbatim survey quotes */}
      <WaitlistSocialProof waitlistCount={siteSettings?.waitlistCount ?? 0} />

      {/* 7. Blog preview — thought leadership, educates hesitant visitors */}
      <BlogPreviewSection posts={recentPosts} />

      {/* 8. Waitlist — final, high-visibility conversion CTA */}
      <WaitlistSection />
    </>
  )
}
