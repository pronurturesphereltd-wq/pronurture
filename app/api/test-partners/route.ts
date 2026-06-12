/**
 * TEMPORARY DIAGNOSTIC ROUTE — DELETE AFTER USE
 * GET /api/test-partners — returns raw Sanity partner data to verify
 * what the database actually has (including logo asset URLs).
 */
import { serverClient } from '@/sanity/lib/client'

export async function GET() {
  const data = await serverClient.fetch(
    `*[_type == "partner"]{ _id, name, logo { asset->{ url } } }`
  )
  return Response.json(data)
}
