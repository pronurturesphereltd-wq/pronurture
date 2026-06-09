import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'employersPage',
  'professionalsPage',
  'aboutPage',
])

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('ProNurtureSphere')
    .items([
      S.listItem()
        .title('📄 Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'homePage', 'Home Page'),
              singleton(S, 'employersPage', 'Employers Page'),
              singleton(S, 'professionalsPage', 'Professionals Page'),
              singleton(S, 'aboutPage', 'About Page'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('✍️ Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Blog Posts'),
              S.documentTypeListItem('author').title('Authors'),

              S.divider(),

              // Comments — split into moderation queues so editors
              // can approve or reject without searching the full list
              S.listItem()
                .title('💬 Comments')
                .child(
                  S.list()
                    .title('Comments')
                    .items([
                      S.listItem()
                        .title('⏳ Pending Approval')
                        .child(
                          S.documentList()
                            .title('Pending Approval')
                            .filter('_type == "comment" && approved == false')
                            .defaultOrdering([{ field: '_createdAt', direction: 'asc' }]),
                        ),
                      S.listItem()
                        .title('✓ Approved')
                        .child(
                          S.documentList()
                            .title('Approved Comments')
                            .filter('_type == "comment" && approved == true')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]),
                        ),
                    ]),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('⚙️ Site Content')
        .child(
          S.list()
            .title('Site Content')
            .items([
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('faq').title('FAQs'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('partner').title('Partners'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('⚙️ Settings')
        .child(
          S.list()
            .title('Settings')
            .items([singleton(S, 'siteSettings', 'Site Settings')]),
        ),
    ])

export { singletonTypes }
