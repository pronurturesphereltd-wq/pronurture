import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getHomepage() {
  return client.fetch(`*[_type == "homepage"][0]{..., heroImage{...}}`)
}

export async function getProfessionalsPage() {
  return client.fetch(`*[_type == "professionalsPage"][0]`)
}

export async function getEmployersPage() {
  return client.fetch(`*[_type == "employersPage"][0]`)
}

export async function getAboutPage() {
  return client.fetch(`*[_type == "aboutPage"][0]`)
}

export async function getContactPage() {
  return client.fetch(`*[_type == "contactPage"][0]`)
}

export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, category,
      mainImage, author
    }
  `)
}

export async function getBlogPost(slug: string) {
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt, category,
      mainImage, author, body
    }
  `, { slug })
}

export async function getBlogSlugs() {
  return client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`)
}
