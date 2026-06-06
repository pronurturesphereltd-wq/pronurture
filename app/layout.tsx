/**
 * app/layout.tsx — Root Layout
 *
 * The outermost shell for every route on the site.
 * Provides:
 * - DM Sans font (ProNurtureSphere brand typography) via next/font/google
 * - Global metadata for SEO
 * - globals.css styles
 * - html/body/font wrapper — nothing else
 *
 * Navbar and Footer are NOT here. They live in app/(site)/layout.tsx,
 * which wraps only the public marketing pages. This keeps /studio and
 * /api routes clean — they inherit only this bare shell.
 */

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

/**
 * DM Sans — ProNurtureSphere's primary brand font.
 * Exposed as a CSS variable (--font-dm-sans) so globals.css can
 * reference it in --font-sans, applying it site-wide via Tailwind.
 */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  // Load Regular (400), Medium (500), and Bold (700) weights
  weight: ["400", "500", "700"],
  display: "swap", // Prevents invisible text during font load
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pronurture.vercel.app"),

  title: {
    default: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform",
    template: "%s | ProNurtureSphere",
  },
  description:
    "ProNurtureSphere is Nigeria's all-in-one healthcare workforce platform — staffing, rostering, payroll, credential verification, and CPD training.",
  keywords: [
    "healthcare staffing Nigeria",
    "locum shifts Nigeria",
    "CPD accreditation Nigeria",
    "medical workforce management",
    "hospital staffing software",
    "locum doctor platform Nigeria",
    "nursing jobs Lagos",
  ],

  openGraph: {
    type: "website",
    siteName: "ProNurtureSphere",
    title: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform",
    description:
      "ProNurtureSphere is Nigeria's all-in-one healthcare workforce platform — staffing, rostering, payroll, credential verification, and CPD training.",
    images: [
      {
        // /opengraph-image.png is served by app/opengraph-image.tsx (the Next.js
        // file convention). metadataBase resolves this to the full absolute URL
        // that social crawlers need: https://pronurture.vercel.app/opengraph-image.png
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform",
    description:
      "ProNurtureSphere is Nigeria's all-in-one healthcare workforce platform — staffing, rostering, payroll, credential verification, and CPD training.",
    images: [
      {
        // /twitter-image.png is served by app/twitter-image.tsx (re-exports
        // the same ImageResponse as opengraph-image.tsx)
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "ProNurtureSphere — Nigeria's Healthcare Workforce Platform",
      },
    ],
  },

  icons: {
    icon: "/brand-assets/Green Mono.svg",
    apple: "/brand-assets/Green Mono.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* Apply DM Sans CSS variable to the entire document tree */
      className={`${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
