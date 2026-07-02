'use client'
import { useState, useEffect } from 'react'
import { CheckCircle2, Users } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import PrimaryButton from '@/components/ui/PrimaryButton'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { getAboutPage, urlFor } from '@/lib/sanity'
import FAQAccordion from '@/components/ui/FAQAccordion'

const defaultValues = [
  { headline: 'Salary should always be shown.', body: 'No clinical professional should waste time applying for a role without knowing the pay. Every job on PSL shows the salary range before you spend a minute on the application.' },
  { headline: 'Clinical professionals deserve career tools built for them.', body: 'Not tools designed for office workers, adapted for healthcare. PSL was built from scratch for nurses, doctors, pharmacists, and every registered clinical professional in Nigeria.' },
  { headline: 'Trust is earned with specifics, not promises.', body: 'We show our research. We cite our sources. Every employer gets a named contact they can call on WhatsApp — not a helpdesk ticket. Every candidate is verified before they reach your inbox.' },
  { headline: 'PSL is a launchpad, not just a listing site.', body: 'We are building something that helps Nigerian healthcare professionals grow — not just move between jobs. CPD on your phone. Credentials in one place. A career, not just a gig.' },
]

const defaultSurveyStats = [
  '52.5% have taken a job that turned out different from its listing',
  "62.5% are behind on or don't know their CPD requirements",
  '87% would complete CPD entirely on mobile if quality is right',
  '97.5% are open to new job opportunities',
  '80% of facilities have no system for tracking staff CPD',
]

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

  const surveyStats = data?.surveyStats?.length ? data.surveyStats : defaultSurveyStats
  const values = data?.values?.length ? data.values : defaultValues
  const team = data?.team || []

  return (
    <>
      <section style={{ padding: '72px 0', background: 'var(--brand-offwhite)' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <AnimateOnScroll>
          <SectionTag label="Our story" />
          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 20 }}>
            {typeof data?.heroHeadline === 'string' ? data.heroHeadline : 'We built PSL because the system was failing the people running it.'}
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.7, color: 'var(--brand-gray)', maxWidth: 720, margin: '24px auto 0' }}>
            ProNurtureSphere Limited exists at the intersection of education, technology, and healthcare delivery — nurturing, equipping, deploying, managing, and sustaining competent healthcare professionals across Nigeria and beyond.
          </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <AnimateOnScroll>
          <SectionTag label="Our Mission" />
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, marginBottom: 32, letterSpacing: '-0.02em' }}>Built to fix the workforce crisis.</h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--brand-gray)' }}>ProNurtureSphere exists to solve Nigeria's healthcare workforce crisis — not with more paperwork, but with better infrastructure. We build the systems that connect the right professionals to the right facilities, at the right time — and the tools that keep them scheduled, compliant, and performing once they are there.</p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--brand-gray)' }}>We believe every Nigerian deserves safe, well-staffed healthcare. That starts with giving healthcare workers the tools to practise sustainably — verified profiles, CPD tracking, learning paths, and career support — and giving healthcare facilities the confidence to build compliant, capable teams through workforce management tools that actually work in the Nigerian context.</p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--brand-gray)' }}>We are building the workforce layer that Nigerian healthcare has always needed.</p>
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="How we work" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>The professional lifecycle, end to end.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {[
              { n: '01', t: 'Training', b: 'Accredited CPD courses and role-based learning paths that build clinical competency from day one.' },
              { n: '02', t: 'Mentorship', b: 'Structured guidance and peer support that helps professionals grow within their specialty.' },
              { n: '03', t: 'Deployment', b: 'Verified job placements and locum shifts matched to the right facility, at the right time.' },
              { n: '04', t: 'Leadership', b: 'Tools and pathways that help experienced professionals move into senior and management roles.' },
            ].map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 100}>
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
          <AnimateOnScroll delay={200}><div style={{ maxWidth: 680, margin: '40px auto 0', textAlign: 'center' }}>
            <p style={{ fontSize: 16, color: 'var(--brand-gray)', lineHeight: 1.75, marginBottom: 16 }}>This is not a job board. It is a career infrastructure — built to support every stage of a clinical professional's working life.</p>
            <p style={{ fontSize: 16, color: 'var(--brand-gray)', lineHeight: 1.75 }}>Underpinned by PSL's workforce management tools — staff registry, shift scheduling, attendance, compliance tracking, and analytics — that keep operations running at every stage.</p>
          </div></AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <AnimateOnScroll><div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="What we do" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, marginTop: 16, letterSpacing: '-0.02em' }}>Six arms. One mission.</h2>
          </div></AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { title: 'PSL Workforce Solutions', body: 'Verified healthcare staffing and workforce management for hospitals and clinics across Nigeria — locum placements, permanent recruitment, shift scheduling, attendance tracking, staffing forecasts, staff registry, and workforce analytics.' },
              { title: 'PSL Academy', body: 'Accredited CPD training and continuing education for Nigerian healthcare professionals — online, mobile-first, and recognised by NMCN and MDCN.' },
              { title: 'PSL Mentorship', body: 'Structured mentorship programmes connecting early-career professionals with experienced clinical leaders across Nigeria.' },
              { title: 'PSL Research', body: 'Evidence-based workforce data and research on the Nigerian healthcare labour market — informing policy, planning, and practice.' },
              { title: 'PSL Foundation', body: 'Scholarships, grants, and support programmes for underserved healthcare professionals and communities across Nigeria.' },
              { title: 'PSL Diaspora', body: 'Supporting Nigerian healthcare professionals abroad — CPD tracking, registration support, and pathways back to practice in Nigeria.' },
            ].map((card, i) => (
              <AnimateOnScroll key={i} delay={i * 80}>
              <div style={{ padding: 24, borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', background: '#fff', height: '100%', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
              >
                <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: 'var(--brand-dark)', letterSpacing: '-0.01em' }}>{card.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.65 }}>{card.body}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <AnimateOnScroll>
            <div>
              <SectionTag label="The founding story" />
              <div style={{ marginTop: 24, fontSize: 17, color: 'var(--brand-gray)', lineHeight: 1.75 }}>
                {(typeof data?.story === 'string' ? data.story : "Nurses applying through WhatsApp groups and hearing nothing back. Doctors taking jobs where the salary was never shown. Midwives falling behind on CPD because tracking it was too complicated. Medical Directors spending months filling one vacancy through walk-ins.\n\nThese are not rare situations. They are the daily reality for Nigerian healthcare professionals and the facilities that employ them.\n\nProNurtureSphere was founded to close that gap. We started with a simple question: what would Nigerian healthcare look like if staffing, scheduling, credentialing, compliance, payroll, and CPD all worked together — seamlessly, compliantly, and fairly? That question became our product. Today we are building the workforce layer that connects every part of the Nigerian healthcare ecosystem — one verified professional at a time.").split('\n\n').map((para: string, i: number) => (
                  <p key={i} style={{ marginBottom: 20 }}>{para}</p>
                ))}
              </div>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150}>
            <div>
              <SectionTag label="What we found" />
              <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 20, marginBottom: 8, letterSpacing: '-0.01em' }}>Before building anything, we asked.</h3>
              <p style={{ fontSize: 15, color: 'var(--brand-gray)', marginBottom: 24, lineHeight: 1.65 }}>
                In May 2026, we surveyed 40 clinical professionals and 5 healthcare facility managers across 13 Nigerian states. Here is what they told us:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {surveyStats.map((s: string, i: number) => (
                  <AnimateOnScroll key={i} delay={i * 80}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="var(--brand-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 15, color: 'var(--brand-near-black)', lineHeight: 1.55 }}>{s}</p>
                  </div>
                  </AnimateOnScroll>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--brand-gray)', marginTop: 20, opacity: 0.7 }}>
                {data?.surveySource || 'Source: PSL Clinical Workforce Survey, May 2026'}
              </p>
              <p style={{ fontSize: 15, color: 'var(--brand-gray)', marginTop: 20, lineHeight: 1.65, fontStyle: 'italic' }}>
                Everything we have built since came from those answers.
              </p>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-dark)' }}>
        <div className="container">
          <AnimateOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionTag label="What we believe" variant="white" />
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, color: '#fff', marginTop: 16, letterSpacing: '-0.02em' }}>
              Four things we will never compromise on.
            </h2>
          </div>
          </AnimateOnScroll>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {values.map((v: any, i: number) => (
              <AnimateOnScroll key={i} delay={i * 100}>
              <div style={{ padding: '32px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', height: '100%' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--brand-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>0{i+1}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>{v.headline}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>{v.body}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
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

      <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--brand-offwhite)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimateOnScroll>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 36 }}>Join PSL from day one.</h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryButton href="/waitlist?role=professional">I am a healthcare professional — join free</PrimaryButton>
            <PrimaryButton href="/waitlist?role=employer" variant="white">I manage a clinical team — post a vacancy</PrimaryButton>
          </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
