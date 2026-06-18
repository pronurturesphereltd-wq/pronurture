import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Mail } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import ContactFormInteractive from '@/components/waitlist/ContactFormInteractive'
import { getContactPage } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Contact | PSL',
  description: "We're real people. Here's how to reach us.",
}

export default async function ContactPage() {
  let data: any = {}
  try { data = await getContactPage() } catch {}
  const whatsapp = data?.whatsappNumber || ''
  const email = data?.email || 'uwa@pronurture.com.ng'

  return (
    <>
      <section style={{ padding: '56px 0 64px', background: 'var(--brand-offwhite)' }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <SectionTag label="Contact" />
          <h1 style={{ fontSize: 'clamp(30px,5vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 20, marginBottom: 16 }}>
            {data?.heroHeadline || "We're real people. Here's how to reach us."}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.65 }}>
            {data?.heroSubheadline || 'We reply to every message. Usually within 2 hours on WhatsApp, 24 hours on email.'}
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 32, letterSpacing: '-0.01em' }}>Get in touch</h2>
              <div style={{ padding: '28px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37,211,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageCircle size={22} color="#25D366" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>WhatsApp — fastest</h3>
                    <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.6, marginBottom: 12 }}>For early access questions, facility onboarding, urgent support, or anything else.</p>
                    <p style={{ fontSize: 12, color: 'var(--brand-gray)', marginBottom: 16 }}>{data?.whatsappLabel || 'Response: within 2 hours, 8am–6pm WAT, Monday–Saturday'}</p>
                    {whatsapp ? (
                      <a href={`https://wa.me/${whatsapp.replace(/\D/g,'')}`} className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, padding: '3px 3px 3px 16px' }}>
                        Message us on WhatsApp
                        <span className="btn-primary__icon" style={{ width: 28, height: 28 }}><ArrowRight size={13} className="arrow-a" /><ArrowRight size={13} className="arrow-b" /></span>
                      </a>
                    ) : (
                      <p style={{ fontSize: 13, color: 'var(--brand-gray)', fontStyle: 'italic' }}>Add WhatsApp number via Sanity Studio</p>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ padding: '28px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,54,19,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} color="var(--brand-dark)" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Email</h3>
                    <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.6, marginBottom: 12 }}>{data?.emailNote || 'For partnerships, press, and formal enquiries. Response: within 24 hours on business days.'}</p>
                    <a href={`mailto:${email}`} style={{ fontSize: 15, color: 'var(--brand-dark)', fontWeight: 600, textDecoration: 'none' }}>{email}</a>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ padding: '18px 22px', borderRadius: 14, background: 'rgba(16,54,19,0.05)', border: '1px solid rgba(16,54,19,0.1)' }}>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Are you a healthcare professional?</p>
                  <Link href="/waitlist?role=professional" style={{ fontSize: 14, color: 'var(--brand-dark)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>Join the waitlist <ArrowRight size={13} /></Link>
                </div>
                <div style={{ padding: '18px 22px', borderRadius: 14, background: 'rgba(192,158,90,0.07)', border: '1px solid rgba(192,158,90,0.2)' }}>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Are you a healthcare facility?</p>
                  <Link href="/waitlist?role=employer" style={{ fontSize: 14, color: 'var(--brand-dark)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>Post your first vacancy free <ArrowRight size={13} /></Link>
                </div>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 32, letterSpacing: '-0.01em' }}>Send us a message</h2>
              <div style={{ padding: '36px', borderRadius: 24, border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <ContactFormInteractive />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
