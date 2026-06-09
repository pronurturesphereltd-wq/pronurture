/**
 * sanity/lib/live.ts — Sanity Live Content API + Visual Editing
 *
 * `sanityFetch` replaces direct `client.fetch()` calls in Server Components
 * when you want real-time content updates and Presentation tool overlays.
 * `SanityLive` must be rendered once in the layout tree to establish the
 * Live Content websocket that drives instant previews without page reloads.
 *
 * browserToken: used client-side in draft mode to fetch unpublished content.
 * serverToken:  used server-side for the same purpose.
 * Both use SANITY_API_READ_TOKEN (viewer-level, safe for draft-mode previews).
 */

import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2025-01-01' }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})
