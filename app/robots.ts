/**
 * app/robots.ts — Robots crawling rules
 *
 * Next.js auto-serves this as /robots.txt.
 * Allows all crawlers to index the public site while blocking the Sanity
 * Studio (/studio) and internal API routes (/api) from being indexed.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/"],
    },
    sitemap: "https://pronurture.vercel.app/sitemap.xml",
  };
}
