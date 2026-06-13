/**
 * Footer.tsx — Site-wide footer (white bg, 4-column grid)
 *
 * Rebuilt for the Phase 1 design system:
 * - White background (replaces previous dark green)
 * - Consistent PSL icon box + text stack logo (matches Navbar)
 * - 4-column grid: Brand | Platform | Company | Resources
 * - Bottom bar: copyright left, tagline right
 *
 * All editorial content (tagline, copyright, social links) is sourced from
 * Sanity siteSettings with hardcoded fallbacks.
 *
 * This is a Server Component — no interactivity needed.
 */

import Link from 'next/link'
import type { SiteSettings } from '@/sanity/lib/types'

const PLATFORM_LINKS = [
  { label: 'For Healthcare Employers',     href: '/employers' },
  { label: 'For Healthcare Professionals', href: '/professionals' },
  { label: 'Credential Verification',      href: '/employers#verification' },
  { label: 'CPD Training',                 href: '/professionals#cpd' },
]

const COMPANY_LINKS = [
  { label: 'About ProNurtureSphere', href: '/about' },
  { label: 'Blog & Resources',       href: '/blog' },
  { label: 'Contact Us',             href: '/contact' },
  { label: 'Join the Waitlist',      href: '/waitlist' },
]

const RESOURCE_LINKS = [
  { label: 'Healthcare Staffing Guide',   href: '/blog' },
  { label: 'CPD for Nigerian Clinicians', href: '/blog' },
  { label: 'Privacy Policy',             href: '/privacy' },
  { label: 'Terms of Service',           href: '/terms' },
]

const FOOTER_COLUMNS = [
  { heading: 'Platform',   links: PLATFORM_LINKS },
  { heading: 'Company',    links: COMPANY_LINKS },
  { heading: 'Resources',  links: RESOURCE_LINKS },
]

interface FooterProps {
  settings?: Pick<SiteSettings, 'tagline' | 'copyrightText' | 'footerTagline' | 'socialLinks' | 'logoMono'>
}

const Footer = ({ settings }: FooterProps) => {
  const tagline      = settings?.tagline       ?? "PSL is Nigeria's career platform for clinical professionals and the facilities that hire them."
  const copyright    = settings?.copyrightText ?? '© 2026 ProNurtureSphere Limited. All rights reserved.'
  const footerTagline = settings?.footerTagline ?? 'Empowering Nigerian Healthcare Workforce'

  const linkedInHref = settings?.socialLinks?.linkedin ?? 'https://www.linkedin.com/company/psl25/'
  const twitterHref  = settings?.socialLinks?.twitter  ?? 'https://x.com/pronurture'

  return (
    <footer className="bg-white border-t border-black/5" aria-label="Site footer">

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Brand column ─────────────────────────────────────────────── */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="ProNurtureSphere home">
              <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs tracking-tight select-none">PSL</span>
              </div>
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

            <p className="text-brand-gray leading-relaxed max-w-[220px]" style={{ fontSize: 'var(--text-sm)' }}>
              {tagline}
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ProNurtureSphere on LinkedIn"
                className="text-brand-dark/30 hover:text-brand-dark transition-colors duration-150"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={twitterHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow ProNurtureSphere on X"
                className="text-brand-dark/30 hover:text-brand-dark transition-colors duration-150"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Nav columns ──────────────────────────────────────────────── */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3
                className="font-bold text-brand-dark uppercase mb-5"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--ls-caps)' }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-gray hover:text-brand-dark transition-colors duration-150"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-black/5">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-brand-gray/60 text-center sm:text-left"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            {copyright}
          </p>
          <p
            className="text-brand-gray/40 text-center sm:text-right"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            {footerTagline}
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
