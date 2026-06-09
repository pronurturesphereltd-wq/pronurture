/**
 * app/(site)/employers/page.tsx — For Healthcare Employers page (route: /employers)
 *
 * Target persona: Dr. Adaeze Okafor — Hospital Administrator / Medical Director / HR Manager
 * (CLAUDE.md Section 3 — formal, data-driven, ROI-focused messaging)
 *
 * Section order follows the AIDA conversion framework:
 *
 * ATTENTION
 * 1. EmployersHero         — Grabs attention, answers what/who/why above the fold
 *
 * INTEREST
 * 2. EmployersPainPoints   — Resonates with Dr. Adaeze's daily frustrations (empathy)
 *
 * DESIRE
 * 3. EmployersTransformation — Before/After showing life with ProNurtureSphere
 * 4. EmployersFeatures       — The 6 platform capabilities, benefit-led
 * 5. EmployersHowItWorks     — 3 steps; removes implementation fear
 *
 * ACTION
 * 6. EmployersFAQ  — Handles final objections (interactive accordion — client component)
 * 7. EmployersCTA  — Final email capture with trust badges (client component)
 *
 * Sanity data is fetched via serverClient (bypasses CDN for freshness) and passed
 * as props to wired sections with hardcoded fallbacks. Sections without CMS content
 * (PainPoints, Transformation, HowItWorks, FAQ) remain fully static — editorial
 * content there changes very rarely and is not high-value to wire.
 *
 * ISR revalidate: 60s — content propagates to Vercel within one minute of publishing.
 */

export const revalidate = 60;

export const metadata = {
  title: "For Healthcare Employers",
  description:
    "Ditch spreadsheets and WhatsApp rosters. ProNurtureSphere gives Nigerian facilities shift posting, credential checks, rostering, and payroll in one place.",
};

import { sanityFetch } from "@/sanity/lib/live";
import { employersPageQuery } from "@/sanity/lib/queries";
import type { EmployersPageData } from "@/sanity/lib/types";
import EmployersHero from "@/components/employers/EmployersHero";
import EmployersPainPoints from "@/components/employers/EmployersPainPoints";
import EmployersTransformation from "@/components/employers/EmployersTransformation";
import EmployersFeatures from "@/components/employers/EmployersFeatures";
import EmployersHowItWorks from "@/components/employers/EmployersHowItWorks";
import EmployersFAQ from "@/components/employers/EmployersFAQ";
import EmployersCTA from "@/components/employers/EmployersCTA";

export default async function EmployersPage() {
  // sanityFetch returns { data: unknown } — cast to known type after fetching
  const data = (await sanityFetch({ query: employersPageQuery })).data as EmployersPageData | null;

  return (
    <>
      {/* 1. Hero — above the fold, "For Healthcare Facilities" audience targeting */}
      <EmployersHero hero={data?.hero} />

      {/* 2. Pain points — empathy with staffing/admin/compliance frustrations (static) */}
      <EmployersPainPoints />

      {/* 3. Transformation — before/after narrative pivot (static) */}
      <EmployersTransformation />

      {/* 4. Features — 6 benefit-led capability cards from Sanity */}
      <EmployersFeatures features={data?.features} />

      {/* 5. How it works — 3 steps to counter implementation fear (static) */}
      <EmployersHowItWorks />

      {/* 6. FAQ — resolves final objections (interactive, client component, static) */}
      <EmployersFAQ />

      {/* 8. CTA — final email capture with trust badges, content from Sanity */}
      <EmployersCTA cta={data?.cta} />
    </>
  );
}
