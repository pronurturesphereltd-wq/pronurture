/**
 * scripts/seed-homepage.ts
 *
 * Seeds the homePage singleton document in Sanity using createOrReplace,
 * so re-running is safe and idempotent.
 *
 * IMPORTANT: Run seed-testimonials.ts and seed-services.ts FIRST so the
 * referenced document IDs exist before this script creates the references.
 *
 *   npm run seed:testimonials
 *   npm run seed:services
 *   npm run seed:homepage
 *
 * What this seeds:
 *   hero          — headline, subheadline, ctaText, ctaLink
 *   stats         — 4 platform impact stats
 *   testimonials  — references to the 3 seeded testimonial documents
 *   featuredServices — references to the 6 seeded service documents
 *
 * hero.image is intentionally omitted — upload a real screenshot via
 * Sanity Studio once platform imagery is available.
 *
 * Run:  npm run seed:homepage
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
// Helper — Sanity reference pointer
// ---------------------------------------------------------------------------
function ref(id: string, key: string) {
  return { _type: 'reference' as const, _ref: id, _key: key }
}

// ---------------------------------------------------------------------------
// homePage singleton document
// ---------------------------------------------------------------------------
const homepageDoc = {
  _id:   'homePage',
  _type: 'homePage',

  // ── Hero Section ──────────────────────────────────────────────────────────
  // hero.image intentionally omitted — upload via Sanity Studio
  hero: {
    headline:    'Smarter Staffing. Faster Hiring. Better Healthcare Operations.',
    subheadline:
      'From digital rostering and payroll to verified locum staffing and CPD ' +
      'management — ProNurtureSphere gives Nigerian healthcare organisations ' +
      'one platform to manage their entire workforce.',
    ctaText: 'Join the Waitlist',
    ctaLink: '/waitlist',
  },

  // ── Stats — displayed in SocialProofBar and StatsSection ─────────────────
  // Each array item needs _key (Sanity requirement for inline object arrays)
  stats: [
    { _type: 'object', _key: 'stat-1', value: '500+',    label: 'Healthcare Professionals' },
    { _type: 'object', _key: 'stat-2', value: '50+',     label: 'Facilities Onboarded' },
    { _type: 'object', _key: 'stat-3', value: '10,000+', label: 'Shifts Managed' },
    { _type: 'object', _key: 'stat-4', value: '98%',     label: 'Satisfaction Rate' },
  ],

  // ── Featured Services — references to service documents ──────────────────
  // Must match the IDs created by seed-services.ts
  featuredServices: [
    ref('service-smart-staff-rostering',  'fs-1'),
    ref('service-locum-agency-staffing',  'fs-2'),
    ref('service-payroll-management',     'fs-3'),
    ref('service-credential-verification','fs-4'),
    ref('service-cpd-training-management','fs-5'),
    ref('service-compliance-reporting',   'fs-6'),
  ],

  // ── Testimonials — references to testimonial documents ───────────────────
  // Must match the IDs created by seed-testimonials.ts
  testimonials: [
    ref('testimonial-amaka-okonkwo',    'tm-1'),
    ref('testimonial-blessing-adeyemi', 'tm-2'),
    ref('testimonial-emeka-nwosu',      'tm-3'),
  ],
}

// ---------------------------------------------------------------------------
// Run the seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log(`\n🌱  Seeding homePage → project "${PROJECT_ID}" / dataset "${DATASET}"\n`)

  // Verify that the referenced documents exist before writing
  console.log('  Checking referenced documents exist...')

  const serviceIds = homepageDoc.featuredServices.map((r) => r._ref)
  const testimonialIds = homepageDoc.testimonials.map((r) => r._ref)
  const allRefs = [...serviceIds, ...testimonialIds]

  const existing = await client.fetch<{ _id: string }[]>(
    `*[_id in $ids]{ _id }`,
    { ids: allRefs }
  )
  const existingIds = new Set(existing.map((d) => d._id))
  const missing = allRefs.filter((id) => !existingIds.has(id))

  if (missing.length > 0) {
    console.error('\n❌  The following referenced documents do not exist yet:')
    for (const id of missing) console.error(`    ${id}`)
    console.error('\n  Run seed:testimonials and seed:services first, then retry.\n')
    process.exit(1)
  }

  console.log(`    ✅ All ${allRefs.length} referenced documents confirmed\n`)

  // Write the homePage document
  console.log('  ↳ Writing homePage document...')
  const result = await client.createOrReplace(homepageDoc)
  console.log(`    ✅ ${result._id}\n`)

  // Summary
  console.log('  Fields seeded:')
  console.log(`    hero.headline:    ${homepageDoc.hero.headline}`)
  console.log(`    hero.ctaText:     ${homepageDoc.hero.ctaText}`)
  console.log(`    hero.ctaLink:     ${homepageDoc.hero.ctaLink}`)
  console.log(`    stats:            ${homepageDoc.stats.length} items`)
  console.log(`    featuredServices: ${homepageDoc.featuredServices.length} references`)
  console.log(`    testimonials:     ${homepageDoc.testimonials.length} references`)
  console.log('\n✅  Done.\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
