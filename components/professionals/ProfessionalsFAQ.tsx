"use client";

/**
 * ProfessionalsFAQ.tsx — FAQ accordion for healthcare professionals
 *
 * Position: After ProfessionalsTestimonials.
 * Purpose: Handles final hesitations from Dr. Amarachi before she converts.
 *          Per CLAUDE.md Section 3 barriers: "Trust issues, expensive programs, bad UX."
 *          Each FAQ is mapped directly to a real concern from the professional persona.
 *          Answering objections proactively reduces friction and increases conversions.
 *
 * Why 'use client'?
 * The accordion uses useState to track which FAQ item is expanded.
 * Server components cannot hold UI interaction state.
 *
 * Design: Off-white (brand-light) background via inline style.
 *         Smooth max-height CSS transitions — no JS-measured heights needed.
 *         Pattern is identical to EmployersFAQ for consistent interaction UX.
 */

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I verify my credentials on the platform?",
    answer:
      "After signing up, you will be guided through a step-by-step credential submission process. Upload your MDCN or NMCN registration certificate, your current practising licence, and any specialist certificates. Our verification team reviews each submission within 48 hours and confirms your status. You will receive a verified badge on your profile once complete.",
  },
  {
    question: "Are the CPD courses accredited by Nigerian regulatory bodies?",
    answer:
      "Yes. All CPD courses on ProNurtureSphere are reviewed and approved by relevant Nigerian professional bodies including MDCN, NMCN, and the Pharmacists Council of Nigeria where applicable. Each course listing clearly states the accrediting body and the number of CPD credits awarded on completion.",
  },
  {
    question: "How quickly will I get paid after completing a shift?",
    answer:
      "Payment timelines are agreed before you accept a shift and are clearly stated in the shift brief. Employers on ProNurtureSphere commit to platform payment terms — typically 2–5 business days after shift completion and timesheet approval. You can track your payment status in real time within your account dashboard.",
  },
  {
    question: "Can I work locum shifts while keeping my permanent job?",
    answer:
      "Absolutely. ProNurtureSphere is designed for flexible working. You set your availability — evenings, weekends, or specific dates — and the platform only shows you shifts that match. Many professionals use ProNurtureSphere to supplement their primary income without any conflict with their permanent role.",
  },
  {
    question: "What types of healthcare professionals can join?",
    answer:
      "ProNurtureSphere is open to all registered and licensed healthcare professionals in Nigeria, including medical doctors, nurses and midwives, pharmacists, physiotherapists, radiographers, medical laboratory scientists, dentists, and allied health professionals. Your discipline must be registered with a recognised Nigerian professional regulatory body.",
  },
];

const ProfessionalsFAQ = () => {
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
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Frequently asked questions for healthcare professionals"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
            FAQs
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-4">
            Common Questions from Healthcare Professionals.
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
                {/* Full-width button trigger — accessible via keyboard tab and Enter */}
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
                  aria-controls={`professionals-faq-answer-${index}`}
                  id={`professionals-faq-trigger-${index}`}
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

                {/* Answer — max-height transition avoids JS layout measurement */}
                <div
                  id={`professionals-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`professionals-faq-trigger-${index}`}
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

export default ProfessionalsFAQ;
