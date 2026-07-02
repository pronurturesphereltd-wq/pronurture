'use client'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Users, Briefcase, Smartphone } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import CountUp from '@/components/ui/CountUp'
import { urlFor } from '@/lib/sanity'


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
  const data: any = {}
  const stats = data?.stats?.length ? data.stats : defaultStats
  const quotes = data?.quotes?.length ? data.quotes : defaultQuotes

  return (
    <>
      {/* HERO */}
      <section style={{ padding: '32px 0 0' }}>
        <div className="container">
          <div className="hero-card" style={{ background: 'linear-gradient(135deg,#103613 0%,#1a4d1e 100%)', borderRadius: 28, padding: '48px 48px 0', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-start', maxHeight: 'calc(100vh - 160px)' }}>
            <div style={{ paddingBottom: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 100, padding: '6px 14px', width: 'fit-content' }}>
                <span style={{ color: '#c09e5a', fontSize: 13 }}>✦</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>{data?.heroEyebrow || 'Trusted by Healthcare Professionals, Hospitals & Clinics Across Nigeria'}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
                {data?.heroHeadline || 'The Healthcare Workforce Platform Nigeria Has Been Waiting For.'}
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: 12, maxWidth: 460 }}>
                {data?.heroSubheadline || "Whether you're advancing your healthcare career or building a high-performing workforce, PSL connects healthcare professionals with trusted employers while simplifying recruitment, workforce management, CPD, compliance, scheduling, and career development — all from one intelligent platform."}
              </p>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: 20, maxWidth: 460, fontWeight: 600 }}>
                {"Healthcare is complex. Managing your workforce shouldn't be."}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                <Link href="/waitlist?role=professional" className="btn-primary btn-primary--white">
                  {data?.heroCta1 || "Join as a Healthcare Professional"}
                  <span className="btn-primary__icon"><ArrowRight size={15} className="arrow-a" /><ArrowRight size={15} className="arrow-b" /></span>
                </Link>
                <Link href="/waitlist?role=employer" className="btn-text">
                  {data?.heroCta2 || 'Hire Healthcare Professionals'} <ArrowRight size={15} />
                </Link>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{data?.heroNote || 'Free to join. No credit card required.'}</p>
            </div>
            <div className="hero-image-card" style={{ borderRadius: 20, overflow: 'hidden', height: 380, position: 'relative' }}>
              {data?.heroImage ? (
                <img
                  src={urlFor(data.heroImage).width(800).height(600).url()}
                  alt="Hero"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : data?.heroVideo ? (
                <video
                  src={data.heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.06)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ textAlign: 'center', padding: 32 }}>
                    <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <Smartphone size={36} color="rgba(255,255,255,0.5)" />
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Add image or video via Sanity Studio</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
      <section style={{ padding: 'var(--section-padding-y) 0', background: '#fff' }}>
        <div className="container">
          <AnimateOnScroll>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <SectionTag label="The Platform" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, marginTop: 16, marginBottom: 20, letterSpacing: '-0.02em' }}>One Platform. Every Workforce Need.</h2>
            <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.8, marginBottom: 24 }}>Healthcare organisations rely on too many disconnected systems.</p>
            <div style={{ textAlign: 'left', margin: '0 auto 28px', display: 'inline-block' }}>
              {[
                'Recruitment happens in one place.',
                'Staff records live somewhere else.',
                'Schedules are managed on spreadsheets.',
                'Training is tracked manually.',
                'Compliance becomes a last-minute scramble.',
              ].map((point) => (
                <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: 'var(--brand-dark)', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>–</span>
                  <p style={{ fontSize: 18, color: 'var(--brand-near-black)', lineHeight: 1.8, margin: 0 }}>{point}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 18, color: 'var(--brand-gray)', lineHeight: 1.8 }}>PSL brings everything together into one connected platform — giving healthcare professionals and employers the tools they need to work smarter, grow faster, and deliver better patient care.</p>
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

      {/* AUDIENCE CARDS */}
      <section style={{ paddingTop: 48, paddingBottom: 'var(--section-padding-y)', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 32 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <AnimateOnScroll delay={0}>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, padding: 36, background: '#fff', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,54,19,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Users size={22} color="var(--brand-dark)" />
              </div>
              <SectionTag label="For Healthcare Professionals" />
              <h3 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 700, marginTop: 12, marginBottom: 12, letterSpacing: '-0.02em' }}>Everything You Need to Build a Successful Healthcare Career</h3>
              <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65, marginBottom: 20 }}>Your career deserves more than another job board. PSL helps you discover opportunities, build your professional profile, manage your credentials, complete CPD, access verified locum shifts, and keep your career moving forward from one secure platform.</p>
              {[
                { t: 'Find Better Opportunities', b: 'Browse verified healthcare jobs with transparent salaries and apply in just a few clicks.' },
                { t: 'Build a Verified Professional Profile', b: 'Keep your qualifications, licences, employment history, and credentials securely stored and instantly shareable.' },
                { t: 'Complete CPD Anytime', b: 'Access accredited CPD courses, monitor your progress, and stay compliant with professional requirements.' },
                { t: 'Pick Up Verified Locum Shifts', b: 'Choose flexible work opportunities that match your schedule and location.' },
                { t: 'Follow Your Career Roadmap', b: 'Receive personalised learning recommendations based on your role, specialty, and career goals.' },
                { t: 'Stay Ready for Every Opportunity', b: 'Never miss licence renewals or important compliance deadlines with automated reminders.' },
              ].map((item) => (
                <div key={item.t} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={17} color="var(--brand-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div><span style={{ fontSize: 15, fontWeight: 600, color: 'var(--brand-near-black)' }}>{item.t}.</span>{' '}<span style={{ fontSize: 15, color: 'var(--brand-gray)' }}>{item.b}</span></div>
                </div>
              ))}
              <PrimaryButton href="/waitlist?role=professional" style={{ marginTop: 24 }}>Create Your Free Professional Profile</PrimaryButton>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, padding: 36, background: 'var(--brand-offwhite)', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,54,19,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Briefcase size={22} color="var(--brand-dark)" />
              </div>
              <SectionTag label="For Healthcare Facilities" />
              <h3 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 700, marginTop: 12, marginBottom: 12, letterSpacing: '-0.02em' }}>Everything You Need to Build a Stronger Workforce</h3>
              <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65, marginBottom: 20 }}>Healthcare workforce management shouldn't involve spreadsheets, WhatsApp groups, paperwork, and disconnected software. PSL gives healthcare facilities one intelligent platform to recruit, onboard, schedule, develop, and retain exceptional healthcare professionals.</p>
              {[
                { t: 'Verified Staff Registry', b: 'Maintain one secure digital profile for every member of your workforce.' },
                { t: 'Recruitment Made Simple', b: 'Post vacancies, review verified applicants, and hire qualified professionals faster.' },
                { t: 'Smart Shift Scheduling', b: 'Build staff rosters, manage attendance, approve leave requests, and reduce scheduling conflicts.' },
                { t: 'Workforce Planning', b: 'Identify staffing shortages before they affect operations using predictive workforce insights.' },
                { t: 'Compliance & CPD', b: 'Monitor staff licences, certifications, and CPD completion from one dashboard.' },
                { t: 'Workforce Analytics', b: 'Make informed workforce decisions using real-time reports and operational insights.' },
              ].map((item) => (
                <div key={item.t} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={17} color="var(--brand-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div><span style={{ fontSize: 15, fontWeight: 600, color: 'var(--brand-near-black)' }}>{item.t}.</span>{' '}<span style={{ fontSize: 15, color: 'var(--brand-gray)' }}>{item.b}</span></div>
                </div>
              ))}
              <PrimaryButton href="/waitlist?role=employer" style={{ marginTop: 24 }}>Start Hiring Smarter</PrimaryButton>
            </div>
            </AnimateOnScroll>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
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
