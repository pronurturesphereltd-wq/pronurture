'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL!

export default function ContactFormInteractive() {
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', role: 'Professional', message: '' })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitting')
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({ ...form, type: 'contact', submittedAt: new Date().toISOString() }),
      })
      setState('done')
    } catch { setState('error') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)',
    fontSize: 15, fontFamily: 'var(--font-primary)', color: 'var(--brand-near-black)', background: '#fff',
    outline: 'none', marginBottom: 16,
  }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--brand-near-black)', marginBottom: 6 }

  if (state === 'done') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <CheckCircle2 size={40} color="var(--brand-dark)" style={{ margin: '0 auto 16px', display: 'block' }} />
      <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Message sent.</h3>
      <p style={{ fontSize: 15, color: 'var(--brand-gray)' }}>We'll be back to you within 2 hours on WhatsApp, 24 hours on email.</p>
    </div>
  )

  return (
    <form onSubmit={submit} noValidate>
      <div>
        <label style={labelStyle}>Name *</label>
        <input required value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} placeholder="Your name" />
      </div>
      <div>
        <label style={labelStyle}>Email *</label>
        <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} placeholder="you@example.com" />
      </div>
      <div>
        <label style={labelStyle}>I am a</label>
        <select value={form.role} onChange={e => set('role', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
          {['Professional','Employer','Press','Partnership','Other'].map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Message *</label>
        <textarea required value={form.message} onChange={e => set('message', e.target.value)} style={{ ...inputStyle, minHeight: 120, resize: 'vertical', marginBottom: 24 }} placeholder="What would you like to know?" />
      </div>
      {state === 'error' && <p style={{ fontSize: 13, color: '#c0392b', marginBottom: 16 }}>Something went wrong. Try emailing us directly.</p>}
      <button type="submit" disabled={state === 'submitting'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 20px 14px 24px', fontSize: 15, opacity: state === 'submitting' ? 0.7 : 1 }}>
        {state === 'submitting'
          ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
          : <>Send message <span className="btn-primary__icon"><ArrowRight size={15} className="arrow-a" /><ArrowRight size={15} className="arrow-b" /></span></>
        }
      </button>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </form>
  )
}
