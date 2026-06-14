import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Users, Briefcase, Smartphone } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { getHomepage, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'The career app Nigerian healthcare has been waiting for | PSL',
}

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

export default async function HomePage() {
  let data: any = {}
  try { data = await getHomepage() } catch {}
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
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>{data?.heroEyebrow || 'For Nigerian Healthcare Professionals & Facilities'}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
                {data?.heroHeadline || 'The career app Nigerian healthcare has been waiting for.'}
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: 20, maxWidth: 460 }}>
                {data?.heroSubheadline || 'Find clinical jobs with salary shown, track your CPD, and pick up locum shifts — or post vacancies and manage your clinical team. All in one place.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                <Link href="/waitlist?role=professional" className="btn-primary btn-primary--white">
                  {data?.heroCta1 || "I'm a healthcare professional"}
                  <span className="btn-primary__icon"><ArrowRight size={15} className="arrow-a" /><ArrowRight size={15} className="arrow-b" /></span>
                </Link>
                <Link href="/waitlist?role=employer" className="btn-text">
                  {data?.heroCta2 || 'I run a healthcare facility'} <ArrowRight size={15} />
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
        <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--brand-gray)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, opacity: 0.5 }}>
          Aligned with Nigerian professional bodies
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

      {/* AUDIENCE CARDS */}
      <section style={{ paddingTop: 48, paddingBottom: 'var(--section-padding-y)', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 32 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, padding: 36, background: '#fff' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,54,19,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Users size={22} color="var(--brand-dark)" />
              </div>
              <SectionTag label="For Healthcare Professionals" />
              <h3 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 700, marginTop: 12, marginBottom: 16, letterSpacing: '-0.02em' }}>Jobs. CPD. Locum shifts. Everything your career needs.</h3>
              {['Jobs with salary shown — every listing, always','Apply in one tap — your profile does the work','MDCN/NMCN CPD on your phone — track, learn, renew','Locum shifts at verified facilities near you','All your certificates stored and shareable'].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={17} color="var(--brand-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: 'var(--brand-gray)' }}>{item}</span>
                </div>
              ))}
              <PrimaryButton href="/waitlist?role=professional" style={{ marginTop: 24 }}>Join free</PrimaryButton>
            </div>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, padding: 36, background: 'var(--brand-offwhite)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,54,19,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Briefcase size={22} color="var(--brand-dark)" />
              </div>
              <SectionTag label="For Healthcare Facilities" />
              <h3 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 700, marginTop: 12, marginBottom: 16, letterSpacing: '-0.02em' }}>Hire faster. Stay compliant. Stop guessing.</h3>
              {["Candidates verified before they reach your inbox","CPD dashboard — see your whole team's status at a glance","Fill urgent gaps with locum professionals in hours","All staff records digital and inspection-ready","A real support contact on WhatsApp — not a helpdesk ticket"].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={17} color="var(--brand-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: 'var(--brand-gray)' }}>{item}</span>
                </div>
              ))}
              <PrimaryButton href="/waitlist?role=employer" style={{ marginTop: 24 }}>Post a vacancy free</PrimaryButton>
            </div>
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
              <div key={i} style={{ padding: '28px 24px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                <p style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: '#c09e5a', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10 }}>{s.value}</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, marginBottom: 10 }}>{s.label}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Source: {s.source}</p>
              </div>
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
              <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: 16, color: 'var(--brand-near-black)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: 20 }}>"{q.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{String.fromCharCode(65+i)}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--brand-gray)' }}>{q.attribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="How it works" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Simple. Three steps.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            {[
              { label: "If you're a healthcare professional", color: 'var(--brand-dark)', steps: [
                { n:'01', t:'Create your free profile', b:'Add your qualifications and registration number.' },
                { n:'02', t:'Browse and track', b:'Find jobs in your specialty, track your CPD, and see locum shifts near you.' },
                { n:'03', t:'Apply in one tap', b:'Study offline. Get booked. Grow.' },
              ], href: '/waitlist?role=professional', cta: 'Join as a professional' },
              { label: "If you run a healthcare facility", color: 'var(--brand-gold)', steps: [
                { n:'01', t:'Create your facility profile', b:'Takes under 15 minutes.' },
                { n:'02', t:'Post vacancies', b:'Receive applications from verified, credentialled professionals.' },
                { n:'03', t:'Manage everything in one place', b:"Your team's CPD, records, and shifts — all from one dashboard." },
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
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>{data?.closingHeadline || 'Join free today.'}</h2>
          <p style={{ fontSize: 17, color: 'var(--brand-gray)', marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>{data?.closingSubtext || 'No credit card. No commitment. Early access is open now.'}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton href="/waitlist?role=professional">I'm a healthcare professional</PrimaryButton>
            <PrimaryButton href="/waitlist?role=employer" variant="white">I run a healthcare facility</PrimaryButton>
          </div>
        </div>
      </section>

    </>
  )
}
