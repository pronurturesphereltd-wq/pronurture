import { defineField, defineType } from 'sanity'

const heroField = defineField({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
  ],
})

const featureItem = {
  type: 'object' as const,
  fields: [
    defineField({ name: 'title',       title: 'Title',               type: 'string' }),
    defineField({ name: 'subtitle',    title: 'Subtitle / Category', type: 'string' }),
    defineField({ name: 'description', title: 'Description',         type: 'text', rows: 2 }),
    // icon removed — SVG icons are mapped in code via ICON_BY_FEATURE_KEY
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
}

export default defineType({
  name: 'employersPage',
  title: 'Employers Page',
  type: 'document',
  fields: [
    heroField,
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [featureItem],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [featureItem],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
        defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Employers Page' }
    },
  },
})
