/**
 * app/twitter-image.tsx — Twitter/X card image
 *
 * Next.js special file convention. Served at /twitter-image.png and
 * auto-wired to <meta name="twitter:image"> for every page.
 *
 * Re-exports the same generator as opengraph-image.tsx so the
 * Twitter card preview is identical to the OpenGraph preview.
 */

export { default, alt, size, contentType, runtime } from "./opengraph-image";
