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
 * 1. BlogHero              — Compact page identity, H1, subheadline (~50vh)
 * 2. BlogFilteredContent   — Category filter pills + filtered article grid
 *                            (client component wrapper — owns activeCategory state)
 *
 * EDITORIAL HIERARCHY
 * 3. BlogFeaturedPost      — One premium full-width article card (always visible)
 *
 * RETENTION
 * 4. BlogNewsletterCTA     — Email newsletter signup to keep readers engaged
 *
 * Architecture note: This page stays a Server Component so `export const metadata`
 * works for SSR SEO. Interactive filtering is isolated in BlogFilteredContent
 * ('use client'), which wraps BlogFilters and BlogGrid. BlogFeaturedPost is an
 * editorial pin — it stays above the grid and is not subject to filtering.
 */

import BlogHero from "@/components/blog/BlogHero";
import BlogFeaturedPost from "@/components/blog/BlogFeaturedPost";
import BlogFilteredContent from "@/components/blog/BlogFilteredContent";
import BlogNewsletterCTA from "@/components/blog/BlogNewsletterCTA";

export const metadata = {
  title: "Resources & Insights",
  description:
    "Practical guides, policy analysis, and career resources for Nigerian healthcare professionals and the hospitals and clinics that employ them.",
};

export default function BlogPage() {
  return (
    <>
      {/* 1. Hero — compact orientation section (~50vh) */}
      <BlogHero />

      {/* 2. Featured post — full-width editorial centrepiece (always visible) */}
      <BlogFeaturedPost />

      {/* 3. Filters + article grid — client component; manages category state */}
      <BlogFilteredContent />

      {/* 4. Newsletter CTA — retains readers who aren't ready to sign up yet */}
      <BlogNewsletterCTA />
    </>
  );
}
