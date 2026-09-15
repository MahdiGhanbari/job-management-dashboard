import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {
    'staticData': {
      stale: 3000,
      revalidate: 5000,
      expire: 86400
    }
  }
};

export default nextConfig;
