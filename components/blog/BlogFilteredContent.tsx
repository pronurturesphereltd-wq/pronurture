/**
 * BlogFilteredContent.tsx — Client wrapper for interactive blog filtering
 *
 * Owns the activeCategory state and passes it down to BlogFilters (pill UI)
 * and BlogGrid (filtered post grid). Isolated into its own component so that
 * app/blog/page.tsx can stay a Server Component — preserving SSR and the
 * `export const metadata` SEO config that requires it.
 *
 * Pattern: state sits at the lowest common ancestor of the two components
 * that need it (BlogFilters reads it to show the active pill; BlogGrid reads
 * it to decide which posts to render).
 */

"use client";

import { useState } from "react";
import BlogFilters from "./BlogFilters";
import BlogGrid from "./BlogGrid";

/** All category labels — single source of truth shared by Filters and Grid */
export const BLOG_CATEGORIES = [
  "All",
  "For Professionals",
  "For Employers",
  "Industry Insights",
  "CPD & Compliance",
] as const;

const BlogFilteredContent = () => {
  /** "All" is the default so every post is visible on first load */
  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <>
      {/* Filter pills — clicking one calls setActiveCategory */}
      <BlogFilters
        activeCategory={activeCategory}
        onFilterChange={setActiveCategory}
      />

      {/* Grid — re-renders filtered posts when activeCategory changes */}
      <BlogGrid activeCategory={activeCategory} />
    </>
  );
};

export default BlogFilteredContent;
