import { type NextConfig } from "next/types";

const getBasePath = () => {
  const deployEnv = process.env.DEPLOY_ENV || 'development';
  switch (deployEnv) {
    case "production" : {
      return "/friend"
    }
    default: {
      return '';
    }
  }
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
