import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Local browser checks use this origin while the dev server binds to 0.0.0.0.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
