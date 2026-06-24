import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    authInterrupts: true,
    optimizePackageImports: ["lucide-react"],
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // --- Image Optimization ---
  images: {
    // Prefer modern image formats if the browser supports them
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75, 100],
    // Allow external images to be optimized and served from our specific CDN
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
        // Apply aggressive caching headers to static media assets for performance optimization
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

export default nextConfig;
