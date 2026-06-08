/**
 * scripts/seed-about-page.ts
 *
 * Seeds the aboutPage singleton document in Sanity using createOrReplace,
 * so re-running is safe and idempotent.
 *
 * What this seeds:
 *   mission.body    — 3 Portable Text blocks (the mission statement)
 *   mission.vision  — plain text string (the vision statement)
 *   values[]        — 7 core values (title + description); _key values val-1..val-7
 *                     are used by ICON_BY_VALUE_KEY in AboutValues.tsx
 *   team[]          — 1 founder record (name, role, bio, linkedin)
 *                     image intentionally omitted — upload via Studio
 *   story.headline  — H2 on the story section
 *   story.body      — 3 Portable Text blocks (origin narrative)
 *                     story.image intentionally omitted — upload via Studio
 *
 * Run:  npm run seed:about
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
// Helper — creates a single Portable Text paragraph block
// ---------------------------------------------------------------------------
function block(key: string, text: string) {
  return {
    _type:    'block'  as const,
    _key:     key,
    style:    'normal' as const,
    children: [{ _type: 'span' as const, _key: `${key}-span`, text, marks: [] as string[] }],
    markDefs: [] as never[],
  }
}

// ---------------------------------------------------------------------------
// aboutPage singleton document
// ---------------------------------------------------------------------------
const aboutPageDoc = {
  _id:   'aboutPage',
  _type: 'aboutPage',

  // ── Mission ──────────────────────────────────────────────────────────────
  mission: {
    // body: 3 prose blocks rendered via PortableText in AboutMission.tsx
    body: [
      block(
        'mb-1',
        'ProNurtureSphere exists to solve Nigeria\'s healthcare workforce crisis — not with ' +
        'more paperwork, but with better infrastructure. We build the systems that connect ' +
        'the right professionals to the right facilities, at the right time.'
      ),
      block(
        'mb-2',
        'We believe every Nigerian deserves safe, well-staffed healthcare. That starts with ' +
        'giving healthcare workers the tools to practise sustainably, and healthcare facilities ' +
        'the confidence to build compliant, capable teams.'
      ),
      block(
        'mb-3',
        'We are building the workforce layer that Nigerian healthcare has always needed.'
      ),
    ],
    // vision: plain string rendered as a blockquote in the right panel
    vision:
      'A Nigerian healthcare system where every facility is properly staffed, every ' +
      'professional is verified, and every patient receives the standard of care they deserve.',
  },

  // ── Core Values — 7 items ────────────────────────────────────────────────
  // _key values val-1..val-7 are used by ICON_BY_VALUE_KEY in AboutValues.tsx
  values: [
    {
      _type:       'object' as const,
      _key:        'val-1',
      title:       'Built for Nigeria',
      description: 'Every feature is designed around Nigerian healthcare realities — MDCN regulations, NHIS requirements, PAYE structures, and the locum economy.',
    },
    {
      _type:       'object' as const,
      _key:        'val-2',
      title:       'Trust Through Verification',
      description: 'We do not cut corners on credentials. Every professional is verified before they can accept a single shift.',
    },
    {
      _type:       'object' as const,
      _key:        'val-3',
      title:       'Professional Dignity',
      description: 'Healthcare workers deserve reliable pay, clear contracts, and career development — not WhatsApp negotiations and delayed invoices.',
    },
    {
      _type:       'object' as const,
      _key:        'val-4',
      title:       'Transparency',
      description: 'Facilities see exactly who they are hiring. Professionals see exactly what they will earn. No surprises.',
    },
    {
      _type:       'object' as const,
      _key:        'val-5',
      title:       'Continuous Growth',
      description: 'CPD is not a checkbox. We integrate learning into the workflow so professionals grow without disrupting their practice.',
    },
    {
      _type:       'object' as const,
      _key:        'val-6',
      title:       'System Thinking',
      description: 'We solve root causes, not symptoms. Staffing, payroll, compliance, and training are one system — not four separate problems.',
    },
    {
      _type:       'object' as const,
      _key:        'val-7',
      title:       'Patient-Centred Outcomes',
      description: 'Every product decision traces back to one question: does this lead to better patient care in Nigeria?',
    },
  ],

  // ── Team — founder record ─────────────────────────────────────────────────
  // image intentionally omitted — upload via Sanity Studio before launch
  team: [
    {
      _type:    'object' as const,
      _key:     'team-1',
      name:     'Iziegbe Asemota',
      role:     'Founder & CEO',
      bio:
        'Iziegbe founded ProNurtureSphere after years of observing the systemic gaps in ' +
        'Nigerian healthcare staffing. With a background spanning healthcare operations and ' +
        'technology, she set out to build the workforce infrastructure that Nigerian healthcare ' +
        'facilities and professionals have always needed but never had.',
      linkedin: 'https://linkedin.com/company/psl25',
    },
  ],

  // ── Story ─────────────────────────────────────────────────────────────────
  // story.image intentionally omitted — upload via Sanity Studio
  story: {
    headline: 'Why We Built ProNurtureSphere',
    body: [
      block(
        'sb-1',
        'Nigeria trains thousands of healthcare professionals every year. Yet hospitals remain ' +
        'critically understaffed, locum agencies charge fees that drain facility budgets, and ' +
        'nurses leave the country in search of the professional infrastructure they deserve. ' +
        'The problem was never a shortage of talent — it was a shortage of systems.'
      ),
      block(
        'sb-2',
        'ProNurtureSphere was founded to close that gap. We started with a simple question: ' +
        'what would Nigerian healthcare look like if staffing, credentialing, payroll, and CPD ' +
        'all worked together — seamlessly, compliantly, and fairly?'
      ),
      block(
        'sb-3',
        'That question became our product. Today we are building the workforce layer that ' +
        'connects every part of the Nigerian healthcare ecosystem — one verified shift at a time.'
      ),
    ],
  },
}

// ---------------------------------------------------------------------------
// Run the seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log(`\n🌱  Seeding aboutPage → project "${PROJECT_ID}" / dataset "${DATASET}"\n`)

  console.log('  ↳ Writing aboutPage document...')
  const result = await client.createOrReplace(aboutPageDoc)
  console.log(`    ✅ ${result._id}\n`)

  console.log('  Fields seeded:')
  console.log(`    mission.body:   ${aboutPageDoc.mission.body.length} blocks`)
  console.log(`    mission.vision: "${aboutPageDoc.mission.vision.slice(0, 60)}..."`)
  console.log(`    values:         ${aboutPageDoc.values.length} items`)
  console.log(`    team:           ${aboutPageDoc.team.length} member (${aboutPageDoc.team[0].name})`)
  console.log(`    story.headline: "${aboutPageDoc.story.headline}"`)
  console.log(`    story.body:     ${aboutPageDoc.story.body.length} blocks`)
  console.log('\n✅  Done.\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
