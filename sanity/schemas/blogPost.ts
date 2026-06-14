import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'PSL Team' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['For Professionals', 'For Employers', 'Research', 'News'] },
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              { name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'URL' }] },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: { select: { title: 'title', author: 'author', media: 'mainImage' }, prepare({ title, author, media }: any) { return { title, subtitle: author, media } } },
})
