/**
 * ArticleBody.tsx — Portable Text renderer for individual blog post pages
 *
 * Renders the Sanity `body` field (Portable Text) using PortableText from
 * next-sanity. Custom block components reproduce the typographic style of the
 * original hardcoded layout:
 *   - normal: text-lg leading-relaxed text-gray-700
 *   - h2: text-2xl/3xl font-bold text-brand-dark, spaced above and below
 *   - h3: text-xl font-bold text-brand-dark, lighter spacing
 *
 * Column width: max-w-3xl mx-auto — ~65 chars per line for optimal readability.
 * Background: white for high-contrast reading comfort.
 *
 * The `value` cast is safe: the body comes directly from Sanity's GROQ query
 * which always returns properly structured Portable Text blocks.
 */

import { PortableText } from 'next-sanity'
import type { ComponentProps } from 'react'

type PortableTextValue = ComponentProps<typeof PortableText>['value']
type PortableTextComponents = ComponentProps<typeof PortableText>['components']

interface ArticleBodyProps {
  body: unknown[]
}

/** Portable Text block renderers — styled to match the original design */
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-5">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="
        text-2xl md:text-3xl font-bold
        text-brand-dark leading-snug
        mt-12 mb-5
      ">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="
        text-xl md:text-2xl font-bold
        text-brand-dark leading-snug
        mt-8 mb-4
      ">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="
        my-10 pl-6
        border-l-4 border-brand-gold
        bg-brand-light
        rounded-r-xl
        py-5 pr-5
      ">
        <p className="text-lg md:text-xl font-semibold text-brand-dark leading-snug italic">
          {children}
        </p>
      </blockquote>
    ),
  },
}

const ArticleBody = ({ body }: ArticleBodyProps) => {
  return (
    <section
      className="bg-white py-14 lg:py-20"
      aria-label="Article content"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortableText
          value={body as PortableTextValue}
          components={portableTextComponents}
        />
      </div>
    </section>
  )
}

export default ArticleBody
