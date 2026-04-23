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
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;