'use client'

/**
 * HomeHero.tsx — Homepage hero section
 *
 * Full-bleed dark green card (gradient-hero-dark-bg, border-radius 28px).
 * Left column: tag → H1 → subheadline → two CTAs → fine print.
 * Right column: Sanity image or placehold.co, hidden on mobile.
 *
 * All entrance animations use spring physics with staggered delays (§4 of
 * the design skill). Image uses softSpring (stiffness 200) for a natural
 * scale reveal that feels distinct from the text animations.
 */

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionTag from '@/components/ui/SectionTag'
import Button from '@/components/ui/Button'
import type { HomepageHero } from '@/sanity/lib/types'

const SOFT_SPRING = { type: 'spring', stiffness: 200, damping: 40 } as const

interface HomeHeroProps {
  hero?: HomepageHero | null
}

export default function HomeHero({ hero }: HomeHeroProps) {
  const imageUrl =
    hero?.image?.asset?.url ?? 'https://placehold.co/450x580/103613/ffffff'
  const imageAlt = hero?.image?.alt ?? 'Nigerian healthcare professional'

  return (
    <section
      className="bg-white"
      style={{ paddingTop: '32px', paddingBottom: 'var(--section-padding-y)' }}
      aria-label="Hero"
    >
      <div className="container-site">
        {/* Dark green rounded hero card */}
        <div
          className="p-8 md:p-12 lg:p-[72px]"
          style={{
            background: 'var(--gradient-hero-dark-bg)',
            borderRadius: 'var(--radius-hero-card)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── Left: content ──────────────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 58, delay: 0.1 }}
              >
                <SectionTag variant="white" label="Built exclusively for Nigerian healthcare" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 58, delay: 0.2 }}
                className="font-bold text-white"
                style={{
                  fontSize: 'var(--text-hero)',
                  letterSpacing: 'var(--ls-heading)',
                  lineHeight: 1.15,
                }}
              >
                Nigeria&apos;s healthcare runs on people like you.{' '}
                They&apos;ve never had a platform built for them.{' '}
                Until now.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 58, delay: 0.3 }}
                className="text-white/80"
                style={{
                  fontSize: '20px',
                  maxWidth: '520px',
                  lineHeight: 'var(--lh-body)',
                }}
              >
                For clinical professionals: find verified jobs with salary shown,
                earn MDCN/NMCN-aligned CPD, and pick up locum shifts — from one
                app. For healthcare facilities: reach pre-verified candidates, track
                your team&apos;s CPD compliance, and run your workforce without the
                spreadsheets.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 58, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Button
                  label="I'm a healthcare professional"
                  href="/waitlist?role=professional"
                  variant="primary"
                />
                <Button
                  label="I manage a clinical team"
                  href="/waitlist?role=employer"
                  variant="secondary"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 58, delay: 0.5 }}
                className="text-white/60"
                style={{ fontSize: '15px' }}
              >
                Free to join. No credit card required.
              </motion.p>
            </div>

            {/* ── Right: image (desktop only) ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SOFT_SPRING, delay: 0.1 }}
              className="hidden lg:block relative"
              style={{ height: '580px', borderRadius: '20px', overflow: 'hidden' }}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 450px, 0px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
