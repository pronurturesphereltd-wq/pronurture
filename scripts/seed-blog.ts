/**
 * scripts/seed-blog.ts
 *
 * Seeds 10 blog posts (and one author) into Sanity using createOrReplace,
 * so re-running is safe and idempotent.
 *
 * Run:  npm run seed:blog
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 *
 * NOTE: The `post` schema has no `categories` field — none was added.
 */

import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ---------------------------------------------------------------------------
// Load .env.local — avoids needing dotenv as a dependency
// ---------------------------------------------------------------------------
function loadEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const raw = readFileSync(envPath, 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    // .env.local not found — relying on existing process.env
  }
}
loadEnvLocal()

// ---------------------------------------------------------------------------
// Sanity write client
// ---------------------------------------------------------------------------
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'cfu3qevi'
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_VER    = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-26'
const TOKEN      = process.env.SANITY_API_WRITE_TOKEN

if (!TOKEN) {
  console.error('❌  SANITY_API_WRITE_TOKEN is not set. Add it to .env.local and retry.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: API_VER,
  token:     TOKEN,
  useCdn:    false, // must be false for mutations
})

// ---------------------------------------------------------------------------
// Portable Text helpers
// Generates unique _key values required by Sanity's block array validator.
// ---------------------------------------------------------------------------
let _keyCounter = 0
function k() { return `k${++_keyCounter}` }

function block(text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: k(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
  }
}

const h2 = (text: string) => block(text, 'h2')
const h3 = (text: string) => block(text, 'h3')
const p  = (text: string) => block(text, 'normal')

// ---------------------------------------------------------------------------
// Author document — upserted before posts
// ---------------------------------------------------------------------------
const AUTHOR_ID = 'author-editorial-team'

const authorDoc = {
  _id:   AUTHOR_ID,
  _type: 'author',
  name:  'ProNurtureSphere Editorial Team',
  slug:  { _type: 'slug', current: 'pronurturesphere-editorial-team' },
  role:  'Content & Research',
}

// ---------------------------------------------------------------------------
// Reference helper
// ---------------------------------------------------------------------------
function ref(id: string) {
  return { _type: 'reference', _ref: id }
}

// ---------------------------------------------------------------------------
// 10 blog posts
// ---------------------------------------------------------------------------
const posts = [

  // ── 1 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-1',
    _type:       'post',
    title:       'Healthcare Staffing Challenges in Nigeria: Causes and Solutions',
    slug:        { _type: 'slug', current: 'healthcare-staffing-challenges-nigeria' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-06-01T09:00:00.000Z',
    excerpt:
      "Nigeria's healthcare sector faces a deepening staffing crisis driven by emigration, inadequate training pipelines, and manual HR systems. " +
      'This article unpacks the root causes and explores practical digital solutions for hospitals and clinics.',
    body: [
      h2('The Scale of the Problem'),
      p("Nigeria has one of the most acute healthcare staffing challenges in sub-Saharan Africa. With a doctor-to-patient ratio of roughly 1:2,500 against the WHO recommended 1:600, the gap between demand and supply is stark. Public and private hospitals alike struggle to maintain safe staffing levels, particularly in rural and peri-urban settings."),
      p(`The "japa" wave — a colloquial term for the mass emigration of Nigerian professionals — has accelerated these shortages. Between 2020 and 2025, over 15,000 Nigerian doctors registered with the UK's General Medical Council alone, representing a significant drain on domestic capacity.`),
      h2('Root Causes'),
      h3('Training Pipeline Gaps'),
      p("Nigeria trains roughly 2,000 medical doctors per year across its medical schools, but this figure is far below the annual attrition through retirement, emigration, and career changes. The nursing pipeline is similarly constrained, with many training institutions operating below accredited capacity due to faculty shortages and infrastructure deficits."),
      h3('Manual and Fragmented HR Systems'),
      p("A large proportion of Nigerian hospitals — particularly private clinics and maternity homes — still manage workforce operations via WhatsApp groups, paper rosters, and Excel spreadsheets. This fragmentation means shift gaps are discovered at the last minute, locum sourcing is reactive rather than planned, and payroll errors erode staff trust."),
      h2('Digital Solutions That Work'),
      p("Integrated workforce platforms that combine shift management, credential tracking, and payroll are proving transformative in markets comparable to Nigeria. The key is designing for low-bandwidth mobile environments and incorporating Nigerian-specific payroll rules — PAYE, NHIS contributions, and pension deductions under the Contributory Pension Scheme."),
      p("ProNurtureSphere is built specifically for this context: hospitals can post shifts in minutes, verify professional licences before deployment, and hand off timesheets directly to payroll — eliminating the manual reconciliation that currently consumes HR departments."),
      h2('Conclusion'),
      p("Solving Nigeria's healthcare staffing crisis requires a combination of policy reform and operational technology. While the structural issues take years to address, digital workforce management tools can deliver immediate relief by making every available clinician visible, verified, and deployable."),
    ],
  },

  // ── 2 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-2',
    _type:       'post',
    title:       'How Digital Rostering Reduces Shift Gaps in Nigerian Hospitals',
    slug:        { _type: 'slug', current: 'digital-rostering-reduces-shift-gaps-nigeria' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-05-18T09:00:00.000Z',
    excerpt:
      'Shift gaps are one of the most costly and dangerous problems facing Nigerian hospitals. ' +
      'Digital rostering platforms are eliminating last-minute scrambles by giving ward managers real-time visibility over their staffing position.',
    body: [
      h2('What Is a Shift Gap and Why Does It Matter?'),
      p("A shift gap occurs when a scheduled clinician is unavailable and no qualified replacement is in place before the shift begins. In a ward setting, this can mean a single nurse covering double the patients, procedures being postponed, or — in the worst cases — adverse patient events that are directly attributable to understaffing."),
      p("In Nigeria, shift gaps are frequently caused by last-minute sick calls communicated over WhatsApp, a lack of a pre-approved locum panel, and no automated alert system when staffing falls below safe levels. The result is that ward managers spend up to two hours per incident calling around contacts personally."),
      h2('How Manual Rostering Creates the Problem'),
      p("Traditional paper rosters or basic spreadsheet schedules are static: they reflect a plan made a fortnight ago and offer no real-time view of who has confirmed, who has called in sick, or who is available to cover. The information asymmetry between the ward and the HR department means that gaps are often discovered at handover — far too late for an orderly response."),
      h2('The Digital Rostering Difference'),
      h3('Real-Time Availability Pools'),
      p("Digital platforms maintain a live pool of verified, available clinicians. When a gap appears, the system can automatically surface qualified candidates by role, proximity, and current availability — turning a two-hour phone-around into a five-minute automated alert."),
      h3('Shift Confirmation Workflows'),
      p("Rather than assuming a scheduled clinician will show up, digital rosters require app-based confirmation 24 to 48 hours before the shift. This surfaces potential gaps days in advance, giving managers time to arrange cover through internal reallocation or locum deployment."),
      h3('Compliance Safeguards'),
      p("Smart rostering systems can enforce minimum rest periods between shifts — a requirement under Nigerian Medical and Dental Council guidelines — and prevent scheduling a clinician whose licence has lapsed. These safeguards run automatically, removing the compliance burden from ward managers."),
      h2('The Business Case for Nigerian Hospitals'),
      p("Reducing locum agency dependency by even 30% through better internal rostering can save a 50-bed private hospital ₦2–4 million per year in agency fees. Digital rostering platforms typically pay for themselves within three to four months of adoption, even at mid-range subscription tiers."),
    ],
  },

  // ── 3 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-3',
    _type:       'post',
    title:       'Payroll Compliance for Healthcare Workers in Nigeria',
    slug:        { _type: 'slug', current: 'payroll-compliance-healthcare-workers-nigeria' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-05-03T09:00:00.000Z',
    excerpt:
      'Payroll errors and non-compliance with PAYE, NHIS, and pension regulations are common pain points for Nigerian healthcare employers. ' +
      "This guide outlines the key obligations and how integrated payroll tools keep clinics on the right side of the law.",
    body: [
      h2('Why Payroll Compliance Matters in Healthcare'),
      p("Healthcare workers are among the most mobile professionals in Nigeria. A payroll error — whether a miscalculated deduction or a delayed payment — can accelerate turnover in a sector that is already losing talent to the UK, Canada, and the Gulf states. Beyond retention, payroll non-compliance exposes healthcare employers to fines from the Federal Inland Revenue Service (FIRS), the National Pension Commission (PenCom), and the National Health Insurance Authority (NHIA)."),
      h2('Key Statutory Deductions'),
      h3('PAYE (Pay As You Earn)'),
      p("All employment income earned in Nigeria is subject to PAYE under the Personal Income Tax Act. Employers are required to deduct tax at the point of payment and remit it to the relevant State Internal Revenue Service by the 10th of the following month. Rates are graduated: income up to ₦300,000 is taxed at 7%, with the top band above ₦3.2 million attracting 24%."),
      h3('Contributory Pension Scheme'),
      p("Under the Pension Reform Act 2014, employers with three or more staff must enrol all employees in the Contributory Pension Scheme. The minimum contribution is 10% employer and 8% employee of monthly emoluments (basic salary, housing, and transport allowances). Failure to register or remit on time attracts penalties of 2% of the unpaid amount per month."),
      h3('National Health Insurance Authority'),
      p("Employers with 10 or more staff are required to register under the NHIA and deduct the standard contribution from both employer and employee payrolls. The newly enacted NHIA Act 2022 has extended mandatory coverage, and inspections of private facilities are increasing."),
      h2('Common Payroll Mistakes in Nigerian Healthcare'),
      p("The most frequent errors we see in small-to-medium private hospitals are: incorrect application of tax relief calculations, failure to distinguish between locum (contract) and permanent (PAYE) engagements, and late or absent pension remittances when staff numbers grow past the three-person threshold."),
      h2('How Integrated Payroll Tools Help'),
      p("Platforms that connect rostering and timesheets directly to payroll eliminate the manual re-entry that causes most calculation errors. When actual hours worked flow automatically into a payroll engine configured with current Nigerian tax tables and statutory rates, the risk of miscalculation drops dramatically. ProNurtureSphere's payroll module is pre-configured for Nigerian compliance requirements, including integration with PFAs for pension remittance."),
    ],
  },

  // ── 4 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-4',
    _type:       'post',
    title:       'CPD Requirements for Nigerian Nurses and How to Meet Them',
    slug:        { _type: 'slug', current: 'cpd-requirements-nigerian-nurses' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-04-21T09:00:00.000Z',
    excerpt:
      'The Nursing and Midwifery Council of Nigeria requires practising nurses to earn continuing professional development credits for licence renewal. ' +
      'We explain the requirements, common hurdles, and how digital platforms are making CPD more accessible.',
    body: [
      h2('What Is CPD and Why Is It Mandatory?'),
      p("Continuing Professional Development (CPD) is structured learning that keeps practising clinicians current with evolving evidence, clinical guidelines, and safe practice standards. For nurses and midwives in Nigeria, the Nursing and Midwifery Council of Nigeria (NMCN) mandates CPD participation as a condition of biennial licence renewal."),
      p("The rationale is straightforward: a nurse who qualified in 2010 and has not engaged in formal learning since then may be practising against outdated protocols. CPD is the mechanism that prevents clinical drift and protects patients."),
      h2('Current NMCN CPD Requirements'),
      p("As of 2025, the NMCN requires practising nurses and midwives to accumulate a minimum number of CPD credit hours per renewal cycle. Credits can be earned through approved workshops, conferences, online courses, and supervised clinical training. Not all learning activities qualify — they must be delivered by NMCN-accredited providers."),
      h2('Common Barriers to CPD Completion'),
      h3('Cost'),
      p("Accredited CPD programmes in Nigeria can cost between ₦15,000 and ₦80,000 per credit, depending on the provider and format. For a ward nurse earning ₦80,000–₦150,000 per month, this is a significant financial burden, particularly when employers do not fund CPD."),
      h3('Access and Geography'),
      p("The majority of accredited CPD providers are concentrated in Lagos, Abuja, and Port Harcourt. A nurse working in Kebbi or Cross River State faces both the cost of the course and travel and accommodation expenses to attend in person."),
      h3('Tracking and Documentation'),
      p("Many nurses rely on physical certificates that are easily lost or damaged. When renewal time comes, reconstructing a CPD history from scattered paperwork is stressful and sometimes results in avoidable renewal delays."),
      h2('How Digital Platforms Are Solving the CPD Problem'),
      p("Online CPD delivery — where NMCN-approved content is hosted on a digital platform accessible via mobile — dramatically reduces both cost and access barriers. ProNurtureSphere's learning module provides short, accredited modules that nurses can complete during breaks or off-shift hours. Completion certificates are stored automatically against the clinician's profile, creating a verified CPD record that feeds directly into licence renewal documentation."),
    ],
  },

  // ── 5 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-5',
    _type:       'post',
    title:       'Credential Verification in Nigerian Healthcare: Why It Matters',
    slug:        { _type: 'slug', current: 'credential-verification-nigerian-healthcare' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-04-07T09:00:00.000Z',
    excerpt:
      'Hiring unverified clinical staff remains a significant risk for Nigerian healthcare facilities, exposing patients to harm and hospitals to regulatory action. ' +
      'This article explains what robust credential verification looks like and how technology automates the process.',
    body: [
      h2('The Risk of Unverified Credentials'),
      p("In 2023, the Medical and Dental Council of Nigeria (MDCN) disclosed that it had identified a growing number of individuals practising with fake or lapsed licences in private facilities, particularly in secondary cities where regulatory oversight is thinner. For a hospital that employs such an individual, the consequences extend beyond patient safety to include potential criminal liability for the medical director and reputational damage that can be terminal for a private facility."),
      p("The same risk applies to nurses, pharmacists, and allied health professionals. The NMCN, Pharmacy Council of Nigeria (PCN), and Medical Laboratory Science Council of Nigeria (MLSCN) all maintain registers — but checking them manually for every new hire is time-consuming and easy to skip when a ward is short-staffed and a candidate presents ready to start immediately."),
      h2('What Credential Verification Should Cover'),
      h3('Primary Qualification'),
      p("Verification of the degree, certificate, or diploma claimed by the candidate — ideally by contacting the awarding institution directly or using a recognised verification service."),
      h3('Professional Registration'),
      p("Confirmation that the candidate holds a current, unexpired registration with the relevant council. This should include checking whether any fitness-to-practise proceedings are recorded against the individual."),
      h3('Practising Licence'),
      p("Separate from registration, the annual or biennial practising licence must be current. An individual can be registered but hold an expired practising licence — a distinction that is frequently confused in manual HR processes."),
      h3('Previous Employment References'),
      p("At least two clinical references from supervisors at previous healthcare employers, specifically addressing clinical competence, conduct, and any concerns about the candidate's practice."),
      h2('How Technology Automates Verification'),
      p("Digital workforce platforms can store verified credential documents against a clinician's profile and track expiry dates automatically. When a licence is approaching renewal, both the clinician and the deploying facility receive an alert. This moves credential management from a reactive, paper-based process to a proactive, automated one — ensuring no hospital inadvertently deploys a clinician with a lapsed credential."),
    ],
  },

  // ── 6 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-6',
    _type:       'post',
    title:       'How to Reduce Locum Agency Costs with an In-House Staffing Platform',
    slug:        { _type: 'slug', current: 'reduce-locum-agency-costs-in-house-platform' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-03-20T09:00:00.000Z',
    excerpt:
      'Nigerian hospitals are spending 20–40% more per locum shift than necessary because agency fees inflate the true cost of temporary staffing. ' +
      'Building an in-house locum panel via a digital platform can reclaim that margin while improving fill rates.',
    body: [
      h2('The True Cost of Agency Dependency'),
      p("Traditional locum agencies in Nigeria typically charge a placement fee of 15–25% on top of the clinician's rate, plus VAT. For a locum doctor filling a weekend shift at ₦50,000, the all-in agency cost to the hospital could reach ₦65,000–₦70,000. Across a calendar year of frequent locum use, this overhead is substantial — often representing the largest uncontrolled labour cost on a hospital's P&L."),
      p("Beyond the financial cost, agency dependency creates operational risk. Agencies prioritise their highest-fee clients; during periods of system-wide staffing pressure — like public holiday weekends or infectious disease outbreaks — hospitals without their own locum relationships may simply not receive a placement."),
      h2('Building an In-House Locum Panel'),
      h3('Step 1: Map Your Locum Spend'),
      p("Before switching approach, quantify your current spend by role, shift type, and agency. Most hospitals discover that 70% of their locum volume is concentrated in three or four clinical roles — typically ward nurses, accident and emergency doctors, and pharmacists. This focus area is where an in-house panel delivers the fastest return."),
      h3('Step 2: Establish a Verified Candidate Pool'),
      p("A digital platform allows you to onboard clinicians who have expressed interest in locum work with your facility. Each candidate completes a verified profile — credentials, licences, bank details for payment — before being added to the pool. This one-time investment eliminates the per-engagement agency vetting fee."),
      h3('Step 3: Deploy Through the Platform'),
      p("When a shift gap arises, the platform notifies available, verified clinicians in the pool and captures acceptance digitally. The shift is filled without an agency intermediary — and the clinician receives the full rate (or a negotiated improved rate), which also improves their loyalty to your panel over agency alternatives."),
      h2('What to Expect'),
      p("Hospitals that build active in-house panels via digital platforms typically report a 25–40% reduction in per-shift locum costs within six months and significantly better fill rates during high-demand periods. The upfront investment in platform onboarding typically breaks even within four to six months of active use."),
    ],
  },

  // ── 7 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-7',
    _type:       'post',
    title:       'Workforce Burnout in Nigerian Healthcare: Signs and Prevention',
    slug:        { _type: 'slug', current: 'workforce-burnout-nigerian-healthcare' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-03-05T09:00:00.000Z',
    excerpt:
      'Burnout among Nigerian healthcare workers has reached crisis levels, driving poor clinical outcomes and accelerating the "japa" emigration wave. ' +
      'This article identifies the warning signs and outlines evidence-based prevention strategies for healthcare managers.',
    body: [
      h2('Burnout Is Not Just Tiredness'),
      p("Clinical burnout is a recognised occupational syndrome characterised by emotional exhaustion, depersonalisation (treating patients as objects rather than people), and a reduced sense of personal accomplishment. The World Health Organisation classifies it as an occupational phenomenon in the ICD-11, and Nigerian research consistently identifies healthcare workers as one of the highest-risk occupational groups."),
      p("For Nigerian clinicians, the syndrome is amplified by structural factors: chronic understaffing that forces individuals to absorb the work of missing colleagues, irregular or delayed salaries, poor physical working environments, and the psychological weight of practising medicine with inadequate resources."),
      h2('Early Warning Signs'),
      h3('Increased Absenteeism'),
      p("One of the earliest measurable signals of burnout is rising unplanned absences. Staff who are approaching burnout often begin taking more sick days as a coping mechanism. Digital rostering systems can flag this pattern early — a clinician whose unplanned absence rate has doubled over three months deserves a welfare conversation before the situation becomes critical."),
      h3('Reduced Quality of Documentation'),
      p("Burned-out clinicians tend to cut corners on documentation that they see as peripheral to patient care. Deteriorating note quality, incomplete handover documentation, and missed incident reports are clinical governance red flags that also indicate workforce welfare problems."),
      h3('Voluntary Turnover Signals'),
      p("Requests for reduced hours, shift pattern changes, or reference requests from colleagues heading overseas are leading indicators of impending voluntary turnover. Tracking these at a workforce level — not just individual management conversations — allows HR to spot retention risk early."),
      h2('Prevention Strategies That Work'),
      p("The evidence base for burnout prevention points consistently to three interventions: workload reduction through better staffing (the fundamental fix), peer support structures that normalise help-seeking among clinicians, and organisational culture that genuinely values clinician wellbeing."),
      p("Digital tools support prevention by ensuring fair scheduling — preventing the same individuals from consistently absorbing extra shifts — providing transparent workload data to management, and enabling rapid escalation when staffing ratios fall below safe thresholds."),
    ],
  },

  // ── 8 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-8',
    _type:       'post',
    title:       'The Future of Telemedicine Staffing in Nigeria',
    slug:        { _type: 'slug', current: 'future-telemedicine-staffing-nigeria' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-02-18T09:00:00.000Z',
    excerpt:
      'Telemedicine is growing rapidly in Nigeria, creating a new category of clinical work that existing staffing models are not designed to support. ' +
      'This article explores how workforce management platforms need to evolve to serve the telehealth economy.',
    body: [
      h2("Nigeria's Telemedicine Landscape in 2026"),
      p("The COVID-19 pandemic forced a rapid, largely unplanned expansion of telemedicine in Nigeria. A growing number of platforms brought asynchronous consultation, remote monitoring, and video-based GP services to millions of Nigerians for the first time. By 2026, telemedicine is no longer an emergency workaround — it is a permanent feature of healthcare delivery."),
      p("This shift has created a new category of clinical employment: the remote clinician. A doctor or nurse in Ibadan can now deliver consultations to patients in Sokoto without relocating, filling geographic gaps in specialist access that physical staffing could never bridge cost-effectively."),
      h2('Staffing Challenges Unique to Telemedicine'),
      h3('Shift Structures'),
      p("Telemedicine consultation demand does not follow the same peaks and troughs as in-patient ward work. Demand spikes on weekday evenings and Saturday mornings when working Nigerians can access care without taking time off. Staffing models borrowed from in-patient settings — fixed 8-hour or 12-hour shifts — create either overstaffed quieter periods or understaffed demand peaks."),
      h3('Multi-Platform Complexity'),
      p("A clinician servicing telemedicine demand may work across multiple platforms in a single week — hospital-employed for core hours and independently consulting via one or more telehealth apps in their non-contracted time. Credential tracking, practising licence compliance, and working-time regulation become more complex in a multi-platform environment."),
      h3('Payment Models'),
      p("Telemedicine work is typically paid on a per-consultation basis rather than an hourly or salary model. This creates payroll complexity — especially for tax purposes — that standard Nigerian healthcare payroll tools are not designed to handle."),
      h2('What the Next Generation of Staffing Platforms Needs to Deliver'),
      p("Effective telemedicine workforce management requires platforms that support flexible session-based shift structures, automated credential verification across multiple deploying organisations, and payroll engines capable of handling per-consultation income alongside traditional salary components. The boundary between in-person and remote clinical work will continue to blur over the next decade."),
    ],
  },

  // ── 9 ────────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-9',
    _type:       'post',
    title:       'How Technology Is Transforming Healthcare HR in Africa',
    slug:        { _type: 'slug', current: 'technology-transforming-healthcare-hr-africa' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2026-02-03T09:00:00.000Z',
    excerpt:
      "From Kenya's digital staff registries to South Africa's nurse placement apps, African healthcare is embracing technology-led HR transformation. " +
      'Nigeria is poised to lead the next wave — if its private hospital sector commits to digital adoption.',
    body: [
      h2('A Continent-Wide Shift'),
      p("Africa's healthcare systems have historically been characterised as technology laggards, hampered by infrastructure deficits and constrained public budgets. But the last five years have seen a remarkable acceleration in healthcare technology adoption, driven not by governments but by the private sector and the start-up ecosystem. From mobile health finance tools to drone-based pharmaceutical supply chains, the continent is developing indigenous solutions to infrastructure-constrained healthcare delivery."),
      p("In HR and workforce management specifically, the shift is being driven by the same forces that accelerated technology adoption in other industries: mobile-first connectivity, a young and tech-comfortable workforce, and the growing unaffordability of manual processes as healthcare facilities scale."),
      h2('Case Studies Across the Continent'),
      h3('Kenya: Digital Staff Registries'),
      p("Kenya's Ministry of Health has deployed a digital human resource information system (HRIS) that tracks all public-sector health workers across the country. While coverage of the private sector remains partial, the infrastructure built for the public system is now being leveraged by private hospital groups to create interoperable credential databases — reducing the time to verify a new hire from weeks to hours."),
      h3('South Africa: Nurse Placement Technology'),
      p("South Africa's large private hospital groups have invested heavily in digital rostering and staffing platforms over the last decade. The result is a healthcare labour market that functions more like a gig economy — with verified clinicians accepting shifts via mobile apps in ways that were unimaginable even in 2018."),
      h2('What Nigeria Can Learn'),
      p("Nigeria's private healthcare sector is significantly larger and more fragmented than Kenya's or South Africa's, which makes market-led technology adoption both more complex and more important. There is no single national HRIS to plug into. But this fragmentation also means that platforms that solve the coordination problem for private hospitals — aggregating shift demand, verifiable clinicians, and payroll into a single interface — can create enormous value without requiring government coordination."),
      p("The enabling conditions are in place: smartphone penetration above 50%, 4G coverage in all major cities, and a generation of healthcare administrators comfortable managing operations digitally. The opportunity for Nigerian-built health workforce technology to lead the continent is real."),
    ],
  },

  // ── 10 ───────────────────────────────────────────────────────────────────
  {
    _id:         'blog-post-10',
    _type:       'post',
    title:       'Building a Compliant Healthcare Workforce: A Guide for Nigerian Clinic Owners',
    slug:        { _type: 'slug', current: 'building-compliant-healthcare-workforce-nigeria' },
    author:      ref(AUTHOR_ID),
    publishedAt: '2025-12-15T09:00:00.000Z',
    excerpt:
      'Compliance with MDCN, NMCN, PCN, and labour law requirements is not optional for Nigerian private clinics — but many owners discover their gaps only when a regulator arrives. ' +
      'This practical guide helps clinic owners build a workforce that is compliant by design.',
    body: [
      h2('Why Compliance Is a Business Priority, Not Just a Legal One'),
      p("Private clinic owners in Nigeria frequently treat regulatory compliance as a background obligation — something to attend to when an inspection is scheduled. This approach is becoming increasingly risky. The MDCN and state-level Ministries of Health have intensified inspection activity since 2023, and the penalties for identified violations — ranging from fines to facility closure — have become more consistently enforced."),
      p("But compliance is also a competitive differentiator. Patients and corporate clients are increasingly scrutinising the credentials and standards of private healthcare providers. A facility that can demonstrate verified staff credentials, current practising licences, and documented compliance with clinical governance requirements will win clients that a less rigorous competitor cannot."),
      h2('The Four Compliance Pillars'),
      h3('Staff Credentialing'),
      p("Every clinical member of staff must hold a current, verifiable licence from their relevant professional council. This means not just checking at hire but maintaining a live register of expiry dates and initiating renewal follow-ups at least 90 days before expiry. A single lapsed licence on your payroll during an inspection is sufficient grounds for a stop-practice notice."),
      h3('Employment Documentation'),
      p("All staff — permanent and locum — must have a signed employment or engagement contract. For locum staff, the contract must clearly distinguish between employment and independent contractor status, with appropriate tax treatment for each. FIRS has issued guidance on the correct classification of clinical locum engagements, and incorrect classification is a common source of back-tax assessments."),
      h3('Working Time and Rest Periods'),
      p("The MDCN's guidelines on clinical working hours set maximum consecutive working periods and minimum rest intervals between shifts. Demonstrating compliance requires time-stamped attendance records — the kind that a digital rostering system generates automatically but that paper records rarely capture with sufficient precision."),
      h3('CPD and Training Records'),
      p("For registered clinicians, CPD records must be available for inspection. Maintaining these in a centralised digital store — rather than relying on individual staff members to produce their own certificates on demand — is the only approach that scales beyond a handful of employees."),
      h2('A Practical Starting Point'),
      p("For clinic owners who feel overwhelmed by the compliance landscape, the most practical starting point is a workforce audit: for every clinical employee, confirm current council registration, practising licence validity, and PAYE/pension enrolment status. The gaps this process reveals will be specific and actionable. From there, a digital workforce platform can take over the ongoing monitoring so the gaps never re-emerge."),
    ],
  },

]

// ---------------------------------------------------------------------------
// Run the seed
// ---------------------------------------------------------------------------
async function seed() {
  console.log(`\n🌱  Seeding → project "${PROJECT_ID}" / dataset "${DATASET}"\n`)

  console.log('  ↳ Upserting author…')
  await client.createOrReplace(authorDoc)
  console.log('    ✅ author-editorial-team\n')

  for (const post of posts) {
    console.log(`  ↳ "${post.title}"`)
    await client.createOrReplace(post)
    console.log(`    ✅ ${post._id}`)
  }

  console.log('\n✅  Done — 1 author + 10 posts created/replaced.\n')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message ?? err)
  process.exit(1)
})
