import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cfu3qevi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const doc = {
  _id: 'homepage',
  _type: 'homepage',
  heroEyebrow: 'Trusted by Healthcare Professionals, Hospitals & Clinics Across Nigeria',
  heroHeadline: 'The Healthcare Workforce Platform Nigeria Has Been Waiting For.',
  heroSubheadline: 'Whether you\'re advancing your healthcare career or building a high-performing workforce, PSL connects healthcare professionals with trusted employers while simplifying recruitment, workforce management, CPD, compliance, scheduling, and career development — all from one intelligent platform.',
  heroCta1: 'Join as a Healthcare Professional',
  heroCta2: 'Hire Healthcare Professionals',
  heroNote: 'Free to join. No credit card required.',
  painPointsHeading: 'One Platform. Every Workforce Need.',
  professionalsHeading: 'Everything You Need to Build a Successful Healthcare Career',
  facilitiesHeading: 'Everything You Need to Build a Stronger Workforce',
  closingHeadline: 'Build the Future of Healthcare — Starting Today',
  closingSubtext: 'The future of healthcare depends on connected professionals, stronger institutions, and smarter workforce management. PSL brings all three together. Join the platform that\'s helping transform Nigeria\'s healthcare workforce — one professional, one facility, and one opportunity at a time.',
  stats: [
    { _key: 's1', value: '97.5%', label: 'of professionals open to new opportunities', source: 'PSL Survey 2026' },
    { _key: 's2', value: '80%', label: 'of facilities have no CPD tracking system', source: 'PSL Survey 2026' },
    { _key: 's3', value: '52.5%', label: 'took a job different from its listing', source: 'PSL Survey 2026' },
    { _key: 's4', value: '62.5%', label: 'behind on CPD requirements', source: 'PSL Survey 2026' },
  ],
}

async function seed() {
  const result = await client.createOrReplace(doc)
  console.log('Seeded homepage:', result._id)
}

seed().catch(console.error)
