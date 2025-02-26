import { type NextConfig } from "next/types";

const getBasePath = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const deployEnv = process.env.DEPLOY_ENV;

  if (nodeEnv === 'development' || deployEnv === 'vercel') {
    return '';
  }

  return '/friend';
};

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  basePath: getBasePath(),
};

export default nextConfig;
