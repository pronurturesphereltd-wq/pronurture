"use client";

/**
 * WaitlistSection.tsx — Email capture / waitlist signup
 *
 * Position: Last section before the Footer — the final conversion opportunity.
 * Purpose: Capture email signups from visitors who scrolled through the entire page
 *          (high-intent). This is the primary conversion goal for the homepage.
 *
 * Design decisions:
 * - Full-width deep green background — high visual contrast, signals importance
 * - Gold CTA button — consistent with brand, maximum visual weight
 * - Short form (email only) — per CLAUDE.md: "Keep forms short — email only for waitlist"
 * - Privacy note reduces anxiety about sharing email
 * - Compelling headline + subtext maintains messaging momentum before form
 *
 * Why 'use client'?
 * The form needs useState to manage:
 * - The email input value
 * - The submission status (idle / loading / success / error)
 * This interactivity requires a client component.
 *
 * TODO: Connect form submission to a backend API route or third-party service
 * (Mailchimp, ConvertKit, etc.) once backend is set up.
 */

import { useState, FormEvent } from "react";

const WaitlistSection = () => {
  /** Controlled input value */
  const [email, setEmail] = useState("");

  /**
   * Submission state machine:
   * idle → loading → success (or error)
   */
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  /** Error message to show when submission fails */
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
       * TODO: Replace this simulated delay with a real API call:
       * const response = await fetch('/api/waitlist', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ email }),
       * });
       */
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network request

      setStatus("success");
      setEmail(""); // Clear input on success
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden"
      aria-label="Join the ProNurture waitlist"
    >
      {/* Background decoration — same dot grid as hero for visual consistency */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Gold glow decoration — adds warmth and draws eye toward the CTA */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Section label */}
        <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-5">
          Early Access
        </p>

        {/* Main headline — strong, benefit-led, creates urgency */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Be First to Transform Your{" "}
          <span className="text-brand-gold">Healthcare Workforce.</span>
        </h2>

        {/* Supporting text — adds context and reduces friction */}
        <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Join healthcare facilities and professionals across Nigeria who are
          already on the waitlist. Early access members get priority onboarding,
          discounted rates, and direct input into the platform roadmap.
        </p>

        {/* ── Email Form ───────────────────────────────────────────────────── */}
        {status === "success" ? (
          // Success state — replace form with confirmation message
          <div
            className="
              inline-flex flex-col items-center gap-3
              bg-white/10 rounded-2xl px-10 py-8
              border border-white/20
            "
            role="status"
            aria-live="polite"
          >
            {/* Checkmark icon */}
            <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-bold text-xl">You&apos;re on the list! 🎉</p>
            <p className="text-white/70 text-base">
              We&apos;ll be in touch as soon as early access opens.
              Watch your inbox!
            </p>
          </div>
        ) : (
          // Default/error state — show the email form
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Waitlist signup form"
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            {/* Email input */}
            <div className="flex-1">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Reset error when user starts typing
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
                aria-describedby={status === "error" ? "waitlist-error" : undefined}
                aria-invalid={status === "error"}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="
                flex-shrink-0
                px-8 py-4 rounded-full
                bg-brand-gold text-brand-dark
                text-base font-bold
                cursor-pointer transition-all duration-200
                hover:bg-brand-dark hover:text-white hover:scale-105
                disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-dark
                shadow-lg shadow-brand-gold/20
              "
              aria-busy={status === "loading"}
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  {/* Loading spinner */}
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Joining...
                </span>
              ) : (
                "Join the Waitlist"
              )}
            </button>
          </form>
        )}

        {/* Error message — shown when submission fails */}
        {status === "error" && errorMessage && (
          <p
            id="waitlist-error"
            className="mt-3 text-red-400 text-sm"
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </p>
        )}

        {/* Privacy note — reduces email anxiety */}
        <p className="mt-5 text-white/40 text-xs">
          🔒 No spam, ever. Your email is only used for ProNurture early access updates.
          Unsubscribe anytime.
        </p>

        {/* Trust signals below form */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/50 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free early access
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Priority onboarding
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Early adopter pricing
          </span>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
