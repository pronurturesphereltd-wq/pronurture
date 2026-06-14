'use client'
import { useEffect } from 'react'

export default function Studio() {
  useEffect(() => {
    window.location.href = `https://pronurturesphereltd-wq.sanity.studio`
  }, [])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <p>Redirecting to Sanity Studio...</p>
    </div>
  )
}
