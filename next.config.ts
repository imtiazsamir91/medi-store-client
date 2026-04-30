import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // এটি বিল্ডের সময় টাইপস্ক্রিপ্ট এরর থাকলেও বিল্ড হতে দিবে
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
   return [
      {
        // Explicitly map auth requests
        source: "/api/auth/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/:path*",
      },
      {
        // Explicitly map v1 API requests
        source: "/api/v1/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;