/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Оставляем SWC включенным (требуется для next/font)
  swcMinify: true,
  // Отключаем параллельную сборку страниц
  experimental: {
    webpackBuildWorker: false,
  },
  // Ограничиваем webpack параллелизм
  webpack: (config, { dev, isServer }) => {
    // Ограничиваем количество параллельных задач до 1
    config.parallelism = 1
    return config
  },
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

