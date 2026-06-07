/**
 * app/(site)/layout.tsx — Marketing site layout
 *
 * Wraps all public-facing marketing pages with the site Navbar and Footer.
 * This layout is nested inside the root layout (app/layout.tsx), which
 * provides the html/body/font shell.
 *
 * The (site) route group exists purely to isolate the Navbar + Footer from
 * routes that must NOT have them (e.g. /studio, /api). The group name has
 * no effect on URL paths — /about, /employers, etc. remain unchanged.
 *
 * siteSettings is fetched once here and passed down to both Navbar and Footer
 * so there is only a single Sanity request per render cycle. Navbar is a
 * client component and receives only the siteName string it needs; Footer
 * receives the remaining editorial fields.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch site settings — null if the siteSettings document hasn't been seeded yet
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)

  return (
    <>
      {/* Sticky top navigation — siteName sourced from Sanity */}
      <Navbar siteName={settings?.siteName} />

      {/* Page content — flex-1 pushes Footer to the bottom of the viewport */}
      <main className="flex-1">{children}</main>

      {/* Site-wide footer — editorial fields sourced from Sanity */}
      <Footer settings={settings ?? undefined} />
    </>
  );
}
