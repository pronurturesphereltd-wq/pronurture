/**
 * seed-partners.ts
 *
 * Seeds 8 partner documents for Nigeria's leading healthcare bodies.
 * Logo field is intentionally omitted — upload via Sanity Studio.
 *
 * Run: npm run seed:partners
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-26',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

const PARTNERS = [
  {
    _id:  'partner-mdcn',
    name: 'MDCN (Medical and Dental Council of Nigeria)',
    website: 'https://mdcn.gov.ng',
  },
  {
    _id:  'partner-nmcn',
    name: 'NMCN (Nursing and Midwifery Council of Nigeria)',
    website: 'https://nmcn.gov.ng',
  },
  {
    _id:  'partner-nhia',
    name: 'NHIA (National Health Insurance Authority)',
    website: 'https://nhia.gov.ng',
  },
  {
    _id:  'partner-pcn',
    name: 'PCN (Pharmaceutical Council of Nigeria)',
    website: 'https://pcn.gov.ng',
  },
  {
    _id:  'partner-lagos-moh',
    name: 'Lagos State Ministry of Health',
    website: 'https://health.lagosstate.gov.ng',
  },
  {
    _id:  'partner-agpmpn',
    name: 'Association of General and Private Medical Practitioners',
    website: 'https://agpmpn.org',
  },
  {
    _id:  'partner-johesu',
    name: 'JOHESU (Joint Health Sector Unions)',
    website: undefined,
  },
  {
    _id:  'partner-chan',
    name: 'Christian Health Association of Nigeria (CHAN)',
    website: 'https://channigeria.org',
  },
]

async function main() {
  for (const partner of PARTNERS) {
    const doc: Record<string, unknown> = {
      _id:   partner._id,
      _type: 'partner',
      name:  partner.name,
    }
    if (partner.website) doc.website = partner.website

    await client.createOrReplace(doc)
    console.log(`✅ ${partner.name}`)
  }
  console.log('\n✅ All 8 partners seeded. Upload logos via Sanity Studio.')
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
