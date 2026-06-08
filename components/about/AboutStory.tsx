/**
 * AboutStory.tsx — The origin story of ProNurtureSphere
 *
 * Position: After AboutMission.
 * Purpose: Answers the fundamental question every visitor to an About page asks:
 *          "Why does this organisation exist?" Narrative text earns trust in a way
 *          that feature bullets cannot. Story = credibility.
 *
 * Design: White background for maximum readability. Pull quote breaks the prose
 *         rhythm and anchors the central insight of the story visually.
 *         Two-column layout on desktop (text + pull quote block) for visual density.
 *         If story.image is set in Sanity, it renders at the top of the right column.
 *
 * Data source: aboutPage.story via aboutPageQuery.
 * story.headline → H2 (falls back to hardcoded)
 * story.body → PortableText prose (falls back to hardcoded paragraphs)
 * story.image → optional contextual photo above the pull quote (falls back to nothing)
 * Pull quote and stats are always static — not in schema by design.
 */

import Image from "next/image";
import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";
import type { AboutStoryData } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";

type PortableTextValue = ComponentProps<typeof PortableText>["value"];

const FALLBACK_HEADLINE = "Why We Built ProNurtureSphere."

/** PortableText components styled to match the original hardcoded prose paragraphs */
const storyBodyComponents: ComponentProps<typeof PortableText>["components"] = {
  block: {
    normal: ({ children }) => (
      <p className="text-brand-dark/70 text-base md:text-lg leading-relaxed">
        {children}
      </p>
    ),
  },
}

interface AboutStoryProps {
  /** Story section content from Sanity — falls back to hardcoded if null */
  story?: AboutStoryData | null;
}

const AboutStory = ({ story }: AboutStoryProps) => {
  const headline    = story?.headline ?? FALLBACK_HEADLINE
  const hasBody     = story?.body && story.body.length > 0
  const storyImage  = story?.image ?? null

  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-label="The story behind ProNurtureSphere"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
            {headline}
          </h2>
        </div>

        {/* ── Story Content — two-column on desktop ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left: narrative prose — 3 columns on desktop */}
          <div className="lg:col-span-3 space-y-6 text-brand-dark/70 text-base md:text-lg leading-relaxed">

            {/* Portable Text from Sanity, or hardcoded fallback paragraphs */}
            {hasBody ? (
              <PortableText
                value={story!.body as PortableTextValue}
                components={storyBodyComponents}
              />
            ) : (
              <>
                <p>
                  Nigeria&apos;s healthcare system faces a persistent challenge — a growing gap between
                  the demand for skilled, practice-ready professionals and the supply of continuously
                  upskilled, certified, career-ready practitioners who can meet it.
                </p>

                <p>
                  Healthcare employers — hospitals, clinics, maternity homes, diagnostics centres —
                  struggle daily to find staff with up-to-date competencies. They rely on WhatsApp
                  groups, paper rosters, and word-of-mouth to fill critical roles. Compliance is
                  reactive. Quality assurance is inconsistent.
                </p>

                <p>
                  At the same time, healthcare workers — doctors, nurses, pharmacists, allied health
                  professionals — lack accessible, structured, affordable pathways for professional
                  growth. The CPD system is fragmented. Licences lapse. Career progression is opaque.
                  Exploitation by unverified employers is common.
                </p>

                <p>
                  ProNurtureSphere Limited was founded to close that gap — not with
                  a single tool, but with a complete ecosystem. We believe the workforce crisis
                  is not a staffing problem. It is a systems problem. And systems problems require
                  systems solutions.
                </p>

                <p>
                  The ProNurtureSphere Platform is how we deliver that solution at scale —
                  connecting training, verification, deployment, mentorship, and continuous
                  education into one integrated digital infrastructure for Nigeria&apos;s
                  healthcare workforce.
                </p>
              </>
            )}
          </div>

          {/* Right: optional image + pull quote + insight block — 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-8">

            {/* Story image — shown only when set in Sanity Studio */}
            {storyImage && (
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(storyImage).width(600).height(400).fit("crop").url()}
                  alt={storyImage.alt ?? "ProNurtureSphere story"}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Pull quote — the single most important insight on the page; always static */}
            <blockquote
              className="
                relative bg-brand-dark rounded-3xl p-8
                border-l-4 border-brand-gold
                overflow-hidden
              "
              aria-label="Key insight from the founding team"
            >
              {/* Decorative large quotation mark */}
              <div
                className="absolute top-4 right-6 text-white/5 font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: "8rem" }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <p className="relative text-white text-xl md:text-2xl font-semibold leading-snug italic">
                &ldquo;Healthcare professionals are trained but not nurtured into sustainable excellence.&rdquo;
              </p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-brand-gold text-sm font-semibold">The founding insight</p>
                <p className="text-white/50 text-xs mt-1">ProNurtureSphere Limited</p>
              </div>
            </blockquote>

            {/* Supporting stat cards — give the story institutional weight; always static */}
            <div className="grid grid-cols-2 gap-4">

              <div
                className="rounded-2xl p-5 border border-brand-dark/10"
                style={{ backgroundColor: "#f5f5f0" }}
              >
                <p className="text-3xl font-bold text-brand-dark mb-1">72k+</p>
                <p className="text-brand-dark/60 text-xs leading-snug">
                  Registered nurses in Nigeria with lapsed licences annually
                </p>
              </div>

              <div
                className="rounded-2xl p-5 border border-brand-dark/10"
                style={{ backgroundColor: "#f5f5f0" }}
              >
                <p className="text-3xl font-bold text-brand-dark mb-1">1:8k</p>
                <p className="text-brand-dark/60 text-xs leading-snug">
                  Doctor-to-patient ratio in Nigeria vs 1:600 WHO recommendation
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
