import { Metadata } from 'next'
import SectionTag from '@/components/ui/SectionTag'

export const metadata: Metadata = {
  title: 'Terms of Use | PSL',
  description: 'The terms governing your access to and use of the ProNurture Sphere Limited platform.',
}

export default function TermsOfUsePage() {
  return (
    <>
      <section style={{ padding: '56px 0 48px', background: 'var(--brand-offwhite)' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <SectionTag label="Legal" />
          <h1 style={{ fontSize: 'clamp(30px,5vw,52px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 20, marginBottom: 16 }}>
            Terms of Use
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
              These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the ProNurture Sphere Limited (&ldquo;PSL,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) website and platform. By accessing or using our platform, you agree to these Terms. If you do not agree, please do not use our platform.
            </p>

            <h2>2. Who Can Use PSL</h2>
            <p>PSL is intended for:</p>
            <ul>
              <li>Healthcare professionals (nurses, midwives, doctors, pharmacists, and allied health workers) seeking career opportunities and professional development</li>
              <li>Healthcare facility employers (Medical Directors, HR Managers) seeking to recruit and manage healthcare talent</li>
            </ul>
            <p>You must be at least 18 years old and legally able to enter into a binding agreement to use PSL.</p>

            <h2>3. Account Registration</h2>
            <p>To access certain features, you&apos;ll need to create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Keep your login credentials confidential</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Be responsible for all activity under your account</li>
            </ul>

            <h2>4. Professional Verification</h2>
            <p>
              Healthcare professionals using PSL agree that the qualifications, licences, and credentials they provide are accurate and current. PSL reserves the right to verify credentials with relevant regulatory bodies (e.g. NMCN, PCN) and to suspend or remove accounts where information is found to be false or misleading.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Provide false or misleading information</li>
              <li>Use the platform for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to other accounts or PSL systems</li>
              <li>Copy, scrape, or misuse content or data from the platform</li>
              <li>Impersonate any person or organization</li>
              <li>Post or share content that is defamatory, discriminatory, or harmful</li>
            </ul>

            <h2>6. Job Postings &amp; Applications</h2>
            <p>
              Healthcare facility employers are responsible for the accuracy of job postings they create. PSL does not guarantee employment outcomes and is not a party to any employment agreement between professionals and employers &mdash; we provide the platform that connects both parties.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on the PSL platform, including text, graphics, logos, and software, is owned by PSL or its licensors and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>

            <h2>8. CPD &amp; Training Content</h2>
            <p>
              Where PSL provides access to CPD courses or training materials, this content is provided for professional development purposes and does not constitute clinical, legal, or medical advice.
            </p>

            <h2>9. Waitlist &amp; Pre-Launch Access</h2>
            <p>
              If you join our waitlist prior to full platform launch, we&apos;ll contact you using the information you provide to notify you when access becomes available. Joining the waitlist does not guarantee access or any particular timeline.
            </p>

            <h2>10. Disclaimers</h2>
            <p>
              PSL is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We do not guarantee that the platform will be uninterrupted, error-free, or completely secure. PSL is not responsible for the conduct of any user, employer, or professional on the platform.
            </p>

            <h2>11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, PSL shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.
            </p>

            <h2>12. Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these Terms, provide false information, or engage in conduct that harms other users or the platform.
            </p>

            <h2>13. Governing Law</h2>
            <p>These Terms are governed by the laws of the Federal Republic of Nigeria.</p>

            <h2>14. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the platform after changes are posted constitutes acceptance of the updated Terms.
            </p>

            <h2>15. Contact Us</h2>
            <p>If you have questions about these Terms, contact us at:</p>
            <p><strong>Email:</strong> <a href="mailto:uwa@pronurture.com.ng">uwa@pronurture.com.ng</a></p>
          </div>
        </div>
      </section>
    </>
  )
}
