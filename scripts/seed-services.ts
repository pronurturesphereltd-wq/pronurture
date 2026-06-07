/**
 * scripts/seed-services.ts
 *
 * Seeds 6 service documents into Sanity using createOrReplace,
 * so re-running is safe and idempotent.
 *
 * These map 1-to-1 to the FeaturesSection cards on the homepage.
 * shortDescription must stay under 200 chars (schema validation).
 * fullDescription and icon are left empty — add via Sanity Studio.
 *
 * Run:  npm run seed:services
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 *
 * IDs created (reference these in seed-homepage.ts):
 *   service-smart-staff-rostering
 *   service-locum-agency-staffing
 *   service-payroll-management
 *   service-credential-verification
 *   service-cpd-training-management
 *   service-compliance-reporting
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
// Service documents — map to FeaturesSection cards
// shortDescription max 200 chars enforced by Sanity schema
// ---------------------------------------------------------------------------
const services = [
  {
    _id:              'service-smart-staff-rostering',
    _type:            'service',
    title:            'Smart Staff Rostering',
    slug:             { _type: 'slug', current: 'smart-staff-rostering' },
    shortDescription:
      'Post shifts in minutes and get real-time visibility of your roster. ' +
      'Automated alerts surface gaps before they become crises, replacing ' +
      'WhatsApp chaos with a single dashboard.',
  },
  {
    _id:              'service-locum-agency-staffing',
    _type:            'service',
    title:            'Locum & Agency Staffing',
    slug:             { _type: 'slug', current: 'locum-agency-staffing' },
    shortDescription:
      'Access a pre-verified pool of doctors, nurses, and allied health ' +
      'professionals available for locum work. Fill emergency gaps in minutes ' +
      'without expensive agency fees or last-minute phone calls.',
  },
  {
    _id:              'service-payroll-management',
    _type:            'service',
    title:            'Payroll Management',
    slug:             { _type: 'slug', current: 'payroll-management' },
    shortDescription:
      'Timesheets flow directly into payroll with Nigerian PAYE, NHIS, and ' +
      'pension deductions calculated automatically. Eliminate month-end ' +
      'reconciliation and pay staff accurately, on time.',
  },
  {
    _id:              'service-credential-verification',
    _type:            'service',
    title:            'Credential Verification',
    slug:             { _type: 'slug', current: 'credential-verification' },
    shortDescription:
      'Track professional licences, MDCN and NMCN registrations, and CPD ' +
      'certificates with automated expiry alerts. Deploy only verified staff ' +
      'and stay fully compliant at all times.',
  },
  {
    _id:              'service-cpd-training-management',
    _type:            'service',
    title:            'CPD & Training Management',
    slug:             { _type: 'slug', current: 'cpd-training-management' },
    shortDescription:
      'Short, accredited training modules for clinical and non-clinical staff, ' +
      'accessible on any mobile device. Track CPD hours and generate compliance ' +
      'certificates automatically.',
  },
  {
    _id:              'service-compliance-reporting',
    _type:            'service',
    title:            'Compliance Reporting',
    slug:             { _type: 'slug', current: 'compliance-reporting' },
    shortDescription:
      'Generate audit-ready reports for NHIA, MDCN, and state regulators at ' +
      'the click of a button. Real-time dashboards show staffing ratios, ' +
      'credential status, and CPD progress.',
  },
]

// ---------------------------------------------------------------------------
// Run the seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log(`\n🌱  Seeding services → project "${PROJECT_ID}" / dataset "${DATASET}"\n`)

  for (const service of services) {
    console.log(`  ↳ "${service.title}"`)
    await client.createOrReplace(service)
    console.log(`    ✅ ${service._id}`)
  }

  console.log(`\n✅  Done — ${services.length} services created/replaced.\n`)
  console.log('  IDs for seed-homepage.ts:')
  for (const s of services) console.log(`    ${s._id}`)
  console.log()
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
