/**
 * app/page.tsx — Homepage (route: /)
 *
 * This is the entry point for all visitors to the ProNurtureSphere website.
 * It assembles all homepage sections in the correct conversion-optimised order:
 *
 * 1. HeroSection       — Grabs attention, communicates value proposition, drives CTAs
 * 2. SocialProofBar    — Establishes credibility immediately after the hero
 * 3. ProblemSection    — Agitates pain points — creates empathy and urgency
 * 4. FeaturesSection   — Presents the solution (id="features" anchor target)
 * 5. AudienceSection   — Speaks directly to each persona, self-segmentation UX
 * 6. TestimonialsSection — Social proof from real users
 * 7. StatsSection      — Reinforces scale and reliability with hard numbers
 * 8. BlogPreviewSection — Thought leadership, SEO value, educates hesitant visitors
 * 9. WaitlistSection   — Final conversion opportunity for all visitors
 *
 * This is a Server Component — all sections are either static or have their own
 * client boundaries ('use client') where interactivity is needed (Navbar, Waitlist).
 */

export const metadata = {
  title: "Smarter Staffing for Nigerian Healthcare",
  description:
    "ProNurtureSphere gives Nigerian hospitals, clinics, and staffing agencies a single platform for shift posting, credential verification, rostering, payroll, and CPD training.",
};

import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import WaitlistSection from "@/components/WaitlistSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — above the fold, answers: What? Who? Why? */}
      <HeroSection />

      {/* 2. Social proof bar — quick trust signals after the hero */}
      <SocialProofBar />

      {/* 3. Problem — agitate the pain before presenting the solution */}
      <ProblemSection />

      {/* 4. Features — the solution reveal, anchored via #features */}
      <FeaturesSection />

      {/* 5. Audience split — self-segmentation for employers and professionals */}
      <AudienceSection />

      {/* 6. Testimonials — social proof from real healthcare teams */}
      <TestimonialsSection />

      {/* 7. Stats — reinforce scale with large, impactful numbers */}
      <StatsSection />

      {/* 8. Blog preview — thought leadership, educates hesitant visitors */}
      <BlogPreviewSection />

      {/* 9. Waitlist — final, high-visibility conversion CTA */}
      <WaitlistSection />
    </>
  );
}
