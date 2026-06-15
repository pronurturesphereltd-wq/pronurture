'use client'
import { useEffect, useRef, useState } from 'react'

export default function CountUp({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState('0')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (isNaN(numeric)) { setDisplayed(value); return }
    const prefix = value.match(/^[^0-9]*/)?.[0] || ''
    const suffix2 = value.match(/[^0-9.]+$/)?.[0] || ''
    const duration = 1500
    const steps = 40
    const increment = numeric / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numeric) {
        setDisplayed(`${prefix}${value.replace(prefix, '').replace(suffix2, '')}${suffix2}`)
        clearInterval(timer)
      } else {
        const decimals = (numeric % 1 !== 0) ? 1 : 0
        setDisplayed(`${prefix}${current.toFixed(decimals)}${suffix2}`)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, value])

  return <span ref={ref}>{displayed}</span>
}
