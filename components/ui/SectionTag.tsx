type Variant = 'green' | 'white' | 'gold'

export default function SectionTag({ label, variant = 'green' }: { label: string; variant?: Variant }) {
  return (
    <div className={`section-tag section-tag--${variant}`}>
      <div className="section-tag__dot" />
      <span>{label}</span>
    </div>
  )
}
