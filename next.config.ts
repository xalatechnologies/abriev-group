import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  /** Avoid stale/missing `./vendor-chunks/tailwind-merge@*.js` requires on Node (pnpm layouts). */
  serverExternalPackages: ["tailwind-merge"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.abriev.com" },
    ],
  },
  // Omit `experimental.optimizePackageImports` for lucide-react: it has caused webpack RSC runtime
  // failures (`__webpack_modules__[moduleId] is not a function`) alongside barrel re-exports.
};

export default withNextIntl(nextConfig);
