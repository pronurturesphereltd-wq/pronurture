/**
 * app/(site)/layout.tsx — Marketing site layout
 *
 * Wraps all public-facing marketing pages with the site Navbar and Footer.
 * Nested inside the root layout (app/layout.tsx), which provides the
 * html/body/font shell.
 *
 * The (site) route group isolates Navbar + Footer from routes that must NOT
 * have them (/studio, /api). Group name has no effect on URL paths.
 *
 * MotionProvider is a thin 'use client' wrapper so this layout stays async
 * (required for Sanity data fetching — async + 'use client' cannot coexist).
 *
 * siteSettings is fetched once here and passed to Footer so there is only a
 * single Sanity request per render cycle.
 */

import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/ui/MotionProvider";
import { SanityLive } from "@/sanity/lib/live";
import DisableDraftMode from "@/components/DisableDraftMode";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)

  return (
    <MotionProvider>
      {/* Sticky top navigation */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Site-wide footer */}
      <Footer settings={settings ?? undefined} />

      {/* Live Content API — instant updates in both normal and draft mode */}
      <SanityLive />

      {/* Visual Editing + draft mode banner — only when Draft Mode is enabled */}
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </MotionProvider>
  );
}
