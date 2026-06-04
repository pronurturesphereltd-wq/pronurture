"use client";

/**
 * EmployersFAQ.tsx — FAQ accordion for healthcare facility managers
 *
 * Position: After EmployersTestimonials.
 * Purpose: Handles final objections and hesitation from Dr. Adaeze before she converts.
 *          Per CLAUDE.md Section 3 barriers: "Implementation cost, data security,
 *          staff adoption concerns" — each FAQ is mapped to a real barrier.
 *          Answering objections proactively reduces support load and increases conversions.
 *
 * Why 'use client'?
 * The accordion uses useState to track which FAQ item is expanded.
 * Server components cannot hold UI interaction state.
 *
 * Design: Off-white (brand-light) background. Clean accordion with smooth
 *         max-height transitions. Brand-dark/gold on the active item chevron
 *         signals the open state without extra visual noise.
 */

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long does it take to onboard my facility?",
    answer:
      "Most facilities are fully set up within 24–48 hours. The onboarding process is guided step-by-step — you'll create your facility profile, add your departments, and post your first shift. Our support team is available throughout. No IT department or technical knowledge required.",
  },
  {
    question: "Can I manage both permanent staff and locum professionals?",
    answer:
      "Yes. ProNurtureSphere manages your entire workforce in one place — including full-time permanent staff, part-time employees, and locum/agency professionals. You can set different pay rates, attendance rules, and compliance requirements for each staff category.",
  },
  {
    question: "How does credential verification work?",
    answer:
      "Every healthcare professional on the platform goes through a verification process before they can accept shifts at your facility. This includes MDCN/NMCN registration checks, licence validity confirmation, and CPD record review. Credentials are re-checked periodically and you receive alerts when any qualification is approaching expiry — so you're never caught off guard.",
  },
  {
    question: "Is ProNurtureSphere compliant with Nigerian regulatory requirements?",
    answer:
      "Yes. ProNurtureSphere was built specifically for the Nigerian regulatory environment. The platform supports MDCN and NMCN registration requirements, HEFAMAA compliance documentation, Nigerian PAYE tax calculations, pension contribution tracking (per PenCom guidelines), and CPD record-keeping for professional body requirements.",
  },
  {
    question: "What does early access include?",
    answer:
      "Early access members receive priority onboarding with dedicated support, discounted subscription rates locked in for the first 12 months, and direct input into the product roadmap. You'll be among the first facilities to go live and will have access to all six core platform capabilities from day one — at no cost until full commercial launch.",
  },
];

const EmployersFAQ = () => {
  /**
   * openIndex tracks which FAQ is currently expanded.
   * null = all items closed. Clicking the open item closes it.
   */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="bg-brand-light py-20 lg:py-28"
      aria-label="Frequently asked questions for healthcare facility managers"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            FAQs
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-4">
            Common Questions from Facility Managers.
          </h2>
          <p className="text-brand-dark/60 text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* ── Accordion List ──────────────────────────────────────────────── */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  bg-white rounded-2xl border
                  transition-all duration-300
                  ${isOpen
                    ? "border-brand-dark/20 shadow-md"
                    : "border-brand-dark/5 hover:border-brand-dark/15"
                  }
                `}
              >
                {/* Accordion trigger — full-width button for keyboard accessibility */}
                <button
                  onClick={() => toggle(index)}
                  className="
                    w-full text-left px-6 py-5
                    flex items-center justify-between gap-4
                    cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-brand-dark/20 focus:ring-inset
                    rounded-2xl
                  "
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-trigger-${index}`}
                >
                  <span className="font-semibold text-brand-dark text-base leading-snug pr-2">
                    {faq.question}
                  </span>

                  {/* Chevron — rotates 180° when item is open */}
                  <span
                    className={`
                      flex-shrink-0 w-8 h-8 rounded-full
                      flex items-center justify-center
                      transition-all duration-300
                      ${isOpen
                        ? "bg-brand-dark text-brand-gold rotate-180"
                        : "bg-brand-dark/5 text-brand-dark"
                      }
                    `}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Answer — max-height transition for smooth open/close */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="px-6 pb-6 text-brand-dark/65 leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmployersFAQ;
