'use client'

/**
 * HomeHowItWorks.tsx — "Up and running in three steps."
 *
 * Three alternating steps (image|connector|text / text|connector|image).
 *
 * Desktop layout (lg:): a 3-column grid per step — content · connector · content.
 * The connector column contains a flex column of: spacer line → dot → spacer line.
 * Lines are brand-dark/20; the first step hides its top line, the last hides its
 * bottom line, giving a continuous vertical timeline effect across all three steps.
 *
 * Framer Motion scroll-triggered directional reveals (design skill §4 Pattern D):
 *   Odd steps  — image slides from x:-20, text from x:+20
 *   Even steps — text slides from x:-20, image from x:+20
 *
 * Mobile (< lg): single-column stack, images hidden for cleaner reading.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import SectionTag from '@/components/ui/SectionTag'
import Button from '@/components/ui/Button'

interface StepConfig {
  num: string
  title: string
  body: string
  imageUrl: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
  isImageLeft: boolean
  isFirst: boolean
  isLast: boolean
}

const STEPS: StepConfig[] = [
  {
    num: '01',
    title: 'Create your free profile',
    body: 'Add your discipline, MDCN or NMCN registration number, qualifications, and preferred locations. Takes under 10 minutes. Your credentials are stored once and used everywhere.',
    imageUrl: 'https://placehold.co/500x295/103613/ffffff',
    imageAlt: 'Step 1 — Create your professional profile',
    ctaLabel: 'Discover more',
    ctaHref: '/professionals',
    isImageLeft: true,
    isFirst: true,
    isLast: false,
  },
  {
    num: '02',
    title: 'Browse jobs, CPD, and locum shifts',
    body: 'Your personalised feed shows verified jobs in your specialty and state, CPD modules relevant to your discipline, and available locum shifts near you. Every listing shows the salary.',
    imageUrl: 'https://placehold.co/500x295/7a853e/ffffff',
    imageAlt: 'Step 2 — Browse your personalised feed',
    ctaLabel: 'Discover more',
    ctaHref: '/professionals',
    isImageLeft: false,
    isFirst: false,
    isLast: false,
  },
  {
    num: '03',
    title: 'Apply, earn, and grow',
    body: 'Apply in one tap. Study CPD offline. Pick up locum shifts. Every step builds your professional record on PSL.',
    imageUrl: 'https://placehold.co/500x295/c09e5a/ffffff',
    imageAlt: 'Step 3 — Apply, earn, and grow your career',
    ctaLabel: 'Get started free',
    ctaHref: '/waitlist?role=professional',
    isImageLeft: true,
    isFirst: false,
    isLast: true,
  },
]

function StepRow({ step }: { step: StepConfig }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  // Directional slide: image and text come from opposite sides
  const imageX = step.isImageLeft ? -20 : 20
  const textX = step.isImageLeft ? 20 : -20

  const imageEl = (
    <motion.div
      initial={{ opacity: 0, x: imageX }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageX }}
      transition={{ type: 'spring', stiffness: 400, damping: 58, delay: 0.1 }}
      className="hidden lg:block relative"
      style={{ height: '295px', borderRadius: '20px', overflow: 'hidden' }}
    >
      <Image
        src={step.imageUrl}
        alt={step.imageAlt}
        fill
        sizes="(min-width: 1024px) 500px, 0px"
        style={{ objectFit: 'cover' }}
      />
    </motion.div>
  )

  const textEl = (
    <motion.div
      initial={{ opacity: 0, x: textX }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: textX }}
      transition={{ type: 'spring', stiffness: 400, damping: 58, delay: 0.2 }}
      className="flex flex-col gap-4 justify-center"
    >
      <span className="font-bold text-brand-gold" style={{ fontSize: '17px' }}>
        {step.num}
      </span>
      <h3
        className="font-bold text-brand-dark"
        style={{
          fontSize: 'var(--text-h3)',
          letterSpacing: 'var(--ls-heading)',
          lineHeight: 1.25,
        }}
      >
        {step.title}
      </h3>
      <p
        className="text-brand-gray"
        style={{ fontSize: '17px', lineHeight: 'var(--lh-body)' }}
      >
        {step.body}
      </p>
      <Button label={step.ctaLabel} href={step.ctaHref} variant="text-link" />
    </motion.div>
  )

  return (
    <div ref={ref}>
      {/* ── Desktop: 3-col layout with timeline connector ─────────────── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] gap-8 items-stretch">
        {step.isImageLeft ? imageEl : textEl}

        {/* Timeline connector column */}
        <div className="flex flex-col items-center">
          {/* Top line — hidden on first step */}
          <div
            className="w-0.5 flex-1 bg-brand-dark/20"
            style={{
              minHeight: '32px',
              visibility: step.isFirst ? 'hidden' : 'visible',
            }}
            aria-hidden="true"
          />
          {/* Numbered dot */}
          <div
            className="flex-shrink-0 flex items-center justify-center bg-brand-dark text-white rounded-full font-medium"
            style={{ width: '30px', height: '30px', fontSize: '14px' }}
          >
            {step.num}
          </div>
          {/* Bottom line — hidden on last step */}
          <div
            className="w-0.5 flex-1 bg-brand-dark/20"
            style={{
              minHeight: '32px',
              visibility: step.isLast ? 'hidden' : 'visible',
            }}
            aria-hidden="true"
          />
        </div>

        {step.isImageLeft ? textEl : imageEl}
      </div>

      {/* ── Mobile: content only, no image ────────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-4">
        <span className="font-bold text-brand-gold" style={{ fontSize: '17px' }}>
          {step.num}
        </span>
        <h3
          className="font-bold text-brand-dark"
          style={{
            fontSize: 'var(--text-h3)',
            letterSpacing: 'var(--ls-heading)',
            lineHeight: 1.25,
          }}
        >
          {step.title}
        </h3>
        <p
          className="text-brand-gray"
          style={{ fontSize: '17px', lineHeight: 'var(--lh-body)' }}
        >
          {step.body}
        </p>
        <Button label={step.ctaLabel} href={step.ctaHref} variant="text-link" />
      </div>
    </div>
  )
}

export default function HomeHowItWorks() {
  return (
    <section
      className="bg-brand-offwhite"
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
      aria-label="How PSL works — three steps"
    >
      <div className="container-site">
        {/* Section header */}
        <div className="text-center mb-16">
          <SectionTag variant="green" label="How it works" />
          <h2
            className="font-bold text-brand-dark mt-4"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: 'var(--ls-heading)',
              lineHeight: 1.2,
            }}
          >
            Up and running in three steps.
          </h2>
        </div>

        {/* Steps — gap-10 on mobile to separate stacked content */}
        <div className="flex flex-col gap-10 lg:gap-0">
          {STEPS.map((step) => (
            <StepRow key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
