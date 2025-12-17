import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "liora-ui"; 

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", 
  basePath: isProduction ? `/${repoName}` : "",
  assetPrefix: isProduction ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true, 
};

export default nextConfig;