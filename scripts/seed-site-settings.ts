/**
 * seed-site-settings.ts
 *
 * Creates (or replaces) the siteSettings singleton document in Sanity.
 * Uses createOrReplace with the fixed _id "siteSettings" so running this
 * script multiple times is safe — it will not create duplicates.
 *
 * Logo images are excluded — upload those manually via Sanity Studio.
 *
 * Run with: npm run seed:settings
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
  projectId:  env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token:      env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
})

// ---------------------------------------------------------------------------
// siteSettings document — matches siteSettings schema fields
// ---------------------------------------------------------------------------
async function run() {
  console.log('\nSeeding siteSettings...\n')

  const doc = {
    _id:   'siteSettings',
    _type: 'siteSettings',
    siteName:      'ProNurtureSphere',
    tagline:       "Nigeria's digital platform for healthcare workforce management. Staffing, rostering, payroll, and CPD in one place.",
    email:         'hello@pronurture.com',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/psl25/',
      twitter:  'https://x.com/pronurture',
    },
    copyrightText: '© 2026 ProNurtureSphere Limited. All rights reserved.',
    footerTagline: 'Empowering Nigerian Healthcare Workforce',
  }

  const result = await client.createOrReplace(doc)
  console.log(`✓ siteSettings created/replaced — _id: ${result._id}`)
  console.log('\nFields seeded:')
  console.log(`  siteName:      ${doc.siteName}`)
  console.log(`  tagline:       ${doc.tagline}`)
  console.log(`  email:         ${doc.email}`)
  console.log(`  linkedin:      ${doc.socialLinks.linkedin}`)
  console.log(`  twitter:       ${doc.socialLinks.twitter}`)
  console.log(`  copyrightText: ${doc.copyrightText}`)
  console.log(`  footerTagline: ${doc.footerTagline}`)
  console.log('\nNote: Upload logo and logoMono images manually in Sanity Studio.')
}

run().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
