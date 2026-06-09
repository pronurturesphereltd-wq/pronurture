/**
 * app/(site)/professionals/page.tsx — For Healthcare Professionals page (route: /professionals)
 *
 * Target persona: Dr. Amarachi Bello — Doctor / Nurse / Pharmacist / Allied Health Professional
 * (CLAUDE.md Section 3 — warm, opportunity-focused, mobile-first, trust-building messaging)
 *
 * Section order follows the AIDA conversion framework:
 *
 * ATTENTION
 * 1. ProfessionalsHero          — Above the fold. Badge + H1 + CTA. What/who/why.
 *
 * INTEREST
 * 2. ProfessionalsPainPoints    — Validates Dr. Amarachi's daily frustrations (empathy)
 *
 * DESIRE
 * 3. ProfessionalsTransformation — Before/After narrative pivot (deep green bg)
 * 4. ProfessionalsFeatures       — 6 benefit-led platform capability cards
 * 5. ProfessionalsHowItWorks     — 3 steps; shows simplicity, counters trust barrier
 * 6. ProfessionalsTestimonials   — Social proof from fellow Nigerian clinicians
 *
 * ACTION
 * 7. ProfessionalsFAQ  — Resolves final hesitations (interactive accordion — client)
 * 8. ProfessionalsCTA  — Final email capture with trust badges (client component)
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
  title: "For Healthcare Professionals",
  description:
    "Find verified locum shifts, complete accredited CPD, and grow your healthcare career — built for Nigerian doctors, nurses, and allied health professionals.",
};

import { sanityFetch } from "@/sanity/lib/live";
import { professionalsPageQuery } from "@/sanity/lib/queries";
import type { ProfessionalsPageData } from "@/sanity/lib/types";
import ProfessionalsHero from "@/components/professionals/ProfessionalsHero";
import ProfessionalsPainPoints from "@/components/professionals/ProfessionalsPainPoints";
import ProfessionalsTransformation from "@/components/professionals/ProfessionalsTransformation";
import ProfessionalsFeatures from "@/components/professionals/ProfessionalsFeatures";
import ProfessionalsHowItWorks from "@/components/professionals/ProfessionalsHowItWorks";
import ProfessionalsTestimonials from "@/components/professionals/ProfessionalsTestimonials";
import ProfessionalsFAQ from "@/components/professionals/ProfessionalsFAQ";
import ProfessionalsCTA from "@/components/professionals/ProfessionalsCTA";

export default async function ProfessionalsPage() {
  // sanityFetch returns { data: unknown } — cast to known type after fetching
  const data = (await sanityFetch({ query: professionalsPageQuery })).data as ProfessionalsPageData | null;

  return (
    <>
      {/* 1. Hero — above the fold, "For Healthcare Professionals" audience targeting */}
      <ProfessionalsHero hero={data?.hero} />

      {/* 2. Pain points — empathy with Dr. Amarachi's payment, CPD, and trust frustrations (static) */}
      <ProfessionalsPainPoints />

      {/* 3. Transformation — before/after narrative pivot (deep green) (static) */}
      <ProfessionalsTransformation />

      {/* 4. Features — 6 benefit-led capability cards from Sanity */}
      <ProfessionalsFeatures features={data?.features} />

      {/* 5. How it works — 3 steps to remove complexity and trust barriers (static) */}
      <ProfessionalsHowItWorks />

      {/* 6. Testimonials — peer social proof from Nigerian doctors and nurses from Sanity */}
      <ProfessionalsTestimonials testimonials={data?.testimonials} />

      {/* 7. FAQ — resolves final hesitations (interactive accordion, client component, static) */}
      <ProfessionalsFAQ />

      {/* 8. CTA — final email capture with trust badges, content from Sanity */}
      <ProfessionalsCTA cta={data?.cta} />
    </>
  );
}
