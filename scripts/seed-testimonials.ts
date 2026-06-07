/**
 * scripts/seed-testimonials.ts
 *
 * Seeds 3 testimonial documents into Sanity using createOrReplace,
 * so re-running is safe and idempotent.
 *
 * Run:  npm run seed:testimonials
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 *
 * IDs created (reference these in seed-homepage.ts):
 *   testimonial-amaka-okonkwo
 *   testimonial-blessing-adeyemi
 *   testimonial-emeka-nwosu
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
// Testimonial documents — 3 realistic Nigerian healthcare professionals
// No image field — photos can be uploaded manually in Sanity Studio
// ---------------------------------------------------------------------------
const testimonials = [
  {
    _id:          'testimonial-amaka-okonkwo',
    _type:        'testimonial',
    name:         'Dr. Amaka Okonkwo',
    role:         'Medical Director',
    organisation: 'St. Nicholas Hospital, Lagos',
    quote:
      'Before ProNurtureSphere, we were spending over ₦3 million a month on locum agency fees. ' +
      'Within four months of managing our own locum panel through the platform, that cost dropped by 35%. ' +
      'Knowing that every clinician we deploy has a verified, current licence has removed an enormous ' +
      'compliance burden from my desk.',
  },
  {
    _id:          'testimonial-blessing-adeyemi',
    _type:        'testimonial',
    name:         'Nurse Blessing Adeyemi',
    role:         'Ward Manager',
    organisation: 'University College Hospital, Ibadan',
    quote:
      'Managing a 40-bed ward with rotating shifts used to mean hours on WhatsApp every week chasing ' +
      'confirmations. ProNurtureSphere\'s rostering tool surfaces gaps days in advance — I have not had an ' +
      'uncovered shift since we went live. The CPD tracker is a bonus: I can see exactly where each nurse ' +
      'stands on their renewal requirements without chasing anyone for paperwork.',
  },
  {
    _id:          'testimonial-emeka-nwosu',
    _type:        'testimonial',
    name:         'Dr. Emeka Nwosu',
    role:         'Chief Executive Officer',
    organisation: 'HealthPlus Clinics',
    quote:
      'We run five clinic locations across Abuja and credential compliance used to be a manual nightmare ' +
      '— spreadsheets, physical certificates, last-minute scrambles before inspections. ' +
      'ProNurtureSphere centralises everything. When a regulator visits now, I can produce a full verified ' +
      'credential report for every clinical staff member in under two minutes.',
  },
]

// ---------------------------------------------------------------------------
// Run the seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log(`\n🌱  Seeding testimonials → project "${PROJECT_ID}" / dataset "${DATASET}"\n`)

  for (const testimonial of testimonials) {
    console.log(`  ↳ ${testimonial.name} — ${testimonial.role}, ${testimonial.organisation}`)
    await client.createOrReplace(testimonial)
    console.log(`    ✅ ${testimonial._id}`)
  }

  console.log(`\n✅  Done — ${testimonials.length} testimonials created/replaced.\n`)
  console.log('  IDs for seed-homepage.ts:')
  for (const t of testimonials) console.log(`    ${t._id}`)
  console.log()
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
