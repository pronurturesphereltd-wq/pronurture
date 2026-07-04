'use client'
import { ArrowRight, CheckCircle2, DollarSign, Filter, BookOpen, ShieldCheck, Smartphone, Zap, Bell, Wallet, UserCheck, BarChart2, Compass, Clock, Briefcase, GraduationCap, CalendarCheck, TrendingUp } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { useEffect, useRef } from 'react'


const defaultPainPoints = [
  { title: 'Finding opportunities', body: "Job leads scattered across WhatsApp groups, word of mouth, and generic job boards that don't understand healthcare." },
  { title: 'Tracking CPD', body: 'No single place to log completed courses, monitor your progress, or know exactly where you stand against renewal requirements.' },
  { title: 'Renewing licences', body: 'Renewal deadlines sneak up with no system tracking them — leading to last-minute scrambles and compliance gaps.' },
  { title: 'Managing credentials', body: 'Qualifications, certificates, and employment records scattered across emails, folders, and paper files.' },
  { title: 'Applying for jobs', body: 'Uploading the same documents repeatedly to different employers with no unified professional profile to share.' },
  { title: 'Keeping employment records', body: 'No verified, portable employment history — making it hard to prove your experience when it matters most.' },
]

const defaultFeatures = [
  { icon: 'Briefcase', title: 'Find Verified Healthcare Jobs', body: 'Discover opportunities from trusted hospitals, clinics, diagnostic centres, NGOs, and healthcare organisations across Nigeria. Every job includes transparent salary information so you know exactly what to expect before applying.' },
  { icon: 'Zap', title: 'Apply Faster', body: 'Forget uploading the same documents repeatedly. Your verified PSL profile allows you to apply for opportunities in just a few clicks — less paperwork, more opportunities.' },
  { icon: 'UserCheck', title: 'Build Your Verified Professional Profile', body: 'Create one secure digital identity covering your qualifications, registration details, employment history, licences, certifications, skills, and CPD records. Your profile stays with you throughout your career.' },
  { icon: 'GraduationCap', title: 'Complete CPD Anywhere', body: "Access accredited CPD programmes, complete training online, earn credits, and monitor your progress — all from your dashboard. Learning shouldn't stop after graduation." },
  { icon: 'CalendarCheck', title: 'Access Flexible Locum Opportunities', body: 'Choose when and where you work. Browse verified locum opportunities that match your speciality, location, and availability — enjoy greater flexibility while increasing your income.' },
  { icon: 'Bell', title: 'Never Miss Licence Renewals', body: 'PSL automatically tracks important renewal dates and reminds you before licences, registrations, or certifications expire. Stay compliant without the stress.' },
  { icon: 'TrendingUp', title: 'Track Your Professional Growth', body: 'Healthcare is constantly evolving. PSL helps you understand your strengths, identify competency gaps, and recommends learning paths that align with your specialty and career aspirations.' },
]

const defaultFAQs = [
  { question: 'Is PSL free for healthcare professionals?', answer: 'Yes. Creating your professional profile and applying for opportunities is completely free.' },
  { question: 'How do I know employers are genuine?', answer: 'Every employer on PSL goes through a verification process before posting opportunities on the platform.' },
  { question: "Can I use PSL even if I'm not looking for a new job?", answer: 'Absolutely. Many professionals use PSL to complete CPD training, manage credentials, track licence renewals, and maintain a verified professional profile.' },
  { question: 'How does CPD work?', answer: 'Complete accredited courses directly on the platform, monitor your progress, and keep your professional development records organised in one place.' },
  { question: 'What is a PSL Professional Profile?', answer: 'Your PSL profile is a verified digital record of your professional identity. It securely stores your qualifications, licences, employment history, certifications, skills, and CPD records, making it easy to share with employers whenever needed.' },
  { question: 'Can I find locum opportunities?', answer: 'Yes. PSL connects healthcare professionals with verified locum opportunities across Nigeria, helping you work flexibly while expanding your experience and earning potential.' },
]

const iconMap: Record<string, any> = { DollarSign, Filter, BookOpen, ShieldCheck, Smartphone, Zap, Bell, Wallet, UserCheck, BarChart2, Compass, Clock, Briefcase, GraduationCap, CalendarCheck, TrendingUp }

export default function ProfessionalsClient() {
  const data: any = {}

  const painPoints = data?.painPoints?.length ? data.painPoints : defaultPainPoints
  const features = data?.features?.length ? data.features : defaultFeatures
  const faqs = data?.faqs?.length ? data.faqs : defaultFAQs

  return (
    <>
      <section style={{ padding: '56px 0 72px', background: 'var(--brand-offwhite)' }}>
        <AnimateOnScroll><div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <SectionTag label="For Healthcare Professionals" />
          <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 20, marginBottom: 20 }}>
            One Platform. Every Opportunity. Your Entire Healthcare Career.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.65, marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
            Whether you&apos;re looking for your next role, earning CPD credits, managing your professional credentials, or taking on flexible locum shifts, PSL gives you everything you need to build a successful healthcare career — all in one secure platform.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <PrimaryButton href="/waitlist?role=professional">Create Your Free Profile</PrimaryButton>
            <a href="/professionals#jobs" className="btn-primary" style={{ background: 'transparent', color: '#113614', border: '2px solid #113614', padding: '3px 3px 3px 20px' }}>
              Explore Healthcare Jobs
              <span className="btn-primary__icon" style={{ background: '#113614', color: '#fff', flexShrink: 0 }}>
                <ArrowRight size={15} className="arrow-a" />
                <ArrowRight size={15} className="arrow-b" />
              </span>
            </a>
          </div>
          <p style={{ fontSize: 13, color: '#7a8c7d', marginTop: 16 }}>Always free for healthcare professionals.</p>
        </div></AnimateOnScroll>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="The problems we fix" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Stop Managing Your Career Across Multiple Platforms</h2>
            <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.65, maxWidth: 560, margin: '16px auto 0' }}>Your professional journey shouldn&apos;t be scattered across WhatsApp groups, job boards, emails, spreadsheets, and paper files.</p>
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
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>{p.title || p.headline}</h3>
                <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={200}>
            <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--brand-dark)', textAlign: 'center', marginTop: 48 }}>
              PSL brings everything together into one verified professional profile that grows with your career.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="What you get" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Everything Your Healthcare Career Needs</h2>
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
                  <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.6 }}>{f.body || f.description}</p>
                </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#f5f5f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll>
            <SectionTag label="Why PSL" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 48, letterSpacing: '-0.02em' }}>More Than a Job Board</h2>
          </AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <AnimateOnScroll delay={100}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#6b7280', marginBottom: 20 }}>Traditional Job Boards</h3>
                {[
                  'Only help you find jobs',
                  'No credential management',
                  'No CPD tracking',
                  'No career development',
                  'No professional profile',
                  'No licence reminders',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 5 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                    <span style={{ color: '#ef4444', fontSize: 18, flexShrink: 0 }}>✕</span>
                    <span style={{ fontSize: 15, color: '#6b7280' }}>{item}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <div style={{ background: '#113614', borderRadius: 16, padding: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#C09D59', marginBottom: 20 }}>PSL</h3>
                {[
                  'Verified professional profile',
                  'Healthcare jobs',
                  'CPD courses',
                  'Career development',
                  'Competency tracking',
                  'Locum opportunities',
                  'Credential management',
                  'Licence reminders',
                  'Career support',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 8 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                    <span style={{ color: '#7A863E', fontSize: 18, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll>
            <SectionTag label="How it works" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 48, letterSpacing: '-0.02em' }}>Get Started in Three Simple Steps</h2>
          </AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                number: '01',
                title: 'Create Your Professional Profile',
                body: 'Add your qualifications, licences, employment history, and professional information. Verification only happens once.',
              },
              {
                number: '02',
                title: 'Unlock Career Opportunities',
                body: 'Search jobs, book locum shifts, complete CPD, track your professional development, and manage your credentials — everything becomes available immediately.',
              },
              {
                number: '03',
                title: 'Keep Growing',
                body: 'Apply with confidence. Stay compliant. Develop new skills. Advance your career.',
              },
            ].map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 120}>
                <div style={{ background: '#f5f5f0', borderRadius: 16, padding: '32px', height: '100%', boxSizing: 'border-box' as const }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#113614', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{step.number}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0d2810', marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4a5e4d', margin: 0 }}>{step.body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#f5f5f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll>
            <SectionTag label="Who it's for" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 16, letterSpacing: '-0.02em' }}>Built for Every Healthcare Professional</h2>
            <p style={{ fontSize: 18, color: '#4a5e4d', lineHeight: 1.7, marginBottom: 40, maxWidth: 600 }}>Whether you&apos;re early in your career or an experienced specialist, PSL is designed to support your professional journey.</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[
                'Doctors', 'Nurses', 'Midwives', 'Pharmacists', 'Medical Laboratory Scientists',
                'Radiographers', 'Physiotherapists', 'Dentists', 'Community Health Officers',
                'Optometrists', 'Nutritionists', 'Healthcare Administrators',
                'Public Health Professionals', 'Allied Health Professionals',
              ].map((role, i) => (
                <span key={i} style={{
                  display: 'inline-block', padding: '8px 18px',
                  background: '#fff', borderRadius: 999,
                  border: '1px solid rgba(17,54,20,0.15)',
                  fontSize: 14, fontWeight: 500, color: '#113614',
                }}>{role}</span>
              ))}
            </div>
          </AnimateOnScroll>
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

      <section style={{ padding: '80px 24px', background: '#113614' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-0.02em' }}>Your Next Opportunity Starts Here</h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>Whether you&apos;re searching for a better role, building new skills, completing CPD, or planning your long-term career, PSL gives you the tools to move forward with confidence.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/waitlist?role=professional" className="btn-primary">
                Create Your Free Profile
                <span className="btn-primary__icon">
                  <ArrowRight size={15} className="arrow-a" />
                  <ArrowRight size={15} className="arrow-b" />
                </span>
              </a>
              <a href="/professionals#jobs" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: '#fff',
                padding: '3px 3px 3px 20px', borderRadius: 999,
                fontWeight: 700, fontSize: 15,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.4)',
              }}>
                Browse Healthcare Jobs
                <span style={{ width: 33, height: 33, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight size={15} color="#fff" />
                </span>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

    </>
  )
}
