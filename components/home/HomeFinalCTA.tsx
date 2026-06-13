/**
 * HomeFinalCTA.tsx — Closing call-to-action section
 *
 * Dark green (brand-dark) full-width section. Centered layout: tag → headline
 * → supporting copy → two audience-specific CTA buttons.
 *
 * Sits immediately before the footer — this is the last conversion touchpoint
 * for visitors who have scrolled the full page. Extra vertical padding
 * (section-padding-y × 1.5) gives it appropriate visual weight as a closer.
 *
 * Uses MotionSection for scroll-triggered slide-up reveal without needing
 * 'use client' — MotionSection handles the IntersectionObserver internally.
 */

import MotionSection from '@/components/ui/MotionSection'
import SectionTag from '@/components/ui/SectionTag'
import Button from '@/components/ui/Button'

export default function HomeFinalCTA() {
  return (
    <section
      className="bg-brand-dark"
      style={{
        paddingTop: 'calc(var(--section-padding-y) * 1.5)',
        paddingBottom: 'calc(var(--section-padding-y) * 1.5)',
      }}
      aria-label="Join PSL — early access"
    >
      <MotionSection>
        <div className="container-site">
          <div className="flex flex-col items-center text-center gap-6">
            <SectionTag variant="white" label="Early Access" />

            <h2
              className="font-bold text-white"
              style={{
                fontSize: 'var(--text-h2)',
                letterSpacing: 'var(--ls-heading)',
                lineHeight: 1.2,
                maxWidth: '680px',
              }}
            >
              Nigerian healthcare deserves better tools.
            </h2>

            <p
              className="text-white/80"
              style={{
                fontSize: '20px',
                lineHeight: 'var(--lh-body)',
                maxWidth: '560px',
              }}
            >
              Join free. No credit card. No commitment. Early access members get
              priority onboarding and locked early adopter pricing when we go live.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
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
            </div>
          </div>
        </div>
      </MotionSection>
    </section>
  )
}
