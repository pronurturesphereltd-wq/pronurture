'use client'
import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, Users, Briefcase, FileCheck, BookOpen, Calendar, Shield, TrendingUp } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { getAboutPage, urlFor } from '@/lib/sanity'
import FAQAccordion from '@/components/ui/FAQAccordion'


const generalFAQs = [
  {
    question: 'What is PSL all about?',
    answer: "PSL (ProNurtureSphere Limited) is Nigeria's career platform for clinical professionals and the facilities that hire them. We help healthcare professionals find jobs with salary shown upfront, track their NMCN/MDCN CPD points, and pick up locum shifts — while helping facilities hire verified staff faster.",
  },
  {
    question: 'How can I be part of this organisation?',
    answer: "We're not actively hiring for the PSL team right now, but we welcome interest. Send your CV and a short note about what you'd bring to uwa@pronurture.com.ng, and we'll reach out when a relevant role opens.",
  },
  {
    question: 'Can I be part of it remotely?',
    answer: 'Yes. Most roles at PSL are remote-friendly and can be done from anywhere.',
  },
  {
    question: 'Where is your organisation located?',
    answer: 'PSL is headquartered in Benin, Nigeria.',
  },
  {
    question: 'Do you offer recognised certification courses?',
    answer: 'Yes. The CPD courses available through PSL are accredited and recognized by NMCN and MDCN, and completed hours are tracked automatically toward your license renewal.',
  },
  {
    question: 'Can you help me get a job abroad?',
    answer: 'Not yet. PSL is currently focused on connecting clinical professionals with opportunities within Nigeria. Diaspora and international placements are on our roadmap for the future.',
  },
  {
    question: 'What other benefits do you offer?',
    answer: "Beyond job listings, PSL gives professionals automatic CPD tracking, access to locum shifts, and salary transparency on every listing. Facilities get verified candidates, faster hiring, and tools to manage their team's compliance — all in one platform.",
  },
]

export default function AboutClient() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getAboutPage().then(setData).catch(() => setData({}))
  }, [])

  const team = data?.team || []

  return (
    <>
      <section style={{ padding: '72px 0', background: 'var(--brand-offwhite)' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <AnimateOnScroll>
          <SectionTag label="About PSL" />
          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 20 }}>
            {data?.heroHeadline || "We're Building the Infrastructure Behind a Stronger Healthcare Workforce"}
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.7, color: 'var(--brand-gray)', maxWidth: 720, margin: '24px auto 0' }}>
            PSL exists to help healthcare professionals thrive and healthcare organisations operate more effectively. We believe the future of healthcare in Nigeria depends on connected people, connected systems, and smarter workforce management.
          </p>
          <p style={{ fontSize: 20, lineHeight: 1.7, color: 'var(--brand-gray)', maxWidth: 720, margin: '16px auto 0' }}>
            Our mission is simple: make it easier to find, develop, manage, and retain the healthcare workforce Nigeria needs.
          </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll>
            <div style={{ background: '#0d2810', borderRadius: 20, padding: '48px' }}>
              <SectionTag label="Our Mission" variant="white" />
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em', marginTop: 16 }}>
                Solving One of Healthcare&apos;s Biggest Challenges
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 32 }}>
                Nigeria&apos;s healthcare workforce faces a difficult reality.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
                {[
                  { icon: 'Briefcase', text: 'Professionals struggle to find transparent opportunities' },
                  { icon: 'FileCheck', text: 'Credentials are often managed manually' },
                  { icon: 'BookOpen', text: 'CPD tracking is fragmented' },
                  { icon: 'Users', text: 'Facilities battle staff shortages' },
                  { icon: 'Calendar', text: 'Scheduling is time-consuming' },
                  { icon: 'Shield', text: 'Compliance is difficult to monitor' },
                  { icon: 'TrendingUp', text: 'Workforce planning is often reactive instead of proactive' },
                  { icon: 'ArrowRight', text: 'PSL fixes all of this', highlight: true },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '14px 18px',
                    background: item.highlight ? 'rgba(192,157,89,0.15)' : 'rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    border: item.highlight ? '1px solid rgba(192,157,89,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                  }}>
                    <span style={{ color: '#C09D59', fontSize: 16, flexShrink: 0, marginTop: 2 }}>
                      {item.icon === 'Briefcase' && <Briefcase size={16} />}
                      {item.icon === 'FileCheck' && <FileCheck size={16} />}
                      {item.icon === 'BookOpen' && <BookOpen size={16} />}
                      {item.icon === 'Users' && <Users size={16} />}
                      {item.icon === 'Calendar' && <Calendar size={16} />}
                      {item.icon === 'Shield' && <Shield size={16} />}
                      {item.icon === 'TrendingUp' && <TrendingUp size={16} />}
                      {item.icon === 'ArrowRight' && <ArrowRight size={16} />}
                    </span>
                    <span style={{ fontSize: 14, color: item.highlight ? '#C09D59' : 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontWeight: item.highlight ? 600 : 400 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '20px 24px', background: 'rgba(192,157,89,0.1)', borderRadius: 12, border: '1px solid rgba(192,157,89,0.25)' }}>
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, margin: '0 0 12px' }}>
                  PSL was created to solve these problems with technology designed specifically for the Nigerian healthcare system.
                </p>
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0 }}>
                  We&apos;re building a connected platform where healthcare professionals can grow their careers while hospitals and clinics can build stronger, more compliant, and better-managed teams.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <AnimateOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag label="How we work" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>More Than Recruitment</h2>
            <p style={{ fontSize: 18, color: 'var(--brand-gray)', marginTop: 12 }}>PSL supports the entire healthcare workforce lifecycle:</p>
          </div>
          </AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { number: '01', title: 'Train', body: 'CPD & Learning' },
              { number: '02', title: 'Connect', body: 'Professionals & Employers' },
              { number: '03', title: 'Hire', body: 'Verified Recruitment' },
              { number: '04', title: 'Manage', body: 'Scheduling & Attendance' },
              { number: '05', title: 'Comply', body: 'Licences & CPD' },
              { number: '06', title: 'Grow', body: 'Analytics & Workforce Planning' },
            ].map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 100}>
              <div style={{ padding: 28, borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', height: '100%' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{step.number}</span>
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#113614', letterSpacing: '-0.01em' }}>{step.title}</h4>
                <p style={{ fontSize: 15, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{step.body}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={200}>
          <p style={{ fontSize: 17, color: 'var(--brand-gray)', lineHeight: 1.75, maxWidth: 680, margin: '40px auto 0', textAlign: 'center' }}>
            By connecting these stages, we help healthcare organisations move from reactive workforce management to proactive workforce strategy.
          </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimateOnScroll>
          <SectionTag label="Who we serve" />
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em', marginBottom: 16 }}>Built for the Entire Healthcare Ecosystem</h2>
          <p style={{ fontSize: 18, color: 'var(--brand-gray)', marginBottom: 32 }}>PSL serves:</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {[
              'Healthcare professionals across all specialties',
              'Hospitals and clinics',
              'Diagnostic centres',
              'HMOs',
              'NGOs',
              'Public health organisations',
              'Medical training institutions',
              'Healthcare workforce leaders',
            ].map((tag, i) => (
              <span key={i} style={{ padding: '8px 20px', borderRadius: 999, border: '1.5px solid var(--brand-dark)', color: 'var(--brand-dark)', fontSize: 15, fontWeight: 500, background: '#fff' }}>{tag}</span>
            ))}
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#113614' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll>
            <SectionTag label="Our Vision" variant="white" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}>
              To become the digital backbone of healthcare workforce management in Africa.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
              We envision a future where healthcare professionals can build careers with confidence, healthcare organisations can manage teams with clarity, and healthcare systems can make workforce decisions with real-time data.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
              PSL is building the infrastructure that helps make that future possible.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <AnimateOnScroll>
            <SectionTag label="Our Story" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 40, letterSpacing: '-0.02em', marginTop: 16 }}>How PSL Started</h2>
          </AnimateOnScroll>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
            <AnimateOnScroll delay={100}>
              <div>
                <p style={{ fontSize: 16, color: '#4a5e4d', lineHeight: 1.8, marginBottom: 20 }}>
                  PSL began with a simple observation: healthcare professionals and healthcare employers were using too many disconnected tools.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    'Jobs were shared in WhatsApp groups.',
                    'Credentials lived in email folders.',
                    'Staff records sat in spreadsheets.',
                    'Schedules were managed manually.',
                    'Compliance was checked during audits instead of continuously.',
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, fontSize: 14, color: '#6b7280',
                      padding: '10px 14px', background: '#f9f9f7',
                      borderRadius: 8, borderLeft: '3px solid #ef4444',
                      lineHeight: 1.5,
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#4a5e4d', lineHeight: 1.8, marginTop: 20 }}>
                  Despite the incredible work being done across Nigeria&apos;s healthcare system, the workforce infrastructure supporting that work was fragmented.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0d2810', letterSpacing: '0.05em', marginBottom: 12 }}>
                  SO WE ASKED A DIFFERENT QUESTION:
                </p>
                <blockquote style={{
                  fontSize: 18, fontStyle: 'italic', color: '#0d2810',
                  lineHeight: 1.7, padding: '20px 24px',
                  background: 'rgba(17,54,20,0.05)',
                  borderLeft: '4px solid #C09D59',
                  borderRadius: '0 12px 12px 0',
                  margin: '0 0 24px',
                }}>
                  &ldquo;What would healthcare look like if recruitment, credentialing, CPD, scheduling, compliance, attendance, and workforce planning all worked together in one connected system?&rdquo;
                </blockquote>
                <p style={{ fontSize: 15, color: '#4a5e4d', lineHeight: 1.8, marginBottom: 12 }}>
                  That question became PSL.
                </p>
                <p style={{ fontSize: 15, color: '#4a5e4d', lineHeight: 1.8 }}>
                  Today, we&apos;re building the workforce layer that helps connect every part of Nigeria&apos;s healthcare ecosystem — one verified professional and one healthcare facility at a time.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll delay={300}>
            <div style={{ background: '#0d2810', borderRadius: 16, padding: '28px 32px' }}>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', color: '#C09D59', fontWeight: 700, marginBottom: 20 }}>
                WHAT THE DATA SHOWED — PSL CLINICAL WORKFORCE SURVEY, MAY 2026 — 40 PROFESSIONALS · 5 FACILITIES · 13 STATES
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 20 }}>
                {[
                  { stat: '52.5%', label: 'took a job different from its listing' },
                  { stat: '62.5%', label: 'behind on or unaware of CPD requirements' },
                  { stat: '87%', label: 'would complete CPD on mobile if quality is right' },
                  { stat: '97.5%', label: 'open to new job opportunities' },
                  { stat: '80%', label: 'of facilities have no CPD tracking system' },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#C09D59', marginBottom: 6 }}>{item.stat}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, margin: 0 }}>
                Everything we have built since came from those answers.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-dark)' }}>
        <div className="container" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll>
          <SectionTag label="What we believe" variant="white" />
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, color: '#fff', marginTop: 16, marginBottom: 40, letterSpacing: '-0.02em' }}>
            Healthcare Works Better When the Workforce Works Better
          </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
              We believe healthcare professionals deserve tools that help them build sustainable, rewarding careers.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
              We believe healthcare organisations deserve systems that reduce administrative burden and improve workforce visibility.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', marginBottom: 32 }}>
              And we believe patients benefit when the right professionals are in the right places, with the right support, at the right time.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
              Everything we build is designed around that belief.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionTag label="The team" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Built by people who lived the problem.</h2>
          </div>
          </AnimateOnScroll>
          {team.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: team.length === 1 ? '1fr' : 'repeat(3,1fr)', gap: 24, maxWidth: team.length === 1 ? 420 : 'none', margin: team.length === 1 ? '0 auto' : '0' }}>
              {team.map((member: any, i: number) => (
                <AnimateOnScroll key={i} delay={i * 100}>
                <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                >
                  {member.photo ? (
                    <img src={urlFor(member.photo).width(400).height(400).url()} alt={member.name} style={{ width: '100%', height: 240, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: 240, background: 'var(--brand-offwhite)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={40} color="var(--brand-gray)" />
                    </div>
                  )}
                  <div style={{ padding: 24 }}>
                    <h4 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{member.name}</h4>
                    <p style={{ fontSize: 13, color: 'var(--brand-dark)', fontWeight: 600, marginBottom: 10 }}>{member.role}</p>
                    <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.6 }}>{member.bio}</p>
                  </div>
                </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <AnimateOnScroll>
            <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center', padding: '40px 48px', borderRadius: 24, border: '1px solid rgba(0,0,0,0.08)', background: 'var(--brand-offwhite)' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(16,54,19,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Users size={28} color="var(--brand-dark)" />
              </div>
              <p style={{ fontSize: 17, color: 'var(--brand-gray)', lineHeight: 1.7, fontStyle: 'italic' }}>
                "{data?.teamPlaceholder || 'We spent time inside Nigerian healthcare — as clinicians, administrators, and patients — before writing a single line of code. PSL is the platform we wished had existed.'}"
              </p>
            </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <AnimateOnScroll>
          <SectionTag label="FAQ" />
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 32 }}>Common questions.</h2>
          <FAQAccordion items={generalFAQs} />
        </AnimateOnScroll>
      </section>

      <section style={{ padding: '80px 24px', background: '#f5f5f0' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll>
            <SectionTag label="Join us" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: '#0d2810', marginBottom: 20, letterSpacing: '-0.02em' }}>Join the Movement</h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: '#4a5e4d', marginBottom: 40 }}>
              Whether you&apos;re a healthcare professional looking for better opportunities or a healthcare organisation building a stronger workforce, PSL is creating the platform designed for the future of healthcare in Nigeria.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
              <a href="/waitlist?role=professional" className="btn-primary">
                Join as a Professional
                <span className="btn-primary__icon">
                  <ArrowRight size={15} className="arrow-a" />
                  <ArrowRight size={15} className="arrow-b" />
                </span>
              </a>
              <a href="/waitlist?role=employer" className="btn-primary" style={{ background: 'transparent', color: '#113614', border: '2px solid #113614', padding: '3px 3px 3px 20px' }}>
                Join as a Healthcare Employer
                <span className="btn-primary__icon" style={{ background: '#113614', width: 33, height: 33, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowRight size={15} className="arrow-a" />
                  <ArrowRight size={15} className="arrow-b" />
                </span>
              </a>
            </div>
            <p style={{ fontSize: 15, color: '#7a8c7d', fontStyle: 'italic' }}>
              Let&apos;s build a stronger healthcare workforce together.
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
