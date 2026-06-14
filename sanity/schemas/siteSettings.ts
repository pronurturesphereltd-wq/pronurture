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
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string', initialValue: '' }),
    defineField({ name: 'footerCopyright', title: 'Footer Copyright Text', type: 'string', initialValue: 'ProNurtureSphere Limited. All rights reserved.' }),
  ],
  preview: { select: { title: 'siteName' } },
})
