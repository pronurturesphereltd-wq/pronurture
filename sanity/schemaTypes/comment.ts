import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Not shown publicly — used for moderation only',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'body',
      title: 'Comment',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      // Defaults to false so every comment is held for moderation in Studio
      initialValue: false,
      description: 'Approve this comment to make it publicly visible on the post',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      body: 'body',
      approved: 'approved',
    },
    prepare({ name, body, approved }: { name?: string; body?: string; approved?: boolean }) {
      return {
        title: `${approved ? '✓' : '⏳'} ${name ?? 'Anonymous'}`,
        subtitle: body?.slice(0, 80),
      }
    },
  },
})
