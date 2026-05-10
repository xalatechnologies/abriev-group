import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  /** Prefer Node resolution where bundled vendor chunks 404/missing under pnpm (see tailwind-merge). */
  serverExternalPackages: ["tailwind-merge"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.abriev.com" },
      /** Wikimedia Commons (CC-licensed editorial, e.g. BYD Seal cover art). */
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  // Omit `experimental.optimizePackageImports` for lucide-react: it has caused webpack RSC runtime
  // failures (`__webpack_modules__[moduleId] is not a function`) alongside barrel re-exports.
};

export default withNextIntl(nextConfig);
