import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '69.62.126.13',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
