import { defineType, defineField } from 'sanity'

export const professionalsPage = defineType({
  name: 'professionalsPage',
  title: 'For Professionals Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'Your career. Finally, a platform built for it.' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text', rows: 2, initialValue: 'Jobs with salary shown. CPD on your phone. Locum shifts when you need them. For every registered clinical professional in Nigeria.' }),
    defineField({ name: 'heroCta', title: 'Hero CTA Label', type: 'string', initialValue: 'Join free — no card required' }),
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroCaption', title: 'Hero Caption', type: 'string' }),
    defineField({ name: 'painPointsHeading', title: 'Pain Points Section Heading', type: 'string' }),
    defineField({ name: 'featuresHeading', title: 'Features Section Heading', type: 'string' }),
    defineField({
      name: 'painPoints',
      title: 'Pain Points',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'headline', title: 'Headline', type: 'string' },
          { name: 'body', title: 'Body', type: 'text' },
        ],
        preview: { select: { title: 'headline' } },
      }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Feature Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
          { name: 'icon', title: 'Icon Name (Lucide)', type: 'string' },
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'disciplines',
      title: 'Discipline List',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Registered Nurses','Nurse-Midwives','Doctors','Pharmacists','Physiotherapists','Medical Laboratory Scientists','Radiographers','CHEWs','Allied Health Professionals'],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text' },
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
    defineField({ name: 'closingHeadline', title: 'Closing CTA Headline', type: 'string', initialValue: 'Ready? Join free.' }),
    defineField({ name: 'closingSubtext', title: 'Closing CTA Subtext', type: 'string', initialValue: 'No card. No commitment. Your career — finally, a platform built for it.' }),
    defineField({ name: 'hero', title: 'Hero (legacy)', type: 'object', hidden: true, fields: [
      { name: 'headline', title: 'Headline', type: 'string' },
      { name: 'subheadline', title: 'Subheadline', type: 'text' },
      { name: 'ctaText', title: 'CTA Text', type: 'string' },
      { name: 'ctaLink', title: 'CTA Link', type: 'string' },
    ]}),
    defineField({ name: 'cta', title: 'CTA (legacy)', type: 'object', hidden: true, fields: [
      { name: 'headline', title: 'Headline', type: 'string' },
      { name: 'body', title: 'Body', type: 'text' },
      { name: 'buttonText', title: 'Button Text', type: 'string' },
      { name: 'buttonLink', title: 'Button Link', type: 'string' },
    ]}),
    defineField({ name: 'title', title: 'Title (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'description', title: 'Description (legacy)', type: 'text', hidden: true }),
  ],
  preview: { prepare: () => ({ title: 'For Professionals Page' }) },
})
