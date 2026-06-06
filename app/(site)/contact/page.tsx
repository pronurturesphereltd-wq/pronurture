/**
 * app/(site)/contact/page.tsx — Contact page (route: /contact)
 *
 * Purpose: Primary inbound contact destination. Linked from:
 *   - Footer "Contact Us" link
 *   - AboutCTA "Contact Us" button
 *
 * This is a focused, low-friction contact page. There is no waiting for
 * a form submission to land in a backend — the form builds a mailto: link
 * and triggers the visitor's email client, keeping the flow simple and
 * dependency-free for this pre-launch stage.
 *
 * Section order (deliberate):
 *
 *   1. ContactHero — Compact orientation (~40vh). Badge + H1 + subheadline.
 *                    Sets the warm, welcoming tone before the visitor sees
 *                    the form. No CTA buttons — the form is the action.
 *
 *   2. ContactMain — Two columns: contact details (left) + form card (right).
 *                    Above-the-second-fold — visible after one short scroll.
 *                    The form uses mailto: to open the visitor's email client.
 *
 *   3. ContactFAQ  — Four accordion questions that handle hesitations for
 *                    visitors who scrolled past the form without submitting.
 *
 * Architecture: This page is a Server Component so `export const metadata`
 * works for SSR SEO. Both sub-components have their own 'use client' state
 * (ContactMain for form, ContactFAQ for accordion).
 */

import ContactHero from "@/components/contact/ContactHero";
import ContactMain from "@/components/contact/ContactMain";
import ContactFAQ from "@/components/contact/ContactFAQ";

/**
 * SEO metadata for /contact.
 * Optimised for search intent around "contact healthcare platform Nigeria"
 * and "ProNurtureSphere demo request".
 */
export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the ProNurtureSphere team — for healthcare professionals, facilities, and partners. We read every message and respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Hero — compact orientation, badge + H1 + subheadline (~40vh) */}
      <ContactHero />

      {/* 2. Contact details (left) + form card (right) — core of the page */}
      <ContactMain />

      {/* 3. FAQ — handles objections for visitors who scrolled past the form */}
      <ContactFAQ />
    </>
  );
}
