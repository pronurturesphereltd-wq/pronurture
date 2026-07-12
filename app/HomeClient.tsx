'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getHomepage } from '@/lib/sanity'
import { ArrowRight } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import CountUp from '@/components/ui/CountUp'
import { useIsMobile } from '@/hooks/useIsMobile'
import facilityScheduling from '@/assets/facility-scheduling.png'
import professionalHome from '@/assets/professional-home.png'


const defaultStats = [
  { value: '72,000+', label: 'Nigerian nurses with lapsed licences every year', source: 'MDCN Annual Report' },
  { value: '1:8,000', label: 'Doctor-to-patient ratio vs WHO target of 1:600', source: 'WHO Health Workforce Data' },
  { value: '52.5%', label: 'of professionals have taken a job different from its listing', source: 'PSL Survey, May 2026' },
  { value: '62.5%', label: "are behind on or don't know their CPD requirements", source: 'PSL Survey, May 2026' },
  { value: '87%', label: 'would do accredited CPD entirely on mobile if quality is right', source: 'PSL Survey, May 2026' },
  { value: '97.5%', label: 'of clinical professionals are open to new job opportunities', source: 'PSL Survey, May 2026' },
]

const defaultQuotes = [
  { quote: 'The gap between your actual skills and real career growth opportunities.', attribution: 'Registered Nurse, Edo State' },
  { quote: 'No free app to boost my qualifications remotely.', attribution: 'Allied Health Professional, Adamawa State' },
  { quote: 'By the time we find someone through WhatsApp, the person we wanted has taken another role.', attribution: 'Medical Director, Private Hospital, Edo State' },
]

export default function HomeClient() {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    getHomepage().then(setData).catch(() => setData({}))
  }, [])
  const stats = data?.stats?.length ? data.stats : defaultStats
  const quotes = data?.quotes?.length ? data.quotes : defaultQuotes
  const isMobile = useIsMobile()

  return (
    <>
      {/* HERO */}
      <section style={{
        height: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        position: 'relative',
        background: '#ffffff',
        overflow: 'hidden',
      }}>
        {/* Grid texture overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(17,54,20,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,54,20,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(17,54,20,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Eyebrow */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <SectionTag label={data?.heroEyebrow || 'Trusted by Healthcare Professionals, Hospitals & Clinics Across Nigeria'} />
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(32px, 4.5vw, 58px)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          color: '#0d2810',
          maxWidth: 800,
          margin: '0 auto 16px',
          position: 'relative',
        }}>
          {data?.heroHeadline || 'The Healthcare Workforce Platform Nigeria Has Been Waiting For.'}
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(14px, 1.4vw, 17px)',
          lineHeight: 1.6,
          color: '#4a5e4d',
          maxWidth: 580,
          margin: '0 auto 12px',
          position: 'relative',
        }}>
          {data?.heroSubheadline || "Whether you're advancing your healthcare career or building a high-performing workforce, PSL connects healthcare professionals with trusted employers while simplifying recruitment, workforce management, CPD, compliance, scheduling, and career development — all from one intelligent platform."}
        </p>
        <p style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#113614',
          marginBottom: 28,
          position: 'relative',
        }}>
          Healthcare is complex. Managing your workforce shouldn&apos;t be.
        </p>

        {/* CTAs */}
        <div className="hero-mobile-stack" style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <a href="/waitlist?role=professional" className="btn-primary">
            Join as a Healthcare Professional
            <span className="btn-primary__icon">
              <ArrowRight size={15} className="arrow-a" />
              <ArrowRight size={15} className="arrow-b" />
            </span>
          </a>
          <a href="/waitlist?role=employer" className="btn-primary" style={{ background: 'transparent', color: '#113614', border: '2px solid #113614', padding: '3px 3px 3px 20px' }}>
            Hire Healthcare Professionals
            <span className="btn-primary__icon" style={{ background: '#113614', color: '#fff', flexShrink: 0 }}>
              <ArrowRight size={15} className="arrow-a" />
              <ArrowRight size={15} className="arrow-b" />
            </span>
          </a>
        </div>

        {/* Caption */}
        <p style={{ fontSize: 13, color: '#7a8c7d', marginTop: 14, position: 'relative' }}>
          Free to join. No credit card required.
        </p>
      </section>

      {/* PARTNERS TICKER */}
      <section style={{ padding: '32px 0 0', borderBottom: 'none', overflow: 'hidden', position: 'relative', background: '#fff' }}>
        <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--brand-near-black)', marginBottom: 12, letterSpacing: '-0.01em' }}>
          Built for Every Part of Nigeria's Healthcare Workforce
        </p>
        <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--brand-gray)', maxWidth: 640, margin: '0 auto 24px' }}>
          Trusted by healthcare professionals, hospitals, clinics, diagnostic centres, NGOs, training institutions, and healthcare organisations committed to building a stronger healthcare system.
        </p>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 140, background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 140, background: 'linear-gradient(270deg, #ffffff 0%, rgba(255,255,255,0) 100%)', zIndex: 2, pointerEvents: 'none' }} />
          <div className="ticker-track" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
            {['MDCN', 'NMCN', 'PCN', 'MLSCN', 'WHO', 'NMA', 'RRBN', 'WCFN', 'MDCN', 'NMCN', 'PCN', 'MLSCN', 'WHO', 'NMA', 'RRBN', 'WCFN'].map((name, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, padding: '0 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.08)', background: 'var(--brand-offwhite)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-dark)', opacity: 0.4 }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-near-black)', letterSpacing: '0.04em', opacity: 0.6, whiteSpace: 'nowrap' }}>{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE PLATFORM */}
      <section style={{ padding: '100px 24px', background: 'var(--brand-offwhite)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <AnimateOnScroll>
            <SectionTag label="The Platform" />
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#0d2810', lineHeight: 1.1, margin: '16px 0 12px', letterSpacing: '-0.02em' }}>
              One Platform. Every Workforce Need.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: '#4a5e4d', marginBottom: 64, maxWidth: 560 }}>
              Healthcare organisations rely on too many disconnected systems.
            </p>
          </AnimateOnScroll>

          {/* Timeline */}
          {isMobile ? (
            /* Vertical stepper — mobile */
            <div>
              {[
                { icon: '👥', label: 'Recruitment scattered across WhatsApp' },
                { icon: '📁', label: 'Staff records in folders and filing cabinets' },
                { icon: '📊', label: 'Schedules managed on spreadsheets' },
                { icon: '📋', label: 'Training tracked manually' },
                { icon: '⚠️', label: 'Compliance a last-minute scramble' },
              ].map((item, i) => (
                <AnimateOnScroll key={i} delay={i * 80}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    {/* Circle + vertical connector */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: '#fff',
                        border: '1px solid rgba(220,38,38,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}>{item.icon}</div>
                      <div style={{ width: 1, flex: 1, minHeight: 20, background: 'rgba(17,54,20,0.12)', marginTop: 4 }} />
                    </div>
                    {/* Label */}
                    <div style={{ paddingTop: 10, paddingBottom: 28 }}>
                      <p style={{ fontSize: 14, color: '#9aa89d', lineHeight: 1.55, margin: 0 }}>{item.label}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
              {/* PSL endpoint */}
              <AnimateOnScroll delay={500}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: '#113614',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(17,54,20,0.35)',
                    flexShrink: 0,
                  }}>
                    <img src="/Full_Color_Logo.svg" alt="PSL" style={{ width: 28, height: 28, filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#113614', lineHeight: 1.5, margin: 0 }}>PSL — One platform, everything connected</p>
                </div>
              </AnimateOnScroll>
            </div>
          ) : (
            /* Horizontal timeline — desktop */
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 32, left: 0, right: 0,
                height: 1, background: 'rgba(17,54,20,0.12)', zIndex: 0,
              }} />
              <div className="grid-6col" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, position: 'relative', zIndex: 1 }}>
                {[
                  { icon: '👥', label: 'Recruitment scattered across WhatsApp' },
                  { icon: '📁', label: 'Staff records in folders and filing cabinets' },
                  { icon: '📊', label: 'Schedules managed on spreadsheets' },
                  { icon: '📋', label: 'Training tracked manually' },
                  { icon: '⚠️', label: 'Compliance a last-minute scramble' },
                ].map((item, i) => (
                  <AnimateOnScroll key={i} delay={i * 100}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: '#fff',
                        border: '1px solid rgba(220,38,38,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24, marginBottom: 16,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}>{item.icon}</div>
                      <p style={{ fontSize: 12, color: '#9aa89d', lineHeight: 1.5, margin: 0 }}>{item.label}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
                {/* PSL Logo endpoint */}
                <AnimateOnScroll delay={600}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: '#113614',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 16,
                      boxShadow: '0 4px 20px rgba(17,54,20,0.35)',
                    }}>
                      <img src="/Full_Color_Logo.svg" alt="PSL" style={{ width: 36, height: 36, filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#113614', lineHeight: 1.5, margin: 0 }}>PSL</p>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          )}

          {/* ONE PLATFORM, TWO EXPERIENCES */}
          <div style={{ marginTop: 80, marginBottom: 24, textAlign: 'center' }}>
            <AnimateOnScroll>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SectionTag label="One Platform, Two Experiences" />
              </div>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 800, color: '#0d2810', lineHeight: 1.15, margin: '16px auto 12px', letterSpacing: '-0.02em', maxWidth: 620 }}>
                Built for Facilities. Designed for the People Who Show Up.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: '#4a5e4d', margin: '0 auto', maxWidth: 560 }}>
                Facilities get a real-time view of scheduling, compliance, and staffing gaps. Professionals get their license status, CPD progress, and next shift — all in one place, on any device.
              </p>
            </AnimateOnScroll>

            {isMobile ? (
              <AnimateOnScroll delay={150}>
                <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: '100%', maxWidth: 320 }}>
                    <Image
                      src={facilityScheduling}
                      alt="PSL facility dashboard showing real-time scheduling and staffing coverage"
                      sizes="320px"
                      style={{ width: '100%', height: 'auto', borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', display: 'block' }}
                    />
                  </div>
                  <div style={{ width: '100%', maxWidth: 180 }}>
                    <Image
                      src={professionalHome}
                      alt="PSL professional app showing license status, CPD progress, and next shift"
                      sizes="180px"
                      style={{ width: '100%', height: 'auto', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 16px 40px rgba(0,0,0,0.15)', display: 'block' }}
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            ) : (
              <AnimateOnScroll delay={150}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '48px auto 0', aspectRatio: '100 / 89' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '74%' }}>
                    <Image
                      src={facilityScheduling}
                      alt="PSL facility dashboard showing real-time scheduling and staffing coverage"
                      sizes="360px"
                      style={{ width: '100%', height: 'auto', borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', display: 'block' }}
                    />
                  </div>
                  <div style={{ position: 'absolute', top: '22%', right: 0, width: '32%', zIndex: 1 }}>
                    <Image
                      src={professionalHome}
                      alt="PSL professional app showing license status, CPD progress, and next shift"
                      sizes="160px"
                      style={{ width: '100%', height: 'auto', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.22)', display: 'block' }}
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            <AnimateOnScroll delay={250}>
              <div style={{ marginTop: isMobile ? 28 : 32, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-dark)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#4a5e4d', fontWeight: 500 }}>Built for facility admins</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-gold)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#4a5e4d', fontWeight: 500 }}>Built for professionals on the move</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Closing statement */}
          <AnimateOnScroll delay={700}>
            <div className="platform-closing" style={{
              marginTop: 64,
              background: '#113614',
              borderRadius: 20, padding: '40px 48px',
              display: 'flex', alignItems: 'center', gap: 32,
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 20, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                  PSL brings everything together into one connected platform — giving healthcare professionals and employers the tools they need to work smarter, grow faster, and deliver better patient care.
                </p>
              </div>
              <a href="/waitlist" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
                background: '#C09D59', color: '#0d2810',
                padding: '14px 24px', borderRadius: 999,
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(192,157,89,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                See the Platform →
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* WHY PSL */}
      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag label="Why PSL" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, marginTop: 16, marginBottom: 16, letterSpacing: '-0.02em' }}>Built Around the Entire Healthcare Workforce Lifecycle</h2>
            <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto' }}>{"Healthcare workforce management doesn't start with hiring — and it doesn't end after onboarding. PSL supports every stage of the journey."}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { title: 'Learn', body: 'Professional development and CPD.' },
              { title: 'Connect', body: 'Verified professionals meet trusted employers.' },
              { title: 'Hire', body: 'Recruit confidently using verified credentials.' },
              { title: 'Manage', body: 'Scheduling, attendance, compliance, and workforce records.' },
              { title: 'Develop', body: 'Career pathways, competency tracking, and continuous learning.' },
              { title: 'Grow', body: 'Data-driven workforce planning and better healthcare outcomes.' },
            ].map((card, i) => (
              <AnimateOnScroll key={card.title} delay={i * 80}>
              <div
                style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid rgba(0,0,0,0.08)', transition: 'transform 0.2s ease, box-shadow 0.2s ease', height: '100%' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--brand-dark)', marginBottom: 8 }}>{card.title}</p>
                <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{card.body}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--brand-dark)', padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag label="The numbers" variant="white" />
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 700, color: '#fff', marginTop: 16, letterSpacing: '-0.02em' }}>Nigerian healthcare needs this platform now.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {stats.map((s: any, i: number) => (
              <AnimateOnScroll key={i} delay={i * 100}>
              <div style={{ padding: '28px 24px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', height: '100%' }}>
                <p style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: '#c09e5a', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10 }}><CountUp value={s.value} /></p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, marginBottom: 10 }}>{s.label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Source: {s.source}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag label="Real voices" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Heard directly from Nigerian healthcare workers.</h2>
            <p style={{ fontSize: 15, color: 'var(--brand-gray)', marginTop: 10 }}>Verbatim quotes — PSL Clinical Workforce Survey, May 2026.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {quotes.map((q: any, i: number) => (
              <AnimateOnScroll key={i} delay={i * 120}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid rgba(0,0,0,0.06)', height: '100%', cursor: 'default', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <p style={{ fontSize: 16, color: 'var(--brand-near-black)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: 20 }}>"{q.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{String.fromCharCode(65+i)}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--brand-gray)' }}>{q.attribution}</p>
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="How it works" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Get Started in Three Simple Steps</h2>
          </div>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            {[
              { label: "If you're a healthcare professional", color: 'var(--brand-dark)', steps: [
                { n:'01', t:'Create Your Account', b:"Choose whether you're joining as a healthcare professional or healthcare employer." },
                { n:'02', t:'Complete Your Profile', b:'Add your professional information or facility details to unlock the platform.' },
                { n:'03', t:'Start Growing', b:'Apply for jobs, recruit talent, manage your workforce, complete CPD, and access the tools you need to succeed.' },
              ], href: '/waitlist?role=professional', cta: 'Join as a professional' },
              { label: "If you run a healthcare facility", color: 'var(--brand-gold)', steps: [
                { n:'01', t:'Create Your Account', b:"Choose whether you're joining as a healthcare professional or healthcare employer." },
                { n:'02', t:'Complete Your Profile', b:'Add your professional information or facility details to unlock the platform.' },
                { n:'03', t:'Manage everything in one dashboard', b:'CPD compliance, workforce analytics, staffing forecasts, and staff records — all from one view.' },
              ], href: '/waitlist?role=employer', cta: 'Join as a facility' },
            ].map((col) => (
              <div key={col.label}>
                <p style={{ fontWeight: 700, fontSize: 14, color: col.color, marginBottom: 28, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.label}</p>
                {col.steps.map((s) => (
                  <div key={s.n} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: col.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>{s.n}</span>
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 5, letterSpacing: '-0.01em' }}>{s.t}</h4>
                      <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.6 }}>{s.b}</p>
                    </div>
                  </div>
                ))}
                <PrimaryButton href={col.href}>{col.cta}</PrimaryButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>{data?.closingHeadline || 'Build the Future of Healthcare — Starting Today'}</h2>
          <p style={{ fontSize: 17, color: 'var(--brand-gray)', marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>{data?.closingSubtext || "The future of healthcare depends on connected professionals, stronger institutions, and smarter workforce management. PSL brings all three together. Join the platform that's helping transform Nigeria's healthcare workforce — one professional, one facility, and one opportunity at a time."}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton href="/waitlist?role=professional">Join as a Healthcare Professional</PrimaryButton>
            <PrimaryButton href="/waitlist?role=employer" variant="white">Join as a Healthcare Employer</PrimaryButton>
          </div>
        </div>
      </section>

    </>
  )
}
