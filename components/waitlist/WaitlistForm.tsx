'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

type Role = 'professional' | 'employer'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: Role
  discipline?: string
  disciplineOther?: string
  facilityName?: string
  state: string
  hearAbout?: string
}

const DISCIPLINES = [
  'Registered Nurse', 'Nurse-Midwife', 'Doctor', 'Pharmacist',
  'Physiotherapist', 'Medical Laboratory Scientist', 'Radiographer',
  'CHEW', 'Allied Health Professional', 'Other',
]

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
]

const WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL!

export default function WaitlistForm({ defaultRole }: { defaultRole?: Role }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: { role: defaultRole || 'professional' },
  })

  const { role, discipline } = watch()

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError('')
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'psl-website',
        }),
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us at uwa@pronurture.com.ng')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,54,19,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={32} color="var(--brand-dark)" />
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 700, color: 'var(--brand-near-black)', marginBottom: 12, letterSpacing: '-0.02em' }}>
          You're on the list.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--brand-gray)', maxWidth: 400, margin: '0 auto', lineHeight: 1.55 }}>
          We just sent your confirmation email — check your inbox now. Don't see it? Check spam and mark it "not spam" so you don't miss updates. WhatsApp us anytime with questions.
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)',
    fontSize: 16, fontFamily: 'var(--font-primary)', color: 'var(--brand-near-black)',
    background: '#fff', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--brand-near-black)', marginBottom: 6,
  }
  const errorStyle: React.CSSProperties = { fontSize: 12, color: '#c0392b', marginTop: 4 }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>I am a</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {(['professional', 'employer'] as Role[]).map((r) => (
            <label key={r} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
              border: `1.5px solid ${role === r ? 'var(--brand-dark)' : 'rgba(0,0,0,0.12)'}`,
              background: role === r ? 'rgba(16,54,19,0.06)' : '#fff',
              fontSize: 15, fontWeight: role === r ? 600 : 400,
              color: role === r ? 'var(--brand-dark)' : 'var(--brand-gray)',
              transition: 'all 0.15s ease',
            }}>
              <input type="radio" value={r} {...register('role')} style={{ display: 'none' }} />
              {r === 'professional' ? 'Healthcare Professional' : 'Healthcare Facility'}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>First name *</label>
          <input {...register('firstName', { required: 'Required' })} style={inputStyle} placeholder="Ada" />
          {errors.firstName && <p style={errorStyle}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label style={labelStyle}>Last name *</label>
          <input {...register('lastName', { required: 'Required' })} style={inputStyle} placeholder="Okafor" />
          {errors.lastName && <p style={errorStyle}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Email address *</label>
        <input {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' } })} type="email" style={inputStyle} placeholder="ada@hospital.ng" />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Phone number (WhatsApp preferred)</label>
        <input {...register('phone')} type="tel" style={inputStyle} placeholder="+234 800 000 0000" />
      </div>

      {role === 'professional' && (
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Discipline *</label>
          <select {...register('discipline', { required: role === 'professional' ? 'Required' : false })} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Select your discipline</option>
            {DISCIPLINES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.discipline && <p style={errorStyle}>{errors.discipline.message}</p>}
          {discipline === 'Other' && (
            <div style={{ marginTop: 12 }}>
              <input
                {...register('disciplineOther', { required: discipline === 'Other' ? 'Please specify your discipline' : false })}
                placeholder="Please specify your discipline"
                style={inputStyle}
              />
              {errors.disciplineOther && <p style={errorStyle}>{errors.disciplineOther.message}</p>}
            </div>
          )}
        </div>
      )}

      {role === 'employer' && (
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Facility name *</label>
          <input {...register('facilityName', { required: role === 'employer' ? 'Required' : false })} style={inputStyle} placeholder="Lagos Island General Hospital" />
          {errors.facilityName && <p style={errorStyle}>{errors.facilityName.message}</p>}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>State *</label>
        <select {...register('state', { required: 'Required' })} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Select your state</option>
          {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.state && <p style={errorStyle}>{errors.state.message}</p>}
      </div>

      <div style={{ marginBottom: 28 }}>
        <label style={labelStyle}>How did you hear about PSL?</label>
        <select {...register('hearAbout')} style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Select an option</option>
          {['WhatsApp','Twitter / X','LinkedIn','A colleague','Google','Other'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(192,0,0,0.06)', border: '1px solid rgba(192,0,0,0.15)', marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: '#c0392b' }}>{error}</p>
        </div>
      )}

      <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 20px 14px 24px', fontSize: 16, opacity: submitting ? 0.7 : 1 }}>
        {submitting ? (
          <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Joining waitlist...</>
        ) : (
          <>
            {role === 'professional' ? 'Create my free profile' : 'Post my first vacancy free'}
            <span className="btn-primary__icon">
              <ArrowRight size={15} className="arrow-a" />
              <ArrowRight size={15} className="arrow-b" />
            </span>
          </>
        )}
      </button>

      <p style={{ fontSize: 13, color: 'var(--brand-gray)', textAlign: 'center', marginTop: 14 }}>
        No spam. No credit card. We'll contact you before launch.
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  )
}
