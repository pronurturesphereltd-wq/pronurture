/**
 * app/privacy/page.tsx — Privacy Policy page (route: /privacy)
 *
 * Purpose: Legal transparency page linked from the footer. Communicates
 * to visitors (healthcare professionals and facility administrators) how
 * ProNurtureSphere handles their personal and organisational data.
 *
 * IMPORTANT: This is placeholder content only. Have a qualified legal
 * professional review and finalise this policy before launch.
 *
 * Architecture: Pure Server Component — no interactivity needed.
 * Metadata exported for SSR SEO. Inherits Navbar + Footer from layout.tsx.
 */

import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How ProNurtureSphere collects, uses, and safeguards your personal data — our full privacy policy for healthcare professionals and facilities in Nigeria.",
};

export default function PrivacyPage() {
  return (
    <main
      className="pt-28 pb-16"
      style={{ backgroundColor: "#f5f5f0" }}
      aria-label="Privacy Policy"
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
          Privacy Policy
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
        <div className="prose-like space-y-8 text-gray-700 leading-relaxed">

          {/* 1. Introduction */}
          <section aria-labelledby="privacy-intro">
            <h2 id="privacy-intro" className="text-xl font-bold text-brand-dark mb-3">
              1. Introduction
            </h2>
            <p className="mb-3">
              ProNurtureSphere Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;PSL&rdquo;) is a Nigerian digital platform for healthcare
              workforce management — combining staffing, rostering, credential
              verification, payroll handoff, and continuing professional
              development (CPD) for hospitals, clinics, and healthcare
              professionals across Nigeria.
            </p>
            <p>
              We are committed to protecting the privacy of all individuals who
              use our platform or visit our website. This Privacy Policy explains
              what personal information we collect, how we use it, who we share it
              with, and the rights you have over your data. By using the
              ProNurtureSphere website or platform, you agree to the practices
              described in this policy.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section aria-labelledby="privacy-collect">
            <h2 id="privacy-collect" className="text-xl font-bold text-brand-dark mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect personal information in the following contexts:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                <strong>Waitlist &amp; early access registration:</strong> Full
                name, email address, role (healthcare professional or facility),
                and organisation name where applicable.
              </li>
              <li>
                <strong>Contact enquiries:</strong> Name, email address, and the
                content of your message when you reach us via the contact form or
                directly by email.
              </li>
              <li>
                <strong>Platform use (when live):</strong> Professional licence
                numbers, qualifications, employment history, shift preferences,
                and payroll details for healthcare professionals. Facility name,
                location, staffing requirements, and billing information for
                healthcare organisations.
              </li>
              <li>
                <strong>Usage data:</strong> Browser type, device information, IP
                address, pages visited, and interaction events collected
                automatically when you browse our website. This data is
                aggregated and anonymised where possible.
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section aria-labelledby="privacy-use">
            <h2 id="privacy-use" className="text-xl font-bold text-brand-dark mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                To notify you when the ProNurtureSphere platform becomes available
                to early access members.
              </li>
              <li>
                To respond to your enquiries and provide customer support.
              </li>
              <li>
                To match healthcare professionals with relevant shift opportunities
                and to help facilities find verified clinical staff.
              </li>
              <li>
                To verify professional credentials and licences as part of the
                platform&apos;s compliance workflows.
              </li>
              <li>
                To send product updates, platform announcements, and healthcare
                workforce insights that we believe are relevant to you. You may
                opt out of marketing communications at any time.
              </li>
              <li>
                To improve the platform through analysis of aggregate usage
                patterns and user feedback.
              </li>
            </ul>
          </section>

          {/* 4. Data Storage & Security */}
          <section aria-labelledby="privacy-storage">
            <h2 id="privacy-storage" className="text-xl font-bold text-brand-dark mb-3">
              4. Data Storage &amp; Security
            </h2>
            <p className="mb-3">
              Your data is stored on secure cloud infrastructure. We apply
              industry-standard technical and organisational measures to protect
              personal information against unauthorised access, disclosure,
              alteration, or destruction. These measures include:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>Encryption of data in transit (HTTPS/TLS).</li>
              <li>
                Access controls — only authorised ProNurtureSphere personnel can
                access personal data, strictly for operational purposes.
              </li>
              <li>
                Regular security reviews of our infrastructure and third-party
                integrations.
              </li>
            </ul>
            <p className="mt-3">
              We retain your personal data only for as long as is necessary to
              fulfil the purposes outlined in this policy, or as required by
              applicable Nigerian law. Waitlist data will be deleted within 24
              months of collection if you have not converted to an active platform
              user.
            </p>
          </section>

          {/* 5. Third-Party Services */}
          <section aria-labelledby="privacy-third-party">
            <h2 id="privacy-third-party" className="text-xl font-bold text-brand-dark mb-3">
              5. Third-Party Services
            </h2>
            <p className="mb-3">
              We use third-party services to operate the ProNurtureSphere platform
              and website. Each of these services has its own privacy policy and
              may process your personal data as follows:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                <strong>HubSpot</strong> — used for CRM (Customer Relationship
                Management) and email communication with early access registrants.
                HubSpot may store your name and email address.
                See{" "}
                <a
                  href="https://legal.hubspot.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
                >
                  HubSpot&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Google</strong> — used for analytics (Google Analytics)
                and cloud infrastructure. Google may process usage data and device
                information. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Make.com (formerly Integromat)</strong> — used for
                workflow automation, including processing waitlist form
                submissions. Form data submitted through our waitlist page is
                routed through Make.com to our CRM. See{" "}
                <a
                  href="https://www.make.com/en/privacy-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-dark font-semibold underline underline-offset-2 hover:text-brand-green transition-colors duration-150"
                >
                  Make.com&apos;s Privacy Notice
                </a>
                .
              </li>
              <li>
                <strong>Vercel</strong> — our website is hosted on Vercel&apos;s
                infrastructure, which may log request data (IP addresses, headers)
                as part of normal hosting operations.
              </li>
            </ul>
            <p className="mt-3">
              We do not sell your personal data to any third party, and we require
              all third-party processors to handle your data securely and in
              accordance with applicable data protection law.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights" className="text-xl font-bold text-brand-dark mb-3">
              6. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your location, you may have the following rights
              regarding your personal data:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the personal
                information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> Ask us to correct inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Deletion:</strong> Request that we delete your personal
                data, subject to any legal obligations to retain it.
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a structured,
                machine-readable format.
              </li>
              <li>
                <strong>Opt-out of marketing:</strong> Unsubscribe from
                marketing emails at any time using the link in our emails or by
                contacting us directly.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at the address
              below. We will respond within 30 days.
            </p>
          </section>

          {/* 7. Contact Us */}
          <section aria-labelledby="privacy-contact">
            <h2 id="privacy-contact" className="text-xl font-bold text-brand-dark mb-3">
              7. Contact Us
            </h2>
            <p className="mb-3">
              For any questions, concerns, or requests relating to this Privacy
              Policy or your personal data, please contact us:
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
