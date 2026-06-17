'use client'
import { useEffect } from 'react'

export default function VisualEditing() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const script = document.createElement('script')
    script.src = 'https://cdn.sanity.io/visual-editing/v1/visual-editing.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])
  return null
}
