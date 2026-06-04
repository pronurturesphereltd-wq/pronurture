"use client";

/**
 * Navbar.tsx — Site-wide sticky navigation bar
 *
 * Behaviour:
 * - Fixed at the top of the viewport on all pages
 * - ALWAYS white background with Full Color logo
 * - Mobile: shows a hamburger icon that toggles a full-width dropdown menu
 * - "Get Early Access" CTA button uses brand-gold for high contrast
 *
 * Why 'use client'?
 * This component needs React state (mobileOpen) and a resize event listener
 * to auto-close the mobile menu — server components can't do this.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/** Navigation links shared between desktop and mobile menus */
const navLinks = [
  { label: "Home", href: "/" },
  { label: "For Employers", href: "/employers" },
  { label: "For Professionals", href: "/professionals" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  /**
   * mobileOpen: controls the hamburger/mobile menu visibility.
   * Toggled by the hamburger button on small screens.
   */
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when the viewport resizes to desktop (avoids stuck state)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white shadow-sm border-b border-gray-100
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3" aria-label="ProNurtureSphere home">
            {/* Always show Full Color Logo on white navbar background */}
            <div className="relative h-8 w-10">
              <Image
                src="/brand-assets/Full Color Logo.svg"
                alt="ProNurtureSphere by Sphere Limited"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <span className="text-brand-dark font-bold text-lg">ProNurtureSphere</span>
          </Link>

          {/* ── Desktop Navigation Links ──────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-sm font-medium text-brand-dark
                  transition-colors duration-200
                  hover:text-brand-green
                "
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTA Button ────────────────────────────────────────── */}
          <div className="hidden lg:block">
            <Link
              href="/waitlist"
              className="
                inline-flex items-center justify-center
                px-5 py-2.5 rounded-full
                bg-brand-gold text-brand-dark
                text-sm font-bold
                cursor-pointer transition-all duration-200
                hover:bg-brand-dark hover:text-white hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2
              "
            >
              Get Early Access
            </Link>
          </div>

          {/* ── Mobile Hamburger Button ───────────────────────────────────── */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            {/* Hamburger → X icon transition — always dark on white navbar */}
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-brand-dark rounded-full transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-brand-dark rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-brand-dark rounded-full transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ────────────────────────────────────────────── */}
      {/*
       * Slides down from the Navbar when mobileOpen is true.
       * White background keeps links readable on any page.
       */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden bg-white shadow-lg border-t border-gray-100
          overflow-hidden transition-all duration-300 ease-in-out
          ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 pb-6 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)} // Close menu on navigation
              className="
                block px-3 py-3 rounded-lg
                text-brand-dark text-base font-medium
                hover:bg-brand-light hover:text-brand-green
                transition-colors duration-150
              "
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA — full width for easy tap target */}
          <Link
            href="/waitlist"
            onClick={() => setMobileOpen(false)}
            className="
              mt-3 flex items-center justify-center
              px-5 py-3 rounded-full
              bg-brand-gold text-brand-dark
              text-base font-bold text-center
              cursor-pointer transition-all duration-200
              hover:bg-brand-dark hover:text-white hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-brand-gold
            "
          >
            Get Early Access
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
