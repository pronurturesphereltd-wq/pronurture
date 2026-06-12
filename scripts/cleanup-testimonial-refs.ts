/**
 * cleanup-testimonial-refs.ts
 *
 * Removes orphaned `testimonials` array references from homePage,
 * employersPage, and professionalsPage singleton documents.
 *
 * These references were left behind after the testimonials field was removed
 * from the schemas. Sanity won't delete the referenced testimonial documents
 * while any document still holds a reference to them.
 *
 * Run with: npm run cleanup:testimonial-refs
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

// Documents that previously held a testimonials[] reference array
const DOCUMENTS_TO_PATCH = ['homePage', 'employersPage', 'professionalsPage']

async function run() {
  console.log('\nCleaning up orphaned testimonial references...\n')

  for (const id of DOCUMENTS_TO_PATCH) {
    try {
      const result = await client
        .patch(id)
        .unset(['testimonials'])
        .commit()

      console.log(`✓ ${id} — testimonials field unset (rev: ${result._rev})`)
    } catch (err) {
      console.error(`✗ ${id} — patch failed:`, err)
    }
  }

  console.log('\nDone. Testimonial documents can now be deleted from Sanity Studio.')
}

run().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
