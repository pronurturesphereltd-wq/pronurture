'use client'
import { enableVisualEditing } from '@sanity/visual-editing'
import { useEffect } from 'react'

export default function VisualEditing() {
  useEffect(() => {
    return enableVisualEditing()
  }, [])
  return null
}
