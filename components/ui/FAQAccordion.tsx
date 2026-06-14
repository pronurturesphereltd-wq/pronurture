'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem { question: string; answer: string }

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', gap: 16,
              textAlign: 'left',
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 17, color: 'var(--brand-near-black)', fontFamily: 'var(--font-primary)', lineHeight: 1.4 }}>
              {item.question}
            </span>
            <span style={{
              width: 28, height: 28, borderRadius: '1000px',
              background: open === i ? 'var(--brand-dark)' : 'rgba(16,54,19,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              transition: 'background 0.2s ease',
            }}>
              {open === i
                ? <Minus size={13} color="#fff" />
                : <Plus size={13} color="var(--brand-dark)" />
              }
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ paddingBottom: 22, color: 'var(--brand-gray)', fontSize: 16, lineHeight: 1.7 }}>
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
