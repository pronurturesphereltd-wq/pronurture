/**
 * app/blog/page.tsx — Blog / Resources page (route: /blog)
 *
 * Target audience: Both buyer personas + anyone searching for Nigerian healthcare content.
 * Purpose: Thought leadership, SEO, and trust-building through useful content.
 *          Educates visitors who aren't yet ready to sign up — the "educate before
 *          selling" content strategy.
 *
 * Section order — designed for a content-discovery flow:
 *
 * ORIENTATION
 * 1. BlogHero          — Compact page identity, H1, subheadline (~50vh)
 * 2. BlogFilters       — Category filter pills for content self-selection
 *
 * EDITORIAL HIERARCHY
 * 3. BlogFeaturedPost  — One premium full-width article card (Industry Insights)
 * 4. BlogGrid          — Responsive 3-column grid of 9 articles
 *
 * RETENTION
 * 5. BlogNewsletterCTA — Email newsletter signup to keep readers engaged
 *
 * This is a Server Component. The only interactive element (newsletter form)
 * is isolated in BlogNewsletterCTA which is marked 'use client' internally.
 */

import BlogHero from "@/components/blog/BlogHero";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogFeaturedPost from "@/components/blog/BlogFeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogNewsletterCTA from "@/components/blog/BlogNewsletterCTA";

export const metadata = {
  title: "Resources & Insights — ProNurtureSphere",
  description:
    "Practical guides, industry analysis, and career resources for Nigerian healthcare professionals and the facilities that employ them.",
};

export default function BlogPage() {
  return (
    <>
      {/* 1. Hero — compact orientation section (~50vh) */}
      <BlogHero />

      {/* 2. Category filter pills — visual self-selection for content */}
      <BlogFilters />

      {/* 3. Featured post — full-width editorial centrepiece */}
      <BlogFeaturedPost />

      {/* 4. Article grid — 9-card responsive 3-column layout */}
      <BlogGrid />

      {/* 5. Newsletter CTA — retains readers who aren't ready to sign up yet */}
      <BlogNewsletterCTA />
    </>
  );
}
