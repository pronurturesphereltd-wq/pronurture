import { Metadata } from 'next'
import SectionTag from '@/components/ui/SectionTag'

export const metadata: Metadata = {
  title: 'Privacy Policy | PSL',
  description: 'How ProNurture Sphere Limited collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section style={{ padding: '56px 0 48px', background: 'var(--brand-offwhite)' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <SectionTag label="Legal" />
          <h1 style={{ fontSize: 'clamp(30px,5vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 20, marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 16, color: 'var(--brand-gray)' }}>
            ProNurture Sphere Limited (PSL) &middot; Last updated: July 7, 2026
          </p>
        </div>
      </section>

      <section style={{ padding: '56px 0 80px' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="prose">
            <h2>1. Introduction</h2>
            <p>
              ProNurture Sphere Limited (&ldquo;PSL,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates a healthcare workforce platform that connects healthcare professionals with healthcare facility employers across Nigeria. We&apos;re committed to protecting the privacy and confidentiality of everyone who uses our platform &mdash; healthcare professionals, employer accounts, and visitors to our website.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we use it, who we share it with, and the rights you have over your data.
            </p>

            <h2>2. Who This Policy Applies To</h2>
            <p>This policy applies to:</p>
            <ul>
              <li>Healthcare professionals who create an account or join our waitlist</li>
              <li>Healthcare facility employers (Medical Directors, HR Managers) who create an account or join our waitlist</li>
              <li>Visitors browsing our website</li>
            </ul>

            <h2>3. Information We Collect</h2>
            <h3>Account &amp; Profile Information</h3>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Professional qualifications, licences, employment history, and credentials (for professionals)</li>
              <li>Facility name, location, and organizational details (for employers)</li>
              <li>CPD (Continuing Professional Development) progress and training records</li>
            </ul>
            <h3>Usage Information</h3>
            <ul>
              <li>How you interact with the platform (pages visited, features used)</li>
              <li>Device and browser information</li>
              <li>Approximate location (state/region) for job matching purposes</li>
            </ul>
            <h3>Communications</h3>
            <ul>
              <li>Messages you send us via contact forms, WhatsApp, or email</li>
              <li>Survey responses, where you&apos;ve chosen to participate</li>
            </ul>
            <p>
              We only collect what&apos;s necessary to provide our services &mdash; we do not collect medical records or patient data, as PSL does not provide direct clinical or patient care.
            </p>

            <h2>4. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Match healthcare professionals with relevant job opportunities</li>
              <li>Verify professional credentials and licences</li>
              <li>Track CPD completion and send compliance reminders</li>
              <li>Communicate with you about your account, applications, or platform updates</li>
              <li>Improve our platform and services</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>

            <h2>5. Lawful Basis for Processing</h2>
            <p>We process your data on the following bases:</p>
            <ul>
              <li><strong>Consent</strong> &mdash; where you&apos;ve agreed to specific processing (e.g. joining our waitlist)</li>
              <li><strong>Contractual necessity</strong> &mdash; to provide the services you&apos;ve signed up for</li>
              <li><strong>Legal obligation</strong> &mdash; where required by law or regulation</li>
              <li><strong>Legitimate interest</strong> &mdash; to improve and secure our platform</li>
            </ul>

            <h2>6. Who We Share Your Information With</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Healthcare facility employers, when you apply for a role they&apos;ve posted (professionals only, and only the information relevant to that application)</li>
              <li>Service providers who help us operate the platform (e.g. hosting, analytics), under confidentiality obligations</li>
              <li>Regulators or authorities, where required by law</li>
            </ul>
            <p>We do not sell your personal data to third parties.</p>

            <h2>7. Data Storage &amp; Security</h2>
            <p>We protect your information using:</p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Role-based access controls, limiting who can view your information</li>
              <li>Secure cloud hosting</li>
              <li>Regular security reviews</li>
            </ul>
            <p>
              While we take reasonable steps to protect your data, no system is completely secure, and we encourage you to use strong, unique passwords for your account.
            </p>

            <h2>8. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active, and for a reasonable period afterward to meet legal, regulatory, or record-keeping obligations. You can request deletion of your account and associated data at any time (see Section 9).
            </p>

            <h2>9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:uwa@pronurture.com.ng">uwa@pronurture.com.ng</a>. We aim to respond within 30 days.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              If your data is transferred or stored outside Nigeria (for example, via cloud infrastructure providers), we ensure appropriate safeguards are in place consistent with the Nigeria Data Protection Act and applicable international standards.
            </p>

            <h2>11. Data Breach Response</h2>
            <p>
              In the unlikely event of a data breach affecting your personal information, we will take immediate steps to contain and assess the incident, and notify affected individuals and relevant authorities where required by law.
            </p>

            <h2>12. Legal Compliance</h2>
            <p>
              PSL is committed to complying with applicable data protection laws, including the Nigeria Data Protection Act, and aligns its practices with recognized international standards such as GDPR principles where relevant to our operations.
            </p>

            <h2>13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We&apos;ll post any changes on this page with an updated effective date.
            </p>

            <h2>14. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or how we handle your data, contact us at:</p>
            <p><strong>Email:</strong> <a href="mailto:uwa@pronurture.com.ng">uwa@pronurture.com.ng</a></p>
          </div>
        </div>
      </section>
    </>
  )
}
