import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'We built PSL because the system was failing the people running it.' }),
    defineField({ name: 'story', title: 'Founding Story', type: 'text', rows: 6, initialValue: "Nurses applying through WhatsApp groups and hearing nothing back. Doctors taking jobs where the salary was never shown. Midwives falling behind on CPD because tracking it was too complicated. Medical Directors spending months filling one vacancy through walk-ins.\n\nThese aren't rare situations. They're the daily reality for Nigerian healthcare professionals and the facilities that employ them.\n\nWe built PSL to fix it. Not to add another app — but to build the platform Nigerian healthcare has always needed." }),
    defineField({
      name: 'surveyStats',
      title: 'Survey Stats',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        '52.5% have taken a job that turned out different from its listing',
        "62.5% are behind on or don't know their CPD requirements",
        '87% would complete CPD entirely on mobile if quality is right',
        '97.5% are open to new job opportunities',
        '80% of facilities have no system for tracking staff CPD',
      ],
    }),
    defineField({ name: 'surveySource', title: 'Survey Source Note', type: 'string', initialValue: 'Source: PSL Clinical Workforce Survey, May 2026' }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      validation: (R) => R.max(4),
      of: [{
        type: 'object',
        fields: [
          { name: 'headline', title: 'Value Headline', type: 'string' },
          { name: 'body', title: 'Value Body', type: 'text' },
        ],
        preview: { select: { title: 'headline' } },
      }],
      initialValue: [
        { _type: 'object', _key: 'v1', headline: 'Salary should always be shown.', body: 'No clinical professional should waste time applying for a role without knowing the pay.' },
        { _type: 'object', _key: 'v2', headline: 'Clinical professionals deserve career tools built for them.', body: 'Not tools designed for office workers, adapted for healthcare. Tools built from scratch for this sector.' },
        { _type: 'object', _key: 'v3', headline: 'Trust is earned with specifics, not promises.', body: 'We show our research. We cite our sources. We give every employer a named contact they can call.' },
        { _type: 'object', _key: 'v4', headline: 'PSL is a launchpad, not a listing site.', body: "We are building something that helps Nigerian healthcare professionals grow, not just move between jobs." },
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'role', title: 'Role', type: 'string' },
          { name: 'bio', title: 'One-Sentence Bio', type: 'text' },
          { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
        ],
        preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
      }],
    }),
    defineField({ name: 'teamPlaceholder', title: 'Team Placeholder Text', type: 'text', initialValue: 'We spent time inside Nigerian healthcare — as clinicians, administrators, and patients — before writing a single line of code. PSL is the platform we wished had existed.' }),
    defineField({ name: 'mission', title: 'Mission (legacy)', type: 'object', hidden: true, fields: [
      { name: 'vision', title: 'Vision', type: 'string' },
      { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    ]}),
    defineField({ name: 'title', title: 'Title (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'description', title: 'Description (legacy)', type: 'text', hidden: true }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
