import type { NextConfig } from "next";

let nextConfig: NextConfig = {
  reactCompiler: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    authInterrupts: true,
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-popover",
      "@radix-ui/react-slider",
      "react-icons",
      "date-fns",
    ],
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // --- Image Optimization ---
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rangdhanuit.com",
      },
    ],
  },
  // --- Custom HTTP Headers ---
  headers: async () => {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const analyze = process.env.ANALYZE === "true";
if (analyze) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;
