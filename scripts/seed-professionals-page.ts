/**
 * scripts/seed-professionals-page.ts
 *
 * Seeds the professionalsPage singleton document in Sanity using createOrReplace,
 * so re-running is safe and idempotent.
 *
 * IMPORTANT: Run seed:testimonials FIRST so the referenced testimonial IDs exist
 * before this script creates the references.
 *
 *   npm run seed:testimonials
 *   npm run seed:professionals
 *
 * What this seeds:
 *   hero         — headline, subheadline, ctaText, ctaLink
 *                  (hero.image omitted — upload via Studio)
 *   features     — 6 platform capability cards (title, subtitle, description)
 *                  _key values pfeat-1 through pfeat-6 are used by
 *                  ICON_BY_FEATURE_KEY in ProfessionalsFeatures.tsx
 *   testimonials — references to testimonial-blessing-adeyemi and testimonial-emeka-nwosu
 *   cta          — headline, body, buttonText, buttonLink
 *
 * Run:  npm run seed:professionals
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */

import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ---------------------------------------------------------------------------
// Load .env.local — tsx does not auto-load dotenv
// ---------------------------------------------------------------------------
function loadEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const raw = readFileSync(envPath, 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    // .env.local not found — relying on existing process.env
  }
}
loadEnvLocal()

// ---------------------------------------------------------------------------
// Sanity write client
// ---------------------------------------------------------------------------
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'cfu3qevi'
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_VER    = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-26'
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN

if (!TOKEN) {
  console.error('❌  SANITY_API_WRITE_TOKEN is not set. Add it to .env.local and retry.')
  process.exit(1)
}

const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: API_VER,
  token:      TOKEN,
  useCdn:     false, // must be false for mutations
})

// ---------------------------------------------------------------------------
// Helper — Sanity reference pointer with _key for array items
// ---------------------------------------------------------------------------
function ref(id: string, key: string) {
  return { _type: 'reference' as const, _ref: id, _key: key }
}

// ---------------------------------------------------------------------------
// professionalsPage singleton document
// ---------------------------------------------------------------------------
const professionalsPageDoc = {
  _id:   'professionalsPage',
  _type: 'professionalsPage',

  // ── Hero ─────────────────────────────────────────────────────────────────
  // hero.image intentionally omitted — upload via Sanity Studio
  hero: {
    headline:
      'Your Skills Are in Demand. We Make Sure You Get Paid for Them.',
    subheadline:
      'ProNurtureSphere connects Nigerian doctors, nurses, pharmacists and ' +
      'allied health professionals with verified employers, flexible locum ' +
      'shifts, and accredited CPD — all in one platform.',
    ctaText: 'Get Early Access',
    ctaLink: '/waitlist',
  },

  // ── Features — 6 platform capability cards ───────────────────────────────
  // _key is required by Sanity for inline object arrays; also used by
  // ICON_BY_FEATURE_KEY in ProfessionalsFeatures.tsx to look up the SVG icon.
  features: [
    {
      _type: 'object' as const,
      _key:  'pfeat-1',
      title:       'Find Verified Shifts',
      subtitle:    'Locum & Shift Matching',
      description: 'Browse and book verified locum shifts at hospitals and clinics near you. No agencies, no delays.',
    },
    {
      _type: 'object' as const,
      _key:  'pfeat-2',
      title:       'Get Paid Quickly',
      subtitle:    'Fast & Reliable Payments',
      description: 'Timesheets are approved digitally and payments processed automatically — no chasing invoices.',
    },
    {
      _type: 'object' as const,
      _key:  'pfeat-3',
      title:       'Build Your Profile',
      subtitle:    'Digital Professional Identity',
      description: 'Upload your credentials once. MDCN, NMCN, and PCN verifications stay live so employers can trust you instantly.',
    },
    {
      _type: 'object' as const,
      _key:  'pfeat-4',
      title:       'Complete Accredited CPD',
      subtitle:    'CPD & Licence Renewal',
      description: 'Access short, accredited modules that count toward your licence renewal — completed on your phone, at your own pace.',
    },
    {
      _type: 'object' as const,
      _key:  'pfeat-5',
      title:       'Track Your Earnings',
      subtitle:    'Earnings Dashboard',
      description: 'See all your shifts, hours, and payments in one dashboard. Download payslips and tax summaries anytime.',
    },
    {
      _type: 'object' as const,
      _key:  'pfeat-6',
      title:       'Grow Your Reputation',
      subtitle:    'Ratings & Reviews',
      description: 'Build a verified track record with employer ratings that make you the first choice for future shifts.',
    },
  ],

  // ── Testimonials — professional-focused references ───────────────────────
  // Blessing (nurse) and Emeka (doctor) both fit the professional persona.
  // Run seed:testimonials first or this will abort with a missing-ref error.
  testimonials: [
    ref('testimonial-blessing-adeyemi', 'pt-1'),
    ref('testimonial-emeka-nwosu',      'pt-2'),
  ],

  // ── CTA Section ──────────────────────────────────────────────────────────
  cta: {
    headline:   'Ready to Take Control of Your Career?',
    body:
      'Join hundreds of Nigerian healthcare professionals already using ' +
      'ProNurtureSphere to find shifts, get paid, and grow their careers — ' +
      'on their own terms.',
    buttonText: 'Get Early Access',
    buttonLink: '/waitlist',
  },
}

// ---------------------------------------------------------------------------
// Run the seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log(`\n🌱  Seeding professionalsPage → project "${PROJECT_ID}" / dataset "${DATASET}"\n`)

  // Verify that the referenced testimonials exist before writing
  console.log('  Checking referenced testimonial documents exist...')
  const testimonialIds = professionalsPageDoc.testimonials.map((r) => r._ref)

  const existing = await client.fetch<{ _id: string }[]>(
    `*[_id in $ids]{ _id }`,
    { ids: testimonialIds }
  )
  const existingIds = new Set(existing.map((d) => d._id))
  const missing     = testimonialIds.filter((id) => !existingIds.has(id))

  if (missing.length > 0) {
    console.error('\n❌  The following referenced documents do not exist yet:')
    for (const id of missing) console.error(`    ${id}`)
    console.error('\n  Run "npm run seed:testimonials" first, then retry.\n')
    process.exit(1)
  }

  console.log(`    ✅ All ${testimonialIds.length} referenced documents confirmed\n`)

  // Write the professionalsPage singleton document
  console.log('  ↳ Writing professionalsPage document...')
  const result = await client.createOrReplace(professionalsPageDoc)
  console.log(`    ✅ ${result._id}\n`)

  // Summary
  console.log('  Fields seeded:')
  console.log(`    hero.headline:  "${professionalsPageDoc.hero.headline}"`)
  console.log(`    hero.ctaText:   "${professionalsPageDoc.hero.ctaText}"`)
  console.log(`    features:       ${professionalsPageDoc.features.length} items`)
  console.log(`    testimonials:   ${professionalsPageDoc.testimonials.length} references`)
  console.log(`    cta.headline:   "${professionalsPageDoc.cta.headline}"`)
  console.log('\n✅  Done.\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
