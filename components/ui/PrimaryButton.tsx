import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'white'
  style?: React.CSSProperties
}

export default function PrimaryButton({ href, children, variant = 'dark', style }: Props) {
  return (
    <Link href={href} className={`btn-primary${variant === 'white' ? ' btn-primary--white' : ''}`} style={style}>
      {children}
      <span className="btn-primary__icon">
        <ArrowRight size={15} className="arrow-a" />
        <ArrowRight size={15} className="arrow-b" />
      </span>
    </Link>
  )
}
