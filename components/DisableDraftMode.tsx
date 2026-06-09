'use client'

/**
 * DisableDraftMode.tsx
 *
 * A fixed-position banner shown only when Next.js Draft Mode is active (i.e.
 * an editor has opened a live preview via the Sanity Presentation tool).
 * Clicking "Exit preview" calls /api/draft-mode/disable which turns off draft
 * mode and redirects back to the current page in production view.
 *
 * Hidden automatically when inside the Presentation tool iframe so the banner
 * does not appear as a floating element inside the Studio overlay.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsPresentationTool } from 'next-sanity/hooks'

const DisableDraftMode = () => {
  // Do not render the banner inside the Presentation tool iframe
  const isPresentationTool = useIsPresentationTool()
  const pathname = usePathname()

  if (isPresentationTool) return null

  const disableUrl = `/api/draft-mode/disable?redirect=${encodeURIComponent(pathname)}`

  return (
    <div
      className="
        fixed bottom-4 right-4 z-50
        flex items-center gap-3
        bg-brand-dark text-white
        rounded-full px-5 py-2.5
        shadow-lg text-sm font-medium
      "
      role="status"
      aria-live="polite"
    >
      <span className="flex items-center gap-1.5">
        {/* Live preview indicator dot */}
        <span
          className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"
          aria-hidden="true"
        />
        Draft mode active
      </span>
      <Link
        href={disableUrl}
        className="
          bg-white text-brand-dark rounded-full px-3 py-1
          text-xs font-semibold
          hover:bg-brand-gold hover:text-brand-dark
          transition-colors cursor-pointer
        "
      >
        Exit preview
      </Link>
    </div>
  )
}

export default DisableDraftMode
