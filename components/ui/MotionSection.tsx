'use client'

/**
 * MotionSection.tsx — Scroll-triggered reveal wrapper
 *
 * Wraps any block in a Framer Motion div that fades in and slides up
 * when it enters the viewport. Animates once — does not reverse.
 *
 * Spring parameters are inherited from the nearest MotionConfig provider
 * (set globally in MotionProvider.tsx) but also declared locally as a
 * fallback so the component works standalone.
 *
 * @param children  — content to animate
 * @param className — forwarded to the motion div (e.g. for layout)
 * @param yOffset   — upward entrance distance in px (default 24)
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  yOffset?: number
}

const MotionSection = ({ children, className, yOffset = 24 }: MotionSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  // amount: 0.1 — triggers when 10% of the element is visible
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ type: 'spring', stiffness: 400, damping: 58 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default MotionSection
