import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি যেকোনো ডোমেইন থেকে ছবি লোড করার অনুমতি দিবে
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  /* অন্য কোনো অপশন থাকলে এখানে থাকবে */
};

export default nextConfig;