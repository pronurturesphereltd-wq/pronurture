import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cfu3qevi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const doc = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroHeadline: 'We\'re Building the Infrastructure Behind a Stronger Healthcare Workforce',
  heroSubheadline: 'PSL exists to help healthcare professionals thrive and healthcare organisations operate more effectively. We believe the future of healthcare in Nigeria depends on connected people, connected systems, and smarter workforce management.',
  story: 'PSL began with a simple observation: healthcare professionals and healthcare employers were using too many disconnected tools. Jobs were shared in WhatsApp groups. Credentials lived in email folders. Staff records sat in spreadsheets. Schedules were managed manually. Compliance was checked during audits instead of continuously.\n\nDespite the incredible work being done across Nigeria\'s healthcare system, the workforce infrastructure supporting that work was fragmented.\n\nThat question became PSL. Today, we\'re building the workforce layer that helps connect every part of Nigeria\'s healthcare ecosystem — one verified professional and one healthcare facility at a time.',
  surveyStats: [
    '52.5% took a job that turned out different from its listing',
    '62.5% are behind on or don\'t know their CPD requirements',
    '87% would complete CPD entirely on mobile if quality is right',
    '97.5% are open to new job opportunities',
    '80% of facilities have no system for tracking staff CPD',
  ],
  surveySource: 'PSL Clinical Workforce Survey, May 2026 — 40 clinical professionals and 5 healthcare facility managers across 13 Nigerian states.',
  values: [
    { _key: 'v1', headline: 'Transparency first', body: 'Every job listing shows salary. Every credential is verified. No surprises.' },
    { _key: 'v2', headline: 'Built for Nigeria', body: 'We design for the Nigerian healthcare context — not a copy of tools built elsewhere.' },
    { _key: 'v3', headline: 'Trust through specifics', body: 'We don\'t make claims we can\'t back with data. Our survey findings drive every product decision.' },
    { _key: 'v4', headline: 'PSL as launchpad', body: 'We measure success by what happens to professionals and facilities after they join — not just when they sign up.' },
  ],
  teamPlaceholder: 'Our team is small and growing. If you\'re passionate about fixing healthcare workforce challenges in Nigeria, we\'d love to hear from you.',
}

async function seed() {
  const result = await client.createOrReplace(doc)
  console.log('Seeded about page:', result._id)
}

seed().catch(console.error)
