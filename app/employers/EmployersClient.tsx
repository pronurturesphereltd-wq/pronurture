'use client'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, BarChart2, Archive, Users, Clock, MessageCircle, Database, CalendarDays, TrendingUp, ClipboardList, PieChart } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const defaultPainPoints = [
  { headline: "You're filling vacancies through WhatsApp and walk-ins.", body: "Months of messages. Candidates who don't show. By the time you've verified someone, the nurse you wanted has already taken another offer. PSL fixes the pipeline.", source: '' },
  { headline: "You've hired someone whose licence had lapsed.", body: "Or you nearly did. On PSL, every candidate's MDCN or NMCN registration is confirmed before they apply. You only see qualified, licence-current professionals.", source: '' },
  { headline: "Your staff manage their own CPD. You have no idea who's at risk.", body: "80% of facilities in our survey have no system for tracking staff CPD. PSL gives you a dashboard showing every staff member's status.", source: 'PSL Employer Survey, May 2026' },
  { headline: "You have no visibility into staffing gaps until it's too late.", body: "You discover you're understaffed the day before a shift, not three weeks earlier when you could have done something about it. Gaps that blindside you cost more — in agency fees, overtime, and patient care.", source: '' },
  { headline: "Onboarding new staff is inconsistent and compliance gaps slip through.", body: "Every new hire goes through a different version of onboarding depending on who handles it. Documents get missed, training gets skipped, and the gaps only show up during audits.", source: '' },
]

const defaultFeatures = [
  { icon: 'ShieldCheck', title: 'Verified candidates', description: "Every applicant's MDCN/NMCN registration confirmed before they reach your inbox." },
  { icon: 'BarChart2', title: 'CPD compliance dashboard', description: "See your whole team's CPD status in one place. Automatic reminders before deadlines." },
  { icon: 'Archive', title: 'Digital staff records', description: 'Contracts, certificates, credentials — stored, searchable, inspection-ready.' },
  { icon: 'Users', title: 'Vacancy posting', description: 'Post a role with salary range. Receive verified applicants directly.' },
  { icon: 'Clock', title: 'Locum on demand', description: 'Post a locum request and reach available professionals in your state within hours.' },
  { icon: 'MessageCircle', title: 'Named support on WhatsApp', description: 'A real person you can call. 4/5 employers said this was their number one trust requirement.' },
  { icon: 'Database', title: 'Staff Registry', description: 'One master profile per worker — identity, role, employer, location, license status, and employment history. Always current. Always accessible.' },
  { icon: 'CalendarDays', title: 'Attendance & Leave Management', description: 'Track daily attendance, manage leave requests, and maintain accurate records — all within the same platform as your roster and payroll.' },
  { icon: 'TrendingUp', title: 'Staffing Forecasts', description: 'See your workforce gaps weeks in advance. Plan recruitment and shift coverage before shortages hit patient care.' },
  { icon: 'ClipboardList', title: 'Onboarding Checklists', description: 'Standardised onboarding for every new hire. Documents, training requirements, and compliance checks — nothing falls through the cracks.' },
  { icon: 'PieChart', title: 'Workforce Analytics', description: 'Dashboards for turnover, vacancy trends, CPD completion, and geographic staff distribution. Real data for better workforce decisions.' },
]

const defaultStats = [
  { value: '5.0/5', label: 'CPD compliance dashboard importance rated by every employer in our survey', source: 'PSL Employer Survey, May 2026' },
  { value: '4.6/5', label: 'Overall platform interest rating from employers surveyed', source: 'PSL Employer Survey, May 2026' },
  { value: '6 months', label: 'Average time to fill a vacancy for 40% of employer respondents', source: 'PSL Employer Survey, May 2026' },
  { value: '80%', label: 'of facilities have no facility-level CPD tracking at all', source: 'PSL Employer Survey, May 2026' },
  { value: '4/5', label: "employers say no one to call would make them distrust a platform", source: 'PSL Employer Survey, May 2026' },
]

const defaultFAQs = [
  { question: 'What will PSL cost?', answer: "PSL is free during early access. When we launch commercially, we'll have a Starter plan for smaller facilities and a Growth plan for mid-size facilities. Early access members get pricing locked in." },
  { question: 'How fast can I fill a vacancy?', answer: 'Once you post, applications arrive from pre-verified candidates immediately. On the Growth plan, we guarantee a qualified shortlist within 14 days or we refund the month.' },
  { question: 'Who are the candidates on PSL?', answer: 'Registered nurses, midwives, doctors, pharmacists, physiotherapists, lab scientists, radiographers, CHEWs, and allied health professionals — all with verified MDCN, NMCN, or PCN registration.' },
  { question: 'What does early access include?', answer: "Early access members receive priority onboarding with dedicated support, discounted subscription rates locked in for the first 12 months, and direct input into the product roadmap. You'll be among the first facilities to go live with all platform capabilities — staff registry, scheduling, attendance, CPD tracking, credential verification, staffing forecasts, and workforce analytics — at no cost until full commercial launch." },
  { question: 'Does PSL include attendance and leave management?', answer: 'Yes. You can track daily attendance, manage and approve leave requests, and generate attendance reports — all within the same platform as your shift scheduling and payroll.' },
  { question: 'Can I forecast my staffing needs in advance?', answer: "Yes. PSL's staffing forecast dashboard shows projected workforce gaps based on scheduled leave, upcoming contract ends, and vacancy trends — so you can plan ahead, not react after the fact." },
  { question: 'What is the PSL staff registry?', answer: 'The PSL staff registry is a master profile for every worker in your facility — their identity, qualifications, role, employment history, license status, and compliance records. It gives you a single, always-current view of your entire workforce.' },
]

const iconMap: Record<string, any> = { ShieldCheck, BarChart2, Archive, Users, Clock, MessageCircle, Database, CalendarDays, TrendingUp, ClipboardList, PieChart }

export default function EmployersClient() {
  const data: any = {}
  const contactData: any = {}

  const painPoints = data?.painPoints?.length ? data.painPoints : defaultPainPoints
  const features = data?.features?.length ? data.features : defaultFeatures
  const stats = data?.stats?.length ? data.stats : defaultStats
  const faqs = data?.faqs?.length ? data.faqs : defaultFAQs
  const whatsapp = contactData?.whatsappNumber || ''

  return (
    <>
      <section style={{ padding: '56px 0 72px', background: 'var(--brand-dark)' }}>
        <AnimateOnScroll><div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <SectionTag label="For Healthcare Facilities" variant="white" />
          <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 20, marginBottom: 20 }}>
            {data?.heroHeadline || 'Stop hiring blind.'}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            {data?.heroSubheadline || "PSL gives Nigerian hospitals, clinics, and healthcare facilities the tools to register, roster, schedule, verify, develop, and retain their workforce — all in one platform."}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/waitlist?role=employer" className="btn-primary btn-primary--white">
              {data?.heroCta || 'Post your first vacancy free'}
              <span className="btn-primary__icon"><ArrowRight size={15} className="arrow-a" /><ArrowRight size={15} className="arrow-b" /></span>
            </Link>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp.replace(/\D/g,'')}`} className="btn-text" target="_blank" rel="noopener noreferrer">
                {data?.heroSecondaryCta || 'Prefer to talk first? WhatsApp us'} <ArrowRight size={15} />
              </a>
            )}
          </div>
        </div></AnimateOnScroll>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="Sound familiar?" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>The hiring process is broken. We know because we asked.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820, margin: '0 auto' }}>
            {painPoints.map((p: any, i: number) => (
              <AnimateOnScroll key={i} delay={i * 100}>
              <div style={{ padding: '32px 36px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', display: 'flex', gap: 24, alignItems: 'flex-start', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,54,19,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--brand-dark)' }}>0{i+1}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{p.headline}</h3>
                  <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{p.body}</p>
                  {p.source && <p style={{ fontSize: 12, color: 'var(--brand-gray)', marginTop: 8, opacity: 0.7 }}>Source: {p.source}</p>}
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="The transformation" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>What changes when you use PSL.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { before: 'Chasing candidates on WhatsApp', after: 'Verified professionals come to you', body: "Every professional on PSL has a checked registration, verified credentials, and a complete work history — ready to review before you ever speak to them." },
              { before: 'CPD tracking on paper or not at all', after: "Your whole team's compliance, at a glance", body: "See which staff are up to date, who needs to renew, and what courses they've completed — without chasing anyone." },
              { before: 'Scattered staff records and paper files', after: 'One verified profile per worker', body: 'Every team member has a live digital record — identity, role, licenses, CPD status, and employment history — always current, always accessible.' },
              { before: 'Reactive hiring', after: 'Proactive workforce planning', body: "Instead of filling gaps as they appear, you see vacancies, turnover trends, and staffing forecasts weeks in advance. Workforce decisions become data-driven, not crisis-driven." },
            ].map((card, i) => (
              <AnimateOnScroll key={i} delay={i * 100}>
              <div style={{ padding: 32, borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: 'var(--brand-gray)', opacity: 0.7, textDecoration: 'line-through' }}>{card.before}</span>
                  <span style={{ fontSize: 15, color: 'var(--brand-gray)' }}>→</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-dark)' }}>{card.after}</span>
                </div>
                <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{card.body}</p>
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
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Everything you need to run your clinical workforce.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {features.map((f: any, i: number) => {
              const Icon = iconMap[f.icon] || ShieldCheck
              return (
                <AnimateOnScroll key={i} delay={i * 80}>
                <div style={{ padding: '28px 24px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.07)', background: '#fff', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, boxShadow: '0 1px 20px rgba(0,0,0,0.12)' }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h4>
                  <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.6 }}>{f.description}</p>
                </div>
                </AnimateOnScroll>
              )
            })}
          </div>
          <p style={{ textAlign: 'center', fontWeight: 600, color: 'var(--brand-dark)', fontSize: 18, marginTop: 32 }}>All eleven capabilities in one subscription. No per-module pricing.</p>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="How it works" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Up and running in 3 simple steps.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { n: '01', t: 'Create your facility profile and post your first shift', b: 'Set up your hospital or clinic in minutes. Add your departments, staffing requirements, and post your first open shift. No technical training required — your HR team can be live the same day.' },
              { n: '02', t: 'Browse verified professionals and build your workforce', b: 'Review applications from qualified professionals whose credentials have already been checked. See licence status, CPD completion, work history, and competency records at a glance — then confirm with one click.' },
              { n: '03', t: 'Manage your whole workforce from one dashboard', b: 'Shifts, attendance, leave, payroll, CPD compliance, staffing forecasts, and workforce analytics — all in one place. Your HR team gets hours back every week.' },
            ].map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 120}>
              <div style={{ padding: 28, borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: 'var(--brand-offwhite)', height: '100%' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{step.n}</span>
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{step.t}</h4>
                <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{step.b}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={200}><div style={{ textAlign: 'center', marginTop: 40 }}>
            <PrimaryButton href="/waitlist?role=employer">Start Your Facility Profile</PrimaryButton>
          </div></AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag label="By the numbers" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>What employers told us before we built a single feature.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {stats.map((s: any, i: number) => (
              <AnimateOnScroll key={i} delay={i * 100}>
              <div style={{ padding: '24px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.08)', background: 'var(--brand-offwhite)', textAlign: 'center', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <p style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 700, color: 'var(--brand-dark)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 8 }}>{s.value}</p>
                <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.55, marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontSize: 12, color: 'var(--brand-gray)', opacity: 0.6 }}>{s.source}</p>
              </div>
              </AnimateOnScroll>
            ))}
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
          <SectionTag label="Get started" variant="white" />
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, color: '#fff', marginTop: 16, marginBottom: 16, letterSpacing: '-0.02em' }}>{data?.closingHeadline || "We're real people. Here's how to reach us."}</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.65 }}>{data?.closingSubtext || 'Every PSL employer account comes with a named contact reachable on WhatsApp. Not a helpdesk. Not a ticket number. A person who knows your facility.'}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/waitlist?role=employer" className="btn-primary btn-primary--white">
              Post your first vacancy free
              <span className="btn-primary__icon"><ArrowRight size={15} className="arrow-a" /><ArrowRight size={15} className="arrow-b" /></span>
            </Link>
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp.replace(/\D/g,'')}`} className="btn-text" target="_blank" rel="noopener noreferrer">
                Talk to us on WhatsApp <ArrowRight size={15} />
              </a>
            )}
          </div>
        </div></AnimateOnScroll>
      </section>

    </>
  )
}
