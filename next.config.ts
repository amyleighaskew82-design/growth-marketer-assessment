import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/growth-marketer-assessment",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
