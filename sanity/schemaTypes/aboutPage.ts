import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        // headline removed — never rendered in the component
        defineField({ name: 'body', title: 'Mission Body', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'vision', title: 'Vision Statement', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Value Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            // icon removed — SVGs live in ICON_BY_VALUE_KEY in AboutValues.tsx keyed by _key
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team / Founders',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Full Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
            defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
            }),
            defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'partnerships',
      title: 'Partnerships',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Section Headline', type: 'string' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 2 }),
        defineField({
          name: 'partners',
          title: 'Partners',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'partner' }] }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
