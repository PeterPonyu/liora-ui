import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "Liora"; // GitHub repo name

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  basePath: isProduction ? `/${repoName}` : "",
  assetPrefix: isProduction ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
