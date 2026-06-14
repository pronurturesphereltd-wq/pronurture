import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { getBlogPost, getBlogSlugs, urlFor } from '@/lib/sanity'

export async function generateStaticParams() {
  try {
    const slugs = await getBlogSlugs()
    return slugs.map((s: any) => ({ slug: s.slug }))
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug)
    if (!post) return { title: 'Post not found | PSL' }
    return { title: `${post.title} | PSL`, description: post.excerpt }
  } catch { return { title: 'PSL Blog' } }
}

const ptComponents = {
  block: {
    h2: ({ children }: any) => <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, margin: '2rem 0 1rem', letterSpacing: '-0.02em' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 700, margin: '1.5rem 0 0.75rem' }}>{children}</h3>,
    blockquote: ({ children }: any) => <blockquote style={{ borderLeft: '3px solid var(--brand-gold)', paddingLeft: '1.25rem', fontStyle: 'italic', color: 'var(--brand-gray)', margin: '1.5rem 0' }}>{children}</blockquote>,
    normal: ({ children }: any) => <p style={{ marginBottom: '1.25rem', lineHeight: 1.75, fontSize: 17 }}>{children}</p>,
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ fontWeight: 700 }}>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => <a href={value?.href} style={{ color: 'var(--brand-dark)', textDecoration: 'underline' }}>{children}</a>,
  },
  types: {
    image: ({ value }: any) => (
      <figure style={{ margin: '2rem 0' }}>
        <img src={urlFor(value).width(800).url()} alt={value.alt || ''} style={{ width: '100%', borderRadius: 16 }} />
      </figure>
    ),
  },
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any
  try { post = await getBlogPost(params.slug) } catch {}
  if (!post) notFound()

  return (
    <article>
      <div style={{ background: 'var(--brand-offwhite)', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--brand-gray)', textDecoration: 'none', marginBottom: 28, fontWeight: 500 }}>
            <ArrowLeft size={14} /> Back to blog
          </Link>
          {post.category && (
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--brand-dark)', background: 'rgba(16,54,19,0.08)', padding: '4px 12px', borderRadius: 100, display: 'inline-block', marginBottom: 20 }}>{post.category}</span>
          )}
          <h1 style={{ fontSize: 'clamp(28px,4.5vw,46px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 20 }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {post.author && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--brand-gray)' }}><User size={14} /> {post.author}</div>}
            {post.publishedAt && <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--brand-gray)' }}><Calendar size={14} />{new Date(post.publishedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</div>}
          </div>
        </div>
      </div>
      {post.mainImage && (
        <div className="container" style={{ maxWidth: 780, padding: '32px 25px 0' }}>
          <img src={urlFor(post.mainImage).width(1200).height(630).url()} alt={post.title} style={{ width: '100%', borderRadius: 20, objectFit: 'cover', maxHeight: 420 }} />
        </div>
      )}
      <div className="container" style={{ maxWidth: 780, padding: '40px 25px 80px' }}>
        {post.body ? (
          <PortableText value={post.body} components={ptComponents} />
        ) : (
          <p style={{ color: 'var(--brand-gray)', fontSize: 16, fontStyle: 'italic' }}>No content yet — add body text via Sanity Studio.</p>
        )}
      </div>
    </article>
  )
}
