import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'For Professionals', href: '/professionals' },
    { label: 'For Employers', href: '/employers' },
    { label: 'Join Waitlist', href: '/waitlist' },
  ],
  Company: [
    { label: 'About PSL', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ],
}

interface FooterProps {
  tagline?: string
  email?: string
  copyright?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
    whatsapp?: string
  }
}

export default function Footer({
  tagline = 'The career platform Nigerian healthcare has been waiting for.',
  email = 'hello@pronurturespherehq.com',
  copyright = 'ProNurtureSphere Limited. All rights reserved.',
  socialLinks,
}: FooterProps) {
  return (
    <footer style={{ background: 'var(--brand-offwhite)', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 64, paddingBottom: 40 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <img src="/Full_Color_Logo.svg" alt="ProNurtureSphere" style={{ height: 36, width: 'auto' }} />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--brand-near-black)' }}>ProNurture</span>
                <span style={{ fontWeight: 500, fontSize: 10, color: 'var(--brand-gray)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>SPHERE LIMITED</span>
              </div>
            </Link>
            <p style={{ fontSize: 15, color: 'var(--brand-gray)', maxWidth: 260, lineHeight: 1.65, marginBottom: 20 }}>{tagline}</p>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: 14, padding: '3px 3px 3px 16px' }}>
              Join the Waitlist
              <span className="btn-primary__icon" style={{ width: 28, height: 28 }}>
                <ArrowRight size={13} className="arrow-a" />
                <ArrowRight size={13} className="arrow-b" />
              </span>
            </Link>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-near-black)', marginBottom: 16 }}>{group}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map((l) => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 15, color: 'var(--brand-gray)', textDecoration: 'none', transition: 'color 0.15s ease' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'var(--brand-gray)' }}>© {new Date().getFullYear()} {copyright}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-gray)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-dark)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--brand-gray)')}>LinkedIn</a>}
            {socialLinks?.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-gray)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-dark)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--brand-gray)')}>Twitter / X</a>}
            {socialLinks?.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-gray)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-dark)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--brand-gray)')}>Facebook</a>}
            {socialLinks?.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-gray)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-dark)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--brand-gray)')}>Instagram</a>}
            {socialLinks?.whatsapp && <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-gray)', textDecoration: 'none', fontSize: 13, transition: 'color 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-dark)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--brand-gray)')}>WhatsApp</a>}
            <a href={`mailto:${email}`} style={{ fontSize: 13, color: 'var(--brand-gray)', textDecoration: 'none' }}>{email}</a>
          </div>
        </div>
      </div>

    </footer>
  )
}
