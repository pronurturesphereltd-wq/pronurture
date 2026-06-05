/**
 * app/waitlist/page.tsx — Waitlist / Early Access page (route: /waitlist)
 *
 * This is the primary conversion destination for every CTA button across
 * the site. Every "Get Early Access" button in Navbar, HeroSection,
 * EmployersCTA, ProfessionalsCTA, and AboutCTA links to this route.
 *
 * Design intent:
 *   - Single, focused goal: get the visitor to submit the waitlist form
 *   - No competing CTAs or distractions — the entire page is the funnel
 *   - FAQ below the form handles final hesitations without sending the
 *     visitor away from the page
 *
 * Section order (deliberate):
 *
 *   1. WaitlistForm  — The pitch (left) + form card (right).
 *                      Above the fold. Answers: what do I get, how do I join?
 *
 *   2. WaitlistFAQ   — Handles objections. Placed BELOW the fold so
 *                      high-intent visitors (who scroll past the form)
 *                      get their questions answered and scroll back up.
 *
 * Architecture:
 *   This page is a Server Component so `export const metadata` works for
 *   SEO. Both components have their own internal state via 'use client'
 *   (WaitlistForm for form submission, WaitlistFAQ for accordion).
 */

import WaitlistForm from "@/components/waitlist/WaitlistForm";
import WaitlistFAQ from "@/components/waitlist/WaitlistFAQ";

/**
 * SEO metadata for /waitlist.
 * Title and description are optimised for search intent around "early access"
 * and "healthcare platform Nigeria."
 */
export const metadata = {
  title: "Join the Waitlist — ProNurtureSphere Early Access",
  description:
    "Get free early access to ProNurtureSphere — Nigeria's digital healthcare staffing, CPD, and workforce management platform. Priority onboarding, no credit card required.",
};

export default function WaitlistPage() {
  return (
    <>
      {/* 1. Form — pitch (left) + signup card (right) — fills the viewport */}
      <WaitlistForm />

      {/* 2. FAQ — answers objections for visitors who scrolled past the form */}
      <WaitlistFAQ />
    </>
  );
}
