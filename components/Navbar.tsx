'use client'

/**
 * Navbar.tsx — Site-wide sticky navigation bar
 *
 * Design: Stratex-style clean nav — icon box logo + text stack,
 * text nav links, sliding-arrow primary CTA button.
 *
 * Logo treatment: dark green rounded box (PSL lettermark) + two-line text:
 *   line 1 — "ProNurture" DM Sans Bold
 *   line 2 — "SPHERE LIMITED" DM Sans 500 uppercase tracking-widest
 *
 * Entrance: spring animation from opacity 0, y -20px on mount.
 * Mobile: Menu/X icons from lucide-react toggle vertical nav with
 *   Framer Motion height + opacity animation.
 *
 * Why 'use client'?
 * Needs useState (mobileOpen) and a resize listener to auto-close the
 * mobile menu. Also uses Framer Motion for entrance and mobile animations.
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'For Professionals', href: '/professionals' },
  { label: 'For Employers',     href: '/employers' },
  { label: 'About',             href: '/about' },
  { label: 'Blog',              href: '/blog' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <motion.nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 58 }}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="ProNurtureSphere home"
          >
            {/* Icon box — dark green square with white PSL lettermark */}
            <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs tracking-tight select-none">PSL</span>
            </div>
            {/* Two-line text stack */}
            <div className="flex flex-col leading-none gap-[3px]">
              <span className="font-bold text-brand-dark" style={{ fontSize: '15px' }}>
                ProNurture
              </span>
              <span
                className="font-medium text-brand-dark/50 uppercase"
                style={{ fontSize: '9px', letterSpacing: 'var(--ls-caps)' }}
              >
                SPHERE LIMITED
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-brand-dark/60 hover:text-brand-dark transition-opacity duration-150"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTA ───────────────────────────────────────────────── */}
          <div className="hidden lg:block">
            <Button label="Get Early Access" href="/waitlist" variant="primary" />
          </div>

          {/* ── Mobile hamburger ─────────────────────────────────────────── */}
          <button
            className="lg:hidden p-2 text-brand-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <motion.div
        id="mobile-menu"
        className="lg:hidden bg-white border-t border-black/5 overflow-hidden"
        initial={false}
        animate={mobileOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 58 }}
        aria-hidden={!mobileOpen}
      >
        <div className="container-site pb-6 pt-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-2 rounded-lg font-medium text-brand-dark/70 hover:text-brand-dark transition-opacity duration-150"
              style={{ fontSize: 'var(--text-body)' }}
            >
              {link.label}
            </Link>
          ))}
          {/* CTA visible in mobile nav */}
          <div className="mt-3">
            <Button
              label="Get Early Access"
              href="/waitlist"
              variant="primary"
            />
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
