import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Stega encodes Studio URL metadata into string values so the Presentation
  // tool can draw edit overlays directly on the live preview.
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio',
  },
})

// Non-CDN client for SSR page fetches — bypasses the CDN cache so Vercel
// always receives the latest published content rather than a stale CDN copy.
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})
