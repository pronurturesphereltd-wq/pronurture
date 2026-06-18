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
  title: 'How to Track Your NMCN CPD Points in 2026',
  slug: { _type: 'slug', current: 'track-nmcn-cpd-points-2026' },
  category: 'For Professionals',
  excerpt: "Highest intent search — 22.5% don't know their CPD requirements.",
  publishedAt: new Date().toISOString(),
  body: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "If you're a Nigerian nurse or midwife, your practice license isn't something you renew automatically. The Nursing and Midwifery Council of Nigeria requires you to earn 6 CPD credit units, equal to 60 hours, through the Mandatory Continuing Professional Development Programme before you can renew. If you're practicing in the diaspora, the requirement is different: you need 3 credit units (30 hours) through an approved platform like WCEA, and an active subscription at the time of renewal." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "Here's the problem PSL's own research surfaced: most nurses don't actually know where they stand against this requirement until renewal is already close. That's not a knowledge gap about nursing — it's a tracking gap. CPD points accumulate from workshops, seminars, and approved trainings, but there's no single dashboard most nurses check day to day. You attend a seminar in March, a workshop in July, maybe an online course in October, and by the time your license is due, you're trying to reconstruct a paper trail from memory." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'What counts toward your 6 units' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "The Council's CPD framework recognizes structured learning activities — workshops, seminars, and trainings run by NMCN-approved providers. Note that the Council opened applications for private CPD providers, which means the list of approved options has been expanding. Before paying for any course, confirm the provider is currently NMCN-approved; an unapproved course, no matter how good the content, won't count toward your renewal." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'The diaspora difference' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "If you're a Nigerian-trained nurse working abroad and you want to keep your NMCN registration active, the rules shift slightly. You'll need an active WCEA subscription at the time of license renewal, plus 3 completed credit units through that platform specifically — separate from whatever continuing education you're doing for your country of practice. WCEA courses are accredited by ANCC and UK Royal Colleges, so the overlap with your local CPD requirements is often higher than people expect, but you still need to confirm the units land on your NMCN record, not just your overseas one." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Three habits that prevent a last-minute scramble' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "First, log every CPD activity the same week you complete it — not at renewal time. A screenshot of your certificate and a one-line note of the date and hours is enough if you don't have a formal tracker." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "Second, check whether the Council's online portal has your CPD record updated at least once a quarter, not once a year. The Council has moved license renewal and verification online, but portal updates can lag behind your actual completions, so catching a missing entry in March is a lot less stressful than catching it in November." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'Third, treat CPD as a rolling habit tied to your renewal cycle, not a sprint. Spreading 60 hours across a year is a very different experience than trying to find 60 hours in the final six weeks before your license expires.' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'This is exactly the kind of tracking problem PSL is built to solve — CPD logged on your phone as you complete it, not reconstructed from memory when the deadline is already close.' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'Source: NMCN MCPDP Guidelines; WCEA CPD partnership documentation.', marks: ['em'] }],
    },
  ],
}

async function seed() {
  const result = await client.create(post)
  console.log('Created blog post:', result._id)
}

seed().catch(console.error)
