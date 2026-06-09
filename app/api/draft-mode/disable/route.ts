/**
 * app/api/draft-mode/disable/route.ts — Draft Mode disable endpoint
 *
 * Disables Next.js Draft Mode and redirects the editor back to the homepage.
 * Called by the DisableDraftMode button that appears in draft-mode sessions.
 */

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  // Redirect to the page the editor was viewing, or fallback to homepage
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirect') ?? '/'
  redirect(redirectTo)
}
