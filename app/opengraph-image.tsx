/**
 * app/opengraph-image.tsx — Dynamic Open Graph image
 *
 * Next.js auto-serves this at /opengraph-image.png and wires it up to the
 * <meta property="og:image"> and <meta name="twitter:image"> tags for every
 * page that doesn't define its own OG image.
 *
 * Dimensions: 1200×630px (the standard for social sharing previews)
 * Format: PNG (generated at request time by ImageResponse / Satori)
 */

import { ImageResponse } from "next/og";

export const alt = "ProNurtureSphere — Nigeria's Healthcare Workforce Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#103613",
          padding: "80px 100px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand colour bar — mirrors the divider used on legal pages */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: 48,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#ffffff",
            }}
          />
          <div
            style={{
              width: 20,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#c09e5a",
            }}
          />
          <div
            style={{
              width: 20,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#7a853e",
            }}
          />
        </div>

        {/* Primary wordmark */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          ProNurtureSphere
        </div>

        {/* Tagline in brand gold */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            color: "#c09e5a",
            textAlign: "center",
            letterSpacing: "0.02em",
            lineHeight: 1.4,
          }}
        >
          Nigeria&apos;s Healthcare Workforce Platform
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
