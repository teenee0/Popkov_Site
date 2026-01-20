/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Отключаем SWC компилятор (Rust-based) для shared хостинга
  // Используем Babel вместо него, чтобы избежать проблем с потоками
  swcMinify: false,
  // Отключаем параллельную сборку страниц
  experimental: {
    webpackBuildWorker: false,
    // Отключаем использование Rust компилятора где возможно
    serverComponentsExternalPackages: [],
  },
  // Ограничиваем webpack параллелизм
  webpack: (config, { dev, isServer }) => {
    // Ограничиваем количество параллельных задач до 1
    config.parallelism = 1
    // Отключаем кэширование для избежания проблем с потоками
    if (!dev) {
      config.cache = false
    }
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

