/**
 * app/twitter-image.tsx — Twitter/X card image
 *
 * Next.js special file convention. Served at /twitter-image.png and
 * auto-wired to <meta name="twitter:image"> for every page.
 *
 * Re-exports the same generator as opengraph-image.tsx so the
 * Twitter card preview is identical to the OpenGraph preview.
 *
 * Note: `runtime` cannot be re-exported — Next.js requires it to be
 * declared inline in each route segment file.
 */

export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";
