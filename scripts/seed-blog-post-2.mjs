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
  title: 'What Nigerian Clinical Professionals Actually Want From Their Next Employer',
  slug: { _type: 'slug', current: 'what-clinical-professionals-want-from-employers' },
  category: 'For Everyone',
  excerpt: 'Turns PSL survey into a public asset',
  publishedAt: new Date().toISOString(),
  body: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "We surveyed 40 clinical professionals across 13 Nigerian states in May 2026, and the picture that emerged wasn't about salary alone — though salary transparency mattered more than almost anything else. It was about a pattern of mismatch between what's promised at the offer stage and what's delivered once someone starts." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'The mismatch is the real problem' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: '52.5% of respondents told us they have taken a job that turned out different from its listing. That’s more than half the clinical professionals we spoke to. Not a slightly different shift pattern or a minor scope change — a different job than the one they applied for. When you ask people why they leave a role within the first few months, this is usually the answer underneath the answer.' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "This matters more in clinical settings than almost any other industry. A nurse who accepts a ward role and is reassigned to ICU without warning isn't being flexible — they're being put somewhere they may not be trained or staffed to safely cover. A locum who's told the facility has full PPE and discovers it doesn't isn't just inconvenienced; they're walking into a different risk profile than they agreed to." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Salary transparency is table stakes, not a nice-to-have' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "This is the most direct finding: clinical professionals want to see the salary range before they apply, not after an interview, not after they've taken unpaid leave to attend an assessment day. Every job listed on PSL shows salary upfront for exactly this reason. It's not a generous feature — it's the minimum standard the people doing the work expect." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'CPD tracking is broken on both sides' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "62.5% of respondents are behind on or don't know their CPD requirements. This isn't a motivation problem. It's a tooling problem. The same survey found that 80% of facilities have no system for tracking staff CPD at all — so even professionals who want to stay compliant often don't have visibility into where they stand, and their employers can't tell them either." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "The fix both sides want is the same: 87% of professionals said they would complete CPD entirely on mobile if the quality of the content was right. People aren't avoiding CPD because they don't value it. They're avoiding it because the path to completing it doesn't fit into a working life that's already full." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'Most professionals are not closed to moving — they’re closed to bad information' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "97.5% of respondents are open to new job opportunities. That's not a workforce that's hard to recruit. That's a workforce that's been burned by listings that don't match reality, and has learned to be cautious as a result." }],
    },
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: 'What this means for employers' }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "If you're a facility hiring right now, the data points to a simple lever: be exact. List the real salary. Describe the real shift pattern. Confirm what PPE and equipment is actually available before someone walks in on day one. The professionals you're trying to hire aren't hard to find — 97.5% of them are open to talking to you. What's hard is being trusted after the first wave of people who weren't exact." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "This is the gap PSL was built to close: salary shown on every listing, CPD tracked automatically instead of guessed at, and a named contact at every facility so questions get answered before someone shows up for their first shift." }],
    },
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'Source: PSL Clinical Workforce Survey, May 2026 — 40 clinical professionals and 5 healthcare facility managers across 13 Nigerian states.', marks: ['em'] }],
    },
  ],
}

async function seed() {
  const result = await client.create(post)
  console.log('Created blog post:', result._id)
}

seed().catch(console.error)
