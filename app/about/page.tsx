/**
 * app/about/page.tsx — About ProNurtureSphere page (route: /about)
 *
 * Target audience: Both buyer personas + partners, media, and stakeholders.
 * This is a story page — purpose is to establish institutional identity, credibility,
 * and trust. NOT a conversion page. The CTA at the bottom is a secondary action,
 * not the primary reason the visitor is here.
 *
 * Section order follows a narrative arc:
 *
 * WHO WE ARE
 * 1. AboutHero         — Page identity, founding headline, placeholder image
 * 2. AboutMission      — Mission (left, green) + Vision (right, light) two-column
 *
 * WHY WE EXIST
 * 3. AboutStory        — The origin story + pull quote + founding insight stats
 *
 * WHAT WE BELIEVE
 * 4. AboutValues       — 7 core values in a card grid
 *
 * HOW WE WORK
 * 5. AboutEcosystem    — Ecosystem model framing: 4 pillars (green bg)
 * 6. AboutLifecycle    — 7-stage professional lifecycle model
 *
 * WHO WE SERVE
 * 7. AboutWhoWeServe   — 3 audience groups: professionals, institutions, communities
 *
 * WHO WE ARE (PEOPLE)
 * 8. AboutTeam         — Founder card + 6 director role cards
 *
 * WHAT WE DO (OPERATIONS)
 * 9. AboutPSLArms      — 6 operating arms of PSL
 *
 * ACTION
 * 10. AboutCTA         — Join the movement: dual CTA (waitlist + contact)
 *
 * This is a Server Component. All sections are static — no interactivity needed.
 */

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

export const metadata = {
  title: "About ProNurtureSphere — Building the Healthcare Workforce Africa Deserves",
  description:
    "ProNurtureSphere Limited exists at the intersection of education, technology, and healthcare delivery — nurturing, equipping, deploying, and sustaining competent healthcare professionals across Nigeria and beyond.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero — page identity, H1, founding photo */}
      <AboutHero />

      {/* 2. Mission + Vision — the organisation's north star, split two-column */}
      <AboutMission />

      {/* 3. Story — origin narrative, pull quote, founding stats */}
      <AboutStory />

      {/* 4. Values — 7 principles that define how PSL operates */}
      <AboutValues />

      {/* 5. Ecosystem — the 4-pillar model that differentiates PSL */}
      <AboutEcosystem />

      {/* 6. Lifecycle — 7 stages of the professional journey we support */}
      <AboutLifecycle />

      {/* 7. Who We Serve — 3 audience groups explicitly named */}
      <AboutWhoWeServe />

      {/* 8. Team — founder card + 6 director role cards */}
      <AboutTeam />

      {/* 9. PSL Arms — 6 operating divisions of the organisation */}
      <AboutPSLArms />

      {/* 10. CTA — dual action: waitlist + contact */}
      <AboutCTA />
    </>
  );
}
