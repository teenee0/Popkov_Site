/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Оставляем SWC включенным (требуется для next/font)
  swcMinify: true,
  // Игнорируем ошибки линтера и типов во время сборки для shared хостинга
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Отключаем параллельную сборку страниц и workers
  experimental: {
    webpackBuildWorker: false,
    workerThreads: false,
    cpus: 1,
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

