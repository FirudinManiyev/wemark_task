import type { NextConfig } from "next";

const apiUrl = process.env.XSCHOOL_API_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: apiUrl
      ? [{
        protocol: "https",
        hostname: new URL(apiUrl).hostname,
        pathname: "/media/**",
      }]
      : [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
