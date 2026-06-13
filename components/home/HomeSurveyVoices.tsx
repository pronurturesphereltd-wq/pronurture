'use client'

/**
 * HomeSurveyVoices.tsx — "What we heard from the field."
 *
 * Three verbatim quotes from PSL's May 2026 clinical workforce survey.
 * Attributed by professional role and state only — no names published without
 * written consent.
 *
 * The brand-gold left border gives each card a warm accent and signals the
 * content is a direct voice from the field (distinct from PSL's own copy).
 * Cards stagger on scroll reveal (index * 0.1s).
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const QUOTES = [
  {
    text: 'The gap between your actual skills and experience and real career growth opportunities.',
    attribution: '— Registered Nurse, 4 years experience, Edo State',
  },
  {
    text: 'Poor knowledge on how to go about professional development in the best, cheapest possible way — despite the will.',
    attribution: '— Nurse-Midwife, 7 years experience, Lagos State',
  },
  {
    text: 'Takes too long to find qualified people. By the time we find someone, the person we wanted has taken another role.',
    attribution: '— Medical Director, Private Hospital, Edo State',
  },
]

export default function HomeSurveyVoices() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      className="bg-white"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-label="Survey voices from Nigerian healthcare professionals"
    >
      <div className="container-site">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className="font-bold text-brand-dark"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: 'var(--ls-heading)',
              lineHeight: 1.2,
            }}
          >
            What we heard from the field.
          </h2>
          <p
            className="text-brand-gray mt-4"
            style={{ fontSize: '17px', lineHeight: 'var(--lh-body)' }}
          >
            From 40 clinical professionals and 5 healthcare facility managers
            across Nigeria. May 2026.
          </p>
        </div>

        {/* Quote cards */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {QUOTES.map((quote, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 58,
                delay: i * 0.1,
              }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
                borderLeft: '3px solid #c09e5a',
              }}
            >
              <p
                className="text-brand-near-black"
                style={{
                  fontSize: '18px',
                  fontStyle: 'italic',
                  lineHeight: 'var(--lh-body)',
                }}
              >
                &ldquo;{quote.text}&rdquo;
              </p>
              <footer
                className="text-brand-gray mt-4"
                style={{ fontSize: '14px' }}
              >
                {quote.attribution}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Source note */}
        <p
          className="text-brand-gray text-center mt-8 italic"
          style={{ fontSize: '13px' }}
        >
          Source: PSL Clinical Workforce Survey, May 2026. All quotes verbatim.
          Attributed by professional role and state only — no names published without
          written consent.
        </p>
      </div>
    </section>
  )
}
