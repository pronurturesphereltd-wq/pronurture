/**
 * BlogNewsletterCTA.tsx — Newsletter subscription section at the bottom of the blog page
 *
 * Purpose: Captures emails from blog readers who aren't yet ready to join the waitlist
 * but want to stay informed. Content-led visitors are warm leads — the newsletter is
 * a lower-commitment first step before the platform signup.
 *
 * Design: Deep green background — consistent with all CTA sections site-wide
 * (WaitlistSection, EmployersCTA, ProfessionalsCTA, AboutCTA).
 *
 * 'use client' — required because this component manages email input state and
 * form submission logic (controlled input + status state machine).
 *
 * State machine:
 *   idle → (submit) → loading → success
 *                             ↘ error → (user types) → idle
 *
 * TODO: Replace the simulated API delay with a real fetch to /api/newsletter
 *       (or reuse /api/waitlist with a source: 'newsletter' tag).
 */

"use client";

import { useState } from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const BlogNewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation — check for a plausible email before hitting the API
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // TODO: Replace with real API call
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, source: 'blog' }),
      // });
      // if (!response.ok) throw new Error('Subscription failed');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  // Reset to idle when user starts typing after an error
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#103613" }}
      aria-label="Newsletter subscription"
    >
      {/* Dot grid texture — matches the deep-green decorative pattern used site-wide */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Gold glow — bottom-right accent consistent with other dark sections */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold opacity-10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Eyebrow label */}
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-4">
          Stay Informed
        </p>

        {/* H2 — section heading */}
        <h2 className="
          text-3xl sm:text-4xl font-bold
          text-white leading-tight
          mb-4
        ">
          Never Miss an Insight.
        </h2>

        {/* Supporting copy — names the value exchange clearly */}
        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Get the latest healthcare workforce guides and analysis delivered
          to your inbox.
        </p>

        {/* ── Subscription Form ──────────────────────────────────────────── */}
        {status === "success" ? (
          /* Success state — replaces form to prevent double-submission */
          <div
            className="flex flex-col items-center gap-3 py-6"
            role="alert"
            aria-live="polite"
          >
            {/* Gold checkmark circle */}
            <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center mb-2">
              <svg
                className="w-7 h-7 text-brand-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-white font-bold text-xl">You&apos;re subscribed!</p>
            <p className="text-white/60 text-sm">
              Your first insight will land in your inbox soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter subscription form"
          >
            {/* Email + button row — stacked on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Your email address"
                disabled={status === "loading"}
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "newsletter-error" : undefined}
                className="
                  flex-1
                  px-5 py-3.5 rounded-full
                  bg-white/10 backdrop-blur-sm
                  border border-white/20
                  text-white placeholder:text-white/40
                  text-sm font-medium
                  focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold
                  disabled:opacity-60
                  transition-colors duration-200
                "
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="
                  flex-shrink-0
                  bg-brand-gold text-brand-dark
                  font-bold text-sm
                  px-7 py-3.5 rounded-full
                  hover:bg-white hover:text-brand-dark
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200
                  cursor-pointer
                  flex items-center justify-center gap-2
                "
              >
                {status === "loading" ? (
                  <>
                    {/* Spinner icon */}
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Subscribing…
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            {/* Error message — announced to screen readers via aria-live */}
            {status === "error" && errorMessage && (
              <p
                id="newsletter-error"
                role="alert"
                aria-live="assertive"
                className="mt-3 text-red-300 text-sm text-center"
              >
                {errorMessage}
              </p>
            )}
          </form>
        )}

        {/* Privacy note — addresses the #1 objection to sharing an email address */}
        <p className="mt-5 text-white/40 text-xs">
          No spam, ever. Unsubscribe any time. We respect your privacy.
        </p>

      </div>
    </section>
  );
};

export default BlogNewsletterCTA;
