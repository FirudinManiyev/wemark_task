import type { NextConfig } from "next";
import { DEFAULT_XSCHOOL_API_URL } from "./src/lib/api/config";

const apiUrl = process.env.XSCHOOL_API_URL?.trim() || DEFAULT_XSCHOOL_API_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: new URL(apiUrl).hostname,
      pathname: "/media/**",
    }],
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
