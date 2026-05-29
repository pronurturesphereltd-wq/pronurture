/**
 * Footer.tsx — Site-wide footer
 *
 * Design decisions:
 * - Deep green (#103613) background communicates brand authority and provides
 *   a strong visual closure to every page
 * - White Mono logo maintains brand identity on the dark background
 * - Three link columns (Platform, Company, Resources) for structured navigation
 * - Social links for brand visibility (LinkedIn, Twitter/X)
 * - Copyright line with legal entity name
 *
 * This is a Server Component — no interactivity needed, renders at build time.
 */

import Link from "next/link";
import Image from "next/image";

/** Footer navigation columns — structured for UX clarity */
const footerColumns = [
  {
    heading: "Platform",
    links: [
      { label: "For Healthcare Employers", href: "/employers" },
      { label: "For Healthcare Professionals", href: "/professionals" },
      { label: "Shift Management", href: "/employers#shifts" },
      { label: "Credential Verification", href: "/employers#verification" },
      { label: "CPD Training", href: "/professionals#cpd" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About ProNurture", href: "/about" },
      { label: "Blog & Resources", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Join the Waitlist", href: "/waitlist" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Healthcare Staffing Guide", href: "/blog" },
      { label: "CPD for Nigerian Clinicians", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/** Social media links — LinkedIn is primary for B2B healthcare audience */
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/pronurture",
    // LinkedIn icon SVG
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/pronurture",
    // X / Twitter icon SVG
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-brand-dark text-white"
      aria-label="Site footer"
    >
      {/* ── Main Footer Content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Brand Column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            {/* White Mono logo — correct for dark green background */}
            <Link href="/" aria-label="ProNurture home">
              <div className="relative h-8 w-40 mb-6">
                <Image
                  src="/brand-assets/White Mono.svg"
                  alt="ProNurture by Sphere Limited"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Nigeria&apos;s digital platform for healthcare workforce management.
              Staffing, rostering, payroll, and CPD in one place.
            </p>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow ProNurture on ${social.label}`}
                  className="
                    text-white/60 hover:text-brand-gold
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-brand-gold rounded
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation Columns ──────────────────────────────────────── */}
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        text-white/60 text-sm
                        hover:text-brand-gold
                        transition-colors duration-200
                        focus:outline-none focus:underline
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────────────── */}
      {/* Subtle separator and copyright line */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-sm text-center sm:text-left">
              © 2026 ProNurture Sphere Limited. All rights reserved.
            </p>
            <p className="text-white/40 text-xs text-center sm:text-right">
              Empowering Nigerian Healthcare Workforce
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
