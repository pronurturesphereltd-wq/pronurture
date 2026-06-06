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
 * This is a Server Component. All interactivity (accordion, form) is isolated
 * in the two 'use client' sub-components, keeping the page JS bundle lean.
 */

export const metadata = {
  title: "For Healthcare Professionals",
  description:
    "Find verified locum shifts, complete accredited CPD, and grow your healthcare career — built for Nigerian doctors, nurses, and allied health professionals.",
};

import ProfessionalsHero from "@/components/professionals/ProfessionalsHero";
import ProfessionalsPainPoints from "@/components/professionals/ProfessionalsPainPoints";
import ProfessionalsTransformation from "@/components/professionals/ProfessionalsTransformation";
import ProfessionalsFeatures from "@/components/professionals/ProfessionalsFeatures";
import ProfessionalsHowItWorks from "@/components/professionals/ProfessionalsHowItWorks";
import ProfessionalsTestimonials from "@/components/professionals/ProfessionalsTestimonials";
import ProfessionalsFAQ from "@/components/professionals/ProfessionalsFAQ";
import ProfessionalsCTA from "@/components/professionals/ProfessionalsCTA";

export default function ProfessionalsPage() {
  return (
    <>
      {/* 1. Hero — above the fold, "For Healthcare Professionals" audience targeting */}
      <ProfessionalsHero />

      {/* 2. Pain points — empathy with Dr. Amarachi's payment, CPD, and trust frustrations */}
      <ProfessionalsPainPoints />

      {/* 3. Transformation — before/after narrative pivot (deep green) */}
      <ProfessionalsTransformation />

      {/* 4. Features — 6 benefit-led capability cards */}
      <ProfessionalsFeatures />

      {/* 5. How it works — 3 steps to remove complexity and trust barriers */}
      <ProfessionalsHowItWorks />

      {/* 6. Testimonials — peer social proof from Nigerian doctors and nurses */}
      <ProfessionalsTestimonials />

      {/* 7. FAQ — resolves final hesitations (interactive accordion, client component) */}
      <ProfessionalsFAQ />

      {/* 8. CTA — final email capture with trust badges (client component) */}
      <ProfessionalsCTA />
    </>
  );
}
