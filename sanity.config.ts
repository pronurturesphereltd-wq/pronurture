import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemas'

const singletonTypes = ['siteSettings', 'homepage', 'professionalsPage', 'employersPage', 'aboutPage', 'contactPage']

export default defineConfig({
  name: 'psl-studio',
  title: 'PSL Website Studio',
  projectId: 'cfu3qevi',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    presentationTool({
      previewUrl: {
        origin: 'https://pronurture.vercel.app',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').id('siteSettings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.divider(),
            S.listItem().title('Homepage').id('homepage').child(
              S.document().schemaType('homepage').documentId('homepage')
            ),
            S.listItem().title('For Professionals').id('professionalsPage').child(
              S.document().schemaType('professionalsPage').documentId('professionalsPage')
            ),
            S.listItem().title('For Employers').id('employersPage').child(
              S.document().schemaType('employersPage').documentId('employersPage')
            ),
            S.listItem().title('About').id('aboutPage').child(
              S.document().schemaType('aboutPage').documentId('aboutPage')
            ),
            S.listItem().title('Contact').id('contactPage').child(
              S.document().schemaType('contactPage').documentId('contactPage')
            ),
            S.divider(),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
