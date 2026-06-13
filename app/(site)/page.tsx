/**
 * app/(site)/page.tsx — Homepage (route: /)
 *
 * Phase 1 — Design Foundation.
 * All Sanity fetches kept intact. Homepage sections will be rebuilt in Phase 2.
 *
 * The pt-16 lg:pt-[72px] offset compensates for the fixed Navbar height
 * so content is not hidden underneath it.
 */

export const revalidate = 60

export const metadata = {
  title: "ProNurtureSphere — Jobs, CPD & Workforce Management for Nigerian Healthcare",
  description:
    "Find verified clinical jobs with salary shown, earn MDCN/NMCN-aligned CPD, or post vacancies and manage your clinical team. Nigeria's healthcare workforce platform.",
}

import { serverClient } from "@/sanity/lib/client"
import { homePageQuery, partnersQuery, recentPostsQuery, siteSettingsQuery } from "@/sanity/lib/queries"
import type { HomePageData, SanityPartner, SanityPost, SiteSettings } from "@/sanity/lib/types"

export default async function Page() {
  // All Sanity fetches preserved — data will be threaded into Phase 2 components
  const [homePage, recentPosts, siteSettings, partners] = await Promise.all([
    serverClient.fetch<HomePageData | null>(homePageQuery),
    serverClient.fetch<SanityPost[]>(recentPostsQuery),
    serverClient.fetch<SiteSettings | null>(siteSettingsQuery),
    serverClient.fetch<SanityPartner[]>(partnersQuery),
  ])

  return (
    <div className="pt-16 lg:pt-[72px]">
      <div className="container-site py-24 text-center">
        <p className="text-brand-gray" style={{ fontSize: 'var(--text-body)' }}>
          Homepage rebuilding — Phase 2 incoming.
        </p>
      </div>
    </div>
  )
}
