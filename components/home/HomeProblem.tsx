'use client'

/**
 * HomeProblem.tsx — "The system wasn't built for either of you."
 *
 * Two contrast cards stacked side-by-side:
 *   Left  (brand-dark bg): clinical professional pain points
 *   Right (brand-green bg): healthcare facility pain points
 *
 * Each card names the symptom the persona recognises, then closes with a
 * reframing line that positions PSL as the solution to a systemic gap —
 * not a personal failing.
 *
 * Cards reveal with staggered spring on scroll intersection (useInView).
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Stethoscope, Building2, type LucideIcon } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'

interface CardConfig {
  bg: string
  Icon: LucideIcon
  tag: string
  heading: string
  body: string
  closing: string
  delay: number
}

const CARDS: CardConfig[] = [
  {
    bg: 'bg-brand-dark',
    Icon: Stethoscope,
    tag: 'For clinical professionals',
    heading: "You've applied through WhatsApp groups and heard nothing back.",
    body: "You've taken a job where the salary was never shown — and it was half what you expected. You know your NMCN renewal is coming but you're not sure which CPD counts or how many points you have.",
    closing:
      "That's not a you problem. That's a system built against you. PSL fixes the system.",
    delay: 0.1,
  },
  {
    bg: 'bg-brand-green',
    Icon: Building2,
    tag: 'For healthcare facilities',
    heading: 'Filling one vacancy takes months of WhatsApp messages and walk-ins.',
    body: "You've hired someone whose licence had lapsed. Your staff manage their own CPD — you have no way to know who's compliant until renewal time arrives.",
    closing:
      "That's not a staffing problem. That's what happens when no tool was ever built for you. PSL fixes that.",
    delay: 0.2,
  },
]

export default function HomeProblem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      className="bg-white"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-label="The problem PSL solves"
    >
      <div className="container-site">
        <h2
          className="font-bold text-brand-dark text-center mb-12"
          style={{
            fontSize: 'var(--text-h2)',
            letterSpacing: 'var(--ls-heading)',
            lineHeight: 1.2,
          }}
        >
          The system wasn&apos;t built for either of you.
        </h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card) => (
            <motion.div
              key={card.tag}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 58,
                delay: card.delay,
              }}
              className={`${card.bg} flex flex-col gap-5`}
              style={{
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {/* Icon + eyebrow tag */}
              <div className="flex items-center gap-3">
                <card.Icon size={24} className="text-white flex-shrink-0" aria-hidden="true" />
                <SectionTag variant="white" label={card.tag} />
              </div>

              <h3
                className="font-bold text-white"
                style={{ fontSize: '24px', lineHeight: 1.25 }}
              >
                {card.heading}
              </h3>

              <p
                className="text-white/80"
                style={{ fontSize: '17px', lineHeight: 'var(--lh-body)' }}
              >
                {card.body}
              </p>

              <p
                className="font-bold text-white"
                style={{ fontSize: '17px', lineHeight: 1.5 }}
              >
                {card.closing}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
