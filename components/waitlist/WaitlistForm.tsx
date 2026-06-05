/**
 * WaitlistForm.tsx — Two-column waitlist signup form for /waitlist
 *
 * Left column  → The pitch: badge, H1, subheadline, 3 benefit bullets.
 *                Answers "why sign up?" so the form on the right closes the deal.
 *
 * Right column → White card with four fields (name, email, user type, and a
 *                conditional second dropdown) and a gold "Join the Waitlist" button.
 *
 * Conditional second dropdown logic:
 *   • "Healthcare Professional" selected → "Your Profession" dropdown appears
 *   • "Healthcare Facility / Employer" selected → "Facility Type" dropdown appears
 *   • "Other" selected → no second dropdown (nothing to segment)
 *
 *   The reveal uses a max-h CSS transition so the field slides in smoothly
 *   without JavaScript-measured heights or animation libraries.
 *
 * On successful submission the form card is replaced with a success state:
 * checkmark, confirmation copy, a spam-folder reminder, and "Back to Home".
 *
 * Webhook payload:
 *   { name, email, userType }                                     — always
 *   { ..., profession }    when userType === "Healthcare Professional"
 *   { ..., facilityType }  when userType === "Healthcare Facility / Employer"
 *
 * State machine:
 *   idle → (submit) → loading → success
 *                             ↘ error → (user types) → idle
 *
 * Rules:
 *   - NEVER use localStorage or sessionStorage
 *   - All form state lives in React useState
 *   - Email is validated on the client before the fetch fires
 *   - Secondary dropdown is required when visible
 */

"use client";

import { useState } from "react";
import Link from "next/link";

/** ── Form submission state machine ──────────────────────────────────────── */
type SubmitStatus = "idle" | "loading" | "success" | "error";

/**
 * Make.com webhook URL.
 * Receives a JSON body and handles downstream routing (CRM, welcome email).
 * All payload fields are documented next to the fetch() call below.
 */
const WEBHOOK_URL =
  "https://hook.eu1.make.com/km9hduqfg83mft3u8j9k3e2qqnr92f00";

/** Reusable Tailwind class string for all text inputs and select dropdowns */
const inputClass = `
  w-full px-4 py-2.5 rounded-xl
  border border-brand-dark/15 bg-white
  text-brand-dark text-sm font-medium
  placeholder:text-brand-dark/35
  focus:outline-none focus:ring-2 focus:ring-brand-dark/20 focus:border-brand-dark/40
  transition-all duration-150
  disabled:opacity-50 disabled:cursor-not-allowed
`;

/** Reusable label class */
const labelClass = "block text-brand-dark font-semibold text-sm mb-1.5";

/** Benefit bullets shown in the left pitch column */
const benefits = [
  "Priority onboarding when we launch",
  "Free early access — no credit card",
  "Direct input into the platform roadmap",
];

/**
 * Profession options — shown when userType === "Healthcare Professional".
 * Ordered by approximate population size in Nigerian healthcare workforce.
 */
const professionOptions = [
  "Doctor / Physician",
  "Registered Nurse",
  "Midwife",
  "Pharmacist",
  "Medical Laboratory Scientist",
  "Radiographer",
  "Physiotherapist",
  "Dentist",
  "Community Health Worker",
  "Healthcare Assistant",
  "Allied Health Professional",
  "Other Healthcare Professional",
];

/**
 * Facility type options — shown when userType === "Healthcare Facility / Employer".
 * Ordered by prevalence in the private Nigerian healthcare sector (PSL's primary market).
 */
const facilityTypeOptions = [
  "Private Hospital",
  "Public Hospital",
  "Maternity Home",
  "Diagnostics Centre",
  "Clinic",
  "Staffing Agency",
  "Other Facility",
];

const WaitlistForm = () => {
  /** ── Form field state ─────────────────────────────────────────────────── */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  /**
   * userType defaults to "Healthcare Professional" — the larger persona.
   * Changing this also resets the secondary fields (see onChange handler).
   */
  const [userType, setUserType] = useState("Healthcare Professional");

  /**
   * Secondary dropdown state — both hold a default value so validation
   * never blocks a user who accepted the default. They reset to their
   * defaults whenever userType changes to prevent stale cross-type values
   * (e.g. "Maternity Home" lingering in the payload for a professional).
   */
  const [profession, setProfession] = useState("Doctor / Physician");
  const [facilityType, setFacilityType] = useState("Private Hospital");

  /** ── Submission state ────────────────────────────────────────────────── */
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /** ── Derived flags for conditional rendering ─────────────────────────── */
  const showProfessionSelect = userType === "Healthcare Professional";
  const showFacilityTypeSelect = userType === "Healthcare Facility / Employer";
  /**
   * showSecondarySelect drives the max-h reveal animation wrapper.
   * True for both Professional and Employer; false for "Other".
   */
  const showSecondarySelect = showProfessionSelect || showFacilityTypeSelect;

  /**
   * clearErrorOnChange — resets the error state when the user edits any field.
   * Prevents the error from feeling "sticky" after a failed submit.
   */
  const clearErrorOnChange = () => {
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  /**
   * handleSubmit — validates fields, builds the payload, and POSTs to webhook.
   *
   * noValidate on <form> disables browser-native popups so we control
   * the full validation UI (styled to the brand palette).
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** ── Client-side validation ───────────────────────────────────────── */
    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    /** ── Begin network request ────────────────────────────────────────── */
    setStatus("loading");
    setErrorMessage("");

    try {
      /**
       * Payload structure:
       *   name         — full name (trimmed)
       *   email        — email address (trimmed)
       *   userType     — primary audience segment (always present)
       *   profession   — only included for Healthcare Professionals
       *   facilityType — only included for Healthcare Facility / Employer
       *
       * Using a spread with conditional object entries keeps the payload
       * clean — irrelevant fields are absent rather than null/empty.
       */
      const payload: Record<string, string> = {
        name: name.trim(),
        email: email.trim(),
        userType,
        ...(showProfessionSelect && { profession }),
        ...(showFacilityTypeSelect && { facilityType }),
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again."
      );
    }
  };

  /** ── Render ─────────────────────────────────────────────────────────── */
  return (
    <section
      className="min-h-screen py-12 flex items-center"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Join the ProNurtureSphere waitlist"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Pitch ─────────────────────────────────────────────────
           * Answers "why sign up?" before the user looks at the form.
           * Benefit-led — what does the user GAIN?
           */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-4 py-2 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-gold" aria-hidden="true" />
              <span className="text-brand-dark text-sm font-semibold tracking-wide">
                Early Access
              </span>
            </div>

            {/* H1 — one per page per CLAUDE.md visual hierarchy rules */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight tracking-tight mb-5">
              Be First to Transform Your Healthcare Workforce.
            </h1>

            {/* Subheadline */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Join healthcare facilities and professionals across Nigeria already
              on the ProNurtureSphere waitlist. Early access is free.
            </p>

            {/* Benefit bullets */}
            <ul className="space-y-4" role="list">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
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

            {/* Decorative brand-colour rule */}
            <div className="flex items-center gap-1.5 mt-10" aria-hidden="true">
              <span className="inline-block w-10 h-1 rounded-full bg-brand-dark" />
              <span className="inline-block w-4 h-1 rounded-full bg-brand-gold" />
              <span className="inline-block w-4 h-1 rounded-full bg-brand-green" />
            </div>
          </div>

          {/* ── RIGHT: Form card or Success state ───────────────────────────
           * Card shell remains constant — only the interior swaps on success.
           * aria-live="polite" announces the success state to screen readers.
           */}
          <div
            className="bg-white rounded-2xl shadow-xl border border-brand-dark/5 p-6 md:p-8"
            role="region"
            aria-live="polite"
            aria-atomic="true"
          >

            {status === "success" ? (

              /* ── Success state ─────────────────────────────────────────── */
              <div className="flex flex-col items-center text-center py-4">

                {/* Checkmark icon */}
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

                <h2 className="text-2xl font-bold text-brand-dark mb-3">
                  You&apos;re on the List! 🎉
                </h2>

                <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
                  Thank you for joining the ProNurtureSphere waitlist. We&apos;ve
                  sent a welcome message to your email — please check your inbox now.
                </p>

                {/* Spam folder reminder — warm gold bg, not alarming */}
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

                <form onSubmit={handleSubmit} noValidate aria-label="Waitlist signup form">

                  {/* ── Fixed fields (always visible) ─────────────────────── */}
                  <div className="space-y-4">

                    {/* Full Name */}
                    <div>
                      <label htmlFor="waitlist-name" className={labelClass}>
                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="waitlist-name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); clearErrorOnChange(); }}
                        placeholder="e.g. Dr. Adaeze Okafor"
                        required
                        autoComplete="name"
                        disabled={status === "loading"}
                        aria-required="true"
                        className={inputClass}
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="waitlist-email" className={labelClass}>
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearErrorOnChange(); }}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        disabled={status === "loading"}
                        aria-required="true"
                        aria-invalid={status === "error" && !email ? "true" : "false"}
                        className={inputClass}
                      />
                    </div>

                    {/* I am a... — primary audience segment */}
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
                          /**
                           * Reset secondary dropdowns to their defaults.
                           * Prevents a stale value from a previous selection
                           * being silently included in the webhook payload.
                           * e.g. switching from Employer → Professional should
                           * not carry over the "Maternity Home" facilityType.
                           */
                          setProfession("Doctor / Physician");
                          setFacilityType("Private Hospital");
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

                  {/* ── Conditional second dropdown ────────────────────────────
                   *
                   * Reveal animation: max-h-0 → max-h-28 transition.
                   * The wrapper sits outside space-y-5 so the margin-top
                   * (mt-5) only applies when the field is visible — no
                   * phantom gap when collapsed.
                   *
                   * The inner content conditionally renders the profession
                   * or facilityType select based on userType. When switching
                   * directly between Professional and Employer the wrapper
                   * stays open (showSecondarySelect remains true) and only
                   * the label/options swap — no height animation needed for
                   * that case, just a clean content swap.
                   */}
                  <div
                    className={`
                      overflow-hidden
                      transition-all duration-300 ease-in-out
                      ${showSecondarySelect
                        ? "max-h-28 opacity-100 mt-5"
                        : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    {/* Your Profession — only for Healthcare Professionals */}
                    {showProfessionSelect && (
                      <div>
                        <label htmlFor="waitlist-profession" className={labelClass}>
                          Your Profession <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="waitlist-profession"
                          name="profession"
                          value={profession}
                          onChange={(e) => { setProfession(e.target.value); clearErrorOnChange(); }}
                          disabled={status === "loading"}
                          required
                          aria-required="true"
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          {professionOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Facility Type — only for Healthcare Facility / Employer */}
                    {showFacilityTypeSelect && (
                      <div>
                        <label htmlFor="waitlist-facility-type" className={labelClass}>
                          Facility Type <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="waitlist-facility-type"
                          name="facilityType"
                          value={facilityType}
                          onChange={(e) => { setFacilityType(e.target.value); clearErrorOnChange(); }}
                          disabled={status === "loading"}
                          required
                          aria-required="true"
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          {facilityTypeOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* ── Inline error message ──────────────────────────────── */}
                  {status === "error" && errorMessage && (
                    <p
                      className="mt-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                      role="alert"
                      aria-live="assertive"
                    >
                      {errorMessage}
                    </p>
                  )}

                  {/* ── Submit button ─────────────────────────────────────── */}
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

                {/* Privacy note */}
                <p className="mt-4 text-xs text-brand-dark/45 text-center leading-relaxed">
                  No spam, ever. Your details are only used for ProNurtureSphere
                  early access updates.
                </p>

              </>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
