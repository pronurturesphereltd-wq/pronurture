'use client'

/**
 * Button.tsx — Shared CTA button with Stratex-style sliding arrow
 *
 * Three variants:
 *   primary    — dark green pill, white text, white icon circle with dark arrows
 *   secondary  — white pill, dark text, dark icon circle with white arrows
 *   text-link  — no background, label + ArrowRight inline, fades on hover
 *
 * The sliding arrow effect (arrow-a / arrow-b) is pure CSS in globals.css.
 * This component only applies the class names; the transition is declarative.
 *
 * @param label    — button label text
 * @param href     — renders as <Link> when provided, otherwise <button>
 * @param onClick  — click handler (button mode only)
 * @param variant  — 'primary' | 'secondary' | 'text-link'
 * @param type     — HTML button type (default 'button')
 * @param className — additional Tailwind classes (e.g. 'w-full')
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'text-link'

interface ButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  label,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) => {

  // ── Text-link variant ────────────────────────────────────────────────────
  if (variant === 'text-link') {
    const inner = (
      <span
        className={`btn-sliding inline-flex items-center gap-2 font-medium cursor-pointer transition-opacity duration-150 hover:opacity-70 ${className}`}
        style={{ fontSize: 'var(--text-body)' }}
      >
        {label}
        <ArrowRight size={17} />
      </span>
    )
    if (href) return <Link href={href}>{inner}</Link>
    return <button type={type} onClick={onClick}>{inner}</button>
  }

  // ── Pill variants (primary / secondary) ──────────────────────────────────
  const isPrimary = variant === 'primary'

  const pillClasses = [
    'btn-sliding',
    'inline-flex items-center gap-3',
    'cursor-pointer rounded-pill',
    'transition-opacity duration-150 hover:opacity-90',
    isPrimary
      ? 'bg-brand-dark text-white'
      : 'bg-white text-brand-dark border border-brand-dark/10',
    className,
  ].join(' ')

  const iconCircleClass = `btn-icon-circle ${isPrimary ? 'bg-white' : 'bg-brand-dark'}`
  const arrowClass = isPrimary ? 'text-brand-dark' : 'text-white'

  const inner = (
    <>
      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{label}</span>
      <span className={iconCircleClass}>
        <ArrowRight size={15} className={`arrow-a ${arrowClass}`} />
        <ArrowRight size={15} className={`arrow-b ${arrowClass}`} />
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={pillClasses} style={{ padding: '3px 3px 3px 16px' }}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={pillClasses}
      style={{ padding: '3px 3px 3px 16px' }}
    >
      {inner}
    </button>
  )
}

export default Button
