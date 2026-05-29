import { type SchemaTypeDefinition } from 'sanity'

import post from './post'
import author from './author'
import testimonial from './testimonial'
import service from './service'
import faq from './faq'
import partner from './partner'
import siteSettings from './siteSettings'
import homePage from './homePage'
import employersPage from './employersPage'
import professionalsPage from './professionalsPage'
import aboutPage from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    testimonial,
    service,
    faq,
    partner,
    siteSettings,
    homePage,
    employersPage,
    professionalsPage,
    aboutPage,
  ],
}
