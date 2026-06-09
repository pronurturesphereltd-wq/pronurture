/**
 * app/api/draft-mode/enable/route.ts — Draft Mode enable endpoint
 *
 * Called by the Sanity Presentation tool when an editor opens a live preview.
 * Validates the secret token, enables Next.js Draft Mode, and redirects to
 * the requested page so the editor sees the unpublished version.
 *
 * Requires SANITY_API_READ_TOKEN in .env.local (viewer-level is sufficient).
 */

import { client } from '@/sanity/lib/client'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN || '',
  }),
})
