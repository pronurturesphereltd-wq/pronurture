import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cfu3qevi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const regulatoryBodies = [
  { _key: 'rb1', name: 'Medical and Dental Council of Nigeria', abbreviation: 'MDCN' },
  { _key: 'rb2', name: 'Nursing and Midwifery Council of Nigeria', abbreviation: 'NMCN' },
  { _key: 'rb3', name: 'Pharmacists Council of Nigeria', abbreviation: 'PCN' },
  { _key: 'rb4', name: 'Medical Laboratory Science Council of Nigeria', abbreviation: 'MLSCN' },
  { _key: 'rb6', name: 'Nigerian Medical Association', abbreviation: 'NMA' },
  { _key: 'rb7', name: 'Radiographers Registration Board of Nigeria', abbreviation: 'RRBN' },
]

async function seed() {
  // Patch (not createOrReplace) so this only touches regulatoryBodies and
  // leaves the rest of the homepage document — including anything edited
  // directly in Studio — untouched.
  const result = await client
    .patch('homepage')
    .setIfMissing({ regulatoryBodies: [] })
    .set({ regulatoryBodies })
    .commit({ autoGenerateArrayKeys: false })
  console.log('Seeded regulatoryBodies on homepage:', result._id)
}

seed().catch(console.error)
