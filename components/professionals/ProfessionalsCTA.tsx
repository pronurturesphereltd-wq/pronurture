"use client";

/**
 * ProfessionalsCTA.tsx — Final conversion section for healthcare professionals
 *
 * Position: Last section before the site-wide Footer.
 * Purpose: Captures email from high-intent visitors who read the full page.
 *          Three trust badges address Dr. Amarachi's specific barriers
 *          (CLAUDE.md Section 3): "Free to join" (cost barrier), "Accredited CPD"
 *          (value barrier), "Verified employers only" (trust barrier).
 *
 * Design: Deep green background — consistent with WaitlistSection and EmployersCTA
 *         visual pattern for rhythm across pages. Gold CTA. Dot grid decoration.
 *
 * Why 'use client'?
 * The email form needs useState for controlled input and the
 * idle → loading → success/error state machine.
 * Pattern is identical to EmployersCTA for consistent conversion UX.
 *
 * TODO: Connect form to /api/waitlist with source: 'professionals' tag to
 *       distinguish professional signups from employer signups in the CRM.
 */

import { useState, FormEvent } from "react";

const ProfessionalsCTA = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      /**
       * TODO: Replace simulated delay with real API call:
       * await fetch('/api/waitlist', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ email, source: 'professionals' }),
       * });
       */
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const trustBadges = [
    { label: "Free to join" },
    { label: "Accredited CPD" },
    { label: "Verified employers only" },
  ];

  return (
    <section
      className="relative bg-brand-dark pt-16 pb-12 overflow-hidden"
      aria-label="Get early access to ProNurtureSphere for healthcare professionals"
    >
      {/* Dot grid decoration — consistent with WaitlistSection and EmployersCTA */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Gold glow — draws the eye toward the central CTA */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Section label */}
        <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-5">
          Get Early Access
        </p>

        {/* Headline — empowering, career-ownership tone for Dr. Amarachi */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Ready to Take Control of Your Career?
        </h2>

        {/* Supporting text — social proof + removes cost barrier in one sentence */}
        <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Join hundreds of Nigerian healthcare professionals already on ProNurtureSphere.
          Early access is free — start finding verified shifts and accredited CPD today.
        </p>

        {/* ── Email Form ───────────────────────────────────────────────────── */}
        {status === "success" ? (
          // Success state — replaces the form to prevent double-submission
          <div
            className="inline-flex flex-col items-center gap-3 bg-white/10 rounded-2xl px-10 py-8 border border-white/20"
            role="status"
            aria-live="polite"
          >
            <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center mb-2">
              <svg
                className="w-7 h-7 text-brand-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-bold text-xl">You&apos;re on the list!</p>
            <p className="text-white/70 text-base">
              We&apos;ll reach out as soon as early access opens for healthcare professionals.
            </p>
          </div>
        ) : (
          // Default / error state — email input form
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Early access signup form for healthcare professionals"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1">
              <label htmlFor="professionals-cta-email" className="sr-only">
                Your email address
              </label>
              <input
                id="professionals-cta-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Reset error state when user starts correcting their input
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email address"
                required
                disabled={status === "loading"}
                autoComplete="email"
                className={`
                  w-full px-5 py-4 rounded-full
                  bg-white/10 border text-white placeholder-white/40
                  text-base
                  focus:outline-none focus:ring-2 focus:ring-brand-gold
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200
                  ${status === "error"
                    ? "border-red-400 focus:ring-red-400"
                    : "border-white/20 hover:border-white/40"
                  }
                `}
                aria-describedby={status === "error" ? "professionals-cta-error" : undefined}
                aria-invalid={status === "error"}
              />
            </div>

            {/* Submit button — gold for maximum contrast, the primary action on this section */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="
                flex-shrink-0
                px-8 py-4 rounded-full
                bg-brand-gold text-brand-dark
                text-base font-bold
                cursor-pointer transition-all duration-200
                hover:bg-white hover:text-brand-dark hover:scale-105
                disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-dark
                shadow-lg shadow-brand-gold/20
              "
              aria-busy={status === "loading"}
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Get Early Access"
              )}
            </button>
          </form>
        )}

        {/* Inline error message */}
        {status === "error" && errorMessage && (
          <p
            id="professionals-cta-error"
            className="mt-3 text-red-400 text-sm"
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </p>
        )}

        {/* Privacy reassurance — "No spam" directly addresses the #1 email objection */}
        <p className="mt-5 text-white/40 text-xs">
          🔒 No spam, ever. Your email is only used for ProNurtureSphere early access updates.
        </p>

        {/* ── Trust Badges ─────────────────────────────────────────────────── */}
        {/* Each badge maps to a specific Dr. Amarachi barrier from CLAUDE.md Section 3 */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
          {trustBadges.map((badge) => (
            <span key={badge.label} className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-brand-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsCTA;
