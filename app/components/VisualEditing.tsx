'use client'
import { useEffect } from 'react'

export default function VisualEditing() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Listen for messages from Sanity Studio
    const handleMessage = (event: MessageEvent) => {
      if (event.origin.includes('sanity.studio') || event.origin.includes('sanity.io')) {
        if (event.data?.type === 'sanity/visual-editing/focus') {
          // Handle focus events
        }
      }
    }

    window.addEventListener('message', handleMessage)

    // Signal to Sanity that visual editing is ready
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'sanity/visual-editing/ready' }, '*')
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return null
}
