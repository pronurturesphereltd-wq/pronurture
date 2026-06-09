/**
 * app/(site)/about/page.tsx — About ProNurtureSphere page (route: /about)
 *
 * Target audience: Both buyer personas + partners, media, and stakeholders.
 * This is a story page — purpose is to establish institutional identity, credibility,
 * and trust. NOT a conversion page. The CTA at the bottom is a secondary action,
 * not the primary reason the visitor is here.
 *
 * Section order follows a narrative arc:
 *
 * WHO WE ARE
 * 1. AboutHero         — Page identity, founding headline, placeholder image (static)
 * 2. AboutMission      — Mission (left, green) + Vision (right, light) two-column
 *
 * WHY WE EXIST
 * 3. AboutStory        — The origin story + pull quote + founding insight stats
 *
 * WHAT WE BELIEVE
 * 4. AboutValues       — 7 core values in a card grid
 *
 * HOW WE WORK
 * 5. AboutEcosystem    — Ecosystem model framing: 4 pillars (green bg) (static)
 * 6. AboutLifecycle    — 7-stage professional lifecycle model (static)
 *
 * WHO WE SERVE
 * 7. AboutWhoWeServe   — 3 audience groups: professionals, institutions, communities (static)
 *
 * WHO WE ARE (PEOPLE)
 * 8. AboutTeam         — Founder card from Sanity + 6 director role cards (static)
 *
 * WHAT WE DO (OPERATIONS)
 * 9. AboutPSLArms      — 6 operating arms of PSL (static)
 *
 * ACTION
 * 10. AboutCTA         — Join the movement: dual CTA (waitlist + contact) (static)
 *
 * Sanity data is fetched via serverClient (bypasses CDN for freshness) and passed
 * as props to wired sections with hardcoded fallbacks.
 * Sections without CMS coverage remain fully static.
 *
 * ISR revalidate: 60s — content propagates to Vercel within one minute of publishing.
 */

export const revalidate = 60;

export const metadata = {
  title: "About Us",
  description:
    "Learn how ProNurtureSphere is transforming healthcare workforce management in Nigeria — our mission, values, team, and the platform we're building.",
};

import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery } from "@/sanity/lib/queries";
import type { AboutPageData } from "@/sanity/lib/types";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutEcosystem from "@/components/about/AboutEcosystem";
import AboutLifecycle from "@/components/about/AboutLifecycle";
import AboutWhoWeServe from "@/components/about/AboutWhoWeServe";
import AboutTeam from "@/components/about/AboutTeam";
import AboutPSLArms from "@/components/about/AboutPSLArms";
import AboutCTA from "@/components/about/AboutCTA";

export default async function AboutPage() {
  // sanityFetch returns { data: unknown } — cast to known type after fetching
  const data = (await sanityFetch({ query: aboutPageQuery })).data as AboutPageData | null;

  return (
    <>
      {/* 1. Hero — page identity, H1, founding photo (fully static) */}
      <AboutHero />

      {/* 2. Mission + Vision — from Sanity; body is PortableText, vision is plain text */}
      <AboutMission mission={data?.mission} />

      {/* 3. Story — headline + body from Sanity; pull quote + stats always static */}
      <AboutStory story={data?.story} />

      {/* 4. Values — 7 principles from Sanity; icons from ICON_BY_VALUE_KEY in component */}
      <AboutValues values={data?.values} />

      {/* 5. Ecosystem — the 4-pillar model (static) */}
      <AboutEcosystem />

      {/* 6. Lifecycle — 7 stages of the professional journey (static) */}
      <AboutLifecycle />

      {/* 7. Who We Serve — 3 audience groups (static) */}
      <AboutWhoWeServe />

      {/* 8. Team — founder card from Sanity; director role cards always static */}
      <AboutTeam team={data?.team} />

      {/* 9. PSL Arms — 6 operating divisions (static) */}
      <AboutPSLArms />

      {/* 10. CTA — dual action: waitlist + contact (static) */}
      <AboutCTA />
    </>
  );
}
