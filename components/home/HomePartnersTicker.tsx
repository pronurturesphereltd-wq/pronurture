/**
 * HomePartnersTicker.tsx — Horizontal partners logo ticker
 *
 * Reads from Sanity partnersQuery. Shows the partner logo via next/image
 * when the Sanity document has one, otherwise falls back to the partner name
 * as text.
 *
 * The marquee uses a CSS animation (animate-marquee from globals.css).
 * The partners array is doubled so when the first copy scrolls to the 50%
 * mark the reset to position 0 is visually seamless.
 *
 * Edge fade: two absolute-positioned gradient overlay divs replace CSS
 * ::before / ::after pseudo-elements (which can't be written in JSX).
 */

import Image from 'next/image'
import MotionSection from '@/components/ui/MotionSection'
import type { SanityPartner } from '@/sanity/lib/types'

interface HomePartnersTickerProps {
  partners: SanityPartner[]
}

export default function HomePartnersTicker({ partners }: HomePartnersTickerProps) {
  if (partners.length === 0) return null

  // Double for seamless CSS marquee loop
  const items = [...partners, ...partners]

  return (
    <MotionSection>
      <section
        className="bg-white"
        style={{
          paddingTop: 'var(--section-padding-y)',
          paddingBottom: 'var(--section-padding-y)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
        aria-label="Trusted partners"
      >
        {/* Label */}
        <div className="container-site mb-8 text-center">
          <p
            className="font-medium text-brand-dark uppercase"
            style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--ls-caps)' }}
          >
            Trusted Partners
          </p>
          <p className="text-brand-gray mt-2" style={{ fontSize: 'var(--text-sm)' }}>
            Working with Nigeria&apos;s leading healthcare bodies.
          </p>
        </div>

        {/* Scrolling marquee with fade edges */}
        <div className="relative overflow-hidden">
          {/* Left fade overlay */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '120px', background: 'var(--gradient-fade-left)' }}
            aria-hidden="true"
          />
          {/* Right fade overlay */}
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{ width: '120px', background: 'var(--gradient-fade-right)' }}
            aria-hidden="true"
          />

          {/* Scrolling row */}
          <div className="flex animate-marquee" style={{ width: 'max-content' }}>
            {items.map((partner, i) => (
              <div
                key={`${partner._id}-${i}`}
                className="flex items-center justify-center flex-shrink-0 bg-white"
                style={{
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  marginLeft: '12px',
                  marginRight: '12px',
                  minWidth: '160px',
                }}
              >
                {partner.logo?.asset?.url ? (
                  <Image
                    src={partner.logo.asset.url}
                    alt={partner.name}
                    width={120}
                    height={30}
                    style={{ objectFit: 'contain', height: '30px', width: 'auto' }}
                    unoptimized
                  />
                ) : (
                  <span
                    className="font-medium text-brand-dark whitespace-nowrap"
                    style={{ fontSize: '14px' }}
                  >
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionSection>
  )
}
