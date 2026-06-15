/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  transpilePackages: ['next-sanity'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://sanity.io',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://sanity.io https://*.sanity.studio",
          },
        ],
      },
    ]
  },
}
module.exports = nextConfig
