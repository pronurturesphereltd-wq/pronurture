'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'For Professionals', href: '/professionals' },
  { label: 'For Employers', href: '/employers' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar({ ctaLabel = 'Join the Waitlist' }: { ctaLabel?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 58 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        transition: 'background 0.2s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/Full_Color_Logo.svg" alt="ProNurtureSphere" style={{ height: 38, width: 'auto' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--brand-near-black)', fontFamily: 'var(--font-primary)' }}>ProNurture</span>
            <span style={{ fontWeight: 500, fontSize: 10, color: 'var(--brand-gray)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-primary)' }}>SPHERE LIMITED</span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontWeight: 500, fontSize: 15, textDecoration: 'none', fontFamily: 'var(--font-primary)',
              color: pathname === l.href ? 'var(--brand-dark)' : 'var(--brand-near-black)',
              opacity: pathname === l.href ? 1 : 0.7,
              transition: 'opacity 0.15s ease',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/waitlist" className="btn-primary desktop-nav">
            {ctaLabel}
            <span className="btn-primary__icon">
              <ArrowRight size={15} className="arrow-a" />
              <ArrowRight size={15} className="arrow-b" />
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="mobile-hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--brand-near-black)' }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.06)', background: '#fff' }}
          >
            <div style={{ padding: '16px 25px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{
                  fontWeight: 500, fontSize: 17, textDecoration: 'none', color: 'var(--brand-near-black)',
                  fontFamily: 'var(--font-primary)',
                }}>
                  {l.label}
                </Link>
              ))}
              <Link href="/waitlist" className="btn-primary" style={{ marginTop: 4, width: 'fit-content' }}>
                {ctaLabel}
                <span className="btn-primary__icon">
                  <ArrowRight size={15} className="arrow-a" />
                  <ArrowRight size={15} className="arrow-b" />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 809px) { .desktop-nav { display: none !important; } }
        @media (min-width: 810px) { .mobile-hamburger { display: none !important; } }
      `}</style>
    </motion.nav>
  )
}
