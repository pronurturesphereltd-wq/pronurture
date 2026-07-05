import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cfu3qevi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const doc = {
  _id: 'employersPage',
  _type: 'employersPage',
  heroEyebrow: 'For Healthcare Employers',
  heroHeadline: 'Build Stronger Healthcare Teams with One Intelligent Workforce Platform',
  heroSubheadline: 'From recruitment and onboarding to scheduling, compliance, CPD, attendance, and workforce analytics, PSL gives hospitals, clinics, and healthcare organisations everything they need to attract, manage, and retain exceptional healthcare professionals — all in one secure platform.',
  heroCta: 'Book a Demo',
  heroSecondaryCta: 'Create Your Facility Account',
  heroCaption: 'Built for hospitals, clinics, diagnostic centres, HMOs, NGOs, and healthcare organisations of every size.',
  painPointsHeading: 'Healthcare Workforce Management Shouldn\'t Be This Difficult',
  featuresHeading: 'Everything You Need to Manage Your Workforce',
  closingHeadline: 'Build the Workforce Your Patients Deserve',
  closingSubtext: 'Exceptional healthcare begins with exceptional people. PSL gives your organisation the tools to recruit smarter, manage more efficiently, stay compliant, and build a workforce prepared for the future of healthcare.',
  painPoints: [
    { _key: 'pp1', headline: 'Recruitment takes too long', body: 'Vacancies stay open for months while departments operate understaffed, increasing pressure on existing staff and affecting patient care.' },
    { _key: 'pp2', headline: 'Staff shortages happen without warning', body: 'You discover you\'re understaffed the day before a shift — not weeks earlier when you could have done something about it.' },
    { _key: 'pp3', headline: 'Shift schedules constantly change', body: 'Last-minute changes, no-shows, and manual roster updates consume hours of administrative time every week.' },
    { _key: 'pp4', headline: 'Attendance is difficult to monitor', body: 'Paper-based attendance records are slow, error-prone, and impossible to analyse without significant manual effort.' },
    { _key: 'pp5', headline: 'Compliance is tracked manually', body: 'Licence renewals, certifications, and CPD deadlines get missed because there\'s no system proactively tracking them.' },
    { _key: 'pp6', headline: 'Training records are scattered', body: 'Employee training and CPD records live across spreadsheets, emails, and filing cabinets — making audits stressful and time-consuming.' },
    { _key: 'pp7', headline: 'Disconnected systems cost time and money', body: 'These fragmented processes waste time, increase costs, and ultimately put patient care at risk.' },
  ],
  features: [
    { _key: 'f1', title: 'Recruit Qualified Professionals Faster', description: 'Access a growing network of verified healthcare professionals across multiple specialties. Post vacancies, review applications, verify credentials, and hire with confidence.', icon: 'UserPlus' },
    { _key: 'f2', title: 'Maintain a Digital Staff Registry', description: 'Create one secure profile for every employee. Store professional licences, qualifications, employment history, certifications, compliance records, and workforce information in one place.', icon: 'Database' },
    { _key: 'f3', title: 'Simplify Shift Scheduling', description: 'Create staff rosters in minutes. Assign shifts, manage rotations, handle last-minute replacements, and ensure every department has the coverage it needs.', icon: 'Calendar' },
    { _key: 'f4', title: 'Attendance & Leave Management', description: 'Track attendance in real time, approve leave requests digitally, monitor absenteeism, and generate attendance reports instantly.', icon: 'CalendarDays' },
    { _key: 'f5', title: 'Onboard New Employees Efficiently', description: 'Standardise your onboarding process with digital checklists. Track documentation, verify credentials, assign mandatory training, and ensure every employee starts fully prepared and compliant.', icon: 'ClipboardList' },
    { _key: 'f6', title: 'Monitor Compliance', description: 'Never lose track of licence renewals, certifications, mandatory training, or CPD completion. Receive automatic alerts before compliance issues become operational risks.', icon: 'ShieldCheck' },
    { _key: 'f7', title: 'Workforce Planning & Forecasting', description: 'Use workforce insights to anticipate vacancies, monitor turnover trends, and identify staffing gaps before they impact patient care.', icon: 'TrendingUp' },
    { _key: 'f8', title: 'Workforce Analytics', description: 'Transform workforce data into actionable insights. Monitor staff utilisation, vacancy trends, turnover, attendance, CPD completion, compliance rates, and department performance.', icon: 'PieChart' },
  ],
  faqs: [
    { _key: 'faq1', question: 'Can I recruit permanent and locum staff?', answer: 'Yes. PSL supports both permanent recruitment and verified locum staffing, giving you the flexibility to meet changing workforce demands.' },
    { _key: 'faq2', question: 'How are healthcare professionals verified?', answer: 'Professional registrations, licences, qualifications, and employment information are verified before candidates become available to employers. This helps reduce recruitment risks and saves valuable screening time.' },
    { _key: 'faq3', question: 'Does PSL support attendance and leave management?', answer: 'Absolutely. Track attendance, approve leave requests, monitor absenteeism, and generate reports from one integrated dashboard.' },
    { _key: 'faq4', question: 'Can PSL help with workforce planning?', answer: 'Yes. Our workforce forecasting tools help you identify staffing shortages, monitor vacancy trends, and prepare for future workforce needs before they become operational challenges.' },
    { _key: 'faq5', question: 'Is CPD included?', answer: 'Yes. Managers can monitor CPD completion across teams, assign required learning, and ensure employees remain compliant with professional development requirements.' },
    { _key: 'faq6', question: 'Can PSL integrate with our existing HR or payroll system?', answer: 'PSL is designed to work alongside existing HR and payroll processes while reducing manual administration. Integration capabilities continue to expand as the platform evolves.' },
  ],
  stats: [
    { _key: 's1', value: '97.5%', label: 'of professionals open to new opportunities', source: 'PSL Survey 2026' },
    { _key: 's2', value: '80%', label: 'of facilities have no CPD tracking system', source: 'PSL Survey 2026' },
    { _key: 's3', value: '52.5%', label: 'took a job different from its listing', source: 'PSL Survey 2026' },
    { _key: 's4', value: '62.5%', label: 'behind on CPD requirements', source: 'PSL Survey 2026' },
  ],
}

async function seed() {
  const result = await client.createOrReplace(doc)
  console.log('Seeded employers page:', result._id)
}

seed().catch(console.error)
