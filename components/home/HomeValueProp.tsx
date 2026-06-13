'use client'

/**
 * HomeValueProp.tsx — Dual-audience value propositions
 *
 * Off-white (brand-offwhite) background section with two columns:
 *   Left  — clinical professionals: 6 checklist items
 *   Right — healthcare facilities:  5 checklist items
 *
 * Each checklist item stagger-reveals on scroll intersection (index * 0.06s).
 * Both columns share the same useInView ref so their stagger plays together.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import Button from '@/components/ui/Button'

const PROFESSIONALS_ITEMS = [
  'Verified jobs with salary shown on every listing',
  'One-tap apply using your saved professional profile',
  'MDCN/NMCN-aligned CPD on your phone — offline if needed',
  'Real-time CPD tracker — always know where you stand',
  'Digital certificate wallet for all credentials',
  'Locum shifts at verified facilities — no agencies',
]

const EMPLOYERS_ITEMS = [
  'Pre-verified candidate pool — MDCN/NMCN confirmed before they reach you',
  'CPD compliance dashboard — full team status, auto-renewal reminders',
  'Digital staff records — contracts, certificates, inspection-ready',
  'Locum on demand — fill urgent gaps in hours, not weeks',
  'Named support contact on WhatsApp — a real person, not a ticket',
]

export default function HomeValueProp() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      className="bg-brand-offwhite"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-label="Platform value propositions"
    >
      <div className="container-site">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: For professionals ──────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <SectionTag variant="green" label="For healthcare professionals" />

            <h2
              className="font-bold text-brand-dark"
              style={{
                fontSize: 'var(--text-h2)',
                letterSpacing: 'var(--ls-heading)',
                lineHeight: 1.2,
              }}
            >
              Your career. Finally a platform built for it.
            </h2>

            <p
              className="text-brand-gray"
              style={{ fontSize: '17px', maxWidth: '480px', lineHeight: 'var(--lh-body)' }}
            >
              Every registered clinical professional in Nigeria — nurses, midwives,
              doctors, pharmacists, physiotherapists, lab scientists, radiographers, and
              CHEWs — has been navigating their career without the right tools. PSL was
              built to fix that.
            </p>

            <ul className="flex flex-col gap-3" role="list">
              {PROFESSIONALS_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 58,
                    delay: i * 0.06,
                  }}
                  className="flex items-start gap-3"
                >
                  <Check
                    size={18}
                    className="text-brand-dark flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span
                    className="text-brand-dark"
                    style={{ fontSize: '17px', lineHeight: 1.5 }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <Button
              label="See what PSL offers professionals →"
              href="/professionals"
              variant="text-link"
            />
          </div>

          {/* ── Right: For employers ─────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <SectionTag variant="green" label="For healthcare facilities" />

            <h2
              className="font-bold text-brand-dark"
              style={{
                fontSize: 'var(--text-h2)',
                letterSpacing: 'var(--ls-heading)',
                lineHeight: 1.2,
              }}
            >
              Stop hiring blind. Every candidate verified before you.
            </h2>

            <p
              className="text-brand-gray"
              style={{ fontSize: '17px', lineHeight: 'var(--lh-body)' }}
            >
              Right now you&apos;re filling vacancies through WhatsApp and walk-ins —
              then discovering credential problems after the offer. PSL flips that.
            </p>

            <ul className="flex flex-col gap-3" role="list">
              {EMPLOYERS_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 58,
                    delay: i * 0.06,
                  }}
                  className="flex items-start gap-3"
                >
                  <Check
                    size={18}
                    className="text-brand-dark flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span
                    className="text-brand-dark"
                    style={{ fontSize: '17px', lineHeight: 1.5 }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <Button
              label="See what PSL offers employers →"
              href="/employers"
              variant="text-link"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
