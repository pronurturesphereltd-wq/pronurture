import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cfu3qevi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const doc = {
  _id: 'professionalsPage',
  _type: 'professionalsPage',
  heroEyebrow: 'For Healthcare Professionals',
  heroHeadline: 'One Platform. Every Opportunity. Your Entire Healthcare Career.',
  heroSubheadline: 'Whether you\'re looking for your next role, earning CPD credits, managing your professional credentials, or taking on flexible locum shifts, PSL gives you everything you need to build a successful healthcare career — all in one secure platform.',
  heroCta: 'Create Your Free Profile',
  heroCaption: 'Always free for healthcare professionals.',
  painPointsHeading: 'Stop Managing Your Career Across Multiple Platforms',
  featuresHeading: 'Everything Your Healthcare Career Needs',
  closingHeadline: 'Your Next Opportunity Starts Here',
  closingSubtext: 'Whether you\'re searching for a better role, building new skills, completing CPD, or planning your long-term career, PSL gives you the tools to move forward with confidence.',
  painPoints: [
    { _key: 'pp1', headline: 'Finding opportunities', body: 'Job leads scattered across WhatsApp groups, word of mouth, and generic job boards that don\'t understand healthcare.' },
    { _key: 'pp2', headline: 'Tracking CPD', body: 'No single place to log completed courses, monitor your progress, or know exactly where you stand against renewal requirements.' },
    { _key: 'pp3', headline: 'Renewing licences', body: 'Renewal deadlines sneak up with no system tracking them — leading to last-minute scrambles and compliance gaps.' },
    { _key: 'pp4', headline: 'Managing credentials', body: 'Qualifications, certificates, and employment records scattered across emails, folders, and paper files.' },
    { _key: 'pp5', headline: 'Applying for jobs', body: 'Uploading the same documents repeatedly to different employers with no unified professional profile to share.' },
    { _key: 'pp6', headline: 'Keeping employment records', body: 'No verified, portable employment history — making it hard to prove your experience when it matters most.' },
  ],
  features: [
    { _key: 'f1', title: 'Find Verified Healthcare Jobs', description: 'Discover opportunities from trusted hospitals, clinics, diagnostic centres, NGOs, and healthcare organisations across Nigeria. Every job includes transparent salary information so you know exactly what to expect before applying.', icon: 'Briefcase' },
    { _key: 'f2', title: 'Apply Faster', description: 'Forget uploading the same documents repeatedly. Your verified PSL profile allows you to apply for opportunities in just a few clicks — less paperwork, more opportunities.', icon: 'Zap' },
    { _key: 'f3', title: 'Build Your Verified Professional Profile', description: 'Create one secure digital identity covering your qualifications, registration details, employment history, licences, certifications, skills, and CPD records. Your profile stays with you throughout your career.', icon: 'UserCheck' },
    { _key: 'f4', title: 'Complete CPD Anywhere', description: 'Access accredited CPD programmes, complete training online, earn credits, and monitor your progress — all from your dashboard.', icon: 'GraduationCap' },
    { _key: 'f5', title: 'Access Flexible Locum Opportunities', description: 'Choose when and where you work. Browse verified locum opportunities that match your speciality, location, and availability.', icon: 'CalendarCheck' },
    { _key: 'f6', title: 'Never Miss Licence Renewals', description: 'PSL automatically tracks important renewal dates and reminds you before licences, registrations, or certifications expire.', icon: 'Bell' },
    { _key: 'f7', title: 'Track Your Professional Growth', description: 'Healthcare is constantly evolving. PSL helps you understand your strengths, identify competency gaps, and recommends learning paths that align with your specialty and career aspirations.', icon: 'TrendingUp' },
  ],
  faqs: [
    { _key: 'faq1', question: 'Is PSL free for healthcare professionals?', answer: 'Yes. Creating your professional profile and applying for opportunities is completely free.' },
    { _key: 'faq2', question: 'How do I know employers are genuine?', answer: 'Every employer on PSL goes through a verification process before posting opportunities on the platform.' },
    { _key: 'faq3', question: 'Can I use PSL even if I\'m not looking for a new job?', answer: 'Absolutely. Many professionals use PSL to complete CPD training, manage credentials, track licence renewals, and maintain a verified professional profile.' },
    { _key: 'faq4', question: 'How does CPD work?', answer: 'Complete accredited courses directly on the platform, monitor your progress, and keep your professional development records organised in one place.' },
    { _key: 'faq5', question: 'What is a PSL Professional Profile?', answer: 'Your PSL profile is a verified digital record of your professional identity. It securely stores your qualifications, licences, employment history, certifications, skills, and CPD records, making it easy to share with employers whenever needed.' },
    { _key: 'faq6', question: 'Can I find locum opportunities?', answer: 'Yes. PSL connects healthcare professionals with verified locum opportunities across Nigeria, helping you work flexibly while expanding your experience and earning potential.' },
  ],
  disciplines: ['Doctors', 'Nurses', 'Midwives', 'Pharmacists', 'Medical Laboratory Scientists', 'Radiographers', 'Physiotherapists', 'Dentists', 'Community Health Officers', 'Optometrists', 'Nutritionists', 'Healthcare Administrators', 'Public Health Professionals', 'Allied Health Professionals'],
}

async function seed() {
  const result = await client.createOrReplace(doc)
  console.log('Seeded professionals page:', result._id)
}

seed().catch(console.error)
