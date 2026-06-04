/**
 * app/layout.tsx — Root Layout
 *
 * This is the outermost shell for every page on the site.
 * It provides:
 * - DM Sans font (ProNurtureSphere brand typography) via next/font/google
 * - Global metadata for SEO
 * - Navbar (top of every page)
 * - Footer (bottom of every page)
 * - globals.css styles
 *
 * The Navbar is transparent over the hero then turns white on scroll.
 * The {children} slot renders the page-specific content between them.
 */

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * DM Sans — ProNurtureSphere's primary brand font.
 * We expose it as a CSS variable (--font-dm-sans) so globals.css can
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
  title: "ProNurtureSphere — Smarter Healthcare Workforce Management in Nigeria",
  description:
    "ProNurtureSphere Limited is Nigeria's digital platform for healthcare staffing, rostering, credential verification, payroll, and CPD training. Built for hospitals, clinics, and healthcare professionals.",
  keywords: [
    "healthcare staffing Nigeria",
    "locum doctor platform Nigeria",
    "hospital staffing software",
    "medical payroll software Nigeria",
    "CPD accreditation Nigeria",
    "nursing jobs Lagos",
  ],
  openGraph: {
    title: "ProNurtureSphere — Smarter Healthcare Workforce Management",
    description:
      "Nigeria's all-in-one platform for digital staffing, rostering, payroll, and CPD management.",
    type: "website",
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
        {/* Sticky Navbar — transparent over hero, white on scroll */}
        <Navbar />

        {/* Page content — flex-1 pushes Footer to the bottom */}
        <main className="flex-1">{children}</main>

        {/* Site-wide Footer */}
        <Footer />
      </body>
    </html>
  );
}
