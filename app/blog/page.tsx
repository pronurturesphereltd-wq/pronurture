import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import SectionTag from '@/components/ui/SectionTag'
import { getBlogPosts, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Resources & Insights | PSL',
  description: 'Practical guides and research for Nigerian clinical professionals and healthcare facilities.',
}

const SUGGESTED = [
  { title: 'How to Track Your NMCN CPD Points in 2026', for: 'For Professionals', why: "Highest intent search — 22.5% don't know their requirements" },
  { title: 'What Nigerian Clinical Professionals Actually Want From Their Next Employer', for: 'For Everyone', why: 'Turns PSL survey into a public asset' },
  { title: 'MDCN vs NMCN: What Every Professional Needs to Know', for: 'For Professionals', why: 'Top SEO target — demystifies the CPD landscape' },
  { title: 'Why Nigerian Private Hospitals Take 6 Months to Fill a Vacancy', for: 'For Employers', why: 'Uses PSL employer survey data' },
  { title: 'The Real Cost of an Unverified Clinical Hire', for: 'For Employers', why: 'Makes the case for verification' },
  { title: '57,000 Nigerian Nurses Left in 5 Years. What the Ones Who Stayed Are Saying.', for: 'For Everyone', why: 'High shareability, mission-driven' },
]

export default async function BlogPage() {
  let posts: any[] = []
  try { posts = await getBlogPosts() } catch {}

  return (
    <>
      <section style={{ padding: '56px 0 48px', background: 'var(--brand-offwhite)' }}>
        <div className="container">
          <SectionTag label="Resources & Insights" />
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: 20, marginBottom: 16 }}>Practical guides for Nigerian healthcare.</h1>
          <p style={{ fontSize: 17, color: 'var(--brand-gray)', maxWidth: 540 }}>For clinical professionals and the facilities that employ them.</p>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding-y) 0' }}>
        <div className="container">
          {posts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
              {posts.map((post: any) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                    {post.mainImage ? (
                      <img src={urlFor(post.mainImage).width(600).height(320).url()} alt={post.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: 200, background: 'linear-gradient(135deg,#103613,#1a4d1e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>No image</span>
                      </div>
                    )}
                    <div style={{ padding: 24 }}>
                      {post.category && (
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-dark)', background: 'rgba(16,54,19,0.07)', padding: '4px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 12 }}>{post.category}</span>
                      )}
                      <h2 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.01em', marginBottom: 10 }}>{post.title}</h2>
                      {post.excerpt && <p style={{ fontSize: 14, color: 'var(--brand-gray)', lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</p>}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {post.publishedAt && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--brand-gray)' }}>
                            <Calendar size={13} />
                            {new Date(post.publishedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        )}
                        <span style={{ fontSize: 13, color: 'var(--brand-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Read more <ArrowRight size={13} /></span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center', padding: '48px 24px', marginBottom: 56, borderRadius: 20, background: 'var(--brand-offwhite)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>No posts yet — first articles coming soon.</h3>
                <p style={{ fontSize: 15, color: 'var(--brand-gray)' }}>Add blog posts via Sanity Studio at <code style={{ fontSize: 13, background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4 }}>/studio</code></p>
              </div>
              <SectionTag label="Coming soon" />
              <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, marginTop: 16, marginBottom: 32, letterSpacing: '-0.02em' }}>The 6 articles launching first.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {SUGGESTED.map((a, i) => (
                  <div key={i} style={{ padding: '24px', borderRadius: 18, border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--brand-dark)', background: 'rgba(16,54,19,0.07)', padding: '3px 8px', borderRadius: 100, display: 'inline-block', marginBottom: 12 }}>{a.for}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45, marginBottom: 10 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--brand-gray)', lineHeight: 1.5 }}>{a.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    </>
  )
}
