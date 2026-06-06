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
 * 6. EmployersTestimonials   — Peer social proof from other administrators
 *
 * ACTION
 * 7. EmployersFAQ  — Handles final objections (interactive accordion — client component)
 * 8. EmployersCTA  — Final email capture with trust badges (client component)
 *
 * This is a Server Component. All interactivity (accordion, form) is isolated
 * in the two 'use client' sub-components, keeping the page bundle lean.
 */

export const metadata = {
  title: "For Healthcare Employers",
  description:
    "Ditch spreadsheets and WhatsApp rosters. ProNurtureSphere gives Nigerian facilities shift posting, credential checks, rostering, and payroll in one place.",
};

import EmployersHero from "@/components/employers/EmployersHero";
import EmployersPainPoints from "@/components/employers/EmployersPainPoints";
import EmployersTransformation from "@/components/employers/EmployersTransformation";
import EmployersFeatures from "@/components/employers/EmployersFeatures";
import EmployersHowItWorks from "@/components/employers/EmployersHowItWorks";
import EmployersTestimonials from "@/components/employers/EmployersTestimonials";
import EmployersFAQ from "@/components/employers/EmployersFAQ";
import EmployersCTA from "@/components/employers/EmployersCTA";

export default function EmployersPage() {
  return (
    <>
      {/* 1. Hero — above the fold, "For Healthcare Facilities" audience targeting */}
      <EmployersHero />

      {/* 2. Pain points — empathy with staffing/admin/compliance frustrations */}
      <EmployersPainPoints />

      {/* 3. Transformation — before/after narrative pivot */}
      <EmployersTransformation />

      {/* 4. Features — 6 benefit-led capability cards */}
      <EmployersFeatures />

      {/* 5. How it works — 3 steps to counter implementation fear */}
      <EmployersHowItWorks />

      {/* 6. Testimonials — social proof from hospital administrators */}
      <EmployersTestimonials />

      {/* 7. FAQ — resolves final objections (interactive, client component) */}
      <EmployersFAQ />

      {/* 8. CTA — final email capture with trust badges (client component) */}
      <EmployersCTA />
    </>
  );
}
