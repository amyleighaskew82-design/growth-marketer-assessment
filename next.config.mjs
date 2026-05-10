/** @type {import('next').NextConfig} */
const BASE_PATH = process.env.NODE_ENV === "production"
  ? "/growth-marketer-assessment"
  : "";

const nextConfig = {
  output: "export",
  basePath: BASE_PATH,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
