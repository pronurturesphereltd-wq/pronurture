/**
 * patch-homepage-copy.ts
 *
 * Patches the homePage hero copy and siteSettings footerTagline in Sanity
 * to reflect the dual-audience copy rewrite.
 *
 * Run: npx tsx scripts/patch-homepage-copy.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import path from 'path'

// Load .env.local so SANITY_API_WRITE_TOKEN is available
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-26',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

async function main() {
  // ── 1. Patch homePage hero ─────────────────────────────────────────────
  await client.patch('homePage').set({
    'hero.headline':    'Your career. Their workforce. One platform for both.',
    'hero.subheadline': 'For clinical professionals: find verified jobs with salary shown, earn MDCN/NMCN-aligned CPD on your phone, and pick up locum shifts. For healthcare facilities: post vacancies, access pre-verified candidates, and keep your entire team compliant — in one place.',
    'hero.ctaText':     "I'm a healthcare professional",
    'hero.ctaLink':     '/waitlist?role=professional',
  }).commit()
  console.log('✅ homePage hero patched')

  // ── 2. Patch siteSettings footerTagline ───────────────────────────────
  await client.patch('siteSettings').set({
    footerTagline: "PSL is Nigeria's career platform for clinical professionals and the facilities that hire them.",
  }).commit()
  console.log('✅ siteSettings footerTagline patched')

  console.log('\n✅ All patches complete.')
}

main().catch((err) => {
  console.error('❌ Patch failed:', err)
  process.exit(1)
})
