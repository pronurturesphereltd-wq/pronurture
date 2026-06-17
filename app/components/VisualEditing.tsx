'use client'
import { useEffect } from 'react'

export default function VisualEditing() {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('@sanity/visual-editing').then(({ enableVisualEditing }) => {
      const cleanup = enableVisualEditing()
      return cleanup
    }).catch(console.error)
  }, [])
  return null
}
