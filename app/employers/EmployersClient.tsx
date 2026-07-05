'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getEmployersPage } from '@/lib/sanity'
import { ArrowRight, ShieldCheck, BarChart2, Archive, Users, Clock, MessageCircle, Database, CalendarDays, TrendingUp, ClipboardList, PieChart, UserPlus, Calendar } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const defaultPainPoints = [
  { title: 'Recruitment takes too long', body: 'Vacancies stay open for months while departments operate understaffed, increasing pressure on existing staff and affecting patient care.' },
  { title: 'Staff shortages happen without warning', body: "You discover you're understaffed the day before a shift — not weeks earlier when you could have done something about it." },
  { title: 'Shift schedules constantly change', body: 'Last-minute changes, no-shows, and manual roster updates consume hours of administrative time every week.' },
  { title: 'Attendance is difficult to monitor', body: 'Paper-based attendance records are slow, error-prone, and impossible to analyse without significant manual effort.' },
  { title: 'Compliance is tracked manually', body: "Licence renewals, certifications, and CPD deadlines get missed because there's no system proactively tracking them." },
  { title: 'Training records are scattered', body: 'Employee training and CPD records live across spreadsheets, emails, and filing cabinets — making audits stressful and time-consuming.' },
  { title: 'Disconnected systems cost time and money', body: 'These fragmented processes waste time, increase costs, and ultimately put patient care at risk.' },
]

const defaultFeatures = [
  { icon: 'UserPlus', title: 'Recruit Qualified Professionals Faster', body: 'Access a growing network of verified healthcare professionals across multiple specialties. Post vacancies, review applications, verify credentials, and hire with confidence.' },
  { icon: 'Database', title: 'Maintain a Digital Staff Registry', body: 'Create one secure profile for every employee. Store professional licences, qualifications, employment history, certifications, compliance records, and workforce information in one place — no more searching through multiple files or spreadsheets.' },
  { icon: 'Calendar', title: 'Simplify Shift Scheduling', body: 'Create staff rosters in minutes. Assign shifts, manage rotations, handle last-minute replacements, and ensure every department has the coverage it needs.' },
  { icon: 'CalendarDays', title: 'Attendance & Leave Management', body: 'Track attendance in real time, approve leave requests digitally, monitor absenteeism, and generate attendance reports instantly — everything stays organised automatically.' },
  { icon: 'ClipboardList', title: 'Onboard New Employees Efficiently', body: 'Standardise your onboarding process with digital checklists. Track documentation, verify credentials, assign mandatory training, and ensure every employee starts fully prepared and compliant.' },
  { icon: 'ShieldCheck', title: 'Monitor Compliance', body: 'Never lose track of licence renewals, certifications, mandatory training, or CPD completion. Receive automatic alerts before compliance issues become operational risks.' },
  { icon: 'TrendingUp', title: 'Workforce Planning & Forecasting', body: 'Use workforce insights to anticipate vacancies, monitor turnover trends, and identify staffing gaps before they impact patient care. Plan proactively instead of reacting to emergencies.' },
  { icon: 'PieChart', title: 'Workforce Analytics', body: 'Transform workforce data into actionable insights. Monitor staff utilisation, vacancy trends, turnover, attendance, CPD completion, compliance rates, and department performance — make workforce decisions backed by data, not guesswork.' },
]

const defaultStats = [
  { value: '5.0/5', label: 'CPD compliance dashboard importance rated by every employer in our survey', source: 'PSL Employer Survey, May 2026' },
  { value: '4.6/5', label: 'Overall platform interest rating from employers surveyed', source: 'PSL Employer Survey, May 2026' },
  { value: '6 months', label: 'Average time to fill a vacancy for 40% of employer respondents', source: 'PSL Employer Survey, May 2026' },
  { value: '80%', label: 'of facilities have no facility-level CPD tracking at all', source: 'PSL Employer Survey, May 2026' },
  { value: '4/5', label: "employers say no one to call would make them distrust a platform", source: 'PSL Employer Survey, May 2026' },
]

const defaultFAQs = [
  { question: 'Can I recruit permanent and locum staff?', answer: 'Yes. PSL supports both permanent recruitment and verified locum staffing, giving you the flexibility to meet changing workforce demands.' },
  { question: 'How are healthcare professionals verified?', answer: 'Professional registrations, licences, qualifications, and employment information are verified before candidates become available to employers. This helps reduce recruitment risks and saves valuable screening time.' },
  { question: 'Does PSL support attendance and leave management?', answer: 'Absolutely. Track attendance, approve leave requests, monitor absenteeism, and generate reports from one integrated dashboard.' },
  { question: 'Can PSL help with workforce planning?', answer: 'Yes. Our workforce forecasting tools help you identify staffing shortages, monitor vacancy trends, and prepare for future workforce needs before they become operational challenges.' },
  { question: 'Is CPD included?', answer: 'Yes. Managers can monitor CPD completion across teams, assign required learning, and ensure employees remain compliant with professional development requirements.' },
  { question: 'Can PSL integrate with our existing HR or payroll system?', answer: 'PSL is designed to work alongside existing HR and payroll processes while reducing manual administration. Integration capabilities continue to expand as the platform evolves.' },
]

const iconMap: Record<string, any> = { ShieldCheck, BarChart2, Archive, Users, Clock, MessageCircle, Database, CalendarDays, TrendingUp, ClipboardList, PieChart, UserPlus, Calendar }

export default function EmployersClient() {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    getEmployersPage().then(setData).catch(() => setData({}))
  }, [])
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
          <SectionTag label={data?.heroEyebrow || 'For Healthcare Employers'} variant="white" />
          <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 20, marginBottom: 20 }}>
            {data?.heroHeadline || 'Build Stronger Healthcare Teams with One Intelligent Workforce Platform'}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            {data?.heroSubheadline || "From recruitment and onboarding to scheduling, compliance, CPD, attendance, and workforce analytics, PSL gives hospitals, clinics, and healthcare organisations everything they need to attract, manage, and retain exceptional healthcare professionals — all in one secure platform."}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/waitlist?role=employer" className="btn-primary btn-primary--white">
              Book a Demo
              <span className="btn-primary__icon"><ArrowRight size={15} className="arrow-a" /><ArrowRight size={15} className="arrow-b" /></span>
            </Link>
            <a href="/waitlist?role=employer" className="btn-primary" style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', padding: '3px 3px 3px 20px' }}>
              Create Your Facility Account
              <span className="btn-primary__icon" style={{ background: 'rgba(255,255,255,0.2)', width: 33, height: 33, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={15} className="arrow-a" />
                <ArrowRight size={15} className="arrow-b" />
              </span>
            </a>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>Built for hospitals, clinics, diagnostic centres, HMOs, NGOs, and healthcare organisations of every size.</p>
        </div></AnimateOnScroll>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="Sound familiar?" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>{data?.painPointsHeading || "Healthcare Workforce Management Shouldn't Be This Difficult"}</h2>
            <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.65, marginTop: 16, maxWidth: 560, margin: '16px auto 0' }}>Managing a healthcare workforce is one of the biggest challenges facing healthcare organisations today.</p>
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
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{p.title || p.headline}</h3>
                  <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{p.body}</p>
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={100}>
            <p style={{ textAlign: 'center', fontSize: 17, color: 'var(--brand-gray)', lineHeight: 1.7, maxWidth: 620, margin: '40px auto 0' }}>PSL replaces fragmented systems with one integrated platform that helps you manage your entire workforce with confidence.</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="What you get" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>{data?.featuresHeading || 'Everything You Need to Manage Your Workforce'}</h2>
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
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 48, letterSpacing: '-0.02em' }}>From Reactive Workforce Management to Strategic Workforce Planning</h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: '16px 24px', background: '#f5f5f0', fontWeight: 700, fontSize: 14, color: '#6b7280', letterSpacing: '0.05em' }}>TRADITIONAL APPROACH</div>
                <div style={{ padding: '16px 24px', background: '#113614', fontWeight: 700, fontSize: 14, color: '#C09D59', letterSpacing: '0.05em' }}>WITH PSL</div>
              </div>
              {[
                ['Recruitment is slow', 'Hire verified professionals faster'],
                ['Staff records are scattered', 'One digital workforce registry'],
                ['Shift scheduling is manual', 'Intelligent workforce scheduling'],
                ['Compliance is difficult to monitor', 'Real-time compliance tracking'],
                ['Attendance is paper-based', 'Digital attendance management'],
                ['Staffing gaps are discovered too late', 'Workforce forecasting prevents shortages'],
                ['Reports take days to prepare', 'Real-time workforce analytics'],
              ].map(([before, after], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>✕</span>
                    <span style={{ fontSize: 15, color: '#6b7280' }}>{before}</span>
                  </div>
                  <div style={{ padding: '16px 24px', background: 'rgba(17,54,20,0.03)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#7A863E', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 15, color: '#113614', fontWeight: 500 }}>{after}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll>
            <SectionTag label="Who it's for" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 16, letterSpacing: '-0.02em' }}>Designed for Every Healthcare Organisation</h2>
            <p style={{ fontSize: 18, color: '#4a5e4d', lineHeight: 1.7, marginBottom: 40, maxWidth: 600 }}>Whether you manage ten employees or ten thousand, PSL scales with your organisation.</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[
                'Teaching Hospitals', 'General Hospitals', 'Specialist Hospitals', 'Private Hospitals',
                'Medical Centres', 'Primary Healthcare Centres', 'Diagnostic Centres', 'Fertility Clinics',
                'Mental Health Facilities', 'NGOs', 'HMOs', 'Public Health Agencies', 'Medical Training Institutions',
              ].map((org, i) => (
                <span key={i} style={{ display: 'inline-block', padding: '8px 18px', background: '#f5f5f0', borderRadius: 999, border: '1px solid rgba(17,54,20,0.15)', fontSize: 14, fontWeight: 500, color: '#113614' }}>{org}</span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#f5f5f0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll>
            <SectionTag label="How it works" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 48, letterSpacing: '-0.02em' }}>Get Started in Three Simple Steps</h2>
          </AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { number: '01', title: 'Create Your Facility Profile', body: 'Register your organisation, add departments, define staffing needs, and invite your HR team.' },
              { number: '02', title: 'Build Your Workforce', body: 'Recruit verified professionals, onboard employees, assign shifts, manage attendance, and monitor compliance from one central platform.' },
              { number: '03', title: 'Optimise Your Operations', body: 'Use workforce analytics, staffing forecasts, and performance insights to improve operational efficiency and support better patient outcomes.' },
            ].map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 120}>
                <div style={{ background: '#fff', borderRadius: 16, padding: '32px', height: '100%', boxSizing: 'border-box' as const }}>
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

      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll>
            <SectionTag label="Why PSL" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 24, letterSpacing: '-0.02em' }}>More Than Recruitment. A Complete Workforce Management Platform.</h2>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: '#4a5e4d', marginBottom: 16 }}>Most recruitment platforms stop after you&apos;ve hired someone. PSL is built for everything that comes next.</p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: '#4a5e4d', marginBottom: 16 }}>From onboarding and scheduling to compliance, CPD tracking, attendance, workforce planning, and analytics, PSL supports every stage of the employee lifecycle.</p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: '#4a5e4d', marginBottom: 40 }}>That means fewer systems to manage, less administrative work, better visibility, and a stronger, more engaged workforce.</p>
            <a href="/waitlist?role=employer" className="btn-primary">
              Create Your Facility Account
              <span className="btn-primary__icon">
                <ArrowRight size={15} className="arrow-a" />
                <ArrowRight size={15} className="arrow-b" />
              </span>
            </a>
          </AnimateOnScroll>
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

      <section style={{ padding: '80px 24px', background: '#113614' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: '-0.02em' }}>{data?.closingHeadline || 'Build the Workforce Your Patients Deserve'}</h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>{data?.closingSubtext || "Exceptional healthcare begins with exceptional people. PSL gives your organisation the tools to recruit smarter, manage more efficiently, stay compliant, and build a workforce prepared for the future of healthcare."}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/waitlist?role=employer" className="btn-primary" style={{ border: '2px solid rgba(255,255,255,0.4)' }}>
                Book a Demo
                <span className="btn-primary__icon">
                  <ArrowRight size={15} className="arrow-a" />
                  <ArrowRight size={15} className="arrow-b" />
                </span>
              </a>
              <a href="/waitlist?role=employer" className="btn-primary" style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', padding: '3px 3px 3px 20px' }}>
                Create Your Facility Account
                <span className="btn-primary__icon" style={{ background: 'rgba(255,255,255,0.2)', width: 33, height: 33, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowRight size={15} className="arrow-a" />
                  <ArrowRight size={15} className="arrow-b" />
                </span>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

    </>
  )
}
