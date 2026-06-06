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
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Sticky top navigation — shared across all marketing pages */}
      <Navbar />

      {/* Page content — flex-1 pushes Footer to the bottom of the viewport */}
      <main className="flex-1">{children}</main>

      {/* Site-wide footer */}
      <Footer />
    </>
  );
}
