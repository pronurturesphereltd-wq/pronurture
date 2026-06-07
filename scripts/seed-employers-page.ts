/**
 * scripts/seed-employers-page.ts
 *
 * Seeds the employersPage singleton document in Sanity using createOrReplace,
 * so re-running is safe and idempotent.
 *
 * IMPORTANT: Run seed:testimonials FIRST so the referenced testimonial IDs exist
 * before this script creates the references.
 *
 *   npm run seed:testimonials
 *   npm run seed:employers
 *
 * What this seeds:
 *   hero         — headline, subheadline, ctaText, ctaLink
 *                  (hero.image omitted — upload via Studio)
 *   features     — 6 platform capability cards (title, subtitle, description)
 *   testimonials — references to testimonial-amaka-okonkwo and testimonial-emeka-nwosu
 *   cta          — headline, body, buttonText, buttonLink
 *
 * Run:  npm run seed:employers
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
// employersPage singleton document
// ---------------------------------------------------------------------------
const employersPageDoc = {
  _id:   'employersPage',
  _type: 'employersPage',

  // ── Hero ─────────────────────────────────────────────────────────────────
  // hero.image intentionally omitted — upload via Sanity Studio
  hero: {
    headline:    'Build a Stronger Healthcare Team. Starting Today.',
    subheadline:
      'ProNurtureSphere gives Nigerian hospitals, clinics and healthcare ' +
      'facilities the tools to roster, verify, pay and develop their ' +
      'workforce — all in one platform.',
    ctaText: 'Get Early Access',
    ctaLink: '/waitlist',
  },

  // ── Features — 6 platform capability cards ───────────────────────────────
  // _key is required by Sanity for inline object arrays; also used by
  // ICON_BY_FEATURE_KEY in EmployersFeatures.tsx to look up the SVG icon.
  features: [
    {
      _type: 'object' as const,
      _key:  'feat-1',
      title:       'Fill Shifts in Minutes',
      subtitle:    'Shift Posting & Booking',
      description: 'Post open shifts and get confirmed bookings from verified professionals in under 30 minutes.',
    },
    {
      _type: 'object' as const,
      _key:  'feat-2',
      title:       'Hire Only Verified Staff',
      subtitle:    'Credential Verification',
      description: 'Every professional on the platform has verified MDCN, NMCN, or PCN credentials before they can accept a shift.',
    },
    {
      _type: 'object' as const,
      _key:  'feat-3',
      title:       'Automate Payroll',
      subtitle:    'Payroll Management',
      description: 'Timesheets flow directly into payroll. PAYE, NHIS, and pension deductions calculated and processed automatically.',
    },
    {
      _type: 'object' as const,
      _key:  'feat-4',
      title:       'Track CPD Compliance',
      subtitle:    'CPD & Training',
      description: 'Monitor CPD hours across your workforce and receive alerts before licences are due for renewal.',
    },
    {
      _type: 'object' as const,
      _key:  'feat-5',
      title:       'Always Inspection-Ready',
      subtitle:    'Compliance Reporting',
      description: 'Generate NHIA and MDCN-ready audit reports at the click of a button.',
    },
    {
      _type: 'object' as const,
      _key:  'feat-6',
      title:       'Real-Time Dashboard',
      subtitle:    'Operations Overview',
      description: 'See your entire workforce — who is rostered, who is verified, who needs attention — from one live dashboard.',
    },
  ],

  // ── Testimonials — employer-focused references ───────────────────────────
  // Amaka (Medical Director) and Emeka (Hospital Admin) both fit the employer persona.
  // Run seed:testimonials first or this will abort with a missing-ref error.
  testimonials: [
    ref('testimonial-amaka-okonkwo', 'et-1'),
    ref('testimonial-emeka-nwosu',   'et-2'),
  ],

  // ── CTA Section ──────────────────────────────────────────────────────────
  cta: {
    headline:   'Ready to Build a Stronger Team?',
    body:
      'Join healthcare facilities across Nigeria already using ProNurtureSphere ' +
      'to solve staffing, compliance and payroll — all in one place.',
    buttonText: 'Get Early Access',
    buttonLink: '/waitlist',
  },
}

// ---------------------------------------------------------------------------
// Run the seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log(`\n🌱  Seeding employersPage → project "${PROJECT_ID}" / dataset "${DATASET}"\n`)

  // Verify that the referenced testimonials exist before writing
  console.log('  Checking referenced testimonial documents exist...')
  const testimonialIds = employersPageDoc.testimonials.map((r) => r._ref)

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

  // Write the employersPage singleton document
  console.log('  ↳ Writing employersPage document...')
  const result = await client.createOrReplace(employersPageDoc)
  console.log(`    ✅ ${result._id}\n`)

  // Summary
  console.log('  Fields seeded:')
  console.log(`    hero.headline:  "${employersPageDoc.hero.headline}"`)
  console.log(`    hero.ctaText:   "${employersPageDoc.hero.ctaText}"`)
  console.log(`    features:       ${employersPageDoc.features.length} items`)
  console.log(`    testimonials:   ${employersPageDoc.testimonials.length} references`)
  console.log(`    cta.headline:   "${employersPageDoc.cta.headline}"`)
  console.log('\n✅  Done.\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
