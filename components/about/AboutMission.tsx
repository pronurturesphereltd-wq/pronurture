/**
 * AboutMission.tsx — Mission and Vision two-column section
 *
 * Position: Immediately after the hero — the first content the user reads.
 * Purpose: Establishes WHY the organisation exists (mission) and WHERE it is going (vision).
 *
 * Layout:
 *   - Left column: Deep green background (bg-brand-dark) — Mission body
 *   - Right column: Off-white background (#f5f5f0) — Vision statement
 * The strong colour split creates instant visual hierarchy and brand authority.
 *
 * Data source: aboutPage.mission via aboutPageQuery.
 * Falls back to FALLBACK_* constants when Sanity returns null.
 *
 * mission.body is Portable Text (array of blocks) — rendered via PortableText from next-sanity.
 * mission.vision is a plain text string — rendered as a blockquote.
 */

import { PortableText } from 'next-sanity'
import type { ComponentProps } from 'react'
import type { AboutMissionData } from '@/sanity/lib/types'

type PortableTextValue = ComponentProps<typeof PortableText>['value']

const FALLBACK_MISSION_TEXT =
  'To nurture, equip, deploy, and sustain a competent global healthcare workforce ' +
  'through integrated healthcare services, professional training, workforce development, ' +
  'education, innovation, and community wellness systems that improve health outcomes ' +
  'and strengthen healthcare ecosystems worldwide.'

const FALLBACK_VISION_TEXT =
  'To be globally recognised as a trusted leader in holistic healthcare workforce ' +
  'development and integrated health services — building a world where every healthcare ' +
  'professional is confident, competent, compassionate, and positioned to deliver ' +
  'excellent care across borders.'

/** PortableText block components styled for the white-on-dark-green mission panel */
const missionBodyComponents: ComponentProps<typeof PortableText>['components'] = {
  block: {
    normal: ({ children }) => (
      <p className="text-white text-lg md:text-xl leading-relaxed font-light mb-5 last:mb-0">
        {children}
      </p>
    ),
  },
}

interface AboutMissionProps {
  /** Mission content from Sanity — falls back to hardcoded if null */
  mission?: AboutMissionData | null
}

const AboutMission = ({ mission }: AboutMissionProps) => {
  const visionText = mission?.vision ?? FALLBACK_VISION_TEXT

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2"
      aria-label="ProNurtureSphere mission and vision"
    >

      {/* ── Left: Mission — Deep Green ────────────────────────────────────── */}
      <div className="bg-brand-dark px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center">

        {/* Gold eyebrow label distinguishes this panel at a glance */}
        <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-5">
          Our Mission
        </p>

        {/* Mission body — PortableText from Sanity, or single-paragraph fallback */}
        {mission?.body && mission.body.length > 0 ? (
          <PortableText
            value={mission.body as PortableTextValue}
            components={missionBodyComponents}
          />
        ) : (
          <blockquote className="text-white text-lg md:text-xl leading-relaxed font-light">
            &ldquo;{FALLBACK_MISSION_TEXT}&rdquo;
          </blockquote>
        )}

        {/* Gold divider — accent, not decoration */}
        <div className="mt-8 w-16 h-1 rounded-full bg-brand-gold" aria-hidden="true" />
      </div>

      {/* ── Right: Vision — Off-White ─────────────────────────────────────── */}
      <div
        className="px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center"
        style={{ backgroundColor: "#f5f5f0" }}
      >

        {/* Brand-green eyebrow label — green signals aspiration and growth */}
        <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-5">
          Our Vision
        </p>

        {/* Vision statement — plain text string from Sanity or fallback */}
        <blockquote className="text-brand-dark text-lg md:text-xl leading-relaxed font-light">
          &ldquo;{visionText}&rdquo;
        </blockquote>

        {/* Dark divider — grounds the vision in the brand identity */}
        <div className="mt-8 w-16 h-1 rounded-full bg-brand-dark" aria-hidden="true" />
      </div>

    </section>
  );
};

export default AboutMission;
