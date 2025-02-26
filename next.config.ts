import { type NextConfig } from "next/types";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  basePath: '/friend',
};

export default nextConfig;
