import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'ProNurtureSphere' }),
    defineField({ name: 'navCta', title: 'Navbar CTA Label', type: 'string', initialValue: 'Join the Waitlist' }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string', initialValue: 'The career platform Nigerian healthcare has been waiting for.' }),
    defineField({ name: 'footerEmail', title: 'Footer Email', type: 'string', initialValue: 'hello@pronurturespherehq.com' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (with country code e.g. +2348012345678)', type: 'string' }),
    defineField({ name: 'footerCopyright', title: 'Footer Copyright Text', type: 'string', initialValue: 'ProNurtureSphere Limited. All rights reserved.' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'Twitter / X URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'whatsapp', title: 'WhatsApp Link (wa.me link)', type: 'url' },
      ],
    }),
    defineField({ name: 'copyrightText', title: 'Copyright Text (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'email', title: 'Email (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'tagline', title: 'Tagline (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'waitlistCount', title: 'Waitlist Count (legacy)', type: 'number', hidden: true }),
    defineField({ name: 'title', title: 'Title (legacy)', type: 'string', hidden: true }),
    defineField({ name: 'description', title: 'Description (legacy)', type: 'text', hidden: true }),
  ],
  preview: { select: { title: 'siteName' } },
})
