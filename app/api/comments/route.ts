/**
 * POST /api/comments
 *
 * Accepts a new comment submission and writes it to Sanity with approved: false.
 * All comments are held for moderation in Sanity Studio before appearing publicly.
 *
 * Body: { name, email, body, postSlug }
 * Returns: { success: true } | { success: false, error: string }
 *
 * Email is validated server-side but never returned in any response.
 * SANITY_API_WRITE_TOKEN is server-only — never exposed to the client.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/env'

// Write client — uses editor-level token, server-only, never prefix with NEXT_PUBLIC_
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const { name, email, body, postSlug } = await request.json()

    if (!name || !email || !body || !postSlug) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Resolve the post _id from slug so we can create a Sanity reference
    const post = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "post" && slug.current == $slug][0]{ _id }`,
      { slug: postSlug }
    )

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found.' },
        { status: 404 }
      )
    }

    // Create comment — approved: false until moderated in Studio
    await writeClient.create({
      _type: 'comment',
      name,
      email,  // stored in Sanity only, never returned to frontend
      body,
      approved: false,
      post: { _type: 'reference', _ref: post._id },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to submit comment. Please try again.' },
      { status: 500 }
    )
  }
}
