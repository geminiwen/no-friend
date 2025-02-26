import { type NextConfig } from "next/types";

const getBasePath = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  switch (nodeEnv) {
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
