/**
 * BlogImagePlaceholder.tsx — Branded gradient placeholder for blog post images
 *
 * Renders a CSS gradient background using brand colors (#103613, #7a853e, #c09e5a)
 * with the post's title initials overlaid in low-opacity white. Each post gets a
 * distinct gradient determined by a hash of its title, so the same post always
 * renders the same gradient across the blog listing, featured card, related posts,
 * and the individual article page.
 *
 * Designed to be dropped in wherever a blog <img> would appear — accepts the
 * same className the <img> had so it fits the existing layout without changes.
 */

const GRADIENTS = [
  'linear-gradient(135deg, #103613 0%, #7a853e 100%)',
  'linear-gradient(225deg, #7a853e 0%, #c09e5a 100%)',
  'linear-gradient(45deg,  #103613 0%, #c09e5a 100%)',
  'linear-gradient(315deg, #7a853e 0%, #103613 100%)',
  'linear-gradient(90deg,  #c09e5a 0%, #103613 100%)',
  'linear-gradient(160deg, #103613 20%, #c09e5a 100%)',
  'linear-gradient(250deg, #c09e5a 0%, #7a853e 100%)',
  'linear-gradient(20deg,  #7a853e 0%, #103613 80%)',
]

/** Deterministic gradient pick — same title always yields the same gradient */
function pickGradient(title: string): string {
  const hash = [...title].reduce((sum, c) => sum + c.charCodeAt(0), 0)
  return GRADIENTS[hash % GRADIENTS.length]
}

/** Two-letter initials from the first two significant words of the title */
function getInitials(title: string): string {
  return title
    .replace(/[^a-zA-Z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

interface BlogImagePlaceholderProps {
  /** Post title — used to derive a unique gradient and initials */
  title: string
  /** Pass the same className you would give the <img> it replaces */
  className?: string
}

const BlogImagePlaceholder = ({
  title,
  className = '',
}: BlogImagePlaceholderProps) => (
  <div
    className={`flex items-center justify-center select-none ${className}`}
    style={{ background: pickGradient(title) }}
    role="img"
    aria-label={`Placeholder image for: ${title}`}
  >
    <span className="text-white/20 font-black text-5xl tracking-tighter">
      {getInitials(title)}
    </span>
  </div>
)

export default BlogImagePlaceholder
