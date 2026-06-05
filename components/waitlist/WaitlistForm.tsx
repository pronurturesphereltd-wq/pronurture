/**
 * WaitlistForm.tsx — Two-column waitlist signup form for /waitlist
 *
 * Left column  → The pitch: badge, H1, subheadline, 3 benefit bullets.
 *                Answers "why sign up?" so the form on the right closes the deal.
 *
 * Right column → White card with three fields (name, email, user type) and a
 *                gold "Join the Waitlist" submit button.
 *
 * On successful submission the form card is replaced with a success state:
 * green checkmark, confirmation copy, a spam-folder reminder, and a
 * "Back to Home" link. The left pitch column stays visible.
 *
 * Submission flow:
 *   1. Client-side validation (name required, valid email format)
 *   2. POST JSON to the Make.com webhook with { name, email, userType }
 *   3. On 200 → show success state
 *   4. On network error / non-2xx → show inline error message
 *
 * State machine:
 *   idle → (submit) → loading → success
 *                             ↘ error → (user types) → idle
 *
 * Rules:
 *   - NEVER use localStorage or sessionStorage
 *   - All form state lives in React useState
 *   - Email is validated on the client before the fetch fires
 */

"use client";

import { useState } from "react";
import Link from "next/link";

/** ── Form submission state machine ──────────────────────────────────────── */
type SubmitStatus = "idle" | "loading" | "success" | "error";

/**
 * Make.com webhook URL.
 * Receives a JSON body of { name, email, userType } and handles downstream
 * routing (e.g. adding the lead to a CRM, sending a welcome email).
 */
const WEBHOOK_URL =
  "https://hook.eu1.make.com/km9hduqfg83mft3u8j9k3e2qqnr92f00";

/** Reusable Tailwind class string for text inputs and the select dropdown */
const inputClass = `
  w-full px-4 py-3 rounded-xl
  border border-brand-dark/15 bg-white
  text-brand-dark text-sm font-medium
  placeholder:text-brand-dark/35
  focus:outline-none focus:ring-2 focus:ring-brand-dark/20 focus:border-brand-dark/40
  transition-all duration-150
  disabled:opacity-50 disabled:cursor-not-allowed
`;

/** Reusable label class */
const labelClass = "block text-brand-dark font-semibold text-sm mb-1.5";

/** The three benefit bullets shown in the left column */
const benefits = [
  "Priority onboarding when we launch",
  "Free early access — no credit card",
  "Direct input into the platform roadmap",
];

const WaitlistForm = () => {
  /** ── Form field state ─────────────────────────────────────────────────── */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("Healthcare Professional");

  /** ── Submission state ────────────────────────────────────────────────── */
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Clears the error state when the user starts typing again after a failure.
   * Prevents the error from feeling "sticky" and blocking the user.
   */
  const clearErrorOnChange = () => {
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  /**
   * handleSubmit — validates, posts to webhook, updates state machine.
   *
   * We use `noValidate` on the <form> element so that we control the
   * validation UI ourselves (styled to match the brand) rather than letting
   * the browser show its native (un-styled) validation popups.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** ── Client-side validation ──────────────────────────────────────────
     * Check name and email before hitting the network.
     * Saves a round-trip and gives instant feedback.
     */
    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }

    /** Basic email format check — catches obvious typos before sending */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    /** ── Begin network request ─────────────────────────────────────────── */
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /**
         * Payload matches the Make.com scenario's expected structure.
         * name      → full name as entered
         * email     → trimmed to remove accidental spaces
         * userType  → selected audience type for segmentation
         */
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          userType,
        }),
      });

      if (!response.ok) {
        /**
         * Make.com returns a non-2xx status if the webhook is disabled or
         * misconfigured. We surface a user-friendly message rather than
         * exposing the HTTP status code.
         */
        throw new Error(`Webhook returned ${response.status}`);
      }

      /** Submission succeeded — swap the form for the success state */
      setStatus("success");
    } catch {
      /**
       * Network errors (offline, CORS, server unavailable) land here.
       * We don't re-throw — the error is displayed inline and the user
       * can try again without reloading the page.
       */
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again."
      );
    }
  };

  /** ── Render ─────────────────────────────────────────────────────────── */
  return (
    <section
      className="min-h-screen pt-28 pb-16 flex items-center"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Join the ProNurtureSphere waitlist"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Pitch ─────────────────────────────────────────────────
           * Answers "why sign up?" before the user looks at the form.
           * Benefit-led rather than feature-led — what does the user GAIN?
           */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-gold" aria-hidden="true" />
              <span className="text-brand-dark text-sm font-semibold tracking-wide">
                Early Access
              </span>
            </div>

            {/* H1 — page headline (one per page per CLAUDE.md hierarchy rules) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight tracking-tight mb-5">
              Be First to Transform Your Healthcare Workforce.
            </h1>

            {/* Subheadline */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Join healthcare facilities and professionals across Nigeria already
              on the ProNurtureSphere waitlist. Early access is free.
            </p>

            {/* ── Benefit bullets ─────────────────────────────────────────
             * Three short points that directly address the hesitations of
             * both buyer personas: cost, commitment, and relevance.
             */}
            <ul className="space-y-4" role="list">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  {/* Checkmark icon in brand-dark — signals "you'll get this" */}
                  <span
                    className="
                      w-6 h-6 rounded-full bg-brand-dark
                      flex items-center justify-center
                      flex-shrink-0 mt-0.5
                    "
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-brand-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-brand-dark font-medium text-base leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Decorative brand-colour rule — consistent with BlogHero and AboutHero */}
            <div className="flex items-center gap-1.5 mt-10" aria-hidden="true">
              <span className="inline-block w-10 h-1 rounded-full bg-brand-dark" />
              <span className="inline-block w-4 h-1 rounded-full bg-brand-gold" />
              <span className="inline-block w-4 h-1 rounded-full bg-brand-green" />
            </div>
          </div>

          {/* ── RIGHT: Form card or Success state ───────────────────────────
           * The white card swaps its internal content when status === "success".
           * The card itself remains, preserving the layout for a smooth swap.
           */}
          <div
            className="bg-white rounded-2xl shadow-xl border border-brand-dark/5 p-8 md:p-10"
            role="region"
            aria-live="polite"
            aria-atomic="true"
          >

            {status === "success" ? (

              /* ── Success state ─────────────────────────────────────────── */
              <div className="flex flex-col items-center text-center py-4">

                {/* Large green checkmark */}
                <div
                  className="
                    w-16 h-16 rounded-full bg-brand-dark
                    flex items-center justify-center
                    mb-6 shadow-lg
                  "
                  aria-hidden="true"
                >
                  <svg
                    className="w-8 h-8 text-brand-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>

                {/* Confirmation headline */}
                <h2 className="text-2xl font-bold text-brand-dark mb-3">
                  You&apos;re on the List! 🎉
                </h2>

                {/* Confirmation message */}
                <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
                  Thank you for joining the ProNurtureSphere waitlist. We&apos;ve
                  sent a welcome message to your email — please check your inbox now.
                </p>

                {/* ── Spam folder reminder box ─────────────────────────────
                 * Light gold background — warm, not alarming. Helps users
                 * find the welcome email and ensures future deliverability.
                 * Per email marketing best practice, the first action of
                 * marking as "Not Spam" trains the inbox filter for all
                 * subsequent communications.
                 */}
                <div
                  className="
                    bg-brand-gold/15 border border-brand-gold/30
                    rounded-xl p-4 text-sm text-brand-dark leading-relaxed
                    text-left w-full mb-6
                  "
                  role="note"
                >
                  <p>
                    📩{" "}
                    <strong>Can&apos;t find it?</strong> Check your spam or junk
                    folder. If our welcome email is there, mark it as{" "}
                    <strong>&apos;Not Spam&apos;</strong> and move it to your inbox so
                    you never miss an update.
                  </p>
                </div>

                {/* Back to Home — gives the user a clear next action */}
                <Link
                  href="/"
                  className="
                    inline-flex items-center gap-2
                    text-brand-dark font-semibold text-sm
                    border border-brand-dark/20 px-5 py-2.5 rounded-full
                    hover:bg-brand-dark hover:text-white hover:border-brand-dark
                    transition-all duration-200 cursor-pointer
                  "
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to Home
                </Link>

              </div>

            ) : (

              /* ── Form ─────────────────────────────────────────────────── */
              <>
                {/* Form header */}
                <div className="mb-7">
                  <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-1">
                    Join the Waitlist
                  </p>
                  <h2 className="text-xl font-bold text-brand-dark">
                    Get Early Access
                  </h2>
                </div>

                {/* noValidate — we control validation UI (styled to brand) */}
                <form onSubmit={handleSubmit} noValidate aria-label="Waitlist signup form">
                  <div className="space-y-5">

                    {/* ── Full Name ──────────────────────────────────────── */}
                    <div>
                      <label htmlFor="waitlist-name" className={labelClass}>
                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="waitlist-name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          clearErrorOnChange();
                        }}
                        placeholder="e.g. Dr. Adaeze Okafor"
                        required
                        autoComplete="name"
                        disabled={status === "loading"}
                        aria-required="true"
                        className={inputClass}
                      />
                    </div>

                    {/* ── Email Address ──────────────────────────────────── */}
                    <div>
                      <label htmlFor="waitlist-email" className={labelClass}>
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearErrorOnChange();
                        }}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        disabled={status === "loading"}
                        aria-required="true"
                        aria-invalid={status === "error" && !email ? "true" : "false"}
                        className={inputClass}
                      />
                    </div>

                    {/* ── I am a... (user type select) ────────────────────
                     * Collects audience segment so the Make.com automation
                     * can route to the correct onboarding sequence.
                     * Defaults to "Healthcare Professional" — the larger
                     * of the two primary personas.
                     */}
                    <div>
                      <label htmlFor="waitlist-user-type" className={labelClass}>
                        I am a...
                      </label>
                      <select
                        id="waitlist-user-type"
                        name="userType"
                        value={userType}
                        onChange={(e) => {
                          setUserType(e.target.value);
                          clearErrorOnChange();
                        }}
                        disabled={status === "loading"}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="Healthcare Professional">Healthcare Professional</option>
                        <option value="Healthcare Facility / Employer">Healthcare Facility / Employer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                  </div>

                  {/* ── Inline error message ──────────────────────────────
                   * Rendered below the fields so it doesn't shift layout
                   * when it appears. `role="alert"` ensures screen readers
                   * announce it immediately when it enters the DOM.
                   */}
                  {status === "error" && errorMessage && (
                    <p
                      className="mt-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                      role="alert"
                      aria-live="assertive"
                    >
                      {errorMessage}
                    </p>
                  )}

                  {/* ── Submit button ─────────────────────────────────────
                   * Gold background (brand-gold) per CLAUDE.md CTA rules.
                   * Full width for maximum tap area on mobile.
                   * Disabled and dimmed during loading to prevent double-submit.
                   */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-busy={status === "loading"}
                    className="
                      w-full mt-6
                      bg-brand-gold text-brand-dark
                      font-bold text-sm
                      px-6 py-3.5 rounded-xl
                      flex items-center justify-center gap-2
                      hover:bg-brand-dark hover:text-white
                      transition-all duration-200
                      cursor-pointer
                      disabled:opacity-60 disabled:cursor-not-allowed
                      shadow-sm
                    "
                  >
                    {status === "loading" ? (
                      <>
                        {/* Spinner — communicates that the form is processing */}
                        <svg
                          className="animate-spin w-4 h-4 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12" cy="12" r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Joining...</span>
                      </>
                    ) : (
                      "Join the Waitlist"
                    )}
                  </button>

                </form>

                {/* ── Privacy note ─────────────────────────────────────────
                 * Directly below the button — this is the last thing a
                 * hesitant user reads before deciding to submit.
                 * Specific language ("only used for ProNurtureSphere early
                 * access updates") beats vague privacy platitudes.
                 */}
                <p className="mt-4 text-xs text-brand-dark/45 text-center leading-relaxed">
                  No spam, ever. Your details are only used for ProNurtureSphere
                  early access updates.
                </p>

              </>
            )}

          </div>
          {/* ── End right column ─────────────────────────────────────────── */}

        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
