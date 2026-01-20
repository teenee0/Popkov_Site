/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'api.vendorvillage.store',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/media/**',
      },
    ],
    unoptimized: false,
  },
}

module.exports = nextConfig

