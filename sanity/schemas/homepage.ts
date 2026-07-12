import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow Label', type: 'string', initialValue: 'For Nigerian Healthcare Professionals & Facilities' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'The career app Nigerian healthcare has been waiting for.' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text', rows: 2, initialValue: 'Find clinical jobs with salary shown, track your CPD, and pick up locum shifts — or post vacancies and manage your clinical team. All in one place.' }),
    defineField({ name: 'heroCta1', title: 'Hero CTA 1 Label', type: 'string', initialValue: "I'm a healthcare professional" }),
    defineField({ name: 'heroCta2', title: 'Hero CTA 2 Label', type: 'string', initialValue: 'I run a healthcare facility' }),
    defineField({ name: 'heroNote', title: 'Hero Note (below CTAs)', type: 'string', initialValue: 'Free to join. No credit card required.' }),
    defineField({ name: 'painPointsHeading', title: 'Pain Points Section Heading', type: 'string' }),
    defineField({ name: 'featuresHeading', title: 'Features Section Heading', type: 'string' }),
    defineField({ name: 'professionalsHeading', title: 'Professionals Section Heading', type: 'string' }),
    defineField({ name: 'facilitiesHeading', title: 'Facilities Section Heading', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Image (upload here)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroVideo', title: 'Hero Video URL (optional, overrides image)', type: 'url' }),
    defineField({
      name: 'regulatoryBodies',
      title: 'Regulatory & Partner Bodies',
      description: 'Regulatory councils and healthcare bodies shown in the "Aligned With..." ticker on the homepage.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Full Name', type: 'string' },
          { name: 'abbreviation', title: 'Abbreviation', type: 'string' },
          { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
          { name: 'link', title: 'Link (optional)', type: 'url' },
        ],
        preview: { select: { title: 'abbreviation', subtitle: 'name', media: 'logo' } },
      }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats Section',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Stat Value', type: 'string' },
          { name: 'label', title: 'Stat Label', type: 'string' },
          { name: 'source', title: 'Source', type: 'string' },
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'quotes',
      title: 'Real Voices (Quotes)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', title: 'Quote', type: 'text' },
          { name: 'attribution', title: 'Attribution', type: 'string' },
        ],
        preview: { select: { title: 'attribution' } },
      }],
    }),
    defineField({ name: 'closingHeadline', title: 'Closing CTA Headline', type: 'string', initialValue: 'Join free today.' }),
    defineField({ name: 'closingSubtext', title: 'Closing CTA Subtext', type: 'string', initialValue: 'No credit card. No commitment. Early access is open now.' }),
    defineField({ name: 'title', title: 'Title (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'description', title: 'Description (legacy)', type: 'text', hidden: true }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
})
