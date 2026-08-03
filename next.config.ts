import type { NextConfig } from "next";

let nextConfig: NextConfig = {
  reactCompiler: false,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
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
      "@radix-ui/react-slot",
      "react-icons",
      "date-fns",
      "sonner",
      "clsx",
      "tailwind-merge",
    ],
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // --- Image Optimization ---
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75, 100],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rangdhanuit.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
