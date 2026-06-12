/**
 * PartnersMarquee.tsx — Infinite scrolling partners strip
 *
 * Replaces the SocialProofBar on the homepage.
 * Renders a right-to-left scrolling strip of partner logos (or name chips
 * as fallback when no logo has been uploaded yet).
 *
 * Scroll mechanic:
 *   - The partner list is rendered twice side-by-side inside a flex container
 *   - The container is animated from translateX(0) → translateX(-50%)
 *   - At -50% the second copy sits exactly where the first started → seamless loop
 *   - Animation defined in globals.css as @keyframes marquee / @utility animate-marquee
 *
 * @param partners - Array from Sanity partnersQuery; falls back to hardcoded names
 */

import Image from "next/image"
import type { SanityPartner } from "@/sanity/lib/types"

const FALLBACK_PARTNERS: SanityPartner[] = [
  { _id: 'partner-mdcn',     name: 'MDCN' },
  { _id: 'partner-nmcn',     name: 'NMCN' },
  { _id: 'partner-nhia',     name: 'NHIA' },
  { _id: 'partner-pcn',      name: 'PCN' },
  { _id: 'partner-lagos-moh',name: 'Lagos State Ministry of Health' },
  { _id: 'partner-agpmpn',   name: 'AGPMPN' },
  { _id: 'partner-johesu',   name: 'JOHESU' },
  { _id: 'partner-chan',      name: 'CHAN' },
]

interface PartnersMarqueeProps {
  partners?: SanityPartner[]
}

const PartnersMarquee = ({ partners }: PartnersMarqueeProps) => {
  const items = (partners && partners.length > 0) ? partners : FALLBACK_PARTNERS

  // Duplicate for the seamless loop — the CSS animation moves -50% (one full copy)
  const doubled = [...items, ...items]

  return (
    <section
      className="bg-white border-b border-brand-dark/5 py-8 overflow-hidden"
      aria-label="Trusted partner organisations"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-brand-dark/40 text-xs font-semibold uppercase tracking-widest">
          Working with Nigeria&apos;s leading healthcare bodies
        </p>
      </div>

      {/* Overflow clip wrapper — hides the part of the strip that has scrolled off */}
      <div className="overflow-hidden" aria-hidden="true">
        {/* Scrolling inner strip — animate-marquee defined in globals.css */}
        <div
          className="flex animate-marquee gap-8 w-max hover:[animation-play-state:paused]"
          style={{ willChange: 'transform' }}
        >
          {doubled.map((partner, index) => (
            <PartnerChip key={`${partner._id}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Single partner — logo if available, otherwise a styled name pill */
const PartnerChip = ({ partner }: { partner: SanityPartner }) => {
  if (partner.logo?.asset?.url) {
    return (
      <div className="flex-shrink-0 flex items-center justify-center h-10 px-4 opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0">
        <Image
          src={partner.logo.asset.url}
          alt={partner.name}
          width={120}
          height={40}
          className="object-contain h-10 w-auto"
        />
      </div>
    )
  }

  // Name chip fallback — used until logo is uploaded in Sanity Studio
  return (
    <div className="flex-shrink-0 flex items-center h-10 px-5 rounded-full border border-brand-dark/15 bg-brand-light">
      <span className="text-brand-dark/60 text-sm font-semibold whitespace-nowrap">
        {partner.name}
      </span>
    </div>
  )
}

export default PartnersMarquee
