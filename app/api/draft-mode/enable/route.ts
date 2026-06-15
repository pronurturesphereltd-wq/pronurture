import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { client } from '@/lib/sanity'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const token = process.env.SANITY_API_READ_TOKEN

export async function GET(req: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token }),
    req.url
  )
  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }
  draftMode().enable()
  redirect(redirectTo)
}
