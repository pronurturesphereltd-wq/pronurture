/**
 * WaitlistFAQ.tsx — Accordion FAQ section for the /waitlist page
 *
 * Placed below the form to handle final hesitations from visitors who
 * scrolled past the form without submitting. Each question maps to a
 * specific barrier or question that both buyer personas commonly have
 * about an early-access programme.
 *
 * Accordion pattern: one item open at a time. Clicking the open item
 * closes it. Clicking another item opens it (and closes the current one).
 * This pattern keeps the section compact — all four answers don't need
 * to be visible simultaneously.
 *
 * Animation: `max-h` CSS transition from 0 to a fixed large value.
 * This avoids JS-measured height with useRef and prevents layout reflow
 * jank — the same technique used in EmployersFAQ and ProfessionalsFAQ.
 *
 * Accessibility:
 *   - `aria-expanded` on each trigger reflects open/closed state
 *   - `aria-controls` links each button to its answer panel
 *   - `role="region"` + `aria-labelledby` on each panel
 *   - Focus ring on trigger buttons
 */

"use client";

import { useState } from "react";

/** FAQ data — each entry answers a specific early-access concern */
const faqs = [
  {
    question: "Is early access really free?",
    answer:
      "Yes, completely free — no credit card required, no hidden fees. Early access members get full platform access at no cost during the early access period. When ProNurtureSphere moves to paid plans, early access members will receive priority pricing as a thank-you for being part of the journey.",
  },
  {
    question: "When will ProNurtureSphere launch?",
    answer:
      "We are onboarding early access members in phases through 2026. As an early access member, you will be among the first notified when your phase opens. We will communicate directly by email — no guesswork required.",
  },
  {
    question: "What do I get as an early access member?",
    answer:
      "Three things: priority onboarding so you are set up before the general public, free platform access during the early access period, and a direct channel to share feedback that shapes the product roadmap. Early access members are partners in building the platform, not just users.",
  },
  {
    question: "Who is ProNurtureSphere for?",
    answer:
      "ProNurtureSphere serves two audiences in Nigerian healthcare. Healthcare professionals — doctors, nurses, pharmacists, and allied health practitioners — use the platform to find verified locum shifts, complete accredited CPD, and manage their credentials. Healthcare facilities — hospitals, clinics, maternity homes, diagnostics centres, and staffing agencies — use it to post shifts, verify staff credentials, manage payroll, and track workforce compliance.",
  },
];

const WaitlistFAQ = () => {
  /**
   * openIndex tracks which FAQ item is expanded.
   * null means all items are closed (the default state).
   * A number is the index of the currently open item.
   */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /**
   * toggle — opens the clicked item, or closes it if already open.
   * This gives users the ability to collapse an answer they've finished reading.
   */
  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Frequently asked questions about early access"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-3">
            Early Access FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
            Questions About Early Access.
          </h2>
        </div>

        {/* ── Accordion ─────────────────────────────────────────────────── */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const triggerId = `faq-trigger-${index}`;

            return (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl
                  border transition-all duration-200
                  ${isOpen
                    ? "border-brand-dark/15 shadow-md"
                    : "border-brand-dark/5 hover:border-brand-dark/10"
                  }
                `}
              >
                {/* ── Question trigger ──────────────────────────────────── */}
                <button
                  id={triggerId}
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="
                    w-full text-left
                    flex items-center justify-between gap-4
                    px-6 py-5
                    text-brand-dark font-semibold text-base
                    cursor-pointer
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-brand-dark/30 focus-visible:ring-offset-2
                    rounded-2xl
                  "
                >
                  <span>{faq.question}</span>

                  {/* Chevron — rotates when open to signal direction of toggle */}
                  <span
                    className={`
                      flex-shrink-0 w-5 h-5 text-brand-dark/50
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : "rotate-0"}
                    `}
                    aria-hidden="true"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* ── Answer panel ──────────────────────────────────────────
                 * `max-h` transition: starts at 0 (collapsed), expands to
                 * max-h-96 (open). `overflow-hidden` clips content during
                 * the transition so it doesn't flash outside the container.
                 * Combined with `opacity` transition for a smooth reveal.
                 */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`
                    overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${isOpen
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Bottom prompt ─────────────────────────────────────────────────
         * Handles the case where a visitor's question isn't covered above.
         * Provides a fallback action without requiring a full contact form.
         */}
        <p className="text-center text-brand-dark/50 text-sm mt-8">
          Still have questions?{" "}
          <a
            href="mailto:pronurturesphereltd@gmail.com"
            className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
          >
            Email us directly
          </a>
          .
        </p>

      </div>
    </section>
  );
};

export default WaitlistFAQ;
