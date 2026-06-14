'use client'
import { useSearchParams } from 'next/navigation'
import WaitlistForm from '@/components/waitlist/WaitlistForm'

export default function WaitlistFormWrapper() {
  const params = useSearchParams()
  const role = (params.get('role') as 'professional' | 'employer') || 'professional'
  return <WaitlistForm defaultRole={role} />
}
