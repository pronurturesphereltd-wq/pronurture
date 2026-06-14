import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: "We're real people. Here's how to reach us." }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text', initialValue: 'We reply to every message. Usually within 2 hours on WhatsApp, 24 hours on email.' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (with country code)', type: 'string' }),
    defineField({ name: 'whatsappLabel', title: 'WhatsApp Response Note', type: 'string', initialValue: 'Response: within 2 hours, 8am–6pm WAT, Monday–Saturday' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', initialValue: 'hello@pronurturespherehq.com' }),
    defineField({ name: 'emailNote', title: 'Email Response Note', type: 'string', initialValue: 'For partnerships, press, and formal enquiries. Response: within 24 hours on business days.' }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
