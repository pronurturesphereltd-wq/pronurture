/**
 * app/terms/page.tsx — Terms of Service page (route: /terms)
 *
 * Purpose: Legal terms page linked from the footer. Sets out the conditions
 * under which visitors and registered users may use the ProNurtureSphere
 * website and early access platform.
 *
 * IMPORTANT: This is placeholder content only. Have a qualified legal
 * professional review and finalise these terms before launch.
 *
 * Architecture: Pure Server Component — no interactivity needed.
 * Metadata exported for SSR SEO. Inherits Navbar + Footer from layout.tsx.
 */

import Link from "next/link";

export const metadata = {
  title: "Terms of Service — ProNurtureSphere",
  description:
    "Terms and conditions for using the ProNurtureSphere platform and website. Read before joining the early access programme.",
};

export default function TermsPage() {
  return (
    <main
      className="pt-28 pb-16"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Terms of Service"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Legal review notice ──────────────────────────────────────────
         * Prominent banner to flag that this content is placeholder.
         * Removed before launch once legal review is complete.
         */}
        <div
          className="bg-brand-gold/20 border border-brand-gold/40 rounded-xl px-5 py-4 mb-10 text-sm text-brand-dark leading-relaxed"
          role="note"
          aria-label="Legal review notice"
        >
          <strong>Notice:</strong> This is a preliminary policy and should be
          reviewed by a legal professional before launch.
        </div>

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <p className="text-brand-green text-xs font-semibold uppercase tracking-widest mb-3">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark leading-tight mb-3">
          Terms of Service
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Last updated: June 2026
        </p>

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 mb-10" aria-hidden="true">
          <span className="inline-block w-10 h-1 rounded-full bg-brand-dark" />
          <span className="inline-block w-4 h-1 rounded-full bg-brand-gold" />
          <span className="inline-block w-4 h-1 rounded-full bg-brand-green" />
        </div>

        {/* ── Body content ────────────────────────────────────────────────── */}
        <div className="space-y-8 text-gray-700 leading-relaxed">

          {/* 1. Introduction */}
          <section aria-labelledby="terms-intro">
            <h2 id="terms-intro" className="text-xl font-bold text-brand-dark mb-3">
              1. Introduction
            </h2>
            <p className="mb-3">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
              and use of the ProNurtureSphere Limited website at{" "}
              <Link
                href="/"
                className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
              >
                pronurture.com.ng
              </Link>{" "}
              and any associated early access platform, mobile applications, or
              services (collectively, the &ldquo;Platform&rdquo;) operated by
              ProNurtureSphere Limited (&ldquo;PSL&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            </p>
            <p>
              PSL is a digital healthcare workforce management platform designed
              specifically for hospitals, clinics, staffing agencies, and
              healthcare professionals in Nigeria. By accessing our website or
              registering for early access, you agree to be bound by these Terms.
            </p>
          </section>

          {/* 2. Acceptance of Terms */}
          <section aria-labelledby="terms-acceptance">
            <h2 id="terms-acceptance" className="text-xl font-bold text-brand-dark mb-3">
              2. Acceptance of Terms
            </h2>
            <p className="mb-3">
              By accessing the ProNurtureSphere website, submitting the waitlist
              form, or using any part of the Platform, you confirm that:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                You are at least 18 years of age and legally capable of entering
                into a binding agreement.
              </li>
              <li>
                You have read, understood, and agree to these Terms and our{" "}
                <Link
                  href="/privacy"
                  className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
                >
                  Privacy Policy
                </Link>
                .
              </li>
              <li>
                If you are accepting these Terms on behalf of a healthcare
                facility or organisation, you have the authority to bind that
                organisation to these Terms.
              </li>
            </ul>
            <p className="mt-3">
              If you do not agree to these Terms, please do not access or use the
              Platform.
            </p>
          </section>

          {/* 3. Use of the Platform */}
          <section aria-labelledby="terms-use">
            <h2 id="terms-use" className="text-xl font-bold text-brand-dark mb-3">
              3. Use of the Platform
            </h2>
            <p className="mb-3">
              You may use the ProNurtureSphere website and Platform only for lawful
              purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                Provide false or misleading information, including inaccurate
                professional credentials or facility details.
              </li>
              <li>
                Use the Platform to transmit unsolicited communications,
                malware, or harmful content.
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Platform,
                its servers, or any data held within it.
              </li>
              <li>
                Copy, scrape, or redistribute ProNurtureSphere content without
                prior written permission.
              </li>
              <li>
                Use the Platform in any way that violates applicable Nigerian law
                or the regulations of the Medical and Dental Council of Nigeria
                (MDCN), the Nursing and Midwifery Council of Nigeria (NMCN), or
                any other relevant regulatory body.
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate access to the Platform
              for any user who violates these Terms.
            </p>
          </section>

          {/* 4. Early Access Programme */}
          <section aria-labelledby="terms-early-access">
            <h2 id="terms-early-access" className="text-xl font-bold text-brand-dark mb-3">
              4. Early Access Programme
            </h2>
            <p className="mb-3">
              The ProNurtureSphere Platform is currently in development. By joining
              our waitlist or early access programme, you acknowledge that:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                The Platform is a pre-launch product. Features, availability, and
                pricing are subject to change without notice.
              </li>
              <li>
                Being added to the waitlist does not guarantee early access,
                immediate onboarding, or any specific launch date.
              </li>
              <li>
                PSL may contact you by email with updates about the Platform,
                early access invitations, and relevant healthcare workforce news.
                You may opt out of these communications at any time.
              </li>
              <li>
                Feedback or suggestions you provide during the early access period
                may be used by PSL to improve the Platform without any obligation
                to compensate you.
              </li>
            </ul>
          </section>

          {/* 5. Intellectual Property */}
          <section aria-labelledby="terms-ip">
            <h2 id="terms-ip" className="text-xl font-bold text-brand-dark mb-3">
              5. Intellectual Property
            </h2>
            <p className="mb-3">
              All content on the ProNurtureSphere website and Platform — including
              but not limited to text, graphics, logos, icons, images, data
              compilations, software, and design — is the property of
              ProNurtureSphere Limited or its content suppliers and is protected
              by applicable Nigerian and international intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, or exploit any part of the Platform or its
              content without our express prior written consent.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section aria-labelledby="terms-liability">
            <h2 id="terms-liability" className="text-xl font-bold text-brand-dark mb-3">
              6. Limitation of Liability
            </h2>
            <p className="mb-3">
              To the fullest extent permitted by applicable Nigerian law,
              ProNurtureSphere Limited shall not be liable for:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                Any indirect, incidental, special, consequential, or punitive
                damages arising from your use of (or inability to use) the
                Platform.
              </li>
              <li>
                Any loss of data, revenue, goodwill, or profits arising in
                connection with the Platform.
              </li>
              <li>
                Clinical outcomes, staffing decisions, or employment arrangements
                made by healthcare facilities or professionals using information
                obtained through the Platform. PSL is a technology intermediary —
                responsibility for clinical and employment decisions remains with
                the relevant parties.
              </li>
            </ul>
            <p className="mt-3">
              The Platform is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without warranties of any kind, express or implied,
              including warranties of merchantability, fitness for a particular
              purpose, or non-infringement.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section aria-labelledby="terms-changes">
            <h2 id="terms-changes" className="text-xl font-bold text-brand-dark mb-3">
              7. Changes to These Terms
            </h2>
            <p className="mb-3">
              ProNurtureSphere Limited reserves the right to update or modify
              these Terms at any time. When we make material changes, we will
              update the &ldquo;Last updated&rdquo; date at the top of this page
              and, where appropriate, notify registered users by email.
            </p>
            <p>
              Your continued use of the Platform after any changes are posted
              constitutes your acceptance of the revised Terms. We encourage you
              to review this page periodically.
            </p>
          </section>

          {/* 8. Contact Us */}
          <section aria-labelledby="terms-contact">
            <h2 id="terms-contact" className="text-xl font-bold text-brand-dark mb-3">
              8. Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="bg-white rounded-xl border border-brand-dark/10 px-5 py-4 text-sm">
              <p className="font-semibold text-brand-dark mb-1">
                ProNurtureSphere Limited
              </p>
              <p className="text-gray-600">Email:{" "}
                <a
                  href="mailto:uwa@pronurture.com.ng"
                  className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
                >
                  uwa@pronurture.com.ng
                </a>
              </p>
              <p className="text-gray-600">
                Nigeria (serving healthcare organisations nationwide)
              </p>
            </div>
            <p className="mt-4 text-sm">
              You may also use our{" "}
              <Link
                href="/contact"
                className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
              >
                Contact page
              </Link>{" "}
              to get in touch.
            </p>
          </section>

        </div>

        {/* ── Back link ──────────────────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-brand-dark/10">
          <Link
            href="/"
            className="text-brand-dark font-semibold text-sm underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
