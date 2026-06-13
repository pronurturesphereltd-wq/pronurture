/**
 * SectionTag.tsx — Eyebrow label above section headings
 *
 * Stratex-style: small coloured dot + label text, no background pill.
 * Orients the reader before the H2 heading in every section.
 *
 * @param label   — the text to display
 * @param variant — controls dot + text color: 'green' (default) | 'white' | 'gold'
 */

interface SectionTagProps {
  label: string
  variant?: 'green' | 'white' | 'gold'
}

const DOT_COLOR: Record<NonNullable<SectionTagProps['variant']>, string> = {
  green: '#103613',
  white: '#ffffff',
  gold:  '#c09e5a',
}

const TEXT_CLASS: Record<NonNullable<SectionTagProps['variant']>, string> = {
  green: 'text-brand-dark',
  white: 'text-white',
  gold:  'text-brand-gold',
}

const SectionTag = ({ label, variant = 'green' }: SectionTagProps) => (
  <div className="flex items-center gap-2">
    {/* Coloured dot — inline style for custom pixel-perfect color */}
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '1000px',
        backgroundColor: DOT_COLOR[variant],
        flexShrink: 0,
      }}
    />
    <span
      className={`font-medium ${TEXT_CLASS[variant]}`}
      style={{ fontSize: 'var(--text-sm)', letterSpacing: 0 }}
    >
      {label}
    </span>
  </div>
)

export default SectionTag
