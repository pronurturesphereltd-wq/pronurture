/**
 * update-post-categories.ts
 *
 * Patches the `category` field on the 10 seeded blog posts in Sanity.
 * Looks up each post by its slug, then sets the category slug value.
 *
 * Run with: npm run update:categories
 * Requires SANITY_API_WRITE_TOKEN (Editor level) in .env.local
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@sanity/client'

// ---------------------------------------------------------------------------
// Load .env.local manually — tsx doesn't auto-load dotenv
// ---------------------------------------------------------------------------
const envPath = path.join(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env = Object.fromEntries(
  envContent
    .split('\n')
    .filter((line) => line.includes('=') && !line.startsWith('#'))
    .map((line) => {
      const [key, ...rest] = line.split('=')
      return [key.trim(), rest.join('=').trim()]
    })
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token:     env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

// ---------------------------------------------------------------------------
// Slug → category slug mappings
// ---------------------------------------------------------------------------
const SLUG_TO_CATEGORY: Record<string, string> = {
  'healthcare-staffing-challenges-nigeria':       'industry-insights',
  'digital-rostering-reduces-shift-gaps-nigeria':  'for-employers',
  'payroll-compliance-healthcare-workers-nigeria': 'cpd-compliance',
  'cpd-requirements-nigerian-nurses':             'for-professionals',
  'credential-verification-nigerian-healthcare':  'for-employers',
  'reduce-locum-agency-costs-in-house-platform':  'for-employers',
  'workforce-burnout-nigerian-healthcare':        'for-professionals',
  'future-telemedicine-staffing-nigeria':         'industry-insights',
  'technology-transforming-healthcare-hr-africa': 'industry-insights',
  'building-compliant-healthcare-workforce-nigeria': 'cpd-compliance',
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function run() {
  console.log(`\nPatching categories on ${Object.keys(SLUG_TO_CATEGORY).length} posts...\n`)

  const results: {
    slug: string
    id: string
    category: string
    status: 'UPDATED' | 'NOT FOUND'
  }[] = []

  for (const [slug, category] of Object.entries(SLUG_TO_CATEGORY)) {
    // Explicitly exclude drafts so we always patch the published document
    const doc = await client.fetch<{ _id: string } | null>(
      `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] { _id }`,
      { slug }
    )

    if (!doc) {
      results.push({ slug, id: '—', category, status: 'NOT FOUND' })
      continue
    }

    await client.patch(doc._id).set({ category }).commit()
    results.push({ slug, id: doc._id, category, status: 'UPDATED' })
  }

  // Print results table
  const COL1 = 52
  const COL2 = 23
  const COL3 = 14
  const header = `${'SLUG'.padEnd(COL1)} ${'CATEGORY'.padEnd(COL2)} ${'DOC ID'.padEnd(COL3)} STATUS`
  console.log(header)
  console.log('-'.repeat(header.length))
  for (const r of results) {
    console.log(
      `${r.slug.padEnd(COL1)} ${r.category.padEnd(COL2)} ${r.id.padEnd(COL3)} ${r.status}`
    )
  }

  const updated = results.filter((r) => r.status === 'UPDATED').length
  const notFound = results.filter((r) => r.status === 'NOT FOUND').length
  console.log(`\n✓ ${updated} updated   ${notFound > 0 ? `✗ ${notFound} not found` : ''}`)
}

run().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
