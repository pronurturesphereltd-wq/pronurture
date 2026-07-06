'use client'
import { useLayoutEffect } from 'react'

const MIN_SIZE = 11

function overflows(el: HTMLElement): boolean {
  if (el.scrollWidth > el.clientWidth) return true
  const parent = el.parentElement
  return parent != null && el.offsetWidth > parent.clientWidth
}

function fit(el: HTMLElement) {
  // Clear any previously applied inline font-size so we start from CSS value
  el.style.fontSize = ''
  // Force single-line with !important so it beats white-space:normal in any CSS rule
  el.style.setProperty('white-space', 'nowrap', 'important')

  if (!overflows(el)) return

  // Binary search from current computed size down to MIN_SIZE
  const max = parseFloat(getComputedStyle(el).fontSize)
  if (max <= MIN_SIZE) return

  let lo = MIN_SIZE
  let hi = max
  while (hi - lo > 0.5) {
    const mid = (lo + hi) / 2
    el.style.fontSize = `${mid}px`
    if (overflows(el)) hi = mid
    else lo = mid
  }
  el.style.fontSize = `${lo}px`
}

export default function AutoFitButtons() {
  useLayoutEffect(() => {
    const run = () =>
      document.querySelectorAll<HTMLElement>('.btn-primary').forEach(fit)

    run()

    let timer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(run, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return null
}
