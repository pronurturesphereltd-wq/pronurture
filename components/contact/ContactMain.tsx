/**
 * ContactMain.tsx — Two-column contact section for the /contact page
 *
 * Left column  → Direct contact details: email address, LinkedIn, X/Twitter,
 *                and a response-time reassurance line.
 *
 * Right column → Contact form card. On submit, builds a mailto: URL with
 *                the form data pre-filled and opens the user's default email
 *                client via window.location.href. No server-side submission —
 *                the user sends the message from their own email account.
 *
 * Mailto design rationale:
 *   Using mailto: keeps the contact flow zero-dependency (no API key, no
 *   email service billing, no server route). The trade-off is that it depends
 *   on the visitor having a configured email client — which is true for
 *   virtually all healthcare professionals and hospital administrators.
 *   encodeURIComponent is used on both subject and body so that special
 *   characters (newlines, commas, accents) survive URL encoding correctly.
 *
 * Form status state machine:
 *   idle → (submit valid) → sent
 *        → (submit invalid) → error → (user types) → idle
 *
 * Rules:
 *   - NEVER use localStorage or sessionStorage
 *   - All state lives in React useState
 *   - All fields required before the mailto link is built
 *   - Email validated on client before triggering
 */

"use client";

import { useState } from "react";

type FormStatus = "idle" | "error" | "sent";

/** Reusable Tailwind class string for all text inputs, select, and textarea */
const inputClass = `
  w-full px-4 py-2.5 rounded-xl
  border border-brand-dark/15 bg-white
  text-brand-dark text-sm font-medium
  placeholder:text-brand-dark/35
  focus:outline-none focus:ring-2 focus:ring-brand-dark/20 focus:border-brand-dark/40
  transition-all duration-150
`;

const labelClass = "block text-brand-dark font-semibold text-sm mb-1.5";

const ContactMain = () => {
  /** ── Form field state ─────────────────────────────────────────────────── */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  /** ── Submission state ────────────────────────────────────────────────── */
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * mailtoLink — stored in state so the sent-state fallback anchor can
   * render the same link that was triggered via window.location.href.
   * This lets the user retry if their email client didn't open.
   */
  const [mailtoLink, setMailtoLink] = useState("");

  /** Reset error when the user edits any field */
  const clearError = () => {
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  /**
   * handleSubmit — validates all fields, builds the mailto: link, triggers
   * the user's default email client, and transitions to the "sent" state.
   *
   * Why encodeURIComponent?
   *   mailto: links are URLs. Characters like newlines (\n), commas, ampersands,
   *   and accented letters will break the URL or be stripped unless encoded.
   *   encodeURIComponent converts them to safe percent-encoded sequences
   *   (e.g. \n → %0A, & → %26, é → %C3%A9).
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** ── Client-side validation ───────────────────────────────────────── */
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage("Please fill in all fields before sending.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    /**
     * Build the mailto: link.
     *
     * Body format includes the sender's name and email at the top so that
     * ProNurtureSphere can identify and reply even if the recipient email
     * client strips the From header on forwarding.
     *
     * Example output (decoded):
     *   mailto:uwa@pronurture.com.ng
     *     ?subject=Demo request for our facility
     *     &body=Name: Dr. Adaeze Okafor
     *           Email: adaeze@sterling.ng
     *
     *           We'd like to arrange a demo for 3 hospitals...
     */
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`;
    const link = `mailto:uwa@pronurture.com.ng?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`;

    setMailtoLink(link);
    setStatus("sent");

    /**
     * Trigger the default email client.
     * window.location.href opens mailto: links in the same tab without
     * navigating away from the page — the browser hands off to the OS
     * mail handler, which opens Outlook / Gmail / Apple Mail / etc.
     */
    window.location.href = link;
  };

  /** Reset form to initial state (used by "Send Another Message" button) */
  const resetForm = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrorMessage("");
    setMailtoLink("");
  };

  return (
    <section
      className="py-16 lg:py-20 bg-white"
      aria-label="Contact details and enquiry form"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Contact details ────────────────────────────────────────
           * Provides direct contact options for visitors who prefer not to
           * fill a form — or who need to reach the team urgently.
           */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-8">
              Reach Us Directly
            </h2>

            {/* Email card — primary contact channel */}
            <div className="bg-brand-light rounded-2xl p-6 mb-6 border border-brand-dark/5">
              <div className="flex items-start gap-4">
                {/* Envelope icon — brand-dark container with gold icon */}
                <div
                  className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <svg
                    className="w-5 h-5 text-brand-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-1">
                    Email Us
                  </p>
                  {/* Direct mailto link — opens email client pre-addressed */}
                  <a
                    href="mailto:uwa@pronurture.com.ng"
                    className="text-brand-dark font-semibold text-base hover:text-brand-green transition-colors duration-150 underline underline-offset-2 cursor-pointer"
                  >
                    uwa@pronurture.com.ng
                  </a>
                </div>
              </div>
            </div>

            {/* Social links ─────────────────────────────────────────────── */}
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-4">
                Follow Us
              </p>

              <div className="flex flex-wrap gap-3">

                {/* LinkedIn — primary channel for B2B/healthcare professional audience */}
                <a
                  href="https://www.linkedin.com/company/psl25/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow ProNurtureSphere on LinkedIn (opens in new tab)"
                  className="
                    inline-flex items-center gap-2.5
                    bg-brand-light border border-brand-dark/10
                    rounded-xl px-4 py-2.5
                    text-brand-dark text-sm font-semibold
                    hover:bg-brand-dark hover:text-white hover:border-brand-dark
                    transition-all duration-200 cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark/30
                  "
                >
                  {/* LinkedIn logo SVG */}
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>

                {/* X (Twitter) — secondary channel */}
                <a
                  href="https://x.com/pronurture"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow ProNurtureSphere on X, formerly Twitter (opens in new tab)"
                  className="
                    inline-flex items-center gap-2.5
                    bg-brand-light border border-brand-dark/10
                    rounded-xl px-4 py-2.5
                    text-brand-dark text-sm font-semibold
                    hover:bg-brand-dark hover:text-white hover:border-brand-dark
                    transition-all duration-200 cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark/30
                  "
                >
                  {/* X logo SVG */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X (Twitter)
                </a>

              </div>
            </div>

            {/* Response time reassurance */}
            <div className="flex items-center gap-3 text-brand-dark/60 text-sm">
              {/* Green pulse dot — signals "active / we're here" */}
              <span
                className="inline-block w-2 h-2 rounded-full bg-brand-green flex-shrink-0"
                aria-hidden="true"
              />
              We typically respond within 24 hours.
            </div>
          </div>

          {/* ── RIGHT: Form card ─────────────────────────────────────────────
           * The card shell is constant — only the interior swaps on "sent".
           * aria-live="polite" announces the state change to screen readers.
           */}
          <div
            className="bg-white rounded-2xl shadow-xl border border-brand-dark/5 p-6 md:p-8"
            role="region"
            aria-live="polite"
            aria-atomic="true"
          >

            {status === "sent" ? (

              /* ── Sent state ─────────────────────────────────────────────── */
              <div className="flex flex-col items-center text-center py-4">

                {/* Checkmark icon */}
                <div
                  className="w-16 h-16 rounded-full bg-brand-dark flex items-center justify-center mb-6 shadow-lg"
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
                  Your email client should have opened!
                </h2>

                <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
                  Compose and send your message in the email window that just opened.
                  We&apos;ll get back to you within 24 hours.
                </p>

                {/* Fallback note — handles the case where the email client
                  * didn't open (no mail app configured, browser restrictions, etc.)
                  */}
                <div
                  className="bg-brand-gold/15 border border-brand-gold/30 rounded-xl p-4 text-sm text-brand-dark leading-relaxed text-left w-full mb-6"
                  role="note"
                >
                  <p>
                    📩{" "}
                    <strong>Email client didn&apos;t open?</strong>{" "}
                    <a
                      href={mailtoLink}
                      className="underline underline-offset-2 font-semibold hover:text-brand-green transition-colors duration-150"
                    >
                      Click here to try again
                    </a>
                    {" "}or email us directly at{" "}
                    <a
                      href="mailto:uwa@pronurture.com.ng"
                      className="underline underline-offset-2 font-semibold hover:text-brand-green transition-colors duration-150"
                    >
                      uwa@pronurture.com.ng
                    </a>
                    .
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    inline-flex items-center gap-2
                    text-brand-dark font-semibold text-sm
                    border border-brand-dark/20 px-5 py-2.5 rounded-full
                    hover:bg-brand-dark hover:text-white hover:border-brand-dark
                    transition-all duration-200 cursor-pointer
                  "
                >
                  Send Another Message
                </button>

              </div>

            ) : (

              /* ── Form ─────────────────────────────────────────────────── */
              <>
                {/* Form card header */}
                <div className="mb-6">
                  <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-1">
                    Send a Message
                  </p>
                  <h2 className="text-xl font-bold text-brand-dark">
                    How Can We Help?
                  </h2>
                </div>

                {/*
                 * noValidate suppresses browser-native validation UI so we
                 * can use our own brand-styled error messages below.
                 */}
                <form onSubmit={handleSubmit} noValidate aria-label="Contact enquiry form">

                  <div className="space-y-4">

                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        Full Name{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); clearError(); }}
                        placeholder="e.g. Dr. Adaeze Okafor"
                        autoComplete="name"
                        aria-required="true"
                        className={inputClass}
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        Email Address{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError(); }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-required="true"
                        className={inputClass}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className={labelClass}>
                        Subject{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value); clearError(); }}
                        placeholder="e.g. Demo request for our facility"
                        aria-required="true"
                        className={inputClass}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className={labelClass}>
                        Message{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); clearError(); }}
                        placeholder="Tell us how we can help — or ask about a demo, partnership, or early access."
                        aria-required="true"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                  </div>

                  {/* Inline error message */}
                  {status === "error" && errorMessage && (
                    <p
                      className="mt-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                      role="alert"
                      aria-live="assertive"
                    >
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit button — gold → brand-dark hover, consistent with all CTAs */}
                  <button
                    type="submit"
                    className="
                      w-full mt-5
                      bg-brand-gold text-brand-dark
                      font-bold text-sm
                      px-6 py-3 rounded-xl
                      flex items-center justify-center gap-2
                      hover:bg-brand-dark hover:text-white
                      transition-all duration-200
                      cursor-pointer shadow-sm
                    "
                  >
                    Send Message
                    {/* Paper plane / send icon */}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>

                </form>

                {/* Helper note explaining what happens on submit */}
                <p className="mt-4 text-xs text-brand-dark/45 text-center leading-relaxed">
                  Clicking &ldquo;Send Message&rdquo; will open your email client with the
                  message pre-filled and ready to send.
                </p>

              </>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMain;
