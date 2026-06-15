import { defineType, defineField } from 'sanity'

export const employersPage = defineType({
  name: 'employersPage',
  title: 'For Employers Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'Stop hiring blind.' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text', rows: 2, initialValue: 'Every candidate verified before they reach you.' }),
    defineField({ name: 'heroCta', title: 'Hero CTA Label', type: 'string', initialValue: 'Post your first vacancy free' }),
    defineField({ name: 'heroSecondaryCta', title: 'Hero Secondary CTA', type: 'string', initialValue: 'Prefer to talk first? WhatsApp us' }),
    defineField({
      name: 'painPoints',
      title: 'Pain Points',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'headline', title: 'Headline', type: 'string' },
          { name: 'body', title: 'Body', type: 'text' },
          { name: 'source', title: 'Data Source (optional)', type: 'string' },
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
      name: 'stats',
      title: 'By the Numbers Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'source', title: 'Source', type: 'string' },
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
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
    defineField({ name: 'closingHeadline', title: 'Closing CTA Headline', type: 'string', initialValue: "We're real people. Here's how to reach us." }),
    defineField({ name: 'closingSubtext', title: 'Closing CTA Subtext', type: 'text', initialValue: 'Every PSL employer account comes with a named contact reachable on WhatsApp.' }),
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
  ],
  preview: { prepare: () => ({ title: 'For Employers Page' }) },
})
