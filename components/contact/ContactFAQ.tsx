/**
 * ContactFAQ.tsx — Accordion FAQ section for the /contact page
 *
 * Purpose: Handles the four most common questions a visitor asks before
 * deciding whether to reach out. Placed below ContactMain so high-intent
 * visitors who submitted the form scroll on and feel reassured, while
 * hesitant visitors find answers and scroll back up.
 *
 * Accordion pattern: one item open at a time. Clicking the open item
 * closes it. Identical logic to WaitlistFAQ, EmployersFAQ, ProfessionalsFAQ.
 *
 * Animation: max-h CSS transition (max-h-0 → max-h-96) avoids JS-measured
 * heights and works without useRef. Combined with opacity transition.
 *
 * Accessibility:
 *   - aria-expanded on each trigger reflects open/closed state
 *   - aria-controls links each button to its answer panel
 *   - role="region" + aria-labelledby on each panel
 *   - Focus ring on trigger buttons
 */

"use client";

import { useState } from "react";

/** Each FAQ maps to a specific hesitation a visitor has before contacting */
const faqs = [
  {
    question: "How quickly will I get a response?",
    answer:
      "We typically respond within 24 hours on business days. For urgent enquiries, you can also reach us at uwa@pronurture.com.ng directly.",
  },
  {
    question: "I'm a healthcare professional — how do I join?",
    answer:
      "Head to our waitlist page to register for early access. As an early access member you'll be among the first notified when the platform opens for professionals in your area.",
  },
  {
    question: "I represent a facility — can I request a demo?",
    answer:
      "Yes, absolutely. Send us a message using the form above or email uwa@pronurture.com.ng with your facility name, location, and a brief description of your workforce needs. We'll arrange a walkthrough at a time that works for you.",
  },
  {
    question: "Where is ProNurtureSphere based?",
    answer:
      "We're a Nigerian company — ProNurtureSphere Limited — serving healthcare organisations nationwide across Lagos, Abuja, Port Harcourt, Enugu, Kano, and beyond. Our platform is built specifically for the Nigerian healthcare context.",
  },
];

const ContactFAQ = () => {
  /**
   * openIndex tracks which FAQ item is expanded.
   * null = all items closed (default).
   * A number = index of the currently open item.
   */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** Opens the clicked item or closes it if already open */
  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Frequently asked questions about contacting ProNurtureSphere"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-3">
            Quick Answers
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
            Frequently Asked Questions.
          </h2>
        </div>

        {/* ── Accordion ────────────────────────────────────────────────── */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `contact-faq-panel-${index}`;
            const triggerId = `contact-faq-trigger-${index}`;

            return (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl border transition-all duration-200
                  ${isOpen
                    ? "border-brand-dark/15 shadow-md"
                    : "border-brand-dark/5 hover:border-brand-dark/10"
                  }
                `}
              >
                {/* ── Question trigger ────────────────────────────────── */}
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

                  {/* Chevron — rotates to signal open/closed direction */}
                  <span
                    className={`
                      flex-shrink-0 w-5 h-5 text-brand-dark/50
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : "rotate-0"}
                    `}
                    aria-hidden="true"
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* ── Answer panel ────────────────────────────────────────
                 * max-h transition from 0 → max-h-96 expands the panel
                 * without JavaScript height measurement. overflow-hidden
                 * clips content during the animation.
                 */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
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

        {/* ── Bottom prompt ─────────────────────────────────────────────── */}
        <p className="text-center text-brand-dark/50 text-sm mt-8">
          Still have questions?{" "}
          <a
            href="mailto:uwa@pronurture.com.ng"
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

export default ContactFAQ;
