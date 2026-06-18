import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cfu3qevi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const post = {
  _type: 'blogPost',
  title: 'MDCN vs NMCN: What Every Professional Needs to Know',
  slug: { _type: 'slug', current: 'mdcn-vs-nmcn-what-you-need-to-know' },
  category: 'For Professionals',
  excerpt: 'Top SEO target — demystifies the CPD landscape',
  publishedAt: new Date().toISOString(),
  body: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "For Nigerian clinical professionals, knowing which regulatory council governs your practice isn't trivia — it determines your license renewal requirements, your CPD obligations, and where your professional record actually lives. Here's the distinction, in plain terms." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Who each council regulates' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'The Nursing and Midwifery Council of Nigeria oversees nurses and midwives. It was established by Decree No. 89 of 1979, and its mandate covers nursing and midwifery education standards, licensing exams, and practice regulation across the country.' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "The Medical and Dental Council of Nigeria regulates medicine, dentistry, and alternative medicine in Nigeria under the Medical and Dental Practitioners Act. It succeeded the earlier Nigerian Medical Council, which had regulated the profession since 1963, when MDCN was established in 1988. If you're a doctor, dentist, or alternative medicine practitioner, MDCN is your regulator, not NMCN." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'What each council actually does' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "MDCN accredits medical and dental training institutions in Nigeria and abroad, checking that curricula, facilities, and faculty meet required standards. Foreign-trained graduates must pass MDCN's licensing exam, commonly called the Assessment Examination, before they can register and practice in Nigeria. MDCN also runs a disciplinary tribunal that handles misconduct and malpractice complaints, with sanctions ranging from suspension to de-registration." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "NMCN's role is structurally similar but specific to nursing and midwifery — accrediting training institutions, running qualifying exams, and maintaining the professional register." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'CPD and renewal: where the two diverge' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'This is where the practical difference shows up most. For nurses and midwives, the requirement is 6 CPD credit units (60 hours) under NMCN’s Mandatory Continuing Professional Development Programme to renew a practice license, with diaspora nurses needing 3 CEUs (30 hours) through an approved platform.' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'For doctors and dentists, the numbers are different. Since August 2025, WCEA has partnered with MDCN on a mandatory CPD subscription plan, and diaspora doctors, dentists, and clinical officers must maintain an active WCEA subscription and complete either 20 or 15 CPD points, depending on cadre, to renew their license. Completed courses post their CPD points directly into the practitioner’s MDCN portal profile.' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "If you mix these up — applying NMCN's 6-unit requirement to an MDCN renewal, for example — you'll either undershoot what you actually need or waste time on courses that don't count toward your real license." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Licensing fees differ too' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "MDCN's licensing fee is N20,000 for practitioners with 10 or more years of standing, and N10,000 for those with less than 10 years. NMCN's registration and renewal fee structure is separate and should be checked directly on the NMCN portal, since it varies by registration category." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: "Why this matters for your career, not just your paperwork" }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "If you're a clinical professional working across settings — say, a dentist who also has a nursing qualification, or a facility that employs both doctors and nurses — knowing which council governs which staff member isn't optional. Compliance audits, insurance, and accreditation all check against the correct register. A mismatch here isn't a clerical error; it can mean a credential doesn't actually verify when it's checked." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "This is also why PSL verifies practitioners against the correct council before listing them — a doctor's credentials get checked against MDCN, a nurse's against NMCN, not interchangeably." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'Source: MDCN Mandate, Mission and Vision; NMCN Decree No. 89, 1979; WCEA MDCN and NMCN CPD partnership documentation.', marks: ['em'] }],
    },
  ],
}

async function seed() {
  const result = await client.create(post)
  console.log('Created blog post:', result._id)
}

seed().catch(console.error)
