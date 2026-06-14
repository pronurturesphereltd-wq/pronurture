import { Metadata } from 'next'
import { Suspense } from 'react'
import SectionTag from '@/components/ui/SectionTag'
import WaitlistFormWrapper from './WaitlistFormWrapper'

export const metadata: Metadata = {
  title: 'Join the Waitlist | PSL',
  description: 'Join PSL early access. Free to join, no credit card required.',
}

export default function WaitlistPage() {
  return (
    <section style={{ minHeight: 'calc(100vh - 68px)', padding: '64px 0', background: 'var(--brand-offwhite)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', maxWidth: 960, margin: '0 auto' }}>
          <div style={{ paddingTop: 8 }}>
            <SectionTag label="Early access" />
            <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 20, marginBottom: 20 }}>Join PSL free — before we launch.</h1>
            <p style={{ fontSize: 17, color: 'var(--brand-gray)', lineHeight: 1.7, marginBottom: 32 }}>PSL is in early access. Early members get:</p>
            {[
              'First access when PSL goes live',
              'Priority onboarding — a real person walks you through setup',
              'Early adopter pricing locked in for 12 months at launch',
              'Your feedback shapes what we build next',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>✓</span>
                </div>
                <p style={{ fontSize: 15, color: 'var(--brand-near-black)', lineHeight: 1.55 }}>{item}</p>
              </div>
            ))}
            <div style={{ marginTop: 40, padding: '24px', borderRadius: 16, background: 'rgba(16,54,19,0.05)', border: '1px solid rgba(16,54,19,0.1)' }}>
              <p style={{ fontSize: 14, color: 'var(--brand-dark)', fontWeight: 600, marginBottom: 4 }}>PSL Clinical Workforce Survey, May 2026</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand-near-black)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>97.5% of clinical professionals are open to new job opportunities.</p>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 24, padding: '40px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>Create your free account</h2>
            <p style={{ fontSize: 14, color: 'var(--brand-gray)', marginBottom: 28 }}>No credit card. No commitment.</p>
            <Suspense fallback={<p style={{ color: 'var(--brand-gray)', fontSize: 14 }}>Loading...</p>}>
              <WaitlistFormWrapper />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
