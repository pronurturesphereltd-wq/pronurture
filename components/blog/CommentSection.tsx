/**
 * CommentSection.tsx — Reader comments section for blog posts
 *
 * Client component. Renders approved comments fetched server-side plus a
 * submission form that POSTs to /api/comments.
 *
 * All submitted comments are held with approved: false in Sanity Studio
 * until manually approved — no comment appears publicly without review.
 *
 * Form state machine:
 *   idle → (submit) → loading → success
 *                            ↘ error → (user types) → idle
 *
 * @param postSlug        - slug.current of the post, sent to the API
 * @param initialComments - approved comments fetched server-side on page load
 */

'use client'

import { useState } from 'react'
import type { BlogComment } from '@/sanity/lib/types'

interface CommentSectionProps {
  postSlug: string
  initialComments: BlogComment[]
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const CommentSection = ({ postSlug, initialComments }: CommentSectionProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, body, postSlug }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setBody('')
      } else {
        setStatus('error')
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  // Reset error state as soon as the user starts correcting their input
  const clearError = () => {
    if (status === 'error') setStatus('idle')
  }

  return (
    <section className="bg-brand-light py-16" aria-label="Comments">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <h2 className="text-2xl font-bold text-brand-dark mb-1">
          {initialComments.length > 0
            ? `${initialComments.length} Comment${initialComments.length !== 1 ? 's' : ''}`
            : 'Leave a Comment'}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          All comments are reviewed before publication.
        </p>

        {/* Approved comments list */}
        {initialComments.length > 0 && (
          <div className="space-y-5 mb-12">
            {initialComments.map((comment) => (
              <article
                key={comment._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-brand-dark/5"
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Initial-letter avatar */}
                  <div
                    className="w-9 h-9 rounded-full bg-brand-dark text-white flex items-center justify-center flex-shrink-0 text-sm font-bold"
                    aria-hidden="true"
                  >
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm leading-tight">
                      {comment.name}
                    </p>
                    <time dateTime={comment._createdAt} className="text-xs text-gray-400">
                      {formatDate(comment._createdAt)}
                    </time>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {comment.body}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* Submission form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-brand-dark/5">
          <h3 className="text-lg font-bold text-brand-dark mb-6">
            {initialComments.length > 0 ? 'Add Your Comment' : 'Be the First to Comment'}
          </h3>

          {status === 'success' ? (
            <div
              role="status"
              className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
            >
              <svg
                className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-green-800 font-medium">
                Your comment has been submitted and is awaiting moderation. Thank you!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="comment-name"
                    className="block text-sm font-semibold text-brand-dark mb-1"
                  >
                    Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="comment-name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError() }}
                    placeholder="Dr. Adaeze Okafor"
                    required
                    disabled={status === 'loading'}
                    className="
                      w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm
                      text-gray-900 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-brand-dark/30 focus:border-brand-dark
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                    "
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="comment-email"
                    className="block text-sm font-semibold text-brand-dark mb-1"
                  >
                    Email
                    <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
                    <span className="text-xs text-gray-400 font-normal ml-1.5">(kept private)</span>
                  </label>
                  <input
                    id="comment-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError() }}
                    placeholder="you@example.com"
                    required
                    disabled={status === 'loading'}
                    className="
                      w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm
                      text-gray-900 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-brand-dark/30 focus:border-brand-dark
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                    "
                  />
                </div>
              </div>

              {/* Comment body */}
              <div>
                <label
                  htmlFor="comment-body"
                  className="block text-sm font-semibold text-brand-dark mb-1"
                >
                  Comment <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="comment-body"
                  value={body}
                  onChange={(e) => { setBody(e.target.value); clearError() }}
                  placeholder="Share your thoughts on this article…"
                  rows={4}
                  required
                  disabled={status === 'loading'}
                  className="
                    w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm
                    text-gray-900 placeholder-gray-400 resize-y
                    focus:outline-none focus:ring-2 focus:ring-brand-dark/30 focus:border-brand-dark
                    disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                  "
                />
              </div>

              {/* Inline error */}
              {status === 'error' && (
                <p role="alert" className="flex items-center gap-1.5 text-sm text-red-600">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="
                  inline-flex items-center justify-center gap-2
                  px-6 py-2.5 rounded-full
                  bg-brand-dark text-white text-sm font-bold
                  cursor-pointer transition-all duration-200
                  hover:bg-brand-green hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                "
              >
                {status === 'loading' ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  'Post Comment'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default CommentSection
