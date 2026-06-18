import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { getSiteSettings } from '@/lib/sanity'

export const metadata: Metadata = {
  metadataBase: new URL('https://pronurture.vercel.app'),
  title: { default: 'ProNurture Sphere Limited | PSL — Nigeria\'s Healthcare Career Platform', template: '%s | PSL' },
  description: 'PSL connects Nigerian clinical professionals with verified hospitals and clinics. Find jobs with salary shown upfront, track your CPD, and pick up locum shifts — all in one platform.',
  keywords: ['Nigerian healthcare jobs', 'nurse jobs Nigeria', 'CPD Nigeria', 'locum Nigeria'],
  openGraph: { siteName: 'ProNurtureSphere Limited', type: 'website', locale: 'en_NG' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings: any = {}
  try { settings = await getSiteSettings() } catch {}
  return (
    <html lang="en">
      <body>
        <Navbar ctaLabel={settings?.navCta || 'Join the Waitlist'} />
<main style={{ paddingTop: 68 }}>{children}</main>
        <Footer tagline={settings?.footerTagline} email={settings?.footerEmail} copyright={settings?.footerCopyright} socialLinks={settings?.socialLinks} />
      </body>
    </html>
  )
}
