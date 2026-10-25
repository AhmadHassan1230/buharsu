import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 80],
    deviceSizes: [640, 750, 828, 1080, 1280, 1600, 2048],
  },
  poweredByHeader: false,
};

export default nextConfig;
