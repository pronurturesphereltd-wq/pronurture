/**
 * app/(site)/page.tsx — Homepage (route: /)
 *
 * Phase 2 — Full homepage rebuild using the Phase 1 design system.
 * All Sanity fetches preserved. The pt-16 lg:pt-[72px] offset compensates
 * for the fixed Navbar height so content begins below it.
 *
 * siteSettings is no longer fetched here — it is fetched once in
 * app/(site)/layout.tsx and passed directly to Navbar and Footer.
 */

export const revalidate = 60

export const metadata = {
  title: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform",
  description:
    "PSL connects Nigerian clinical professionals with verified jobs, accredited CPD, and locum shifts — and gives healthcare facilities the verified candidates and compliance tools they need. Join free.",
}

import { serverClient } from "@/sanity/lib/client"
import { homePageQuery, partnersQuery, recentPostsQuery } from "@/sanity/lib/queries"
import type { HomePageData, SanityPartner, SanityPost } from "@/sanity/lib/types"

import HomeHero          from "@/components/home/HomeHero"
import HomePartnersTicker from "@/components/home/HomePartnersTicker"
import HomeProblem       from "@/components/home/HomeProblem"
import HomeValueProp     from "@/components/home/HomeValueProp"
import HomeTrustData     from "@/components/home/HomeTrustData"
import HomeSurveyVoices  from "@/components/home/HomeSurveyVoices"
import HomeHowItWorks    from "@/components/home/HomeHowItWorks"
import HomeBlogPreview   from "@/components/home/HomeBlogPreview"
import HomeFinalCTA      from "@/components/home/HomeFinalCTA"

export default async function Page() {
  const [homePage, recentPosts, partners] = await Promise.all([
    serverClient.fetch<HomePageData | null>(homePageQuery),
    serverClient.fetch<SanityPost[]>(recentPostsQuery),
    serverClient.fetch<SanityPartner[]>(partnersQuery),
  ])

  return (
    <div className="pt-16 lg:pt-[72px]">
      <HomeHero           hero={homePage?.hero} />
      <HomePartnersTicker partners={partners ?? []} />
      <HomeProblem />
      <HomeValueProp />
      <HomeTrustData />
      <HomeSurveyVoices />
      <HomeHowItWorks />
      <HomeBlogPreview    posts={recentPosts ?? []} />
      <HomeFinalCTA />
    </div>
  )
}
