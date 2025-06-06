import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/maintenance", 
        destination: "https://appnest-production.up.railway.app/maintenance",
      },
    ];
  },
};

export default nextConfig;
