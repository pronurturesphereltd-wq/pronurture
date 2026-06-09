/**
 * POST /api/reactions
 *
 * Increments the likes or dislikes counter on a post document in Sanity.
 * Uses patch().setIfMissing().inc() so the field is initialised to 0 even
 * if it was never set on legacy documents.
 *
 * Body: { postId: string, type: 'like' | 'dislike' }
 * Returns: { success: true, likes: number, dislikes: number }
 *        | { success: false, error: string }
 *
 * Vote deduplication is enforced client-side via localStorage.
 * SANITY_API_WRITE_TOKEN is server-only — never expose client-side.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/env'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const { postId, type } = await request.json()

    if (!postId || !type) {
      return NextResponse.json(
        { success: false, error: 'postId and type are required.' },
        { status: 400 }
      )
    }

    if (type !== 'like' && type !== 'dislike') {
      return NextResponse.json(
        { success: false, error: 'type must be "like" or "dislike".' },
        { status: 400 }
      )
    }

    const field = type === 'like' ? 'likes' : 'dislikes'

    // setIfMissing ensures the field exists before incrementing (handles legacy docs)
    const updated = await writeClient
      .patch(postId)
      .setIfMissing({ likes: 0, dislikes: 0 })
      .inc({ [field]: 1 })
      .commit<{ likes?: number; dislikes?: number }>()

    return NextResponse.json({
      success: true,
      likes: updated.likes ?? 0,
      dislikes: updated.dislikes ?? 0,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to record reaction. Please try again.' },
      { status: 500 }
    )
  }
}
