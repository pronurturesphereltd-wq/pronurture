/**
 * ReactionButtons.tsx — Like / Dislike buttons for blog posts
 *
 * Client component. Optimistically updates the displayed count after a
 * successful POST to /api/reactions.
 *
 * Vote deduplication:
 *   localStorage key `pronurture_reaction_{postId}` stores 'like' | 'dislike'
 *   once a vote has been cast. On mount, if the key is present both buttons
 *   are disabled and the voted button is shown in its active state.
 *   This is a UX constraint — it does not prevent server-side double voting,
 *   which is acceptable for a no-auth engagement metric.
 *
 * @param postId         - Sanity post _id, used as the patch target in the API
 * @param initialLikes   - likes count fetched server-side on page load
 * @param initialDislikes - dislikes count fetched server-side on page load
 */

'use client'

import { useState, useEffect } from 'react'

interface ReactionButtonsProps {
  postId: string
  initialLikes: number
  initialDislikes: number
}

const STORAGE_KEY_PREFIX = 'pronurture_reaction_'

const ReactionButtons = ({ postId, initialLikes, initialDislikes }: ReactionButtonsProps) => {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [voted, setVoted] = useState<'like' | 'dislike' | null>(null)
  const [loading, setLoading] = useState(false)

  // Restore previous vote from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${postId}`)
    if (stored === 'like' || stored === 'dislike') {
      setVoted(stored)
    }
  }, [postId])

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (voted || loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, type }),
      })
      const data = await res.json()
      if (data.success) {
        setLikes(data.likes)
        setDislikes(data.dislikes)
        setVoted(type)
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${postId}`, type)
      }
    } catch {
      // Reactions are non-critical — silently fail rather than interrupt reading
    } finally {
      setLoading(false)
    }
  }

  const isDisabled = !!voted || loading

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-gray-500 font-medium">Was this helpful?</span>

      {/* Like button — active state: brand-dark fill */}
      <button
        onClick={() => handleReaction('like')}
        disabled={isDisabled}
        aria-label={`Like this article — ${likes} like${likes !== 1 ? 's' : ''}`}
        aria-pressed={voted === 'like'}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full border
          text-sm font-semibold transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2
          ${voted === 'like'
            ? 'bg-brand-dark text-white border-brand-dark'
            : 'bg-white text-brand-dark border-brand-dark/30 hover:border-brand-dark hover:bg-brand-light'
          }
          ${isDisabled ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
        `}
      >
        <svg
          className="w-4 h-4"
          fill={voted === 'like' ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
        </svg>
        <span>{likes}</span>
      </button>

      {/* Dislike button — active state: muted red */}
      <button
        onClick={() => handleReaction('dislike')}
        disabled={isDisabled}
        aria-label={`Dislike this article — ${dislikes} dislike${dislikes !== 1 ? 's' : ''}`}
        aria-pressed={voted === 'dislike'}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full border
          text-sm font-semibold transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
          ${voted === 'dislike'
            ? 'bg-red-100 text-red-700 border-red-300'
            : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isDisabled ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
        `}
      >
        <svg
          className="w-4 h-4"
          fill={voted === 'dislike' ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
        </svg>
        <span>{dislikes}</span>
      </button>
    </div>
  )
}

export default ReactionButtons
