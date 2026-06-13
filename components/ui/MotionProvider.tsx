'use client'

/**
 * MotionProvider.tsx — Global Framer Motion config
 *
 * Wraps the entire site in a MotionConfig so all motion components
 * share the same spring defaults without repeating transition props.
 *
 * Kept as a separate client component so app/(site)/layout.tsx stays
 * async (needed for Sanity data fetching) — a layout with 'use client'
 * cannot also be async.
 */

import { MotionConfig } from 'framer-motion'

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig transition={{ type: 'spring', stiffness: 400, damping: 58 }}>
      {children}
    </MotionConfig>
  )
}
