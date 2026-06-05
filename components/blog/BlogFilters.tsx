/**
 * BlogFilters.tsx — Category filter pills for the Blog page
 *
 * Positioned directly below the hero before the featured post.
 * Allows visitors to quickly self-identify their audience segment
 * and locate the content most relevant to them.
 *
 * Design: Horizontal scroll on mobile (overflow-x-auto) so all 5 pills
 * are accessible without wrapping awkwardly on small screens.
 *
 * Functional state: Visual-only for now — "All" is the active default.
 * Real filtering will be wired once blog posts are fetched from Sanity CMS.
 * The active/inactive visual states are ready for that upgrade.
 *
 * Active pill:  bg-brand-dark text-white (filled)
 * Inactive pill: border-brand-dark/30 text-brand-dark/70 (outlined)
 */

/** Filter pill data — edit this array to add/remove/rename categories */
const filters = [
  { label: "All", active: true },
  { label: "For Professionals", active: false },
  { label: "For Employers", active: false },
  { label: "Industry Insights", active: false },
  { label: "CPD & Compliance", active: false },
];

const BlogFilters = () => {
  return (
    <section
      className="py-6"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Blog category filters"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Horizontal scroll wrapper — prevents wrapping on narrow viewports */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              /* Active pill is filled brand-dark; inactive is outlined.
                 pointer-events are here so the visual is correct on all states. */
              className={`
                flex-shrink-0
                px-5 py-2 rounded-full
                text-sm font-semibold
                border transition-all duration-200
                cursor-pointer
                ${filter.active
                  ? "bg-brand-dark text-white border-brand-dark"
                  : "bg-transparent text-brand-dark/70 border-brand-dark/30 hover:border-brand-dark hover:text-brand-dark"
                }
              `}
              aria-pressed={filter.active}
            >
              {filter.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogFilters;
