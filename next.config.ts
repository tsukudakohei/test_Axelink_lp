import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages用の設定
  // output: "export" を削除して、@cloudflare/next-on-pagesを使用
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
