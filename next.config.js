/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Desabilitar Turbopack no build (bug conhecido no Next.js 16)
  experimental: {
    // Turbopack está habilitado por padrão no dev no Next.js 16
    // mas causa problemas no build
  },

  // Configurações para PWA
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
