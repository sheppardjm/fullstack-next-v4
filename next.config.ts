import { dirname } from "node:path";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  turbopack: {
    root: dirname(__filename),
  },
  images: {
    remotePatterns: [
      new URL("https://domnlxbyp3naopvb.public.blob.vercel-storage.com/**"),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
