import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  async headers() {
    return [
      ...["/actions/:path*", "/history", "/history/:path*"].map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
        ],
      })),
    ];
  },
  turbopack: {
    root: path.resolve(process.cwd(), "../.."),
  },
};

export default nextConfig;
