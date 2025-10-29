import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        // You can optionally include `port` and `pathname` if you want to be super strict,
        // but just protocol + hostname is enough for Sanity CDN.
      },
    ],
  },
};

export default nextConfig;
