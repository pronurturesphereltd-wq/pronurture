'use client'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, DollarSign, Filter, BookOpen, ShieldCheck, Smartphone, Zap, Bell, Wallet } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { useEffect, useRef } from 'react'


const defaultPainPoints = [
  { headline: 'Jobs with no salary shown.', body: "You shouldn't have to apply blind. On PSL, every listing shows the pay — before you spend a minute on the application." },
  { headline: "Listings that aren't even for you.", body: 'PSL filters by your discipline, specialty, and state. You only see roles that actually match what you do.' },
  { headline: 'CPD deadlines with no system to track them.', body: 'PSL shows your NMCN or MDCN points balance in real time and sends you a WhatsApp reminder before your renewal is due.' },
  { headline: 'Jobs that look nothing like the listing.', body: 'Every employer on PSL is verified before they can post. What you see is what you get. 52.5% of clinical professionals surveyed have experienced this.' },
]

const defaultFeatures = [
  { icon: 'DollarSign', title: 'Salary on every listing', description: 'Every job shows the pay range. No exceptions.' },
  { icon: 'Filter', title: 'Specialty matching', description: 'Set your discipline and state once. Your feed updates automatically.' },
  { icon: 'Zap', title: 'One-tap apply', description: 'Build your profile once. Apply to any job in a single tap.' },
  { icon: 'BookOpen', title: 'CPD tracker', description: 'See your points, requirements, and deadline — all on one screen.' },
  { icon: 'Smartphone', title: 'Accredited CPD on mobile', description: 'MDCN/NMCN-aligned courses, built for your phone. Download for offline study.' },
  { icon: 'Wallet', title: 'Certificate wallet', description: 'Store all your credentials. Share them with employers or regulators in one tap.' },
  { icon: 'ShieldCheck', title: 'Locum marketplace', description: 'Browse verified shifts near you. Transparent pay. No agencies.' },
  { icon: 'Bell', title: 'WhatsApp CPD alerts', description: 'We remind you before your deadline — directly on WhatsApp.' },
]

const defaultFAQs = [
  { question: 'Is PSL free?', answer: 'Yes. Free to join, free to browse, free to apply during early access. When we launch commercially, there will be a free tier and a paid Pro plan. Early access members get locked-in pricing.' },
  { question: 'Do the CPD courses count toward my NMCN or MDCN renewal?', answer: 'Yes. Every course is accredited by the relevant professional body before it goes live. Points are added to your tracker automatically.' },
  { question: 'Can I use PSL for locum work alongside my main job?', answer: 'Yes. Locum shifts are separate from full-time listings. Browse and pick up shifts that fit your schedule.' },
  { question: 'How is PSL different from Jobberman or LinkedIn?', answer: "PSL is built only for clinical professionals. It understands your registration, your CPD cycle, and your discipline. Jobberman and LinkedIn weren't designed for you. PSL was." },
  { question: 'What disciplines are on PSL?', answer: "Nurses, midwives, doctors, pharmacists, physiotherapists, lab scientists, radiographers, CHEWs, and all allied health professionals. If you're registered with a Nigerian professional body, you qualify." },
]

const iconMap: Record<string, any> = { DollarSign, Filter, BookOpen, ShieldCheck, Smartphone, Zap, Bell, Wallet }

export default function ProfessionalsPage() {
  const data: any = {}

  const painPoints = data?.painPoints?.length ? data.painPoints : defaultPainPoints
  const features = data?.features?.length ? data.features : defaultFeatures
  const faqs = data?.faqs?.length ? data.faqs : defaultFAQs
  const disciplines = data?.disciplines?.length ? data.disciplines : ['Registered Nurses','Nurse-Midwives','Doctors','Pharmacists','Physiotherapists','Medical Laboratory Scientists','Radiographers','CHEWs','Allied Health Professionals']

  return (
    <>
      <section style={{ padding: '56px 0 72px', background: 'var(--brand-offwhite)' }}>
        <AnimateOnScroll><div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <SectionTag label="For Healthcare Professionals" />
          <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 20, marginBottom: 20 }}>
            {data?.heroHeadline || 'Your career. Finally, a platform built for it.'}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.65, marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
            {data?.heroSubheadline || 'Jobs with salary shown. CPD on your phone. Locum shifts when you need them. For every registered clinical professional in Nigeria.'}
          </p>
          <PrimaryButton href="/waitlist?role=professional">{data?.heroCta || 'Join free — no card required'}</PrimaryButton>
        </div></AnimateOnScroll>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="The problems we fix" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>The system has been failing you. PSL fixes it.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {painPoints.map((p: any, i: number) => (
              <AnimateOnScroll key={i} delay={i * 100}>
              <div style={{ padding: 32, borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,54,19,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <CheckCircle2 size={18} color="var(--brand-dark)" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>{p.headline}</h3>
                <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="What you get" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Everything your career needs. Nothing it does not.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {features.map((f: any, i: number) => {
              const Icon = iconMap[f.icon] || CheckCircle2
              return (
                <AnimateOnScroll key={i} delay={i * 80}>
                <div style={{ padding: '28px 24px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.07)', background: '#fff', textAlign: 'center', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                >
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 1px 20px rgba(0,0,0,0.12)' }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.6 }}>{f.description}</p>
                </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <AnimateOnScroll><div>
              <SectionTag label="Who PSL is for" />
              <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, marginBottom: 20, letterSpacing: '-0.02em' }}>If you are registered, PSL is for you.</h2>
              <p style={{ fontSize: 16, color: 'var(--brand-gray)', lineHeight: 1.65, marginBottom: 24 }}>Registered with MDCN, NMCN, PCN, or any recognised Nigerian professional body? PSL was built for you.</p>
              <PrimaryButton href="/waitlist?role=professional">Create your free profile</PrimaryButton>
            </div></AnimateOnScroll>
            <AnimateOnScroll delay={150}><div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {disciplines.map((d: string) => (
                <span key={d} style={{ padding: '10px 18px', borderRadius: 100, background: 'rgba(16,54,19,0.07)', fontSize: 14, fontWeight: 500, color: 'var(--brand-dark)', border: '1px solid rgba(16,54,19,0.12)' }}>{d}</span>
              ))}
            </div></AnimateOnScroll>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag label="FAQ" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Questions answered.</h2>
          </div></AnimateOnScroll>
          <AnimateOnScroll delay={100}><FAQAccordion items={faqs} /></AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-dark)' }}>
        <AnimateOnScroll><div className="container" style={{ textAlign: 'center' }}>
          <SectionTag label="Early access" variant="white" />
          <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 700, color: '#fff', marginTop: 16, marginBottom: 16, letterSpacing: '-0.02em' }}>{data?.closingHeadline || 'Ready? Join free.'}</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>{data?.closingSubtext || 'No card. No commitment. Your career — finally, a platform built for it.'}</p>
          <Link href="/waitlist?role=professional" className="btn-primary btn-primary--white">
            Create your free profile
            <span className="btn-primary__icon"><ArrowRight size={15} className="arrow-a" /><ArrowRight size={15} className="arrow-b" /></span>
          </Link>
        </div></AnimateOnScroll>
      </section>

    </>
  )
}
