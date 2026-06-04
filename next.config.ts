import type { NextConfig } from "next";

/**
 * next.config.ts — Next.js configuration for ProNurtureSphere
 *
 * Key settings:
 * - remotePatterns: allows next/image to load from placehold.co (placeholder images
 *   used during development before real photography is available)
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Placeholder image service used during development
        // Replace with real CDN/storage domain once photography is sourced
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
