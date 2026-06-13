'use client'

/**
 * HomeTrustData.tsx — "The numbers that show why PSL exists."
 *
 * Dark green (brand-dark) background section. Six stat cards in a 3×2 grid.
 * Data is from published research and PSL's own May 2026 clinical workforce
 * survey (n=40 professionals, 13 states across Nigeria).
 *
 * Cards stagger on scroll reveal: index * 0.08s delay, y 10→0 (design skill
 * §4 Pattern C — subtle lift). Source attribution shown at low opacity so it
 * doesn't compete with the headline number.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  {
    value: '72,000+',
    label: 'Nigerian nurses with lapsed licences every year',
    source: 'MDCN Annual Report',
  },
  {
    value: '1 : 8,000',
    label: "Doctor-to-patient ratio vs WHO's 1:600 target",
    source: 'WHO Health Workforce Data',
  },
  {
    value: '52.5%',
    label: "have taken a job that didn't match its listing",
    source: 'PSL Survey, May 2026 — 40 professionals, 13 states',
  },
  {
    value: '62.5%',
    label: 'behind, uncertain of, or not tracking CPD requirements',
    source: 'PSL Survey, May 2026',
  },
  {
    value: '87%',
    label: 'would complete accredited CPD on mobile if quality is right',
    source: 'PSL Survey, May 2026',
  },
  {
    value: '97.5%',
    label: 'of clinical professionals open to new opportunities',
    source: 'PSL Survey, May 2026',
  },
]

export default function HomeTrustData() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      className="bg-brand-dark"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-label="Statistics showing why PSL exists"
    >
      <div className="container-site">
        <h2
          className="font-bold text-white text-center mb-12"
          style={{
            fontSize: 'var(--text-h2)',
            letterSpacing: 'var(--ls-heading)',
            lineHeight: 1.2,
          }}
        >
          The numbers that show why PSL exists.
        </h2>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 58,
                delay: i * 0.08,
              }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                className="font-bold text-brand-gold"
                style={{
                  fontSize: '48px',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-white mt-3"
                style={{ fontSize: '17px', lineHeight: 'var(--lh-body)' }}
              >
                {stat.label}
              </p>
              <p
                className="text-white/50 mt-2"
                style={{ fontSize: '13px', lineHeight: 1.4 }}
              >
                {stat.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
