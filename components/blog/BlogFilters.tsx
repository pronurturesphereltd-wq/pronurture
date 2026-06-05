/**
 * BlogFilters.tsx — Category filter pills for the Blog page
 *
 * Positioned directly below the hero before the featured post.
 * Allows visitors to quickly self-identify their audience segment
 * and locate the content most relevant to them.
 *
 * State: activeCategory and onFilterChange are lifted up to BlogFilteredContent
 * so that this component stays pure and BlogGrid re-renders in sync.
 *
 * Design: Horizontal scroll on mobile (overflow-x-auto) so all pills are
 * accessible on narrow screens without awkward wrapping.
 *
 * Active pill:   bg-brand-dark text-white border-brand-dark (filled)
 * Inactive pill: border-brand-dark/30 text-brand-dark/70   (outlined)
 */

/** Category labels — static list rendered as pills */
const FILTER_LABELS = [
  "All",
  "For Professionals",
  "For Employers",
  "Industry Insights",
  "CPD & Compliance",
];

interface BlogFiltersProps {
  /** The currently active category — "All" means no filter applied */
  activeCategory: string;
  /** Called with the new category label when a pill is clicked */
  onFilterChange: (category: string) => void;
}

const BlogFilters = ({ activeCategory, onFilterChange }: BlogFiltersProps) => {
  return (
    <section
      className="py-6"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Blog category filters"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Horizontal scroll wrapper — prevents wrapping on narrow viewports */}
        <div
          className="flex items-center gap-3 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter articles by category"
        >
          {FILTER_LABELS.map((label) => {
            const isActive = activeCategory === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onFilterChange(label)}
                aria-pressed={isActive}
                className={`
                  flex-shrink-0
                  px-5 py-2 rounded-full
                  text-sm font-semibold
                  border transition-all duration-200
                  cursor-pointer
                  ${isActive
                    ? "bg-brand-dark text-white border-brand-dark shadow-sm"
                    : "bg-transparent text-brand-dark/70 border-brand-dark/30 hover:border-brand-dark hover:text-brand-dark"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BlogFilters;
